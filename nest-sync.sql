-- =====================================================================
-- Nestopia → Maths Quest and Science Quest: children sync
-- (run in the spelling-bee project, after nest-homework.sql files)
-- Nestopia sends its children (student number, first name, last name,
-- class, grade level). Children are added, updated or matched to
-- accounts that already exist, so no progress is lost.
-- grade level: -2 Pre-K, -1 KG1, 0 KG2, 1 Grade 1 ... 5 Grade 5
-- =====================================================================
alter table public.mq_students add column if not exists last_name text;
alter table public.sq_students add column if not exists last_name text;

-- Maths Quest codes: same letters as the teacher page, never the same as another code
create or replace function public.mq_new_code() returns text
language plpgsql security definer set search_path to 'public' as $$
declare a text := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; c text; i int;
begin
  loop
    c := '';
    for i in 1..6 loop c := c || substr(a, 1 + floor(random() * length(a))::int, 1); end loop;
    exit when not exists (select 1 from mq_students where code = c) and not exists (select 1 from students where code = c);
  end loop;
  return c;
end $$;
revoke execute on function public.mq_new_code() from public, anon, authenticated;

-- ---------------------------------------------------------------- Maths Quest
create or replace function public.nest_mq_sync(p_token text, p_kids jsonb)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare v uuid := mq_nest_school(p_token); k jsonb; s mq_students; n int; g int; ref text; fn text; ln text; cls text; nm text;
        added int := 0; linked int := 0; updated int := 0; newcls int := 0; was_linked boolean;
        skipped jsonb := '[]'; tocheck jsonb := '[]'; refs text[] := '{}';
begin
  if v is null then return jsonb_build_object('error', 'key'); end if;
  for k in select * from jsonb_array_elements(coalesce(p_kids, '[]'::jsonb)) loop
    ref := trim(coalesce(k ->> 'ref', '')); fn := left(trim(coalesce(k ->> 'first', '')), 40);
    ln := nullif(left(trim(coalesce(k ->> 'last', '')), 60), ''); cls := left(trim(coalesce(k ->> 'cls', '')), 40);
    nm := fn || coalesce(' ' || ln, ''); was_linked := false;
    if ref = '' or fn = '' then continue; end if;
    refs := refs || mq_norm_ref(ref);
    g := case when (k ->> 'level') ~ '^-?[0-9]+$' then (k ->> 'level')::int end;
    if g is null or g < 0 or g > 5 then skipped := skipped || jsonb_build_object('name', nm, 'why', 'Maths Quest is for KG2 to Grade 5'); continue; end if;
    if cls <> '' and not exists (select 1 from mq_classes where school_id = v and lower(name) = lower(cls)) then
      insert into mq_classes (school_id, name, grade) values (v, cls, g); newcls := newcls + 1;
    end if;
    select * into s from mq_students where school_id = v and mq_norm_ref(ext_ref) = mq_norm_ref(ref) limit 1;
    if not found then
      select count(*) into n from mq_students where school_id = v and coalesce(trim(ext_ref), '') = '' and grade = g
         and lower(trim(first_name)) in (lower(fn), lower(nm));
      if n = 1 then
        select * into s from mq_students where school_id = v and coalesce(trim(ext_ref), '') = '' and grade = g
           and lower(trim(first_name)) in (lower(fn), lower(nm)) limit 1;
        linked := linked + 1; was_linked := true;
      elsif n > 1 then
        -- same name more than once: the class tells them apart
        select count(*) into n from mq_students where school_id = v and coalesce(trim(ext_ref), '') = '' and grade = g
           and lower(trim(first_name)) in (lower(fn), lower(nm)) and lower(class_name) = lower(cls);
        if n <> 1 then
          tocheck := tocheck || jsonb_build_object('name', nm, 'why', 'More than one child with this name in Maths Quest: add the student number to the right one');
          continue;
        end if;
        select * into s from mq_students where school_id = v and coalesce(trim(ext_ref), '') = '' and grade = g
           and lower(trim(first_name)) in (lower(fn), lower(nm)) and lower(class_name) = lower(cls) limit 1;
        linked := linked + 1; was_linked := true;
      else
        begin
          insert into mq_students (school_id, code, first_name, last_name, grade, class_name, ext_ref)
          values (v, mq_new_code(), fn, ln, g, cls, ref);
          added := added + 1;
        exception when others then
          tocheck := tocheck || jsonb_build_object('name', nm, 'why', case when sqlerrm ilike '%PLAN_LIMIT%' then 'The Maths Quest plan is full' else 'Could not be added' end);
        end;
        continue;
      end if;
    end if;
    if s.first_name is distinct from fn or s.last_name is distinct from ln or s.grade <> g or s.class_name is distinct from cls
       or s.ext_ref is distinct from ref or not s.active then
      update mq_students set first_name = fn, last_name = ln, grade = g, class_name = cls, ext_ref = ref, active = true where id = s.id;
      if not was_linked then updated := updated + 1; end if;
    end if;
  end loop;
  return jsonb_build_object('added', added, 'linked', linked, 'updated', updated, 'classes', newcls, 'skipped', skipped, 'check', tocheck,
    'extra', coalesce((select jsonb_agg(first_name || coalesce(' ' || last_name, '') order by first_name) from mq_students
                        where school_id = v and active and coalesce(trim(ext_ref), '') = ''), '[]'::jsonb),
    'left',  coalesce((select jsonb_agg(first_name || coalesce(' ' || last_name, '') order by first_name) from mq_students
                        where school_id = v and active and coalesce(trim(ext_ref), '') <> '' and not (mq_norm_ref(ext_ref) = any(refs))), '[]'::jsonb));
end $$;

-- ---------------------------------------------------------------- Science Quest
-- Science Quest classes belong to a teacher: each synced class goes to the
-- Nestopia class teacher if they have a Science Quest account, otherwise to
-- the school's first Science Quest teacher.
create or replace function public.nest_sq_sync(p_token text, p_kids jsonb)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare v uuid := mq_nest_school(p_token); k jsonb; s sq_students; c sq_classes; n int; gr text; lv int; ref text; fn text; ln text; cls text; nm text;
        owner uuid; fallback uuid; emails text[];
        added int := 0; linked int := 0; updated int := 0; newcls int := 0; was_linked boolean;
        skipped jsonb := '[]'; tocheck jsonb := '[]'; refs text[] := '{}';
begin
  if v is null then return jsonb_build_object('error', 'key'); end if;
  select u.id into fallback from auth.users u join teachers t on lower(t.email) = lower(u.email)
   where t.school_id = v order by u.created_at limit 1;
  if fallback is null then return jsonb_build_object('error', 'noteacher'); end if;
  for k in select * from jsonb_array_elements(coalesce(p_kids, '[]'::jsonb)) loop
    ref := trim(coalesce(k ->> 'ref', '')); fn := left(trim(coalesce(k ->> 'first', '')), 40);
    ln := nullif(left(trim(coalesce(k ->> 'last', '')), 60), ''); cls := coalesce(nullif(left(trim(coalesce(k ->> 'cls', '')), 40), ''), 'My class');
    nm := fn || coalesce(' ' || ln, ''); was_linked := false;
    if ref = '' or fn = '' then continue; end if;
    refs := refs || mq_norm_ref(ref);
    lv := case when (k ->> 'level') ~ '^-?[0-9]+$' then (k ->> 'level')::int end;
    gr := case when lv = 0 then 'kg2' when lv between 1 and 5 then 'g' || lv end;
    if gr is null then skipped := skipped || jsonb_build_object('name', nm, 'why', 'Science Quest is for KG2 to Grade 5'); continue; end if;
    -- the class
    select sc.* into c from sq_classes sc
     where lower(sc.name) = lower(cls) and sc.grade = gr
       and exists (select 1 from auth.users u join teachers t on lower(t.email) = lower(u.email) where u.id = sc.teacher_id and t.school_id = v)
     limit 1;
    if not found then
      emails := array(select lower(e) from jsonb_array_elements_text(coalesce(k -> 'teachers', '[]'::jsonb)) e);
      select u.id into owner from auth.users u join teachers t on lower(t.email) = lower(u.email)
       where t.school_id = v and lower(u.email) = any(emails) limit 1;
      insert into sq_classes (teacher_id, name, grade) values (coalesce(owner, fallback), cls, gr) returning * into c;
      newcls := newcls + 1;
    end if;
    -- the child
    select * into s from sq_school_kids(v) x where mq_norm_ref(x.ext_ref) = mq_norm_ref(ref) limit 1;
    if not found then
      select count(*) into n from sq_school_kids(v) x where coalesce(trim(x.ext_ref), '') = '' and x.grade = gr
         and lower(trim(x.first_name)) in (lower(fn), lower(nm));
      if n = 1 then
        select * into s from sq_school_kids(v) x where coalesce(trim(x.ext_ref), '') = '' and x.grade = gr
           and lower(trim(x.first_name)) in (lower(fn), lower(nm)) limit 1;
        linked := linked + 1; was_linked := true;
      elsif n > 1 then
        select count(*) into n from sq_school_kids(v) x join sq_classes xc on xc.id = x.class_id where coalesce(trim(x.ext_ref), '') = '' and x.grade = gr
           and lower(trim(x.first_name)) in (lower(fn), lower(nm)) and lower(xc.name) = lower(cls);
        if n <> 1 then
          tocheck := tocheck || jsonb_build_object('name', nm, 'why', 'More than one child with this name in Science Quest: add the student number to the right one');
          continue;
        end if;
        select x.* into s from sq_school_kids(v) x join sq_classes xc on xc.id = x.class_id where coalesce(trim(x.ext_ref), '') = '' and x.grade = gr
           and lower(trim(x.first_name)) in (lower(fn), lower(nm)) and lower(xc.name) = lower(cls) limit 1;
        linked := linked + 1; was_linked := true;
      else
        insert into sq_students (class_id, teacher_id, first_name, last_name, grade, code, ext_ref)
        values (c.id, c.teacher_id, fn, ln, gr, sq_new_code(), ref);
        added := added + 1;
        continue;
      end if;
    end if;
    if s.first_name is distinct from fn or s.last_name is distinct from ln or s.grade <> gr or s.class_id <> c.id or s.ext_ref is distinct from ref then
      update sq_students set first_name = fn, last_name = ln, grade = gr, class_id = c.id, teacher_id = c.teacher_id, ext_ref = ref where id = s.id;
      if not was_linked then updated := updated + 1; end if;
    end if;
  end loop;
  return jsonb_build_object('added', added, 'linked', linked, 'updated', updated, 'classes', newcls, 'skipped', skipped, 'check', tocheck,
    'extra', coalesce((select jsonb_agg(x.first_name || coalesce(' ' || x.last_name, '') order by x.first_name) from sq_school_kids(v) x
                        where coalesce(trim(x.ext_ref), '') = ''), '[]'::jsonb),
    'left',  coalesce((select jsonb_agg(x.first_name || coalesce(' ' || x.last_name, '') order by x.first_name) from sq_school_kids(v) x
                        where coalesce(trim(x.ext_ref), '') <> '' and not (mq_norm_ref(x.ext_ref) = any(refs))), '[]'::jsonb));
end $$;

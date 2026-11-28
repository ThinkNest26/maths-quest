-- =====================================================================
-- Nestopia homework → Maths Quest  (run in the spelling-bee project)
-- Teachers set Maths Quest tasks from Nestlings; children open them from
-- Nestlings with a one-time ticket and are signed in automatically.
-- Uses each Whole Nest school's existing link key (schools.nest_token).
-- =====================================================================
create extension if not exists pgcrypto with schema extensions;

-- tickets that have been used (each ticket works once)
create table if not exists public.mq_nest_tickets (
  nonce   text primary key,
  used_at timestamptz not null default now()
);
alter table public.mq_nest_tickets enable row level security;

-- student numbers are matched the same way as the TwigNest bridge (case and leading zeros ignored)
create or replace function public.mq_norm_ref(x text) returns text
language sql immutable as $$
  select lower(regexp_replace(trim(coalesce(x, '')), '^0+(?=[0-9])', ''))
$$;

-- which Whole Nest school a link key belongs to
create or replace function public.mq_nest_school(p_token text) returns uuid
language sql stable security definer set search_path to 'public' as $$
  select id from schools
   where p_token is not null and length(p_token) >= 30 and nest_token = p_token and whole_nest
   limit 1
$$;
revoke execute on function public.mq_nest_school(text) from public, anon, authenticated;

-- 1) Which Maths Quest grades the children of a Nestopia class are in
create or replace function public.nest_mq_kids(p_token text, p_refs text[])
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare v uuid := mq_nest_school(p_token);
begin
  if v is null then return jsonb_build_object('error', 'key'); end if;
  return jsonb_build_object('total', coalesce(cardinality(p_refs), 0),
    'grades', coalesce((select jsonb_agg(s.grade) from mq_students s
       where s.school_id = v and s.active and mq_norm_ref(s.ext_ref) <> ''
         and mq_norm_ref(s.ext_ref) in (select mq_norm_ref(r) from unnest(p_refs) r)), '[]'::jsonb));
end $$;

-- 2) Create or update the Maths Quest task behind a Nestlings homework
create or replace function public.nest_mq_task_save(p_token text, p_task uuid, p_refs text[], p_grade int,
  p_land text, p_stop int, p_kinds text[], p_note text, p_due date, p_by text)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare v uuid := mq_nest_school(p_token); ids uuid[]; tid uuid;
begin
  if v is null then return jsonb_build_object('error', 'key'); end if;
  if coalesce(p_land, '') !~ '^[A-Z]{2}$' or p_stop is null or p_stop < 1 or p_stop > 60
     or p_grade is null or p_grade < 0 or p_grade > 8 then return jsonb_build_object('error', 'bad'); end if;
  p_kinds := array(select distinct k from unnest(coalesce(p_kinds, '{}')) k
                    where k in ('learn', 'practise', 'listen', 'play', 'think', 'use'));
  if cardinality(p_kinds) = 0 then p_kinds := array['practise']; end if;
  select array_agg(s.id) into ids from mq_students s
   where s.school_id = v and s.active and s.grade = p_grade and mq_norm_ref(s.ext_ref) <> ''
     and mq_norm_ref(s.ext_ref) in (select mq_norm_ref(r) from unnest(p_refs) r);
  if ids is null then return jsonb_build_object('error', 'nokids'); end if;
  if p_task is not null then
    update mq_tasks set grade = p_grade, class_name = '', student_ids = ids, land = p_land, stop = p_stop,
           kinds = p_kinds, note = left(coalesce(p_note, ''), 300), due = p_due
     where id = p_task and school_id = v returning id into tid;
  end if;
  if tid is null then
    insert into mq_tasks (school_id, grade, class_name, student_ids, land, stop, kinds, note, due, created_by)
    values (v, p_grade, '', ids, p_land, p_stop, p_kinds, left(coalesce(p_note, ''), 300), p_due, left(coalesce(p_by, 'Nestopia'), 200))
    returning id into tid;
  end if;
  return jsonb_build_object('id', tid, 'matched', cardinality(ids));
end $$;

-- 3) Remove it when the homework is deleted in Nestlings
create or replace function public.nest_mq_task_delete(p_token text, p_task uuid)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare v uuid := mq_nest_school(p_token);
begin
  if v is null then return jsonb_build_object('error', 'key'); end if;
  delete from mq_tasks where id = p_task and school_id = v;
  return jsonb_build_object('ok', true);
end $$;

-- 4) Who has finished it (for the teacher in Nestlings)
create or replace function public.nest_mq_task_status(p_token text, p_task uuid)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare v uuid := mq_nest_school(p_token); t mq_tasks;
begin
  if v is null then return jsonb_build_object('error', 'key'); end if;
  select * into t from mq_tasks where id = p_task and school_id = v;
  if not found then return jsonb_build_object('error', 'gone'); end if;
  return jsonb_build_object('kinds', to_jsonb(t.kinds), 'students', coalesce((
    select jsonb_agg(jsonb_build_object('ref', s.ext_ref,
             'n', (select count(*) from unnest(t.kinds) k
                    where coalesce(p.done, '{}'::jsonb) ? ('G' || t.grade || '-' || t.land || '-' || t.stop || '-' || k))))
      from mq_students s left join mq_progress p on p.student_id = s.id
     where s.id = any(t.student_ids)), '[]'::jsonb));
end $$;

-- 5) The child arrives from Nestlings with a one-time ticket
--    ticket = keyid.refhex.task.expiry.nonce.signature
create or replace function public.nest_mq_ticket(p_ticket text)
returns json language plpgsql security definer set search_path to 'public' as $$
declare parts text[] := string_to_array(coalesce(p_ticket, ''), '.'); sch record; k mq_students;
        payload text; ref text; exp bigint; now_s bigint := extract(epoch from now())::bigint;
begin
  if cardinality(parts) <> 6 or parts[1] !~ '^[0-9a-f]{16}$' or parts[2] !~ '^([0-9a-f]{2})+$'
     or parts[4] !~ '^[0-9]{9,11}$' or parts[5] !~ '^[0-9a-f]{32}$' or parts[6] !~ '^[0-9a-f]{64}$' then
    return json_build_object('error', 'bad');
  end if;
  exp := parts[4]::bigint;
  if exp < now_s or exp > now_s + 600 then return json_build_object('error', 'old'); end if;
  select id, nest_token into sch from schools
   where whole_nest and coalesce(nest_token, '') <> ''
     and left(encode(extensions.digest(nest_token, 'sha256'), 'hex'), 16) = parts[1] limit 1;
  if not found then return json_build_object('error', 'bad'); end if;
  payload := array_to_string(parts[1:5], '.');
  if encode(extensions.hmac(payload, sch.nest_token, 'sha256'), 'hex') <> parts[6] then
    return json_build_object('error', 'bad');
  end if;
  begin
    insert into mq_nest_tickets (nonce) values (parts[5]);
  exception when unique_violation then
    return json_build_object('error', 'used');
  end;
  delete from mq_nest_tickets where used_at < now() - interval '1 day';
  ref := convert_from(decode(parts[2], 'hex'), 'UTF8');
  select * into k from mq_students
   where school_id = sch.id and active and mq_norm_ref(ref) <> '' and mq_norm_ref(ext_ref) = mq_norm_ref(ref) limit 1;
  if not found then return json_build_object('error', 'nokid'); end if;
  return json_build_object('code', k.code,
    'task', case when parts[3] ~ '^[0-9a-f-]{36}$' then parts[3] end);
end $$;

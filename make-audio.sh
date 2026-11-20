#!/bin/bash
# ============================================================
#  Maths Quest — record Kate's voice (run on your Mac)
#  Records every question, learn step and praise phrase that
#  doesn't have a recording yet (same voice as the Spelling Bee).
#  In Terminal, inside the maths-quest folder, type:
#      bash make-audio.sh
#  or choose the voice yourself:  bash make-audio.sh "Kate (Enhanced)"
# ============================================================
cd "$(dirname "$0")" || exit 1
VOICE="$1"
if [ -z "$VOICE" ]; then
  for pref in "Serena (Premium)" "Kate (Premium)" "Stephanie (Premium)" "Martha (Premium)" \
              "Serena (Enhanced)" "Kate (Enhanced)" "Stephanie (Enhanced)" "Martha (Enhanced)"; do
    if say -v '?' | grep -F "$pref " | grep -q "en_GB"; then VOICE="$pref"; break; fi
  done
fi
if [ -z "$VOICE" ]; then
  echo ""
  echo "  No high-quality UK female voice is installed yet."
  echo "  System Settings > Accessibility > Spoken Content > System voice"
  echo "  > Manage Voices > English (United Kingdom): download Kate (Enhanced)."
  exit 1
fi
LIST="content/audio-list.tsv"
[ -s "$LIST" ] || { echo "  Can't find $LIST"; exit 1; }
total=$(grep -c . "$LIST")
echo ""
echo "  Recording with: $VOICE  ($total clips in the list)"
echo "  The first time takes a while (about an hour). You can stop with Ctrl+C"
echo "  and run it again later — it carries on where it stopped."
mkdir -p audio
TMP="${TMPDIR:-/tmp}/mqclip.aiff"
n=0; made=0
while IFS=$'\t' read -r name text; do
  [ -z "$name" ] && continue
  out="audio/$name.m4a"
  if [ ! -s "$out" ]; then
    n=$((n+1))
    RATE=165; case "$name" in ls-*) RATE=125;; esac
    if say -v "$VOICE" -r "$RATE" -o "$TMP" -- "$text" && afconvert -f m4af -d aac -b 48000 "$TMP" "$out"; then made=$((made+1)); fi
    if [ $((n % 50)) -eq 0 ]; then echo "  ... $n recorded"; fi
  fi
done < "$LIST"
rm -f "$TMP"
{
  printf '['
  first=1
  for f in audio/*.m4a; do
    [ -s "$f" ] || continue
    b=$(basename "$f" .m4a)
    if [ $first -eq 1 ]; then first=0; else printf ','; fi
    printf '"%s"' "$b"
  done
  printf ']\n'
} > audio/manifest.json
echo ""
if [ $made -eq 0 ]; then echo "  Everything already has Kate's voice — nothing new to record.";
else echo "  Done! $made new recording(s) made."; echo "  Now open GitHub Desktop, commit and Push origin."; fi
echo ""

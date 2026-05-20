"""Partition all questions into 90-question exams."""
import json, random
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "data" / "ninety-exams.ts"

def extract_questions(text: str) -> list[dict]:
    """Extract questions from a TS file containing JSON arrays."""
    results = []
    # Find all JSON arrays in the file
    depth = 0; start = -1
    for i, ch in enumerate(text):
        if ch == "[":
            if depth == 0: start = i
            depth += 1
        elif ch == "]":
            depth -= 1
            if depth == 0 and start >= 0:
                try:
                    arr = json.loads(text[start:i+1])
                    if isinstance(arr, list) and len(arr) > 0 and isinstance(arr[0], dict) and "question" in arr[0]:
                        results.extend(arr)
                except: pass
                start = -1
    return results

# Load all questions
suite = (ROOT / "data" / "exam-suite.ts").read_text(encoding="utf-8")
jaja = (ROOT / "data" / "jaja-exam.ts").read_text(encoding="utf-8")
messer_path = ROOT / "data" / "messer-exams.ts"
messer = messer_path.read_text(encoding="utf-8") if messer_path.exists() else ""

suite_qs = extract_questions(suite)
jaja_qs = extract_questions(jaja)
messer_qs = extract_questions(messer)

print(f"Loaded {len(suite_qs)} suite + {len(jaja_qs)} jaja + {len(messer_qs)} messer = {len(suite_qs)+len(jaja_qs)+len(messer_qs)} total")

# Deduplicate: first source wins
seen = set(); all_qs = []
for q in suite_qs:
    key = q.get("question","").lower().strip()[:80]
    if key and key not in seen: seen.add(key); all_qs.append(q)
for q in jaja_qs:
    key = q.get("question","").lower().strip()[:80]
    if key and key not in seen: seen.add(key); all_qs.append(q)
for q in messer_qs:
    key = q.get("question","").lower().strip()[:80]
    if key and key not in seen: seen.add(key); all_qs.append(q)

print(f"After dedup: {len(all_qs)} unique")

# Shuffle deterministically
rng = random.Random(42)
rng.shuffle(all_qs)

# Partition into 90-question exams
SIZE = 90
exams = []
for i in range(0, len(all_qs), SIZE):
    chunk = all_qs[i:i+SIZE]
    chunk.sort(key=lambda q: q.get("questionNumber",0))
    n = (i//SIZE)+1
    exams.append({"id":f"full-{n:02d}","title":f"Examen complet {n} ({len(chunk)} q)","source":"Full pool auto-generated","questions":chunk})

for e in exams: print(f"  {e['title']}: {len(e['questions'])} questions")

# Write TS
flat = [q for e in exams for q in e["questions"]]
OUT.write_text(
    f"export const ninetyExams = {json.dumps(exams,indent=2,ensure_ascii=True)};\n\n"
    f"export const ninetyQuestions = {json.dumps(flat,indent=2,ensure_ascii=True)};\n",
    encoding="utf-8")
print(f"\nWritten {len(exams)} exams -> {OUT}")

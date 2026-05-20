"""Import Exam JAJA (questions 201-300) into data/jaja-exam.ts."""
import json, re, unicodedata
from pathlib import Path

SOURCE = Path(r"C:\Users\juven\Documents\Exam JAJA.txt")
OUTPUT = Path(__file__).resolve().parent.parent / "data" / "jaja-exam.ts"
EXAM_TITLE = "Exam JAJA (201-300)"
EXAM_ID = "jaja-201-300"

def ascii_text(value: str) -> str:
    reps = {"\u2018": "'", "\u2019": "'", "\u201c": '"', "\u201d": '"', "\u2013": "-", "\u2014": "-", "\ufb01": "fi", "\ufb02": "fl", "\u00a0": " "}
    for s, t in reps.items(): value = value.replace(s, t)
    return unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode("ascii")

def clean(value: str) -> str:
    value = ascii_text(value)
    value = re.sub(r"(?m)^\s*\d{3,4}\s*$", " ", value)
    value = re.sub(r"\b\d{3,4}(?=Explanation\s+\d+\.)", " ", value)
    value = re.sub(r"\b\d{3,4}(?=[a-z])", " ", value)
    return re.sub(r"\s+", " ", value).strip()

def parse_block(number: int, block: str):
    em = re.search(r"Explanation\s+(\d+)\.\s+", block)
    if not em or int(em.group(1)) != number: return None
    prompt = block[:em.start()]
    explanation = block[em.end():]
    prompt = re.sub(r"^\s*Question\s+\d+\.\s+", "", prompt).strip()

    choices_m = list(re.finditer(r"\(([A-D])\)\s+", prompt))
    if len(choices_m) < 4: return None

    question = clean(prompt[:choices_m[0].start()])
    choices = []
    for i, m in enumerate(choices_m[:4]):
        end = choices_m[i+1].start() if i+1 < 4 else len(prompt)
        choices.append(clean(prompt[m.end():end]))

    ans = re.search(r"Correct Answer:\s*([A-D])\.", explanation, re.I)
    if not ans: return None

    expl = clean(explanation)
    answer = ord(ans.group(1).upper()) - ord("A")

    if not question or len(choices) != 4 or any(not c for c in choices) or not expl: return None

    return {
        "id": f"{EXAM_ID}-q{number}",
        "examId": EXAM_ID,
        "examTitle": EXAM_TITLE,
        "questionNumber": number,
        "question": question,
        "choices": choices,
        "answer": answer,
        "explanation": expl,
        "source": "Exam JAJA local import",
    }

def main():
    text = SOURCE.read_text(encoding="utf-8", errors="replace")
    text = re.sub(r"(?<!\n)(?<![A-Za-z0-9])((?:Question|Explanation)\s+\d+\.)", r"\n\1", text)
    text = re.sub(r"(?<!\n)(?<![A-Za-z0-9])(\([A-D]\)\s+)", r"\n\1", text)

    questions = []
    skipped = []
    seen = set()
    matches = list(re.finditer(r"Question\s+(\d+)\.\s+", text))

    for i, m in enumerate(matches):
        num = int(m.group(1))
        if num in seen: continue
        seen.add(num)
        start = m.start()
        end = matches[i+1].start() if i+1 < len(matches) else len(text)
        parsed = parse_block(num, text[start:end])
        if parsed: questions.append(parsed)
        else: skipped.append(f"Q{num}")

    questions.sort(key=lambda q: q["questionNumber"])
    exam = {"id": EXAM_ID, "title": EXAM_TITLE, "source": "Exam JAJA local import", "questions": questions}

    flat = json.dumps(questions, indent=2, ensure_ascii=True)
    exam_json = json.dumps([exam], indent=2, ensure_ascii=True)

    ts = f"""export type ExamQuestion = {{
  id: string;
  examId: string;
  examTitle: string;
  questionNumber: number;
  question: string;
  choices: [string, string, string, string];
  answer: number;
  explanation: string;
  source: string;
}};

export type ExamSuite = {{
  id: string;
  title: string;
  source: string;
  questions: ExamQuestion[];
}};

export const jajaQuestions: ExamQuestion[] = {flat};

export const jajaExam: ExamSuite[] = {exam_json};
"""
    OUTPUT.write_text(ts, encoding="utf-8")
    print(f"OK: {len(questions)} questions -> {OUTPUT}")
    print(f"Exam: {EXAM_TITLE}")
    if skipped: print(f"Skipped: {skipped}")

if __name__ == "__main__":
    main()

from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path


SOURCE_PATH = Path(r"C:\Users\juven\Documents\ExamsSuite.txt")
OUTPUT_PATH = Path(__file__).resolve().parents[1] / "data" / "exam-suite.ts"


def ascii_text(value: str) -> str:
    replacements = {
        "\u2018": "'",
        "\u2019": "'",
        "\u201c": '"',
        "\u201d": '"',
        "\u2013": "-",
        "\u2014": "-",
        "\ufb01": "fi",
        "\ufb02": "fl",
        "\u00a0": " ",
    }
    for source, target in replacements.items():
        value = value.replace(source, target)
    value = unicodedata.normalize("NFKD", value)
    return value.encode("ascii", "ignore").decode("ascii")


def slugify(value: str) -> str:
    value = ascii_text(value).lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "exam"


def clean(value: str) -> str:
    value = ascii_text(value)
    value = re.sub(r"(?m)^\s*\d{3,4}\s*$", " ", value)
    value = re.sub(r"\b\d{3,4}(?=Explanation\s+\d+\.)", " ", value)
    value = re.sub(r"\b\d{3,4}(?=[a-z])", " ", value)
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def prepare(value: str) -> str:
    value = ascii_text(value)
    value = re.sub(r"(?<!\n)(?<![A-Za-z0-9])((?:Question|Explanation)\s+\d+\.)", r"\n\1", value)
    value = re.sub(r"(?<!\n)(?<![A-Za-z0-9])(\([A-D]\)\s+)", r"\n\1", value)
    return value


def exam_sections(text: str) -> list[tuple[str, str]]:
    matches = list(re.finditer(r"(?mi)^exam\s+(.+?)\s*$", text))
    sections: list[tuple[str, str]] = []
    for index, match in enumerate(matches):
        title = clean(match.group(1)).title()
        start = match.end()
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        sections.append((title, text[start:end]))
    return sections


def parse_question_block(exam_id: str, exam_title: str, number: int, block: str) -> tuple[dict | None, str | None]:
    explanation_match = re.search(r"Explanation\s+(\d+)\.\s+", block)
    if not explanation_match:
        return None, f"{exam_title} question {number}: missing explanation"
    explanation_number = int(explanation_match.group(1))
    if explanation_number != number:
        return None, f"{exam_title} question {number}: explanation number {explanation_number}"

    prompt_part = block[: explanation_match.start()]
    explanation_part = block[explanation_match.end() :]
    prompt_part = re.sub(r"^\s*Question\s+\d+\.\s+", "", prompt_part).strip()

    choice_matches = list(re.finditer(r"\(([A-D])\)\s+", prompt_part))
    labels = [match.group(1) for match in choice_matches[:4]]
    if labels != ["A", "B", "C", "D"]:
        return None, f"{exam_title} question {number}: invalid choices"

    question = clean(prompt_part[: choice_matches[0].start()])
    choices: list[str] = []
    for index, match in enumerate(choice_matches[:4]):
        start = match.end()
        end = choice_matches[index + 1].start() if index + 1 < 4 else len(prompt_part)
        choices.append(clean(prompt_part[start:end]))

    answer_match = re.search(r"Correct Answer:\s*([A-D])\.", explanation_part, flags=re.I)
    if not answer_match:
        return None, f"{exam_title} question {number}: missing correct answer"

    explanation = clean(explanation_part)
    answer = ord(answer_match.group(1).upper()) - ord("A")
    if not question or len(choices) != 4 or any(not choice for choice in choices) or not explanation:
        return None, f"{exam_title} question {number}: incomplete parsed data"

    return {
        "id": f"{exam_id}-q{number}",
        "examId": exam_id,
        "examTitle": exam_title,
        "questionNumber": number,
        "question": question,
        "choices": choices,
        "answer": answer,
        "explanation": explanation,
        "source": "ExamsSuite local import",
    }, None


def parse_exam(title: str, section: str) -> tuple[dict, list[str]]:
    exam_id = slugify(title)
    question_matches = list(re.finditer(r"Question\s+(\d+)\.\s+", section))
    questions: list[dict] = []
    skipped: list[str] = []
    seen: set[int] = set()

    for index, match in enumerate(question_matches):
        number = int(match.group(1))
        if number in seen:
            continue
        seen.add(number)
        start = match.start()
        end = question_matches[index + 1].start() if index + 1 < len(question_matches) else len(section)
        parsed, error = parse_question_block(exam_id, title, number, section[start:end])
        if parsed:
            questions.append(parsed)
        elif error:
            skipped.append(error)

    return {
        "id": exam_id,
        "title": title,
        "source": "ExamsSuite local import",
        "questions": questions,
    }, skipped


def validate(exams: list[dict]) -> None:
    failures: list[str] = []
    for exam in exams:
        for question in exam["questions"]:
            if len(question["choices"]) != 4:
                failures.append(f"{question['id']} does not have 4 choices")
            if question["answer"] not in range(4):
                failures.append(f"{question['id']} has invalid answer")
            if not question["question"] or not question["explanation"]:
                failures.append(f"{question['id']} is incomplete")
    if failures:
        raise RuntimeError("\n".join(failures[:25]))


def write_typescript(exams: list[dict]) -> None:
    flat_questions = [question for exam in exams for question in exam["questions"]]
    exams_payload = json.dumps(exams, indent=2, ensure_ascii=True)
    flat_payload = json.dumps(flat_questions, indent=2, ensure_ascii=True)
    content = f"""export type ExamQuestion = {{
  id: string;
  examId: string;
  examTitle: string;
  questionNumber: number;
  question: string;
  choices: [string, string, string, string];
  answer: number;
  explanation: string;
  source: "ExamsSuite local import";
}};

export type ExamSuite = {{
  id: string;
  title: string;
  source: "ExamsSuite local import";
  questions: ExamQuestion[];
}};

export const examSuites = {exams_payload} satisfies ExamSuite[];

export const examSuiteQuestions = {flat_payload} satisfies ExamQuestion[];
"""
    OUTPUT_PATH.write_text(content, encoding="utf-8")


def main() -> None:
    raw_text = SOURCE_PATH.read_text(encoding="utf-8", errors="replace")
    prepared = prepare(raw_text)
    exams: list[dict] = []
    skipped: list[str] = []

    for title, section in exam_sections(prepared):
        exam, exam_skipped = parse_exam(title, section)
        if exam["questions"]:
            exams.append(exam)
        skipped.extend(exam_skipped)

    validate(exams)
    write_typescript(exams)

    print(f"Imported {len(exams)} exams into {OUTPUT_PATH}")
    for exam in exams:
        print(f"- {exam['title']}: {len(exam['questions'])} questions")
    if skipped:
        print(f"Skipped {len(skipped)} malformed blocks")
        for item in skipped[:25]:
            print(f"- {item}")


if __name__ == "__main__":
    main()

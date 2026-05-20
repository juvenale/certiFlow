from __future__ import annotations

import json
import re
import unicodedata
from collections import Counter
from pathlib import Path


SOURCE_PATH = Path(r"C:\Users\juven\Documents\Exams Messer.txt")
OUTPUT_PATH = Path(__file__).resolve().parents[1] / "data" / "messer-exams.ts"


def normalize_text(value: str) -> str:
    replacements = {
        "\u2018": "'",
        "\u2019": "'",
        "\u201c": '"',
        "\u201d": '"',
        "\u2013": "-",
        "\u2014": "-",
        "\u00a0": " ",
    }
    for source, target in replacements.items():
        value = value.replace(source, target)
    return unicodedata.normalize("NFKC", value)


def slugify(value: str) -> str:
    value = normalize_text(value).lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "messer-exam"


def clean_inline(value: str) -> str:
    value = normalize_text(value)
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def clean_explanation(value: str) -> str:
    value = normalize_text(value)
    value = re.sub(
        r"More information:\s*SY0-\d{3},\s*Objective.*?(?=(?:\n[A-C]\d{1,3}\.\s+|\nExam Messer\s+[A-C]\s*$|\nexam Messer\s+[A-C]\s*$|\Z))",
        " ",
        value,
        flags=re.I | re.S | re.M,
    )
    value = re.sub(r"https://professormesser\.link/\S+", " ", value, flags=re.I)
    value = re.sub(r"Practice\s+Exam\s+[A-C]\s+-\s+Answers\s*\d*", " ", value, flags=re.I)
    value = re.sub(r"(?m)^\s*\d{1,4}\s*$", " ", value)
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def prepare(value: str) -> str:
    value = normalize_text(value)
    value = re.sub(r"(?<!\n)(^|\s)(Exam Messer\s+[A-C]\s*$)", r"\n\2", value, flags=re.I | re.M)
    value = re.sub(r"(?<!\n)(?<![A-Za-z0-9])([A-C]\d{1,3}\.\s+)", r"\n\1", value)
    value = re.sub(r"(?<!\n)(❍\s*[A-F]\.\s+)", r"\n\1", value)
    value = re.sub(r"(?<!\n)(The Answers?:\s+)", r"\n\1", value)
    value = re.sub(r"(?<!\n)(The incorrect answers:\s*)", r"\n\1", value)
    value = re.sub(r"(?<!\n)(More information:\s*)", r"\n\1", value)
    return value


def exam_sections(text: str) -> list[tuple[str, str, str]]:
    matches = list(re.finditer(r"(?mi)^exam\s+Messer\s+([A-C])\s*$", text))
    sections: list[tuple[str, str, str]] = []
    for index, match in enumerate(matches):
        letter = match.group(1).upper()
        title = f"Exam Messer {letter}"
        start = match.end()
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        sections.append((letter, title, text[start:end]))
    return sections


def parse_answer_indexes(answer_text: str) -> list[int]:
    letters = re.findall(r"\b([A-F])\.", answer_text)
    seen: list[int] = []
    for letter in letters:
        index = ord(letter.upper()) - ord("A")
        if index not in seen:
            seen.append(index)
    return seen


def answer_label_text(block: str, answer_start: int) -> str:
    lines = [line.strip() for line in block[answer_start:].strip().splitlines() if line.strip()]
    collected: list[str] = []
    for index, line in enumerate(lines):
        if index == 0 or re.match(r"^(?:and\s+)?[A-F]\.", line, flags=re.I):
            collected.append(line)
            continue
        break
    return " ".join(collected)


def parse_question_block(exam_id: str, exam_title: str, exam_letter: str, number: int, block: str) -> tuple[dict | None, str | None]:
    answer_match = re.search(r"\bThe Answers?:\s+", block, flags=re.I)
    if not answer_match:
        return None, f"{exam_title} question {number}: missing answer"

    prompt_part = block[: answer_match.start()]
    explanation_part = clean_explanation(block[answer_match.start() :])
    prompt_part = re.sub(rf"^\s*{exam_letter}{number}\.\s+", "", prompt_part, flags=re.I).strip()

    choice_matches = list(re.finditer(r"(?m)^\s*❍\s*([A-F])\.\s+", prompt_part))
    if len(choice_matches) < 2:
        return None, f"{exam_title} question {number}: missing choices"

    question = clean_inline(prompt_part[: choice_matches[0].start()])
    choices: list[str] = []
    labels: list[str] = []
    for index, match in enumerate(choice_matches):
        labels.append(match.group(1).upper())
        start = match.end()
        end = choice_matches[index + 1].start() if index + 1 < len(choice_matches) else len(prompt_part)
        choices.append(clean_inline(prompt_part[start:end]))

    expected_labels = [chr(ord("A") + index) for index in range(len(labels))]
    if labels != expected_labels:
        return None, f"{exam_title} question {number}: non-contiguous choices {''.join(labels)}"

    answers = parse_answer_indexes(answer_label_text(block, answer_match.end()))
    if not answers:
        return None, f"{exam_title} question {number}: missing answer labels"
    if any(answer >= len(choices) for answer in answers):
        return None, f"{exam_title} question {number}: answer outside choice range"
    if not question or any(not choice for choice in choices) or not explanation_part:
        return None, f"{exam_title} question {number}: incomplete parsed data"

    return {
        "id": f"{exam_id}-q{number}",
        "examId": exam_id,
        "examTitle": exam_title,
        "questionNumber": number,
        "question": question,
        "choices": choices,
        "answer": answers[0],
        "answers": answers,
        "multipleAnswer": len(answers) > 1,
        "explanation": explanation_part,
        "source": "Professor Messer local import",
    }, None


def parse_exam(letter: str, title: str, section: str) -> tuple[dict, list[str]]:
    exam_id = slugify(title)
    question_matches = list(re.finditer(rf"(?m)^\s*{letter}(\d{{1,3}})\.\s+", section, flags=re.I))
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
        parsed, error = parse_question_block(exam_id, title, letter, number, section[start:end])
        if parsed:
            questions.append(parsed)
        elif error:
            skipped.append(error)

    return {
        "id": exam_id,
        "title": title,
        "source": "Professor Messer local import",
        "questions": questions,
    }, skipped


def validate(exams: list[dict]) -> None:
    failures: list[str] = []
    for exam in exams:
        for question in exam["questions"]:
            if len(question["choices"]) < 2:
                failures.append(f"{question['id']} has fewer than 2 choices")
            if any(answer not in range(len(question["choices"])) for answer in question["answers"]):
                failures.append(f"{question['id']} has invalid answers")
            if (
                "More information:" in question["explanation"]
                or re.search(r"SY0-\d{3}, Objective", question["explanation"])
                or re.search(r"Practice\s+Exam\s+[A-C]\s+-\s+Answers", question["explanation"], flags=re.I)
            ):
                failures.append(f"{question['id']} still contains repeated reference block")
            if not question["question"] or not question["explanation"]:
                failures.append(f"{question['id']} is incomplete")
    if failures:
        raise RuntimeError("\n".join(failures[:25]))


def write_typescript(exams: list[dict]) -> None:
    flat_questions = [question for exam in exams for question in exam["questions"]]
    exams_payload = json.dumps(exams, indent=2, ensure_ascii=False)
    flat_payload = json.dumps(flat_questions, indent=2, ensure_ascii=False)
    content = f"""export type MesserExamQuestion = {{
  id: string;
  examId: string;
  examTitle: string;
  questionNumber: number;
  question: string;
  choices: string[];
  answer: number;
  answers: number[];
  multipleAnswer: boolean;
  explanation: string;
  source: "Professor Messer local import";
}};

export type MesserExamSuite = {{
  id: string;
  title: string;
  source: "Professor Messer local import";
  questions: MesserExamQuestion[];
}};

export const messerExams = {exams_payload} satisfies MesserExamSuite[];

export const messerQuestions = {flat_payload} satisfies MesserExamQuestion[];
"""
    OUTPUT_PATH.write_text(content, encoding="utf-8")


def main() -> None:
    raw_text = SOURCE_PATH.read_text(encoding="utf-8", errors="replace")
    prepared = prepare(raw_text)
    exams: list[dict] = []
    skipped: list[str] = []

    for letter, title, section in exam_sections(prepared):
        exam, exam_skipped = parse_exam(letter, title, section)
        if exam["questions"]:
            exams.append(exam)
        skipped.extend(exam_skipped)

    validate(exams)
    write_typescript(exams)

    flat = [question for exam in exams for question in exam["questions"]]
    counts = Counter(question["examTitle"] for question in flat)
    more_than_four = sum(1 for question in flat if len(question["choices"]) > 4)
    multiple = sum(1 for question in flat if len(question["answers"]) > 1)
    print(f"Imported {len(exams)} Messer exams into {OUTPUT_PATH}")
    for exam in exams:
        print(f"- {exam['title']}: {counts[exam['title']]} questions")
    print(f"Questions with more than 4 choices: {more_than_four}")
    print(f"Multiple-answer questions: {multiple}")
    if skipped:
        print(f"Skipped {len(skipped)} malformed blocks")
        for item in skipped[:25]:
            print(f"- {item}")


if __name__ == "__main__":
    main()

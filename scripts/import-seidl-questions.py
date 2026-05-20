from __future__ import annotations

import json
import re
import unicodedata
from collections import Counter
from pathlib import Path


SOURCE_PATH = Path(r"C:\Users\juven\Documents\QUizzzDavidSeidl.txt")
OUTPUT_PATH = Path(__file__).resolve().parents[1] / "data" / "seidl-questions.ts"

DOMAIN_LABELS = {
    "1.0": "General Security Concepts",
    "2.0": "Threats, Vulnerabilities, and Mitigations",
    "3.0": "Security Architecture",
    "4.0": "Security Operations",
    "5.0": "Security Program Management and Oversight",
}

CHOICE_FIXES = {
    ("2.0", 1): {
        ("Financial gain", "Blackmail", "Espionage", "Blackmail"): [
            "Financial gain",
            "Blackmail",
            "Espionage",
            "Ethical",
        ]
    }
}


def ascii_text(value: str) -> str:
    replacements = {
        "\u2018": "'",
        "\u2019": "'",
        "\u201c": '"',
        "\u201d": '"',
        "\u2013": "-",
        "\u2014": "-",
        "\u2212": "-",
        "\u2022": "-",
        "\ufb01": "fi",
        "\ufb02": "fl",
        "\u00a0": " ",
    }
    for source, target in replacements.items():
        value = value.replace(source, target)
    value = unicodedata.normalize("NFKD", value)
    return value.encode("ascii", "ignore").decode("ascii")


def strip_noise(value: str) -> str:
    value = ascii_text(value)
    value = re.sub(r"(?:\d+\s+)?Chapter\s+\d+\s+(?:\S\s+)?Domain\s+\d\.0:[^\n]*?(?:\s+\d+)?", " ", value)
    value = re.sub(r"Chapter\s+\d+:\s+Domain\s+\d\.0:[^\n]*?(?:\s+\d+)?", " ", value)
    value = re.sub(r"(?:\d+\s+)?Appendix\s+\S\s+Answers to Review Questions", " ", value)
    value = re.sub(r"\bTHE COMPTIA SECURITY\+ EXAM SY0-701\b", " ", value, flags=re.I)
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def prepare_question_text(value: str) -> str:
    value = ascii_text(value)
    return re.sub(r"(?<!\n)(?<![A-Za-z0-9.$-])(\d{1,3}\.\s+(?=[A-Z]))", r"\n\1", value)


def prepare_answer_text(value: str) -> str:
    value = ascii_text(value)
    return re.sub(r"(?<!\n)(?<![A-Za-z0-9.$-])(\d{1,3}\.\s+[ABCD]\.\s+)", r"\n\1", value)


def domain_sections(question_part: str) -> list[tuple[str, str]]:
    matches = list(
        re.finditer(
            r"(?m)^Domain\s+(\d\.0):\s*(.+?)(?=\n(?:THE COMPTIA|TOPICS|\d+\.|Domain\s+\d\.0:)|\Z)",
            question_part,
            flags=re.I | re.S,
        )
    )
    sections: list[tuple[str, str]] = []
    for index, match in enumerate(matches):
        domain_id = match.group(1)
        if domain_id not in DOMAIN_LABELS:
            continue
        start = match.end()
        end = matches[index + 1].start() if index + 1 < len(matches) else len(question_part)
        sections.append((domain_id, question_part[start:end]))
    return sections


def answer_sections(answer_part: str) -> list[tuple[str, str]]:
    matches = list(
        re.finditer(
            r"(?m)^Chapter\s+\d+:\s+Domain\s+(\d\.0):\s*([^\n]+(?:\n[A-Za-z][^\n]+)?)",
            answer_part,
            flags=re.I,
        )
    )
    sections: list[tuple[str, str]] = []
    for index, match in enumerate(matches):
        domain_id = match.group(1)
        if domain_id not in DOMAIN_LABELS:
            continue
        start = match.end()
        end = matches[index + 1].start() if index + 1 < len(matches) else len(answer_part)
        sections.append((domain_id, answer_part[start:end]))
    return sections


def split_numbered_blocks(section: str, answer_mode: bool = False) -> list[tuple[int, str]]:
    if answer_mode:
        pattern = r"(?m)^(\d{1,3})\.\s+([ABCD])\.\s+"
    else:
        pattern = r"(?m)^(\d{1,3})\.\s+"
    matches = list(re.finditer(pattern, section))
    blocks: list[tuple[int, str]] = []
    for index, match in enumerate(matches):
        number = int(match.group(1))
        start = match.start()
        end = matches[index + 1].start() if index + 1 < len(matches) else len(section)
        blocks.append((number, section[start:end]))
    return blocks


def split_question_blocks(section: str) -> list[tuple[int, str]]:
    matches = list(re.finditer(r"(?m)^(?:(\d{1,3})\.\s+|(\d{2,3})\s+(?=[A-Z]))", section))
    accepted: list[re.Match[str]] = []
    expected = 1
    for match in matches:
        number = int(match.group(1) or match.group(2))
        if number == expected:
            accepted.append(match)
            expected += 1
        elif number == 1 and expected > 100:
            accepted.append(match)
            expected = 2

    blocks: list[tuple[int, str]] = []
    for index, match in enumerate(accepted):
        number = int(match.group(1) or match.group(2))
        start = match.start()
        end = accepted[index + 1].start() if index + 1 < len(accepted) else len(section)
        blocks.append((number, section[start:end]))
    return blocks


def normalize_choice(value: str) -> str:
    return re.sub(r"\s+", " ", strip_noise(value)).strip()


def clean_choices(domain_id: str, number: int, choices: list[str]) -> tuple[list[str] | None, str | None, bool]:
    cleaned = [normalize_choice(choice) for choice in choices[:4]]
    fixed = False
    replacement = CHOICE_FIXES.get((domain_id, number), {}).get(tuple(cleaned))
    if replacement:
        cleaned = replacement
        fixed = True

    if len(cleaned) != 4 or any(not choice for choice in cleaned):
        return None, "missing choices after cleanup", fixed

    normalized = [choice.casefold() for choice in cleaned]
    duplicate_count = len(normalized) - len(set(normalized))
    if duplicate_count:
        return None, "duplicate choices after cleanup", fixed

    return cleaned, None, fixed


def parse_question_block(block: str) -> tuple[str, list[str]] | None:
    block = strip_noise(block)
    block = re.sub(r"^(?:\d{1,3}\.\s+|\d{2,3}\s+(?=[A-Z]))", "", block).strip()
    choice_matches = list(re.finditer(r"\b([A-Z])\.\s+", block))
    choice_matches = [match for match in choice_matches if match.group(1) in {"A", "B", "C", "D"}]
    labels = [match.group(1) for match in choice_matches]
    if labels[:4] != ["A", "B", "C", "D"]:
        return None
    if len(choice_matches) < 4:
        return None

    question = strip_noise(block[: choice_matches[0].start()])
    choices: list[str] = []
    for index, match in enumerate(choice_matches[:4]):
        start = match.end()
        end = choice_matches[index + 1].start() if index + 1 < 4 else len(block)
        choices.append(strip_noise(block[start:end]))

    if not question or len(choices) != 4 or any(not choice for choice in choices):
        return None
    return question, choices


def parse_answer_block(block: str) -> tuple[int, str] | None:
    block = strip_noise(block)
    match = re.match(r"^(\d{1,3})\.\s+([ABCD])\.\s+(.*)$", block, flags=re.S)
    if not match:
        return None
    answer = ord(match.group(2)) - ord("A")
    explanation = strip_noise(match.group(3))
    if not explanation:
        return None
    return answer, explanation


def build_questions(raw_text: str) -> tuple[list[dict], list[str], int]:
    split_match = re.search(r"Answers to Review\s+Questions", raw_text, flags=re.I)
    if not split_match:
        raise RuntimeError("Could not find the answer appendix marker.")

    question_part = prepare_question_text(raw_text[: split_match.start()])
    answer_part = prepare_answer_text(raw_text[split_match.start() :])

    answer_map: dict[tuple[str, int], tuple[int, str]] = {}
    for domain_id, section in answer_sections(answer_part):
        for number, block in split_numbered_blocks(section, answer_mode=True):
            parsed = parse_answer_block(block)
            if parsed and (domain_id, number) not in answer_map:
                answer_map[(domain_id, number)] = parsed

    questions: dict[tuple[str, int], dict] = {}
    skipped: list[str] = []
    fixed_duplicates = 0
    for domain_id, section in domain_sections(question_part):
        for number, block in split_question_blocks(section):
            key = (domain_id, number)
            if key in questions:
                continue
            parsed_question = parse_question_block(block)
            parsed_answer = answer_map.get(key)
            if not parsed_question or not parsed_answer:
                skipped.append(f"Domain {domain_id} question {number}")
                continue

            question, choices = parsed_question
            cleaned_choices, cleanup_error, fixed = clean_choices(domain_id, number, choices)
            if cleanup_error or not cleaned_choices:
                skipped.append(f"Domain {domain_id} question {number}: {cleanup_error}")
                continue
            if fixed:
                fixed_duplicates += 1
            answer, explanation = parsed_answer
            if answer not in range(4):
                skipped.append(f"Domain {domain_id} question {number} has invalid answer")
                continue

            questions[key] = {
                "id": f"seidl-d{domain_id.replace('.', '-')}-q{number}",
                "domain": DOMAIN_LABELS[domain_id],
                "questionNumber": number,
                "question": question,
                "choices": cleaned_choices,
                "answer": answer,
                "explanation": explanation,
                "source": "David Seidl local import",
            }

    ordered = [questions[key] for key in sorted(questions.keys(), key=lambda item: (item[0], item[1]))]
    return ordered, skipped, fixed_duplicates


def validate(questions: list[dict]) -> None:
    failures: list[str] = []
    for question in questions:
        if len(question["choices"]) != 4:
            failures.append(f"{question['id']} does not have 4 choices")
        normalized_choices = [choice.strip().casefold() for choice in question["choices"]]
        if len(normalized_choices) != len(set(normalized_choices)):
            failures.append(f"{question['id']} has duplicate choices")
        if question["answer"] not in range(4):
            failures.append(f"{question['id']} has an invalid answer")
        if not question["explanation"]:
            failures.append(f"{question['id']} has no explanation")
    if failures:
        raise RuntimeError("\n".join(failures[:25]))


def write_typescript(questions: list[dict]) -> None:
    payload = json.dumps(questions, indent=2, ensure_ascii=True)
    content = f"""export type QuizQuestion = {{
  id: string;
  domain: string;
  questionNumber: number;
  question: string;
  choices: [string, string, string, string];
  answer: number;
  explanation: string;
  source: "David Seidl local import";
}};

export const seidlQuestions = {payload} satisfies QuizQuestion[];
"""
    OUTPUT_PATH.write_text(content, encoding="utf-8")


def main() -> None:
    raw_text = SOURCE_PATH.read_text(encoding="utf-8", errors="replace")
    questions, skipped, fixed_duplicates = build_questions(raw_text)
    validate(questions)
    write_typescript(questions)

    counts = Counter(question["domain"] for question in questions)
    print(f"Imported {len(questions)} questions into {OUTPUT_PATH}")
    for domain in DOMAIN_LABELS.values():
        print(f"- {domain}: {counts[domain]}")
    print(f"Fixed duplicate-choice questions: {fixed_duplicates}")
    if skipped:
        unique_skipped = sorted(set(skipped))
        print(f"Skipped {len(unique_skipped)} malformed or unmatched blocks")
        for item in unique_skipped[:20]:
            print(f"- {item}")


if __name__ == "__main__":
    main()

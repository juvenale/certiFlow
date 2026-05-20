from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCES = [
    ("messer", Path(r"C:\Users\juven\Documents\Messer PBQs.txt"), r"^\d+\.\s+Modèle Messer PBQ\s+[-—]\s+"),
    ("pbq2", Path(r"C:\Users\juven\Documents\PBQ2.txt"), r"^PBQ\s+\d+\s+[-—]\s+"),
]
OUTPUT_PATH = ROOT / "data" / "imported-pbq-exercises.ts"

DOMAIN_MAP = {
    "1.1": "General Security Concepts",
    "1.2": "General Security Concepts",
    "1.4": "General Security Concepts",
    "2.2": "Threats, Vulnerabilities, and Mitigations",
    "2.4": "Threats, Vulnerabilities, and Mitigations",
    "2.5": "Threats, Vulnerabilities, and Mitigations",
    "3.1": "Security Architecture",
    "3.2": "Security Architecture",
    "3.3": "Security Architecture",
    "4.1": "Security Operations",
    "4.3": "Security Operations",
    "4.5": "Security Operations",
    "4.6": "Security Operations",
    "4.8": "Security Operations",
    "4.9": "Security Operations",
    "5.2": "Security Program Management and Oversight",
}


def normalize(value: str) -> str:
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


def clean(value: str) -> str:
    value = normalize(value)
    value = re.sub(r"\n{3,}", "\n\n", value)
    return value.strip()


def slugify(value: str) -> str:
    value = normalize(value).lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "pbq"


def split_sections(text: str, heading_pattern: str) -> list[tuple[str, str]]:
    matches = list(re.finditer(heading_pattern + r"(.+?)\s*$", text, flags=re.M))
    sections: list[tuple[str, str]] = []
    for index, match in enumerate(matches):
        title = clean(match.group(1))
        start = match.start()
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        sections.append((title, text[start:end]))
    return sections


def guess_domain(section: str) -> str:
    objectives = re.findall(r"\b([1-5]\.\d)\b", section)
    for objective in objectives:
        if objective in DOMAIN_MAP:
            return DOMAIN_MAP[objective]
    title_lower = section.lower()
    if any(word in title_lower for word in ["attack", "injection", "malicious", "mitigation"]):
        return "Threats, Vulnerabilities, and Mitigations"
    if any(word in title_lower for word in ["cloud", "data", "crypto", "architecture"]):
        return "Security Architecture"
    if any(word in title_lower for word in ["incident", "siem", "firewall", "iam", "forensics", "vulnerability"]):
        return "Security Operations"
    if any(word in title_lower for word in ["risk", "compliance", "responsibility"]):
        return "Security Program Management and Oversight"
    return "General Security Concepts"


def guess_kind(title: str, section: str) -> str:
    haystack = f"{title}\n{section}".lower()
    if any(word in haystack for word in ["order", "ordering", "timeline", "prioritization", "priority"]):
        return "ordering"
    if any(word in haystack for word in ["classify", "category", "classification"]):
        return "classification"
    if any(word in haystack for word in ["matrix", "decision"]):
        return "matrix"
    if "select three" in haystack or "select two" in haystack:
        return "multi_select"
    if "match" in haystack or "matching" in haystack or "associer" in haystack:
        return "matching"
    if "table" in haystack or "firewall" in haystack:
        return "table_completion"
    if "choose" in haystack or "select" in haystack:
        return "single_choice"
    return "self_check"


def lines_after(section: str, headings: list[str]) -> list[str]:
    pattern = r"(?im)^(" + "|".join(re.escape(heading) for heading in headings) + r")\s*:?\s*$"
    match = re.search(pattern, section)
    if not match:
        return []
    rest = section[match.end() :]
    stop = re.search(
        r"(?im)^(Correction détaillée|Scoring|Pièges|Pièges à intégrer|Piège principal|Extension réaliste|Règle de génération|Format JSON|Pourquoi c’est proche Messer)\s*:?\s*$",
        rest,
    )
    if stop:
        rest = rest[: stop.start()]
    return [clean(line) for line in rest.splitlines() if clean(line)]


def block_between(section: str, start_headings: list[str], stop_headings: list[str]) -> str:
    pattern = r"(?im)^(" + "|".join(re.escape(heading) for heading in start_headings) + r")\s*:?\s*$"
    match = re.search(pattern, section)
    if not match:
        return ""
    rest = section[match.end() :]
    stop = re.search(r"(?im)^(" + "|".join(re.escape(heading) for heading in stop_headings) + r")\s*:?\s*$", rest)
    if stop:
        rest = rest[: stop.start()]
    return clean(rest)


def prompt_block(section: str) -> str:
    prompt = block_between(
        section,
        ["Prompt candidat", "Prompt", "Prompt original", "Prompt original reproductible"],
        ["Expected answer", "Expected answers", "Expected order", "Expected priority", "Expected classification", "Expected matching", "Réponses attendues", "Scoring", "Pièges"],
    )
    if prompt:
        return prompt
    before_expected = re.split(r"(?im)^(Expected answer|Expected answers|Expected order|Expected priority|Expected classification|Expected matching|Réponses attendues)\s*:?\s*$", section)[0]
    return clean(before_expected)


def extract_options(section: str) -> list[str]:
    options: list[str] = []
    for heading in [
        "Banque d’options",
        "Attack type options",
        "Mitigation options",
        "Available controls",
        "Contrôles disponibles",
        "Available solutions",
        "Secure replacements",
        "Classification options",
        "Protection options",
        "Technologies",
        "Purposes",
        "Choose DMARC policy",
    ]:
        options.extend(lines_after(section, [heading])[:20])
    cleaned: list[str] = []
    for option in options:
        if option and option not in cleaned and not option.lower().startswith(("expected", "correction", "scoring")):
            cleaned.append(option)
    return cleaned[:40]


def extract_expected(section: str) -> list[str]:
    expected: list[str] = []
    for heading in ["Réponses attendues", "Expected answer", "Expected answers", "Expected order", "Expected priority", "Expected classification", "Expected matching", "Expected IOCs", "Expected"]:
        expected.extend(lines_after(section, [heading]))
    filtered = []
    for line in expected:
        if line and not line.lower().startswith(("scoring", "pièges", "correction")) and line not in filtered:
            filtered.append(line)
    return filtered[:80]


def extract_traps(section: str) -> list[str]:
    traps = []
    for heading in ["Pièges", "Pièges à intégrer", "Piège principal"]:
        traps.extend(lines_after(section, [heading]))
    return traps[:30]


def make_exercise(source: str, index: int, title: str, section: str) -> dict:
    expected = extract_expected(section)
    explanation = block_between(section, ["Correction détaillée"], ["Scoring", "Pièges", "Pièges à intégrer", "Piège principal"])
    traps = extract_traps(section)
    kind = guess_kind(title, section)
    return {
        "id": f"{source}-scenario-{index:03d}",
        "domain": guess_domain(section),
        "type": "scenario_tasks",
        "title": title,
        "difficulty": "simulation" if source == "messer" else "advanced",
        "timeLimitSeconds": 420 if kind in {"ordering", "table_completion", "matrix"} else 300,
        "role": "Security+ Candidate",
        "scenario": prompt_block(section),
        "objective": "Complete the PBQ scenario tasks and compare against the expected answer.",
        "source": "Messer PBQs local import" if source == "messer" else "PBQ2 local import",
        "skills": sorted(set(re.findall(r"\b[1-5]\.\d\b", section)))[:8],
        "tasks": [
            {
                "id": f"{source}-scenario-{index:03d}-task-1",
                "kind": kind,
                "title": title,
                "prompt": prompt_block(section),
                "options": extract_options(section),
                "expectedAnswers": expected,
                "explanation": explanation or clean(section),
                "traps": traps,
                "points": 100,
            }
        ],
        "scoring": {
            "max": 100,
            "rules": [{"condition": "expected_answer_reviewed", "points": 100}],
            "penalties": [],
        },
    }


def main() -> None:
    exercises: list[dict] = []
    report: list[str] = []
    for source, path, heading_pattern in SOURCES:
        if not path.exists() or path.stat().st_size == 0:
            report.append(f"{path.name}: empty or missing, skipped")
            continue
        text = normalize(path.read_text(encoding="utf-8", errors="replace"))
        sections = split_sections(text, heading_pattern)
        report.append(f"{path.name}: {len(sections)} PBQ detected")
        for index, (title, section) in enumerate(sections, 1):
            exercises.append(make_exercise(source, index, title, section))

    payload = json.dumps(exercises, indent=2, ensure_ascii=True)
    content = f"""import type {{ ScenarioTasksPBQ }} from './pbq';

export const importedPbqExercises = {payload} satisfies ScenarioTasksPBQ[];
"""
    OUTPUT_PATH.write_text(content, encoding="utf-8")

    scenario_count = sum(1 for exercise in exercises if exercise["type"] == "scenario_tasks")
    print(f"Imported {len(exercises)} PBQ exercises into {OUTPUT_PATH}")
    for line in report:
        print(f"- {line}")
    print(f"Scenario tasks: {scenario_count}")
    print("Converted to existing types: 0")


if __name__ == "__main__":
    main()

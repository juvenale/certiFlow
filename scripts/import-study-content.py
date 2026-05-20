from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path


SOURCE_PATH = Path(r"C:\Users\juven\Documents\flashcard cours.txt")
OUTPUT_PATH = Path(__file__).resolve().parents[1] / "data" / "study-content.ts"

THEME_DOMAIN_MAP = {
    "Concepts fondamentaux de sécurité": "General Security Concepts",
    "Types de contrôles de sécurité": "General Security Concepts",
    "Sécurité physique": "General Security Concepts",
    "Deception and disruption": "General Security Concepts",
    "Cryptographie et PKI": "General Security Concepts",
    "Menaces, acteurs et motivations": "Threats, Vulnerabilities, and Mitigations",
    "Social Engineering": "Threats, Vulnerabilities, and Mitigations",
    "Malware et attaques": "Threats, Vulnerabilities, and Mitigations",
    "Attaques réseau et application": "Threats, Vulnerabilities, and Mitigations",
    "Sécurité réseau": "Security Architecture",
    "Wi-Fi et mobile": "Security Architecture",
    "Cloud et architecture": "Security Architecture",
    "Résilience, sauvegarde et continuité": "Security Architecture",
    "Security Operations": "Security Operations",
    "Incident Response et Forensics": "Security Operations",
    "Gouvernance, risque et conformité": "Security Program Management and Oversight",
    "Audit, conformité et tiers": "Security Program Management and Oversight",
}


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
    return value


def clean(value: str) -> str:
    return re.sub(r"\s+", " ", ascii_text(value)).strip()


def slugify(value: str) -> str:
    value = unicodedata.normalize("NFKD", clean(value).lower()).encode("ascii", "ignore").decode("ascii")
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "item"


def parse_sections(text: str) -> list[dict]:
    themes: list[dict] = []
    current: dict | None = None

    for raw_line in text.splitlines():
        line = raw_line.strip()
        if not line:
            continue

        heading = re.match(r"^(\d+)\.\s+(.+)$", line)
        if heading:
            if current:
                themes.append(current)
            title = clean(heading.group(2))
            current = {
                "id": slugify(title),
                "title": title,
                "domain": THEME_DOMAIN_MAP.get(title, "General Security Concepts"),
                "items": [],
            }
            continue

        if current is None:
            continue

        if "\t" not in line:
            continue

        cells = [clean(cell) for cell in line.split("\t") if clean(cell)]
        if len(cells) < 3:
            continue
        if cells[0].lower() in {"terme", "sigle / terme"}:
            continue

        term, definition, details = cells[0], cells[1], " ".join(cells[2:])
        if not term or not definition or not details:
            continue

        item_id = f"{current['id']}-{slugify(term)}"
        current["items"].append(
            {
                "id": item_id,
                "themeId": current["id"],
                "themeTitle": current["title"],
                "domain": current["domain"],
                "term": term,
                "definition": definition,
                "details": details,
                "source": "flashcard cours local import",
            }
        )

    if current:
        themes.append(current)
    return themes


def validate(themes: list[dict]) -> None:
    failures: list[str] = []
    for theme in themes:
        if not theme["items"]:
            failures.append(f"{theme['title']} has no items")
        for item in theme["items"]:
            for key in ("term", "definition", "details", "domain", "themeTitle"):
                if not item[key]:
                    failures.append(f"{item['id']} missing {key}")
    if failures:
        raise RuntimeError("\n".join(failures[:25]))


def write_typescript(themes: list[dict]) -> None:
    items = [item for theme in themes for item in theme["items"]]
    themes_payload = json.dumps(themes, indent=2, ensure_ascii=True)
    items_payload = json.dumps(items, indent=2, ensure_ascii=True)
    content = f"""export type StudyItem = {{
  id: string;
  themeId: string;
  themeTitle: string;
  domain: string;
  term: string;
  definition: string;
  details: string;
  source: "flashcard cours local import";
}};

export type StudyTheme = {{
  id: string;
  title: string;
  domain: string;
  items: StudyItem[];
}};

export const studyThemes = {themes_payload} satisfies StudyTheme[];

export const studyItems = {items_payload} satisfies StudyItem[];
"""
    OUTPUT_PATH.write_text(content, encoding="utf-8")


def main() -> None:
    raw_text = SOURCE_PATH.read_text(encoding="utf-8", errors="replace")
    themes = parse_sections(raw_text)
    validate(themes)
    write_typescript(themes)

    print(f"Imported {len(themes)} themes into {OUTPUT_PATH}")
    print(f"Imported {sum(len(theme['items']) for theme in themes)} study items")
    for theme in themes:
        print(f"- {theme['title']} [{theme['domain']}]: {len(theme['items'])}")


if __name__ == "__main__":
    main()

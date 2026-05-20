from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path


SOURCE_PATH = Path(r"C:\Users\juven\Documents\flashcardAcronyms.txt")
OUTPUT_PATH = Path(__file__).resolve().parents[1] / "data" / "acronym-flashcards.ts"

THEME_DOMAIN_MAP = {
    "Concepts fondamentaux": "General Security Concepts",
    "Contrôles de sécurité": "General Security Concepts",
    "Cryptographie et PKI": "General Security Concepts",
    "Réseau et sécurité réseau": "Security Architecture",
    "Email security": "Threats, Vulnerabilities, and Mitigations",
    "Authentification et accès": "General Security Concepts",
    "Wireless, mobile et endpoint": "Security Architecture",
    "Cloud et architecture": "Security Architecture",
    "Vulnérabilités, tests et sécurité applicative": "Threats, Vulnerabilities, and Mitigations",
    "Malware et attaques": "Threats, Vulnerabilities, and Mitigations",
    "Incident response et forensics": "Security Operations",
    "Résilience, sauvegardes et risque": "Security Architecture",
    "Gouvernance, conformité et contrats": "Security Program Management and Oversight",
    "Standards, frameworks et organisations": "Security Program Management and Oversight",
    "Data et classification": "Security Program Management and Oversight",
}


def normalize_text(value: str) -> str:
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
    return re.sub(r"\s+", " ", normalize_text(value)).strip()


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

        if current is None or "\t" not in line:
            continue

        cells = [clean(cell) for cell in line.split("\t") if clean(cell)]
        if len(cells) < 4:
            continue
        if cells[0].lower().startswith("acronyme"):
            continue

        acronym, english, explanation, details = cells[0], cells[1], cells[2], " ".join(cells[3:])
        current["items"].append(
            {
                "id": f"{current['id']}-{slugify(acronym)}",
                "themeId": current["id"],
                "themeTitle": current["title"],
                "domain": current["domain"],
                "acronym": acronym,
                "english": english,
                "explanation": explanation,
                "details": details,
                "source": "flashcardAcronyms local import",
            }
        )

    if current:
        themes.append(current)
    return themes


def validate(themes: list[dict]) -> None:
    failures: list[str] = []
    for theme in themes:
        if not theme["items"]:
            failures.append(f"{theme['title']} has no acronyms")
        for item in theme["items"]:
            for key in ("acronym", "english", "explanation", "details"):
                if not item[key]:
                    failures.append(f"{item['id']} missing {key}")
    if failures:
        raise RuntimeError("\n".join(failures[:25]))


def write_typescript(themes: list[dict]) -> None:
    items = [item for theme in themes for item in theme["items"]]
    themes_payload = json.dumps(themes, indent=2, ensure_ascii=False)
    items_payload = json.dumps(items, indent=2, ensure_ascii=False)
    content = f"""export type AcronymFlashcard = {{
  id: string;
  themeId: string;
  themeTitle: string;
  domain: string;
  acronym: string;
  english: string;
  explanation: string;
  details: string;
  source: "flashcardAcronyms local import";
}};

export type AcronymTheme = {{
  id: string;
  title: string;
  domain: string;
  items: AcronymFlashcard[];
}};

export const acronymThemes = {themes_payload} satisfies AcronymTheme[];

export const acronymFlashcards = {items_payload} satisfies AcronymFlashcard[];
"""
    OUTPUT_PATH.write_text(content, encoding="utf-8")


def main() -> None:
    raw_text = SOURCE_PATH.read_text(encoding="utf-8", errors="replace")
    themes = parse_sections(raw_text)
    validate(themes)
    write_typescript(themes)

    print(f"Imported {len(themes)} acronym themes into {OUTPUT_PATH}")
    print(f"Imported {sum(len(theme['items']) for theme in themes)} acronym flashcards")
    for theme in themes:
        print(f"- {theme['title']} [{theme['domain']}]: {len(theme['items'])}")


if __name__ == "__main__":
    main()

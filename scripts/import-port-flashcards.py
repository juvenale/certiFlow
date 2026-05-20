from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path


SOURCE_PATH = Path(r"C:\Users\juven\Documents\FlashcardPorts.txt")
OUTPUT_PATH = Path(__file__).resolve().parents[1] / "data" / "port-flashcards.ts"


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
    return value


def clean(value: str) -> str:
    return re.sub(r"\s+", " ", normalize_text(value)).strip()


def slugify(value: str) -> str:
    value = unicodedata.normalize("NFKD", clean(value).lower()).encode("ascii", "ignore").decode("ascii")
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "port"


def parse_ports(text: str) -> list[dict]:
    cards: list[dict] = []
    for raw_line in text.splitlines():
        line = raw_line.strip()
        if not line or "\t" not in line:
            continue

        cells = [clean(cell) for cell in line.split("\t")]
        if len(cells) < 5:
            continue
        if cells[0].lower() == "port":
            continue

        port, protocol, english, details, secure_alternative = cells[:5]
        cards.append(
            {
                "id": f"port-{slugify(port)}-{slugify(protocol)}",
                "port": port,
                "protocol": protocol,
                "english": english,
                "details": details,
                "secureAlternative": secure_alternative,
                "domain": "Security Architecture",
                "source": "FlashcardPorts local import",
            }
        )
    return cards


def validate(cards: list[dict]) -> None:
    failures: list[str] = []
    for card in cards:
        for key in ("port", "protocol", "english", "details", "secureAlternative"):
            if not card[key]:
                failures.append(f"{card['id']} missing {key}")
    if failures:
        raise RuntimeError("\n".join(failures[:25]))


def write_typescript(cards: list[dict]) -> None:
    payload = json.dumps(cards, indent=2, ensure_ascii=False)
    content = f"""export type PortFlashcard = {{
  id: string;
  port: string;
  protocol: string;
  english: string;
  details: string;
  secureAlternative: string;
  domain: "Security Architecture";
  source: "FlashcardPorts local import";
}};

export const portFlashcards = {payload} satisfies PortFlashcard[];
"""
    OUTPUT_PATH.write_text(content, encoding="utf-8")


def main() -> None:
    raw_text = SOURCE_PATH.read_text(encoding="utf-8", errors="replace")
    cards = parse_ports(raw_text)
    validate(cards)
    write_typescript(cards)
    print(f"Imported {len(cards)} port/protocol flashcards into {OUTPUT_PATH}")
    for card in cards:
        print(f"- {card['port']} {card['protocol']}: {card['english']}")


if __name__ == "__main__":
    main()

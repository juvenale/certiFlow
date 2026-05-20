from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(r"C:\Users\juven\Documents\Confusion.txt")
OUTPUT = ROOT / "data" / "confusions.ts"

DOMAIN_BY_SECTION = {
    "Concepts de sécurité": "General Security Concepts",
    "Catégories et types de contrôles": "General Security Concepts",
    "Réseau": "Security Architecture",
    "Protocoles sécurisés vs non sécurisés": "Security Architecture",
    "Cryptographie / PKI": "General Security Concepts",
    "IAM / accès": "General Security Concepts",
    "Attaques sociales": "Threats, Vulnerabilities, and Mitigations",
    "Malware / attaques techniques": "Threats, Vulnerabilities, and Mitigations",
    "Vulnérabilités / tests": "Threats, Vulnerabilities, and Mitigations",
    "Cloud / architecture": "Security Architecture",
    "Données / protection": "Security Architecture",
    "Résilience / continuité": "Security Architecture",
    "Incident response / investigation": "Security Operations",
    "Risque / GRC": "Security Program Management and Oversight",
    "Contrats / politiques": "Security Program Management and Oversight",
    "Email / identité domaine": "Security Operations",
    "Logs / monitoring": "Security Operations",
}


def slugify(value: str) -> str:
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def main() -> None:
    if not SOURCE.exists():
        raise FileNotFoundError(f"Missing source file: {SOURCE}")

    current_section: dict[str, str] | None = None
    sections: list[dict] = []
    items: list[dict] = []
    skipped = 0

    for raw_line in SOURCE.read_text(encoding="utf-8-sig").splitlines():
        line = raw_line.strip()
        if not line:
            continue

        section_match = re.match(r"^(\d+)\.\s+(.+)$", line)
        if section_match:
            number, title = section_match.groups()
            section_id = f"confusion-{number.zfill(2)}-{slugify(title)}"
            current_section = {
                "id": section_id,
                "number": int(number),
                "title": title,
                "domain": DOMAIN_BY_SECTION.get(title, "General Security Concepts"),
            }
            sections.append({**current_section, "items": []})
            continue

        if line.startswith("Confusion\t") or current_section is None:
            continue

        parts = [part.strip() for part in line.split("\t")]
        if len(parts) != 3 or not all(parts):
            skipped += 1
            continue

        comparison, english, difference = parts
        item = {
            "id": f"{current_section['id']}-{slugify(comparison)}",
            "sectionId": current_section["id"],
            "sectionTitle": current_section["title"],
            "domain": current_section["domain"],
            "comparison": comparison,
            "english": english,
            "difference": difference,
            "source": "Confusion local import",
        }
        items.append(item)
        sections[-1]["items"].append(item)

    payload = (
        "export type ConfusionItem = {\n"
        "  id: string;\n"
        "  sectionId: string;\n"
        "  sectionTitle: string;\n"
        "  domain: string;\n"
        "  comparison: string;\n"
        "  english: string;\n"
        "  difference: string;\n"
        "  source: \"Confusion local import\";\n"
        "};\n\n"
        "export type ConfusionSection = {\n"
        "  id: string;\n"
        "  number: number;\n"
        "  title: string;\n"
        "  domain: string;\n"
        "  items: ConfusionItem[];\n"
        "};\n\n"
        f"export const confusionSections = {json.dumps(sections, ensure_ascii=False, indent=2)} satisfies ConfusionSection[];\n\n"
        f"export const confusionItems = {json.dumps(items, ensure_ascii=False, indent=2)} satisfies ConfusionItem[];\n"
    )

    OUTPUT.write_text(payload, encoding="utf-8")

    print(f"Imported {len(items)} confusion items into {OUTPUT}")
    print(f"Detected {len(sections)} sections")
    for section in sections:
        print(f"- {section['title']}: {len(section['items'])}")
    if skipped:
        print(f"Skipped {skipped} malformed lines")


if __name__ == "__main__":
    main()

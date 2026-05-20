from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(r"C:\Users\juven\Documents\Commandes et outils fréquents.txt")
OUTPUT = ROOT / "data" / "command-tools.ts"


def slugify(value: str) -> str:
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def read_rows() -> list[str]:
    if not SOURCE.exists():
        raise FileNotFoundError(f"Missing source file: {SOURCE}")
    return [line.strip() for line in SOURCE.read_text(encoding="utf-8-sig").splitlines() if line.strip()]


def main() -> None:
    rows = read_rows()
    mode = "tools"
    tools: list[dict] = []
    confusions: list[dict] = []
    scenarios: list[dict] = []
    skipped = 0

    for line in rows:
        if line.startswith("Commandes et outils fréquents"):
            continue
        if line == "Confusions fréquentes sur les commandes/outils":
            mode = "confusions"
            continue
        if line.startswith("Mini-table"):
            mode = "scenarios"
            continue
        if line.startswith("Commande / outil\t") or line.startswith("Confusion\t") or line.startswith("Scénario\t"):
            continue

        parts = [part.strip() for part in line.split("\t")]
        if mode == "tools":
            if len(parts) != 4 or not all(parts):
                skipped += 1
                continue
            name, english, purpose, examTip = parts
            tools.append(
                {
                    "id": f"command-tool-{slugify(name)}",
                    "name": name,
                    "english": english,
                    "purpose": purpose,
                    "examTip": examTip,
                    "domain": "Security Operations",
                    "source": "Commandes et outils fréquents local import",
                }
            )
        elif mode == "confusions":
            if len(parts) != 2 or not all(parts):
                skipped += 1
                continue
            comparison, difference = parts
            confusions.append(
                {
                    "id": f"command-confusion-{slugify(comparison)}",
                    "comparison": comparison,
                    "difference": difference,
                    "sectionTitle": "Commandes et outils",
                    "domain": "Security Operations",
                    "source": "Commandes et outils fréquents local import",
                }
            )
        elif mode == "scenarios":
            if len(parts) != 2 or not all(parts):
                skipped += 1
                continue
            scenario, likelyTool = parts
            scenarios.append(
                {
                    "id": f"command-scenario-{slugify(scenario)}",
                    "scenario": scenario,
                    "likelyTool": likelyTool,
                    "domain": "Security Operations",
                    "source": "Commandes et outils fréquents local import",
                }
            )

    payload = (
        "export type CommandTool = {\n"
        "  id: string;\n"
        "  name: string;\n"
        "  english: string;\n"
        "  purpose: string;\n"
        "  examTip: string;\n"
        "  domain: \"Security Operations\";\n"
        "  source: \"Commandes et outils fréquents local import\";\n"
        "};\n\n"
        "export type CommandToolConfusion = {\n"
        "  id: string;\n"
        "  comparison: string;\n"
        "  difference: string;\n"
        "  sectionTitle: \"Commandes et outils\";\n"
        "  domain: \"Security Operations\";\n"
        "  source: \"Commandes et outils fréquents local import\";\n"
        "};\n\n"
        "export type CommandToolScenario = {\n"
        "  id: string;\n"
        "  scenario: string;\n"
        "  likelyTool: string;\n"
        "  domain: \"Security Operations\";\n"
        "  source: \"Commandes et outils fréquents local import\";\n"
        "};\n\n"
        f"export const commandTools = {json.dumps(tools, ensure_ascii=False, indent=2)} satisfies CommandTool[];\n\n"
        f"export const commandToolConfusions = {json.dumps(confusions, ensure_ascii=False, indent=2)} satisfies CommandToolConfusion[];\n\n"
        f"export const commandToolScenarios = {json.dumps(scenarios, ensure_ascii=False, indent=2)} satisfies CommandToolScenario[];\n"
    )

    OUTPUT.write_text(payload, encoding="utf-8")
    print(f"Imported {len(tools)} command/tools into {OUTPUT}")
    print(f"Imported {len(confusions)} command/tool confusions")
    print(f"Imported {len(scenarios)} command/tool scenarios")
    if skipped:
        print(f"Skipped {skipped} malformed lines")


if __name__ == "__main__":
    main()

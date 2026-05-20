"""Compute real domain stats from question bank."""
import json
from pathlib import Path
from collections import defaultdict

ROOT = Path(__file__).resolve().parent.parent

DOMAINS = {
    "General Security Concepts": {"id": "d1", "weight": 12},
    "Threats, Vulnerabilities, and Mitigations": {"id": "d2", "weight": 22},
    "Security Architecture": {"id": "d3", "weight": 18},
    "Security Operations": {"id": "d4", "weight": 28},
    "Security Program Management and Oversight": {"id": "d5", "weight": 20},
}

def extract_array(text: str, var_name: str):
    """Extract JSON array assigned to a const export."""
    idx = text.find(f"export const {var_name}")
    if idx < 0: return []
    idx = text.find("= [", idx)
    if idx < 0: return []
    idx = text.find("[", idx)
    depth = 0; end = -1
    for i in range(idx, len(text)):
        if text[i] == "[": depth += 1
        elif text[i] == "]":
            depth -= 1
            if depth == 0: end = i + 1; break
    if end < 0: return []
    try:
        return json.loads(text[idx:end])
    except Exception as e:
        print(f"JSON parse error: {e}")
        return []

seidl = (ROOT / "data" / "seidl-questions.ts").read_text(encoding="utf-8")
questions = extract_array(seidl, "seidlQuestions")
print(f"Quiz questions loaded: {len(questions)}")

domain_counts = defaultdict(int)
for q in questions:
    domain_counts[q.get("domain", "Unknown")] += 1

print("\nQuestions per domain:")
for name, info in DOMAINS.items():
    print(f"  {name}: {domain_counts.get(name, 0)} (weight: {info['weight']}%)")

# Generate TypeScript
out = ROOT / "data" / "domain-stats.ts"
lines = [
    "export interface DomainStats {",
    "  id: string; name: string; weight: number; totalQuestions: number;",
    "}",
    "",
    "export const domainStats: DomainStats[] = [",
]
for name, info in DOMAINS.items():
    c = domain_counts.get(name, 0)
    lines.append(f'  {{ id: "{info["id"]}", name: "{name}", weight: {info["weight"]}, totalQuestions: {c} }},')
lines.append("];")
out.write_text("\n".join(lines), encoding="utf-8")
print(f"\nWritten {out}")

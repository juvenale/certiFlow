"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { CountdownTimer, ScoringDisplay, Badge, ActionButton, GhostButton, usePBQPersist } from "./pbq-shared";
import type { FirewallPBQ, FirewallExpectedRule } from "@/data/pbq";

function emptyRow(): FirewallExpectedRule { return { source: "", destination: "", protocol: "TCP", port: "" as unknown as number, action: "Allow" as const }; }

export function FirewallRulesPBQ({ exercise, onReset }: { exercise: FirewallPBQ; onReset: () => void }) {
  const maxRows = 5;
  const persist = usePBQPersist(exercise.id);
  const [rows, setRows] = useState<FirewallExpectedRule[]>(() => {
    const saved = persist.load<FirewallExpectedRule[]>();
    if (saved && saved.length === maxRows) return saved;
    return Array.from({ length: maxRows }, emptyRow);
  });
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [answerDetails, setAnswerDetails] = useState<{ label: string; userAnswer: string; correct: string; isCorrect: boolean }[]>([]);

  useEffect(() => { if (!submitted) persist.save(rows); }, [rows, submitted, persist]);

  const filled = rows.filter((r) => r.source && r.destination && String(r.port) !== "");
  const incomplete = maxRows - filled.length;

  function updateRow(i: number, field: keyof FirewallExpectedRule, value: string) {
    if (submitted) return;
    setRows((prev) => prev.map((r, idx) => {
      if (idx !== i) return r;
      if (field === "action") return { ...r, action: value as "Allow" | "Deny" };
      if (field === "port") return { ...r, port: value === "" ? ("" as unknown as number) : value === "ANY" ? "ANY" : Number(value) };
      if (field === "protocol") return { ...r, protocol: value };
      return { ...r, [field]: value };
    }));
  }

  function grade() {
    const fb: string[] = [];
    const details: { label: string; userAnswer: string; correct: string; isCorrect: boolean }[] = [];
    let total = 0;
    const penalties = exercise.scoring.penalties || [];

    for (let i = 0; i < exercise.expectedRules.length; i++) {
      const exp = exercise.expectedRules[i];
      const matched = filled.some((r) =>
        (r.source === exp.source || exp.source === "ANY") &&
        (r.destination === exp.destination || exp.destination === "ANY") &&
        r.protocol === exp.protocol &&
        (r.port === exp.port || exp.port === "ANY") &&
        r.action === exp.action
      );
      const pts = i < exercise.scoring.rules.length ? exercise.scoring.rules[i].points : 10;
      const label = `${exp.action} ${exp.source}->${exp.destination} :${exp.port}/${exp.protocol}`;
      details.push({ label, userAnswer: matched ? "present" : "absent", correct: "present", isCorrect: matched });
      if (matched) { total += pts; fb.push(`${exercise.scoring.rules[i]?.condition || "regle"}: +${pts} pts`); }
      else fb.push(`${exercise.scoring.rules[i]?.condition || "regle"}: manquant`);
    }

    for (const p of penalties) {
      let triggered = false;
      if (p.condition === "database_exposed_to_internet" && filled.some((r) => r.action === "Allow" && r.destination === "Database Server" && (r.source === "Internet" || r.source === "ANY"))) triggered = true;
      if (p.condition === "allow_any_any" && filled.some((r) => r.action === "Allow" && r.source === "ANY" && r.destination === "ANY")) triggered = true;
      if (p.condition === "rdp_exposed_to_internet" && filled.some((r) => r.action === "Allow" && r.port === 3389 && (r.source === "Internet" || r.source === "ANY"))) triggered = true;
      if (triggered) { total += p.points; details.push({ label: p.condition, userAnswer: "detecte", correct: "absent", isCorrect: false }); fb.push(`Penalite ${p.condition}: ${p.points} pts`); }
    }

    total = Math.max(0, Math.min(exercise.scoring.max, total));
    setScore(total); setFeedback(fb); setAnswerDetails(details); setSubmitted(true);
    persist.clear();
  }

  function reset() { persist.clear(); onReset(); }

  return (
    <div>
      <CountdownTimer seconds={exercise.timeLimitSeconds} onExpire={grade} incompleteCount={incomplete} />
      <div className="mb-4 rounded-card border border-border bg-muted p-4">
        <p className="font-bold">{exercise.role}</p>
        <p className="mt-1 text-muted-foreground">{exercise.scenario}</p>
        <ul className="mt-2 space-y-1">
          {exercise.requirements.map((r, i) => <li key={i} className="flex items-start gap-2 text-sm"><ArrowRight className="mt-0.5 h-4 w-4 text-primary shrink-0" /> {r}</li>)}
        </ul>
      </div>
      <div className="mb-3 flex flex-wrap gap-2">
        {exercise.assets.map((a) => <Badge key={a.name}>{a.name}: {a.ip}</Badge>)}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border text-left"><th className="p-2 font-bold">#</th><th className="p-2 font-bold">Source</th><th className="p-2 font-bold">Destination</th><th className="p-2 font-bold">Protocol</th><th className="p-2 font-bold">Port</th><th className="p-2 font-bold">Action</th></tr></thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={cn("border-b border-border", String(row.port) === "" ? "opacity-50" : "")}>
                <td className="p-2 font-mono">{i + 1}</td>
                <td className="p-2"><select value={row.source} onChange={(e) => updateRow(i, "source", e.target.value)} disabled={submitted} className="w-full rounded-card border border-border bg-card p-2 text-sm"><option value="">--</option>{exercise.assets.map((a) => <option key={a.name} value={a.name}>{a.name}</option>)}</select></td>
                <td className="p-2"><select value={row.destination} onChange={(e) => updateRow(i, "destination", e.target.value)} disabled={submitted} className="w-full rounded-card border border-border bg-card p-2 text-sm"><option value="">--</option>{exercise.assets.map((a) => <option key={a.name} value={a.name}>{a.name}</option>)}</select></td>
                <td className="p-2"><select value={row.protocol} onChange={(e) => updateRow(i, "protocol", e.target.value)} disabled={submitted} className="w-full rounded-card border border-border bg-card p-2 text-sm"><option value="TCP">TCP</option><option value="UDP">UDP</option><option value="ANY">ANY</option></select></td>
                <td className="p-2"><select value={String(row.port)} onChange={(e) => updateRow(i, "port", e.target.value)} disabled={submitted} className="w-full rounded-card border border-border bg-card p-2 text-sm"><option value="">--</option>{exercise.ports.map((p) => <option key={p.port} value={String(p.port)}>{p.port} ({p.service})</option>)}<option value="ANY">ANY</option></select></td>
                <td className="p-2"><select value={row.action} onChange={(e) => updateRow(i, "action", e.target.value)} disabled={submitted} className="w-full rounded-card border border-border bg-card p-2 text-sm"><option value="Allow">Allow</option><option value="Deny">Deny</option></select></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {!submitted && <ActionButton onClick={grade}>Corriger</ActionButton>}
        {submitted && <ScoringDisplay score={score} max={exercise.scoring.max} feedback={feedback} correctAnswers={answerDetails} />}
        <GhostButton onClick={reset}>Retour aux PBQ</GhostButton>
      </div>
    </div>
  );
}
function cn(...args: (string | false | undefined | null)[]): string { return args.filter(Boolean).join(" "); }

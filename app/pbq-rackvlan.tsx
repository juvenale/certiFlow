"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { CountdownTimer, ScoringDisplay, ActionButton, GhostButton, usePBQPersist } from "./pbq-shared";
import type { RackVLANPBQ } from "@/data/pbq";

type Answer = { rack: string; vlan: string };

export function RackVLANPBQView({ exercise, onReset }: { exercise: RackVLANPBQ; onReset: () => void }) {
  const persist = usePBQPersist(exercise.id);
  const [answers, setAnswers] = useState<Record<string, Answer>>(() => persist.load<Record<string, Answer>>() || {});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [answerDetails, setAnswerDetails] = useState<{ label: string; userAnswer: string; correct: string; isCorrect: boolean }[]>([]);

  useEffect(() => { if (!submitted) persist.save(answers); }, [answers, submitted, persist]);

  const incomplete = exercise.items.filter((item) => !answers[item.id]?.rack || !answers[item.id]?.vlan).length;
  const pointsPerItem = Math.floor(exercise.scoring.max / exercise.items.length);

  function updateAnswer(itemId: string, field: "rack" | "vlan", value: string) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [itemId]: { ...prev[itemId], rack: prev[itemId]?.rack || "", vlan: prev[itemId]?.vlan || "", [field]: value } }));
  }

  function grade() {
    const fb: string[] = [];
    const details: { label: string; userAnswer: string; correct: string; isCorrect: boolean }[] = [];
    let total = 0;
    for (const item of exercise.items) {
      const ans = answers[item.id];
      const rackOk = ans?.rack === item.correctRack;
      const vlanOk = ans?.vlan === item.correctVlan;
      const bothOk = rackOk && vlanOk;
      const rackLabel = exercise.racks.find((r) => r.id === item.correctRack)?.label || "?";
      const vlanLabel = exercise.vlans.find((v) => v.id === item.correctVlan)?.label || "?";
      const userRack = exercise.racks.find((r) => r.id === ans?.rack)?.label || "?";
      const userVlan = exercise.vlans.find((v) => v.id === ans?.vlan)?.label || "?";
      details.push({ label: item.label, userAnswer: `${userRack} / ${userVlan}`, correct: `${rackLabel} / ${vlanLabel}`, isCorrect: bothOk });
      if (bothOk) { total += pointsPerItem; }
      else { fb.push(`${item.label}: ${userRack}/${userVlan} -> ${rackLabel}/${vlanLabel}`); }
    }
    const correct = exercise.items.filter((i) => answers[i.id]?.rack === i.correctRack && answers[i.id]?.vlan === i.correctVlan).length;
    fb.unshift(`${correct}/${exercise.items.length} equipements corrects.`);
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
          {exercise.constraints.map((c, i) => <li key={i} className="flex items-start gap-2 text-sm"><ArrowRight className="mt-0.5 h-4 w-4 text-primary shrink-0" /> {c}</li>)}
        </ul>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border text-left"><th className="p-2 font-bold">Equipement</th><th className="p-2 font-bold">Rack</th><th className="p-2 font-bold">VLAN</th></tr></thead>
          <tbody>
            {exercise.items.map((item) => (
              <tr key={item.id} className="border-b border-border">
                <td className="p-2 font-bold">{item.label}</td>
                <td className="p-2"><select value={answers[item.id]?.rack || ""} onChange={(e) => updateAnswer(item.id, "rack", e.target.value)} disabled={submitted} className="w-full rounded-card border border-border bg-card p-2 text-sm"><option value="">--</option>{exercise.racks.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}</select></td>
                <td className="p-2"><select value={answers[item.id]?.vlan || ""} onChange={(e) => updateAnswer(item.id, "vlan", e.target.value)} disabled={submitted} className="w-full rounded-card border border-border bg-card p-2 text-sm"><option value="">--</option>{exercise.vlans.map((v) => <option key={v.id} value={v.id}>{v.label}</option>)}</select></td>
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

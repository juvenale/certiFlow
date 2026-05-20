"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { CountdownTimer, ScoringDisplay, ActionButton, GhostButton, usePBQPersist } from "./pbq-shared";
import type { TopologyPBQ } from "@/data/pbq";

function cn(...args: (string | false | undefined | null)[]): string { return args.filter(Boolean).join(" "); }

export function TopologyDragDropPBQ({ exercise, onReset }: { exercise: TopologyPBQ; onReset: () => void }) {
  const persist = usePBQPersist(exercise.id);
  const [placements, setPlacements] = useState<Record<string, string>>(() => persist.load<Record<string, string>>() || {});
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [answerDetails, setAnswerDetails] = useState<{ label: string; userAnswer: string; correct: string; isCorrect: boolean }[]>([]);

  useEffect(() => { if (!submitted) persist.save(placements); }, [placements, submitted, persist]);

  const unplaced = exercise.items.filter((item) => !placements[item.id]);
  const pointsPerItem = Math.floor(exercise.scoring.max / exercise.items.length);

  function dropOnZone(zoneId: string) {
    if (submitted || !draggedItem) return;
    setPlacements((prev) => ({ ...prev, [draggedItem]: zoneId }));
    setDraggedItem(null);
  }

  function removePlacement(itemId: string) {
    if (submitted) return;
    setPlacements((prev) => { const n = { ...prev }; delete n[itemId]; return n; });
  }

  function grade() {
    const fb: string[] = [];
    const details: { label: string; userAnswer: string; correct: string; isCorrect: boolean }[] = [];
    let total = 0;
    for (const item of exercise.items) {
      const placed = placements[item.id];
      const isCorrect = placed === item.correctZone;
      const zoneLabel = exercise.zones.find((z) => z.id === item.correctZone)?.label || "?";
      const userZone = exercise.zones.find((z) => z.id === placed)?.label || "non place";
      details.push({ label: item.label, userAnswer: userZone, correct: zoneLabel, isCorrect });
      if (isCorrect) { total += pointsPerItem; }
      else { fb.push(`${item.label}: ${userZone} -> ${zoneLabel}`); }
    }
    fb.unshift(`${exercise.items.filter((item) => placements[item.id] === item.correctZone).length}/${exercise.items.length} elements corrects.`);
    setScore(total); setFeedback(fb); setAnswerDetails(details); setSubmitted(true);
    persist.clear();
  }

  function reset() { persist.clear(); onReset(); }

  return (
    <div>
      <CountdownTimer seconds={exercise.timeLimitSeconds} onExpire={grade} incompleteCount={unplaced.length} />
      <div className="mb-4 rounded-card border border-border bg-muted p-4">
        <p className="font-bold">{exercise.role}</p>
        <p className="mt-1 text-muted-foreground">{exercise.scenario}</p>
        <ul className="mt-2 space-y-1">
          {exercise.constraints.map((c, i) => <li key={i} className="flex items-start gap-2 text-sm"><ArrowRight className="mt-0.5 h-4 w-4 text-primary shrink-0" /> {c}</li>)}
        </ul>
      </div>
      {!submitted && unplaced.length > 0 && (
        <div className="mb-4">
          <p className="mb-2 text-sm font-bold text-muted-foreground">A placer ({unplaced.length} restants):</p>
          <div className="flex flex-wrap gap-2">
            {unplaced.map((item) => (
              <div key={item.id} draggable onDragStart={() => setDraggedItem(item.id)} onDragEnd={() => setDraggedItem(null)}
                className="cursor-grab rounded-card border-2 border-primary/30 bg-card px-3 py-2 text-sm font-bold shadow-sm active:cursor-grabbing hover:border-primary hover:shadow-md transition-all">
                {item.label}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {exercise.zones.map((zone) => {
          const zoneItems = exercise.items.filter((item) => placements[item.id] === zone.id);
          return (
            <div key={zone.id} onDragOver={(e) => e.preventDefault()} onDrop={() => dropOnZone(zone.id)}
              className={cn("rounded-card border-2 border-dashed p-3 min-h-32 transition-colors", draggedItem ? "border-primary bg-primary/5 scale-[1.02]" : "border-border")}>
              <p className="mb-1 font-bold">{zone.label}</p>
              <p className="mb-2 text-xs text-muted-foreground">{zone.description}</p>
              {zoneItems.map((item) => (
                <div key={item.id} onClick={() => removePlacement(item.id)}
                  className={cn("mb-1 cursor-pointer rounded-card border px-3 py-1 text-sm font-bold transition-colors", submitted ? (placements[item.id] === item.correctZone ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50") : "border-border bg-card hover:bg-muted")}>
                  {item.label} {submitted && (placements[item.id] === item.correctZone ? <CheckCircle2 className="ml-1 inline h-3 w-3 text-green-500" /> : <XCircle className="ml-1 inline h-3 w-3 text-red-500" />)}
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {!submitted && <ActionButton onClick={grade}>Corriger</ActionButton>}
        {submitted && <ScoringDisplay score={score} max={exercise.scoring.max} feedback={feedback} correctAnswers={answerDetails} />}
        <GhostButton onClick={reset}>Retour aux PBQ</GhostButton>
      </div>
    </div>
  );
}

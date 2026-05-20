"use client";

import { useState } from "react";
import { Terminal } from "lucide-react";
import type { LogGeneratorPBQ } from "@/data/pbq";
import { ActionButton, Badge, CountdownTimer, GhostButton, ScoringDisplay } from "./pbq-shared";

export function LogGeneratorPBQView({ exercise, onReset }: { exercise: LogGeneratorPBQ; onReset: () => void }) {
  const [attack, setAttack] = useState<number | null>(null);
  const [mitigation, setMitigation] = useState<number | null>(null);
  const [iocs, setIocs] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function toggleIoc(value: string) {
    setIocs((items) => items.includes(value) ? items.filter((item) => item !== value) : [...items, value]);
  }

  function grade() {
    setSubmitted(true);
  }

  const correctIocCount = iocs.filter((ioc) => exercise.correctIocs.includes(ioc)).length;
  const wrongIocCount = iocs.filter((ioc) => !exercise.correctIocs.includes(ioc)).length;
  const score = Math.max(
    0,
    (attack === exercise.correctAttack ? 35 : 0) +
    Math.round((correctIocCount / exercise.correctIocs.length) * 40) -
    wrongIocCount * 8 +
    (mitigation === exercise.correctMitigation ? 25 : 0)
  );
  const feedback = [
    attack === exercise.correctAttack ? "Type d'attaque correctement identifié." : `Attaque attendue: ${exercise.attackChoices[exercise.correctAttack]}.`,
    correctIocCount >= 2 ? "Les IOC principaux sont repérés." : "Cherche les indicateurs qui prouvent le comportement malveillant.",
    mitigation === exercise.correctMitigation ? "Mitigation cohérente avec la première réponse attendue." : `Mitigation attendue: ${exercise.mitigationChoices[exercise.correctMitigation]}.`
  ];

  return (
    <section className="rounded-card border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge>{exercise.domain}</Badge>
        <Badge>{exercise.difficulty}</Badge>
        <Badge>{exercise.scoring.max} pts</Badge>
      </div>
      <CountdownTimer seconds={exercise.timeLimitSeconds} onExpire={grade} incompleteCount={submitted ? 0 : Number(attack === null) + Number(mitigation === null)} />
      <h2 className="text-2xl font-black">{exercise.title}</h2>
      <p className="mt-2 text-muted-foreground">{exercise.scenario}</p>

      <div className="mt-5 rounded-card border border-border bg-background p-4 font-mono text-sm">
        <div className="mb-3 flex items-center gap-2 text-primary">
          <Terminal className="h-4 w-4" />
          <strong>Event stream</strong>
        </div>
        <div className="grid gap-2">
          {exercise.logs.map((log) => <code key={log} className="rounded-card bg-muted px-3 py-2">{log}</code>)}
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-3">
        <div className="rounded-card border border-border bg-muted p-4">
          <h3 className="font-black">Attack type</h3>
          <div className="mt-3 grid gap-2">
            {exercise.attackChoices.map((choice, index) => (
              <button key={choice} type="button" onClick={() => setAttack(index)} className={`rounded-card border border-border bg-card p-3 text-left font-semibold ${attack === index ? "border-primary text-primary" : ""}`}>{choice}</button>
            ))}
          </div>
        </div>
        <div className="rounded-card border border-border bg-muted p-4">
          <h3 className="font-black">IOC / IOA</h3>
          <div className="mt-3 grid gap-2">
            {exercise.iocs.map((ioc) => (
              <label key={ioc} className="flex items-center gap-2 rounded-card border border-border bg-card p-3">
                <input type="checkbox" checked={iocs.includes(ioc)} onChange={() => toggleIoc(ioc)} />
                <span>{ioc}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="rounded-card border border-border bg-muted p-4">
          <h3 className="font-black">First response / mitigation</h3>
          <div className="mt-3 grid gap-2">
            {exercise.mitigationChoices.map((choice, index) => (
              <button key={choice} type="button" onClick={() => setMitigation(index)} className={`rounded-card border border-border bg-card p-3 text-left font-semibold ${mitigation === index ? "border-primary text-primary" : ""}`}>{choice}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <ActionButton onClick={grade}>Submit PBQ</ActionButton>
        <GhostButton onClick={onReset}>Retour aux PBQ</GhostButton>
      </div>
      {submitted && (
        <ScoringDisplay
          score={Math.min(score, exercise.scoring.max)}
          max={exercise.scoring.max}
          feedback={feedback}
        />
      )}
    </section>
  );
}

"use client";

import { useState } from "react";
import { Brain, CheckCircle2, Clock, GraduationCap, Shield, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import { getPBQScores, savePBQScore } from "@/lib/pbq-scores";
import { useTimeTracker } from "./hooks/useTimeTracker";
import type { PBQExercise } from "@/data/pbq";
import { pbqExercises } from "@/data/pbq-exercises";
import { FirewallRulesPBQ } from "./pbq-firewall";
import { TopologyDragDropPBQ } from "./pbq-topology";
import { RackVLANPBQView } from "./pbq-rackvlan";
import { SIEMInteractive } from "./pbq-scenario";
import { InvestigationInteractive } from "./pbq-investigation2";
import { TimedConfigPBQView } from "./pbq-investigation";
import { ScenarioTasksPBQView } from "./pbq-scenario-tasks";
import { InteractiveTerminal } from "./pbq-terminal";

const typeLabels: Record<string, string> = {
  firewall_rules: "Firewall", topology: "Topologie", rack_vlan: "Rack & VLAN",
  siem: "Analyse SIEM", investigation: "Investigation", timed_config: "Config. chronométrée",
  scenario_tasks: "Matching / Classif.", terminal: "Terminal Linux",
};
const difficultyColors: Record<string, string> = {
  foundation: "bg-success-muted text-success-fg", intermediate: "bg-warning-muted text-warning-fg",
  advanced: "bg-warning-muted text-warning-fg", simulation: "bg-danger-muted text-danger-fg",
};

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex min-h-8 items-center rounded-card bg-muted px-3 text-sm font-bold text-muted-foreground">{children}</span>;
}

export default function PBQBrowser({ onComplete }: { onComplete?: () => void }) {
  const [selected, setSelected] = useState<PBQExercise | null>(null);
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [filterDomain, setFilterDomain] = useState("all");
  const [search, setSearch] = useState("");
  const scores = getPBQScores();
  const domains = Array.from(new Set(pbqExercises.map((e) => e.domain)));
  const norm = search.toLowerCase();
  const filtered = pbqExercises.filter((ex) => {
    if (filterDifficulty !== "all" && ex.difficulty !== filterDifficulty) return false;
    if (filterDomain !== "all" && ex.domain !== filterDomain) return false;
    if (norm && ![ex.title, ex.domain, ex.objective].join(" ").toLowerCase().includes(norm)) return false;
    return true;
  });
  const scoreMap = new Map(scores.map((s) => [s.pbqId, s]));

  // Time tracker for active exercise
  const timeTracker = useTimeTracker(selected?.id || "browser", "PBQ");

  // Mark PBQ as completed when user returns to browser
  function handleReset() {
    if (selected) {
      savePBQScore({
        pbqId: selected.id,
        title: selected.title,
        date: new Date().toISOString(),
        score: selected.scoring?.max || 5,
        maxScore: selected.scoring?.max || 5,
        completed: true,
      });
    }
    setSelected(null);
    onComplete?.();
  }

  if (selected) {
    // Time tracker display
    const timerDisplay = (
      <div className="mb-3 flex items-center justify-between rounded-card border border-border bg-muted px-4 py-2">
        <h3 className="font-black">{selected.title}</h3>
        <span className="flex items-center gap-1.5 rounded-btn bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
          <Clock className="h-3.5 w-3.5" /> {timeTracker.formattedTime}
        </span>
      </div>
    );

    switch (selected.type) {
      case "firewall_rules": return <>{timerDisplay}<FirewallRulesPBQ exercise={selected} onReset={() => { timeTracker.saveAndProgress(); handleReset(); }} /></>;
      case "topology": return <>{timerDisplay}<TopologyDragDropPBQ exercise={selected} onReset={() => { timeTracker.saveAndProgress(); handleReset(); }} /></>;
      case "rack_vlan": return <>{timerDisplay}<RackVLANPBQView exercise={selected} onReset={() => { timeTracker.saveAndProgress(); handleReset(); }} /></>;
      case "siem": return <>{timerDisplay}<SIEMInteractive exercise={selected} onReset={() => { timeTracker.saveAndProgress(); handleReset(); }} /></>;
      case "investigation": return <>{timerDisplay}<InvestigationInteractive exercise={selected} onReset={() => { timeTracker.saveAndProgress(); handleReset(); }} /></>;
      case "timed_config": return <>{timerDisplay}<TimedConfigPBQView exercise={selected} onReset={() => { timeTracker.saveAndProgress(); handleReset(); }} /></>;
      case "scenario_tasks": return <>{timerDisplay}<ScenarioTasksPBQView exercise={selected} onReset={() => { timeTracker.saveAndProgress(); handleReset(); }} /></>;
      case "terminal": return <>{timerDisplay}<InteractiveTerminal exercise={selected as any} onReset={() => { timeTracker.saveAndProgress(); handleReset(); }} /></>;
      default: return <p className="p-4">Type non supporté.</p>;
    }
  }

  return (
    <section className="rounded-card border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-black"><GraduationCap className="h-5 w-5 text-primary" /> Performance-Based Questions</h2>
          <p className="mt-1 text-sm text-muted-foreground">{filtered.length}/{pbqExercises.length} PBQ disponibles</p>
        </div>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un PBQ..."
          className="min-h-10 rounded-card border border-border bg-muted px-3 text-sm outline-none transition focus:border-primary sm:w-56" />
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        <select value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)} className="rounded-btn border border-border bg-muted px-3 py-1.5 text-xs font-bold">
          <option value="all">Toutes difficultes</option><option value="foundation">Fondamental</option>
          <option value="intermediate">Intermediaire</option><option value="advanced">Avance</option>
          <option value="simulation">Simulation</option>
        </select>
        <select value={filterDomain} onChange={(e) => setFilterDomain(e.target.value)} className="rounded-btn border border-border bg-muted px-3 py-1.5 text-xs font-bold">
          <option value="all">Tous domaines</option>
          {domains.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((ex) => { const s = scoreMap.get(ex.id); return (
            <button key={ex.id} type="button" onClick={() => setSelected(ex)} className="rounded-card border border-border bg-muted p-4 text-left transition hover:border-primary">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge>{typeLabels[ex.type] || ex.type}</Badge>
                <span className={cn("rounded-card px-2 py-0.5 text-xs font-bold", difficultyColors[ex.difficulty])}>{ex.difficulty}</span>
                {s && s.completed && (
                  <span className="inline-flex items-center gap-1 rounded-card bg-success-muted px-2 py-0.5 text-xs font-bold text-success-fg">
                    <CheckCircle2 className="h-3 w-3" /> {s.score}/{s.maxScore}
                  </span>)
                }
              </div>
              <h3 className="text-lg font-black">{ex.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{ex.domain}</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <Timer className="h-3 w-3" /> {Math.floor(ex.timeLimitSeconds / 60)} min
                <Shield className="ml-2 h-3 w-3" /> {ex.scoring.max} pts
              </div>
            </button>
          ); })}
        {!filtered.length && (
          <div className="col-span-full rounded-card bg-muted p-4 text-center">
            <p className="font-bold">Aucun PBQ ne correspond</p>
            <p className="mt-1 text-sm text-muted-foreground">Essaie de changer les filtres ou la recherche.</p>
          </div>
        )}
      </div>
    </section>
  );}

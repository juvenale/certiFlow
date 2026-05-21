"use client";

import { useState } from "react";
import { Brain, CheckCircle2, GraduationCap, Shield, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import { getPBQScores, savePBQScore } from "@/lib/pbq-scores";
import type { PBQExercise } from "@/data/pbq";
import { pbqExercises } from "@/data/pbq-exercises";
import { FirewallRulesPBQ } from "./pbq-firewall";
import { TopologyDragDropPBQ } from "./pbq-topology";
import { RackVLANPBQView } from "./pbq-rackvlan";
import { SIEMInteractive } from "./pbq-scenario";
import { InvestigationInteractive } from "./pbq-investigation2";
import { TimedConfigPBQView } from "./pbq-investigation";
import { ScenarioTasksPBQView } from "./pbq-scenario-tasks";

const typeLabels: Record<string, string> = {
  firewall_rules: "Firewall", topology: "Topologie", rack_vlan: "Rack & VLAN",
  siem: "Analyse SIEM", investigation: "Investigation", timed_config: "Config. chronométrée",
  scenario_tasks: "Matching / Classif.",
};
const difficultyColors: Record<string, string> = {
  foundation: "bg-green-100 text-green-700", intermediate: "bg-yellow-100 text-yellow-700",
  advanced: "bg-orange-100 text-orange-700", simulation: "bg-red-100 text-red-700",
};

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex min-h-8 items-center rounded-card bg-muted px-3 text-sm font-bold text-muted-foreground">{children}</span>;
}

export default function PBQBrowser() {
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
  }

  if (selected) {
    switch (selected.type) {
      case "firewall_rules": return <FirewallRulesPBQ exercise={selected} onReset={handleReset} />;
      case "topology": return <TopologyDragDropPBQ exercise={selected} onReset={handleReset} />;
      case "rack_vlan": return <RackVLANPBQView exercise={selected} onReset={handleReset} />;
      case "siem": return <SIEMInteractive exercise={selected} onReset={handleReset} />;
      case "investigation": return <InvestigationInteractive exercise={selected} onReset={handleReset} />;
      case "timed_config": return <TimedConfigPBQView exercise={selected} onReset={handleReset} />;
      case "scenario_tasks": return <ScenarioTasksPBQView exercise={selected} onReset={handleReset} />;
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

"use client";

import { useState } from "react";
import { Brain, GraduationCap, Shield, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
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

export default function PBQBrowser({ onComplete }: { onComplete?: () => void }) {
  const [selected, setSelected] = useState<PBQExercise | null>(null);

  if (selected) {
    switch (selected.type) {
      case "firewall_rules": return <FirewallRulesPBQ exercise={selected} onReset={() => { onComplete?.(); setSelected(null); }} />;
      case "topology": return <TopologyDragDropPBQ exercise={selected} onReset={() => { onComplete?.(); setSelected(null); }} />;
      case "rack_vlan": return <RackVLANPBQView exercise={selected} onReset={() => { onComplete?.(); setSelected(null); }} />;
      case "siem": return <SIEMInteractive exercise={selected} onReset={() => { onComplete?.(); setSelected(null); }} />;
      case "investigation": return <InvestigationInteractive exercise={selected} onReset={() => { onComplete?.(); setSelected(null); }} />;
      case "timed_config": return <TimedConfigPBQView exercise={selected} onReset={() => { onComplete?.(); setSelected(null); }} />;
      case "scenario_tasks": return <ScenarioTasksPBQView exercise={selected} onReset={() => { onComplete?.(); setSelected(null); }} />;
      default: return <p className="p-4">Type non supporté.</p>;
    }
  }

  return (
    <section className="rounded-card border border-border bg-card p-5 shadow-sm">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-black"><GraduationCap className="h-5 w-5 text-primary" /> Performance-Based Questions</h2>
      <p className="mb-4 text-muted-foreground">Exercices interactifs avec scoring partiel pour simuler les PBQ de l examen Security+.</p>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {pbqExercises.map((ex) => (
          <button key={ex.id} type="button" onClick={() => setSelected(ex)}
            className="rounded-card border border-border bg-muted p-4 text-left transition hover:border-primary">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge>{typeLabels[ex.type] || ex.type}</Badge>
              <span className={cn("rounded-card px-2 py-0.5 text-xs font-bold", difficultyColors[ex.difficulty])}>{ex.difficulty}</span>
            </div>
            <h3 className="text-lg font-black">{ex.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{ex.domain}</p>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Timer className="h-3 w-3" /> {Math.floor(ex.timeLimitSeconds / 60)}:{String(ex.timeLimitSeconds % 60).padStart(2, "0")}
              <Shield className="ml-2 h-3 w-3" /> {ex.scoring.max} pts
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

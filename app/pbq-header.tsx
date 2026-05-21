"use client";

import { useState } from "react";
import { CheckCircle2, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { getPBQScores } from "@/lib/pbq-scores";

interface PBQHeaderProps {
  totalCount: number;
  filteredCount: number;
  filterDifficulty: string;
  filterDomain: string;
  search: string;
  domains: string[];
  onFilterDifficulty: (v: string) => void;
  onFilterDomain: (v: string) => void;
  onSearch: (v: string) => void;
  onClear: () => void;
}

export function PBQHeader(props: PBQHeaderProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-black">Performance-Based Questions</h2>
          <p className="mt-1 text-sm text-muted-foreground">{props.filteredCount}/{props.totalCount} PBQ disponibles</p>
        </div>
        <div className="relative sm:w-56">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input type="text" value={props.search} onChange={(e) => props.onSearch(e.target.value)}
            placeholder="Rechercher..."
            className="w-full min-h-10 rounded-card border border-border bg-muted pl-9 pr-3 text-sm outline-none transition focus:border-primary" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <select value={props.filterDifficulty} onChange={(e) => props.onFilterDifficulty(e.target.value)}
          className="rounded-btn border border-border bg-muted px-3 py-1.5 text-xs font-bold">
          <option value="all">Toutes difficultes</option>
          <option value="foundation">Fondamental</option>
          <option value="intermediate">Intermediaire</option>
          <option value="advanced">Avance</option>
          <option value="simulation">Simulation</option>
        </select>
        <select value={props.filterDomain} onChange={(e) => props.onFilterDomain(e.target.value)}
          className="rounded-btn border border-border bg-muted px-3 py-1.5 text-xs font-bold">
          <option value="all">Tous domaines</option>
          {props.domains.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        {(props.filterDifficulty !== "all" || props.filterDomain !== "all" || props.search) && (
          <button type="button" onClick={props.onClear}
            className="rounded-btn border border-border bg-muted px-3 py-1.5 text-xs font-bold transition hover:border-primary">
            Effacer filtres
          </button>
        )}
      </div>
    </div>
  );
}

export function PBQBadge({ pbqId, score, maxScore }: { pbqId: string; score?: number; maxScore?: number }) {
  const scores = getPBQScores();
  const entry = scores.find((s) => s.pbqId === pbqId);
  if (!entry?.completed) return null;

  return (
    <span className="inline-flex items-center gap-1 rounded-card bg-success-muted px-2 py-0.5 text-xs font-bold text-success-fg">
      <CheckCircle2 className="h-3 w-3" /> {entry.score}/{entry.maxScore}
    </span>
  );
}

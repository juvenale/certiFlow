"use client";

import { useState, useMemo } from "react";
import { Play, Sliders } from "lucide-react";
import { COMPTIA_SY0701_STRUCTURE } from "./comptia-data";

interface QuizConfigProps {
  onStartQuiz: (filters: { domainId: string; subDomainId: string; theme: string; count: number; skipCorrect: boolean }) => void;
}

export function QuizConfig({ onStartQuiz }: QuizConfigProps) {
  const [selectedDomainId, setSelectedDomainId] = useState("all");
  const [selectedSubDomainId, setSelectedSubDomainId] = useState("all");
  const [selectedTheme, setSelectedTheme] = useState("all");
  const [questionCount, setQuestionCount] = useState(20);
  const [skipCorrect, setSkipCorrect] = useState(true);

  const availableSubDomains = useMemo(() => {
    if (selectedDomainId === "all") return [];
    const domain = COMPTIA_SY0701_STRUCTURE.find((d) => d.id === selectedDomainId);
    return domain ? domain.subDomains : [];
  }, [selectedDomainId]);

  const availableThemes = useMemo(() => {
    if (selectedSubDomainId === "all") return [];
    const subDomain = availableSubDomains.find((sd) => sd.id === selectedSubDomainId);
    return subDomain ? subDomain.themes : [];
  }, [selectedSubDomainId, availableSubDomains]);

  const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDomainId(e.target.value);
    setSelectedSubDomainId("all");
    setSelectedTheme("all");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartQuiz({ domainId: selectedDomainId, subDomainId: selectedSubDomainId, theme: selectedTheme, count: questionCount, skipCorrect });
  };

  return (
    <div className="rounded-card border border-border bg-card p-3.5 shadow-sm w-full animate-fade-in">
      <div className="flex items-center gap-2 border-b border-border pb-2.5 mb-3">
        <Sliders className="h-3.5 w-3.5 text-primary" />
        <div>
          <h3 className="text-xs font-black uppercase tracking-wider text-foreground">Quiz sur mesure</h3>
          <p className="text-[10px] text-muted-foreground mt-0.5">Cibler un concept précis</p>
        </div>
      </div>

      <div className="grid gap-3">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">1. Domaine</label>
          <select value={selectedDomainId} onChange={handleDomainChange}
            className="w-full min-h-9 rounded-card border border-border bg-card px-2 text-[11px] text-foreground outline-none focus:border-primary">
            <option value="all">Tous les domaines</option>
            {COMPTIA_SY0701_STRUCTURE.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">2. Sous-domaine</label>
          <select value={selectedSubDomainId} onChange={(e) => { setSelectedSubDomainId(e.target.value); setSelectedTheme("all"); }}
            disabled={selectedDomainId === "all"}
            className="w-full min-h-9 rounded-card border border-border bg-card px-2 text-[11px] text-foreground outline-none focus:border-primary disabled:opacity-30">
            <option value="all">Tous les sous-domaines</option>
            {availableSubDomains.map((sd) => <option key={sd.id} value={sd.id}>{sd.id} - {sd.name}</option>)}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">3. Thème</label>
          <select value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value)}
            disabled={selectedSubDomainId === "all"}
            className="w-full min-h-9 rounded-card border border-border bg-card px-2 text-[11px] text-foreground outline-none focus:border-primary disabled:opacity-30">
            <option value="all">Tous les thèmes</option>
            {availableThemes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Nombre de questions</label>
            <input
              type="number"
              min="1"
              max="200"
              value={questionCount}
              onChange={(e) => setQuestionCount(Math.max(1, Math.min(200, Number(e.target.value) || 1)))}
              className="w-12 rounded-card border border-border bg-muted/40 px-1.5 py-0.5 text-xs font-black tabular-nums text-center outline-none focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-2 px-1">
            <span className="text-[9px] font-bold text-muted-foreground/60 shrink-0">5</span>
            <input
              type="range"
              min="5"
              max="100"
              step="1"
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer bg-muted accent-primary"
              style={{ accentColor: "var(--primary)" }}
            />
            <span className="text-[9px] font-bold text-muted-foreground/60 shrink-0">100</span>
          </div>
        </div>

        <label className="flex items-start gap-2 cursor-pointer select-none py-0.5">
          <input
            type="checkbox"
            checked={skipCorrect}
            onChange={(e) => setSkipCorrect(e.target.checked)}
            className="h-3.5 w-3.5 mt-0.5 rounded border-border text-primary focus:ring-primary accent-primary shrink-0"
          />
          <span className="text-[10px] font-semibold text-muted-foreground leading-tight">Masquer les questions déjà réussies</span>
        </label>

        <button type="button" onClick={handleSubmit}
          className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-btn bg-primary py-2 text-xs font-black text-primary-foreground transition hover:opacity-90 active:scale-[0.98]">
          <Play className="h-3.5 w-3.5" /> Lancer le quiz
        </button>
      </div>
    </div>
  );
}

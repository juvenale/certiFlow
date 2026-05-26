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
    <div className="rounded-card border border-border bg-card p-5 shadow-sm max-w-xl mx-auto animate-fade-in">
      <div className="flex items-center gap-2 border-b border-border pb-3 mb-4">
        <Sliders className="h-4 w-4 text-primary" />
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider">Quiz sur mesure</h3>
          <p className="text-xs text-muted-foreground">Cible un domaine, sous-domaine ou concept precis.</p>
        </div>
      </div>

      <div className="grid gap-3">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-muted-foreground">1. Domaine</label>
          <select value={selectedDomainId} onChange={handleDomainChange}
            className="w-full min-h-10 rounded-card border border-border bg-card px-3 text-xs">
            <option value="all">Tous les domaines</option>
            {COMPTIA_SY0701_STRUCTURE.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-muted-foreground">2. Sous-domaine</label>
          <select value={selectedSubDomainId} onChange={(e) => { setSelectedSubDomainId(e.target.value); setSelectedTheme("all"); }}
            disabled={selectedDomainId === "all"}
            className="w-full min-h-10 rounded-card border border-border bg-card px-3 text-xs disabled:opacity-30">
            <option value="all">Tous les sous-domaines</option>
            {availableSubDomains.map((sd) => <option key={sd.id} value={sd.id}>{sd.id} - {sd.name}</option>)}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-muted-foreground">3. Theme (micro-concept)</label>
          <select value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value)}
            disabled={selectedSubDomainId === "all"}
            className="w-full min-h-10 rounded-card border border-border bg-card px-3 text-xs disabled:opacity-30">
            <option value="all">Tous les themes</option>
            {availableThemes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-muted-foreground">Nombre de questions</label>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground shrink-0">5</span>
            <input type="range" min="5" max="100" step="1" value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="flex-1 h-2 rounded-full appearance-none cursor-pointer bg-muted accent-primary"
              style={{ accentColor: "var(--primary)" }} />
            <span className="text-xs text-muted-foreground shrink-0">100</span>
            <input type="number" min="1" max="200" value={questionCount}
              onChange={(e) => setQuestionCount(Math.max(1, Math.min(200, Number(e.target.value) || 1)))}
              className="w-16 rounded-card border border-border bg-card px-2 py-1 text-sm font-bold tabular-nums text-center outline-none focus:border-primary" />
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={skipCorrect} onChange={(e) => setSkipCorrect(e.target.checked)}
            className="h-4 w-4 rounded border-border accent-primary" />
          <span className="text-xs text-muted-foreground">Masquer les questions deja reussies</span>
        </label>

        <button type="button" onClick={handleSubmit}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-btn bg-primary py-2.5 text-sm font-bold text-primary-foreground transition hover:opacity-90">
          <Play className="h-3.5 w-3.5" /> Lancer la session
        </button>
      </div>
    </div>
  );
}

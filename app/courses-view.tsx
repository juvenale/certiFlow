"use client";

import { useState } from "react";
import { BookOpen, ChevronDown, FileQuestion, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StudyItem, StudyTheme } from "@/data/study-content";

const domainColors: Record<string, { bg: string; border: string; dot: string; tag: string }> = {
  "General Security Concepts":                        { bg: "dom-bg-violet",  border: "dom-bd-violet",  dot: "bg-violet-500",  tag: "dom-tag-violet"  },
  "Threats, Vulnerabilities, and Mitigations":        { bg: "dom-bg-red",     border: "dom-bd-red",     dot: "bg-red-500",     tag: "dom-tag-red"     },
  "Security Architecture":                            { bg: "dom-bg-blue",    border: "dom-bd-blue",    dot: "bg-blue-500",    tag: "dom-tag-blue"    },
  "Security Operations":                              { bg: "dom-bg-emerald", border: "dom-bd-emerald", dot: "bg-emerald-500", tag: "dom-tag-emerald" },
  "Security Program Management and Oversight":        { bg: "dom-bg-amber",   border: "dom-bd-amber",   dot: "bg-amber-500",   tag: "dom-tag-amber"   },
};

function dc(domain: string) {
  return domainColors[domain] ?? { bg: "bg-muted", border: "border-border", dot: "bg-primary", tag: "text-muted-foreground bg-muted" };
}

function ConceptCard({ item, onFlashcard, onPractice }: {
  item: StudyItem;
  onFlashcard: () => void;
  onPractice: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <article className={cn(
      "rounded-card border border-border bg-card overflow-hidden transition-shadow duration-200",
      open ? "shadow-md" : "hover:shadow-sm hover:border-primary/40"
    )}>
      <button type="button" onClick={() => setOpen(!open)}
        className="flex w-full items-start gap-3 p-3 text-left">
        <ChevronDown className={cn(
          "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
          open && "rotate-180"
        )} />
        <div className="min-w-0 flex-1">
          <p className="font-black text-primary leading-snug">{item.term}</p>
          {!open && (
            <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{item.definition}</p>
          )}
        </div>
      </button>

      {open && (
        <div className="border-t border-border bg-muted/30 px-4 pb-4 pt-3 space-y-3">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Définition</p>
            <p className="text-sm leading-relaxed">{item.definition}</p>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">À connaître</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.details}</p>
          </div>
          <div className="flex gap-2 pt-1">
            <button type="button" onClick={onFlashcard}
              className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-card px-3 py-1.5 text-xs font-bold transition hover:border-primary hover:text-primary">
              <RotateCcw className="h-3 w-3" /> Flashcards
            </button>
            <button type="button" onClick={onPractice}
              className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-card px-3 py-1.5 text-xs font-bold transition hover:border-primary hover:text-primary">
              <FileQuestion className="h-3 w-3" /> Quiz
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

function ThemeSection({ theme, expanded, onToggle, onFlashcard, onPractice }: {
  theme: StudyTheme & { items: StudyItem[] };
  expanded: boolean;
  onToggle: () => void;
  onFlashcard: (themeId: string) => void;
  onPractice: (term: string) => void;
}) {
  if (theme.items.length === 0) return null;
  const colors = dc(theme.domain);
  return (
    <section className={cn("rounded-card border overflow-hidden", colors.border)}>
      <button type="button" onClick={onToggle}
        className={cn(
          "flex w-full items-center gap-3 p-4 text-left transition-colors",
          expanded ? colors.bg : "bg-card hover:bg-muted/50"
        )}>
        <span className={cn("h-2.5 w-2.5 shrink-0 rounded-full", colors.dot)} />
        <div className="flex-1 min-w-0">
          <p className="font-black leading-snug">{theme.title}</p>
          <span className={cn("mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold", colors.tag)}>
            {theme.domain}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden text-sm font-bold text-muted-foreground tabular-nums sm:block">
            {theme.items.length} concepts
          </span>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onFlashcard(theme.id); }}
            className="hidden items-center gap-1 rounded-btn border border-border bg-card px-2.5 py-1 text-xs font-bold transition hover:border-primary hover:text-primary sm:inline-flex"
          >
            <RotateCcw className="h-3 w-3" /> Flashcards
          </button>
          <ChevronDown className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            expanded && "rotate-180"
          )} />
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between sm:hidden">
            <span className="text-sm font-bold text-muted-foreground">{theme.items.length} concepts</span>
            <button type="button" onClick={() => onFlashcard(theme.id)}
              className="inline-flex items-center gap-1 rounded-btn border border-border px-2 py-1 text-xs font-bold transition hover:border-primary hover:text-primary">
              <RotateCcw className="h-3 w-3" /> Flashcards
            </button>
          </div>
          <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
            {theme.items.map((item) => (
              <ConceptCard
                key={item.id}
                item={item}
                onFlashcard={() => onFlashcard(item.themeId)}
                onPractice={() => onPractice(item.term)}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export function CoursesView({
  filteredThemes,
  filteredStudyItems,
  onFlashcard,
  onPractice,
}: {
  filteredThemes: (StudyTheme & { items: StudyItem[] })[];
  filteredStudyItems: StudyItem[];
  onFlashcard: (themeId: string) => void;
  onPractice: (term: string) => void;
}) {
  const visible = filteredThemes.filter((t) => t.items.length > 0);

  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    const auto = visible.length <= 3 ? visible.map((t) => t.id) : visible[0] ? [visible[0].id] : [];
    return new Set(auto);
  });

  const allExpanded = visible.every((t) => expandedIds.has(t.id));

  function toggle(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setExpandedIds(allExpanded ? new Set() : new Set(visible.map((t) => t.id)));
  }

  // Domain summary
  const domainSummary = visible.reduce<Record<string, { concepts: number; themes: number }>>((acc, t) => {
    if (!acc[t.domain]) acc[t.domain] = { concepts: 0, themes: 0 };
    acc[t.domain].concepts += t.items.length;
    acc[t.domain].themes++;
    return acc;
  }, {});

  if (filteredStudyItems.length === 0) {
    return (
      <div className="rounded-card border border-border bg-card p-12 text-center shadow-sm">
        <BookOpen className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
        <p className="text-base font-bold">Aucun concept trouvé</p>
        <p className="mt-1 text-sm text-muted-foreground">Modifiez les filtres pour afficher des concepts.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Domain summary chips */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {Object.entries(domainSummary).map(([domain, data]) => {
          const colors = dc(domain);
          return (
            <div key={domain} className={cn("rounded-card border p-3", colors.bg, colors.border)}>
              <div className="flex items-center gap-1.5 mb-1">
                <span className={cn("h-2 w-2 rounded-full shrink-0", colors.dot)} />
                <span className="text-xs font-bold text-muted-foreground">
                  {data.themes} thème{data.themes > 1 ? "s" : ""}
                </span>
              </div>
              <p className="text-xl font-black tabular-nums">{data.concepts}</p>
              <p className="text-[10px] text-muted-foreground leading-tight mt-0.5 line-clamp-2">{domain}</p>
            </div>
          );
        })}
      </div>

      {/* Controls bar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-bold text-foreground">{filteredStudyItems.length}</span>{" "}
          concept{filteredStudyItems.length > 1 ? "s" : ""} dans{" "}
          <span className="font-bold text-foreground">{visible.length}</span>{" "}
          thème{visible.length > 1 ? "s" : ""} — cliquez pour développer
        </p>
        <button type="button" onClick={toggleAll}
          className="text-xs font-bold text-primary underline-offset-2 hover:underline">
          {allExpanded ? "Tout réduire" : "Tout développer"}
        </button>
      </div>

      {/* Theme sections */}
      <div className="space-y-3">
        {visible.map((theme) => (
          <ThemeSection
            key={theme.id}
            theme={theme}
            expanded={expandedIds.has(theme.id)}
            onToggle={() => toggle(theme.id)}
            onFlashcard={onFlashcard}
            onPractice={onPractice}
          />
        ))}
      </div>
    </div>
  );
}

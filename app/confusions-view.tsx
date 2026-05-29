"use client";

import { useState } from "react";
import { AlertTriangle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type ConfusionItem = {
  id: string;
  sectionId: string;
  sectionTitle: string;
  domain: string;
  comparison: string;
  english: string;
  difference: string;
};

type ConfusionSection = {
  id: string;
  number: number;
  title: string;
  domain: string;
  items: ConfusionItem[];
};

const domainColors: Record<string, { bg: string; border: string; dot: string; tag: string }> = {
  "General Security Concepts":                  { bg: "dom-bg-violet",  border: "dom-bd-violet",  dot: "bg-violet-500",  tag: "dom-tag-violet"  },
  "Threats, Vulnerabilities, and Mitigations":  { bg: "dom-bg-red",     border: "dom-bd-red",     dot: "bg-red-500",     tag: "dom-tag-red"     },
  "Security Architecture":                      { bg: "dom-bg-blue",    border: "dom-bd-blue",    dot: "bg-blue-500",    tag: "dom-tag-blue"    },
  "Security Operations":                        { bg: "dom-bg-emerald", border: "dom-bd-emerald", dot: "bg-emerald-500", tag: "dom-tag-emerald" },
  "Security Program Management and Oversight":  { bg: "dom-bg-amber",   border: "dom-bd-amber",   dot: "bg-amber-500",   tag: "dom-tag-amber"   },
};

function dc(domain: string) {
  return domainColors[domain] ?? { bg: "bg-muted", border: "border-border", dot: "bg-primary", tag: "text-muted-foreground bg-muted" };
}

function VsBadge() {
  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider text-primary select-none leading-none">
      vs
    </span>
  );
}

function ComparisonTitle({ text }: { text: string }) {
  const parts = text.split(" vs ");
  if (parts.length < 2) return <span className="font-extrabold text-xs text-primary">{text}</span>;
  return (
    <span className="flex flex-wrap items-center gap-1.5 leading-tight">
      {parts.map((part, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="font-extrabold text-xs text-primary">{part}</span>
          {i < parts.length - 1 && <VsBadge />}
        </span>
      ))}
    </span>
  );
}

// ─── ConfusionCard ────────────────────────────────────────────────────────────
function ConfusionCard({ item }: { item: ConfusionItem }) {
  const [open, setOpen] = useState(false);

  const cmpParts = item.comparison.split(" vs ");
  const engParts = item.english.split(" vs ");
  const hasSplit = cmpParts.length >= 2 && engParts.length >= 2;

  return (
    <article className={cn(
      "rounded-card border bg-card overflow-hidden transition-all duration-200",
      open ? "border-primary/30 shadow-md" : "border-border hover:border-primary/20 hover:shadow-sm"
    )}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        title={item.comparison}
        className="flex w-full items-center gap-2 p-2.5 text-left transition-colors hover:bg-muted/20"
      >
        <ChevronDown className={cn(
          "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-300",
          open && "rotate-180 text-primary"
        )} />
        <ComparisonTitle text={item.comparison} />
      </button>

      {open && (
        <div className="border-t border-border space-y-2.5 bg-muted/30 px-3.5 pb-3.5 pt-2.5 animate-in fade-in slide-in-from-top-0.5 duration-200">
          {hasSplit ? (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {cmpParts.map((cmp, i) => (
                <div key={i} className="rounded-card border border-border bg-card p-2.5 shadow-sm">
                  <p className="mb-0.5 text-xs font-black text-primary">{cmp}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {engParts[i] ?? ""}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-card border border-border bg-card p-2.5 shadow-sm">
              <p className="mb-0.5 text-[8px] font-bold uppercase tracking-widest text-muted-foreground">Signification</p>
              <p className="text-xs font-medium text-foreground">{item.english}</p>
            </div>
          )}

          {/* Key difference panel (Theme adaptable warning classes!) */}
          <div className="rounded-card border border-warning-muted bg-warning-muted p-2.5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 h-12 w-12 -mr-4 -mt-4 rounded-full bg-warning-muted/40 blur-md" />
            <p className="mb-0.5 text-[8px] font-black uppercase tracking-widest text-warning-fg relative z-10">Différence clé</p>
            <p className="text-xs text-warning-fg leading-relaxed font-medium relative z-10">{item.difference}</p>
          </div>
        </div>
      )}
    </article>
  );
}

// ─── ConfusionSection ─────────────────────────────────────────────────────────
function ConfusionSection({ section, expanded, onToggle }: {
  section: ConfusionSection;
  expanded: boolean;
  onToggle: () => void;
}) {
  if (section.items.length === 0) return null;
  const colors = dc(section.domain);
  return (
    <section className={cn(
      "rounded-card border overflow-hidden transition-all duration-200",
      expanded ? colors.border : "border-border hover:border-primary/20"
    )}>
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "flex w-full items-center gap-2 p-2.5 text-left transition-colors",
          expanded ? colors.bg : "bg-card hover:bg-muted/40"
        )}
      >
        <span className={cn("h-2.5 w-2.5 shrink-0 rounded-full", colors.dot, "shadow-[0_0_6px_currentColor]")} style={{ color: "var(--primary)" }} />
        <div className="flex-1 min-w-0">
          <p className="font-extrabold text-sm leading-snug text-foreground">{section.title}</p>
          <span className={cn("mt-1 inline-block rounded-full px-2 py-0.5 text-[8px] font-black uppercase tracking-wide", colors.tag)}>
            {section.domain}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="text-xs font-bold text-muted-foreground/80 tabular-nums">
            {section.items.length} confusion{section.items.length > 1 ? "s" : ""}
          </span>
          <ChevronDown className={cn(
            "h-3.5 w-3.5 text-muted-foreground transition-transform duration-300",
            expanded && "rotate-180"
          )} />
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border bg-muted/10 p-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
            {section.items.map((item) => (
              <ConfusionCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

// ─── ConfusionsView ───────────────────────────────────────────────────────────
export function ConfusionsView({
  filteredSections,
  filteredItems,
}: {
  filteredSections: ConfusionSection[];
  filteredItems: ConfusionItem[];
}) {
  const visible = filteredSections.filter((s) => s.items.length > 0);

  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    const auto = visible.length <= 3 ? visible.map((s) => s.id) : visible[0] ? [visible[0].id] : [];
    return new Set(auto);
  });

  const allExpanded = visible.every((s) => expandedIds.has(s.id));

  function toggle(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setExpandedIds(allExpanded ? new Set() : new Set(visible.map((s) => s.id)));
  }

  // Domain summary
  const domainSummary = visible.reduce<Record<string, { items: number; sections: number }>>((acc, s) => {
    if (!acc[s.domain]) acc[s.domain] = { items: 0, sections: 0 };
    acc[s.domain].items += s.items.length;
    acc[s.domain].sections++;
    return acc;
  }, {});

  if (filteredItems.length === 0) {
    return (
      <div className="rounded-card border border-border bg-card p-12 text-center shadow-sm">
        <AlertTriangle className="mx-auto mb-1.5 h-10 w-10 text-muted-foreground/40 animate-bounce" />
        <p className="text-base font-bold">Aucune confusion trouvée</p>
        <p className="mt-1 text-sm text-muted-foreground">Modifiez le domaine ou la recherche pour afficher des entrées.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Domain summary chips */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
        {Object.entries(domainSummary).map(([domain, data]) => {
          const colors = dc(domain);
          return (
            <div key={domain} className={cn(
              "rounded-card border p-3 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 relative overflow-hidden group", 
              colors.bg, 
              colors.border
            )}>
              <div className="absolute -right-4 -bottom-4 h-12 w-12 rounded-full bg-primary/5 blur-lg group-hover:bg-primary/10 transition-all duration-300" />
              <div className="flex items-center gap-1.5 mb-1.5 relative z-10">
                <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", colors.dot)} />
                <span className="text-[9px] font-black uppercase tracking-wider text-muted-foreground">
                  {data.sections} section{data.sections > 1 ? "s" : ""}
                </span>
              </div>
              <p className="text-lg font-black tracking-tight tabular-nums text-foreground relative z-10">{data.items}</p>
              <p className="text-[9px] font-bold text-muted-foreground/80 leading-tight mt-1 line-clamp-2 relative z-10">{domain}</p>
            </div>
          );
        })}
      </div>

      {/* Hint + controls */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          <span className="font-extrabold text-foreground">{filteredItems.length}</span>{" "}
          confusion{filteredItems.length > 1 ? "s" : ""} dans{" "}
          <span className="font-extrabold text-foreground">{visible.length}</span>{" "}
          section{visible.length > 1 ? "s" : ""} — cliquez pour comparer
        </p>
        <button type="button" onClick={toggleAll}
          className="text-xs font-black text-primary underline-offset-2 hover:underline">
          {allExpanded ? "Tout réduire" : "Tout développer"}
        </button>
      </div>

      {/* Sections */}
      <div className="space-y-3">
        {visible.map((section) => (
          <ConfusionSection
            key={section.id}
            section={section}
            expanded={expandedIds.has(section.id)}
            onToggle={() => toggle(section.id)}
          />
        ))}
      </div>
    </div>
  );
}

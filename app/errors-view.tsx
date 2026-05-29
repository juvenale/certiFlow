"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, ChevronDown, ClipboardList, RotateCcw, Trash2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type ErrorEntry = {
  questionId: string;
  question: string;
  chosen: string;
  answer: string;
  domain: string;
  concept: string;
  count: number;
  status: "à revoir" | "compris" | "maîtrisé";
  last: string;
};

type SortMode = "count" | "recent" | "status";

const statusCfg = {
  "à revoir": { label: "À revoir", badge: "border-t-2 border-danger bg-card text-danger-fg",  dot: "bg-danger"  },
  "compris":  { label: "Compris",  badge: "border-t-2 border-warning bg-card text-warning-fg", dot: "bg-warning" },
  "maîtrisé": { label: "Maîtrisé", badge: "border-t-2 border-success bg-card text-success-fg", dot: "bg-success" },
} as const;

function ErrorCard({ error, onStatusChange, onDelete }: {
  error: ErrorEntry;
  onStatusChange: (id: string, status: ErrorEntry["status"]) => void;
  onDelete: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const cfg = statusCfg[error.status];

  return (
    <article className={cn(
      "rounded-card border border-border bg-card overflow-hidden transition-shadow duration-200",
      open ? "shadow-md" : "hover:shadow-sm hover:border-primary/40"
    )}>
      <button type="button" onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-1.5 p-3 text-left">
        <span className={cn("h-2 w-2 shrink-0 rounded-full", cfg.dot)} />
        <div className="flex-1 min-w-0">
          <p className={cn("text-sm font-semibold leading-snug", !open && "line-clamp-2")}>{error.question}</p>
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-muted-foreground">{error.domain}</span>
            <span className={cn("inline-flex items-center rounded-full border px-1.5 py-0.5 text-[10px] font-bold", cfg.badge)}>
              {cfg.label}
            </span>
            {error.count > 1 && (
              <span className="rounded-full border border-danger-muted bg-danger-muted px-1.5 py-0.5 text-[10px] font-bold text-danger-fg">×{error.count}</span>
            )}
          </div>
        </div>
        <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open && (
        <div className="border-t border-border bg-muted/30 px-4 pb-4 pt-3 space-y-3">
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded-card border border-danger-muted bg-danger-muted p-3">
              <p className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-danger-fg">
                <XCircle className="h-3 w-3" /> Votre choix
              </p>
              <p className="text-sm leading-snug">{error.chosen}</p>
            </div>
            <div className="rounded-card border border-success-muted bg-success-muted p-3">
              <p className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-success-fg">
                <CheckCircle2 className="h-3 w-3" /> Bonne réponse
              </p>
              <p className="text-sm leading-snug">{error.answer}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Statut</p>
              <div className="flex gap-1.5">
                {(["à revoir", "compris", "maîtrisé"] as const).map((s) => (
                  <button key={s} type="button" onClick={() => onStatusChange(error.questionId, s)}
                    className={cn(
                      "rounded-btn border px-2.5 py-1 text-xs font-bold transition",
                      error.status === s
                        ? statusCfg[s].badge
                        : "border-border bg-card text-muted-foreground hover:border-primary"
                    )}>
                    {statusCfg[s].label}
                  </button>
                ))}
              </div>
            </div>
            <button type="button" onClick={() => onDelete(error.questionId)}
              className="inline-flex items-center gap-1 rounded-btn border border-danger-muted bg-danger-muted px-2.5 py-1 text-xs font-bold text-danger-fg transition hover:opacity-80">
              <Trash2 className="h-3 w-3" /> Supprimer
            </button>
          </div>

          <p className="text-[10px] text-muted-foreground">
            {error.concept} · Ratée {error.count}× · Dernière: {error.last}
          </p>
        </div>
      )}
    </article>
  );
}

export function ErrorsView({ errors, onClear, onStatusChange, onDelete }: {
  errors: ErrorEntry[];
  onClear: () => void;
  onStatusChange: (id: string, status: ErrorEntry["status"]) => void;
  onDelete: (id: string) => void;
}) {
  const [domainFilter, setDomainFilter] = useState("all");
  const [sortMode, setSortMode] = useState<SortMode>("count");
  const [confirmClear, setConfirmClear] = useState(false);

  const uniqueDomains = useMemo(() => {
    const seen = new Set<string>();
    return errors.reduce<string[]>((acc, e) => {
      if (!seen.has(e.domain)) { seen.add(e.domain); acc.push(e.domain); }
      return acc;
    }, []);
  }, [errors]);

  const counts = useMemo(() => ({
    total: errors.length,
    revoir: errors.filter((e) => e.status === "à revoir").length,
    compris: errors.filter((e) => e.status === "compris").length,
    maitrise: errors.filter((e) => e.status === "maîtrisé").length,
  }), [errors]);

  const filtered = useMemo(() => {
    const base = domainFilter === "all" ? [...errors] : errors.filter((e) => e.domain === domainFilter);
    const order = { "à revoir": 0, "compris": 1, "maîtrisé": 2 };
    return base.sort((a, b) =>
      sortMode === "count" ? b.count - a.count :
      sortMode === "recent" ? b.last.localeCompare(a.last) :
      order[a.status] - order[b.status]
    );
  }, [errors, domainFilter, sortMode]);

  if (errors.length === 0) {
    return (
      <div className="rounded-card border border-border bg-card p-12 text-center shadow-sm">
        <ClipboardList className="mx-auto mb-1.5 h-10 w-10 text-muted-foreground/40" />
        <p className="text-base font-bold">Journal vide</p>
        <p className="mt-1 text-sm text-muted-foreground">Lance un quiz pour alimenter le journal d&apos;erreurs.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        <div className="rounded-card border border-border bg-card p-2.5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total</p>
          <p className="mt-1 text-2xl font-black tabular-nums">{counts.total}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">questions ratées</p>
        </div>
        <div className="rounded-card border border-danger-muted bg-danger-muted p-2.5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-danger-fg">À revoir</p>
          <p className="mt-1 text-2xl font-black tabular-nums text-danger-fg">{counts.revoir}</p>
          <p className="mt-0.5 text-xs text-danger-fg opacity-70">à réviser activement</p>
        </div>
        <div className="rounded-card border border-warning-muted bg-warning-muted p-2.5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-warning-fg">Compris</p>
          <p className="mt-1 text-2xl font-black tabular-nums text-warning-fg">{counts.compris}</p>
          <p className="mt-0.5 text-xs text-warning-fg opacity-70">en cours de consolidation</p>
        </div>
        <div className="rounded-card border border-success-muted bg-success-muted p-2.5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-success-fg">Maîtrisé</p>
          <p className="mt-1 text-2xl font-black tabular-nums text-success-fg">{counts.maitrise}</p>
          <p className="mt-0.5 text-xs text-success-fg opacity-70">bien assimilé</p>
        </div>
      </div>

      {/* Domain filter */}
      <div className="rounded-card border border-border bg-card p-3 shadow-sm">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Filtrer par domaine</p>
        <div className="flex flex-wrap gap-1.5">
          <button type="button" onClick={() => setDomainFilter("all")}
            className={cn(
              "rounded-btn border px-3 py-1.5 text-xs font-bold transition",
              domainFilter === "all"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-muted text-muted-foreground hover:border-primary"
            )}>
            Tous ({counts.total})
          </button>
          {uniqueDomains.map((d) => {
            const c = errors.filter((e) => e.domain === d).length;
            const short = d.split(",")[0].split(" ").slice(0, 3).join(" ");
            return (
              <button key={d} type="button" onClick={() => setDomainFilter(d)}
                className={cn(
                  "rounded-btn border px-3 py-1.5 text-xs font-bold transition",
                  domainFilter === d
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-muted text-muted-foreground hover:border-primary"
                )}>
                {short} ({c})
              </button>
            );
          })}
        </div>
      </div>

      {/* Sort + actions toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-1.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-muted-foreground">Trier:</span>
          {([["count", "Plus ratées"], ["recent", "Récentes"], ["status", "Par statut"]] as [SortMode, string][]).map(([mode, label]) => (
            <button key={mode} type="button" onClick={() => setSortMode(mode)}
              className={cn(
                "rounded-btn border px-2.5 py-1 text-xs font-bold transition",
                sortMode === mode
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-muted text-muted-foreground hover:border-primary"
              )}>
              {label}
            </button>
          ))}
        </div>

        {confirmClear ? (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-danger-fg">Confirmer ?</span>
            <button type="button" onClick={() => { onClear(); setConfirmClear(false); }}
              className="rounded-btn bg-danger px-2.5 py-1 text-xs font-bold text-white transition hover:opacity-90">
              Oui, effacer
            </button>
            <button type="button" onClick={() => setConfirmClear(false)}
              className="rounded-btn border border-border px-2.5 py-1 text-xs font-bold transition hover:border-primary">
              Annuler
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => setConfirmClear(true)}
            className="inline-flex items-center gap-1.5 rounded-btn border border-danger-muted bg-danger-muted px-3 py-1.5 text-xs font-bold text-danger-fg transition hover:opacity-80">
            <RotateCcw className="h-3 w-3" /> Réinitialiser tout
          </button>
        )}
      </div>

      {/* Cards */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">Aucune erreur dans ce domaine.</p>
        ) : filtered.map((error) => (
          <ErrorCard key={error.questionId} error={error} onStatusChange={onStatusChange} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}

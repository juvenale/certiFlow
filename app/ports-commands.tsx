"use client";

import { useState, useMemo } from "react";
import { AlertTriangle, ArrowRight, Brain, CheckCircle2, Command, Globe, Network, RotateCcw, Search, Shield, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { commandTools, commandToolScenarios, commandToolConfusions } from "@/data/command-tools";
import { portFlashcards } from "@/data/port-flashcards";

type Tab = "practice" | "ports" | "commands" | "scenarios" | "confusions";
type PracticeMode = "protocol-to-port" | "port-to-protocol" | "security";

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex min-h-7 items-center rounded-full px-2.5 text-xs font-semibold tracking-wide", className)}>{children}</span>;
}

export function PortsCommandsView({ onStartPortFlashcards, onPracticeAnswered }: { onStartPortFlashcards?: () => void; onPracticeAnswered?: () => void }) {
  const [tab, setTab] = useState<Tab>("practice");
  const [search, setSearch] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const norm = search.toLowerCase().trim();

  const filteredCommands = useMemo(() => commandTools.filter(c =>
    (selectedDomain === "all" || c.domain === selectedDomain) &&
    (!norm || [c.name, c.english, c.purpose, c.examTip].join(" ").toLowerCase().includes(norm))
  ), [norm, selectedDomain]);

  const filteredScenarios = useMemo(() => commandToolScenarios.filter(s =>
    (selectedDomain === "all" || s.domain === selectedDomain) &&
    (!norm || [s.scenario, s.likelyTool].join(" ").toLowerCase().includes(norm))
  ), [norm, selectedDomain]);

  const filteredConfusions = useMemo(() => commandToolConfusions.filter(c =>
    (selectedDomain === "all" || c.domain === selectedDomain) &&
    (!norm || [c.comparison, c.difference, c.sectionTitle].join(" ").toLowerCase().includes(norm))
  ), [norm, selectedDomain]);

  const filteredPorts = useMemo(() => portFlashcards.filter(p =>
    (!norm || [p.port, p.protocol, p.english, p.details, p.secureAlternative].join(" ").toLowerCase().includes(norm))
  ), [norm]);

  const domains = useMemo(() => {
    const s = new Set<string>();
    commandTools.forEach(c => s.add(c.domain));
    commandToolConfusions.forEach(c => s.add(c.domain));
    return Array.from(s);
  }, []);

  const isSecure = (protocol: string) => ["HTTPS", "SSH", "SFTP", "FTPS", "TLS", "SSL", "IPSec", "DNSSEC"].some(s => protocol.toUpperCase().includes(s));

  const tabs = [
    { id: "practice" as Tab, label: "Réviser", icon: RotateCcw, count: portFlashcards.length },
    { id: "ports" as Tab, label: "Ports", icon: Network, count: portFlashcards.length },
    { id: "commands" as Tab, label: "Commandes", icon: Command, count: commandTools.length },
    { id: "scenarios" as Tab, label: "Scenarios", icon: Globe, count: commandToolScenarios.length },
    { id: "confusions" as Tab, label: "Confusions", icon: Brain, count: commandToolConfusions.length },
  ];

  const counts = { practice: filteredPorts.length, commands: filteredCommands.length, scenarios: filteredScenarios.length, confusions: filteredConfusions.length, ports: filteredPorts.length };

  return (
    <div className="animate-fade-in space-y-2">
      <div className="rounded-card border border-border bg-card p-2.5 shadow-sm">
        <div className="mb-1.5 grid gap-1.5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">Ports & protocoles</p>
            <h2 className="mt-1 text-2xl font-black">Révision opérationnelle</h2>
            <p className="mt-1 text-sm text-muted-foreground">Mémorise port, protocole, risque, alternative sécurisée et contexte d'examen.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setTab("practice")}
              className="inline-flex min-h-8 items-center gap-2 rounded-btn bg-primary px-4 text-sm font-black text-primary-foreground transition hover:opacity-90">
              <RotateCcw className="h-4 w-4" /> Réviser maintenant
            </button>
            {onStartPortFlashcards && (
              <button type="button" onClick={onStartPortFlashcards}
                className="inline-flex min-h-8 items-center gap-2 rounded-btn border border-border bg-muted px-4 text-sm font-black transition hover:border-primary hover:text-primary">
                Flashcards ports <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
          <div className="flex rounded-btn bg-muted p-0.5">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={cn("flex items-center gap-1.5 rounded-btn px-3 py-1.5 text-xs font-bold transition-all",
                  tab === t.id ? "bg-white dark:bg-slate-800 text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>
                <t.icon className="h-3.5 w-3.5" /> {t.label}
                <span className="ml-1 text-muted-foreground font-normal tabular-nums">{counts[t.id]}/{t.count}</span>
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Filtrer..."
              className="w-40 rounded-btn border border-border bg-muted pl-8 pr-3 py-2 text-xs focus:outline-none focus:border-primary" />
          </div>
          {tab !== "ports" && (
            <select value={selectedDomain} onChange={e => setSelectedDomain(e.target.value)}
              className="rounded-btn border border-border bg-muted px-3 py-2 text-xs font-semibold">
              <option value="all">Tous domaines</option>
              {domains.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          )}
        </div>

        {tab === "practice" && <PortPractice items={filteredPorts} isSecure={isSecure} onAnswered={onPracticeAnswered} />}
        {tab === "commands" && <CommandsGrid items={filteredCommands} />}
        {tab === "scenarios" && <ScenariosGrid items={filteredScenarios} />}
        {tab === "confusions" && <ConfusionsGrid items={filteredConfusions} />}
        {tab === "ports" && <PortsGrid items={filteredPorts} isSecure={isSecure} />}
      </div>
    </div>
  );
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function uniqueOptions(values: string[], answer: string) {
  const unique = Array.from(new Set([answer, ...values.filter(Boolean).filter((item) => item !== answer)])).slice(0, 4);
  return shuffleArray(unique);
}

function PortPractice({ items, isSecure, onAnswered }: { items: typeof portFlashcards; isSecure: (p: string) => boolean; onAnswered?: () => void }) {
  const [mode, setMode] = useState<PracticeMode>("protocol-to-port");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, answered: 0 });

  const pool = items.length ? items : portFlashcards;
  const shuffledPool = useMemo(() => shuffleArray([...pool]), [items, pool.length]);
  const current = shuffledPool[index % shuffledPool.length];
  const question = mode === "protocol-to-port"
    ? `Quel port est associé à ${current.protocol} (${current.english}) ?`
    : mode === "port-to-protocol"
    ? `Quel protocole utilise généralement ${current.port} ?`
    : `${current.protocol} est-il considéré comme sûr pour l'examen ?`;
  const answer = mode === "protocol-to-port" ? current.port : mode === "port-to-protocol" ? current.protocol : (isSecure(current.protocol) ? "Secure / encrypted" : "Insecure / cleartext or risky");
  const options = mode === "protocol-to-port"
    ? uniqueOptions(pool.map((item) => item.port), answer)
    : mode === "port-to-protocol"
    ? uniqueOptions(pool.map((item) => item.protocol), answer)
    : ["Secure / encrypted", "Insecure / cleartext or risky", "Only used for email", "Only used for routing"];
  const revealed = selected !== null;
  const correct = selected === answer;

  function choose(option: string) {
    if (revealed) return;
    setSelected(option);
    onAnswered?.();
    setScore((prev) => ({ answered: prev.answered + 1, correct: prev.correct + (option === answer ? 1 : 0) }));
  }

  function next() {
    setSelected(null);
    setIndex((value) => (value + 1) % pool.length);
  }

  return (
    <div className="grid gap-1.5 xl:grid-cols-[0.85fr_1.15fr]">
      <div className="rounded-card border border-border bg-muted p-2.5">
        <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">Mode de révision</p>
        <div className="mt-3 grid gap-2">
          {([
            ["protocol-to-port", "Protocole → port", "Associer un service à son port."],
            ["port-to-protocol", "Port → protocole", "Reconnaître le service depuis le port."],
            ["security", "Risque & sécurité", "Identifier clair/chiffré et alternatives."],
          ] as Array<[PracticeMode, string, string]>).map(([id, label, desc]) => (
            <button key={id} type="button" onClick={() => { setMode(id); setSelected(null); }}
              className={cn("rounded-lg border p-2.5 text-left transition hover:border-primary", mode === id ? "border-primary bg-primary/10" : "border-border bg-card")}>
              <p className="font-black">{label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
            </button>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-card border border-border bg-card p-3">
            <p className="text-xs font-bold uppercase text-muted-foreground">Score</p>
            <p className="mt-1 text-2xl font-black tabular-nums">{score.answered ? Math.round((score.correct / score.answered) * 100) : 0}%</p>
          </div>
          <div className="rounded-card border border-border bg-card p-3">
            <p className="text-xs font-bold uppercase text-muted-foreground">Réponses</p>
            <p className="mt-1 text-2xl font-black tabular-nums">{score.correct}/{score.answered}</p>
          </div>
        </div>
      </div>

      <div className="rounded-card border border-border bg-card p-2.5 shadow-sm">
        <div className="mb-1.5 flex flex-wrap items-center justify-between gap-1.5">
          <div>
            <Badge className={isSecure(current.protocol) ? "bg-success-muted text-success-fg" : "bg-danger-muted text-danger-fg"}>
              {isSecure(current.protocol) ? "Secure" : "À risque"}
            </Badge>
            <p className="mt-3 text-xl font-black leading-snug">{question}</p>
          </div>
          <span className="text-sm font-black tabular-nums text-muted-foreground">{(index % pool.length) + 1}/{pool.length}</span>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {options.map((option) => {
            const isAnswer = option === answer;
            const isSelected = option === selected;
            return (
              <button key={option} type="button" onClick={() => choose(option)}
                className={cn(
                  "flex min-h-12 items-center gap-1.5 rounded-lg border px-3 py-2.5 text-left text-sm font-black transition",
                  !revealed && "border-border bg-muted hover:border-primary",
                  revealed && isAnswer && "border-success-muted bg-success-muted text-success-fg",
                  revealed && isSelected && !isAnswer && "border-danger-muted bg-danger-muted text-danger-fg",
                  revealed && !isSelected && !isAnswer && "border-border bg-muted opacity-55",
                )}>
                {revealed && isAnswer ? <CheckCircle2 className="h-4 w-4" /> : revealed && isSelected ? <XCircle className="h-4 w-4" /> : <span className="h-4 w-4 rounded-full border border-current" />}
                {option}
              </button>
            );
          })}
        </div>

        {revealed && (
          <div className="mt-3 rounded-card border border-border bg-muted p-2.5">
            <p className={cn("font-black", correct ? "text-success-fg" : "text-danger-fg")}>{correct ? "Correct" : "À revoir"}</p>
            <p className="mt-2 text-sm leading-6"><strong>{current.protocol}</strong> · {current.port} · {current.english}</p>
            <p className="mt-1 text-sm text-muted-foreground">{current.details}</p>
            {current.secureAlternative && <p className="mt-1 text-sm"><strong>Alternative sécurisée: </strong>{current.secureAlternative}</p>}
            <button type="button" onClick={next}
              className="mt-3 inline-flex min-h-8 items-center gap-2 rounded-btn bg-primary px-4 text-sm font-black text-primary-foreground transition hover:opacity-90">
              Suivant <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Empty({ msg }: { msg: string }) {
  return <p className="col-span-full text-center text-muted-foreground py-8">{msg}</p>;
}

function CommandsGrid({ items }: { items: typeof commandTools }) {
  if (items.length === 0) return <div className="grid"><Empty msg="Aucune commande trouvee." /></div>;
  return (
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
      {items.map(cmd => (
        <div key={cmd.id} className="group rounded-card border border-border bg-muted p-3 transition-all hover:border-primary/30 hover:shadow-sm">
          <div className="flex items-start gap-2 mb-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-btn bg-violet-100 dark:bg-violet-900/30 shrink-0"><Command className="h-3.5 w-3.5 text-violet-600" /></div>
            <div className="flex-1 min-w-0"><p className="text-sm font-bold truncate">{cmd.name}</p><p className="text-xs text-muted-foreground">{cmd.english}</p></div>
          </div>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{cmd.purpose}</p>
          <div className="flex flex-wrap gap-1.5"><Badge className="bg-muted-foreground/10 text-muted-foreground">{cmd.domain}</Badge><span className="text-xs font-semibold text-amber-600 dark:text-amber-400">Examen: {cmd.examTip}</span></div>
        </div>
      ))}
    </div>
  );
}

function ScenariosGrid({ items }: { items: typeof commandToolScenarios }) {
  if (items.length === 0) return <div className="grid"><Empty msg="Aucun scenario trouve." /></div>;
  return (
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
      {items.map(s => (
        <div key={s.id} className="group rounded-card border border-border bg-muted p-3 transition-all hover:border-primary/30 hover:shadow-sm">
          <p className="text-sm font-semibold mb-2">{s.scenario}</p>
          <div className="flex items-center gap-2"><Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">{s.likelyTool}</Badge><Badge className="bg-muted-foreground/10 text-muted-foreground">{s.domain}</Badge></div>
        </div>
      ))}
    </div>
  );
}

function ConfusionsGrid({ items }: { items: typeof commandToolConfusions }) {
  if (items.length === 0) return <div className="grid"><Empty msg="Aucune confusion trouvee." /></div>;
  return (
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
      {items.map(c => (
        <div key={c.id} className="group rounded-card border border-border bg-muted p-3 transition-all hover:border-primary/30 hover:shadow-sm">
          <div className="flex items-start gap-2 mb-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-btn bg-amber-100 dark:bg-amber-900/30 shrink-0"><Brain className="h-3.5 w-3.5 text-amber-600" /></div>
            <div className="flex-1 min-w-0"><p className="text-sm font-bold">{c.comparison}</p><p className="text-xs text-muted-foreground">{c.sectionTitle} · {c.domain}</p></div>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-3">{c.difference}</p>
        </div>
      ))}
    </div>
  );
}

function PortsGrid({ items, isSecure }: { items: typeof portFlashcards; isSecure: (p: string) => boolean }) {
  if (items.length === 0) return <div className="grid"><Empty msg="Aucun port trouve." /></div>;
  return (
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
      {items.map(p => (
        <div key={p.id} className="group rounded-card border border-border bg-muted p-3 transition-all hover:border-primary/30 hover:shadow-sm">
          <div className="flex items-center gap-1.5 mb-2">
            <div className={cn("flex h-8 w-8 items-center justify-center rounded-btn text-xs font-mono font-bold shrink-0", isSecure(p.protocol) ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400")}>{p.port}</div>
            <div className="flex-1 min-w-0"><p className="text-sm font-bold truncate">{p.protocol}</p><p className="text-xs text-muted-foreground">{p.english}</p></div>
            {isSecure(p.protocol) ? <Shield className="h-4 w-4 text-emerald-500 shrink-0" /> : <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">{p.details}</p>
          {p.secureAlternative && <p className="mt-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">Alt: {p.secureAlternative}</p>}
        </div>
      ))}
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import { AlertTriangle, Brain, Command, Globe, Network, Search, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { commandTools, commandToolScenarios, commandToolConfusions } from "@/data/command-tools";
import { portFlashcards } from "@/data/port-flashcards";

type Tab = "commands" | "scenarios" | "ports" | "confusions";

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex min-h-7 items-center rounded-full px-2.5 text-xs font-semibold tracking-wide", className)}>{children}</span>;
}

export function PortsCommandsView() {
  const [tab, setTab] = useState<Tab>("commands");
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
    { id: "commands" as Tab, label: "Commandes", icon: Command, count: commandTools.length },
    { id: "scenarios" as Tab, label: "Scenarios", icon: Globe, count: commandToolScenarios.length },
    { id: "confusions" as Tab, label: "Confusions", icon: Brain, count: commandToolConfusions.length },
    { id: "ports" as Tab, label: "Ports", icon: Network, count: portFlashcards.length },
  ];

  const counts = { commands: filteredCommands.length, scenarios: filteredScenarios.length, confusions: filteredConfusions.length, ports: filteredPorts.length };

  return (
    <div className="animate-fade-in space-y-4">
      <div className="rounded-card border border-border bg-card p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 mb-4">
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

        {tab === "commands" && <CommandsGrid items={filteredCommands} />}
        {tab === "scenarios" && <ScenariosGrid items={filteredScenarios} />}
        {tab === "confusions" && <ConfusionsGrid items={filteredConfusions} />}
        {tab === "ports" && <PortsGrid items={filteredPorts} isSecure={isSecure} />}
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
          <div className="flex items-center gap-3 mb-2">
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

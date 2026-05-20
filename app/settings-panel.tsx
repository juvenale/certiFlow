"use client";

import { useState, useRef } from "react";
import { Download, FileJson, Globe, Moon, Sun, Upload, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function SettingsPanel({ dark, onToggleDark }: { dark: boolean; onToggleDark: () => void }) {
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const fileRef = useRef<HTMLInputElement>(null);
  const [importMsg, setImportMsg] = useState("");
  const [exportMsg, setExportMsg] = useState("");

  function handleExport() {
    try {
      const data: Record<string, unknown> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("certiflow")) {
          try { data[key] = JSON.parse(localStorage.getItem(key) || ""); } catch { data[key] = localStorage.getItem(key); }
        }
      }
      const blob = new Blob([JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), data }, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = "certiflow-backup.json"; a.click();
      URL.revokeObjectURL(url);
      setExportMsg("Exporte avec succes !");
      setTimeout(() => setExportMsg(""), 3000);
    } catch { setExportMsg("Erreur lors de l export."); }
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string);
        if (!json.data) throw new Error("Format invalide");
        for (const [key, value] of Object.entries(json.data as Record<string, unknown>)) {
          localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
        }
        setImportMsg("Importe avec succes ! Recharge la page.");
        setTimeout(() => setImportMsg(""), 5000);
      } catch { setImportMsg("Fichier invalide."); }
    };
    reader.readAsText(file);
  }

  return (
    <div className="animate-fade-in space-y-5">
      {/* Theme */}
      <div className="rounded-card border border-border bg-card p-5 shadow-sm">
        <h2 className="mb-4 text-sm font-bold text-muted-foreground uppercase tracking-wider">Theme</h2>
        <div className="flex gap-3">
          <button onClick={() => { if (dark) onToggleDark(); }}
            className={cn("flex items-center gap-2 rounded-card border px-4 py-3 text-sm font-bold transition-all",
              !dark ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted hover:border-primary")}>
            <Sun className="h-4 w-4" /> Clair
          </button>
          <button onClick={() => { if (!dark) onToggleDark(); }}
            className={cn("flex items-center gap-2 rounded-card border px-4 py-3 text-sm font-bold transition-all",
              dark ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted hover:border-primary")}>
            <Moon className="h-4 w-4" /> Sombre
          </button>
        </div>
      </div>

      {/* Language */}
      <div className="rounded-card border border-border bg-card p-5 shadow-sm">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-wider"><Globe className="h-4 w-4" /> Langue</h2>
        <div className="flex gap-3">
          {(["fr", "en"] as const).map(l => (
            <button key={l} onClick={() => setLang(l)}
              className={cn("flex items-center gap-2 rounded-card border px-4 py-3 text-sm font-bold transition-all",
                lang === l ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted hover:border-primary")}>
              {l === "fr" ? "Francais" : "English"} {lang === l && <CheckCircle2 className="h-4 w-4" />}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">La langue sera appliquee au prochain deploiement.</p>
      </div>

      {/* Export / Import */}
      <div className="rounded-card border border-border bg-card p-5 shadow-sm">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-wider"><FileJson className="h-4 w-4" /> Donnees</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <button onClick={handleExport}
              className="flex w-full items-center gap-2 justify-center rounded-card border border-border bg-muted px-4 py-3 text-sm font-bold transition-all hover:border-primary hover:bg-primary/5">
              <Download className="h-4 w-4" /> Exporter (JSON)
            </button>
            {exportMsg && <p className="mt-2 text-xs text-emerald-600">{exportMsg}</p>}
          </div>
          <div>
            <button onClick={() => fileRef.current?.click()}
              className="flex w-full items-center gap-2 justify-center rounded-card border border-border bg-muted px-4 py-3 text-sm font-bold transition-all hover:border-primary hover:bg-primary/5">
              <Upload className="h-4 w-4" /> Importer (JSON)
            </button>
            <input ref={fileRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
            {importMsg && <p className="mt-2 text-xs text-emerald-600">{importMsg}</p>}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="rounded-card border border-border bg-card p-5 shadow-sm">
        <h2 className="mb-4 text-sm font-bold text-muted-foreground uppercase tracking-wider">Statistiques locales</h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {(["certiflow-answered", "certiflow-correct", "certiflow-errors"]).map(k => {
            const raw = typeof window !== "undefined" ? localStorage.getItem(k) : null;
            const val = raw ? (raw.startsWith("[") ? JSON.parse(raw).length + " entrees" : raw) : "vide";
            return <div key={k} className="rounded-card bg-muted p-3"><p className="font-mono text-xs text-muted-foreground">{k}</p><p className="font-bold">{val}</p></div>;
          })}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  AlertTriangle, CheckCircle2, Cloud, CloudOff, Database,
  Download, FileJson, Globe, LogOut, Mail, RefreshCcw,
  Shield, Sun, Trash2, Upload, User, Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AppTheme } from "./shared-types";

// ─── Types ──────────────────────────────────────────────────────────────────

interface SettingsViewProps {
  // Auth
  authUser: { email?: string } | null;
  authEmail: string;
  authPassword: string;
  authBusy: boolean;
  cloudBusy: boolean;
  cloudStatus: string;
  supabaseReady: boolean;
  onAuthEmailChange: (v: string) => void;
  onAuthPasswordChange: (v: string) => void;
  onSignIn: () => void;
  onSignUp: () => void;
  onSignOut: () => void;
  onCloudSave: () => void;
  onCloudRestore: () => void;
  // Data
  answered: number;
  correct: number;
  errorsCount: number;
  hasActiveExam: boolean;
  examFinished: boolean;
  dailyTasks: { qcm: number; pbq: number; flashcards: number; ports: number; exam: number };
  // Theme
  appTheme: AppTheme;
  onThemeChange: (theme: AppTheme) => void;
  // Export/Reset
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

// ─── Theme config ──────────────────────────────────────────────────────────

const appThemes: Array<{ id: AppTheme; label: string; note: string; swatches: string[] }> = [
  { id: "certiflow-classic", label: "CertiFlow Classic", note: "Clair et professionnel",         swatches: ["#176B87", "#06B6D4", "#10B981"] },
  { id: "soc-night",         label: "SOC Night",         note: "Sombre — longues sessions",      swatches: ["#38BDF8", "#22C55E", "#08111F"] },
  { id: "exam-focus",        label: "Exam Focus",        note: "Minimal haute concentration",    swatches: ["#2563EB", "#7C3AED", "#F9FAFB"] },
  { id: "threat-lab",        label: "Threat Lab",        note: "Immersif PBQ et logs",           swatches: ["#0F766E", "#E11D48", "#101418"] },
  { id: "midnight",          label: "Midnight",          note: "Indigo sombre — style hacker",   swatches: ["#818CF8", "#C084FC", "#0D0F1E"] },
  { id: "warm-focus",        label: "Warm Focus",        note: "Creme chaud — revision longue",  swatches: ["#C2410C", "#D97706", "#FDF8F2"] },
  { id: "forest-ops",        label: "Forest Ops",        note: "Terminal vert — full immersif",  swatches: ["#34D399", "#60A5FA", "#091510"] },
  { id: "arctic",            label: "Arctic",            note: "Bleu glace — ultra propre",      swatches: ["#0369A1", "#0891B2", "#EEF3F8"] },
];

// ─── Sub-components ────────────────────────────────────────────────────────

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="rounded-card border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function StatRow({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="flex items-center justify-between rounded-card bg-muted px-4 py-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="text-right">
        <span className="text-lg font-black tabular-nums text-primary">{value}</span>
        {sub && <span className="ml-1 text-xs text-muted-foreground">{sub}</span>}
      </div>
    </div>
  );
}

function ThemeSwatch({ theme, active, onClick }: { theme: typeof appThemes[0]; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-card border p-3 text-left transition hover:border-primary",
        active ? "border-primary bg-primary/5" : "border-border bg-muted"
      )}
    >
      <div className="flex shrink-0 gap-0.5">
        {theme.swatches.map((c, i) => (
          <div key={i} className="h-5 w-5 rounded-sm border border-border/50" style={{ backgroundColor: c }} />
        ))}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold truncate">{theme.label}</p>
        <p className="text-xs text-muted-foreground">{theme.note}</p>
      </div>
      {active && <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-primary" />}
    </button>
  );
}

// ─── Main component ────────────────────────────────────────────────────────

export function SettingsView(props: SettingsViewProps) {
  const {
    authUser, authEmail, authPassword, authBusy, cloudBusy, cloudStatus,
    supabaseReady, onAuthEmailChange, onAuthPasswordChange, onSignIn, onSignUp,
    onSignOut, onCloudSave, onCloudRestore,
    answered, correct, errorsCount, hasActiveExam, examFinished,
    dailyTasks, appTheme, onThemeChange, onExport, onImport, onReset,
  } = props;

  const connected = !!authUser;
  const score = answered > 0 ? Math.round((correct / answered) * 100) : 0;
  const totalDaily = dailyTasks.qcm + dailyTasks.pbq + dailyTasks.flashcards + dailyTasks.ports + dailyTasks.exam;

  return (
    <div className="grid gap-4">

      {/* ── Account ──────────────────────────────────────────────── */}
      <Section title="Compte Supabase" icon={User}>
        {!supabaseReady ? (
          <div className="flex items-start gap-3 rounded-card border border-warning-muted bg-warning-muted p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warning-fg" />
            <div>
              <p className="font-bold text-warning-fg">Supabase non configuré</p>
              <p className="text-sm text-muted-foreground">
                Ajoute NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY dans les variables d&apos;environnement.
              </p>
            </div>
          </div>
        ) : connected ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-card border border-success-muted bg-success-muted p-4">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-success-fg" />
              <div className="min-w-0">
                <p className="font-bold text-success-fg">Connecté</p>
                <p className="truncate text-sm text-muted-foreground">{authUser?.email}</p>
              </div>
              <button type="button" onClick={onSignOut}
                className="ml-auto flex items-center gap-1.5 rounded-btn border border-border bg-card px-3 py-1.5 text-xs font-bold transition hover:border-danger hover:text-danger">
                <LogOut className="h-3 w-3" /> Déconnexion
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              {cloudStatus}
            </p>
            <div className="flex flex-wrap gap-2">
              <button type="button" disabled={cloudBusy} onClick={onCloudSave}
                className="inline-flex items-center gap-1.5 rounded-btn bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-50">
                <Cloud className="h-3.5 w-3.5" /> Sauvegarder en ligne
              </button>
              <button type="button" disabled={cloudBusy} onClick={onCloudRestore}
                className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-card px-4 py-2 text-sm font-bold transition hover:border-primary disabled:opacity-50">
                <Download className="h-3.5 w-3.5" /> Restaurer
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-card border border-border bg-muted p-4">
              <CloudOff className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
              <div>
                <p className="font-bold">Non connecté</p>
                <p className="text-sm text-muted-foreground">
                  Connecte-toi pour synchroniser ta progression entre appareils.
                </p>
              </div>
            </div>
            <input
              type="email" value={authEmail} onChange={(e) => onAuthEmailChange(e.target.value)}
              placeholder="Email" disabled={authBusy}
              className="w-full min-h-11 rounded-card border border-border bg-card px-3 text-sm outline-none transition focus:border-primary disabled:opacity-50"
            />
            <input
              type="password" value={authPassword} onChange={(e) => onAuthPasswordChange(e.target.value)}
              placeholder="Mot de passe (6+ caracteres)" disabled={authBusy}
              className="w-full min-h-11 rounded-card border border-border bg-card px-3 text-sm outline-none transition focus:border-primary disabled:opacity-50"
            />
            <div className="flex gap-2">
              <button type="button" disabled={authBusy} onClick={onSignIn}
                className="flex-1 rounded-btn bg-primary py-2.5 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-50">
                Se connecter
              </button>
              <button type="button" disabled={authBusy} onClick={onSignUp}
                className="flex-1 rounded-btn border border-border bg-card py-2.5 text-sm font-bold transition hover:border-primary disabled:opacity-50">
                Creer un compte
              </button>
            </div>
          </div>
        )}
      </Section>

      {/* ── Statistiques ─────────────────────────────────────────── */}
      <Section title="Donnees actuelles" icon={Database}>
        <div className="grid gap-2 sm:grid-cols-2">
          <StatRow label="Questions repondues" value={answered} sub={answered > 0 ? `${score}% de reussite` : undefined} />
          <StatRow label="Reponses correctes" value={correct} />
          <StatRow label="Erreurs enregistrees" value={errorsCount} />
          <StatRow label="Taches du jour" value={totalDaily} sub={`/74 (${Math.round(totalDaily / 74 * 100)}%)`} />
          <StatRow label="Session examen" value={hasActiveExam ? (examFinished ? "Terminee" : "En cours") : "Aucune"} />
          <StatRow label="Score global" value={`${score}%`} />
        </div>
      </Section>

      {/* ── Theme ────────────────────────────────────────────────── */}
      <Section title="Theme visuel" icon={Sun}>
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {appThemes.map((theme) => (
            <ThemeSwatch
              key={theme.id}
              theme={theme}
              active={appTheme === theme.id}
              onClick={() => onThemeChange(theme.id)}
            />
          ))}
        </div>
      </Section>

      {/* ── Export / Import ──────────────────────────────────────── */}
      <Section title="Sauvegarde locale" icon={FileJson}>
        <p className="mb-4 text-sm text-muted-foreground">
          Exporte ta progression dans un fichier JSON. Importe-le sur un autre appareil ou apres un nettoyage du navigateur.
        </p>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={onExport}
            className="inline-flex items-center gap-1.5 rounded-btn bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:opacity-95">
            <Upload className="h-4 w-4" /> Exporter (JSON)
          </button>
          <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-btn border border-border bg-muted px-5 py-2.5 text-sm font-bold transition hover:border-primary hover:text-primary">
            <Download className="h-4 w-4" /> Importer (JSON)
            <input type="file" accept=".json" className="sr-only" onChange={onImport} />
          </label>
        </div>
      </Section>

      {/* ── Danger zone ──────────────────────────────────────────── */}
      <Section title="Zone dangereuse" icon={Shield}>
        <p className="mb-4 text-sm text-muted-foreground">
          Efface toutes les donnees CertiFlow de ce navigateur. Progression, erreurs et session d&apos;examen seront supprimees.
        </p>
        <button type="button" onClick={onReset}
          className="inline-flex items-center gap-1.5 rounded-btn bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:opacity-90">
          <Trash2 className="h-4 w-4" /> Reinitialiser toutes les donnees
        </button>
      </Section>

      {/* ── About ────────────────────────────────────────────────── */}
      <div className="rounded-card border border-border bg-muted/50 p-5 text-center">
        <p className="text-sm font-black text-primary">CertiFlow</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Prep CompTIA Security+ SY0-701 &middot; v0.1 &middot; DeepSeek &middot; Supabase
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          <Globe className="inline h-3 w-3" /> certiflow.vercel.app
        </p>
      </div>
    </div>
  );
}

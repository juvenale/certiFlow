"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Cloud,
  CloudOff,
  Database,
  Download,
  FileJson,
  LogOut,
  Palette,
  Shield,
  Trash2,
  Upload,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AppTheme } from "./shared-types";

interface SettingsViewProps {
  authUser: { email?: string } | null;
  authEmail: string;
  authPassword: string;
  authBusy: boolean;
  cloudBusy: boolean;
  cloudStatus: string;
  supabaseReady: boolean;
  onAuthEmailChange: (value: string) => void;
  onAuthPasswordChange: (value: string) => void;
  onSignIn: () => void;
  onSignUp: () => void;
  onSignOut: () => void;
  onCloudSave: () => void;
  onCloudRestore: () => void;
  answered: number;
  correct: number;
  errorsCount: number;
  hasActiveExam: boolean;
  examFinished: boolean;
  dailyTasks: { qcm: number; pbq: number; flashcards: number; ports: number; exam: number };
  appTheme: AppTheme;
  onThemeChange: (theme: AppTheme) => void;
  onExport: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

const themes: Array<{ id: AppTheme; label: string; note: string; swatches: string[] }> = [
  { id: "certiflow-classic", label: "CertiFlow Classic", note: "Clair et professionnel", swatches: ["#176B87", "#06B6D4", "#10B981"] },
  { id: "soc-night", label: "SOC Night", note: "Sombre pour longues sessions", swatches: ["#38BDF8", "#22C55E", "#08111F"] },
  { id: "exam-focus", label: "Exam Focus", note: "Minimal et concentre", swatches: ["#2563EB", "#7C3AED", "#F9FAFB"] },
  { id: "threat-lab", label: "Threat Lab", note: "PBQ, logs et scenarios", swatches: ["#0F766E", "#E11D48", "#101418"] },
  { id: "midnight", label: "Midnight", note: "Indigo sombre", swatches: ["#818CF8", "#C084FC", "#0D0F1E"] },
  { id: "warm-focus", label: "Warm Focus", note: "Lecture longue", swatches: ["#C2410C", "#D97706", "#FDF8F2"] },
  { id: "forest-ops", label: "Forest Ops", note: "Terminal vert", swatches: ["#34D399", "#60A5FA", "#091510"] },
  { id: "arctic", label: "Arctic", note: "Bleu propre", swatches: ["#0369A1", "#0891B2", "#EEF3F8"] },
];

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <section className="rounded-card border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-btn bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <h2 className="text-sm font-black uppercase tracking-wider text-muted-foreground">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function StatTile({ label, value, note }: { label: string; value: string | number; note?: string }) {
  return (
    <div className="rounded-card border border-border bg-muted p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
      <strong className="mt-1 block text-2xl font-black tabular-nums text-primary">{value}</strong>
      {note && <p className="mt-1 text-xs text-muted-foreground">{note}</p>}
    </div>
  );
}

function ThemeButton({ theme, active, onClick }: { theme: (typeof themes)[number]; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-card border p-4 text-left transition hover:-translate-y-0.5 hover:border-primary",
        active ? "border-primary bg-primary/10" : "border-border bg-muted",
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex gap-1">
          {theme.swatches.map((color) => (
            <span key={color} className="h-5 w-5 rounded-sm border border-border" style={{ background: color }} />
          ))}
        </div>
        {active && <CheckCircle2 className="h-4 w-4 text-primary" />}
      </div>
      <p className="font-black">{theme.label}</p>
      <p className="mt-1 text-xs text-muted-foreground">{theme.note}</p>
    </button>
  );
}

export function SettingsView({
  authUser,
  authEmail,
  authPassword,
  authBusy,
  cloudBusy,
  cloudStatus,
  supabaseReady,
  onAuthEmailChange,
  onAuthPasswordChange,
  onSignIn,
  onSignUp,
  onSignOut,
  onCloudSave,
  onCloudRestore,
  answered,
  correct,
  errorsCount,
  hasActiveExam,
  examFinished,
  dailyTasks,
  appTheme,
  onThemeChange,
  onExport,
  onImport,
  onReset,
}: SettingsViewProps) {
  const connected = Boolean(authUser);
  const score = answered ? Math.round((correct / answered) * 100) : 0;
  const taskTotal = dailyTasks.qcm + dailyTasks.pbq + dailyTasks.flashcards + dailyTasks.ports + dailyTasks.exam;

  return (
    <div className="grid gap-4">
      <div className="rounded-card border border-border bg-card p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">Centre de controle</p>
            <h2 className="mt-1 text-2xl font-black">Parametres CertiFlow</h2>
            <p className="mt-1 text-sm text-muted-foreground">Compte, synchro, theme, sauvegarde et maintenance locale.</p>
          </div>
          <div className={cn("inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold", connected ? "bg-success-muted text-success-fg" : "bg-warning-muted text-warning-fg")}>
            {connected ? <Cloud className="h-4 w-4" /> : <CloudOff className="h-4 w-4" />}
            {connected ? "Synchro disponible" : "Synchro inactive"}
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Section title="Compte & cloud" icon={User}>
          {!supabaseReady ? (
            <div className="rounded-card border border-warning-muted bg-warning-muted p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 text-warning-fg" />
                <div>
                  <p className="font-black text-warning-fg">Supabase non configure</p>
                  <p className="mt-1 text-sm text-muted-foreground">Ajoute les variables Supabase dans Netlify, puis redeploie le site.</p>
                </div>
              </div>
            </div>
          ) : connected ? (
            <div className="grid gap-4">
              <div className="rounded-card border border-success-muted bg-success-muted p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success-fg" />
                  <div className="min-w-0 flex-1">
                    <p className="font-black text-success-fg">Connecte</p>
                    <p className="truncate text-sm text-muted-foreground">{authUser?.email}</p>
                  </div>
                  <button type="button" onClick={onSignOut} className="inline-flex items-center gap-2 rounded-btn border border-border bg-card px-3 py-2 text-sm font-bold transition hover:border-danger hover:text-danger">
                    <LogOut className="h-4 w-4" /> Deconnexion
                  </button>
                </div>
              </div>
              <div className="rounded-card border border-border bg-muted p-4">
                <p className="text-sm font-semibold">{cloudStatus}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button type="button" disabled={cloudBusy} onClick={onCloudSave} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-card bg-primary px-4 font-bold text-primary-foreground disabled:opacity-50">
                    <Cloud className="h-4 w-4" /> Sauvegarder en ligne
                  </button>
                  <button type="button" disabled={cloudBusy} onClick={onCloudRestore} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-card border border-border bg-card px-4 font-bold disabled:opacity-50">
                    <Download className="h-4 w-4" /> Restaurer ici
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-3">
              <div className="rounded-card border border-border bg-muted p-4">
                <p className="font-black">Connexion requise</p>
                <p className="mt-1 text-sm text-muted-foreground">Utilise le meme compte sur mobile et PC pour restaurer ta progression.</p>
              </div>
              <input type="email" value={authEmail} onChange={(event) => onAuthEmailChange(event.target.value)} placeholder="Email" className="min-h-11 rounded-card border border-border bg-card px-3 outline-none focus:border-primary" />
              <input type="password" value={authPassword} onChange={(event) => onAuthPasswordChange(event.target.value)} placeholder="Mot de passe" className="min-h-11 rounded-card border border-border bg-card px-3 outline-none focus:border-primary" />
              <div className="grid gap-2 sm:grid-cols-2">
                <button type="button" disabled={authBusy} onClick={onSignIn} className="min-h-10 rounded-card bg-primary px-4 font-bold text-primary-foreground disabled:opacity-50">Se connecter</button>
                <button type="button" disabled={authBusy} onClick={onSignUp} className="min-h-10 rounded-card border border-border bg-card px-4 font-bold disabled:opacity-50">Creer un compte</button>
              </div>
            </div>
          )}
        </Section>

        <Section title="Donnees actuelles" icon={Database}>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <StatTile label="Questions" value={answered} note={`${correct} correctes`} />
            <StatTile label="Score global" value={`${score}%`} note="Base quiz locale" />
            <StatTile label="Erreurs" value={errorsCount} note="Journal a revoir" />
            <StatTile label="Taches du jour" value={taskTotal} note={`${dailyTasks.qcm} quiz, ${dailyTasks.flashcards} flashcards`} />
            <StatTile label="Session examen" value={hasActiveExam ? (examFinished ? "Terminee" : "En cours") : "Aucune"} />
          </div>
        </Section>
      </div>

      <Section title="Themes visuels" icon={Palette}>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {themes.map((theme) => (
            <ThemeButton key={theme.id} theme={theme} active={appTheme === theme.id} onClick={() => onThemeChange(theme.id)} />
          ))}
        </div>
      </Section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Section title="Sauvegarde locale" icon={FileJson}>
          <p className="mb-4 text-sm text-muted-foreground">Exporte un fichier JSON de secours ou importe une sauvegarde locale.</p>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={onExport} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-card bg-primary px-5 font-bold text-primary-foreground shadow-sm transition hover:-translate-y-0.5">
              <Upload className="h-4 w-4" /> Exporter JSON
            </button>
            <label className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-card border border-border bg-muted px-5 font-bold transition hover:border-primary hover:text-primary">
              <Download className="h-4 w-4" /> Importer JSON
              <input type="file" accept=".json" className="sr-only" onChange={onImport} />
            </label>
          </div>
        </Section>

        <Section title="Zone dangereuse" icon={Shield}>
          <p className="mb-4 text-sm text-muted-foreground">Supprime les donnees CertiFlow de ce navigateur. La sauvegarde cloud ne sera pas effacee.</p>
          <button type="button" onClick={onReset} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-card bg-red-600 px-5 font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:opacity-90">
            <Trash2 className="h-4 w-4" /> Reinitialiser ce navigateur
          </button>
        </Section>
      </div>
    </div>
  );
}

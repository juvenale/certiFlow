"use client";

import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-card border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-btn bg-primary/10 shadow-sm">
          <GraduationCap className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">CertiFlow workspace</p>
          <h2 className="text-xl font-black leading-tight">{title}</h2>
        </div>
      </div>
      {children}
    </section>
  );
}

export function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex min-h-8 items-center rounded-full border border-border bg-muted px-3 text-xs font-black uppercase tracking-wide text-muted-foreground">{children}</span>;
}

export function ActionButton({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={cn("inline-flex min-h-10 items-center justify-center rounded-btn bg-primary px-4 text-sm font-black text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:opacity-95", className)}>
      {children}
    </button>
  );
}

export function GhostButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex min-h-10 items-center justify-center rounded-btn border border-border bg-muted px-4 text-sm font-black transition hover:border-primary hover:text-primary">
      {children}
    </button>
  );
}

export function Info({ label, text }: { label: string; text: string }) {
  return (
    <p className="mt-3 text-sm leading-6">
      <strong>{label}: </strong>
      {text}
    </p>
  );
}

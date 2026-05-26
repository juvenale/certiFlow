"use client";

import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-card border border-border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <GraduationCap className="h-4 w-4 text-primary" />
          </div>
          <h2 className="text-sm font-bold tracking-tight">{title}</h2>
        </div>
      </div>
      <div className="border-t border-border pt-4">
        {children}
      </div>
    </section>
  );
}

export function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex min-h-7 items-center rounded-md border border-border bg-muted px-2.5 text-xs font-medium text-muted-foreground">{children}</span>;
}

export function ActionButton({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={cn("inline-flex min-h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90", className)}>
      {children}
    </button>
  );
}

export function GhostButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex min-h-9 items-center justify-center rounded-lg border border-border bg-card px-4 text-sm font-medium transition hover:border-primary hover:text-primary">
      {children}
    </button>
  );
}

export function Info({ label, text }: { label: string; text: string }) {
  return (
    <p className="mt-2 text-sm leading-relaxed">
      <strong className="font-semibold">{label} : </strong>
      <span className="text-muted-foreground">{text}</span>
    </p>
  );
}

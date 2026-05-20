"use client";

import { ReadinessView } from "../readiness";

export default function ReadinessPage() {
  return (
    <main className="min-h-screen bg-background text-foreground p-8">
      <ReadinessView answered={0} correct={0} avgProgress={0} onNavigate={(v) => { window.location.href = "/"; }} />
    </main>
  );
}

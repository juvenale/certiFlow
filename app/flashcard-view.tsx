"use client";

import { useState } from "react";
import { RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Deck = "acronyms" | "ports" | "commands" | "technical";

interface Flashcard {
  term: string;
  definition: string;
  details: string;
  domain: string;
  themeTitle: string;
}

interface DeckInfo {
  id: Deck;
  title: string;
  description: string;
  count: number;
  cards: Flashcard[];
}

interface FlashcardViewProps {
  decks: DeckInfo[];
}

function StackedCard({ card, onFlip, onNext, onPrev, current, total }: {
  card: Flashcard;
  onFlip: () => void;
  onNext: () => void;
  onPrev: () => void;
  current: number;
  total: number;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="mx-auto w-full max-w-lg">
      {/* Stacked pseudo-cards */}
      <div className="relative" style={{ perspective: "1000px" }}>
        <div className="absolute inset-x-3 -top-2 h-full rounded-2xl border border-border bg-card/50" />
        <div className="absolute inset-x-1.5 -top-1 h-full rounded-2xl border border-border bg-card/75" />

        {/* Main card */}
        <div
          className="relative cursor-pointer select-none"
          onClick={() => { setFlipped((v) => !v); onFlip(); }}
          style={{ transformStyle: "preserve-3d", transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)", transform: flipped ? "rotateY(180deg)" : "rotateY(0)" }}
        >
          {/* Front */}
          <div className="grid min-h-52 w-full place-items-center rounded-2xl border border-border bg-card p-8 text-center shadow-lg"
            style={{ backfaceVisibility: "hidden" }}>
            <div>
              <p className="text-3xl font-bold text-primary tracking-tight">{card.term}</p>
              <p className="mt-2 text-xs text-muted-foreground">Cliquez pour reveler</p>
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 grid min-h-52 w-full place-items-center rounded-2xl border border-border bg-card p-8 text-center shadow-lg"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            <div>
              <p className="text-xl font-semibold text-primary">{card.term}</p>
              <p className="mt-3 text-base font-semibold">{card.definition}</p>
              <p className="mt-2 text-sm text-muted-foreground">{card.details}</p>
              <p className="mt-3 text-xs text-muted-foreground">{card.domain} · {card.themeTitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls - outside the clickable area */}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{current}/{total}</span>
        <div className="flex gap-1.5">
          <button type="button" onClick={onPrev}
            className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium transition hover:border-primary hover:bg-muted">
            <ChevronLeft className="h-3.5 w-3.5" /> Prev
          </button>
          <button type="button" onClick={onNext}
            className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium transition hover:border-primary hover:bg-muted">
            Next <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function FlashcardView({ decks }: FlashcardViewProps) {
  const [activeDeck, setActiveDeck] = useState<DeckInfo | null>(null);
  const [index, setIndex] = useState(0);

  const deck = activeDeck;
  const cards = deck?.cards ?? [];
  const card = cards[index] ?? cards[0];

  if (!deck) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {decks.map((d) => (
          <button key={d.id} type="button" onClick={() => { setActiveDeck(d); setIndex(0); }}
            className="rounded-xl border border-border bg-card p-5 text-left transition-all hover:border-primary hover:shadow-sm group">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold group-hover:text-primary transition-colors">{d.title}</h3>
              <RotateCcw className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <p className="text-sm text-muted-foreground">{d.description}</p>
            <p className="mt-3 text-xs font-bold text-primary">{d.count} cartes</p>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Deck info bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setActiveDeck(null)}
            className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
            ← Packs
          </button>
          <span className="text-muted-foreground">·</span>
          <span className="text-xs font-bold">{deck.title}</span>
          <span className="text-xs text-muted-foreground">({deck.count} cartes)</span>
        </div>
      </div>

      {/* Stacked card */}
      {card && (
        <StackedCard key={card.term + "-" + index}
          card={card}
          onFlip={() => {}}
          onNext={() => setIndex((i) => (i + 1) % cards.length)}
          onPrev={() => setIndex((i) => (i - 1 + cards.length) % cards.length)}
          current={index + 1}
          total={cards.length}
        />
      )}
    </div>
  );
}

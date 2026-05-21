"use client";

import { useState, useCallback } from "react";
import { Panel, Badge, ActionButton, GhostButton } from "./shared-ui";
import type { UnifiedFlashcard, FlashcardDeckType } from "./shared-types";

interface FlashcardsViewWrapperProps {
  technicalFlashcards: UnifiedFlashcard[];
  acronymDeck: UnifiedFlashcard[];
  portDeck: UnifiedFlashcard[];
  commandDeck: UnifiedFlashcard[];
  selectedDomain: string;
  selectedThemeTitle?: string;
}

function deckLabel(deck: FlashcardDeckType) {
  switch (deck) {
    case "acronyms": return "Acronymes";
    case "ports": return "Ports / protocoles";
    case "commands": return "Commandes / outils";
    case "technical": return "Termes techniques";
  }
}

function deckCards(deck: FlashcardDeckType, props: FlashcardsViewWrapperProps) {
  switch (deck) {
    case "acronyms": return props.acronymDeck;
    case "ports": return props.portDeck;
    case "commands": return props.commandDeck;
    case "technical": return props.technicalFlashcards;
  }
}

export function FlashcardsViewWrapper(props: FlashcardsViewWrapperProps) {
  const [flashcardDeck, setFlashcardDeck] = useState<FlashcardDeckType | null>(() => {
    if (typeof window === "undefined") return null;
    return (localStorage.getItem("certiflow-flashcard-deck") as FlashcardDeckType | null);
  });
  const [flashIndex, setFlashIndex] = useState(0);
  const [flashBack, setFlashBack] = useState(false);

  const effectiveFlashcards = flashcardDeck ? deckCards(flashcardDeck, props) : [];
  const currentFlashcard = effectiveFlashcards[flashIndex % Math.max(1, effectiveFlashcards.length)];

  const startDeck = useCallback((deck: FlashcardDeckType) => {
    setFlashcardDeck(deck);
    setFlashIndex(0);
    setFlashBack(false);
    if (typeof window !== "undefined") localStorage.setItem("certiflow-flashcard-deck", deck);
  }, []);

  const changeDeck = useCallback(() => {
    setFlashcardDeck(null);
    setFlashBack(false);
    if (typeof window !== "undefined") localStorage.removeItem("certiflow-flashcard-deck");
  }, []);

  const { technicalFlashcards, acronymDeck, portDeck, commandDeck, selectedDomain, selectedThemeTitle } = props;

  if (!flashcardDeck) {
    return (
      <Panel title="Flashcards bilingues">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-card border border-border bg-muted p-5">
            <h2 className="text-xl font-black">Acronymes</h2>
            <p className="mt-2 text-muted-foreground">Sigles Security+ avec signification anglaise, explication francaise et pieges d'examen.</p>
            <Badge>{acronymDeck.length} cartes</Badge>
            <ActionButton className="mt-4" onClick={() => startDeck("acronyms")}>Lancer</ActionButton>
          </article>
          <article className="rounded-card border border-border bg-muted p-5">
            <h2 className="text-xl font-black">Ports / protocoles</h2>
            <p className="mt-2 text-muted-foreground">Ports, protocoles, role et risques a memoriser pour l'examen.</p>
            <Badge>{portDeck.length} cartes</Badge>
            <ActionButton className="mt-4" onClick={() => startDeck("ports")}>Lancer</ActionButton>
          </article>
          <article className="rounded-card border border-border bg-muted p-5">
            <h2 className="text-xl font-black">Commandes / outils</h2>
            <p className="mt-2 text-muted-foreground">Commandes, outils, usage pratique et points a reconnaitre a l'examen.</p>
            <Badge>{commandDeck.length} cartes</Badge>
            <ActionButton className="mt-4" onClick={() => startDeck("commands")}>Lancer</ActionButton>
          </article>
          <article className="rounded-card border border-border bg-muted p-5">
            <h2 className="text-xl font-black">Termes techniques</h2>
            <p className="mt-2 text-muted-foreground">Concepts importants issus des cours, filtrables par domaine, theme et recherche.</p>
            <Badge>{technicalFlashcards.length} cartes</Badge>
            <ActionButton className="mt-4" onClick={() => startDeck("technical")}>Lancer</ActionButton>
          </article>
        </div>
      </Panel>
    );
  }

  return (
    <Panel title="Flashcards bilingues">
      <div className="mb-4 flex flex-wrap gap-2">
        <Badge>{effectiveFlashcards.length} cartes</Badge>
        <Badge>{deckLabel(flashcardDeck)}</Badge>
        {selectedDomain !== "all" && <Badge>{selectedDomain}</Badge>}
        {selectedThemeTitle && <Badge>{selectedThemeTitle}</Badge>}
        <GhostButton onClick={changeDeck}>Changer de paquet</GhostButton>
      </div>
      {effectiveFlashcards.length ? (
        <>
          <button
            type="button"
            onClick={() => setFlashBack((value) => !value)}
            className="grid min-h-32 w-full place-items-center rounded-card bg-muted p-6 text-center"
          >
            {flashBack ? (
              <div>
                <h2 className="text-3xl font-black text-primary">{currentFlashcard.term}</h2>
                <p className="mt-3 text-xl font-bold">{currentFlashcard.definition}</p>
                <p className="mt-3">{currentFlashcard.details}</p>
                <p className="mt-3 text-sm text-muted-foreground">{currentFlashcard.domain} | {currentFlashcard.themeTitle}</p>
              </div>
            ) : (
              <div>
                <p className="text-6xl font-black text-primary">{currentFlashcard.term}</p>
                <p className="mt-4 text-muted-foreground">Clique pour reveler la definition</p>
              </div>
            )}
          </button>
          <div className="mt-4 flex gap-2">
            <GhostButton onClick={() => { setFlashIndex((value) => (value - 1 + effectiveFlashcards.length) % effectiveFlashcards.length); setFlashBack(false); }}>Precedente</GhostButton>
            <ActionButton onClick={() => { setFlashIndex((value) => (value + 1) % effectiveFlashcards.length); setFlashBack(false); }}>Suivante</ActionButton>
          </div>
        </>
      ) : (
        <div className="rounded-card bg-muted p-5">
          <p className="font-bold">Aucune carte ne correspond aux filtres actuels.</p>
          <p className="mt-2 text-muted-foreground">Essaie de vider la recherche ou de changer de domaine.</p>
        </div>
      )}
    </Panel>
  );
}


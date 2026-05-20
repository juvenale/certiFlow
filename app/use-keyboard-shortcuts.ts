"use client";

import { useEffect, useCallback, useState } from "react";
import type { ViewId } from "./shared-types";

interface KeyboardShortcutsOptions {
  currentView: ViewId;
  onNavigate: (view: ViewId) => void;
  quizActions?: {
    chooseAnswer: (index: number) => void;
    nextQuestion: () => void;
    selectedAnswer: number | null;
  };
  flashcardActions?: {
    flip: () => void;
    next: () => void;
    prev: () => void;
  };
}

const viewShortcuts: Array<{ key: string; view: ViewId }> = [
  { key: "1", view: "dashboard" },
  { key: "2", view: "courses" },
  { key: "3", view: "confusions" },
  { key: "4", view: "quiz" },
  { key: "5", view: "pbq" },
  { key: "6", view: "flashcards" },
  { key: "7", view: "ports" },
  { key: "8", view: "exam" },
  { key: "9", view: "errors" },
  { key: "0", view: "settings" },
];

export function useKeyboardShortcuts(opts: KeyboardShortcutsOptions) {
  const [showHelp, setShowHelp] = useState(false);
  const { currentView, onNavigate, quizActions, flashcardActions } = opts;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Don't trigger shortcuts when typing in inputs
    const target = e.target as HTMLElement;
    if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT" || target.isContentEditable) {
      return;
    }

    // ? — toggle help
    if (e.key === "?") {
      e.preventDefault();
      setShowHelp((v) => !v);
      return;
    }

    // Escape — go to dashboard
    if (e.key === "Escape") {
      e.preventDefault();
      onNavigate("dashboard");
      return;
    }

    // / — focus search
    if (e.key === "/") {
      e.preventDefault();
      onNavigate("search");
      return;
    }

    // Number keys — switch views
    const viewMap = viewShortcuts.find((s) => s.key === e.key);
    if (viewMap) {
      e.preventDefault();
      onNavigate(viewMap.view);
      return;
    }

    // Quiz shortcuts (A-D)
    if (currentView === "quiz" && quizActions) {
      if (e.key === "Enter" && quizActions.selectedAnswer !== null) {
        e.preventDefault();
        quizActions.nextQuestion();
        return;
      }
      if (["a", "b", "c", "d"].includes(e.key.toLowerCase())) {
        const idx = e.key.toLowerCase().charCodeAt(0) - 97;
        e.preventDefault();
        quizActions.chooseAnswer(idx);
        return;
      }
    }

    // Flashcard shortcuts
    if (currentView === "flashcards" && flashcardActions) {
      if (e.key === " ") {
        e.preventDefault();
        flashcardActions.flip();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        flashcardActions.next();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        flashcardActions.prev();
        return;
      }
    }
  }, [currentView, onNavigate, quizActions, flashcardActions]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return { showHelp, setShowHelp };
}

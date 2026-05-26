import { useEffect } from 'react';

interface ShortcutActions {
  onNext?: () => void;
  onPrev?: () => void;
  onFlag?: () => void;
  onChooseA?: () => void;
  onChooseB?: () => void;
  onChooseC?: () => void;
  onChooseD?: () => void;
}

export function useKeyboardShortcuts({
  onNext, onPrev, onFlag,
  onChooseA, onChooseB, onChooseC, onChooseD,
}: ShortcutActions) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ne pas déclencher dans les champs de saisie
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      switch (event.key) {
        case "ArrowRight": onNext?.(); break;
        case "ArrowLeft":  onPrev?.(); break;
        case "f": case "F": onFlag?.(); break;
        case "a": case "A": onChooseA?.(); break;
        case "b": case "B": onChooseB?.(); break;
        case "c": case "C": onChooseC?.(); break;
        case "d": case "D": onChooseD?.(); break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrev, onFlag, onChooseA, onChooseB, onChooseC, onChooseD]);
}
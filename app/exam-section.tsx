"use client";

import { useState } from "react";
import { BarChart3 } from "lucide-react";
import { ExamView } from "./exam-view";
import { ExamHistory } from "./exam-history-view";

export function ExamSection(props: any) {
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <>
      {!props.activeExam && (
        <div className="mb-3 flex justify-end">
          <button type="button" onClick={() => setHistoryOpen((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-card px-4 py-2 text-sm font-bold transition hover:border-primary hover:text-primary">
            <BarChart3 className="h-4 w-4" />
            {historyOpen ? "Examens disponibles" : "Historique"}
          </button>
        </div>
      )}
      {historyOpen && !props.activeExam ? (
        <ExamHistory />
      ) : (
        <ExamView {...props} />
      )}
    </>
  );
}

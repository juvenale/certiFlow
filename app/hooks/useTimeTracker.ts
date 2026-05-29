"use client";

import { useState, useEffect, useRef } from "react";

export type QuestionType = "QCM" | "PBQ" | "Examen";

interface TimeLog {
  questionId: string;
  type: QuestionType;
  secondsSpent: number;
}

export function useTimeTracker(questionId: string, type: QuestionType) {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [prevQuestionId, setPrevQuestionId] = useState(questionId);
  if (prevQuestionId !== questionId) {
    setPrevQuestionId(questionId);
    setSeconds(0);
  }

  useEffect(() => {
    timerRef.current = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [questionId]);

  function logTimeData() {
    if (typeof window === "undefined") return;
    try {
      const logs: TimeLog[] = JSON.parse(localStorage.getItem("certiflow-time-logs") || "[]");
      logs.push({ questionId, type, secondsSpent: seconds });
      localStorage.setItem("certiflow-time-logs", JSON.stringify(logs.slice(-200)));
    } catch {}
  }

  function formatTime(s: number) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  return {
    secondsSpent: seconds,
    formattedTime: formatTime(seconds),
    saveAndProgress: logTimeData,
  };
}
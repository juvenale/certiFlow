"use client";

import { useState, useCallback } from "react";
import { QuizView } from "./quiz-view";

type QuizQuestion = {
  id: string;
  domain: string;
  questionNumber: number;
  question: string;
  choices: string[];
  answer: number;
  explanation: string;
  source: string;
  scenario?: string;
};

type QuizMode = "quick" | "weak" | "errors";

interface QuizViewWrapperProps {
  effectiveQuizQuestions: QuizQuestion[];
  totalQuestions: number;
  score: number;
  answered: number;
  correct: number;
  weakestDomain: string;
  errorsCount: number;
  onQuizResult: (result: {
    questionId: string;
    domain: string;
    questionNumber: number;
    question: string;
    chosen: string;
    correctAnswer: string;
    isCorrect: boolean;
  }) => void;
  onStartQuiz: (mode: QuizMode) => void;
}

export function QuizViewWrapper({
  effectiveQuizQuestions,
  totalQuestions,
  score,
  answered,
  correct,
  weakestDomain,
  errorsCount,
  onQuizResult,
  onStartQuiz,
}: QuizViewWrapperProps) {
  const [questionIndex, setQuestionIndex] = useState(() => {
    if (typeof window === "undefined") return 0;
    return Number(localStorage.getItem("certiflow-quiz-index") || 0);
  });
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const currentQuestion = effectiveQuizQuestions[questionIndex % effectiveQuizQuestions.length];
  const currentQuestionChoices = currentQuestion.choices.slice(0, 4);
  const currentQuestionAnswer = Math.min(Math.max(currentQuestion.answer, 0), currentQuestionChoices.length - 1);

  const chooseAnswer = useCallback((index: number) => {
    if (selectedAnswer !== null) return;
    const isCorrect = index === currentQuestionAnswer;
    setSelectedAnswer(index);

    onQuizResult({
      questionId: currentQuestion.id,
      domain: currentQuestion.domain,
      questionNumber: currentQuestion.questionNumber,
      question: currentQuestion.question,
      chosen: currentQuestionChoices[index] ?? "",
      correctAnswer: currentQuestionChoices[currentQuestionAnswer] ?? "",
      isCorrect,
    });
  }, [selectedAnswer, currentQuestion, currentQuestionChoices, currentQuestionAnswer, onQuizResult]);

  const nextQuestion = useCallback(() => {
    setSelectedAnswer(null);
    const next = (questionIndex + 1) % effectiveQuizQuestions.length;
    setQuestionIndex(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("certiflow-quiz-index", String(next));
    }
  }, [questionIndex, effectiveQuizQuestions.length]);

  const startQuiz = useCallback((mode: QuizMode) => {
    setSelectedAnswer(null);
    onStartQuiz(mode);
  }, [onStartQuiz]);

  return (
    <QuizView
      score={score}
      answered={answered}
      correct={correct}
      effectiveQuizQuestions={effectiveQuizQuestions}
      totalQuestions={totalQuestions}
      questionIndex={questionIndex}
      currentQuestion={currentQuestion}
      currentQuestionChoices={currentQuestionChoices}
      currentQuestionAnswer={currentQuestionAnswer}
      selectedAnswer={selectedAnswer}
      weakestDomain={weakestDomain}
      errorsCount={errorsCount}
      startQuiz={startQuiz}
      chooseAnswer={chooseAnswer}
      nextQuestion={nextQuestion}
    />
  );
}


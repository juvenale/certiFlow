"use client";

import { memo } from "react";
import type { ViewId } from "./shared-types";
import {
  BookOpen, Brain, CalendarDays, CheckCircle2, ClipboardList,
  Command, FileQuestion, Flame, LayoutDashboard, RotateCcw,
  Search, Timer, Zap, BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DailyTasks } from "@/lib/daily-tasks";

export interface ViewHeaderStats {
  view: ViewId;
  globalAnswered?: number;
  globalCorrect?: number;
  globalScore?: number;
  dailyTasks?: DailyTasks;
  // Quiz
  quizScore?: number;
  quizAnswered?: number;
  quizCorrect?: number;
  quizPosition?: number;
  quizTotal?: number;
  quizDomain?: string;
  // Flashcards
  flashcardDeck?: string;
  flashcardCount?: number;
  // PBQ
  pbqType?: string;
  pbqScore?: number | null;
  // Exam
  examTime?: string;
  examQuestionCount?: number;
  examFlagged?: number;
  examConfidence?: { low: number; medium: number; high: number };
  // Courses
  courseTheme?: string;
  courseItemCount?: number;
  courseDomain?: string;
  // Confusions
  confusionSectionCount?: number;
  confusionItemCount?: number;
  // Ports
  portCount?: number;
  commandCount?: number;
  scenarioCount?: number;
  // Errors
  errorTotal?: number;
  errorResolved?: number;
  // Plan
  planDaysLeft?: number;
  // Search
  searchTerm?: string;
  searchResults?: number;
}

function MiniStat({ label, value, icon: Icon, accent }: { label: string; value: string | number; icon?: React.ElementType; accent?: string }) {
  return (
    <div className={cn("flex items-center gap-2 rounded-card border border-border bg-card px-3 py-2 shadow-sm", accent)}>
      {Icon && <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />}
      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground truncate">{label}</span>
      <span className="ml-auto text-sm font-black tabular-nums">{value}</span>
    </div>
  );
}

export const ViewMiniDashboard = memo(function ViewMiniDashboard({ stats }: { stats: ViewHeaderStats }) {
  const { view } = stats;

  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-2">
        <MiniStat label="Score global" value={`${stats.globalScore ?? 0}%`} icon={BarChart3}
          accent={stats.globalScore != null && stats.globalScore >= 75 ? "border-success-muted bg-success-muted" : stats.globalScore != null && stats.globalScore >= 50 ? "border-warning-muted bg-warning-muted" : "border-danger-muted bg-danger-muted"} />
        <MiniStat label="Questions faites" value={stats.globalAnswered ?? 0} icon={FileQuestion} />
        <MiniStat label="QCM aujourd'hui" value={stats.dailyTasks?.qcm ?? 0} icon={CheckCircle2} />
        <MiniStat label="Cartes aujourd'hui" value={stats.dailyTasks?.flashcards ?? 0} icon={RotateCcw} />
        <MiniStat label="Ports aujourd'hui" value={stats.dailyTasks?.ports ?? 0} icon={Command} />
        <MiniStat label="Examens faits" value={stats.dailyTasks?.exam ?? 0} icon={Timer} />

        {view === "dashboard" && (
          <>
            <MiniStat label="Correctes" value={stats.globalCorrect ?? 0} icon={CheckCircle2} />
            <MiniStat label="PBQ aujourd'hui" value={stats.dailyTasks?.pbq ?? 0} icon={Brain} />
          </>
        )}

        {view === "quiz" && (
          <>
            <MiniStat label="Score" value={`${stats.quizScore ?? 0}%`} icon={BarChart3}
              accent={stats.quizScore != null && stats.quizScore >= 75 ? "border-success-muted bg-success-muted" : stats.quizScore != null && stats.quizScore >= 50 ? "border-warning-muted bg-warning-muted" : undefined} />
            <MiniStat label="Correctes" value={`${stats.quizCorrect ?? 0}/${stats.quizAnswered ?? 0}`} icon={CheckCircle2} />
            <MiniStat label="Position" value={`${stats.quizPosition ?? 0}/${stats.quizTotal ?? 0}`} icon={FileQuestion} />
            {stats.quizDomain && stats.quizDomain !== "all" && (
              <MiniStat label="Domaine" value={stats.quizDomain} />
            )}
          </>
        )}

        {view === "flashcards" && (
          <>
            <MiniStat label="Paquet" value={stats.flashcardDeck ?? ""} icon={RotateCcw} />
            <MiniStat label="Cartes" value={stats.flashcardCount ?? 0} icon={Zap} />
          </>
        )}

        {view === "pbq" && (
          <>
            <MiniStat label="Type" value={stats.pbqType ?? "PBQ"} icon={Brain} />
            {stats.pbqScore != null && (
              <MiniStat label="Score" value={`${stats.pbqScore}/5`} icon={CheckCircle2}
                accent={stats.pbqScore >= 3 ? "border-success-muted bg-success-muted" : "border-danger-muted bg-danger-muted"} />
            )}
          </>
        )}

        {view === "exam" && (
          <>
            <MiniStat label="Temps" value={stats.examTime ?? "--:--"} icon={Timer} />
            <MiniStat label="Questions" value={stats.examQuestionCount ?? 0} icon={FileQuestion} />
            <MiniStat label="Marquees" value={stats.examFlagged ?? 0} icon={Flame} />
            {stats.examConfidence && (
              <MiniStat label="Confiance" value={`B:${stats.examConfidence.low} M:${stats.examConfidence.medium} H:${stats.examConfidence.high}`} />
            )}
          </>
        )}

        {view === "courses" && (
          <>
            {stats.courseTheme && <MiniStat label="Theme" value={stats.courseTheme} icon={BookOpen} />}
            <MiniStat label="Elements" value={stats.courseItemCount ?? 0} icon={Zap} />
            {stats.courseDomain && stats.courseDomain !== "all" && (
              <MiniStat label="Domaine" value={stats.courseDomain} />
            )}
          </>
        )}

        {view === "confusions" && (
          <>
            <MiniStat label="Sections" value={stats.confusionSectionCount ?? 0} icon={Brain} />
            <MiniStat label="Pieges" value={stats.confusionItemCount ?? 0} icon={Zap} />
          </>
        )}

        {view === "ports" && (
          <>
            <MiniStat label="Ports" value={stats.portCount ?? 0} icon={Command} />
            <MiniStat label="Commandes" value={stats.commandCount ?? 0} icon={Command} />
            <MiniStat label="Scenarios" value={stats.scenarioCount ?? 0} icon={Brain} />
          </>
        )}

        {view === "errors" && (
          <>
            <MiniStat label="Total" value={stats.errorTotal ?? 0} icon={ClipboardList} />
            <MiniStat label="Resolues" value={stats.errorResolved ?? 0} icon={CheckCircle2} />
          </>
        )}

        {view === "plan" && (
          <MiniStat label="Jours restants" value={stats.planDaysLeft ?? 0} icon={CalendarDays} />
        )}

        {view === "search" && (
          <>
            {stats.searchTerm && <MiniStat label="Recherche" value={`"${stats.searchTerm}"`} icon={Search} />}
            <MiniStat label="Resultats" value={stats.searchResults ?? 0} icon={Zap} />
          </>
        )}

        {view === "assistant" && (
          <MiniStat label="Mode" value="DeepSeek IA" icon={Brain} />
        )}

        {view === "settings" && (
          <MiniStat label="CertiFlow" value="Configuration" icon={LayoutDashboard} />
        )}
      </div>
    </div>
  );
});

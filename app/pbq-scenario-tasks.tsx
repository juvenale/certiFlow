"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, CheckCircle2, RotateCcw, Timer, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ScenarioTask, ScenarioTasksPBQ } from "@/data/pbq";
import { DnDOrderingList, DnDMatchingPool, DnDClassificationBoard } from "@/app/pbq-dnd";

function Badge({ children }: { readonly children: React.ReactNode }) {
  return (
    <span className="inline-flex min-h-8 items-center rounded-card bg-muted px-3 text-sm font-bold text-muted-foreground">
      {children}
    </span>
  );
}

// ---------- Matching / Classification ----------
function MatchingTable({
  task,
  answers,
  onAnswer,
  checked,
}: {
  task: ScenarioTask;
  answers: Record<string, string>;
  onAnswer: (key: string, value: string) => void;
  checked: boolean;
}) {
  const items = task.items ?? [];
  const pool = task.options ?? [];
  return (
    <div className="overflow-x-auto rounded-card border border-border bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-xs uppercase text-muted-foreground">
            <th className="p-3 text-left font-black">Élément</th>
            <th className="p-3 text-left font-black">Réponse</th>
            {checked && <th className="w-8 p-3" scope="col" aria-label="Résultat" />}
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => {
            const key = `${task.id}:${i}`;
            const selected = answers[key] ?? "";
            const correct = task.expectedAnswers[i];
            const ok = checked && selected === correct;
            const fail = checked && selected !== correct;
            return (
              <tr
                key={i}
                className={cn(
                  "border-b border-border/40 last:border-0",
                  ok && "bg-success/5",
                  fail && "bg-warning/5",
                )}
              >
                <td className="p-3 leading-snug">{item}</td>
                <td className="p-3">
                  <select
                    value={selected}
                    onChange={(e) => onAnswer(key, e.target.value)}
                    disabled={checked}
                    aria-label={`Réponse pour : ${item}`}
                    title={`Réponse pour : ${item}`}
                    className="w-full max-w-xs rounded-card border border-border bg-background px-2 py-1.5 text-sm"
                  >
                    <option value="">— Choisir —</option>
                    {pool.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {fail && <p className="mt-1 text-xs text-warning">✓ {correct}</p>}
                </td>
                {checked && (
                  <td className="p-3 text-center">
                    {ok ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : (
                      <XCircle className="h-4 w-4 text-warning" />
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ---------- Ordering ----------
function OrderingList({
  task,
  order,
  onReorder,
  checked,
}: {
  task: ScenarioTask;
  order: string[];
  onReorder: (items: string[]) => void;
  checked: boolean;
}) {
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= order.length) return;
    const next = [...order];
    [next[i], next[j]] = [next[j], next[i]];
    onReorder(next);
  };
  return (
    <div className="grid gap-2">
      {order.map((item, i) => {
        const correct = task.expectedAnswers[i];
        const ok = checked && item === correct;
        const fail = checked && item !== correct;
        return (
          <div
            key={item}
            className={cn(
              "flex items-center gap-3 rounded-card border border-border bg-card p-3",
              ok && "border-success/50 bg-success/5",
              fail && "border-warning/50 bg-warning/5",
            )}
          >
            <span className="w-7 shrink-0 text-center text-lg font-black text-muted-foreground">
              {i + 1}
            </span>
            <span className="flex-1 text-sm leading-snug">{item}</span>
            {!checked && (
              <div className="flex shrink-0 gap-0.5">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  title="Monter"
                  aria-label="Monter"
                  className="rounded p-1 text-muted-foreground hover:bg-muted disabled:opacity-25"
                >
                  <ArrowUp className="h-3.5 w-3.5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === order.length - 1}
                  title="Descendre"
                  aria-label="Descendre"
                  className="rounded p-1 text-muted-foreground hover:bg-muted disabled:opacity-25"
                >
                  <ArrowDown className="h-3.5 w-3.5" aria-hidden />
                </button>
              </div>
            )}
            {ok && <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />}
            {fail && (
              <div className="shrink-0 text-right">
                <XCircle className="h-4 w-4 text-warning" />
                <p className="text-xs text-muted-foreground">→ {correct}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---------- Matrix (checkboxes per platform) ----------
function MatrixGrid({
  task,
  answers,
  onAnswer,
  checked,
}: {
  task: ScenarioTask;
  answers: Record<string, string>;
  onAnswer: (key: string, value: string) => void;
  checked: boolean;
}) {
  const rows = task.items ?? [];
  const cols = task.options ?? [];
  const expected: Record<string, Set<string>> = {};
  task.expectedAnswers.forEach((ans) => {
    const idx = ans.indexOf(":");
    if (idx === -1) return;
    const feat = ans.slice(0, idx).trim();
    const platforms = ans
      .slice(idx + 1)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    expected[feat] = new Set(platforms);
  });

  return (
    <div className="overflow-x-auto rounded-card border border-border bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-xs uppercase text-muted-foreground">
            <th className="p-3 text-left font-black">Fonctionnalité</th>
            {cols.map((col) => (
              <th key={col} className="p-3 text-center font-black">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => {
            const correctCols = expected[row] ?? new Set<string>();
            return (
              <tr key={row} className="border-b border-border/40 last:border-0">
                <td className="p-3">{row}</td>
                {cols.map((col, ci) => {
                  const key = `${task.id}:${ri}:${ci}`;
                  const isChecked = answers[key] === "true";
                  const shouldBe = correctCols.has(col);
                  const ok = checked && isChecked === shouldBe;
                  const fail = checked && isChecked !== shouldBe;
                  return (
                    <td
                      key={col}
                      className={cn(
                        "p-3 text-center",
                        ok && "bg-success/10",
                        fail && "bg-warning/10",
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) =>
                          onAnswer(key, e.target.checked ? "true" : "false")
                        }
                        disabled={checked}
                        aria-label={`${row} — ${col}`}
                        title={`${row} — ${col}`}
                        className="h-4 w-4 cursor-pointer"
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {checked && (
        <p className="border-t border-border p-3 text-xs text-muted-foreground">
          Vert = bonne sélection · Rouge = correction nécessaire
        </p>
      )}
    </div>
  );
}

// ---------- Single Choice ----------
function SingleChoiceTask({
  task,
  answers,
  onAnswer,
  checked,
}: {
  task: ScenarioTask;
  answers: Record<string, string>;
  onAnswer: (key: string, value: string) => void;
  checked: boolean;
}) {
  const selected = answers[task.id] ?? "";
  const correct = task.expectedAnswers[0] ?? "";
  return (
    <div className="grid gap-2">
      {task.options?.map((opt, i) => {
        const isSelected = selected === opt;
        const isCorrect = checked && opt === correct;
        const isWrong = checked && isSelected && opt !== correct;
        const isMissed = checked && !isSelected && opt === correct;
        return (
          <label
            key={i}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-card border border-border bg-card p-3 text-sm",
              isCorrect && "border-success/50 bg-success/5",
              isWrong && "border-warning/50 bg-warning/5",
              isMissed && "border-success/30 bg-success/5",
            )}
          >
            <input
              type="radio"
              name={task.id}
              value={opt}
              checked={isSelected}
              onChange={() => onAnswer(task.id, opt)}
              disabled={checked}
              className="h-4 w-4 shrink-0"
            />
            <span className="flex-1">{opt}</span>
            {isCorrect && <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />}
            {isWrong && <XCircle className="h-4 w-4 shrink-0 text-warning" />}
          </label>
        );
      })}
    </div>
  );
}

// ---------- Multi Select ----------
function MultiSelectTask({
  task,
  answers,
  onAnswer,
  checked,
}: {
  task: ScenarioTask;
  answers: Record<string, string>;
  onAnswer: (key: string, value: string) => void;
  checked: boolean;
}) {
  const expected = new Set(task.expectedAnswers);
  return (
    <div className="grid gap-2">
      {task.options?.map((opt, i) => {
        const key = `${task.id}:${i}`;
        const isChecked = answers[key] === "true";
        const shouldBe = expected.has(opt);
        const ok = checked && isChecked && shouldBe;
        const miss = checked && !isChecked && shouldBe;
        const wrong = checked && isChecked && !shouldBe;
        return (
          <label
            key={i}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-card border border-border bg-card p-3 text-sm",
              ok && "border-success/50 bg-success/5",
              (miss || wrong) && "border-warning/50 bg-warning/5",
            )}
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => onAnswer(key, e.target.checked ? "true" : "false")}
              disabled={checked}
              aria-label={opt}
              title={opt}
              className="h-4 w-4 shrink-0 cursor-pointer"
            />
            <span className="flex-1">{opt}</span>
            {ok && <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />}
            {(miss || wrong) && <XCircle className="h-4 w-4 shrink-0 text-warning" />}
          </label>
        );
      })}
      {!checked && task.expectedAnswers.length > 0 && (
        <p className="mt-1 text-xs text-muted-foreground">
          Sélectionnez {task.expectedAnswers.length} réponse(s).
        </p>
      )}
    </div>
  );
}

// ---------- Per-task score computation ----------
function computeTaskScore(
  task: ScenarioTask,
  answers: Record<string, string>,
  ordering: Record<string, string[]>,
): { earned: number; correct: number; total: number } {
  if (task.kind === "matching" || task.kind === "classification") {
    const items = task.items ?? [];
    let correct = 0;
    items.forEach((_, i) => {
      if ((answers[`${task.id}:${i}`] ?? "") === task.expectedAnswers[i])
        correct++;
    });
    return {
      earned: Math.round((correct / Math.max(1, items.length)) * task.points),
      correct,
      total: items.length,
    };
  }
  if (task.kind === "ordering") {
    const order = ordering[task.id] ?? [];
    let correct = 0;
    order.forEach((item, i) => {
      if (item === task.expectedAnswers[i]) correct++;
    });
    return {
      earned: Math.round((correct / Math.max(1, order.length)) * task.points),
      correct,
      total: order.length,
    };
  }
  if (task.kind === "matrix") {
    const rows = task.items ?? [];
    const cols = task.options ?? [];
    const exp: Record<string, Set<string>> = {};
    task.expectedAnswers.forEach((ans) => {
      const idx = ans.indexOf(":");
      if (idx === -1) return;
      const feat = ans.slice(0, idx).trim();
      exp[feat] = new Set(
        ans
          .slice(idx + 1)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      );
    });
    let correct = 0;
    const total = rows.length * cols.length;
    rows.forEach((row, ri) => {
      const correctCols = exp[row] ?? new Set<string>();
      cols.forEach((col, ci) => {
        const key = `${task.id}:${ri}:${ci}`;
        if ((answers[key] === "true") === correctCols.has(col)) correct++;
      });
    });
    return {
      earned: Math.round((correct / Math.max(1, total)) * task.points),
      correct,
      total,
    };
  }
  if (task.kind === "single_choice") {
    const selected = answers[task.id] ?? "";
    const correct = task.expectedAnswers[0] ?? "";
    const isCorrect = selected === correct;
    return { earned: isCorrect ? task.points : 0, correct: isCorrect ? 1 : 0, total: 1 };
  }
  if (task.kind === "multi_select") {
    const pool = task.options ?? [];
    const expected = new Set(task.expectedAnswers);
    let hits = 0;
    let falsePos = 0;
    pool.forEach((opt, i) => {
      const ticked = answers[`${task.id}:${i}`] === "true";
      if (ticked && expected.has(opt)) hits++;
      if (ticked && !expected.has(opt)) falsePos++;
    });
    const total = task.expectedAnswers.length;
    const earned = Math.max(0, Math.round(((hits - falsePos) / Math.max(1, total)) * task.points));
    return { earned, correct: hits, total };
  }
  return { earned: 0, correct: 0, total: 0 };
}

// ---------- Main view ----------
export function ScenarioTasksPBQView({
  exercise,
  onReset,
}: {
  exercise: ScenarioTasksPBQ;
  onReset: () => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [ordering, setOrdering] = useState<Record<string, string[]>>(() => {
    const init: Record<string, string[]> = {};
    exercise.tasks.forEach((task) => {
      if (task.kind === "ordering") {
        const items = task.items ?? task.options ?? [];
        init[task.id] = [...items].sort(() => Math.random() - 0.5);
      }
    });
    return init;
  });
  const [checked, setChecked] = useState(false);

  const taskScores = useMemo(
    () =>
      checked
        ? exercise.tasks.map((t) => computeTaskScore(t, answers, ordering))
        : null,
    [checked, answers, ordering, exercise.tasks],
  );

  const totalScore = taskScores
    ? taskScores.reduce((sum, s) => sum + s.earned, 0)
    : 0;

  const onAnswer = (key: string, value: string) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  return (
    <section className="rounded-card border border-border bg-card p-5 shadow-sm">
      {/* Header */}
      <div className="hero-panel mb-5 rounded-card border border-border p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge>{exercise.source}</Badge>
          <Badge>{exercise.domain}</Badge>
          <Badge>
            <Timer className="mr-1 h-3 w-3" />
            {Math.floor(exercise.timeLimitSeconds / 60)}:
            {String(exercise.timeLimitSeconds % 60).padStart(2, "0")}
          </Badge>
        </div>
        <h2 className="text-2xl font-black">{exercise.title}</h2>
        <p className="mt-2 text-muted-foreground">{exercise.objective}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex min-h-10 items-center rounded-card border border-border bg-card px-4 font-bold"
          >
            <RotateCcw className="mr-2 h-4 w-4" /> Retour PBQ
          </button>
          {!checked && (
            <button
              type="button"
              onClick={() => setChecked(true)}
              className="inline-flex min-h-10 items-center rounded-card bg-primary px-4 font-bold text-primary-foreground"
            >
              Corriger
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_300px]">
        {/* Tasks */}
        <div className="grid gap-5">
          {exercise.tasks.map((task, index) => (
            <article
              key={task.id}
              className="rounded-card border border-border bg-muted p-4"
            >
              <div className="mb-3 flex flex-wrap gap-2">
                <Badge>Tâche {index + 1}</Badge>
                <Badge>{task.kind}</Badge>
                <Badge>{task.points} pts</Badge>
              </div>
              <h3 className="mb-2 text-lg font-black">{task.title}</h3>
              {task.prompt && (
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {task.prompt}
                </p>
              )}

              {task.kind === "matching" && (
                <DnDMatchingPool
                  task={task}
                  answers={answers}
                  onAnswer={onAnswer}
                  checked={checked}
                />
              )}

              {task.kind === "classification" && (
                <DnDClassificationBoard
                  task={task}
                  answers={answers}
                  onAnswer={onAnswer}
                  checked={checked}
                />
              )}

              {task.kind === "ordering" && (
                <DnDOrderingList
                  task={task}
                  order={ordering[task.id] ?? []}
                  onReorder={(items) =>
                    setOrdering((prev) => ({ ...prev, [task.id]: items }))
                  }
                  checked={checked}
                />
              )}

              {task.kind === "matrix" && (
                <MatrixGrid
                  task={task}
                  answers={answers}
                  onAnswer={onAnswer}
                  checked={checked}
                />
              )}

              {task.kind === "single_choice" && (
                <SingleChoiceTask
                  task={task}
                  answers={answers}
                  onAnswer={onAnswer}
                  checked={checked}
                />
              )}

              {task.kind === "multi_select" && (
                <MultiSelectTask
                  task={task}
                  answers={answers}
                  onAnswer={onAnswer}
                  checked={checked}
                />
              )}

              {checked && taskScores && (
                <div className="mt-4 rounded-card border border-border bg-card p-4">
                  <p className="text-xs font-black uppercase text-muted-foreground">
                    Score tâche :{" "}
                    <span className="text-foreground">
                      {taskScores[index].earned}/{task.points} pts (
                      {taskScores[index].correct}/{taskScores[index].total}{" "}
                      corrects)
                    </span>
                  </p>
                  {task.explanation && (
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-7">
                      {task.explanation}
                    </p>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Sidebar */}
        <aside className="rounded-card border border-border bg-muted p-4 xl:sticky xl:top-28 xl:self-start">
          <p className="text-xs font-black uppercase text-muted-foreground">
            Score total
          </p>
          <p className="mt-1 text-4xl font-black">
            {checked ? totalScore : "--"} / {exercise.scoring.max}
          </p>
          {checked && (
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-card">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ "--w": `${Math.round((totalScore / exercise.scoring.max) * 100)}%`, width: "var(--w)" } as React.CSSProperties}
              />
            </div>
          )}
          <p className="mt-3 text-xs text-muted-foreground">
            Score partiel calculé automatiquement par correspondance.
          </p>

          <div className="mt-5">
            <p className="text-xs font-black uppercase text-muted-foreground">
              Pièges fréquents
            </p>
            <ul className="mt-2 grid gap-2 text-xs">
              {exercise.tasks
                .flatMap((t) => t.traps)
                .slice(0, 10)
                .map((trap, i) => (
                  <li key={i} className="rounded-card bg-card p-2 leading-snug">
                    {trap}
                  </li>
                ))}
            </ul>
          </div>

          {exercise.skills.length > 0 && (
            <div className="mt-5">
              <p className="text-xs font-black uppercase text-muted-foreground">
                Compétences testées
              </p>
              <ul className="mt-2 grid gap-1 text-xs text-muted-foreground">
                {exercise.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}

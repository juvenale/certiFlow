export type DailyTaskType = "qcm" | "pbq" | "flashcards" | "ports" | "exam";

export interface DailyTasks {
  qcm: number;
  pbq: number;
  flashcards: number;
  ports: number;
  exam: number;
}

function todayKey() {
  return `certiflow-tasks-${new Date().toISOString().split("T")[0]}`;
}

function emptyTasks(): DailyTasks {
  return { qcm: 0, pbq: 0, flashcards: 0, ports: 0, exam: 0 };
}

export function getDailyTasks(): DailyTasks {
  if (typeof window === "undefined") return emptyTasks();
  try {
    const raw = localStorage.getItem(todayKey());
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<DailyTasks>;
      return { ...emptyTasks(), ...parsed };
    }
  } catch {}
  return emptyTasks();
}

export function incrementDailyTask(type: DailyTaskType): void {
  if (typeof window === "undefined") return;
  try {
    const key = todayKey();
    const current = getDailyTasks();
    current[type] = (current[type] ?? 0) + 1;
    localStorage.setItem(key, JSON.stringify(current));
  } catch {}
}

export function setDailyTaskCount(type: DailyTaskType, count: number): void {
  if (typeof window === "undefined") return;
  try {
    const key = todayKey();
    const current = getDailyTasks();
    current[type] = Math.max(current[type] ?? 0, count);
    localStorage.setItem(key, JSON.stringify(current));
  } catch {}
}

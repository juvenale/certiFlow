export interface PBQScore {
  pbqId: string;
  title: string;
  date: string;
  score: number;
  maxScore: number;
  completed: boolean;
}

const KEY = "certiflow-pbq-scores";

export function getPBQScores(): PBQScore[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
  catch { return []; }
}

export function savePBQScore(score: PBQScore): void {
  if (typeof window === "undefined") return;
  const scores = getPBQScores();
  const idx = scores.findIndex((s) => s.pbqId === score.pbqId);
  if (idx >= 0) scores[idx] = score;
  else scores.push(score);
  localStorage.setItem(KEY, JSON.stringify(scores));
}

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


export interface PBQStats {
  globalScore: number;
  totalCompleted: number;
  breakdown: {
    firewall: number;
    siem: number;
    investigation: number;
    topology: number;
    rackVlan: number;
    scenario: number;
  };
}

export function getPBQStats(): PBQStats {
  const scores = getPBQScores();
  const completed = scores.filter((s) => s.completed);

  // Group by exercise type based on ID prefix
  const byType: Record<string, { total: number; count: number }> = {};
  for (const s of completed) {
    let type = "other";
    if (s.pbqId.includes("firewall")) type = "firewall";
    else if (s.pbqId.includes("siem")) type = "siem";
    else if (s.pbqId.includes("investigation")) type = "investigation";
    else if (s.pbqId.includes("topology")) type = "topology";
    else if (s.pbqId.includes("rack") || s.pbqId.includes("vlan")) type = "rackVlan";
    else if (s.pbqId.includes("scenario")) type = "scenario";
    if (!byType[type]) byType[type] = { total: 0, count: 0 };
    byType[type].total += s.maxScore > 0 ? Math.round((s.score / s.maxScore) * 100) : 100;
    byType[type].count++;
  }

  const avg = (type: string) => byType[type] ? Math.round(byType[type].total / byType[type].count) : 0;

  const globalScore = completed.length > 0
    ? Math.round(completed.reduce((sum, s) => sum + (s.maxScore > 0 ? (s.score / s.maxScore) * 100 : 100), 0) / completed.length)
    : 0;

  return {
    globalScore,
    totalCompleted: completed.length,
    breakdown: {
      firewall: avg("firewall"),
      siem: avg("siem"),
      investigation: avg("investigation"),
      topology: avg("topology"),
      rackVlan: avg("rackVlan"),
      scenario: avg("scenario"),
    },
  };
}

export function savePBQScore(score: PBQScore): void {
  if (typeof window === "undefined") return;
  const scores = getPBQScores();
  const idx = scores.findIndex((s) => s.pbqId === score.pbqId);
  if (idx >= 0) scores[idx] = score;
  else scores.push(score);
  localStorage.setItem(KEY, JSON.stringify(scores));
}

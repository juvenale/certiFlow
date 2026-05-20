export interface DomainStats {
  id: string; name: string; weight: number; totalQuestions: number;
}

export const domainStats: DomainStats[] = [
  { id: "d1", name: "General Security Concepts", weight: 12, totalQuestions: 150 },
  { id: "d2", name: "Threats, Vulnerabilities, and Mitigations", weight: 22, totalQuestions: 187 },
  { id: "d3", name: "Security Architecture", weight: 18, totalQuestions: 226 },
  { id: "d4", name: "Security Operations", weight: 28, totalQuestions: 215 },
  { id: "d5", name: "Security Program Management and Oversight", weight: 20, totalQuestions: 227 },
];
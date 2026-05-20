export type PBQType = 'firewall_rules' | 'topology' | 'rack_vlan' | 'siem' | 'investigation' | 'timed_config' | 'log_generator' | 'scenario_tasks';

export interface PBQScoringRule { condition: string; points: number; }

export interface PBQBase {
  id: string; domain: string; type: PBQType; title: string;
  difficulty: 'foundation' | 'intermediate' | 'advanced' | 'simulation';
  timeLimitSeconds: number; role: string; scenario: string; objective: string;
  scoring: { max: number; rules: PBQScoringRule[]; penalties?: PBQScoringRule[]; };
}

export interface FirewallAsset { name: string; ip: string; }
export interface FirewallPort { port: number; protocol: string; service: string; }
export interface FirewallExpectedRule {
  source: string; destination: string; protocol: string; port: number | 'ANY'; action: 'Allow' | 'Deny';
}
export interface FirewallPBQ extends PBQBase {
  type: 'firewall_rules'; requirements: string[]; assets: FirewallAsset[];
  ports: FirewallPort[]; expectedRules: FirewallExpectedRule[]; pieges: string[];
}

export interface TopologyItem { id: string; label: string; correctZone: string; }
export interface TopologyZone { id: string; label: string; description: string; }
export interface TopologyPBQ extends PBQBase {
  type: 'topology'; zones: TopologyZone[]; items: TopologyItem[]; constraints: string[];
}

export interface RackVLANItem { id: string; label: string; correctRack: string; correctVlan: string; }
export interface RackOption { id: string; label: string; description: string; }
export interface VlanOption { id: string; label: string; }
export interface RackVLANPBQ extends PBQBase {
  type: 'rack_vlan'; racks: RackOption[]; vlans: VlanOption[]; items: RackVLANItem[]; constraints: string[];
}

export interface SIEMLogEntry { time: string; source: string; user: string; event: string; destination: string; }
export interface SIEMQuestion { id: string; text: string; choices: string[]; correctAnswer: number; explanation: string; }
export interface SIEMPBQ extends PBQBase { type: 'siem'; logs: SIEMLogEntry[]; questions: SIEMQuestion[]; }

export interface InvestigationLogEntry { time: string; source: string; event: string; }
export interface InvestigationTask {
  id: string; label: string; question: string; choices: string[]; correctAnswer: number; explanation: string;
}
export interface InvestigationPBQ extends PBQBase {
  type: 'investigation'; logs: InvestigationLogEntry[]; tasks: InvestigationTask[];
}

export interface TimedConfigStep { id: string; condition: string; points: number; explanation: string; }
export interface TimedConfigPBQ extends PBQBase {
  type: 'timed_config'; prompt: string; requirements: string[]; steps: TimedConfigStep[];
}

export interface LogGeneratorPBQ extends PBQBase {
  type: 'log_generator';
  logs: string[];
  attackChoices: string[];
  correctAttack: number;
  iocs: string[];
  correctIocs: string[];
  mitigationChoices: string[];
  correctMitigation: number;
}

export interface ScenarioTask {
  id: string;
  kind: 'matching' | 'classification' | 'ordering' | 'single_choice' | 'multi_select' | 'matrix' | 'table_completion' | 'self_check';
  title: string;
  prompt: string;
  items?: string[];
  options?: string[];
  expectedAnswers: string[];
  explanation: string;
  traps: string[];
  points: number;
}

export interface ScenarioTasksPBQ extends PBQBase {
  type: 'scenario_tasks';
  source: string;
  skills: string[];
  tasks: ScenarioTask[];
}

export type PBQExercise = FirewallPBQ | TopologyPBQ | RackVLANPBQ | SIEMPBQ | InvestigationPBQ | TimedConfigPBQ | LogGeneratorPBQ | ScenarioTasksPBQ;

export type RiskLevel = 'critical' | 'high' | 'medium' | 'low' | 'info';

export type TransactionType = 'payment' | 'contract' | 'approval' | 'amendment' | 'advance' | 'milestone';

export type FeedbackAction = 'legitimate' | 'monitor' | 'investigate';

export interface Transaction {
  id: string;
  timestamp: Date;
  type: TransactionType;
  vendorId: string;
  vendorName: string;
  amount: number;
  department: string;
  approver: string;
  description: string;
  contractId?: string;
  riskScore: number;
  riskLevel: RiskLevel;
  flags: RiskFlag[];
  status: 'pending' | 'processed' | 'flagged' | 'cleared';
}

export interface RiskFlag {
  id: string;
  type: string;
  severity: RiskLevel;
  message: string;
  explanation: string;
  contextChecks: ContextCheck[];
  firstSeen: Date;
  occurrences: number;
  isRecurring: boolean;
}

export interface ContextCheck {
  name: string;
  passed: boolean;
  explanation: string;
}

export interface Alert {
  id: string;
  timestamp: Date;
  severity: RiskLevel;
  title: string;
  description: string;
  whyNow: string;
  entityType: 'vendor' | 'department' | 'approver' | 'contract';
  entityId: string;
  entityName: string;
  relatedTransactions: string[];
  exposure: number;
  ageInDays: number;
  status: 'new' | 'acknowledged' | 'investigating' | 'resolved';
  feedback?: FeedbackAction;
  auditorNotes?: string;
}

export interface Vendor {
  id: string;
  name: string;
  registrationDate: Date;
  category: string;
  region: string;
  totalTransactions: number;
  totalValue: number;
  riskScore: number;
  riskTrend: 'increasing' | 'stable' | 'decreasing';
  flags: RiskFlag[];
  relatedVendors: string[];
  departments: string[];
  lastActivity: Date;
  status: 'active' | 'monitoring' | 'investigating' | 'blocked';
}

export interface RiskMetrics {
  totalExposure: number;
  activeAlerts: number;
  criticalAlerts: number;
  vendorsUnderWatch: number;
  transactionsToday: number;
  avgRiskScore: number;
  riskTrend: number; // percentage change
}

export interface Investigation {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'pending-review' | 'closed';
  assignee?: string;
  priority: RiskLevel;
  entities: {
    vendors: string[];
    departments: string[];
    contracts: string[];
    transactions: string[];
  };
  timeline: TimelineEvent[];
  findings: string[];
  exposure: number;
  checklist: ChecklistItem[];
  caseSummary?: string;
}

export interface TimelineEvent {
  id: string;
  timestamp: Date;
  type: 'transaction' | 'flag' | 'feedback' | 'note' | 'status-change';
  title: string;
  description: string;
  metadata?: Record<string, any>;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  suggestedBy: 'system' | 'auditor';
}

export interface WatchlistItem {
  id: string;
  entityType: 'vendor' | 'department' | 'approver' | 'contract';
  entityId: string;
  entityName: string;
  addedAt: Date;
  addedBy: 'system' | 'auditor';
  reason: string;
  triggerConditions?: string[];
}

export interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  type: 'clean' | 'fraud' | 'edge-case';
  transactions: Partial<Transaction>[];
}

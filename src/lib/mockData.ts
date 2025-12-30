import { Transaction, Alert, Vendor, RiskMetrics, Investigation, WatchlistItem, SimulationScenario, RiskLevel } from '@/types/audit';

const vendors: Vendor[] = [
  {
    id: 'V001',
    name: 'Bharat Infrastructure Ltd',
    registrationDate: new Date('2019-03-15'),
    category: 'Construction',
    region: 'North',
    totalTransactions: 245,
    totalValue: 125000000,
    riskScore: 72,
    riskTrend: 'increasing',
    flags: [
      {
        id: 'F001',
        type: 'velocity_spike',
        severity: 'high',
        message: 'Unusual transaction velocity detected',
        explanation: 'Transaction frequency increased 340% in last 30 days compared to historical average',
        contextChecks: [
          { name: 'Year-end rush period', passed: false, explanation: 'Current month is July, not fiscal year-end' },
          { name: 'Active milestone contracts', passed: true, explanation: '2 milestone-based contracts currently active' },
        ],
        firstSeen: new Date('2024-06-15'),
        occurrences: 8,
        isRecurring: true,
      }
    ],
    relatedVendors: ['V008', 'V012'],
    departments: ['PWD', 'Housing', 'Urban Development'],
    lastActivity: new Date(),
    status: 'monitoring',
  },
  {
    id: 'V002',
    name: 'Sunrise IT Solutions',
    registrationDate: new Date('2021-08-22'),
    category: 'IT Services',
    region: 'West',
    totalTransactions: 89,
    totalValue: 45000000,
    riskScore: 45,
    riskTrend: 'stable',
    flags: [],
    relatedVendors: [],
    departments: ['IT', 'Finance'],
    lastActivity: new Date(),
    status: 'active',
  },
  {
    id: 'V003',
    name: 'Greenfield Constructions',
    registrationDate: new Date('2023-11-01'),
    category: 'Construction',
    region: 'South',
    totalTransactions: 12,
    totalValue: 28000000,
    riskScore: 85,
    riskTrend: 'increasing',
    flags: [
      {
        id: 'F002',
        type: 'new_vendor_large_contracts',
        severity: 'critical',
        message: 'New vendor with disproportionate contract value',
        explanation: 'Vendor registered 8 months ago but already awarded ₹28 Cr in contracts',
        contextChecks: [
          { name: 'Emergency procurement', passed: false, explanation: 'No emergency declarations found' },
          { name: 'Specialized capability', passed: false, explanation: 'Standard construction work, multiple alternatives available' },
        ],
        firstSeen: new Date('2024-05-20'),
        occurrences: 4,
        isRecurring: true,
      }
    ],
    relatedVendors: ['V001'],
    departments: ['PWD'],
    lastActivity: new Date(),
    status: 'investigating',
  },
];

const generateTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  const types: Transaction['type'][] = ['payment', 'contract', 'approval', 'amendment', 'advance', 'milestone'];
  const departments = ['PWD', 'Housing', 'IT', 'Finance', 'Health', 'Education', 'Urban Development'];
  const approvers = ['AO-North-1', 'AO-West-2', 'AO-South-1', 'DDO-Finance', 'CE-PWD'];

  for (let i = 0; i < 50; i++) {
    const vendor = vendors[Math.floor(Math.random() * vendors.length)];
    const riskScore = Math.floor(Math.random() * 100);
    let riskLevel: RiskLevel = 'low';
    if (riskScore >= 80) riskLevel = 'critical';
    else if (riskScore >= 60) riskLevel = 'high';
    else if (riskScore >= 40) riskLevel = 'medium';

    transactions.push({
      id: `TXN${String(i + 1).padStart(6, '0')}`,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      type: types[Math.floor(Math.random() * types.length)],
      vendorId: vendor.id,
      vendorName: vendor.name,
      amount: Math.floor(Math.random() * 10000000) + 100000,
      department: departments[Math.floor(Math.random() * departments.length)],
      approver: approvers[Math.floor(Math.random() * approvers.length)],
      description: `${types[Math.floor(Math.random() * types.length)]} for project work`,
      riskScore,
      riskLevel,
      flags: riskScore > 60 ? vendor.flags : [],
      status: riskScore > 70 ? 'flagged' : 'processed',
    });
  }

  return transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

const generateAlerts = (): Alert[] => [
  {
    id: 'ALT001',
    timestamp: new Date(),
    severity: 'critical',
    title: 'Repeated split payments detected',
    description: 'Multiple payments just below ₹5L threshold to same vendor within 48 hours',
    whyNow: 'Pattern detected for 3rd consecutive week - escalation warranted',
    entityType: 'vendor',
    entityId: 'V003',
    entityName: 'Greenfield Constructions',
    relatedTransactions: ['TXN000045', 'TXN000046', 'TXN000047'],
    exposure: 14500000,
    ageInDays: 21,
    status: 'new',
  },
  {
    id: 'ALT002',
    timestamp: new Date(Date.now() - 3600000),
    severity: 'high',
    title: 'Unusual approval chain bypass',
    description: 'Contract amendment approved without standard departmental review',
    whyNow: 'Same pattern observed in 2 other departments this month',
    entityType: 'approver',
    entityId: 'AO-North-1',
    entityName: 'AO-North-1',
    relatedTransactions: ['TXN000032'],
    exposure: 8200000,
    ageInDays: 5,
    status: 'acknowledged',
  },
  {
    id: 'ALT003',
    timestamp: new Date(Date.now() - 7200000),
    severity: 'medium',
    title: 'Vendor relationship cluster identified',
    description: 'Three vendors with common directors receiving contracts from same department',
    whyNow: 'New connection discovered after recent company registration update',
    entityType: 'vendor',
    entityId: 'V001',
    entityName: 'Bharat Infrastructure Ltd',
    relatedTransactions: ['TXN000015', 'TXN000022', 'TXN000028'],
    exposure: 42000000,
    ageInDays: 45,
    status: 'investigating',
  },
  {
    id: 'ALT004',
    timestamp: new Date(Date.now() - 14400000),
    severity: 'low',
    title: 'Advance payment ratio elevated',
    description: 'Department advance payments 15% above quarterly average',
    whyNow: 'Context: Monsoon preparation activities - may be legitimate',
    entityType: 'department',
    entityId: 'D001',
    entityName: 'PWD',
    relatedTransactions: ['TXN000008', 'TXN000012'],
    exposure: 5500000,
    ageInDays: 3,
    status: 'new',
  },
];

const riskMetrics: RiskMetrics = {
  totalExposure: 285000000,
  activeAlerts: 12,
  criticalAlerts: 3,
  vendorsUnderWatch: 8,
  transactionsToday: 47,
  avgRiskScore: 42,
  riskTrend: 8.5,
};

const investigations: Investigation[] = [
  {
    id: 'INV001',
    createdAt: new Date('2024-06-01'),
    updatedAt: new Date(),
    title: 'Vendor Cartel Investigation - PWD Contracts',
    description: 'Investigation into potential bid-rigging among construction vendors in PWD department',
    status: 'in-progress',
    assignee: 'Auditor-A1',
    priority: 'critical',
    entities: {
      vendors: ['V001', 'V003', 'V008'],
      departments: ['PWD'],
      contracts: ['C001', 'C002', 'C003'],
      transactions: ['TXN000001', 'TXN000015', 'TXN000022'],
    },
    timeline: [
      {
        id: 'TL001',
        timestamp: new Date('2024-06-01'),
        type: 'status-change',
        title: 'Investigation opened',
        description: 'Initial review triggered by velocity anomaly detection',
      },
      {
        id: 'TL002',
        timestamp: new Date('2024-06-05'),
        type: 'flag',
        title: 'Related vendor connection discovered',
        description: 'Common director found between V001 and V003',
      },
    ],
    findings: [
      'Common director found across 3 vendors',
      'Sequential bid patterns observed in 5 contracts',
    ],
    exposure: 75000000,
    checklist: [
      { id: 'CK001', text: 'Review vendor registration documents', completed: true, suggestedBy: 'system' },
      { id: 'CK002', text: 'Cross-reference director information with MCA database', completed: false, suggestedBy: 'system' },
      { id: 'CK003', text: 'Analyze bid price patterns across related contracts', completed: false, suggestedBy: 'system' },
      { id: 'CK004', text: 'Interview department procurement officer', completed: false, suggestedBy: 'auditor' },
    ],
  },
];

const watchlist: WatchlistItem[] = [
  {
    id: 'WL001',
    entityType: 'vendor',
    entityId: 'V003',
    entityName: 'Greenfield Constructions',
    addedAt: new Date('2024-05-20'),
    addedBy: 'system',
    reason: 'New vendor with disproportionate contract awards',
    triggerConditions: ['New contract > ₹1 Cr', 'Payment velocity change > 50%'],
  },
  {
    id: 'WL002',
    entityType: 'approver',
    entityId: 'AO-North-1',
    entityName: 'AO-North-1',
    addedAt: new Date('2024-06-10'),
    addedBy: 'auditor',
    reason: 'Multiple approval chain bypasses observed',
  },
];

const simulationScenarios: SimulationScenario[] = [
  {
    id: 'SIM001',
    name: 'Clean Operations',
    description: 'Normal transaction patterns with proper approvals and documentation',
    type: 'clean',
    transactions: [],
  },
  {
    id: 'SIM002',
    name: 'Split Payment Evasion',
    description: 'Multiple payments just below threshold to circumvent approval limits',
    type: 'fraud',
    transactions: [],
  },
  {
    id: 'SIM003',
    name: 'Emergency Procurement',
    description: 'Legitimate fast-track procurement during declared emergency',
    type: 'edge-case',
    transactions: [],
  },
];

export const mockData = {
  vendors,
  transactions: generateTransactions(),
  alerts: generateAlerts(),
  riskMetrics,
  investigations,
  watchlist,
  simulationScenarios,
};

export const formatCurrency = (amount: number): string => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const formatRelativeTime = (date: Date): string => {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

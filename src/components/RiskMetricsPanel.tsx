import { RiskMetrics } from '@/types/audit';
import { formatCurrency } from '@/lib/mockData';
import { TrendingUp, TrendingDown, AlertTriangle, Eye, Activity, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RiskMetricsPanelProps {
  metrics: RiskMetrics;
}

export function RiskMetricsPanel({ metrics }: RiskMetricsPanelProps) {
  const metricCards = [
    {
      label: 'Total Exposure',
      value: formatCurrency(metrics.totalExposure),
      icon: AlertTriangle,
      trend: metrics.riskTrend,
      trendUp: true,
      color: 'text-risk-critical',
      bgColor: 'bg-risk-critical/10',
    },
    {
      label: 'Active Alerts',
      value: metrics.activeAlerts.toString(),
      subValue: `${metrics.criticalAlerts} critical`,
      icon: Activity,
      color: 'text-risk-high',
      bgColor: 'bg-risk-high/10',
    },
    {
      label: 'Vendors Watched',
      value: metrics.vendorsUnderWatch.toString(),
      icon: Eye,
      color: 'text-status-monitoring',
      bgColor: 'bg-status-monitoring/10',
    },
    {
      label: 'Transactions Today',
      value: metrics.transactionsToday.toString(),
      icon: Activity,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Avg Risk Score',
      value: metrics.avgRiskScore.toString(),
      icon: Users,
      color: 'text-risk-medium',
      bgColor: 'bg-risk-medium/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
      {metricCards.map((metric, index) => (
        <div
          key={metric.label}
          className={cn(
            "relative overflow-hidden rounded-lg border border-border/50 p-3 sm:p-4 card-glow",
            "bg-card/50 backdrop-blur-sm",
            "animate-fade-in"
          )}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex items-start justify-between">
            <div className={cn("p-2 rounded-md", metric.bgColor)}>
              <metric.icon className={cn("h-4 w-4", metric.color)} />
            </div>
            {metric.trend !== undefined && (
              <div className={cn(
                "flex items-center gap-1 text-xs font-mono",
                metric.trendUp ? "text-risk-critical" : "text-status-active"
              )}>
                {metric.trendUp ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {Math.abs(metric.trend)}%
              </div>
            )}
          </div>
          
          <div className="mt-3">
            <p className="metric-value">{metric.value}</p>
            <p className="metric-label mt-1">{metric.label}</p>
            {metric.subValue && (
              <p className="text-xs text-muted-foreground mt-1 font-mono">
                {metric.subValue}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

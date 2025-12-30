import { Alert } from '@/types/audit';
import { formatCurrency, formatRelativeTime } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  ChevronRight,
  CheckCircle,
  Eye,
  Search,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface AlertFeedProps {
  alerts: Alert[];
  onSelectAlert: (alert: Alert) => void;
  onFeedback: (alertId: string, action: 'legitimate' | 'monitor' | 'investigate') => void;
}

export function AlertFeed({ alerts, onSelectAlert, onFeedback }: AlertFeedProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getSeverityBadge = (severity: Alert['severity']) => {
    const variants: Record<Alert['severity'], 'critical' | 'high' | 'medium' | 'low' | 'info'> = {
      critical: 'critical',
      high: 'high',
      medium: 'medium',
      low: 'low',
      info: 'info',
    };
    return variants[severity];
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-status-flagged animate-pulse" />
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-status-flagged animate-ping" />
          </div>
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Live Alerts
          </h2>
        </div>
        <Badge variant="secondary" className="font-mono">
          {alerts.length} active
        </Badge>
      </div>

      <div className="space-y-2 max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] overflow-y-auto pr-2">
        {alerts.map((alert, index) => (
          <div
            key={alert.id}
            className={cn(
              "group relative rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm",
              "transition-all duration-200 hover:border-primary/30 hover:bg-card",
              "animate-slide-in cursor-pointer",
              alert.severity === 'critical' && "border-l-2 border-l-risk-critical",
              alert.severity === 'high' && "border-l-2 border-l-risk-high",
              alert.severity === 'medium' && "border-l-2 border-l-risk-medium"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => setExpandedId(expandedId === alert.id ? null : alert.id)}
          >
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={getSeverityBadge(alert.severity)}>
                      {alert.severity}
                    </Badge>
                    {alert.ageInDays > 14 && (
                      <Badge variant="outline" className="text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {alert.ageInDays}d old
                      </Badge>
                    )}
                    {alert.status === 'new' && (
                      <Badge variant="info">
                        <Zap className="h-3 w-3 mr-1" />
                        NEW
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="mt-2 font-medium text-foreground group-hover:text-primary transition-colors">
                    {alert.title}
                  </h3>
                  
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {alert.description}
                  </p>

                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1 font-mono">
                      <DollarSign className="h-3 w-3" />
                      {formatCurrency(alert.exposure)}
                    </span>
                    <span>{alert.entityName}</span>
                    <span>{formatRelativeTime(alert.timestamp)}</span>
                  </div>
                </div>

                <ChevronRight className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform",
                  expandedId === alert.id && "rotate-90"
                )} />
              </div>

              {expandedId === alert.id && (
                <div className="mt-4 pt-4 border-t border-border/50 animate-fade-in">
                  <div className="mb-3 p-3 rounded-md bg-muted/30 border border-border/30">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                      Why Now
                    </p>
                    <p className="text-sm text-foreground">{alert.whyNow}</p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-muted-foreground mr-2">Actions:</span>
                    <Button
                      variant="legitimate"
                      size="xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        onFeedback(alert.id, 'legitimate');
                      }}
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Legitimate
                    </Button>
                    <Button
                      variant="monitor"
                      size="xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        onFeedback(alert.id, 'monitor');
                      }}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Monitor
                    </Button>
                    <Button
                      variant="investigate"
                      size="xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        onFeedback(alert.id, 'investigate');
                      }}
                    >
                      <Search className="h-3 w-3 mr-1" />
                      Investigate
                    </Button>
                    <Button
                      variant="ghost"
                      size="xs"
                      className="ml-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectAlert(alert);
                      }}
                    >
                      View Details
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

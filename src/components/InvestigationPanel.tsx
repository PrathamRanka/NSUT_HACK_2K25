import { Investigation, Alert, Vendor } from '@/types/audit';
import { formatCurrency } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { 
  X, 
  FileText,
  Clock,
  Users,
  DollarSign,
  CheckCircle2,
  Circle,
  Plus,
  Download,
  Share2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface InvestigationPanelProps {
  investigation?: Investigation;
  alert?: Alert;
  vendor?: Vendor;
  onClose: () => void;
}

export function InvestigationPanel({ investigation, alert, vendor, onClose }: InvestigationPanelProps) {
  const [notes, setNotes] = useState('');
  const [checklist, setChecklist] = useState(investigation?.checklist || []);

  const toggleChecklist = (id: string) => {
    setChecklist(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  if (!investigation && !alert && !vendor) return null;

  const title = investigation?.title || alert?.title || vendor?.name || 'Investigation';
  const exposure = investigation?.exposure || alert?.exposure || vendor?.totalValue || 0;

  return (
    <div className="fixed inset-0 sm:inset-y-0 sm:right-0 sm:left-auto w-full sm:max-w-lg bg-background border-l border-border shadow-2xl z-50 animate-slide-in">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-border bg-card/50">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {investigation && (
                  <Badge variant={investigation.priority as any}>
                    {investigation.priority}
                  </Badge>
                )}
                {alert && (
                  <Badge variant={alert.severity as any}>
                    {alert.severity}
                  </Badge>
                )}
                {investigation?.status && (
                  <Badge variant="secondary">{investigation.status}</Badge>
                )}
              </div>
              <h2 className="text-lg font-semibold">{title}</h2>
              {(investigation?.description || alert?.description) && (
                <p className="text-sm text-muted-foreground mt-1">
                  {investigation?.description || alert?.description}
                </p>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span className="font-mono font-medium text-foreground">
                {formatCurrency(exposure)}
              </span>
              <span>exposure</span>
            </div>
            {investigation?.assignee && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{investigation.assignee}</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Why Now / Context */}
          {alert?.whyNow && (
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-xs uppercase tracking-wider text-primary mb-1 font-medium">
                Why This Matters Now
              </p>
              <p className="text-sm">{alert.whyNow}</p>
            </div>
          )}

          {/* Timeline */}
          {investigation?.timeline && investigation.timeline.length > 0 && (
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Timeline
              </h3>
              <div className="space-y-3 relative">
                <div className="timeline-connector" />
                {investigation.timeline.map((event, index) => (
                  <div key={event.id} className="relative pl-8 pb-3">
                    <div className={cn(
                      "absolute left-3 top-1 w-2 h-2 rounded-full",
                      event.type === 'flag' && "bg-risk-high",
                      event.type === 'status-change' && "bg-primary",
                      event.type === 'note' && "bg-muted-foreground"
                    )} />
                    <div className="text-xs text-muted-foreground font-mono mb-1">
                      {event.timestamp.toLocaleDateString()}
                    </div>
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Findings */}
          {investigation?.findings && investigation.findings.length > 0 && (
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Key Findings
              </h3>
              <ul className="space-y-2">
                {investigation.findings.map((finding, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Circle className="h-1.5 w-1.5 mt-2 fill-primary text-primary" />
                    {finding}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Smart Checklist */}
          {checklist.length > 0 && (
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Investigation Checklist
              </h3>
              <div className="space-y-2">
                {checklist.map(item => (
                  <div 
                    key={item.id}
                    className={cn(
                      "flex items-start gap-3 p-2 rounded-md transition-colors",
                      item.completed ? "bg-status-active/10" : "bg-muted/20"
                    )}
                  >
                    <Checkbox 
                      checked={item.completed}
                      onCheckedChange={() => toggleChecklist(item.id)}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <p className={cn(
                        "text-sm",
                        item.completed && "line-through text-muted-foreground"
                      )}>
                        {item.text}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Suggested by {item.suggestedBy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="mt-2 w-full">
                <Plus className="h-3 w-3 mr-1" />
                Add checklist item
              </Button>
            </div>
          )}

          {/* Auditor Notes */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-3">
              Auditor Notes
            </h3>
            <Textarea
              placeholder="Add notes about this investigation..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px] bg-muted/20 border-border/50"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-border bg-card/50">
          <div className="flex items-center gap-2">
            <Button variant="cockpit" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Generate Case Summary
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { WatchlistItem } from '@/types/audit';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  Building2, 
  User,
  FileText,
  Users,
  X,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WatchlistPanelProps {
  items: WatchlistItem[];
  onRemove: (id: string) => void;
  onViewEntity: (item: WatchlistItem) => void;
}

const entityIcons = {
  vendor: Building2,
  department: Users,
  approver: User,
  contract: FileText,
};

export function WatchlistPanel({ items, onRemove, onViewEntity }: WatchlistPanelProps) {
  return (
    <div className="rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Watchlist
            </h2>
          </div>
          <Badge variant="secondary" className="font-mono">
            {items.length} watched
          </Badge>
        </div>
      </div>

      <div className="divide-y divide-border/30">
        {items.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No items in watchlist</p>
            <p className="text-xs mt-1">Add entities to monitor their activity</p>
          </div>
        ) : (
          items.map(item => {
            const Icon = entityIcons[item.entityType];
            return (
              <div 
                key={item.id}
                className="p-3 hover:bg-muted/20 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded bg-muted/30">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm truncate">{item.entityName}</p>
                      <Badge variant="secondary" className="text-[10px]">
                        {item.entityType}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{item.reason}</p>
                    
                    {item.triggerConditions && item.triggerConditions.length > 0 && (
                      <div className="flex items-center gap-1 mt-2">
                        <Bell className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {item.triggerConditions.length} trigger{item.triggerConditions.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-muted-foreground">
                        Added {item.addedAt.toLocaleDateString()} by {item.addedBy}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={() => onViewEntity(item)}
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      onClick={() => onRemove(item.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

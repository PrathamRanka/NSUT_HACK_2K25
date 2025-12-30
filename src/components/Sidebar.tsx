import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard,
  AlertTriangle,
  Building2,
  FileSearch,
  Eye,
  BarChart3,
  Settings,
  Beaker,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

type View = 'dashboard' | 'alerts' | 'vendors' | 'investigations' | 'watchlist' | 'analytics' | 'simulation';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
  { id: 'vendors', label: 'Vendors', icon: Building2 },
  { id: 'investigations', label: 'Investigations', icon: FileSearch },
  { id: 'watchlist', label: 'Watchlist', icon: Eye },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
] as const;

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn(
      "h-full border-r border-border/50 bg-sidebar transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-56"
    )}>
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map(item => {
          const isActive = currentView === item.id;
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 h-10",
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                !isActive && "text-sidebar-foreground hover:bg-sidebar-accent/50",
                collapsed && "justify-center px-0"
              )}
              onClick={() => onViewChange(item.id as View)}
            >
              <item.icon className={cn("h-4 w-4 shrink-0", isActive && "text-primary")} />
              {!collapsed && (
                <span className="truncate">{item.label}</span>
              )}
            </Button>
          );
        })}

        <div className="pt-4 mt-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 h-10",
              currentView === 'simulation' && "bg-sidebar-accent text-sidebar-accent-foreground",
              currentView !== 'simulation' && "text-sidebar-foreground hover:bg-sidebar-accent/50",
              collapsed && "justify-center px-0"
            )}
            onClick={() => onViewChange('simulation')}
          >
            <Beaker className={cn("h-4 w-4 shrink-0", currentView === 'simulation' && "text-primary")} />
            {!collapsed && <span>Simulation</span>}
          </Button>
        </div>
      </nav>

      <div className="p-2 border-t border-sidebar-border">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "w-full justify-center text-sidebar-foreground hover:bg-sidebar-accent/50"
          )}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-2" />
              <span className="text-xs">Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}

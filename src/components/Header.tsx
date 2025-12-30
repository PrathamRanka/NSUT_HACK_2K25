import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Bell,
  Settings,
  Search,
  User,
  Activity,
  Menu
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from '@/lib/utils';
import { useState } from 'react';

type View = 'dashboard' | 'alerts' | 'vendors' | 'investigations' | 'watchlist' | 'analytics' | 'simulation';

interface HeaderProps {
  alertCount: number;
  criticalCount: number;
  currentView?: View;
  onViewChange?: (view: View) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Overview' },
  { id: 'alerts', label: 'Alerts' },
  { id: 'vendors', label: 'Vendors' },
  { id: 'investigations', label: 'Investigations' },
  { id: 'watchlist', label: 'Watchlist' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'simulation', label: 'Simulation' },
] as const;

export function Header({ alertCount, criticalCount, currentView, onViewChange }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (view: View) => {
    onViewChange?.(view);
    setIsOpen(false);
  };

  return (
    <header className="h-14 border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-40">
      <div className="h-full px-3 sm:px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="shrink-0">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-primary/10">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-sm font-bold tracking-tight">
                      <span className="gradient-text">VIGIL</span>
                      <span className="text-muted-foreground font-normal ml-1">OS</span>
                    </h1>
                  </div>
                </div>
              </div>
              <nav className="p-2 space-y-1">
                {navItems.map(item => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start h-10",
                      currentView === item.id && "bg-sidebar-accent text-sidebar-accent-foreground"
                    )}
                    onClick={() => handleNavClick(item.id as View)}
                  >
                    {item.label}
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-primary/10">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <div className="hidden xs:block">
              <h1 className="text-sm font-bold tracking-tight">
                <span className="gradient-text">VIGIL</span>
                <span className="text-muted-foreground font-normal ml-1">OS</span>
              </h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest -mt-0.5 hidden sm:block">
                Audit Intelligence
              </p>
            </div>
          </div>

          <div className="hidden sm:block h-6 w-px bg-border/50" />

          <div className="hidden lg:block relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search vendors, transactions..."
              className="pl-9 h-8 text-sm bg-muted/20 border-border/50 focus:border-primary/50"
            />
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-md bg-muted/30 border border-border/50">
            <Activity className="h-3 w-3 text-status-active" />
            <span className="text-xs font-mono text-muted-foreground hidden md:inline">System Active</span>
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-risk-critical text-[10px] font-bold flex items-center justify-center text-white">
                {criticalCount > 0 ? criticalCount : alertCount}
              </span>
            )}
          </Button>

          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Settings className="h-4 w-4" />
          </Button>

          <div className="hidden sm:block h-6 w-px bg-border/50 mx-1" />

          <Button variant="ghost" size="sm" className="gap-2">
            <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="h-3 w-3 text-primary" />
            </div>
            <span className="text-sm hidden md:inline">Auditor</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
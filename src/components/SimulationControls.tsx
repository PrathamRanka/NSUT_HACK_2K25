import { SimulationScenario } from '@/types/audit';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  RotateCcw,
  Zap,
  ShieldCheck,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SimulationControlsProps {
  scenarios: SimulationScenario[];
  activeScenario: string | null;
  isRunning: boolean;
  onStartScenario: (scenarioId: string) => void;
  onPause: () => void;
  onReset: () => void;
}

export function SimulationControls({
  scenarios,
  activeScenario,
  isRunning,
  onStartScenario,
  onPause,
  onReset,
}: SimulationControlsProps) {
  const scenarioIcons = {
    clean: ShieldCheck,
    fraud: AlertTriangle,
    'edge-case': HelpCircle,
  };

  const scenarioColors = {
    clean: 'text-status-active',
    fraud: 'text-risk-critical',
    'edge-case': 'text-risk-medium',
  };

  return (
    <div className="rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm p-3 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Simulation Mode
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Test system behavior with controlled scenarios
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isRunning ? (
            <Button variant="outline" size="sm" onClick={onPause}>
              <Pause className="h-4 w-4 mr-1" />
              Pause
            </Button>
          ) : (
            activeScenario && (
              <Button variant="outline" size="sm" onClick={() => onStartScenario(activeScenario)}>
                <Play className="h-4 w-4 mr-1" />
                Resume
              </Button>
            )
          )}
          <Button variant="ghost" size="sm" onClick={onReset}>
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {scenarios.map(scenario => {
          const Icon = scenarioIcons[scenario.type];
          const isActive = activeScenario === scenario.id;

          return (
            <button
              key={scenario.id}
              onClick={() => onStartScenario(scenario.id)}
              className={cn(
                "p-3 rounded-lg border text-left transition-all duration-200",
                isActive 
                  ? "border-primary bg-primary/10" 
                  : "border-border/50 hover:border-primary/30 hover:bg-card/50"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className={cn("h-4 w-4", scenarioColors[scenario.type])} />
                <Badge 
                  variant={
                    scenario.type === 'clean' ? 'active' : 
                    scenario.type === 'fraud' ? 'critical' : 'medium'
                  }
                  className="text-[10px]"
                >
                  {scenario.type}
                </Badge>
              </div>
              <h3 className="text-sm font-medium">{scenario.name}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {scenario.description}
              </p>
              {isActive && isRunning && (
                <div className="flex items-center gap-1 mt-2 text-xs text-primary">
                  <Zap className="h-3 w-3 animate-pulse" />
                  Running...
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

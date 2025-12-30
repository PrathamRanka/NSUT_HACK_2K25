import { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { RiskMetricsPanel } from '@/components/RiskMetricsPanel';
import { AlertFeed } from '@/components/AlertFeed';
import { TransactionStream } from '@/components/TransactionStream';
import { VendorProfileCard } from '@/components/VendorProfileCard';
import { InvestigationPanel } from '@/components/InvestigationPanel';
import { SimulationControls } from '@/components/SimulationControls';
import { WatchlistPanel } from '@/components/WatchlistPanel';
import { RiskTrendChart } from '@/components/RiskTrendChart';
import { mockData } from '@/lib/mockData';
import { Alert, Transaction, Vendor, Investigation, WatchlistItem } from '@/types/audit';
import { toast } from 'sonner';

type View = 'dashboard' | 'alerts' | 'vendors' | 'investigations' | 'watchlist' | 'analytics' | 'simulation';

export default function Index() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [selectedInvestigation, setSelectedInvestigation] = useState<Investigation | null>(null);
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [watchlist, setWatchlist] = useState(mockData.watchlist);

  const handleAlertFeedback = useCallback((alertId: string, action: 'legitimate' | 'monitor' | 'investigate') => {
    const actionLabels = {
      legitimate: 'Marked as legitimate',
      monitor: 'Added to monitoring',
      investigate: 'Escalated for investigation',
    };
    toast.success(actionLabels[action], {
      description: `Alert ${alertId} has been updated`,
    });
  }, []);

  const handleSelectAlert = useCallback((alert: Alert) => {
    setSelectedAlert(alert);
    setSelectedVendor(null);
    setSelectedInvestigation(null);
  }, []);

  const handleSelectTransaction = useCallback((transaction: Transaction) => {
    const vendor = mockData.vendors.find(v => v.id === transaction.vendorId);
    if (vendor) {
      setSelectedVendor(vendor);
      setSelectedAlert(null);
      setSelectedInvestigation(null);
    }
  }, []);

  const handleViewVendor = useCallback((vendor: Vendor) => {
    setSelectedVendor(vendor);
    setSelectedAlert(null);
    setSelectedInvestigation(null);
  }, []);

  const handleStartScenario = useCallback((scenarioId: string) => {
    setActiveScenario(scenarioId);
    setIsSimulationRunning(true);
    toast.info('Simulation started', {
      description: `Running scenario: ${mockData.simulationScenarios.find(s => s.id === scenarioId)?.name}`,
    });
  }, []);

  const handlePauseSimulation = useCallback(() => {
    setIsSimulationRunning(false);
    toast.info('Simulation paused');
  }, []);

  const handleResetSimulation = useCallback(() => {
    setActiveScenario(null);
    setIsSimulationRunning(false);
    toast.info('Simulation reset');
  }, []);

  const handleRemoveFromWatchlist = useCallback((id: string) => {
    setWatchlist(prev => prev.filter(item => item.id !== id));
    toast.success('Removed from watchlist');
  }, []);

  const handleViewWatchlistEntity = useCallback((item: WatchlistItem) => {
    if (item.entityType === 'vendor') {
      const vendor = mockData.vendors.find(v => v.id === item.entityId);
      if (vendor) setSelectedVendor(vendor);
    }
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedAlert(null);
    setSelectedVendor(null);
    setSelectedInvestigation(null);
  }, []);

  const renderMainContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <RiskMetricsPanel metrics={mockData.riskMetrics} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <TransactionStream 
                  transactions={mockData.transactions}
                  onSelectTransaction={handleSelectTransaction}
                />
              </div>
              <div>
                <AlertFeed 
                  alerts={mockData.alerts}
                  onSelectAlert={handleSelectAlert}
                  onFeedback={handleAlertFeedback}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RiskTrendChart />
              <SimulationControls
                scenarios={mockData.simulationScenarios}
                activeScenario={activeScenario}
                isRunning={isSimulationRunning}
                onStartScenario={handleStartScenario}
                onPause={handlePauseSimulation}
                onReset={handleResetSimulation}
              />
            </div>
          </div>
        );

      case 'alerts':
        return (
          <div className="max-w-3xl">
            <AlertFeed 
              alerts={mockData.alerts}
              onSelectAlert={handleSelectAlert}
              onFeedback={handleAlertFeedback}
            />
          </div>
        );

      case 'vendors':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockData.vendors.map(vendor => (
              <VendorProfileCard 
                key={vendor.id}
                vendor={vendor}
                onViewDetails={handleViewVendor}
              />
            ))}
          </div>
        );

      case 'investigations':
        return (
          <div className="space-y-4">
            {mockData.investigations.map(inv => (
              <div 
                key={inv.id}
                className="p-4 rounded-lg border border-border/50 bg-card/30 cursor-pointer hover:border-primary/30 transition-colors"
                onClick={() => {
                  setSelectedInvestigation(inv);
                  setSelectedAlert(null);
                  setSelectedVendor(null);
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{inv.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{inv.description}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{inv.status}</span>
                </div>
              </div>
            ))}
          </div>
        );

      case 'watchlist':
        return (
          <div className="max-w-2xl">
            <WatchlistPanel 
              items={watchlist}
              onRemove={handleRemoveFromWatchlist}
              onViewEntity={handleViewWatchlistEntity}
            />
          </div>
        );

      case 'simulation':
        return (
          <div className="space-y-6">
            <SimulationControls
              scenarios={mockData.simulationScenarios}
              activeScenario={activeScenario}
              isRunning={isSimulationRunning}
              onStartScenario={handleStartScenario}
              onPause={handlePauseSimulation}
              onReset={handleResetSimulation}
            />
            <TransactionStream 
              transactions={mockData.transactions}
              onSelectTransaction={handleSelectTransaction}
            />
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <p>Coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        alertCount={mockData.alerts.length}
        criticalCount={mockData.riskMetrics.criticalAlerts}
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      <div className="flex-1 flex">
        <div className="hidden md:block">
          <Sidebar 
            currentView={currentView}
            onViewChange={setCurrentView}
          />
        </div>
        
        <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto">
          {renderMainContent()}
        </main>

        {(selectedAlert || selectedVendor || selectedInvestigation) && (
          <InvestigationPanel
            alert={selectedAlert || undefined}
            vendor={selectedVendor || undefined}
            investigation={selectedInvestigation || undefined}
            onClose={handleClosePanel}
          />
        )}
      </div>
    </div>
  );
}

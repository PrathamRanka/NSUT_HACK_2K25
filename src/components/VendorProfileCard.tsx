import { Vendor } from '@/types/audit';
import { formatCurrency } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Building2,
  MapPin,
  Calendar,
  Link2,
  Eye,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface VendorProfileCardProps {
  vendor: Vendor;
  onViewDetails: (vendor: Vendor) => void;
}

export function VendorProfileCard({ vendor, onViewDetails }: VendorProfileCardProps) {
  const TrendIcon = {
    increasing: TrendingUp,
    stable: Minus,
    decreasing: TrendingDown,
  }[vendor.riskTrend];

  const trendColors = {
    increasing: 'text-risk-critical',
    stable: 'text-muted-foreground',
    decreasing: 'text-status-active',
  };

  const statusVariants: Record<Vendor['status'], 'active' | 'monitoring' | 'investigating' | 'flagged'> = {
    active: 'active',
    monitoring: 'monitoring',
    investigating: 'investigating',
    blocked: 'flagged',
  };

  return (
    <div className={cn(
      "rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm p-4",
      "transition-all duration-200 hover:border-primary/30 card-glow"
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-primary/10">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">{vendor.name}</h3>
            <p className="text-xs text-muted-foreground font-mono">{vendor.id}</p>
          </div>
        </div>
        <Badge variant={statusVariants[vendor.status]}>
          {vendor.status}
        </Badge>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Risk Score</p>
          <div className="flex items-center gap-2 mt-1">
            <span className={cn(
              "text-2xl font-mono font-bold",
              vendor.riskScore >= 70 && "text-risk-critical",
              vendor.riskScore >= 50 && vendor.riskScore < 70 && "text-risk-high",
              vendor.riskScore >= 30 && vendor.riskScore < 50 && "text-risk-medium",
              vendor.riskScore < 30 && "text-risk-low"
            )}>
              {vendor.riskScore}
            </span>
            <TrendIcon className={cn("h-4 w-4", trendColors[vendor.riskTrend])} />
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Value</p>
          <p className="text-lg font-mono font-medium mt-1">{formatCurrency(vendor.totalValue)}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{vendor.region}</span>
          <span className="text-border">•</span>
          <span>{vendor.category}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Registered {vendor.registrationDate.toLocaleDateString()}</span>
        </div>
        {vendor.relatedVendors.length > 0 && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Link2 className="h-4 w-4" />
            <span>{vendor.relatedVendors.length} related vendor{vendor.relatedVendors.length > 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      {vendor.flags.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
            Active Flags ({vendor.flags.length})
          </p>
          <div className="space-y-1">
            {vendor.flags.slice(0, 2).map(flag => (
              <div 
                key={flag.id}
                className="text-xs p-2 rounded bg-muted/30 border border-border/30"
              >
                <Badge variant={flag.severity as any} className="mr-2">
                  {flag.severity}
                </Badge>
                {flag.message}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          {vendor.totalTransactions} transactions
        </div>
        <Button 
          variant="ghost" 
          size="xs"
          onClick={() => onViewDetails(vendor)}
        >
          <Eye className="h-3 w-3 mr-1" />
          View Profile
          <ChevronRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
    </div>
  );
}

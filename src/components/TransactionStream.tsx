import { Transaction } from '@/types/audit';
import { formatCurrency, formatRelativeTime } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  CreditCard, 
  FileText, 
  CheckCircle, 
  Edit, 
  ArrowUpRight,
  Flag
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TransactionStreamProps {
  transactions: Transaction[];
  onSelectTransaction: (transaction: Transaction) => void;
}

const typeIcons: Record<Transaction['type'], typeof CreditCard> = {
  payment: CreditCard,
  contract: FileText,
  approval: CheckCircle,
  amendment: Edit,
  advance: ArrowUpRight,
  milestone: Flag,
};

export function TransactionStream({ transactions, onSelectTransaction }: TransactionStreamProps) {
  const getRiskBadge = (level: Transaction['riskLevel']) => {
    const variants: Record<Transaction['riskLevel'], 'critical' | 'high' | 'medium' | 'low' | 'info'> = {
      critical: 'critical',
      high: 'high',
      medium: 'medium',
      low: 'low',
      info: 'info',
    };
    return variants[level];
  };

  return (
    <div className="rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Transaction Stream
          </h2>
          <Badge variant="secondary" className="font-mono">
            {transactions.length} records
          </Badge>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead className="w-[100px] text-xs uppercase tracking-wider">Time</TableHead>
              <TableHead className="text-xs uppercase tracking-wider">Type</TableHead>
              <TableHead className="text-xs uppercase tracking-wider">Vendor</TableHead>
              <TableHead className="text-xs uppercase tracking-wider">Amount</TableHead>
              <TableHead className="text-xs uppercase tracking-wider">Department</TableHead>
              <TableHead className="text-xs uppercase tracking-wider">Risk</TableHead>
              <TableHead className="text-xs uppercase tracking-wider">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.slice(0, 20).map((tx, index) => {
              const TypeIcon = typeIcons[tx.type];
              return (
                <TableRow
                  key={tx.id}
                  className={cn(
                    "cursor-pointer transition-colors border-border/30",
                    "hover:bg-primary/5",
                    tx.status === 'flagged' && "bg-risk-critical/5"
                  )}
                  onClick={() => onSelectTransaction(tx)}
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {formatRelativeTime(tx.timestamp)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <TypeIcon className="h-4 w-4 text-muted-foreground" />
                      <Badge 
                        variant={tx.type as any}
                        className="text-[10px]"
                      >
                        {tx.type}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{tx.vendorName}</p>
                      <p className="text-xs text-muted-foreground font-mono">{tx.vendorId}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono font-medium">
                    {formatCurrency(tx.amount)}
                  </TableCell>
                  <TableCell className="text-sm">{tx.department}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge variant={getRiskBadge(tx.riskLevel)}>
                        {tx.riskScore}
                      </Badge>
                      {tx.flags.length > 0 && (
                        <span className="text-xs text-muted-foreground">
                          {tx.flags.length} flag{tx.flags.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "status-dot",
                        tx.status === 'flagged' && "status-dot-flagged",
                        tx.status === 'processed' && "status-dot-active",
                        tx.status === 'pending' && "status-dot-monitoring"
                      )} />
                      <span className="text-xs capitalize">{tx.status}</span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

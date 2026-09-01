import { Badge } from "@/components/ui/badge";
import { ClaimStatusType, ClaimStatus } from "@shared/schema";
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Send, 
  DollarSign, 
  XCircle,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ClaimStatusBadgeProps {
  status: ClaimStatusType;
  className?: string;
}

const statusConfig: Record<ClaimStatusType, { 
  label: string; 
  variant: "default" | "secondary" | "destructive" | "outline";
  className: string;
  icon: React.ComponentType<{ className?: string }>;
}> = {
  [ClaimStatus.PENDING]: {
    label: "Pending",
    variant: "secondary",
    className: "bg-muted text-muted-foreground",
    icon: Clock,
  },
  [ClaimStatus.FLAGGED]: {
    label: "Flagged",
    variant: "secondary",
    className: "bg-warning/15 text-warning border-warning/30",
    icon: AlertTriangle,
  },
  [ClaimStatus.APPROVED]: {
    label: "Approved",
    variant: "secondary",
    className: "bg-success/15 text-success border-success/30",
    icon: CheckCircle,
  },
  [ClaimStatus.SUBMITTED]: {
    label: "Submitted",
    variant: "secondary",
    className: "bg-info/15 text-info border-info/30",
    icon: Send,
  },
  [ClaimStatus.PAID]: {
    label: "Paid",
    variant: "secondary",
    className: "bg-success/15 text-success border-success/30",
    icon: DollarSign,
  },
  [ClaimStatus.REJECTED]: {
    label: "Rejected",
    variant: "destructive",
    className: "bg-destructive/15 text-destructive border-destructive/30",
    icon: XCircle,
  },
  [ClaimStatus.PROCESSING]: {
    label: "Processing",
    variant: "secondary",
    className: "bg-primary/15 text-primary border-primary/30",
    icon: Loader2,
  },
};

export function ClaimStatusBadge({ status, className }: ClaimStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge 
      variant={config.variant}
      className={cn(
        "px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide gap-1.5 border",
        config.className,
        className
      )}
      data-testid={`badge-status-${status}`}
    >
      <Icon className={cn("h-3 w-3", status === ClaimStatus.PROCESSING && "animate-spin")} />
      {config.label}
    </Badge>
  );
}

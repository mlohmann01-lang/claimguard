import { Badge } from "@/components/ui/badge";
import { ValidationStatusType, ValidationStatus } from "@shared/schema";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ValidationStatusBadgeProps {
  status: ValidationStatusType;
  className?: string;
}

const statusConfig: Record<ValidationStatusType, { 
  label: string; 
  className: string;
  icon: React.ComponentType<{ className?: string }>;
}> = {
  [ValidationStatus.PASSED]: {
    label: "Passed",
    className: "bg-success/15 text-success border-success/30",
    icon: CheckCircle,
  },
  [ValidationStatus.FAILED]: {
    label: "Failed",
    className: "bg-destructive/15 text-destructive border-destructive/30",
    icon: XCircle,
  },
  [ValidationStatus.WARNING]: {
    label: "Warning",
    className: "bg-warning/15 text-warning border-warning/30",
    icon: AlertTriangle,
  },
};

export function ValidationStatusBadge({ status, className }: ValidationStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge 
      variant="secondary"
      className={cn(
        "px-2 py-0.5 text-xs font-medium gap-1 border",
        config.className,
        className
      )}
      data-testid={`badge-validation-${status}`}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}

import { cn } from "@/lib/utils";
import { Clock, AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface SlaTimerProps {
  deadline: string;
  className?: string;
}

export function SlaTimer({ deadline, className }: SlaTimerProps) {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const diffMs = deadlineDate.getTime() - now.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);
  const remainingHours = diffHours % 24;

  const isOverdue = diffMs < 0;
  const isUrgent = diffHours < 24 && !isOverdue;
  const isWarning = diffHours < 48 && !isUrgent && !isOverdue;

  const getTimeString = () => {
    if (isOverdue) {
      const overdueHours = Math.abs(diffHours);
      if (overdueHours >= 24) {
        return `${Math.floor(overdueHours / 24)}d overdue`;
      }
      return `${overdueHours}h overdue`;
    }
    if (diffDays > 0) {
      return `${diffDays}d ${remainingHours}h`;
    }
    return `${diffHours}h`;
  };

  const getColor = () => {
    if (isOverdue) return "text-destructive";
    if (isUrgent) return "text-warning";
    if (isWarning) return "text-info";
    return "text-muted-foreground";
  };

  const getIcon = () => {
    if (isOverdue || isUrgent) {
      return <AlertCircle className="h-3.5 w-3.5" />;
    }
    return <Clock className="h-3.5 w-3.5" />;
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div 
          className={cn(
            "flex items-center gap-1.5 text-xs font-medium",
            getColor(),
            className
          )}
          data-testid="sla-timer"
        >
          {getIcon()}
          <span className="font-mono">{getTimeString()}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-sm">
          SLA Deadline: {deadlineDate.toLocaleDateString()} {deadlineDate.toLocaleTimeString()}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}

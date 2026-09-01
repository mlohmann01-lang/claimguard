import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ConfidenceScoreProps {
  score: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ConfidenceScore({ score, showLabel = true, size = "md", className }: ConfidenceScoreProps) {
  const percentage = Math.round(score * 100);
  
  const getColor = () => {
    if (percentage >= 90) return "text-success";
    if (percentage >= 70) return "text-info";
    if (percentage >= 50) return "text-warning";
    return "text-destructive";
  };

  const getBgColor = () => {
    if (percentage >= 90) return "bg-success";
    if (percentage >= 70) return "bg-info";
    if (percentage >= 50) return "bg-warning";
    return "bg-destructive";
  };

  const getLabel = () => {
    if (percentage >= 90) return "High Confidence";
    if (percentage >= 70) return "Medium Confidence";
    if (percentage >= 50) return "Low Confidence";
    return "Review Required";
  };

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const barHeight = {
    sm: "h-1",
    md: "h-1.5",
    lg: "h-2",
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div 
          className={cn("flex items-center gap-2", className)}
          data-testid="confidence-score"
        >
          <div className={cn("w-16 rounded-full bg-muted overflow-hidden", barHeight[size])}>
            <div 
              className={cn("h-full rounded-full transition-all", getBgColor())}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className={cn("font-mono font-medium", sizeClasses[size], getColor())}>
            {percentage}%
          </span>
          {showLabel && (
            <span className={cn("text-muted-foreground", sizeClasses[size])}>
              {getLabel()}
            </span>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-sm">
          Auto-claim eligible: {percentage >= 90 ? "Yes" : "No"}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}

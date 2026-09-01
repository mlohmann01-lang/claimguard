import { cn } from "@/lib/utils";
import { Shield, AlertTriangle, AlertCircle, CheckCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface RiskIndicatorProps {
  score: number;
  label?: string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

export function RiskIndicator({ 
  score, 
  label, 
  size = "md", 
  showIcon = true,
  className 
}: RiskIndicatorProps) {
  const getLevel = () => {
    if (score >= 80) return { level: "Strong", color: "text-success", bgColor: "bg-success" };
    if (score >= 60) return { level: "Good", color: "text-info", bgColor: "bg-info" };
    if (score >= 40) return { level: "Fair", color: "text-warning", bgColor: "bg-warning" };
    return { level: "At Risk", color: "text-destructive", bgColor: "bg-destructive" };
  };

  const { level, color, bgColor } = getLevel();

  const getIcon = () => {
    if (score >= 80) return <CheckCircle className="h-4 w-4" />;
    if (score >= 60) return <Shield className="h-4 w-4" />;
    if (score >= 40) return <AlertTriangle className="h-4 w-4" />;
    return <AlertCircle className="h-4 w-4" />;
  };

  const sizeClasses = {
    sm: { text: "text-xs", bar: "h-1 w-12", icon: "h-3 w-3" },
    md: { text: "text-sm", bar: "h-1.5 w-16", icon: "h-4 w-4" },
    lg: { text: "text-base", bar: "h-2 w-20", icon: "h-5 w-5" },
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div 
          className={cn("flex items-center gap-2", className)}
          data-testid="risk-indicator"
        >
          {showIcon && (
            <span className={color}>{getIcon()}</span>
          )}
          <div className="flex flex-col gap-1">
            {label && (
              <span className={cn("text-muted-foreground", sizeClasses[size].text)}>
                {label}
              </span>
            )}
            <div className="flex items-center gap-2">
              <div className={cn("rounded-full bg-muted overflow-hidden", sizeClasses[size].bar)}>
                <div 
                  className={cn("h-full rounded-full transition-all", bgColor)}
                  style={{ width: `${score}%` }}
                />
              </div>
              <span className={cn("font-mono font-medium", sizeClasses[size].text, color)}>
                {score}%
              </span>
            </div>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-sm font-medium">{level}</p>
        <p className="text-xs text-muted-foreground">Compliance Score: {score}%</p>
      </TooltipContent>
    </Tooltip>
  );
}

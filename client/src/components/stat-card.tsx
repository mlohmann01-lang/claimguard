import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  icon?: React.ReactNode;
  className?: string;
  valueClassName?: string;
  isCurrency?: boolean;
  isPercentage?: boolean;
}

export function StatCard({
  title,
  value,
  trend,
  trendLabel,
  icon,
  className,
  valueClassName,
  isCurrency = false,
  isPercentage = false,
}: StatCardProps) {
  const formatValue = () => {
    if (typeof value === "number") {
      if (isCurrency) {
        return new Intl.NumberFormat("en-AU", {
          style: "currency",
          currency: "AUD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(value);
      }
      if (isPercentage) {
        return `${value.toFixed(1)}%`;
      }
      return value.toLocaleString();
    }
    return value;
  };

  const getTrendIcon = () => {
    if (trend === undefined || trend === 0) return <Minus className="h-3 w-3" />;
    return trend > 0 ? (
      <TrendingUp className="h-3 w-3" />
    ) : (
      <TrendingDown className="h-3 w-3" />
    );
  };

  const getTrendColor = () => {
    if (trend === undefined || trend === 0) return "text-muted-foreground";
    return trend > 0 ? "text-success" : "text-destructive";
  };

  return (
    <Card className={cn("border", className)} data-testid={`stat-card-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-muted-foreground truncate">
              {title}
            </p>
            <p className={cn(
              "text-2xl font-semibold font-mono mt-1 tracking-tight",
              valueClassName
            )}>
              {formatValue()}
            </p>
            {trend !== undefined && (
              <div className={cn("flex items-center gap-1 mt-2 text-xs", getTrendColor())}>
                {getTrendIcon()}
                <span className="font-medium">
                  {trend > 0 ? "+" : ""}{trend.toFixed(1)}%
                </span>
                {trendLabel && (
                  <span className="text-muted-foreground ml-1">{trendLabel}</span>
                )}
              </div>
            )}
          </div>
          {icon && (
            <div className="flex-shrink-0 p-2 rounded-md bg-muted">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

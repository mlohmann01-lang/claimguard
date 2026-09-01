import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plan } from "@shared/schema";
import { cn } from "@/lib/utils";
import { 
  AlertTriangle, 
  TrendingUp,
  Calendar,
  ChevronRight
} from "lucide-react";

interface PlanCardProps {
  plan: Plan;
  onClick?: (plan: Plan) => void;
  className?: string;
}

export function PlanCard({ plan, onClick, className }: PlanCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const spentPercentage = ((plan.totalBudget - plan.remainingBudget) / plan.totalBudget) * 100;
  
  const getRiskBadge = () => {
    switch (plan.riskLevel) {
      case "high":
        return (
          <Badge className="bg-destructive/15 text-destructive border-destructive/30 border">
            <AlertTriangle className="h-3 w-3 mr-1" />
            High Risk
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-warning/15 text-warning border-warning/30 border">
            Medium Risk
          </Badge>
        );
      default:
        return (
          <Badge className="bg-success/15 text-success border-success/30 border">
            Low Risk
          </Badge>
        );
    }
  };

  const getVelocityIndicator = () => {
    if (plan.spendVelocity > 1.2) {
      return (
        <span className="text-destructive text-xs flex items-center gap-1">
          <TrendingUp className="h-3 w-3" />
          High velocity
        </span>
      );
    }
    if (plan.spendVelocity > 0.8) {
      return (
        <span className="text-success text-xs flex items-center gap-1">
          <TrendingUp className="h-3 w-3" />
          On track
        </span>
      );
    }
    return (
      <span className="text-muted-foreground text-xs">
        Low velocity
      </span>
    );
  };

  return (
    <Card 
      className={cn(
        "border hover-elevate cursor-pointer transition-colors",
        className
      )}
      onClick={() => onClick?.(plan)}
      data-testid={`plan-card-${plan.id}`}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-3">
        <div>
          <p className="text-sm font-medium">{plan.participantName}</p>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">{plan.planNumber}</p>
        </div>
        {getRiskBadge()}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Budget</span>
            <span className="font-mono font-semibold">{formatCurrency(plan.totalBudget)}</span>
          </div>
          <Progress value={spentPercentage} className="h-2" />
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {formatCurrency(plan.totalBudget - plan.remainingBudget)} spent
            </span>
            <span className="font-mono text-success font-medium">
              {formatCurrency(plan.remainingBudget)} remaining
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(plan.startDate)} - {formatDate(plan.endDate)}</span>
          </div>
          {getVelocityIndicator()}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {plan.categories.length} categories
          </span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );
}

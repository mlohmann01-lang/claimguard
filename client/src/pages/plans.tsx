import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlanCard } from "@/components/plan-card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Plan, PlanCategory } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Wallet,
  Calendar,
  TrendingUp,
  AlertTriangle,
  X,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Plans() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: plans, isLoading } = useQuery<Plan[]>({
    queryKey: ["/api/plans"],
  });

  const filteredPlans = plans?.filter((plan) => {
    return (
      searchQuery === "" ||
      plan.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.planNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

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

  const getDaysRemaining = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="flex h-full" data-testid="plans-page">
      <div className={cn(
        "flex-1 flex flex-col overflow-hidden",
        selectedPlan && "lg:mr-[450px]"
      )}>
        <div className="p-6 border-b bg-background">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Plan Intelligence</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Plan values, categories, budgets, spend velocity, and risk indicators (read-only)
              </p>
            </div>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search participants or plan numbers..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search-plans"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-48 w-full" />
              ))}
            </div>
          ) : filteredPlans && filteredPlans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredPlans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  onClick={setSelectedPlan}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <Wallet className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No plans found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>
      </div>

      {selectedPlan && (
        <div className="hidden lg:block fixed right-0 top-0 h-full w-[450px] z-40 border-l bg-background">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between gap-4 p-4 border-b">
              <div>
                <h2 className="font-semibold">{selectedPlan.participantName}</h2>
                <p className="text-sm text-muted-foreground font-mono">
                  {selectedPlan.planNumber}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedPlan(null)}
                data-testid="button-close-plan-panel"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-4 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="border">
                    <CardContent className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">Total Budget</p>
                      <p className="text-xl font-semibold font-mono">
                        {formatCurrency(selectedPlan.totalBudget)}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border">
                    <CardContent className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">Remaining</p>
                      <p className="text-xl font-semibold font-mono text-success">
                        {formatCurrency(selectedPlan.remainingBudget)}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Budget Utilization</span>
                    <span className="font-mono">
                      {Math.round(((selectedPlan.totalBudget - selectedPlan.remainingBudget) / selectedPlan.totalBudget) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={((selectedPlan.totalBudget - selectedPlan.remainingBudget) / selectedPlan.totalBudget) * 100}
                    className="h-2"
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Start Date</p>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="font-mono">{formatDate(selectedPlan.startDate)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">End Date</p>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="font-mono">{formatDate(selectedPlan.endDate)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Days Remaining</p>
                    <span className="font-mono font-medium">
                      {getDaysRemaining(selectedPlan.endDate)} days
                    </span>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Spend Velocity</p>
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className={cn(
                        "h-3.5 w-3.5",
                        selectedPlan.spendVelocity > 1.2 ? "text-destructive" :
                        selectedPlan.spendVelocity > 0.8 ? "text-success" : "text-muted-foreground"
                      )} />
                      <span className="font-mono">{selectedPlan.spendVelocity.toFixed(2)}x</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-md border bg-card">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Risk Level</span>
                    <Badge
                      className={cn(
                        "border",
                        selectedPlan.riskLevel === "high" && "bg-destructive/15 text-destructive border-destructive/30",
                        selectedPlan.riskLevel === "medium" && "bg-warning/15 text-warning border-warning/30",
                        selectedPlan.riskLevel === "low" && "bg-success/15 text-success border-success/30"
                      )}
                    >
                      {selectedPlan.riskLevel === "high" && <AlertTriangle className="h-3 w-3 mr-1" />}
                      {selectedPlan.riskLevel.charAt(0).toUpperCase() + selectedPlan.riskLevel.slice(1)} Risk
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-semibold mb-3">Category Breakdown</h3>
                  <div className="space-y-3">
                    {selectedPlan.categories.map((category) => {
                      const percentSpent = (category.spent / category.budget) * 100;
                      return (
                        <div
                          key={category.id}
                          className="p-3 rounded-md border bg-card"
                          data-testid={`category-${category.id}`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">{category.name}</span>
                            <span className="text-xs text-muted-foreground font-mono">
                              {category.code}
                            </span>
                          </div>
                          <Progress value={percentSpent} className="h-1.5 mb-2" />
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">
                              {formatCurrency(category.spent)} of {formatCurrency(category.budget)}
                            </span>
                            <span className={cn(
                              "font-mono font-medium",
                              percentSpent > 90 ? "text-destructive" :
                              percentSpent > 75 ? "text-warning" : "text-success"
                            )}>
                              {formatCurrency(category.remaining)} left
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </ScrollArea>

            <div className="p-4 border-t bg-card">
              <p className="text-xs text-muted-foreground text-center">
                Plan data is read-only. No recommendations on how funds should be used.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

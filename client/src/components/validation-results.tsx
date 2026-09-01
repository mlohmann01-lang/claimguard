import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ValidationStatusBadge } from "./validation-status-badge";
import { ValidationResult, RuleCategory } from "@shared/schema";
import { cn } from "@/lib/utils";
import { 
  DollarSign, 
  FolderTree, 
  Building2, 
  Copy, 
  FileCheck,
  Clock,
  ChevronDown,
  ChevronRight,
  Info
} from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

interface ValidationResultsProps {
  results: ValidationResult[];
  className?: string;
}

const categoryConfig: Record<string, { 
  label: string; 
  icon: React.ComponentType<{ className?: string }>;
}> = {
  [RuleCategory.PRICING]: {
    label: "Pricing Validation",
    icon: DollarSign,
  },
  [RuleCategory.CATEGORY]: {
    label: "Category Alignment",
    icon: FolderTree,
  },
  [RuleCategory.PROVIDER]: {
    label: "Provider Eligibility",
    icon: Building2,
  },
  [RuleCategory.DUPLICATION]: {
    label: "Duplication Check",
    icon: Copy,
  },
  [RuleCategory.COMPLETENESS]: {
    label: "Completeness Check",
    icon: FileCheck,
  },
  [RuleCategory.TIME_FREQUENCY]: {
    label: "Time/Frequency Constraints",
    icon: Clock,
  },
};

export function ValidationResults({ results, className }: ValidationResultsProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const groupedResults = results.reduce((acc, result) => {
    const category = result.ruleCategory;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(result);
    return acc;
  }, {} as Record<string, ValidationResult[]>);

  const passedCount = results.filter(r => r.status === "passed").length;
  const failedCount = results.filter(r => r.status === "failed").length;
  const warningCount = results.filter(r => r.status === "warning").length;

  return (
    <Card className={cn("border", className)} data-testid="validation-results">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-base font-semibold">Validation Results</CardTitle>
          <div className="flex items-center gap-3 text-xs font-medium">
            <span className="text-success">{passedCount} passed</span>
            <span className="text-warning">{warningCount} warnings</span>
            <span className="text-destructive">{failedCount} failed</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {Object.entries(groupedResults).map(([category, categoryResults]) => {
          const config = categoryConfig[category];
          const Icon = config?.icon || Info;
          const hasIssues = categoryResults.some(r => r.status !== "passed");

          return (
            <div 
              key={category} 
              className={cn(
                "rounded-md border",
                hasIssues ? "border-warning/30 bg-warning/5" : "border-border"
              )}
            >
              <div className="p-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span>{config?.label || category}</span>
                </div>
                <div className="mt-2 space-y-2">
                  {categoryResults.map((result) => (
                    <Collapsible
                      key={result.id}
                      open={expandedItems.has(result.id)}
                      onOpenChange={() => toggleExpanded(result.id)}
                    >
                      <div className={cn(
                        "rounded-md p-2",
                        result.status === "passed" ? "bg-background" : "bg-background border"
                      )}>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-start p-0 h-auto hover:bg-transparent"
                            data-testid={`button-expand-${result.id}`}
                          >
                            <div className="flex items-center justify-between gap-2 w-full">
                              <div className="flex items-center gap-2">
                                {expandedItems.has(result.id) ? (
                                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                                ) : (
                                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                                )}
                                <span className="text-sm">{result.ruleName}</span>
                              </div>
                              <ValidationStatusBadge status={result.status} />
                            </div>
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="mt-2 ml-5 p-3 rounded-md bg-muted/50 text-sm">
                            <p className="text-muted-foreground mb-2">{result.message}</p>
                            <div className="pt-2 border-t border-border">
                              <p className="text-xs text-muted-foreground mb-1 font-medium">Explanation:</p>
                              <p className="text-sm">{result.explanation}</p>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

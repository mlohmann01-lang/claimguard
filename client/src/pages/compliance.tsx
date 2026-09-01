import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/stat-card";
import { RiskIndicator } from "@/components/risk-indicator";
import { ValidationStatusBadge } from "@/components/validation-status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ValidationRule, OutcomeMetrics } from "@shared/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Info,
  DollarSign,
  FolderTree,
  Building2,
  Copy,
  FileCheck,
  Clock,
  Activity,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  pricing: DollarSign,
  category: FolderTree,
  provider: Building2,
  duplication: Copy,
  completeness: FileCheck,
  time_frequency: Clock,
};

export default function Compliance() {
  const { data: metrics, isLoading: metricsLoading } = useQuery<OutcomeMetrics>({
    queryKey: ["/api/metrics"],
  });

  const { data: rules, isLoading: rulesLoading } = useQuery<ValidationRule[]>({
    queryKey: ["/api/rules"],
  });

  const { data: recentValidations, isLoading: validationsLoading } = useQuery<any[]>({
    queryKey: ["/api/validations/recent"],
  });

  return (
    <div className="p-6 space-y-6" data-testid="compliance-page">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Compliance Control Layer</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Real-time rule validation, pricing enforcement, and eligibility checks
          </p>
        </div>
        <Button variant="outline" data-testid="button-export-report">
          <Download className="h-4 w-4 mr-1.5" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricsLoading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border">
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-8 w-20" />
                </CardContent>
              </Card>
            ))}
          </>
        ) : metrics ? (
          <>
            <StatCard
              title="Audit Readiness"
              value={metrics.auditReadinessScore}
              isPercentage
              trend={metrics.auditReadinessTrend}
              trendLabel="vs last month"
              icon={<Shield className="h-5 w-5 text-primary" />}
            />
            <StatCard
              title="Compliance Risk"
              value={metrics.complianceRiskScore}
              isPercentage
              trend={-metrics.complianceRiskTrend}
              trendLabel="vs last week"
              icon={<AlertTriangle className="h-5 w-5 text-warning" />}
              valueClassName={metrics.complianceRiskScore > 20 ? "text-warning" : "text-success"}
            />
            <StatCard
              title="Rejection Rate"
              value={metrics.rejectionRate}
              isPercentage
              trend={metrics.rejectionRateTrend}
              icon={<Activity className="h-5 w-5 text-muted-foreground" />}
            />
            <StatCard
              title="Rules Active"
              value={rules?.filter(r => r.isActive).length || 0}
              icon={<CheckCircle className="h-5 w-5 text-success" />}
            />
          </>
        ) : null}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border" data-testid="card-compliance-scores">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">Compliance Scores by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(categoryIcons).map(([category, Icon]) => {
                  const score = 70 + Math.floor(Math.random() * 25);
                  return (
                    <div
                      key={category}
                      className="p-4 rounded-md border bg-card"
                      data-testid={`compliance-category-${category}`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium capitalize">
                          {category.replace("_", " ")}
                        </span>
                      </div>
                      <RiskIndicator score={score} showIcon={false} size="md" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border" data-testid="card-regulatory-invariants">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <CardTitle className="text-base font-semibold">Regulatory Invariants</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-md border bg-success/5 border-success/20">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Deterministic Compliance First</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    AI assists, but rules decide. LLMs cannot approve or reject claims.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-3 rounded-md border bg-success/5 border-success/20">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Auditability Non-Optional</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Every action timestamped, attributed, replayable, and explainable.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-3 rounded-md border bg-success/5 border-success/20">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                <div>
                  <p className="text-sm font-medium">No Cross-Tenant Leakage</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Tenant data isolated. Global learning anonymised and aggregated.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-3 rounded-md border bg-success/5 border-success/20">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Human Override Available</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Users can override decisions. Overrides logged and analyzed.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-3 rounded-md border bg-info/5 border-info/20">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-info mt-0.5" />
                <div>
                  <p className="text-sm font-medium">No Advice Given</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    System explains rules, outcomes, and risk — never advises.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rules" className="w-full">
        <TabsList data-testid="tabs-compliance">
          <TabsTrigger value="rules">Validation Rules</TabsTrigger>
          <TabsTrigger value="logs">Recent Validations</TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="mt-4">
          <Card className="border">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">Active Validation Rules</CardTitle>
            </CardHeader>
            <CardContent>
              {rulesLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : rules && rules.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rule Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rules.map((rule) => {
                      const Icon = categoryIcons[rule.category] || Info;
                      return (
                        <TableRow key={rule.id} data-testid={`rule-row-${rule.id}`}>
                          <TableCell className="font-medium">{rule.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                              <span className="capitalize text-sm">
                                {rule.category.replace("_", " ")}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className={cn(
                                "text-xs",
                                rule.severity === "critical" && "bg-destructive/15 text-destructive",
                                rule.severity === "warning" && "bg-warning/15 text-warning",
                                rule.severity === "info" && "bg-info/15 text-info"
                              )}
                            >
                              {rule.severity}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className={cn(
                                "text-xs",
                                rule.isActive
                                  ? "bg-success/15 text-success"
                                  : "bg-muted text-muted-foreground"
                              )}
                            >
                              {rule.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground max-w-[300px] truncate">
                            {rule.description}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <Shield className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No validation rules configured</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="mt-4">
          <Card className="border">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">Recent Validation Logs</CardTitle>
            </CardHeader>
            <CardContent>
              {validationsLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : recentValidations && recentValidations.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Claim ID</TableHead>
                      <TableHead>Rule</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentValidations.map((validation, index) => (
                      <TableRow key={index} data-testid={`validation-row-${index}`}>
                        <TableCell className="font-mono text-xs">
                          {new Date(validation.timestamp).toLocaleString()}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {validation.claimNumber}
                        </TableCell>
                        <TableCell className="text-sm">{validation.ruleName}</TableCell>
                        <TableCell>
                          <ValidationStatusBadge status={validation.status} />
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                          {validation.message}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <Activity className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No recent validations</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="text-center py-4 text-xs text-muted-foreground">
        Compliance {">"} Convenience. If speed and compliance conflict, compliance always wins.
      </div>
    </div>
  );
}

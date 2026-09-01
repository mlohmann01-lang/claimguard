import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClaimCard } from "@/components/claim-card";
import { RiskIndicator } from "@/components/risk-indicator";
import { useQuery } from "@tanstack/react-query";
import { Claim, OutcomeMetrics } from "@shared/schema";
import { 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  DollarSign,
  Shield,
  Clock,
  TrendingDown,
  BarChart3
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data: metrics, isLoading: metricsLoading } = useQuery<OutcomeMetrics>({
    queryKey: ["/api/metrics"],
  });

  const { data: recentClaims, isLoading: claimsLoading } = useQuery<Claim[]>({
    queryKey: ["/api/claims/recent"],
  });

  const { data: flaggedClaims, isLoading: flaggedLoading } = useQuery<Claim[]>({
    queryKey: ["/api/claims/flagged"],
  });

  return (
    <div className="p-6 space-y-6" data-testid="dashboard-page">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Plan Funds → Claim Flow → Compliance Status → Outcomes
          </p>
        </div>
        <Link href="/claims">
          <Button data-testid="button-view-all-claims">
            <FileText className="h-4 w-4 mr-1.5" />
            View All Claims
          </Button>
        </Link>
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
              title="Pending Claims"
              value={metrics.pendingClaims}
              icon={<Clock className="h-5 w-5 text-muted-foreground" />}
            />
            <StatCard
              title="Flagged for Review"
              value={metrics.flaggedClaims}
              icon={<AlertTriangle className="h-5 w-5 text-warning" />}
              valueClassName={metrics.flaggedClaims > 0 ? "text-warning" : ""}
            />
            <StatCard
              title="Auto-Claim Success"
              value={metrics.autoClaimSuccessRate}
              isPercentage
              trend={metrics.autoClaimSuccessTrend}
              trendLabel="vs last week"
              icon={<CheckCircle className="h-5 w-5 text-success" />}
            />
            <StatCard
              title="Recovered Amount"
              value={metrics.recoveredAmount}
              isCurrency
              trend={metrics.recoveredAmountTrend}
              trendLabel="vs baseline"
              icon={<DollarSign className="h-5 w-5 text-success" />}
            />
          </>
        ) : null}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border" data-testid="card-recent-claims">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-4">
              <CardTitle className="text-base font-semibold">Recent Claims</CardTitle>
              <Link href="/claims">
                <Button variant="ghost" size="sm" data-testid="button-view-more-claims">
                  View all
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {claimsLoading ? (
                <>
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </>
              ) : recentClaims && recentClaims.length > 0 ? (
                recentClaims.slice(0, 5).map((claim) => (
                  <ClaimCard key={claim.id} claim={claim} compact />
                ))
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No recent claims</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border" data-testid="card-flagged-claims">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <CardTitle className="text-base font-semibold">Flagged for Review</CardTitle>
              </div>
              <Link href="/claims?status=flagged">
                <Button variant="ghost" size="sm" data-testid="button-view-flagged">
                  View all
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {flaggedLoading ? (
                <>
                  {[1, 2].map((i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </>
              ) : flaggedClaims && flaggedClaims.length > 0 ? (
                flaggedClaims.slice(0, 3).map((claim) => (
                  <ClaimCard key={claim.id} claim={claim} compact />
                ))
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-10 w-10 text-success mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No flagged claims</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border" data-testid="card-compliance-status">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <CardTitle className="text-base font-semibold">Compliance Status</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {metricsLoading ? (
                <>
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </>
              ) : metrics ? (
                <>
                  <div className="p-3 rounded-md border bg-card">
                    <RiskIndicator 
                      score={metrics.auditReadinessScore} 
                      label="Audit Readiness"
                      size="md"
                    />
                  </div>
                  <div className="p-3 rounded-md border bg-card">
                    <RiskIndicator 
                      score={100 - metrics.complianceRiskScore} 
                      label="Compliance Score"
                      size="md"
                    />
                  </div>
                  <div className="p-3 rounded-md border bg-card">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Rejection Rate</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold text-sm">
                          {metrics.rejectionRate.toFixed(1)}%
                        </span>
                        {metrics.rejectionRateTrend < 0 && (
                          <TrendingDown className="h-3.5 w-3.5 text-success" />
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </CardContent>
          </Card>

          <Card className="border" data-testid="card-outcome-summary">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                <CardTitle className="text-base font-semibold">Outcome Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {metricsLoading ? (
                <>
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </>
              ) : metrics ? (
                <>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Total Processed</span>
                    <span className="font-mono font-semibold">{metrics.totalClaimsProcessed.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Avg Processing Time</span>
                    <span className="font-mono font-semibold">{metrics.avgProcessingTime}h</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">Auto-Claim Rate</span>
                    <span className="font-mono font-semibold text-success">
                      {metrics.autoClaimSuccessRate.toFixed(1)}%
                    </span>
                  </div>
                </>
              ) : null}
              <Link href="/outcomes" className="block">
                <Button variant="outline" className="w-full mt-2" data-testid="button-view-analytics">
                  View Full Analytics
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="text-center py-4 text-xs text-muted-foreground">
        This system does not provide advice. Autoclaim explains rules, outcomes, and risk — it never advises.
      </div>
    </div>
  );
}

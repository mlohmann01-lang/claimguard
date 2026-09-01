import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { OutcomeMetrics } from "@shared/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Calendar,
} from "lucide-react";
import { useState } from "react";

const rejectionTrendData = [
  { week: "W1", rate: 8.2 },
  { week: "W2", rate: 7.8 },
  { week: "W3", rate: 6.5 },
  { week: "W4", rate: 5.9 },
  { week: "W5", rate: 5.2 },
  { week: "W6", rate: 4.8 },
];

const autoClaimTrendData = [
  { week: "W1", rate: 72 },
  { week: "W2", rate: 75 },
  { week: "W3", rate: 78 },
  { week: "W4", rate: 82 },
  { week: "W5", rate: 85 },
  { week: "W6", rate: 87 },
];

const claimVolumeData = [
  { month: "Jan", approved: 450, rejected: 38, pending: 12 },
  { month: "Feb", approved: 520, rejected: 32, pending: 18 },
  { month: "Mar", approved: 580, rejected: 28, pending: 22 },
  { month: "Apr", approved: 620, rejected: 24, pending: 15 },
  { month: "May", approved: 680, rejected: 20, pending: 10 },
  { month: "Jun", approved: 720, rejected: 18, pending: 8 },
];

const statusDistribution = [
  { name: "Approved", value: 68, color: "hsl(142, 71%, 45%)" },
  { name: "Pending", value: 15, color: "hsl(38, 92%, 50%)" },
  { name: "Rejected", value: 12, color: "hsl(0, 84%, 60%)" },
  { name: "Processing", value: 5, color: "hsl(217, 91%, 60%)" },
];

export default function Outcomes() {
  const [dateRange, setDateRange] = useState("30d");

  const { data: metrics, isLoading } = useQuery<OutcomeMetrics>({
    queryKey: ["/api/metrics"],
  });

  return (
    <div className="p-6 space-y-6" data-testid="outcomes-page">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Outcome & Risk Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Measure outcomes, prove diligence, reduce rejected claims
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px]" data-testid="select-date-range">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" data-testid="button-export-analytics">
            <Download className="h-4 w-4 mr-1.5" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
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
              title="Rejected Claims Avoided"
              value={metrics.recoveredAmount}
              isCurrency
              trend={metrics.recoveredAmountTrend}
              trendLabel="vs baseline"
              icon={<DollarSign className="h-5 w-5 text-success" />}
            />
            <StatCard
              title="Rejection Rate"
              value={metrics.rejectionRate}
              isPercentage
              trend={metrics.rejectionRateTrend}
              trendLabel="vs last period"
              icon={<TrendingDown className="h-5 w-5 text-success" />}
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
              title="Audit Readiness"
              value={metrics.auditReadinessScore}
              isPercentage
              trend={metrics.auditReadinessTrend}
              icon={<BarChart3 className="h-5 w-5 text-primary" />}
              valueClassName={metrics.auditReadinessScore >= 80 ? "text-success" : ""}
            />
          </>
        ) : null}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border" data-testid="card-rejection-trend">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Rejection Rate Trend</CardTitle>
              <div className="flex items-center gap-1.5 text-xs text-success">
                <TrendingDown className="h-3.5 w-3.5" />
                <span>-18% improvement</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rejectionTrendData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="week" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(value) => `${value}%`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                    formatter={(value: number) => [`${value}%`, "Rejection Rate"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="hsl(var(--destructive))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--destructive))", strokeWidth: 0, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border" data-testid="card-autoclaim-trend">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Auto-Claim Accuracy</CardTitle>
              <div className="flex items-center gap-1.5 text-xs text-success">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>6 weeks improvement</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={autoClaimTrendData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="week" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(value) => `${value}%`} domain={[60, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                    formatter={(value: number) => [`${value}%`, "Success Rate"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="hsl(var(--success))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--success))", strokeWidth: 0, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border lg:col-span-2" data-testid="card-claim-volume">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">Claim Volume by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={claimVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="approved" name="Approved" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="rejected" name="Rejected" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pending" name="Pending" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border" data-testid="card-status-distribution">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">Current Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                    formatter={(value: number) => [`${value}%`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {statusDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <div
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-mono font-medium ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border" data-testid="card-stickiness-metrics">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            <CardTitle className="text-base font-semibold">Value Delivered</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              <>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="text-center p-4">
                    <Skeleton className="h-10 w-32 mx-auto mb-2" />
                    <Skeleton className="h-4 w-24 mx-auto" />
                  </div>
                ))}
              </>
            ) : metrics ? (
              <>
                <div className="text-center p-4 rounded-md bg-success/5 border border-success/20">
                  <p className="text-3xl font-bold font-mono text-success">
                    {new Intl.NumberFormat("en-AU", {
                      style: "currency",
                      currency: "AUD",
                      minimumFractionDigits: 0,
                    }).format(metrics.recoveredAmount)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    in rejected claims avoided
                  </p>
                </div>
                <div className="text-center p-4 rounded-md bg-info/5 border border-info/20">
                  <p className="text-3xl font-bold font-mono text-info">
                    -{metrics.rejectionRateTrend.toFixed(1)}%
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    compliance risk reduction
                  </p>
                </div>
                <div className="text-center p-4 rounded-md bg-primary/5 border border-primary/20">
                  <p className="text-3xl font-bold font-mono text-primary">
                    {metrics.autoClaimSuccessRate.toFixed(0)}%
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    auto-claim accuracy
                  </p>
                </div>
                <div className="text-center p-4 rounded-md bg-card border">
                  <p className="text-3xl font-bold font-mono">
                    STRONG
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    audit readiness status
                  </p>
                </div>
              </>
            ) : null}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-6">
            If Autoclaim is removed, performance regresses. That's the moat.
          </p>
        </CardContent>
      </Card>

      <div className="text-center py-4 text-xs text-muted-foreground">
        Stickiness comes from outcomes, not features. Autoclaim is building the operating system for compliant fund administration.
      </div>
    </div>
  );
}

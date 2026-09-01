import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ClaimCard } from "@/components/claim-card";
import { ClaimDetailPanel } from "@/components/claim-detail-panel";
import { ClaimStatusBadge } from "@/components/claim-status-badge";
import { ConfidenceScore } from "@/components/confidence-score";
import { SlaTimer } from "@/components/sla-timer";
import { Claim, ClaimStatus, ClaimStatusType } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  LayoutGrid,
  LayoutList,
  ChevronRight,
  RefreshCw,
  CheckCircle,
  XCircle,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = "table" | "cards";

export default function Claims() {
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const { toast } = useToast();

  const { data: claims, isLoading, refetch } = useQuery<Claim[]>({
    queryKey: ["/api/claims"],
  });

  const approveMutation = useMutation({
    mutationFn: async (claimId: string) => {
      return apiRequest("PATCH", `/api/claims/${claimId}/approve`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/claims"] });
      toast({
        title: "Claim Approved",
        description: "The claim has been approved and logged.",
      });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (claimId: string) => {
      return apiRequest("PATCH", `/api/claims/${claimId}/reject`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/claims"] });
      toast({
        title: "Claim Rejected",
        description: "The claim has been rejected and logged.",
      });
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (claimId: string) => {
      return apiRequest("PATCH", `/api/claims/${claimId}/submit`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/claims"] });
      toast({
        title: "Claim Submitted",
        description: "The claim has been submitted to NDIS.",
      });
    },
  });

  const filteredClaims = useMemo(() => {
    if (!claims) return [];
    
    return claims.filter((claim) => {
      const matchesSearch =
        searchQuery === "" ||
        claim.claimNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        claim.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        claim.participantName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || claim.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [claims, searchQuery, statusFilter]);

  const statusCounts = useMemo(() => {
    if (!claims) return {};
    return claims.reduce((acc, claim) => {
      acc[claim.status] = (acc[claim.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [claims]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "short",
    });
  };

  const handleApprove = (claim: Claim) => {
    approveMutation.mutate(claim.id);
  };

  const handleReject = (claim: Claim) => {
    rejectMutation.mutate(claim.id);
  };

  const handleSubmit = (claim: Claim) => {
    submitMutation.mutate(claim.id);
  };

  return (
    <div className="flex h-full" data-testid="claims-page">
      <div className={cn(
        "flex-1 flex flex-col overflow-hidden",
        selectedClaim && "lg:mr-[400px]"
      )}>
        <div className="p-6 border-b bg-background">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Claims Operations Hub</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Process claims, enforce compliance, prove diligence
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              data-testid="button-refresh-claims"
            >
              <RefreshCw className="h-4 w-4 mr-1.5" />
              Refresh
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search claims, providers, participants..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-claims"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]" data-testid="select-status-filter">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value={ClaimStatus.PENDING}>Pending</SelectItem>
                <SelectItem value={ClaimStatus.FLAGGED}>Flagged</SelectItem>
                <SelectItem value={ClaimStatus.APPROVED}>Approved</SelectItem>
                <SelectItem value={ClaimStatus.SUBMITTED}>Submitted</SelectItem>
                <SelectItem value={ClaimStatus.PAID}>Paid</SelectItem>
                <SelectItem value={ClaimStatus.REJECTED}>Rejected</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center border rounded-md">
              <Button
                variant={viewMode === "table" ? "secondary" : "ghost"}
                size="sm"
                className="rounded-r-none"
                onClick={() => setViewMode("table")}
                data-testid="button-view-table"
              >
                <LayoutList className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "cards" ? "secondary" : "ghost"}
                size="sm"
                className="rounded-l-none"
                onClick={() => setViewMode("cards")}
                data-testid="button-view-cards"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {Object.entries(statusCounts).map(([status, count]) => (
              <Badge
                key={status}
                variant="outline"
                className={cn(
                  "cursor-pointer",
                  statusFilter === status && "bg-primary text-primary-foreground"
                )}
                onClick={() => setStatusFilter(statusFilter === status ? "all" : status)}
                data-testid={`badge-filter-${status}`}
              >
                {status}: {count}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : filteredClaims.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No claims found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : viewMode === "table" ? (
            <Card className="border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[140px]">Claim ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>SLA</TableHead>
                    <TableHead className="w-[140px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClaims.map((claim) => (
                    <TableRow
                      key={claim.id}
                      className="cursor-pointer hover-elevate"
                      onClick={() => setSelectedClaim(claim)}
                      data-testid={`row-claim-${claim.id}`}
                    >
                      <TableCell className="font-mono text-sm font-medium">
                        {claim.claimNumber}
                      </TableCell>
                      <TableCell>
                        <ClaimStatusBadge status={claim.status} />
                      </TableCell>
                      <TableCell className="max-w-[150px] truncate">
                        {claim.providerName}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {claim.categoryName}
                      </TableCell>
                      <TableCell className="text-right font-mono font-semibold">
                        {formatCurrency(claim.totalAmount)}
                      </TableCell>
                      <TableCell>
                        <ConfidenceScore score={claim.confidenceScore} showLabel={false} size="sm" />
                      </TableCell>
                      <TableCell>
                        <SlaTimer deadline={claim.slaDeadline} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {claim.status === "pending" && (
                            <>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleApprove(claim);
                                }}
                                data-testid={`button-quick-approve-${claim.id}`}
                              >
                                <CheckCircle className="h-4 w-4 text-success" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleReject(claim);
                                }}
                                data-testid={`button-quick-reject-${claim.id}`}
                              >
                                <XCircle className="h-4 w-4 text-destructive" />
                              </Button>
                            </>
                          )}
                          {claim.status === "approved" && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSubmit(claim);
                              }}
                              data-testid={`button-quick-submit-${claim.id}`}
                            >
                              <Send className="h-4 w-4 text-primary" />
                            </Button>
                          )}
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredClaims.map((claim) => (
                <ClaimCard
                  key={claim.id}
                  claim={claim}
                  onView={setSelectedClaim}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onSubmit={handleSubmit}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedClaim && (
        <div className="hidden lg:block fixed right-0 top-0 h-full w-[400px] z-40">
          <ClaimDetailPanel
            claim={selectedClaim}
            onClose={() => setSelectedClaim(null)}
            onApprove={handleApprove}
            onReject={handleReject}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  );
}

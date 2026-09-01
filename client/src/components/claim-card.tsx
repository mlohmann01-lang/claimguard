import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClaimStatusBadge } from "./claim-status-badge";
import { ConfidenceScore } from "./confidence-score";
import { SlaTimer } from "./sla-timer";
import { Claim } from "@shared/schema";
import { cn } from "@/lib/utils";
import { 
  Eye, 
  CheckCircle, 
  XCircle, 
  Send,
  ChevronRight
} from "lucide-react";

interface ClaimCardProps {
  claim: Claim;
  onView?: (claim: Claim) => void;
  onApprove?: (claim: Claim) => void;
  onReject?: (claim: Claim) => void;
  onSubmit?: (claim: Claim) => void;
  className?: string;
  compact?: boolean;
}

export function ClaimCard({
  claim,
  onView,
  onApprove,
  onReject,
  onSubmit,
  className,
  compact = false,
}: ClaimCardProps) {
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
      year: "numeric",
    });
  };

  if (compact) {
    return (
      <Card 
        className={cn(
          "border hover-elevate cursor-pointer transition-colors",
          className
        )}
        onClick={() => onView?.(claim)}
        data-testid={`claim-card-${claim.id}`}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-medium">{claim.claimNumber}</span>
                  <ClaimStatusBadge status={claim.status} />
                </div>
                <p className="text-sm text-muted-foreground truncate mt-0.5">
                  {claim.providerName} - {claim.categoryName}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <SlaTimer deadline={claim.slaDeadline} />
              <span className="font-mono font-semibold text-sm">
                {formatCurrency(claim.totalAmount)}
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className={cn("border", className)}
      data-testid={`claim-card-${claim.id}`}
    >
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-base font-semibold">{claim.claimNumber}</span>
          <ClaimStatusBadge status={claim.status} />
        </div>
        <span className="font-mono text-lg font-bold">
          {formatCurrency(claim.totalAmount)}
        </span>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground text-xs mb-0.5">Provider</p>
            <p className="font-medium">{claim.providerName}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-0.5">Category</p>
            <p className="font-medium">{claim.categoryName}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-0.5">Service Date</p>
            <p className="font-mono">{formatDate(claim.serviceDate)}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-0.5">Participant</p>
            <p className="font-medium">{claim.participantName}</p>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t">
          <div className="flex items-center justify-between gap-4">
            <ConfidenceScore score={claim.confidenceScore} size="sm" />
            <SlaTimer deadline={claim.slaDeadline} />
          </div>
        </div>
        {claim.autoClaimEligible && (
          <div className="mt-3 px-3 py-2 rounded-md bg-success/10 border border-success/20">
            <p className="text-xs text-success font-medium flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5" />
              Eligible for auto-claim
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-2 pt-3 border-t">
        <Button variant="outline" size="sm" onClick={() => onView?.(claim)} data-testid="button-view-claim">
          <Eye className="h-4 w-4 mr-1.5" />
          View Details
        </Button>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onReject?.(claim)}
            className="text-destructive hover:text-destructive"
            data-testid="button-reject-claim"
          >
            <XCircle className="h-4 w-4 mr-1.5" />
            Reject
          </Button>
          {claim.status === "approved" ? (
            <Button size="sm" onClick={() => onSubmit?.(claim)} data-testid="button-submit-claim">
              <Send className="h-4 w-4 mr-1.5" />
              Submit
            </Button>
          ) : (
            <Button size="sm" onClick={() => onApprove?.(claim)} data-testid="button-approve-claim">
              <CheckCircle className="h-4 w-4 mr-1.5" />
              Approve
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

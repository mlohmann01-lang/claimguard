import { Claim } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { ClaimStatusBadge } from "./claim-status-badge";
import { ConfidenceScore } from "./confidence-score";
import { SlaTimer } from "./sla-timer";
import { ValidationResults } from "./validation-results";
import { AuditTrail } from "./audit-trail";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  X, 
  CheckCircle, 
  XCircle, 
  Send,
  ExternalLink,
  History,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ClaimDetailPanelProps {
  claim: Claim | null;
  onClose: () => void;
  onApprove?: (claim: Claim) => void;
  onReject?: (claim: Claim) => void;
  onSubmit?: (claim: Claim) => void;
  className?: string;
}

export function ClaimDetailPanel({
  claim,
  onClose,
  onApprove,
  onReject,
  onSubmit,
  className,
}: ClaimDetailPanelProps) {
  if (!claim) return null;

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

  const hasFailedValidations = claim.validationResults.some(r => r.status === "failed");
  const hasWarnings = claim.validationResults.some(r => r.status === "warning");

  return (
    <div 
      className={cn(
        "flex flex-col h-full border-l bg-background",
        className
      )}
      data-testid="claim-detail-panel"
    >
      <div className="flex items-center justify-between gap-4 p-4 border-b">
        <div className="flex items-center gap-3">
          <span className="font-mono text-lg font-semibold">{claim.claimNumber}</span>
          <ClaimStatusBadge status={claim.status} />
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} data-testid="button-close-panel">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xl font-bold">
                {formatCurrency(claim.totalAmount)}
              </span>
              <SlaTimer deadline={claim.slaDeadline} />
            </div>

            <ConfidenceScore score={claim.confidenceScore} size="md" />

            {(hasFailedValidations || hasWarnings) && (
              <div className={cn(
                "p-3 rounded-md flex items-start gap-2",
                hasFailedValidations 
                  ? "bg-destructive/10 border border-destructive/20" 
                  : "bg-warning/10 border border-warning/20"
              )}>
                <AlertTriangle className={cn(
                  "h-4 w-4 mt-0.5",
                  hasFailedValidations ? "text-destructive" : "text-warning"
                )} />
                <div className="text-sm">
                  <p className={cn(
                    "font-medium",
                    hasFailedValidations ? "text-destructive" : "text-warning"
                  )}>
                    {hasFailedValidations ? "Validation Failed" : "Warnings Detected"}
                  </p>
                  <p className="text-muted-foreground mt-0.5">
                    {hasFailedValidations 
                      ? "This claim has failed one or more compliance checks. Review required before approval."
                      : "This claim has warnings that should be reviewed before processing."
                    }
                  </p>
                </div>
              </div>
            )}

            {claim.autoClaimEligible && !hasFailedValidations && (
              <div className="p-3 rounded-md bg-success/10 border border-success/20">
                <p className="text-sm text-success font-medium flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4" />
                  Eligible for automatic processing
                </p>
              </div>
            )}
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground text-xs mb-1">Participant</p>
              <p className="font-medium">{claim.participantName}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">Plan ID</p>
              <p className="font-mono">{claim.planId}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">Provider</p>
              <p className="font-medium">{claim.providerName}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">Provider ID</p>
              <p className="font-mono">{claim.providerId}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">Category</p>
              <p className="font-medium">{claim.categoryName}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">Category Code</p>
              <p className="font-mono">{claim.categoryCode}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">Service Date</p>
              <p className="font-mono">{formatDate(claim.serviceDate)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">Submission Date</p>
              <p className="font-mono">{formatDate(claim.submissionDate)}</p>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground text-xs mb-1">Description</p>
              <p>{claim.description}</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground text-xs mb-1">Quantity</p>
              <p className="font-mono font-medium">{claim.quantity}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">Unit Price</p>
              <p className="font-mono font-medium">{formatCurrency(claim.unitPrice)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">Total</p>
              <p className="font-mono font-semibold">{formatCurrency(claim.totalAmount)}</p>
            </div>
          </div>

          <Separator />

          <Tabs defaultValue="validation" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="validation" data-testid="tab-validation">
                Validation
              </TabsTrigger>
              <TabsTrigger value="audit" data-testid="tab-audit">
                <History className="h-3.5 w-3.5 mr-1.5" />
                Audit Trail
              </TabsTrigger>
            </TabsList>
            <TabsContent value="validation" className="mt-4">
              <ValidationResults results={claim.validationResults} />
            </TabsContent>
            <TabsContent value="audit" className="mt-4">
              <AuditTrail entries={claim.auditTrail} />
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-card">
        <div className="flex items-center justify-between gap-3">
          <Button 
            variant="outline" 
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={() => onReject?.(claim)}
            data-testid="button-reject-claim-panel"
          >
            <XCircle className="h-4 w-4 mr-1.5" />
            Reject
          </Button>
          <div className="flex items-center gap-2">
            {claim.status === "approved" ? (
              <Button 
                size="sm" 
                onClick={() => onSubmit?.(claim)}
                data-testid="button-submit-claim-panel"
              >
                <Send className="h-4 w-4 mr-1.5" />
                Submit to NDIS
              </Button>
            ) : (
              <Button 
                size="sm" 
                onClick={() => onApprove?.(claim)}
                disabled={hasFailedValidations}
                data-testid="button-approve-claim-panel"
              >
                <CheckCircle className="h-4 w-4 mr-1.5" />
                Approve
              </Button>
            )}
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-3">
          This system does not provide advice. All decisions are logged for audit purposes.
        </p>
      </div>
    </div>
  );
}

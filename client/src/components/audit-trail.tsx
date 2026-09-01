import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuditEntry } from "@shared/schema";
import { cn } from "@/lib/utils";
import { 
  User, 
  Bot, 
  CheckCircle, 
  XCircle, 
  Edit, 
  Send,
  Eye,
  FileText,
  Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AuditTrailProps {
  entries: AuditEntry[];
  className?: string;
}

const actionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  created: FileText,
  viewed: Eye,
  approved: CheckCircle,
  rejected: XCircle,
  submitted: Send,
  modified: Edit,
  validated: Clock,
};

export function AuditTrail({ entries, className }: AuditTrailProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getActionIcon = (action: string) => {
    const lowerAction = action.toLowerCase();
    for (const [key, Icon] of Object.entries(actionIcons)) {
      if (lowerAction.includes(key)) {
        return Icon;
      }
    }
    return FileText;
  };

  return (
    <Card className={cn("border", className)} data-testid="audit-trail">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Audit Trail</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-4">
            {entries.map((entry, index) => {
              const ActionIcon = getActionIcon(entry.action);
              return (
                <div key={entry.id} className="relative pl-10" data-testid={`audit-entry-${entry.id}`}>
                  <div 
                    className={cn(
                      "absolute left-2 w-5 h-5 rounded-full flex items-center justify-center",
                      entry.isAutomated ? "bg-info/20" : "bg-muted"
                    )}
                  >
                    {entry.isAutomated ? (
                      <Bot className="h-3 w-3 text-info" />
                    ) : (
                      <User className="h-3 w-3 text-muted-foreground" />
                    )}
                  </div>
                  <div className="rounded-md border bg-card p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <ActionIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{entry.action}</span>
                        {entry.isAutomated && (
                          <Badge variant="secondary" className="text-xs px-1.5 py-0">
                            Automated
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">
                        {formatDate(entry.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{entry.details}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      by {entry.userName}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const ClaimStatus = {
  PENDING: "pending",
  FLAGGED: "flagged",
  APPROVED: "approved",
  SUBMITTED: "submitted",
  PAID: "paid",
  REJECTED: "rejected",
  PROCESSING: "processing",
} as const;

export type ClaimStatusType = (typeof ClaimStatus)[keyof typeof ClaimStatus];

export const ValidationStatus = {
  PASSED: "passed",
  FAILED: "failed",
  WARNING: "warning",
} as const;

export type ValidationStatusType = (typeof ValidationStatus)[keyof typeof ValidationStatus];

export const RuleCategory = {
  PRICING: "pricing",
  CATEGORY: "category",
  PROVIDER: "provider",
  DUPLICATION: "duplication",
  COMPLETENESS: "completeness",
  TIME_FREQUENCY: "time_frequency",
} as const;

export type RuleCategoryType = (typeof RuleCategory)[keyof typeof RuleCategory];

export interface Plan {
  id: string;
  participantName: string;
  planNumber: string;
  totalBudget: number;
  remainingBudget: number;
  startDate: string;
  endDate: string;
  categories: PlanCategory[];
  riskLevel: "low" | "medium" | "high";
  spendVelocity: number;
}

export interface PlanCategory {
  id: string;
  name: string;
  code: string;
  budget: number;
  spent: number;
  remaining: number;
}

export interface Provider {
  id: string;
  name: string;
  abn: string;
  registrationNumber: string;
  isRegistered: boolean;
  serviceCategories: string[];
  complianceScore: number;
  issueCount: number;
}

export interface Claim {
  id: string;
  claimNumber: string;
  planId: string;
  participantName: string;
  providerId: string;
  providerName: string;
  serviceDate: string;
  submissionDate: string;
  categoryCode: string;
  categoryName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  status: ClaimStatusType;
  confidenceScore: number;
  validationResults: ValidationResult[];
  slaDeadline: string;
  autoClaimEligible: boolean;
  auditTrail: AuditEntry[];
}

export interface ValidationResult {
  id: string;
  claimId: string;
  ruleId: string;
  ruleName: string;
  ruleCategory: RuleCategoryType;
  status: ValidationStatusType;
  message: string;
  explanation: string;
  details?: Record<string, unknown>;
}

export interface ValidationRule {
  id: string;
  name: string;
  category: RuleCategoryType;
  description: string;
  isActive: boolean;
  severity: "critical" | "warning" | "info";
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  action: string;
  userId: string;
  userName: string;
  details: string;
  isAutomated: boolean;
  previousState?: string;
  newState?: string;
}

export interface OutcomeMetrics {
  rejectionRate: number;
  rejectionRateTrend: number;
  autoClaimSuccessRate: number;
  autoClaimSuccessTrend: number;
  recoveredAmount: number;
  recoveredAmountTrend: number;
  complianceRiskScore: number;
  complianceRiskTrend: number;
  auditReadinessScore: number;
  auditReadinessTrend: number;
  totalClaimsProcessed: number;
  avgProcessingTime: number;
  pendingClaims: number;
  flaggedClaims: number;
}

export interface ClaimFilter {
  status?: ClaimStatusType[];
  dateRange?: { start: string; end: string };
  providerId?: string;
  categoryCode?: string;
  minAmount?: number;
  maxAmount?: number;
  confidenceThreshold?: number;
  autoClaimEligible?: boolean;
}

export const insertClaimSchema = z.object({
  planId: z.string().min(1),
  providerId: z.string().min(1),
  categoryCode: z.string().min(1),
  description: z.string().min(1),
  quantity: z.number().positive(),
  unitPrice: z.number().positive(),
  serviceDate: z.string(),
});

export type InsertClaim = z.infer<typeof insertClaimSchema>;

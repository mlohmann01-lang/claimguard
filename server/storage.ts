import { 
  type User, 
  type InsertUser, 
  type Claim, 
  type Plan, 
  type ValidationRule,
  type OutcomeMetrics,
  type ValidationResult,
  type AuditEntry,
  type PlanCategory,
  type InsertClaim,
  ClaimStatus,
  ValidationStatus,
  RuleCategory,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getClaims(): Promise<Claim[]>;
  getRecentClaims(limit?: number): Promise<Claim[]>;
  getFlaggedClaims(): Promise<Claim[]>;
  getClaim(id: string): Promise<Claim | undefined>;
  createClaim(data: InsertClaim): Promise<Claim>;
  deleteClaim(id: string): Promise<boolean>;
  updateClaimStatus(id: string, status: string): Promise<Claim | undefined>;
  
  getPlans(): Promise<Plan[]>;
  getPlan(id: string): Promise<Plan | undefined>;
  
  getValidationRules(): Promise<ValidationRule[]>;
  getRecentValidations(): Promise<any[]>;
  
  getMetrics(): Promise<OutcomeMetrics>;
}

function generateClaimNumber(): string {
  const prefix = "CLM";
  const year = new Date().getFullYear().toString().slice(-2);
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, "0");
  return `${prefix}-${year}-${random}`;
}

function generatePlanNumber(): string {
  const random = Math.floor(Math.random() * 10000000000).toString().padStart(10, "0");
  return random;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function createMockValidationResults(claimId: string, hasFailed: boolean = false, hasWarning: boolean = false): ValidationResult[] {
  const results: ValidationResult[] = [
    {
      id: randomUUID(),
      claimId,
      ruleId: "rule-1",
      ruleName: "NDIS Price Guide Limit",
      ruleCategory: RuleCategory.PRICING,
      status: hasFailed ? ValidationStatus.FAILED : ValidationStatus.PASSED,
      message: hasFailed ? "Unit price exceeds NDIS price guide maximum" : "Unit price within NDIS price guide limits",
      explanation: hasFailed 
        ? "The claimed unit price of $180.00 exceeds the maximum allowable rate of $150.00 for this service category as per the current NDIS Price Guide."
        : "The unit price has been validated against the current NDIS Price Guide and falls within the acceptable range for this service category.",
    },
    {
      id: randomUUID(),
      claimId,
      ruleId: "rule-2",
      ruleName: "Service Category Alignment",
      ruleCategory: RuleCategory.CATEGORY,
      status: ValidationStatus.PASSED,
      message: "Service matches plan category",
      explanation: "The claimed service aligns with the participant's funded support categories.",
    },
    {
      id: randomUUID(),
      claimId,
      ruleId: "rule-3",
      ruleName: "Provider Registration Check",
      ruleCategory: RuleCategory.PROVIDER,
      status: ValidationStatus.PASSED,
      message: "Provider is registered for this service type",
      explanation: "The provider's NDIS registration includes the service category claimed.",
    },
    {
      id: randomUUID(),
      claimId,
      ruleId: "rule-4",
      ruleName: "Duplicate Claim Detection",
      ruleCategory: RuleCategory.DUPLICATION,
      status: hasWarning ? ValidationStatus.WARNING : ValidationStatus.PASSED,
      message: hasWarning ? "Similar claim detected within 7 days" : "No duplicate claims detected",
      explanation: hasWarning
        ? "A claim with similar service details was submitted within the past 7 days. Please verify this is not a duplicate."
        : "No matching claims found in the recent submission history.",
    },
    {
      id: randomUUID(),
      claimId,
      ruleId: "rule-5",
      ruleName: "Required Fields Check",
      ruleCategory: RuleCategory.COMPLETENESS,
      status: ValidationStatus.PASSED,
      message: "All required fields present",
      explanation: "The claim contains all mandatory fields required for NDIS submission.",
    },
  ];
  
  return results;
}

function createMockAuditTrail(claimId: string): AuditEntry[] {
  const now = new Date();
  return [
    {
      id: randomUUID(),
      timestamp: addDays(now, -3).toISOString(),
      action: "Claim Created",
      userId: "user-1",
      userName: "Jane Doe",
      details: "Claim submitted via provider portal",
      isAutomated: false,
    },
    {
      id: randomUUID(),
      timestamp: addDays(now, -3).toISOString(),
      action: "Validation Executed",
      userId: "system",
      userName: "Autoclaim System",
      details: "Automatic validation rules applied",
      isAutomated: true,
    },
    {
      id: randomUUID(),
      timestamp: addDays(now, -2).toISOString(),
      action: "Claim Viewed",
      userId: "user-1",
      userName: "Jane Doe",
      details: "Claim details reviewed",
      isAutomated: false,
    },
  ];
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private claims: Map<string, Claim>;
  private plans: Map<string, Plan>;
  private validationRules: Map<string, ValidationRule>;

  constructor() {
    this.users = new Map();
    this.claims = new Map();
    this.plans = new Map();
    this.validationRules = new Map();
    this.seedData();
  }

  private seedData() {
    const now = new Date();
    
    const providers = [
      { id: "prov-1", name: "Allied Health Partners" },
      { id: "prov-2", name: "Community Care Services" },
      { id: "prov-3", name: "Therapeutic Solutions" },
      { id: "prov-4", name: "Disability Support Network" },
      { id: "prov-5", name: "Lifestyle Assist" },
    ];

    const categories = [
      { code: "01_001", name: "Assistance with Daily Life" },
      { code: "04_001", name: "Improved Daily Living Skills" },
      { code: "07_001", name: "Support Coordination" },
      { code: "09_001", name: "Increased Social and Community Participation" },
      { code: "15_001", name: "Improved Relationships" },
    ];

    const participants = [
      "Sarah Mitchell",
      "James Thompson",
      "Emily Chen",
      "Michael O'Brien",
      "Olivia Williams",
      "Daniel Kim",
      "Sophie Anderson",
      "Lucas Martinez",
    ];

    const planCategories: PlanCategory[] = [
      { id: "cat-1", name: "Core Supports", code: "01", budget: 45000, spent: 28500, remaining: 16500 },
      { id: "cat-2", name: "Capacity Building", code: "04", budget: 25000, spent: 12000, remaining: 13000 },
      { id: "cat-3", name: "Capital", code: "11", budget: 15000, spent: 8000, remaining: 7000 },
    ];

    participants.forEach((name, index) => {
      const planId = `plan-${index + 1}`;
      const startDate = addDays(now, -180 + index * 30);
      const endDate = addDays(startDate, 365);
      const totalBudget = 50000 + Math.floor(Math.random() * 100000);
      const spent = Math.floor(totalBudget * (0.3 + Math.random() * 0.4));
      
      this.plans.set(planId, {
        id: planId,
        participantName: name,
        planNumber: generatePlanNumber(),
        totalBudget,
        remainingBudget: totalBudget - spent,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        categories: planCategories.map(cat => ({
          ...cat,
          id: `${planId}-${cat.id}`,
          budget: Math.floor(cat.budget * (0.8 + Math.random() * 0.4)),
          spent: Math.floor(cat.spent * (0.6 + Math.random() * 0.8)),
          remaining: Math.floor(cat.remaining * (0.5 + Math.random() * 1)),
        })),
        riskLevel: index % 3 === 0 ? "high" : index % 3 === 1 ? "medium" : "low",
        spendVelocity: 0.7 + Math.random() * 0.6,
      });
    });

    const statuses = [
      ClaimStatus.PENDING,
      ClaimStatus.PENDING,
      ClaimStatus.PENDING,
      ClaimStatus.FLAGGED,
      ClaimStatus.FLAGGED,
      ClaimStatus.APPROVED,
      ClaimStatus.APPROVED,
      ClaimStatus.SUBMITTED,
      ClaimStatus.PAID,
      ClaimStatus.REJECTED,
    ];

    for (let i = 0; i < 20; i++) {
      const claimId = `claim-${i + 1}`;
      const provider = providers[i % providers.length];
      const category = categories[i % categories.length];
      const participant = participants[i % participants.length];
      const status = statuses[i % statuses.length];
      const planId = `plan-${(i % participants.length) + 1}`;
      
      const quantity = 1 + Math.floor(Math.random() * 5);
      const unitPrice = 80 + Math.floor(Math.random() * 100);
      const totalAmount = quantity * unitPrice;
      const confidenceScore = status === ClaimStatus.FLAGGED ? 0.5 + Math.random() * 0.3 : 0.75 + Math.random() * 0.25;
      
      const hasFailed = status === ClaimStatus.FLAGGED && Math.random() > 0.5;
      const hasWarning = status === ClaimStatus.FLAGGED && !hasFailed;

      this.claims.set(claimId, {
        id: claimId,
        claimNumber: generateClaimNumber(),
        planId,
        participantName: participant,
        providerId: provider.id,
        providerName: provider.name,
        serviceDate: addDays(now, -Math.floor(Math.random() * 14)).toISOString(),
        submissionDate: addDays(now, -Math.floor(Math.random() * 7)).toISOString(),
        categoryCode: category.code,
        categoryName: category.name,
        description: `${category.name} service - ${quantity} unit(s)`,
        quantity,
        unitPrice,
        totalAmount,
        status,
        confidenceScore,
        validationResults: createMockValidationResults(claimId, hasFailed, hasWarning),
        slaDeadline: addDays(now, 1 + Math.floor(Math.random() * 5)).toISOString(),
        autoClaimEligible: confidenceScore >= 0.9 && status === ClaimStatus.PENDING,
        auditTrail: createMockAuditTrail(claimId),
      });
    }

    const rules: ValidationRule[] = [
      {
        id: "rule-1",
        name: "NDIS Price Guide Limit",
        category: RuleCategory.PRICING,
        description: "Validates that claimed unit prices do not exceed the NDIS Price Guide maximum rates",
        isActive: true,
        severity: "critical",
      },
      {
        id: "rule-2",
        name: "Service Category Alignment",
        category: RuleCategory.CATEGORY,
        description: "Ensures claimed services match the participant's funded support categories",
        isActive: true,
        severity: "critical",
      },
      {
        id: "rule-3",
        name: "Provider Registration Check",
        category: RuleCategory.PROVIDER,
        description: "Verifies the provider is registered with NDIS for the claimed service type",
        isActive: true,
        severity: "critical",
      },
      {
        id: "rule-4",
        name: "Duplicate Claim Detection",
        category: RuleCategory.DUPLICATION,
        description: "Identifies potential duplicate claims based on service date, provider, and amount",
        isActive: true,
        severity: "warning",
      },
      {
        id: "rule-5",
        name: "Required Fields Check",
        category: RuleCategory.COMPLETENESS,
        description: "Validates all mandatory fields are present and correctly formatted",
        isActive: true,
        severity: "critical",
      },
      {
        id: "rule-6",
        name: "Service Frequency Limit",
        category: RuleCategory.TIME_FREQUENCY,
        description: "Checks that services do not exceed maximum allowable frequency per period",
        isActive: true,
        severity: "warning",
      },
      {
        id: "rule-7",
        name: "Budget Remaining Check",
        category: RuleCategory.PRICING,
        description: "Verifies sufficient funds remain in the relevant category",
        isActive: true,
        severity: "warning",
      },
      {
        id: "rule-8",
        name: "Plan Date Validity",
        category: RuleCategory.TIME_FREQUENCY,
        description: "Confirms the service date falls within the plan period",
        isActive: true,
        severity: "critical",
      },
    ];

    rules.forEach(rule => this.validationRules.set(rule.id, rule));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getClaims(): Promise<Claim[]> {
    return Array.from(this.claims.values()).sort((a, b) => 
      new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime()
    );
  }

  async getRecentClaims(limit: number = 10): Promise<Claim[]> {
    const claims = await this.getClaims();
    return claims.slice(0, limit);
  }

  async getFlaggedClaims(): Promise<Claim[]> {
    const claims = await this.getClaims();
    return claims.filter(c => c.status === ClaimStatus.FLAGGED);
  }

  async getClaim(id: string): Promise<Claim | undefined> {
    return this.claims.get(id);
  }

  async createClaim(data: InsertClaim): Promise<Claim> {
    const now = new Date();
    const id = randomUUID();
    const plan = await this.getPlan(data.planId);
    
    const categories: Record<string, string> = {
      "01_001": "Assistance with Daily Life",
      "04_001": "Improved Daily Living Skills",
      "07_001": "Support Coordination",
      "09_001": "Increased Social and Community Participation",
      "15_001": "Improved Relationships",
    };

    const claim: Claim = {
      id,
      claimNumber: generateClaimNumber(),
      planId: data.planId,
      participantName: plan?.participantName || "Unknown Participant",
      providerId: data.providerId,
      providerName: this.getProviderName(data.providerId),
      serviceDate: data.serviceDate,
      submissionDate: now.toISOString(),
      categoryCode: data.categoryCode,
      categoryName: categories[data.categoryCode] || data.categoryCode,
      description: data.description,
      quantity: data.quantity,
      unitPrice: data.unitPrice,
      totalAmount: data.quantity * data.unitPrice,
      status: ClaimStatus.PENDING,
      confidenceScore: 0.85 + Math.random() * 0.15,
      validationResults: createMockValidationResults(id),
      slaDeadline: addDays(now, 5).toISOString(),
      autoClaimEligible: false,
      auditTrail: [
        {
          id: randomUUID(),
          timestamp: now.toISOString(),
          action: "Claim Created",
          userId: "user-1",
          userName: "Jane Doe",
          details: "Claim submitted via API",
          isAutomated: false,
        },
        {
          id: randomUUID(),
          timestamp: now.toISOString(),
          action: "Validation Executed",
          userId: "system",
          userName: "Autoclaim System",
          details: "Automatic validation rules applied",
          isAutomated: true,
        },
      ],
    };

    this.claims.set(id, claim);
    return claim;
  }

  async deleteClaim(id: string): Promise<boolean> {
    const claim = this.claims.get(id);
    if (!claim) return false;
    
    this.claims.delete(id);
    return true;
  }

  private getProviderName(providerId: string): string {
    const providers: Record<string, string> = {
      "prov-1": "Allied Health Partners",
      "prov-2": "Community Care Services",
      "prov-3": "Therapeutic Solutions",
      "prov-4": "Disability Support Network",
      "prov-5": "Lifestyle Assist",
    };
    return providers[providerId] || "Unknown Provider";
  }

  async updateClaimStatus(id: string, status: string): Promise<Claim | undefined> {
    const claim = this.claims.get(id);
    if (!claim) return undefined;

    const now = new Date().toISOString();
    const updatedClaim: Claim = {
      ...claim,
      status: status as any,
      auditTrail: [
        ...claim.auditTrail,
        {
          id: randomUUID(),
          timestamp: now,
          action: `Claim ${status.charAt(0).toUpperCase() + status.slice(1)}`,
          userId: "user-1",
          userName: "Jane Doe",
          details: `Status changed to ${status}`,
          isAutomated: false,
        },
      ],
    };

    this.claims.set(id, updatedClaim);
    return updatedClaim;
  }

  async getPlans(): Promise<Plan[]> {
    return Array.from(this.plans.values());
  }

  async getPlan(id: string): Promise<Plan | undefined> {
    return this.plans.get(id);
  }

  async getValidationRules(): Promise<ValidationRule[]> {
    return Array.from(this.validationRules.values());
  }

  async getRecentValidations(): Promise<any[]> {
    const claims = await this.getClaims();
    const validations: any[] = [];

    claims.slice(0, 10).forEach(claim => {
      claim.validationResults.forEach(result => {
        validations.push({
          timestamp: claim.submissionDate,
          claimNumber: claim.claimNumber,
          ruleName: result.ruleName,
          status: result.status,
          message: result.message,
        });
      });
    });

    return validations.slice(0, 20);
  }

  async getMetrics(): Promise<OutcomeMetrics> {
    const claims = await this.getClaims();
    const totalClaims = claims.length;
    const rejectedClaims = claims.filter(c => c.status === ClaimStatus.REJECTED).length;
    const pendingClaims = claims.filter(c => c.status === ClaimStatus.PENDING).length;
    const flaggedClaims = claims.filter(c => c.status === ClaimStatus.FLAGGED).length;
    const autoEligible = claims.filter(c => c.autoClaimEligible).length;

    return {
      rejectionRate: totalClaims > 0 ? (rejectedClaims / totalClaims) * 100 : 0,
      rejectionRateTrend: -2.3,
      autoClaimSuccessRate: totalClaims > 0 ? (autoEligible / totalClaims) * 100 + 60 : 85,
      autoClaimSuccessTrend: 4.7,
      recoveredAmount: 47200,
      recoveredAmountTrend: 12.5,
      complianceRiskScore: 15,
      complianceRiskTrend: -3.2,
      auditReadinessScore: 92,
      auditReadinessTrend: 2.1,
      totalClaimsProcessed: 1247,
      avgProcessingTime: 4.2,
      pendingClaims,
      flaggedClaims,
    };
  }
}

export const storage = new MemStorage();

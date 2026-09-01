# ClaimGuard / AutoClaim — Canonical Build Plan

Date: 2026-09-01
Status: ACTIVE
Repository: `mlohmann01-lang/claimguard`

## Build objective

Turn the existing full-stack prototype into a production-grade Plan Manager claims/compliance/remediation platform while preserving the original Plan Manager ICP and reserving provider-side Get Me Paid as a later expansion.

## Current foundation

Already present in the repository:

- React/TypeScript UI;
- Express/TypeScript backend;
- PostgreSQL/Drizzle architecture;
- claim, plan, provider, validation, audit and outcome domain concepts;
- claim status lifecycle;
- validation categories;
- AutoClaim eligibility;
- dashboard/product surfaces.

The current implementation should be treated as a prototype foundation, not production proof.

## Build sequence

### C0 — Repository governance & baseline

Goal: establish build discipline before adding domain complexity.

Deliver:

- canonical architecture/build/venture docs;
- environment/run instructions;
- migration strategy;
- test harness and CI baseline;
- secret/config handling;
- versioning doctrine;
- data-fixture policy;
- no-production-claim policy for synthetic evidence.

Exit: reproducible build/test baseline and clean architecture record.

### C1 — Canonical NDIS Transaction Model

Replace/extend loose interface-only domain objects with versioned persisted primitives.

Minimum persisted entities:

- Tenant/PlanManagerOrganisation;
- Participant;
- Plan/PlanFundingPeriod/Category;
- Provider;
- Invoice;
- InvoiceLine;
- CanonicalClaim;
- ClaimLine;
- EvidenceArtifact;
- RuleDefinition/RuleVersion;
- RuleEvaluation;
- ClaimDecision;
- Submission;
- ClaimOutcome;
- Remittance;
- ProviderPayment/Reimbursement;
- AuditEvent.

Requirements:

- tenant isolation;
- Decimal/currency safety;
- immutable source evidence;
- effective/as-of time;
- deterministic identities/idempotency;
- source/provenance fingerprints.

### C2 — Invoice Intake & Canonicalisation

Input adapters:

- upload/email-style file intake abstraction;
- CSV/import path;
- structured API intake contract;
- OCR/document extraction adapter interface.

Do not make OCR the moat. Extraction should emit evidence with confidence and source locations and must fail closed on critical ambiguity.

Exit: invoices can be reproducibly transformed into canonical claims with complete source lineage.

### C3 — Versioned NDIS Rule Engine

Implement effective-date-aware rules with machine-readable outcomes.

Initial rule families:

- completeness;
- participant/plan;
- provider/ABN/registration;
- support item/category;
- price/quantity/rate;
- plan/category/funding-period availability;
- date eligibility;
- duplication;
- time/frequency;
- evidence requirements;
- registration-dependent claiming conditions;
- plan-manager organisation policy.

Each evaluation returns:

- PASS/WARN/BLOCK;
- rule ID/version;
- effective date;
- evidence references;
- reason/explanation;
- remediability class;
- evidence ceiling/uncertainty.

### C4 — Decision, Review & Governance Workflow

Implement:

- claim readiness;
- approval/rejection/override;
- human review queue;
- actor/role/authority record;
- reason codes;
- previous/new state;
- SLA/ageing;
- audit replay;
- organisation-level thresholds and policy.

Exit: every material claim decision is explainable and reconstructable.

### C5 — AutoClaim Construction & Submission Foundation

Implement vendor-neutral submission contracts:

- claim payload construction;
- bulk/export adapter;
- API adapter interface;
- submission idempotency;
- status polling/event ingestion;
- rejection/error mapping;
- remittance ingestion.

Use fake/sandbox adapters before real NDIA integration.

### C6 — Remediation Engine

Introduce `ClaimException` and `RemediationCase`.

Required classifications:

- provider correction required;
- participant confirmation required;
- plan-manager correction allowed;
- missing evidence;
- incorrect support/rate/category;
- registration/provider issue;
- duplication;
- funding/budget issue;
- non-remediable/close;
- external review/manual escalation.

State machine:

`OPEN → DIAGNOSED → ACTION_REQUIRED → WAITING_EXTERNAL | READY_TO_CORRECT → CORRECTED → RESUBMITTED → RESOLVED | FAILED | CLOSED`

Track remediation strategy, evidence requested/received, elapsed time, attempts and eventual outcome.

### C7 — Payment & Reconciliation

Separate claim acceptance from money movement.

Track:

- submission;
- NDIA outcome;
- remittance;
- funds received;
- provider/reimbursement payable;
- provider/reimbursement paid;
- reconciliation exception.

Required metrics:

- first-pass acceptance;
- claim-to-remittance;
- claim-to-provider-payment;
- unreconciled value;
- recovered claim value;
- exception ageing.

### C8 — Outcome & Remediation Intelligence

Create a versioned learning substrate around:

`claim facts + rule outcomes + provider/support context + exception + remediation path + final outcome`

V1 ranking may be deterministic/statistical but must not become opaque authority.

Outputs may include:

- common exception causes;
- provider/support-item exception rate;
- remediation success by strategy;
- processing/manual-touch benchmarks;
- likely required evidence;
- recommended next remediation action with evidence and limitations.

### C9 — Production Integration & Security

Add authorised real integrations based on first design partner stack.

Requirements:

- tenant IAM;
- least privilege;
- encryption/secrets;
- audit export;
- retention/deletion policy;
- observability;
- durable jobs/retries;
- backups/recovery;
- rate limits;
- production migration discipline.

### C10 — Provider-side Get Me Paid Foundation

Do not begin until Plan Manager transaction kernel is stable.

Add provider objective and `DeliveredSupport`/Revenue Readiness surfaces while reusing canonical rule/evidence/payment primitives.

Capabilities:

- service-delivery intake;
- revenue readiness;
- evidence completeness;
- invoice construction/routing;
- payment expectation;
- plan-manager/provider follow-up;
- rejection diagnosis/remediation;
- reconciliation;
- Revenue at Risk / Protected / Recovered.

Keep Plan Manager and Provider authority/data boundaries separate even when transaction concepts are shared.

## MVP/design-partner slice

The recommended first sellable slice is not the entire roadmap.

Build through a coherent vertical slice:

`invoice intake → canonical claim → high-value deterministic rules → PASS/WARN/BLOCK → review/override → audit evidence → fake submission/outcome → exception/remediation case`.

Then connect the actual plan-manager platform/NDIA path used by the first design partner.

## Competitive product requirements

Because competitors already offer OCR and 50+ checks, the demo must visibly prove capabilities beyond extraction:

1. effective-date rule versioning;
2. exact decision lineage;
3. explainable PASS/WARN/BLOCK;
4. human override governance;
5. remediation case creation;
6. outcome tracking;
7. repeated-exception learning;
8. audit/reconstruction pack.

## Engineering doctrines

- deterministic rules before LLM judgement for material compliance decisions;
- version every rule and calculation;
- immutable evidence and append-only material state history;
- fail closed on missing critical context;
- no hidden cross-tenant learning leakage;
- no raw production data in repo fixtures;
- no claim of regulatory/commercial proof from synthetic tests;
- no provider-side scope creep before Plan Manager kernel is credible.

## Current next build

**C0 + C1** should be the next engineering programme: establish repository governance/tests and convert the prototype domain into a persisted canonical NDIS transaction model. C2/C3 can then be built without entrenching the current loose interfaces.
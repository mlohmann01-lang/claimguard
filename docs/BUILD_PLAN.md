# ClaimGuard / AutoClaim — Canonical Build Plan

Date: 2026-09-02
Status: ACTIVE — PROMOTED HARVEST 6/COMPETITIVE DOCTRINE
Repository: `mlohmann01-lang/claimguard`

## Build objective

Turn the existing full-stack prototype into a production-grade **NDIS-native transaction integrity, claims automation, remediation and payment-assurance platform** for Plan Managers first, while reserving provider-side Get Me Paid as a later expansion.

The product must be able to compete directly with Profenso/Transformr on invoice automation while deliberately building beyond them into historical rule reproducibility, exception completion, payment reconciliation, provider integrity and outcome learning.

## Product boundary

Do not build another generic plan-management system.

Do not make OCR or `number of checks` the moat.

Do not require rip-and-replace of MYP or another Plan Management system.

ClaimGuard should operate as an overlay/control/intelligence layer around the existing system of record.

## Current foundation

Already present:

- React/TypeScript UI;
- Express/TypeScript backend;
- PostgreSQL/Drizzle architecture;
- claim, plan, provider, validation, audit and outcome concepts;
- claim lifecycle;
- validation categories;
- AutoClaim eligibility;
- outcome metrics including recovered amount, rejection rate, compliance risk and audit readiness.

Treat this as prototype foundation, not production proof.

## Canonical build sequence

### C0 — Repository Governance & Baseline

Deliver:

- canonical build/venture/competitive docs;
- reproducible run/test baseline;
- migration/versioning discipline;
- CI;
- config/secret handling;
- fixture/synthetic-evidence doctrine;
- no-commercial-proof-from-test-data rule.

Exit: clean engineering baseline.

### C1 — Canonical NDIS Support Transaction Model

The central domain object should evolve beyond `Invoice` into a canonical support/claim transaction.

Persisted primitives should include:

- Tenant/PlanManagerOrganisation;
- Participant;
- Plan;
- FundingPeriod;
- SupportCategory;
- Provider;
- ProviderStatusSnapshot;
- ServiceEvent/DeliveredSupport reservation;
- Invoice/InvoiceLine;
- CanonicalClaim/ClaimLine;
- EvidenceArtifact;
- RuleDefinition/RuleVersion;
- RuleEvaluation;
- ClaimDecision;
- DecisionSnapshot;
- Submission;
- ClaimOutcome;
- Remittance;
- ProviderPayment/Reimbursement;
- PaymentBeneficiarySnapshot;
- AuditEvent.

Requirements:

- tenant isolation;
- immutable evidence;
- effective/as-of time;
- deterministic identities/idempotency;
- currency/decimal safety;
- complete provenance.

### C2 — Invoice Intake & Canonicalisation

Deliver competitor-parity ingestion:

- upload;
- email-style intake abstraction;
- CSV/import;
- structured API contract;
- OCR/document extraction adapter;
- participant/provider matching;
- confidence/source-location evidence;
- ambiguity quarantine.

Exit: invoices become reproducible canonical claim transactions.

### C3 — NDIS Temporal Rule Graph

Build the first major moat.

Rules require:

- stable rule ID;
- version;
- source/reference;
- effective-from/effective-to;
- scope/applicability;
- precedence/supersession relationship;
- deterministic test cases;
- evidence requirements;
- remediation class;
- output severity.

Initial rule families:

- completeness;
- participant/plan/funding period;
- provider identity/ABN/registration/enrolment;
- support item/category;
- price/rate/quantity;
- service date eligibility;
- duplication;
- time/frequency;
- evidence requirements;
- registration-dependent conditions;
- plan-manager-specific policy.

Output:

`PASS | WARN | BLOCK`

with exact rule/version, evidence, reason and uncertainty.

Exit: ClaimGuard can replay a historical transaction under the exact rule set applicable at the time.

### C4 — Claim Decision Twin & Governance

For every material decision create immutable decision-time truth:

`canonical transaction + evidence state + participant/plan state + provider state + rule evaluations + actor + authority + override + decision`

Deliver:

- review queue;
- approval/rejection/override;
- actor/role/authority record;
- reason codes;
- previous/new state;
- decision snapshot;
- audit reconstruction;
- organisation thresholds/policy.

Exit: every material decision can be reconstructed later without depending on mutable present-day state.

### C5 — Straight-Through Claim Construction & AutoClaim

Build direct competitive parity and commercial wedge.

Deliver:

- claim readiness;
- clean-claim straight-through path;
- claim payload construction;
- batch/export adapters;
- API adapter contract;
- idempotent submission;
- status/event ingestion;
- rejection/error mapping;
- remittance ingestion;
- safe correction boundaries.

Use fake/sandbox adapters until authorised real integration exists.

### C6 — Exception Completion / Remediation Engine

This is a central competitive differentiation.

Introduce:

- `ClaimException`;
- `RemediationCase`;
- `RemediationAction`;
- `ExternalEvidenceRequest`;
- `RemediationOutcome`.

Classifications include:

- provider correction required;
- participant confirmation required;
- plan-manager correction permitted;
- missing evidence;
- incorrect support/rate/category;
- provider/registration issue;
- duplicate;
- funding/budget issue;
- non-remediable;
- manual/external escalation.

State machine:

`OPEN → DIAGNOSED → ACTION_REQUIRED → WAITING_EXTERNAL | READY_TO_CORRECT → CORRECTED → REVALIDATED → RESUBMITTED → RESOLVED | FAILED | CLOSED`

Track attempts, elapsed time, evidence, remediation strategy and final payment outcome.

Exit: ClaimGuard proves it can finish exceptions rather than merely flag them.

### C7 — Payment & Reconciliation Assurance

Approval is not completion.

Track:

`submitted → accepted/rejected/review → remittance → funds received → provider/reimbursement payable → payment → reconciled/exception`

Add:

- payment beneficiary snapshots;
- beneficiary-change event/risk flag;
- reconciliation cases;
- claim/payment mismatch detection;
- payment delay and unreconciled value.

Metrics:

- claim-to-remittance;
- claim-to-provider-payment;
- unreconciled value;
- recovered/remediated value;
- exception ageing.

### C8 — Provider Integrity Passport

Build longitudinal, explainable provider integrity rather than a black-box fraud score.

Persist evidence-backed signals for:

- provider identity/status history;
- registration/enrolment periods;
- support-category history;
- exception/rejection rate;
- repeated evidence defects;
- repeat remediation patterns;
- unusual claim velocity/spend acceleration;
- beneficiary changes;
- participant dispute/confirmation signals.

The Passport must separate fact, rule violation, anomaly, inference and human conclusion.

### C9 — Integrity Shadow Mode & Plausibility Engine

Introduce integrity controls safely.

Three distinct layers:

1. transaction compliance;
2. transaction plausibility;
3. network integrity.

Initial mode:

`OBSERVE → WARN → ESCALATE`

No automatic fraud accusation or high-impact block from opaque anomaly detection.

Potential plausibility controls:

- impossible/implausible service-time overlaps;
- abnormal volume/velocity;
- abrupt spend acceleration;
- repeated unusual invoice structures;
- inconsistent evidence/service patterns;
- high-risk beneficiary/provider changes.

Output must include evidence and explanation.

### C10 — Proof-of-Service & Participant Protection

Build risk-triggered evidence escalation rather than blanket participant friction.

Support optional evidence adapters for:

- booking/roster evidence;
- provider-system service records;
- support documentation;
- worker/service attestations;
- participant confirmation when policy/risk requires it.

Every evidence request must carry purpose, scope and retention constraints.

### C11 — Integrity Receipt

Produce machine-readable/exportable transaction evidence pack containing, where applicable:

- participant/plan authority;
- provider suitability;
- support eligibility;
- price/quantity outcome;
- evidence state;
- beneficiary state;
- rule-set fingerprint;
- decision/override lineage;
- submission/payment/reconciliation status.

Exit: a completed transaction can be reconstructed and exported for audit/dispute/assurance.

### C12 — Outcome, Remediation & Operational Intelligence

Create the learning substrate:

`transaction facts + rule context + provider/support context + exception + remediation + claim outcome + payment outcome`

Outputs:

- common exception causes;
- provider/support-item exception rate;
- remediation success by strategy;
- likely missing evidence;
- manual-touch benchmarks;
- historical rule/policy impact;
- recommended remediation with evidence ceiling;
- repeat-defect detection.

Do not let a learned model become approval authority.

### C13 — Production Integrations, Security & Scale

Prioritise adapters based on design-partner stack.

Requirements:

- tenant IAM;
- least privilege;
- encryption/secrets;
- durable jobs/retries;
- audit export;
- retention/deletion controls;
- observability;
- backups/recovery;
- rate limiting;
- production migrations;
- privacy/security review.

### C14 — Integrity Graph / Network Intelligence Foundation

Only after lawful data/tenancy boundaries are proven.

Model explainable relationships among:

- provider;
- ABN/organisation;
- participant;
- service event;
- claim;
- worker where lawfully available;
- payment beneficiary;
- plan manager.

Purpose: identify repeated patterns and relationships that single-invoice checks miss.

Privacy minimisation and tenant separation are mandatory. Cross-customer signals must not be introduced without explicit legal/product design.

### C15 — Provider-side Get Me Paid

Only after the Plan Manager transaction kernel is stable.

Add:

`DeliveredSupport → Revenue Ready → Invoice → Routing → Expected Payment → Exception → Remediation → Collected → Reconciled`

Metrics:

- Revenue at Risk;
- Revenue Ready;
- Revenue Protected;
- Revenue Recovered.

Keep Provider and Plan Manager authority/data boundaries separate.

## Competitive MVP / design-partner slice

The first commercially demonstrable slice should prove both parity and differentiation:

`invoice intake → canonical transaction → temporal rules → PASS/WARN/BLOCK → straight-through clean claim → governed review/override → Decision Twin → exception/remediation case → fake outcome/payment → Integrity Receipt`

This is materially stronger than a demo that merely shows OCR and dozens of checks.

## Claims Integrity Baseline — commercial delivery capability

Build a shadow-analysis mode capable of taking 60–90 days of historical transactions and returning:

- candidate STP rate;
- human touch rate;
- exception taxonomy;
- repeat-defect providers;
- rule/evidence gaps;
- rework estimate;
- delayed/unreconciled value;
- reconstruction gaps;
- integrity observations;
- ROI/integration roadmap.

This should become a design-partner acquisition tool as well as a product capability.

## Competitive acceptance tests

ClaimGuard should not be described as competitively ready until it can visibly prove:

1. invoice ingestion/extraction parity;
2. high-value deterministic NDIS checks;
3. effective-date rule replay;
4. exact decision lineage;
5. explainable PASS/WARN/BLOCK;
6. governed override;
7. clean-claim STP path;
8. remediation case creation and closure;
9. payment/reconciliation state;
10. provider longitudinal integrity signals;
11. audit-ready Integrity Receipt;
12. shadow-mode analysis of historical transactions.

## Engineering doctrines

- deterministic rules before LLM judgement for material compliance decisions;
- version every rule/calculation;
- immutable evidence and append-only material history;
- preserve decision-time truth;
- fail closed on missing critical context;
- distinguish fact, anomaly, inference and decision;
- no opaque model may become sole fraud/claim authority;
- no hidden cross-tenant learning leakage;
- no production data in repo fixtures;
- no regulatory/commercial proof claimed from synthetic tests;
- no provider-side scope creep before the Plan Manager kernel is credible.

## Current next build

**C0 + C1 remain the immediate engineering programme**, but C1 must now reserve the entities required by the promoted strategy: `ProviderStatusSnapshot`, `DecisionSnapshot`, `PaymentBeneficiarySnapshot`, temporal rule applicability and the future `ServiceEvent/DeliveredSupport` boundary.

After C1, build **C2 + C3 + C4 as one coherent vertical foundation** so invoice ingestion does not entrench a document-centric architecture before the Temporal Rule Graph and Claim Decision Twin exist.
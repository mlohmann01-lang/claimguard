# ClaimGuard / AutoClaim — Idea & Venture Plan

Date: 2026-09-02
Status: CANONICAL VENTURE PLAN — PROMOTED

## Mission

Build the NDIS-native transaction integrity, claims automation, remediation and payment-assurance layer for Plan Managers first, with provider-side Get Me Paid as a later expansion on the same transaction intelligence substrate.

## Original ICP — preserved

The original customer remains the **NDIS Plan Manager**.

ClaimGuard must not be repositioned as a provider-practice-management product. Plan Managers remain the initial buyer because their economics depend on processing high invoice volumes accurately and efficiently while carrying increasing integrity, evidence, audit and payment-accountability obligations.

## Category

Near-term customer-facing category:

**NDIS Claims & Revenue Assurance for Plan Managers**

Strategic category direction:

**NDIS Transaction Integrity & Payment Assurance**

Internal platform thesis:

**NDIS Transaction Intelligence Engine**

## Product promise

> **Process good claims automatically. Resolve exceptions faster. Prove every decision.**

Extended promise:

> Receive the invoice. Know whether it is valid under the rules that applied at the time. Fix what can lawfully be fixed. Submit the right claim. Track it through payment. Reconcile the outcome. Learn from every exception.

## Competitive doctrine

Profenso and Tecala/Transformr validate the market; they do not close it.

ClaimGuard must match the current market baseline:

- multi-channel invoice intake;
- OCR/document extraction;
- participant/provider matching;
- ABN/provider/registration checks;
- price/support-item/date/quantity/duplicate validation;
- plan-manager-specific rules;
- straight-through processing;
- safe correction where authorised;
- exception queues;
- audit trail;
- existing-system integration;
- cost/touch/cycle-time analytics.

But ClaimGuard must not compete on `OCR accuracy + number of checks` alone. The product must deliberately move the buying criteria toward:

1. effective-date rule governance;
2. historical decision reproducibility;
3. exception completion rather than exception detection;
4. payment and reconciliation closure;
5. provider integrity and behavioural risk;
6. evidence exportability and audit reconstruction;
7. governed override and authority;
8. remediation and outcome learning.

## Canonical strategic wedges

### W1 — Claims Automation

Land by solving today's obvious problem:

`invoice → extraction → validation → PASS | WARN | BLOCK → straight-through or review`

This is required functionality and remains commercially sellable even though competitors exist.

### W2 — Temporal Rule Graph

Every material rule must carry source, version, effective-from/effective-to dates, scope, precedence/supersession and test evidence.

The platform must answer:

> **Was this transaction valid under the exact rule set that applied on the service/decision date?**

This enables historical replay, transition-rule handling and regulatory defensibility.

### W3 — Claim Decision Twin

For every material claim decision, preserve the decision-time state:

`transaction facts + evidence + participant/plan state + provider state + rule versions + evaluations + actor/authority + override + decision`

This is not current truth; it is reproducible **decision-time truth**.

### W4 — Remediation Engine

ClaimGuard must not stop at identifying an exception.

`exception → diagnosis → lawful remediation path → evidence/correction request → revalidation → resubmission → final outcome`

The product should learn which remediation paths work under which conditions.

### W5 — Payment & Reconciliation Assurance

Approval is not completion.

Track:

`submission → NDIA outcome → remittance → funds received → provider/reimbursement payment → reconciliation`

Surface unreconciled value, delayed value, payment exceptions and beneficiary changes.

### W6 — Provider Integrity Layer

Move beyond individual invoice validity into longitudinal provider behaviour.

Potential signals include:

- identity/registration/enrolment state over time;
- support-category history;
- exception/rejection rates;
- repeated evidence defects;
- unusual claim velocity/spend acceleration;
- bank-beneficiary changes;
- participant dispute/confirmation signals;
- suspicious relationships and repeated transaction patterns.

No automated fraud accusation should arise from a single opaque score. Integrity signals must be explainable, evidence-linked and reviewable.

### W7 — Integrity Graph / Network Intelligence

Longer-term, model lawful relationships among participants, providers, claims, service events, workers, payment beneficiaries and organisations to identify risks not visible within one invoice.

This is a future moat, not an excuse to centralise unnecessary sensitive data. Privacy, lawful purpose, tenant separation and evidence minimisation remain constraints.

### W8 — Proof-of-Service / Participant Protection

Where risk warrants it, support risk-triggered evidence escalation rather than blanket participant friction.

Possible evidence may include provider-system evidence, booking/roster records, service documentation and participant confirmation where appropriate.

### W9 — Integrity Receipt

Create a machine-readable evidence bundle for each completed transaction showing, where applicable:

- participant/plan authority;
- provider suitability;
- support eligibility;
- price/quantity validation;
- evidence status;
- beneficiary state;
- rule-set version;
- decision and override lineage;
- submission/payment/reconciliation state.

The Integrity Receipt should be exportable for audit, dispute and assurance workflows.

### W10 — Get Me Paid

Provider-side expansion remains later and uses the same transaction substrate from the opposite objective:

> **Turn delivered NDIS services into clean, compliant, collected revenue.**

## Fraud and integrity doctrine

ClaimGuard should address NDIS fraud and non-compliance without becoming a crude `fraud score` product.

Use three separate concepts:

1. **Transaction compliance** — does the transaction satisfy applicable rules and evidence requirements?
2. **Transaction plausibility** — does the claimed service event make sense given time, place, quantity and available evidence?
3. **Network integrity** — do relationships and repeated patterns across actors indicate unusual or concerning behaviour?

Start in **Shadow Mode** for integrity features:

`OBSERVE → WARN → ESCALATE → CONSTRAIN → PREVENT`

Do not autonomously block high-impact transactions solely from probabilistic anomaly detection without explicit policy and review authority.

## Commercial wedge

Initial sales motion:

### ClaimGuard Claims Integrity Baseline

Run 60–90 days of historical transactions in shadow mode and return:

- candidate straight-through-processing rate;
- human touch rate;
- exception taxonomy;
- repeat-defect providers;
- rule/evidence gaps;
- cost of rework;
- payment-delay/unreconciled exposure;
- historical decision-reconstruction gaps;
- integrity observations;
- integration roadmap;
- ROI model.

This lets ClaimGuard prove value before displacing an incumbent workflow.

## Sales positioning

### Challenger reframe

> **Invoice automation is becoming table stakes. The next operating-cost and risk problem is the exception-to-payment lifecycle.**

### Core economic message

> **Your Plan Management fee is fixed. Your claims workload and integrity burden aren't.**

### No-rip-and-replace message

> **ClaimGuard sits above your existing Plan Management stack.**

### Human-work message

> **Let clean claims flow. Put people only where judgment is needed.**

### Differentiation question

> **If 70% of claims flow straight through, what does your operating model do with the 30% that cannot?**

## Product metric hierarchy

Primary:

- cost per resolved transaction;
- manual touches per transaction;
- straight-through-processing rate;
- first-pass acceptance rate;
- exception resolution rate/time;
- claim-to-payment cycle time;
- unreconciled value;
- recovered/remediated value;
- historical decision reconstruction time.

Secondary:

- invoices/claims processed;
- warnings/blocks;
- provider-specific exception patterns;
- override frequency;
- evidence completeness;
- repeat-defect rate;
- integrity observations requiring review.

## Long-term moat

The moat is the accumulated corpus of:

`service/transaction facts → rule context → evidence → decision → exception → remediation → submission → payment → reconciliation → outcome`

This can compound into:

- Temporal Rule Graph;
- Claim Decision Twin corpus;
- Remediation Graph;
- provider integrity history;
- transaction-pattern intelligence;
- plan-manager benchmarks;
- eventual privacy-preserving cross-customer integrity signals;
- provider-side revenue assurance.

## Strategic expansion path

`Claims Automation → Temporal Rule Graph → Decision Twin → Remediation → Payment/Reconciliation → Provider Integrity → Integrity Network → Get Me Paid`

Maintain one canonical transaction/evidence/rule architecture across these surfaces wherever legally and commercially appropriate.
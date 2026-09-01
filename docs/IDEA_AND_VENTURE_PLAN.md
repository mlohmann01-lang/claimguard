# ClaimGuard / AutoClaim — Idea & Venture Plan

Date: 2026-09-01
Status: CANONICAL VENTURE PLAN

## Mission

Build the claims, compliance, remediation and payment-intelligence operating layer for NDIS Plan Managers first, with provider-side revenue assurance and Get Me Paid as a later expansion on the same transaction intelligence substrate.

## Original ICP — preserved

The original customer is the **NDIS Plan Manager**.

ClaimGuard/AutoClaim should not be repositioned as a provider-practice-management product. Plan Managers remain the initial buyer because their operating economics depend on processing large invoice volumes accurately, compliantly and efficiently under a fixed plan-management fee model.

## Category

Customer-facing category:

**NDIS Claims & Revenue Assurance for Plan Managers**

Internal platform thesis:

**NDIS Transaction Intelligence Engine**

## Product promise

> Receive the invoice. Know whether it is valid. Fix what can be fixed. Submit the right claim. Track it through payment. Learn from every exception.

## Existing product foundation

The current repository already includes:

- claim lifecycle states;
- plan/budget entities;
- provider registration/compliance concepts;
- validation rules across pricing, category, provider, duplication, completeness and time/frequency;
- audit trail;
- AutoClaim eligibility;
- outcome metrics including rejection rate, recovery, compliance risk and audit readiness;
- full-stack React/TypeScript/PostgreSQL prototype architecture.

The opportunity is therefore not to invent the product from zero, but to harden the domain, rules, evidence, integrations and remediation loop into a production-grade operating system.

## Competitive reality

AI invoice processing is no longer whitespace. Current market entrants already offer OCR/extraction, dozens of invoice checks, existing-plan-management-platform integration and approval-ready processing.

Therefore ClaimGuard must NOT position around:

- OCR;
- `AI invoice processing`;
- generic 50+ checks;
- invoice-to-approval automation alone.

Those are expected capabilities.

## Differentiation doctrine

ClaimGuard should compound value in areas that remain strategically stronger:

1. **Versioned effective-date rules** — every decision can be reproduced against the rule set that was actually in force.
2. **Claim decision lineage** — invoice/evidence → canonical claim → rule evaluations → decision → submission → outcome.
3. **Governance and fiduciary proof** — why a claim was allowed, warned, blocked, overridden or remediated.
4. **Remediation intelligence** — not only identify an invalid/rejected claim, but determine what can lawfully be corrected and how.
5. **Outcome learning** — learn which claim patterns, providers, support items and remediation paths lead to successful outcomes.
6. **Cross-workflow revenue assurance** — validation, claim construction, rejection handling, remittance and provider payment state in one model.
7. **Two-sided future intelligence** — the same canonical transaction can later power provider-side `Get Me Paid` without rewriting the Plan Manager product.

## Canonical product components

### 1. ClaimGuard — Validate

`Invoice received → canonical claim → evidence/rule evaluation → PASS | WARN | BLOCK`

Rule domains should include at minimum:

- invoice completeness;
- participant/plan relationship;
- provider identity/ABN/registration state;
- support item/category;
- price/rate/quantity;
- plan/category/funding-period availability;
- service date and plan dates;
- duplication;
- frequency/time constraints;
- registration-dependent claiming restrictions;
- evidence requirements;
- plan-manager-specific controls and policies.

### 2. AutoClaim — Construct & Submit

For claims eligible to proceed:

- construct submission payload;
- preserve claim/submission version;
- submit through authorised integration/export path;
- monitor claim outcome;
- attach remittance/advice/payment evidence;
- maintain idempotency and replay safety.

### 3. Remediation Engine — Fix Exceptions

For WARN/BLOCK/rejected claims:

- classify cause;
- determine remediability;
- distinguish provider correction, participant confirmation, plan-manager action and non-remediable rejection;
- request missing/corrected evidence;
- reconstruct claim where allowed;
- resubmit;
- measure time and eventual outcome.

The product should learn `failure pattern → remediation path → outcome`.

### 4. Payment & Reconciliation — Close the Loop

Track:

`submitted → accepted/rejected/review → remittance → NDIA payment → provider/reimbursement payment → reconciled/exception`

Key outcome metrics:

- first-pass acceptance rate;
- rejection rate;
- manual-touch rate;
- remediation success rate;
- average remediation time;
- claim-to-payment cycle time;
- unreconciled value;
- recovered claim value;
- claims prevented from invalid submission.

### 5. ProviderOps / Get Me Paid — future expansion

Provider-side expansion uses the same canonical transaction model but reverses the customer objective:

> **Turn delivered services into clean, compliant, collected revenue.**

Potential future provider-side components:

- DeliveredSupport readiness;
- pre-invoice revenue assurance;
- evidence completeness;
- invoice construction;
- routing by participant management method;
- invoice/claim tracking;
- plan-manager/provider follow-up;
- rejection diagnosis;
- remediation/resubmission;
- payment reconciliation;
- Revenue at Risk / Revenue Protected / Revenue Recovered.

This is a later product surface. It must not displace Plan Managers as the initial customer.

## Canonical transaction lifecycle

`RECEIVED → EXTRACTED → CANONICALISED → VALIDATING → PASS | WARN | BLOCK → APPROVED → SUBMITTED → PROCESSING → PAID | REJECTED | REVIEW → REMEDIATING → RESUBMITTED → PAID | CLOSED_EXCEPTION`

Provider payment/reimbursement state should be modelled separately from NDIA claim-payment state.

## Evidence and authority doctrine

- An LLM may extract or explain; it must not be the source of claim legality or effective approval authority.
- Rule decisions must be deterministic/versioned where possible.
- Every override requires actor, reason, time, prior state and new state.
- Every claim outcome must remain reproducible as-of the decision time.
- Missing or ambiguous critical evidence fails closed or escalates.
- No claim should be described as compliant merely because it passed a probabilistic extraction step.

## Moat

The long-term moat is not OCR. It is the accumulated corpus of:

`transaction facts → rule context → decision → exception → remediation → claim outcome → payment outcome`

This enables:

- provider/support-item risk patterns;
- exception prediction;
- remediation ranking;
- policy/rule impact analysis;
- plan-manager operational benchmarking;
- first-pass acceptance optimisation;
- eventual provider-side revenue assurance.

## Commercial wedge

Initial pitch:

> **ClaimGuard reduces the cost and risk of processing NDIS invoices by validating every claim against a reproducible rule and evidence trail, automatically progressing clean claims, and working exceptions through to resolution.**

Do not lead with AI. Lead with:

- lower processing cost;
- higher first-pass acceptance;
- fewer invalid claims;
- faster exception resolution;
- stronger audit/fiduciary evidence;
- fewer manual touches per invoice.

## Product metric hierarchy

Primary:

- cost per invoice processed;
- manual touches per invoice;
- first-pass claim acceptance;
- exception resolution rate/time;
- value successfully processed and reconciled.

Secondary:

- invoices/claims processed;
- auto-claim eligibility;
- warnings/blocks;
- provider-specific exception patterns;
- audit readiness.

## Strategic expansion path

`Plan Manager ClaimGuard → AutoClaim → Remediation → Payment/Reconciliation → Provider-side Get Me Paid → broader NDIS Revenue Assurance`

Maintain one canonical transaction/evidence/rule architecture across both sides wherever legally and commercially appropriate.
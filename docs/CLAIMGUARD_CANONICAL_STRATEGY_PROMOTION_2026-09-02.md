# ClaimGuard — Canonical Strategy Promotion

Date: 2026-09-02
Status: PROMOTED / CANONICAL

## Decision

Promote the Harvest 6 / Profenso / Tecala-Transformr competitive analysis into ClaimGuard product, engineering and GTM doctrine.

ClaimGuard will compete directly for NDIS Plan Manager claims automation opportunities while deliberately building beyond invoice automation into NDIS-native transaction integrity and payment assurance.

## Locked category progression

Near-term:

**NDIS Claims & Revenue Assurance for Plan Managers**

Strategic direction:

**NDIS Transaction Integrity & Payment Assurance**

Internal architecture:

**NDIS Transaction Intelligence Engine**

## Locked competitive doctrine

1. Do not concede invoice automation to Profenso or Transformr.
2. Match table-stakes intake, extraction, validation, STP, exceptions, audit and integration capabilities.
3. Do not compete primarily on OCR accuracy or number of checks.
4. Shift buyer criteria toward effective-date rule governance, decision reproducibility, exception completion, payment reconciliation, provider integrity, audit evidence and outcome learning.
5. Treat Profenso as a specialised early-category validator and Transformr/Tecala as an enterprise automation validator; neither is assumed to have captured the broader Plan Manager market.
6. Competitor gaps inferred from public material must be used as discovery questions unless independently verified, not asserted as fact.

## Locked moat sequence

`Claims Automation → Temporal Rule Graph → Claim Decision Twin → Remediation → Payment/Reconciliation → Provider Integrity → Integrity Shadow Mode → Proof-of-Service → Integrity Receipt → Outcome Intelligence → Integrity Graph → Get Me Paid`

## Locked core message

> **Process good claims automatically. Resolve exceptions faster. Prove every decision.**

Supporting messages:

> **Your Plan Management fee is fixed. Your claims workload and integrity burden aren't.**

> **ClaimGuard sits above your existing Plan Management stack.**

> **Let clean claims flow. Put people only where judgment is needed.**

## Locked sales reframe

> **Invoice automation is becoming table stakes. The next operating-cost and risk problem is the exception-to-payment lifecycle.**

Key discovery question:

> **If 70% of your claims flow straight through, what does your operating model do with the 30% that cannot?**

## Locked commercial wedge

### ClaimGuard Claims Integrity Baseline

Use 60–90 days of historical transactions in shadow mode to quantify:

- candidate STP rate;
- human touch rate;
- exception taxonomy;
- repeat-defect providers;
- rule/evidence gaps;
- rework burden;
- payment delay/unreconciled exposure;
- historical decision reconstruction gaps;
- explainable integrity observations;
- ROI and integration roadmap.

This is both a design-partner acquisition motion and a product capability.

## Fraud/integrity doctrine

ClaimGuard must separate:

1. transaction compliance;
2. transaction plausibility;
3. network integrity.

No opaque risk model may autonomously accuse a provider of fraud or become sole approval/block authority.

Integrity features should progress through:

`OBSERVE → WARN → ESCALATE → CONSTRAIN → PREVENT`

with evidence, policy and authority appropriate to consequence.

## Immediate engineering consequence

C0/C1 remain next, but the canonical data model must reserve/support:

- effective/as-of rule state;
- `ProviderStatusSnapshot`;
- `DecisionSnapshot`;
- `PaymentBeneficiarySnapshot`;
- evidence provenance;
- `ServiceEvent/DeliveredSupport` boundary;
- append-only material decision history.

Then C2/C3/C4 should be delivered as a coherent foundation:

`Invoice Intake → Canonical Transaction → Temporal Rule Graph → PASS/WARN/BLOCK → Claim Decision Twin`

This prevents a document-centric design from becoming the architecture.

## Source documents

- `docs/IDEA_AND_VENTURE_PLAN.md`
- `docs/BUILD_PLAN.md`
- `docs/COMPETITIVE_PLAN_PROFENSO_TRANSFORMR_2026-09-02.md`
- `docs/HARVEST_6_2026-09-01.md`

Future builds must preserve this direction unless explicitly superseded by a dated strategic decision.
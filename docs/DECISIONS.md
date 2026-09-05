# Jaipur Instant Home Services — Decision Log v1.0

## D-001 — Prototype before production integrations
Phase 1 is a clickable/simulated product prototype. Client needs it to validate the concept with local providers before finalizing services and pricing.

## D-002 — Pending means pending
The implementation must never invent final service categories, pricing formulas, retry timing, subscription lifecycle or extra-work UX.

## D-003 — 5 km hard cap
Matching never expands beyond 5 km.

## D-004 — Server timestamp wins
Acceptance winner is determined by authoritative server timestamp.

## D-005 — Simple bilingual provider UX
Provider interface is English/Hindi and deliberately low-complexity.

## D-006 — Completion requires evidence
Completion requires a photo and swipe-to-complete.

## D-007 — Payment follows completion
Customer payment happens only after job completion.

## D-008 — Mock integrations behind boundaries
Prototype uses mock services so production integrations can later replace them without redesigning the domain model.

## D-009 — No unsafe bank-debit shortcut
Automatic bank debit for cash commission recovery is not implemented without an appropriate mandate/authorization mechanism.

## D-010 — Security is architectural
Access control, protected data and transaction integrity are not deferred to the final polish stage.

## D-011 — Exact-address exposure is a production review
The prototype can demonstrate the current client requirement, but production privacy/safety treatment requires review.

## D-012 — Product-specific visual language
The UI must not converge to generic AI-generated SaaS patterns.

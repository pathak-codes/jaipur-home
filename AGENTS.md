# Jaipur Instant Home Services — OpenCode Project Rules

## Mission
Build the Jaipur Instant Home Services product according to the project documentation. AI is an implementation/review tool, not the product owner.

## Mandatory reading
Before making a meaningful change, read the relevant:
- docs/PRD.md
- docs/REQUIREMENTS.md
- docs/DECISIONS.md
- docs/DOMAIN_MODEL.md
- docs/JOB_STATE_MACHINE.md
- docs/UX_SPEC.md
- docs/DESIGN_SYSTEM.md
- docs/ARCHITECTURE.md
- docs/SECURITY.md
- docs/PROTOTYPE_SCOPE.md

Do not load every document unnecessarily for tiny unrelated tasks; load the documents relevant to the requested change.

## Non-negotiable rules

1. Never invent business requirements.
2. Never convert PENDING into an implementation assumption.
3. Never change a CONFIRMED business rule silently.
4. Never bypass the job state machine.
5. Never allow UI state alone to become business truth.
6. Never fabricate production integrations.
7. Prototype integrations must be clearly separated behind services/interfaces.
8. Do not add dependencies without a reason.
9. Do not use generic AI/SaaS UI patterns when the design system specifies otherwise.
10. Do not perform broad refactors during focused feature work.
11. Do not delete existing functionality to make a task easier.
12. Do not create fake APIs that look production-ready while hiding that they are mocks.
13. Use fictional data only in the prototype.
14. Never place secrets in source control.
15. Preserve financial records conceptually as append-only ledger entries.

## AI smell prevention

Before implementation:
- identify the exact requirement(s)
- identify affected domain entities
- identify affected state transitions
- identify existing components/services to reuse
- identify dependencies required
- identify assumptions

If a necessary product decision is not documented:
STOP and report the missing decision instead of inventing one.

## UI rules

- No generic landing-page boilerplate.
- No unnecessary gradients/glassmorphism.
- No random card nesting.
- No arbitrary icon changes.
- No inconsistent radii/spacing.
- No decorative animation without UX purpose.
- Use the project design system.
- Provider UI must remain simple and bilingual.
- Every implemented asynchronous state needs appropriate loading/error/empty handling.

## Code rules

- TypeScript strictness should be preserved.
- Prefer small cohesive modules.
- Avoid premature abstractions.
- Avoid giant components.
- Keep domain logic outside presentation components.
- Validate external/user input.
- Use semantic names.
- Do not hide important logic inside clever one-liners.

## Change protocol

For non-trivial work, first produce a short plan containing:
1. requirements
2. affected files
3. domain/state impact
4. implementation steps
5. verification steps
6. assumptions, if any

Do not edit until the plan is approved when operating in Plan mode.

## Verification

Before reporting completion:
- run typecheck
- run lint
- run relevant tests
- inspect the diff
- manually verify the affected flow
- report any unresolved issue honestly

## Git

Prefer small, focused commits.
Do not combine unrelated changes.
Never commit secrets.

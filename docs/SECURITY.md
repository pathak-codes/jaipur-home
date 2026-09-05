# Security and Data Handling v1.0

## Principles

Security is part of product correctness, not a final phase.

## Roles
At minimum:
- customer
- provider
- admin

Every protected action must check authorization server-side in production.

## Data isolation
Customer A must not read Customer B's private information.
Provider A must not read Provider B's private information.
Provider must only access data needed for current jobs.
Admin access is privileged and should be explicit.

## KYC
KYC documents are sensitive.
Store them separately from normal profile data.
Do not expose document URLs directly to normal users.
Production retention/deletion requires legal review.

## Location
Live provider location is sensitive.
Access should be limited to the active job and appropriate participants.
Exact home address visibility is a production review item.

## Phone numbers
Do not expose phone numbers through public profile APIs.
Current business rule permits current-job visibility after the relevant 30-second rule.

## Financial data
Use append-only wallet transactions.
Never silently rewrite historical transactions.
Corrections should be adjustment/reversal entries.

## Job integrity
The backend must be authoritative for:
- provider eligibility
- acceptance winner
- job ownership
- job state
- completion
- payment state
- commission

## Admin actions
Admin operations that affect users, providers, jobs or financial records should be auditable in production even though audit logs are not part of Phase 1 UI.

## Secrets
- never hardcode API keys
- never commit .env files
- use environment variables
- use test/sandbox credentials for prototype integrations

## Prototype rule
All people, addresses, IDs, payment references and KYC documents in the prototype must be fictional.

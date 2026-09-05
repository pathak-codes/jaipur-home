# Technical Architecture v1.0

## Phase 1 architecture

Frontend-first prototype with a clean domain/service boundary so mocked integrations can later be replaced.

Recommended stack:
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui where appropriate
- Motion for intentional interaction animation
- Zod for runtime validation where useful
- React Hook Form for complex forms if needed
- Supabase as future backend/data layer
- Git/GitHub

Do not install every library up front. Install only dependencies justified by the implementation plan.

## Suggested structure

app/
  (marketing)/
  customer/
  provider/
  admin/
  auth/

components/
  ui/
  customer/
  provider/
  admin/
  shared/

domain/
  users/
  providers/
  services/
  requests/
  jobs/
  matching/
  payments/
  wallets/
  notifications/
  complaints/
  reviews/

services/
  matching/
  payment/
  notification/
  location/
  verification/

data/
  demo/

lib/
  validation/
  utils/
  constants/

types/

docs/

.opencode/
  agents/
  commands/
  skills/

## Service boundaries

MatchingService
- Prototype: deterministic demo matching.
- Production later: geographic eligibility + server timestamp race.

PaymentService
- Prototype: simulated success/failure.
- Production later: actual payment provider.

NotificationService
- Prototype: in-app simulation.
- Production later: push/SMS/email as required.

LocationService
- Prototype: deterministic simulated provider movement.
- Production later: real location updates.

VerificationService
- Prototype: simulated verification stages.
- Production later: OTP/KYC/call/admin workflow.

SubscriptionService
- Prototype: simulated active/inactive state.
- Production later: recurring billing.

## Data principles
- One canonical entity model.
- No screen-specific duplicate business objects.
- Financial history is append-only.
- IDs are stable.
- Dates/times are represented consistently.
- UI cannot be the authority for business-state transitions.

## Prototype data
Use a small but coherent seed dataset:
- 5–8 demo providers
- multiple skills
- varied verification states
- varied ratings
- at least one active customer request
- transaction history
- wallet examples

Use fictional data only.

## Environment
No real secrets in repository.
Use .env.local for local secrets when integrations are introduced.
Never commit secrets.

## Testing
Before declaring a feature complete:
- typecheck
- lint
- targeted tests where applicable
- manual UI flow
- responsive check
- inspect changed files/diff

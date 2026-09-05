# UX Specification v1.0

## Global UX rules

- Mobile-first.
- English/Hindi switch.
- Provider interface uses plain language and strong visual cues.
- Primary action is visually obvious.
- Avoid dense enterprise dashboards for provider screens.
- Avoid generic AI SaaS hero patterns.
- Every important asynchronous state needs loading, success, failure and empty treatment.
- Do not hide critical business information behind decorative UI.

## Customer flow

### C01 Landing
Purpose: establish trust and provide immediate role selection.
Primary actions:
- I Need a Service
- I Provide Services

### C02 Customer Home
Show service categories, current active request/job if present, wallet/refund balance and recent activity.

### C03 Service Selection
Show configurable service categories with English/Hindi names.

### C04 Request Form
Fields:
- problem description (required)
- photo (optional)
- location

CTA:
Request Service

### C05 Matching
Show:
- finding nearby providers
- 5 km matching boundary
- provider count / offer progress
- clear waiting state

Do not expose invented backend details.

### C06 Provider Accepted
Show provider identity, verification, rating, experience, service and ETA.

### C07 Tracking
Show map/tracking simulation, provider movement, ETA and distance.
Show on-the-way notification.

### C08 Arrival
Clear arrived state.

### C09 Completion
Show completed-job summary and payment action.

### C10 Payment
Methods:
- Online
- Cash

Show final amount using configurable demo pricing.

### C11 Success
Show payment success, invoice access and review CTA.

### C12 Review
Rating + optional text.

## Provider flow

### P01 Provider onboarding
Keep fields grouped and explain why sensitive information is required.

### P02 Verification
Show progress:
Documents → OTP → Call → Admin approval.

### P03 Provider Home
Primary controls:
- Available/Unavailable
- current job
- wallet/earnings
- notifications

### P04 Incoming Job
Show:
- service
- customer problem
- location/address according to current client requirement
- 30-second timer
- Accept / Reject

### P05 Active Job
Show journey status:
Accepted → On the Way → Arrived → Complete.

### P06 Completion
Completion photo first, then swipe-to-complete.

### P07 Earnings
Show today's earnings, wallet balance, transactions and settlement state.

### P08 Subscription
Show ₹100/month subscription status.

## Admin flow

Admin can use denser desktop-oriented layouts.

Core screens:
- dashboard
- provider verification
- users
- providers
- jobs
- transactions
- complaints

Admin actions must respect PRD restrictions.

## Accessibility
- touch targets should be comfortable on mobile
- do not rely on color alone for status
- maintain readable Hindi text
- labels must remain understandable without icons

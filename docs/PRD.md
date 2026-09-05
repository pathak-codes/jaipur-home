# Jaipur Instant Home Services — Master PRD v1.0

## Status
Working baseline for Phase 1 prototype.

## 1. Product
A Jaipur-focused hyperlocal home-services platform connecting customers with nearby verified service providers. It is not intended to be an Urban Company clone; its core interaction is fast local dispatch.

## 2. Phase 1 Objective
Create a clickable, realistic prototype that lets the client demonstrate Customer, Provider, and Admin flows to prospective providers and stakeholders.

Real production integrations are NOT required in Phase 1. Payment, GPS, push notifications, KYC, matching, subscription and settlement may be simulated, but the domain model and intended state transitions must remain realistic.

## 3. Users

### Customer
Requests services, tracks providers, pays after completion, rates/reviews, raises complaints.

### Provider
Registers, submits KYC, selects skills, controls availability, receives matching jobs, accepts/rejects, navigates, completes jobs, manages earnings/wallet and ₹100/month subscription.

### Admin
Initially one admin. Verifies providers, manages users/providers, views jobs/complaints/financial information. Admin cannot manually assign active jobs or cancel active accepted jobs.

## 4. Product Principles
- English + Hindi.
- Provider UI must be simple.
- Verification, payment history and notifications are first-class features.
- Access control is mandatory.
- Business rules are explicit and deterministic.
- Pending business decisions must remain configurable.
- Avoid generic AI/SaaS visual patterns.

## 5. Homepage
Two primary paths:
- Customer: “I Need a Service”
- Provider: “I Provide Services”

Use clear visual cues and a language switch.

## 6. Customer Request
Required:
- service
- problem description
- location

Optional:
- photo

Video is not mandatory.

## 7. Matching
Eligible provider:
- verified
- available
- matching requested skill
- within 5 km

Send request to nearest 10 eligible providers.

Acceptance window: 30 seconds.

The first acceptance by authoritative server timestamp wins.

After one provider accepts, remaining offers disappear/reject.

If initial 10 fail, perform one additional final retry. Do not expand beyond 5 km.

Exact retry timing is pending and must remain configurable.

## 8. Provider Visibility
Customer can see provider:
- photo
- name
- verification badge
- experience
- rating/reviews
- joining date
- happy-customer count
- skills
- live location after acceptance
- ETA/distance

Current client requirement says provider sees exact customer address before accepting. Prototype may demonstrate this, but production privacy treatment requires review.

Phone numbers remain hidden initially and may become visible after 30 seconds following acceptance for the current job only.

## 9. Tracking
After acceptance, customer sees provider live location, ETA and distance. Provider journey ends at arrival. Prototype may simulate movement.

## 10. Cancellation
First 30 seconds: no penalty.

After 30 seconds: ₹50 penalty.

Customer cancellation penalty is added to the next order.

Latest confirmed client rule: if provider cancellation requires a new request, the customer creates the new request. Any distinction between cancellation inside/outside the grace period must be explicitly documented before production.

## 11. Completion and Payment
Provider:
1. reaches customer
2. uploads mandatory completion photo
3. uses swipe-to-complete

Payment appears only after completion.

Payment methods:
- online
- cash

Invoice/receipt is automatically generated.

## 12. Pricing and Commission
Provider subscription: ₹100/month.

Platform commission: 20%.

Final five services and exact pricing formula are still pending. Do not hardcode example prices as business rules.

Extra work/parts may increase the final amount and the 20% commission applies to the resulting total under the current business direction. Exact entry/approval UX remains pending.

## 13. Wallets
Provider wallet:
- earnings
- cancellation penalties
- adjustments
- transaction history
- UPI withdrawal

Target settlement: daily, within 24 hours.

Customer wallet:
- refund balance only
- usable 100% on a future service
- no withdrawal under current rules

Automatic bank debit for cash-commission recovery must not be implemented without an appropriate authorization/mandate/payment architecture.

## 14. KYC
Provider registration includes:
- name
- address
- experience
- government ID
- photo
- email
- skills
- emergency contact
- optional certificates/education documents

OTP is mandatory.

Verification requires documents + OTP + call verification + admin approval.

Incomplete verification blocks job offers.

KYC retention policy requires legal/data review before production.

## 15. Notifications
Prototype should demonstrate:
- new job offer
- acceptance timer
- provider accepted
- provider on the way
- provider near arrival
- provider arrived
- completion
- payment
- settlement/withdrawal
- verification status
- complaint/support updates

## 16. SOS
Basic SOS only:
- current location
- emergency contact
- admin/support alert

Microphone recording is not part of the current requirement.

## 17. Complaints
Complaint contains:
- description
- photos

Payment details and job details are automatically attached.

## 18. Admin
Dashboard should show:
- new users
- new providers
- total users
- total providers
- active/completed jobs
- earnings
- commission
- profit
- pending verification
- complaints

Admin can approve, suspend, remove and edit users/providers and inspect transactions/jobs.

Admin cannot manually assign active jobs or cancel active accepted jobs.

## 19. Security
Top priority:
- authentication
- authorization
- role-based access
- user/provider data isolation
- protected admin area
- protected KYC
- transaction integrity
- server-authoritative job transitions

Financial records remain available according to the retention requirement even after account deletion.

## 20. Job State Machine
CREATED → MATCHING → OFFERED → ACCEPTED → ON_THE_WAY → ARRIVED → COMPLETION_PENDING → COMPLETED → PAYMENT_PENDING → PAID → REVIEWED

Cancellation is a controlled branch from valid states.

## 21. Prototype Scope
Customer:
Landing → Service → Request → Matching → Provider → Tracking → Completion → Payment → Invoice → Review.

Provider:
Landing → Registration/KYC → Dashboard → Availability → Incoming Request → Accept → Job → Completion → Earnings.

Admin:
Login → Dashboard → Verification → Users/Providers → Jobs → Transactions → Complaints.

## 22. Prototype Non-Goals
Do not build real:
- payment gateway
- bank auto-debit
- KYC API
- OTP provider
- production GPS
- push infrastructure
- recurring subscription billing
- advanced analytics
- multi-admin roles
- production legal/compliance automation

## 23. Deferred Decisions
- final five services
- service/sub-service structure
- exact pricing formula
- pricing versioning
- exact retry timing
- extra work/parts UX
- subscription renewal/expiry/grace behavior
- cash commission recovery mechanism
- KYC retention
- exact-address production policy
- “happy customer” definition
- “profit” definition
- detailed cancellation edge cases

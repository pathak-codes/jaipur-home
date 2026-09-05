# Domain Model v1.0

## Purpose
Define the core business entities so UI, prototype logic and future backend logic use the same vocabulary.

## Core entities

### User
Represents a customer account.
Key fields:
- id
- name
- mobile
- email
- profile_photo
- address/location references
- emergency_contact
- account_status
- created_at
- updated_at

### Provider
Represents a service professional.
Key fields:
- id
- user/account identity
- name
- mobile
- email
- photo
- address
- experience_years
- availability_status
- verification_status
- joining_date
- rating_summary
- happy_customer_count
- subscription_status
- created_at
- updated_at

Sensitive KYC documents must be separated from normal provider profile data.

### ProviderSkill
Many-to-many relationship between Provider and Service.
Fields:
- provider_id
- service_id
- specialization
- status

### Service
A service category offered on the platform.
The final five launch services are pending. Prototype uses configurable demo services.

Fields:
- id
- name_en
- name_hi
- slug
- active
- display_order

### ServiceRequest
Customer's request before/while matching.
Fields:
- id
- customer_id
- service_id
- description
- photo references
- requested location
- status
- created_at
- expires_at

### Job
The accepted service engagement.
Fields:
- id
- service_request_id
- customer_id
- provider_id
- status
- accepted_at
- arrived_at
- completed_at
- completion_photo
- base_amount
- extra_amount
- final_amount
- commission_amount
- payment_status
- cancellation_reason

### JobOffer
A request sent to an eligible provider.
Fields:
- id
- job/request id
- provider_id
- offered_at
- expires_at
- accepted_at
- rejected_at
- status

This is important for the nearest-10 dispatch model.

### LocationEvent
Provider/customer location updates relevant to an active job.
Prototype may use simulated coordinates.
Production should use time-limited access.

### Payment
Represents customer payment after completion.
Fields:
- id
- job_id
- customer_id
- amount
- method
- gateway_reference
- status
- paid_at

### Wallet
Provider or customer balance container.
Provider wallet supports earnings and adjustments.
Customer wallet is refund balance only.

### WalletTransaction
Immutable ledger entry.
Fields:
- id
- wallet_id
- type
- amount
- reference_type
- reference_id
- description
- created_at

Never mutate financial history to “fix” it. Add an adjustment/reversal entry.

### Subscription
Provider's ₹100/month subscription.
Exact renewal/expiry behavior is pending.

### KYCVerification
Separate sensitive verification record.
Fields:
- provider_id
- document_type
- document_reference
- otp_verified
- call_verified
- admin_approved
- status
- timestamps

Production retention policy is pending legal/data review.

### Notification
User/provider notification.
Fields:
- id
- recipient_id
- type
- title
- body
- read_at
- created_at

### Complaint
Issue associated with a completed/current job.
Fields:
- id
- job_id
- reporter_id
- description
- photo references
- status
- created_at

Job/payment metadata should be attached automatically.

### Invoice
Generated after successful payment.
Fields:
- id
- job_id
- invoice_number
- amount
- issued_at
- document/reference

### RatingReview
Customer rating/review after completion and payment.
Fields:
- id
- job_id
- customer_id
- provider_id
- rating
- review
- created_at

## Relationships

User 1—1 Customer account
Provider 1—many ProviderSkill
Service 1—many ProviderSkill
Customer 1—many ServiceRequest
ServiceRequest 1—many JobOffer
ServiceRequest 1—0/1 Job
Job 1—many JobOffer
Job 1—many Payment records if retries/adjustments require it
Job 1—many WalletTransaction references
Job 1—0/1 Complaint
Job 1—0/1 Invoice
Job 1—0/1 RatingReview
Provider 1—1 Wallet
Customer 1—1 refund Wallet
Provider 1—many KYCVerification records

## Prototype rule
Use realistic entity IDs and relationships even when data is mocked. Do not make each screen invent its own unrelated fake objects.

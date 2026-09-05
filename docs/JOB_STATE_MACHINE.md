# Job State Machine v1.0

## Canonical states

CREATED
→ MATCHING
→ OFFERED
→ ACCEPTED
→ ON_THE_WAY
→ ARRIVED
→ COMPLETION_PENDING
→ COMPLETED
→ PAYMENT_PENDING
→ PAID
→ REVIEWED

## State meanings

### CREATED
Customer submitted a valid service request.

### MATCHING
System is selecting eligible providers.

### OFFERED
Offers have been sent to the nearest 10 eligible providers.

### ACCEPTED
Exactly one provider won the acceptance race using the authoritative server timestamp.

### ON_THE_WAY
Provider accepted and started the journey.

### ARRIVED
Provider reached the customer.

### COMPLETION_PENDING
Provider is ready to complete and must submit the completion photo.

### COMPLETED
Provider completed the work using swipe-to-complete.

### PAYMENT_PENDING
Customer must choose online or cash.

### PAID
Payment has been recorded successfully.

### REVIEWED
Customer has submitted a rating/review.

## Valid transitions

Customer:
CREATED → MATCHING

System:
MATCHING → OFFERED

Provider/system:
OFFERED → ACCEPTED

Provider:
ACCEPTED → ON_THE_WAY

Provider:
ON_THE_WAY → ARRIVED

Provider:
ARRIVED → COMPLETION_PENDING

Provider:
COMPLETION_PENDING → COMPLETED

System:
COMPLETED → PAYMENT_PENDING

Customer/payment system:
PAYMENT_PENDING → PAID

Customer:
PAID → REVIEWED

## Cancellation
Cancellation is a controlled branch from valid pre-completion states. The 30-second grace rule and ₹50 post-grace penalty must be represented as a financial ledger adjustment, not an arbitrary mutation of the job amount.

## Matching retry
If the initial offer group produces no acceptance:
OFFERED → MATCHING/RETRYING → OFFERED
Exactly one final retry is permitted.
If final retry fails:
→ UNFULFILLED

UNFULFILLED is a terminal request outcome, not a job state.

## Important invariants

1. A job cannot have two accepted providers.
2. A provider cannot have two active jobs.
3. Once accepted, losing offers cannot later accept.
4. Radius never exceeds 5 km.
5. Only verified + available + matching providers can enter an offer set.
6. Completion requires completion photo.
7. Payment cannot occur before completion.
8. Review cannot occur before payment.
9. Financial records are append-only ledger entries.
10. State transitions must be validated, not inferred from UI button visibility.

## Prototype
The prototype may simulate state transitions but must use this exact state vocabulary.

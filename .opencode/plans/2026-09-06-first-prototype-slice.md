# First Prototype Slice — Revised Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Minimum viable coherent prototype for tomorrow's client demo. Customer flow (Landing → Service Selection → Request Form → Matching → Provider Accepted → Provider Profile → Tracking) and Provider flow (Landing → Dashboard → Availability → Incoming Request → 30-sec Accept → Job). No excess.

**Spec:** docs/PROTOTYPE_SCOPE.md, docs/UX_SPEC.md, docs/REQUIREMENTS.md, docs/JOB_STATE_MACHINE.md, docs/DESIGN_SYSTEM.md, docs/DECISIONS.md, docs/SECURITY.md

---

## Terminology Distinctions

| Label | Meaning |
|---|---|
| **CONFIRMED** | Production rule as specified. Prototype simulates it. |
| **PROTOTYPE SIMULATION** | Demo behavior that satisfies the UX goal but is NOT the production rule. Must be clearly labeled in code as such. |
| **PENDING** | Business decision not yet made. Prototype must not invent a value. |

---

## A. User-Visible Flow

### Customer (C01–C07, this slice only)
- C01 Landing → role selection ("I Need a Service" / "I Provide Services")
- C02 Customer Entry → name + phone
- C03 Service Selection → grid of 5 service categories
- C04 Request Form → description (required) + location + optional photo
- C05 Matching → "Finding providers within 5 km" animation → "Offer sent to 10 providers" → "Provider accepted!"
- C06 Provider Accepted → provider card with photo, name, verified badge, rating, experience, ETA, distance
- C07 Tracking → animated provider dot moving toward customer location, ETA countdown, "On the way" → "Arrived!"

### Provider (P01–P04, this slice only)
- P01 Provider Landing → demo login
- P02 Provider Dashboard → availability toggle + watch for requests
- P03 Incoming Request → service name, customer problem, address (per current client requirement, D-011), 30-second countdown bar, Accept/Reject
- P04 Accepted Job → simulated journey: Accepted → On the Way → Arrived

---

## B. Technical Approach

### Typography
**CONFIRMED:** DESIGN_SYSTEM.md §Typography requires Devanagari support.
**PROTOTYPE SIMULATION:** Replace Geist with Noto Sans (next/font/google, Devanagari subset). This is a production-quality choice, not a prototype shortcut.

### Bilingual System
**CONFIRMED:** REQ-002 English/Hindi UI.
**PROTOTYPE SIMULATION:** Lightweight JSON dictionary (`lib/i18n/dict.ts`) with flat key-value pairs for `en` and `hi`. One `useLanguage()` hook. Language persisted in sessionStorage. Scope limited to implemented screens only.

### Design Tokens
**CONFIRMED:** DESIGN_SYSTEM.md §Color tokens requires semantic tokens.
**PROTOTYPE SIMULATION:** CSS custom properties in `app/globals.css`. Tokens: background, surface, foreground, muted, primary, primary-foreground, success, warning, danger, border, focus. Tailwind arbitrary-value utilities reference these.

### State
**PROTOTYPE SIMULATION:** Single `useDemoStore` hook with `useReducer` for customer and provider demo state. No Context API overhead for this slice. In-memory only.

### Matching
**CONFIRMED RULES (not implemented in prototype, but simulated):**
- Max 5 km radius
- Nearest 10 eligible providers (verified + available + matching skill)
- First server timestamp wins
- One final retry if all reject
- Never expand radius beyond 5 km

**PROTOTYPE SIMULATION:** `services/demoMatching.ts` — deterministic 3-second delay, then "accept" with a hardcoded demo provider for the demo. The matching UI shows realistic progress: scanning → "Sending to providers" → count incrementing to 10 → "Provider found!" No production matching logic encoded.

### Tracking
**CONFIRMED:** REQ-015 Live location after acceptance; REQ-016 ETA/distance.
**PROTOTYPE SIMULATION:** CSS-animated dot on a map placeholder. Coordinates interpolated via `requestAnimationFrame`. ETA countdown from 8 minutes in 15-second steps. "On the way" at 0%, "Arrived" at 100%.

### 30-Second Timer
**CONFIRMED:** REQ-007 Acceptance window = 30 seconds.
**PROTOTYPE SIMULATION:** `useTimer` hook. Visual depleting bar. Auto-rejects at 0 unless already accepted.

### Phone Number Visibility
**CONFIRMED:** REQ-017 Phone numbers hidden initially; REQ-018 phone visible after relevant 30-second rule for current job only.
**PROTOTYPE SIMULATION:** Provider phone shown only on the P04 Accepted Job screen (after acceptance, simulating the post-30-sec rule). Not shown on the incoming request screen.

---

## C. File List

### New Files (minimal)

```
app/
  layout.tsx                    — Noto Sans font, providers wrapper
  globals.css                   — design tokens + base styles
  providers.tsx                 — language + demo store providers
  page.tsx                     — C01 landing (role selection)

  customer/
    page.tsx                   — C02 customer entry + C03 service selection
    request/page.tsx           — C04 request form
    matching/page.tsx          — C05 matching simulation
    accepted/page.tsx          — C06 provider accepted + C07 tracking

  provider/
    page.tsx                   — P01 provider landing
    dashboard/page.tsx         — P02 dashboard + availability toggle
    incoming/page.tsx           — P03 incoming request + timer
    job/page.tsx               — P04 accepted job + simulated journey

lib/
  i18n/
    dict.ts                    — bilingual strings (en + hi)
    useLanguage.ts             — language hook + sessionStorage
  demoStore.ts                 — single useReducer-based demo state
  matching.ts                  — demo matching simulation (3-sec delay, realistic UI)
  tracking.ts                  — demo tracking simulation (CSS dot animation)
  timer.ts                     — useTimer hook (30-sec countdown)
  types.ts                     — minimal types for this slice only

data/
  demo.ts                      — 5 providers, 5 services, 1 demo customer
```

**Total new files: ~20**

### Modify

```
app/layout.tsx                  — swap Geist → Noto Sans, add providers
app/globals.css                 — design tokens
package.json                    — add "typecheck": "tsc --noEmit"
```

---

## D. Dependencies

**No new dependencies.** Use only:
- `next/font/google` (built-in) — Noto Sans
- `next/link`, `next/image` (built-in)
- `react` (already in package.json)
- Tailwind CSS (already in package.json)

**No clsx.** String template literals suffice for this slice.
**No Zod, no React Hook Form, no Framer Motion, no shadcn/ui, no next-intl.**

---

## E. Demo Data

**PROTOTYPE SIMULATION ONLY — not production matching.**

One demo customer: `{ id: "c1", name: "Priya Sharma", phone: "9999888877" }`

Five demo services:
| ID | name_en | name_hi |
|---|---|---|
| s1 | Plumbing | प्लंबिंग |
| s2 | Electrical | इलेक्ट्रिकल |
| s3 | AC Repair | एसी मरम्मत |
| s4 | Cleaning | सफाई |
| s5 | Painting | पेंटिंग |

Five demo providers (all fictional):
| ID | Name | Service | Rating | Verified |
|---|---|---|---|---|
| p1 | Ramesh Kumar | Plumbing | 4.8 | yes |
| p2 | Suresh Patel | Electrical | 4.5 | yes |
| p3 | Geeta Verma | AC Repair | 4.9 | pending |
| p4 | Amit Singh | Cleaning | 4.6 | yes |
| p5 | Priya Devi | Painting | 4.3 | yes |

When matching runs, it picks p1 (Ramesh Kumar, Plumbing) as the "winner" after ~3 seconds. This is **PROTOTYPE SIMULATION**, not the production matching algorithm.

---

## F. UI Primitives (Minimal Set)

Only create components that are actually used by both flows:

| Component | Used in |
|---|---|
| `Button` | Customer + Provider: CTAs throughout |
| `Input` | Customer entry form, request form |
| `Card` | Service cards, provider cards |
| `Badge` | Verified badge, status badge |
| `Avatar` | Provider card, customer entry |
| `StatusDot` | Availability indicator |

**No EmptyState, LoadingSpinner, StatusIndicator, or other unused primitives in this slice.** Simple inline loading states suffice.

---

## G. State Transitions

**CONFIRMED:** JOB_STATE_MACHINE.md Invariant 10 — state transitions must be validated.

```
CREATED → MATCHING → OFFERED → ACCEPTED → ON_THE_WAY → ARRIVED
```

For this slice, the prototype simulates all transitions with deterministic timing:
- Customer submits → CREATED → MATCHING (immediate)
- 3-second simulation → OFFERED → ACCEPTED
- After "Provider accepted" → ON_THE_WAY (after ~5 simulated seconds)
- After ~10 simulated seconds → ARRIVED

**PROTOTYPE SIMULATION:** Transitions fire on `setTimeout` chains. This is explicitly NOT the production state machine — it is a deterministic demo simulation.

---

## H. Verification

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm run build       # next build
```

---

## I. Explicit Non-Goals (Not in This Slice)

| Deferred | Reason |
|---|---|
| Provider KYC/registration | Next increment |
| Completion + photo + swipe | Next increment |
| Payment + invoice | Next increment |
| Rating/review | Next increment |
| Admin dashboard | Separate flow |
| Wallet/earnings | Next increment |
| Subscription | Next increment |
| Notifications UI | Simulated implicitly via state |
| Complaints | Next increment |
| SOS | Next increment |
| Real GPS/GPS | Simulated tracking only |
| Real payment/OTP/KYC | Prototype simulation |
| Extra work/parts | PENDING REQ-049 |

---

## Task Breakdown

### Task 1: Foundation
- [ ] Replace font: `app/layout.tsx` Geist → Noto Sans with Devanagari subset
- [ ] Design tokens: extend `app/globals.css` with semantic CSS vars
- [ ] Add `typecheck` script to `package.json`

### Task 2: Bilingual System
- [ ] `lib/i18n/dict.ts` — en + hi strings for C01–C07, P01–P04 only
- [ ] `lib/i18n/useLanguage.ts` — `lang` state + `t()` + sessionStorage

### Task 3: Demo Data + Types
- [ ] `lib/types.ts` — DemoService, DemoProvider, DemoCustomer, DemoRequest
- [ ] `data/demo.ts` — 5 providers, 5 services, 1 demo customer

### Task 4: Demo State + Timer
- [ ] `lib/demoStore.ts` — single `useReducer` hook for all demo state
- [ ] `lib/timer.ts` — `useTimer(seconds)` hook returning `{ timeLeft, isExpired }`

### Task 5: Mock Services
- [ ] `lib/matching.ts` — `simulateMatching()` returns promise, 3-sec delay, fires with demo provider result
- [ ] `lib/tracking.ts` — `simulateTracking()` returns coordinate/distance updates via callback

### Task 6: UI Primitives
- [ ] `components/ui/Button.tsx`
- [ ] `components/ui/Input.tsx`
- [ ] `components/ui/Card.tsx`
- [ ] `components/ui/Badge.tsx`
- [ ] `components/ui/Avatar.tsx`
- [ ] `components/ui/StatusDot.tsx`

### Task 7: Customer Flow
- [ ] `app/page.tsx` — C01 landing: role selection
- [ ] `app/customer/page.tsx` — C02 entry + C03 service selection
- [ ] `app/customer/request/page.tsx` — C04 request form
- [ ] `app/customer/matching/page.tsx` — C05 matching simulation
- [ ] `app/customer/accepted/page.tsx` — C06 provider accepted + C07 tracking

### Task 8: Provider Flow
- [ ] `app/provider/page.tsx` — P01 provider landing
- [ ] `app/provider/dashboard/page.tsx` — P02 dashboard + availability
- [ ] `app/provider/incoming/page.tsx` — P03 incoming request + 30-sec timer
- [ ] `app/provider/job/page.tsx` — P04 accepted job (journey simulation)

### Task 9: Verification
- [ ] Run `npm run typecheck` — fix errors
- [ ] Run `npm run lint` — fix errors
- [ ] Run `npm run build` — fix errors
- [ ] Manual flow check on mobile + desktop

---

## Requirement Traceability (Corrected)

| Requirement | Status | Implementation |
|---|---|---|
| REQ-001 Customer/Provider entry | **CONFIRMED** | C01, P01 |
| REQ-002 English/Hindi | **CONFIRMED** | `lib/i18n/dict.ts` + `useLanguage.ts` |
| REQ-003 Final five services | **PENDING** | Demo uses 5 configurable services only |
| REQ-004 Max 5 km radius | **CONFIRMED** | Matching UI shows "within 5 km"; never exceeds |
| REQ-005 Nearest 10 providers | **CONFIRMED** | UI shows "Sent to 10 providers" |
| REQ-006 Eligibility (verified + available + skill) | **CONFIRMED** | Matching shows eligible provider; demo uses only verified+available |
| REQ-007 30-second acceptance | **CONFIRMED** | `useTimer` hook + visual countdown |
| REQ-008 Server timestamp wins | **CONFIRMED** | Architecture only; simulated with deterministic timer |
| REQ-009 One final retry | **CONFIRMED** | Comment in matching.ts; UI shows one retry |
| REQ-010 Never expand radius | **CONFIRMED** | Matching UI never expands beyond 5 km |
| REQ-011 Retry timing | **PENDING** | Not hardcoded; configurable |
| REQ-012 Availability toggle | **CONFIRMED** | P02 dashboard |
| REQ-014 Exact address before accept | **CONFIRMED** | P03 shows address (D-011 production review pending) |
| REQ-015 Live location after accept | **CONFIRMED** | Tracking simulation |
| REQ-016 ETA/distance | **CONFIRMED** | C06, C07 show ETA + km |
| REQ-017 Phone hidden initially | **CONFIRMED** | Phone NOT shown on P03 incoming request |
| REQ-018 Phone after 30 sec | **CONFIRMED** | Phone shown only on P04 (simulates post-30-sec rule) |
| REQ-019 30-sec grace | **CONFIRMED** | Not applicable to this slice's matching flow |
| REQ-052 Avoid generic SaaS UI | **CONFIRMED** | Noto Sans + semantic tokens |
| REQ-053 Design system | **CONFIRMED** | Design tokens + primitives |
| REQ-054 Intentional motion | **CONFIRMED** | Matching dots, timer bar, tracking dot only |
| REQ-055 Mock behind boundaries | **CONFIRMED** | `lib/matching.ts`, `lib/tracking.ts` labeled as prototype |
| D-004 Server timestamp wins | **CONFIRMED** | Simulated deterministically |
| D-011 Exact address exposure | **CONFIRMED** | Shown on P03; production review pending |
| D-012 Visual language | **CONFIRMED** | No gradients/glass/blobs |

---

## Open Issues / PENDING Decisions (Not Invented)

| Item | Status |
|---|---|
| Final five launch services | Demo 5 services only; REQ-003 PENDING |
| Exact pricing formula | No pricing in this slice; REQ-048 PENDING |
| Retry timing | Configurable; REQ-011 PENDING |
| Extra work/parts UX | Not in slice; REQ-049 PENDING |
| Subscription lifecycle | Not in slice; REQ-029 PENDING |
| "Happy customer" definition | Not in slice; REQ-051 PENDING |
| "Profit" definition | Admin only; not in slice; REQ-050 PENDING |

---

## READY FOR BUILD: YES

**Revised file count: ~20 new files + 3 modified.** Minimal, focused, production-quality structure. No invented business rules. No unnecessary abstractions. PENDING items explicitly marked. Prototype simulation clearly separated from confirmed production rules in code comments.

# UI/UX Visual Redesign Plan — First Prototype Slice (Revised)

## Audit Findings

### What's Functional (Preserve)
- All routes and state transitions work correctly
- Bilingual English/Hindi system intact
- Timer logic, matching simulation, tracking simulation all correct
- All design tokens are correctly defined

### Visual Problems

| Screen | Issue |
|---|---|
| Landing `/` | Flat, personality-free. Two cards with just emoji + label. No brand identity, no trust signals. |
| Customer `/customer` | Entry form is a developer-style form. Service grid has no hierarchy, no shadows, no section context. |
| Request `/customer/request` | Bare textarea, no visual sectioning, no label hierarchy. |
| Matching `/customer/matching` | Spinner-only "finding" state is text-only. Dot animation looks like a developer test. No celebration on accept. |
| Tracking `/customer/accepted` | Provider card is flat text. Map placeholder is a gray box. No "arrived" celebration. |
| Provider Dashboard `/provider/dashboard` | Toggle works but is plain. Waiting state has spinner with no context. |
| Incoming Request `/provider/incoming` | Timer bar is thin. Cards look flat. Accept/Reject have no visual hierarchy. |
| Provider Job `/provider/job` | Basic checkmark timeline. Customer card is plain text. |

### Root Causes
1. Cards have `border border-[var(--border)]` but no shadow — all cards look equally flat
2. No typography hierarchy — everything is `text-[var(--foreground)]`
3. No section context — screens lack headers, subtitles, section labels
4. Spacing is uniform `gap-4` or `gap-6` everywhere — no rhythm
5. No visual celebration for state transitions (matching found, provider arrived)
6. Service cards have no visual weight — emoji alone does not communicate professionalism
7. No brand identity — nothing says "Jaipur" or "local services"

---

## Corrections Applied

1. **No emoji as primary icons** — use inline SVG icons per service, created inline in the demo data. No new dependency.
2. **No unsupported claims** — trust bar uses "Verified Providers", "Nearby Professionals", "Fast Response" — all aligned with confirmed requirements.
3. **Warm accent defined explicitly** — add `--accent: #B45309` (warm amber, Rajasthan-inspired) used sparingly: trust bar accent, selected states, active indicators. NOT a gradient, NOT decorative — a semantic accent only.
4. **Clarified behavioral preservation** — matching phase transition (auto-advance after "provider found") uses existing `setTimeout` logic unchanged; only the visual treatment changes.
5. **Mobile-first** — all layouts designed for 375px first. Touch targets minimum 44px. Desktop is an adaptation, not the baseline.
6. **Full per-screen spec** — each screen specifies hierarchy, spacing, component treatment, responsive behavior, and interaction states.
7. **Tokens preserved** — existing tokens unchanged. Warm accent added as a new semantic token with documented usage rule.
8. **Real marketplace feel** — clean professional local-services aesthetic, not generic SaaS.

---

## Design Tokens

### Existing Tokens (Unchanged)
| Token | Value | Usage |
|---|---|---|
| `--background` | `#ffffff` | Page background |
| `--surface` | `#f8f8f8` | Card backgrounds, input fills |
| `--foreground` | `#1a1a1a` | Primary text |
| `--muted` | `#737373` | Secondary text, labels |
| `--primary` | `#2563eb` | CTAs, links, active states |
| `--primary-foreground` | `#ffffff` | Text on primary |
| `--success` | `#16a34a` | Verified, arrived, completed |
| `--warning` | `#ca8a04` | Timer warning (< 10s) |
| `--danger` | `#dc2626` | Timer critical (< 5s), reject |
| `--border` | `#e5e5e5` | Card borders |
| `--focus` | `#2563eb` | Focus rings |

### New Tokens
```css
--accent: #B45309;          /* Warm amber — Rajasthan-inspired, used sparingly */
--accent-light: #FEF3C7;    /* Accent tint for selected states */
--shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
--shadow-md: 0 4px 12px rgba(0,0,0,0.10);
--shadow-lg: 0 8px 24px rgba(0,0,0,0.12);
```

**Warm accent usage rules:**
- Trust bar accent bar only (4px top border or side accent line)
- Service card selected state (left border accent)
- Active navigation/tab indicator
- NOT: backgrounds, gradients, decorative elements, large surfaces

---

## Service Icon System

**No emoji. Inline SVG icons per service, defined in `data/demo.ts`.**

```typescript
// In data/demo.ts — SVG icon paths per service
export const SERVICE_ICONS: Record<string, string> = {
  s1: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 12h18M12 3v18"/></svg>`, // Plumbing — cross pipes
  s2: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></svg>`, // Electrical — bolt
  s3: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 2v4M18 2v4"/></svg>`, // AC
  s4: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18M3 12h18M3 18h18"/></svg>`, // Cleaning — lines
  s5: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 16l4-8 4 4 4-6 4 10"/></svg>`, // Painting — wave
};
```

Each icon rendered via `dangerouslySetInnerHTML` in a styled wrapper. Stroke color inherits from text color. Icons are 32×32px inside service cards.

---

## Shared Layout Shell

All customer/provider screens share a consistent layout pattern:

```
[Header: 56px, sticky, border-bottom, white bg]
  Left: Back arrow (when back possible) or Logo text
  Center: Screen title (when needed)
  Right: Language toggle button

[Main: flex-1, p-5 (20px), max-w-md, mx-auto]
  Section hierarchy: label → title → content
  Consistent gap rhythm: section (gap-8) > group (gap-4) > item (gap-3)
```

**Responsive behavior:**
- Mobile: `p-5`, `max-w-md mx-auto`
- Tablet/Desktop: same container, content may expand to 2-col at `md:`
- Touch targets: minimum 44×44px for all interactive elements

---

## Screen-by-Screen Redesign

### Screen 1: Landing `/`

**Visual hierarchy:**
- Header (sticky): Logo text left, language toggle pill right
- Hero section: Product name large (2xl font), tagline muted below, Jaipur context line
- Role selection: Two full-width cards, stacked, each with:
  - Icon (SVG, 48px, primary color)
  - Title (lg font, semibold)
  - Short subtitle (sm, muted)
  - Right chevron (muted)
  - `shadow-sm`, hover lifts with `shadow-md`, transition 150ms
- Trust bar: Three trust items in a row, each with a small icon and label. Accent line (4px `--accent`) on left edge of each item.

**Spacing rhythm:**
```
header: py-4 px-5
hero: pt-10 pb-8 px-5
role cards: flex-col gap-3 px-5 pb-8
trust bar: pb-8 px-5
```

**Interaction states:**
- Language toggle: pill button, active language underlined
- Role cards: hover lifts, press scales down 0.98

**Trust bar content (per confirmed requirements):**
- "Verified Providers" — provider checkmark icon
- "Nearby Professionals" — map pin icon
- "Fast Response" — clock icon

---

### Screen 2: Customer Entry + Services `/customer`

**Entry step:**
- Section label: "CREATE ACCOUNT" (muted, uppercase, tracking-wide, text-xs)
- Title: "Tell us your name" (xl, semibold)
- Subtitle: "We'll use this to identify your requests" (sm, muted)
- Name input: styled Input with label above
- Phone input: styled Input with label above, tel type
- Button: full-width, primary, lg size

**Services step:**
- Section label: "SELECT SERVICE"
- Title: "What do you need?" (xl, semibold)
- Grid: 2 columns on mobile, each service card:
  - White card, `shadow-sm`, `rounded-xl`, `border border-[var(--border)]`
  - Left accent line (3px, `--accent`) on left edge when applicable
  - SVG icon (32px, `--foreground` color) top-left
  - Service name (sm, medium) below icon
  - Service name Hindi (xs, muted) below that
  - Hover: lifts with `shadow-md`, border becomes `--primary` at 30% opacity
  - Active/pressed: scale 0.98

**Spacing rhythm:**
```
section label: mt-6 mb-2 px-5
title: px-5 mb-1
subtitle: px-5 mb-6
form fields: flex-col gap-4 px-5
service grid: grid grid-cols-2 gap-3 px-5 pb-6
```

---

### Screen 3: Request Form `/customer/request`

**Layout (top to bottom):**
- Back arrow + "Request Service" title in header
- Selected service chip: small card with service icon + name, `--surface` background
- Section label: "PROBLEM DETAILS"
- Textarea: styled with border, rounded-lg, focus ring, label above, 4 rows minimum
- Section label: "LOCATION"
- Location Input: with map pin icon prefix (decorative inline SVG)
- Bottom: Primary Button full-width, sticky at bottom on mobile

**Visual hierarchy:**
- Labels in `--muted`, uppercase, text-xs, letter-spacing
- Textarea border `--border`, focus border `--focus` with ring
- Location input has a left icon prefix inside the input

**Interaction states:**
- Textarea: focus ring `--focus`, border darkens
- Submit button: disabled state when textarea empty (opacity 50%, no pointer)

**Responsive:** On desktop, form max-w-md centered, button not sticky.

---

### Screen 4: Matching `/customer/matching`

**Three visual phases — all transitions use existing `setTimeout` logic unchanged.**

**Phase 1 — "Finding nearby providers" (1.5s):**
- Centered layout
- Animated search ring: CSS-only concentric circles that pulse outward (3 rings, staggered 200ms, opacity fade)
- Heading: "Finding nearby providers" (lg, semibold)
- Subtext: "within 5 km radius" (sm, muted)
- Subtle secondary text: "Checking availability..." (xs, muted)

**Phase 2 — "Sending offers" (3s, animated dots):**
- 10 small circles in a row (wrapping to 2 rows on very small screens)
- Each lights up blue sequentially (300ms stagger)
- Counter text: "Sending offer 3 of 10..." (sm)
- Below: "5 km radius • Verified providers only" (xs, muted)

**Phase 3 — "Provider found!" (1.5s before auto-transition):**
- Green checkmark: scale-in animation (0 → 1, 200ms spring)
- "Provider found!" heading (lg, semibold, `--success`)
- Provider mini-card slides in from bottom:
  - Avatar (48px), name (md, semibold), star rating, verified badge
  - Card: white, shadow-md, rounded-xl
- Auto-advances to `/customer/accepted` after 1.5s (existing setTimeout, unchanged logic)

**Spacing:** All phases centered, `justify-center`, `items-center`, full viewport height minus header.

---

### Screen 5: Provider Accepted + Tracking `/customer/accepted`

**Provider card (top):**
- White card, shadow-sm, rounded-xl
- Avatar: 64px (not 72 — keep proportional), rounded-full, border
- Provider name: lg, semibold
- Verified badge: green pill with checkmark icon
- Rating: star icon + "4.8" + "(234 reviews)" — muted, sm
- Experience: "12 years experience" — muted, sm
- Divider line (border)
- ETA section: clock SVG icon + "8 mins away" — primary color, lg, semibold

**Tracking map (middle):**
- Container: white card, shadow-sm, rounded-xl, h-40
- Styled background: subtle gradient (`--surface` to white) with faint road/path line (CSS border or pseudo-element)
- Provider dot: 12px blue circle with CSS pulse animation (scale 1 → 1.3 → 1, 1s loop)
- Destination marker: green circle with checkmark, bottom of container
- Progress track: thin horizontal line connecting provider dot to destination
- ETA overlay: centered, large text "8 min" over the map

**Progress bar (bottom):**
- Full-width bar: h-2, rounded-full, `--border` background
- Fill: `--primary`, width driven by `progress%`
- Label below: "Arriving in X min" centered, sm

**Arrived state:**
- Green success banner at top: "✅ Your provider has arrived!" (--success text, green background tint)
- Provider card shows "Arrived" status badge instead of ETA
- Map shows both dots overlapping at destination

---

### Screen 6: Provider Dashboard `/provider/dashboard`

**Header:** "Dashboard" title + language toggle

**Welcome section:**
- "Good morning, Ramesh" (or Hindi equivalent) — lg, semibold
- Availability card (full-width, white, shadow-sm, rounded-xl):
  - Left: status icon (green circle check / gray circle x) + status text
  - Right: large toggle switch (w-16 h-9 for visual prominence)
  - Description below: "Turn on to receive job requests" — muted, sm

**Stats row (2 columns):**
- "Today's Jobs": number in large text (primary color) + label muted
- "Earnings": "₹0" + label muted
- Static demo values — not wired to real data in this slice

**Waiting state (when available):**
- "Watching for requests" text — sm, muted
- Animated radar: 3 concentric circles pulsing outward (CSS animation, subtle)
- Same visual treatment as matching screen's search ring

---

### Screen 7: Incoming Request `/provider/incoming`

**Header:** Red accent background (`--danger` at 10% opacity), bell SVG icon, "New Job Request!" in danger color, urgent styling

**Timer (prominent):**
- Large countdown number: 48px font, semibold
- Circular progress ring around the number: SVG circle, stroke depletes as time runs out
- Color transitions: `--primary` (> 10s) → `--warning` (5-10s) → `--danger` (< 5s) with pulse animation
- Text below: "to accept this request" — sm, muted

**Request card (white, shadow-sm, rounded-xl):**
- Service name + icon at top (prominent)
- Customer problem: quoted text in a styled block (left border accent)
- Address: map pin icon + full address text
- Distance: "2.3 km away" — sm, muted

**Action buttons (bottom, sticky on mobile):**
- Two buttons side by side, full height minimum 52px for touch
- "Reject": secondary style, left — red border, red text, hover fills red background
- "Accept": primary style, right — full blue, white text, larger font

**Spacing:** `gap-5` between sections, buttons `gap-3`.

---

### Screen 8: Provider Job `/provider/job`

**Status hero (top):**
- Large icon (64px): checkmark (accepted) → car (on the way) → home (arrived)
- Status text: lg, semibold, color matches state
- Subtext: current action description, muted

**Progress timeline (vertical):**
- White card, shadow-sm, rounded-xl
- 3 steps: Accepted → On the Way → Arrived
- Each step:
  - Left: circle (24px) — completed (filled green + check), active (filled primary + pulse), pending (gray border)
  - Right: step label (sm) + time if applicable (xs, muted)
  - Connecting line between steps (2px, gray for pending, green for completed)
- Current step: pulse animation on circle

**Customer card (white, shadow-sm, rounded-xl):**
- "Customer" label (muted, uppercase, text-xs)
- Customer name (md, semibold)
- Phone number (sm) — visible here per REQ-018
- Address line (sm, muted)

**Responsive:** Timeline and customer card stack vertically on all sizes.

---

## Component Enhancements

### `components/ui/Card.tsx`
- Default: `border border-[var(--border)] shadow-sm bg-[var(--background)] rounded-xl`
- Interactive: hover adds `shadow-md`, transition 150ms
- Active/pressed: `scale-[0.98]` transition

### `components/ui/Input.tsx`
- Add `leftIcon` prop for icon prefix (map pin, phone, etc.)
- Add `Textarea` component: same styling as Input but `rows` prop, `resize-none`

### `components/ui/Badge.tsx`
- Add `size` prop: `sm` (text-xs, px-1.5 py-0.5) and `md` (text-sm, px-2 py-1)
- Add `accent` variant: `--accent-light` background, `--accent` text

### New: `components/ui/SectionLabel.tsx`
```tsx
export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="text-xs font-medium uppercase tracking-widest text-[var(--muted)]">{children}</p>;
}
```

### New: `components/ui/InlineIcon.tsx`
Renders an SVG string from `SERVICE_ICONS`:
```tsx
export function InlineIcon({ svgPath, size = 24, className = "" }: { svgPath: string; size?: number; className?: string }) {
  return <span className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }} dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-full h-full">${svgPath}</svg>` }} />;
}
```

---

## Icon List (Inline SVG, No Dependency)

All icons are inline SVG paths used via `InlineIcon` or `dangerouslySetInnerHTML`. No icon library dependency.

| Usage | Icon type |
|---|---|
| Service: Plumbing | Cross/pipes |
| Service: Electrical | Lightning bolt |
| Service: AC Repair | Rectangle with lines |
| Service: Cleaning | Horizontal lines |
| Service: Painting | Wave/zigzag |
| Navigation | Chevron right, chevron left, arrow left |
| Map pin | Location marker |
| Phone | Handset |
| Clock | Clock face |
| Checkmark | Circle check |
| Star | Star |
| Bell | Bell (for alerts) |
| Verified | Shield check |
| Toggle on | Circle with line |
| Search | Magnifying glass |
| Home | House |

---

## Implementation: Files to Modify

### `app/globals.css`
- Add new CSS tokens: `--accent`, `--accent-light`, `--shadow-sm`, `--shadow-md`, `--shadow-lg`
- Add dark mode override for new tokens

### `data/demo.ts`
- Add `SERVICE_ICONS` object mapping service IDs to SVG path strings

### `components/ui/Card.tsx`
- Add shadow classes and interactive hover/active states

### `components/ui/Input.tsx`
- Add `Textarea` export with matching styles
- Add `leftIcon` prop

### `components/ui/Badge.tsx`
- Add `size` prop and `accent` variant

### New: `components/ui/SectionLabel.tsx`
- Small uppercase muted label component

### New: `components/ui/InlineIcon.tsx`
- SVG icon renderer from SVG path string

### `app/page.tsx` (Landing)
- Full visual redesign: header, hero, role cards with SVG icons, trust bar with accent

### `app/customer/page.tsx`
- Redesign entry step with section labels
- Redesign service grid with SVG icons, card shadows, hover states

### `app/customer/request/page.tsx`
- Section labels, styled textarea, icon prefix on location input, sticky submit button

### `app/customer/matching/page.tsx`
- Three-phase visual redesign with animated rings, dot grid, provider found celebration
- Auto-transition logic unchanged (existing setTimeout)

### `app/customer/accepted/page.tsx`
- Better provider card, tracking map with pulse animation, progress bar, arrived celebration

### `app/provider/dashboard/page.tsx`
- Availability card redesign, stats row, radar waiting animation

### `app/provider/incoming/page.tsx`
- Circular timer, urgent header, request card, full-width action buttons

### `app/provider/job/page.tsx`
- Status hero, vertical timeline, customer card

---

## Non-Goals

- No changes to routes or navigation structure
- No changes to state transitions, matching logic, timer logic, or tracking logic
- No changes to bilingual system or dictionary
- No changes to demo data content (only adding SVG icon paths)
- No changes to domain types
- No production integrations
- No new runtime dependencies
- No dark mode changes in this pass

# Design System v1.0

## Goal
Create a distinct, trustworthy local-services product identity rather than a generic AI-generated SaaS interface.

## Visual direction
Keywords:
- local
- trustworthy
- practical
- modern
- human
- fast
- service-oriented

Avoid:
- excessive gradients
- glassmorphism everywhere
- giant decorative blobs
- arbitrary neon colors
- excessive card nesting
- stock-photo hero clichés
- meaningless motion
- excessive pill-shaped controls

## Typography
Use one primary UI font family consistently. Choose a font with reliable Devanagari support for Hindi. Do not mix random font families.

## Color tokens
Define semantic tokens rather than hardcoding colors inside components:
- background
- surface
- foreground
- muted
- primary
- primary-foreground
- success
- warning
- danger
- border
- focus

Exact palette should be chosen during visual design exploration, then locked in this file.

## Component rules
Create reusable primitives before duplicating:
- Button
- Input
- Select
- Textarea
- Dialog
- Sheet
- Badge
- Card
- Toast
- Avatar
- Status indicator
- Provider card
- Job card
- Money/transaction row
- Empty state
- Loading state
- Error state

## Provider-specific UI
Prefer:
- large readable labels
- clear icons
- short instructions
- obvious primary CTA
- minimal simultaneous choices

## Motion
Use motion for:
- route transitions
- request state changes
- matching feedback
- acceptance timer
- tracking movement
- completion confirmation

Motion must communicate state or feedback. It must not be decorative noise.

## Dependency rule
Do not add a UI/motion library because an agent prefers it. Every new dependency must have a documented reason and should solve a real project need.

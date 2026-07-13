# Handoff: UT Parking Portal — Desktop Web App

## Prompt for Claude Code (paste this in)

> Build a production web app for the **University of Texas Parking Portal**, using the HTML design reference in `reference/UT Parking Redesign.dc.html` as the source of truth for look, layout, and behavior.
>
> **Scope for this build:**
> - Implement the **desktop** experience only (the reference also contains a mobile prototype and a case-study presentation shell — ignore both, see "What to strip out" below).
> - Recreate the designs in this repo's existing stack and conventions (components, routing, styling system). If the repo is empty, use **React + TypeScript + Vite** with CSS Modules (or Tailwind if already present).
> - Wire the screens to real data models / API stubs — do **not** hardcode the sample person, plates, or permit numbers from the reference (they are placeholder PII; see "Data & PII").
> - Match colors, typography, spacing, and radii exactly (see Design Tokens). This is a **high-fidelity** reference.
>
> Deliver: the five main screens (Home, Permits & Passes, Vehicles, Citations, Account) plus the guided **Get a Permit or Pass** purchase flow, with the shared top navigation and the add-vehicle modal.

## About the design files
The file in `reference/` is a **design reference authored in HTML** (a single self-contained prototype). It demonstrates the intended visual design and interactions — it is **not** production code to copy verbatim. Recreate it in the target codebase's environment using that project's established patterns and component library. It renders in a browser if you want to click through it, but you cannot `import` it.

## Fidelity
**High-fidelity.** Colors, type, spacing, and interactions are final. Reproduce the UI pixel-accurately with the repo's libraries.

---

## What to strip out (design-review scaffolding — NOT part of the product)
The reference wraps the real app in a case-study presentation. Remove all of it:

1. **Outer page chrome** — the top bar reading "UT Parking Portal — Redesign / Mobile-first UX concept…", the **Mobile / Desktop** toggle, the **Design notes** toggle, and the **Restart** button.
2. **The "Design decisions" side panel** (right column with numbered rationale cards) — delete entirely.
3. **The browser-window frame** around the app (the traffic-light dots + `parking.utexas.edu/portal` URL bar). The real app is just the page itself.
4. **The mobile phone prototype** (device bezel, status bar, bottom tab bar) — out of scope for this build.
5. **Disclaimer copy** — "Independent concept created for a course assignment…" and "Independent student redesign concept." Remove.
6. **The `showDesignNotes` / `showPhoneChrome` / `startTab` tweak props** — not needed.

What remains is the actual product: a top nav + the content screens.

## Data & PII (replace all sample values with real/dynamic data)
The reference contains placeholder personal data. **None of it should be hardcoded.** Drive it from auth/session + API:

| In the reference | Replace with |
|---|---|
| "Harrison Rustan", "Harrison", "Hi, Harrison" | authenticated user's name |
| "HR" avatar initials | initials derived from the user's name |
| Permit no. `26B00A0242`, order `26B00A0242-02` | permit/order IDs from the API |
| Plates `VFT8565`, `004XC1571X` | the user's registered plates |
| Vehicles "Tesla · White", "Trek · Red" | the user's vehicle records |
| "UT EID · Student" | user role from session |
| "Visa ···· 4242" | the user's saved payment method |

Model the data as: `user`, `permits[]`, `vehicles[]`, `citations[]`, `appeals[]`, `letters[]`, and purchasable `permitOptions[]` / `passOptions[]`.

---

## Screens / Views (desktop)

Global: page background `#F4F1EB`; content area max-width **860px**, centered, padding `26px 40px 40px`; font **Libre Franklin**.

### Top navigation (shared across all screens)
- Row, height 62px, white bg, bottom border `#EEEAE1`, horizontal padding 24px.
- **Left — brand lockup (clickable → Home):** burnt-orange chip (`#BF5700`, radius 9px, height 34px, padding 0 11px) containing the white UT **shield + TEXAS** lockup image at 19px tall, followed by the label "Parking Portal" (`15px/800`, `#333F48`, `nowrap`).
- **Center-left — nav items:** Home · Permits & Passes · Vehicles · Citations. Each is a pill button, height 38px, padding 0 15px, radius 10px, `14px/700`. **Active** = bg `#FBEEE3`, text `#BF5700`; **inactive** = transparent, text `#5C6670`.
  - Important: while the **Get a Permit or Pass** flow is open, keep **Permits & Passes** highlighted (the user is still on that nav path).
- **Right cluster (margin-left auto, gap 16px):** bell icon (`#7A828A`), a cart indicator (cart icon + running total, `13px/700 #5C6670`), and the account button (32px charcoal `#333F48` circle with user initials + first name → navigates to Account).

### 1. Home
- **Announcement banner** (dismissible): tint `#FBEEE3`, border `#F2D9C4`, radius 14px. A small white pill badge (e.g. permit-year), a message with an inline "Read the announcement ›" link (`#BF5700`), and an × dismiss button (top-right).
- **Title row:** "Parking Portal" (`26px/800 #333F48`) on the left; on the right, a "Secure UT EID session" trust indicator (lock icon + `12.5px/700 #2F7D4E`). `space-between`, vertically centered.
- **Two-column hero grid** (`1.5fr 1fr`, gap 16px):
  - **Status card** (white, border `#E7E3DA`, radius 18px, padding 22px, card shadow): green check circle (44px, bg `#E7F3EA`, check `#2F7D4E`) + "You're set to park" (`20px/800`) + a summary line ("<Permit type> · <permit no.> · valid to <date>"). Below, a 3-up mini-stat grid (bg `#F7F5F0`, radius 12px, padding 13px, centered): **Permit** (count, green), **Vehicles** (count), **Balance** (amount, green). Each mini-stat is a button linking to its screen.
  - **Action card** (dark `#333F48`, radius 18px, padding 22px, card shadow): heading "Need more parking?" *(dynamic — "Need parking?" if the user has **no** active permit)*, subtext, then a primary **"Buy a permit or pass"** button (burnt-orange) and a secondary **"Surface day pass"** button (transparent, 1px border `#55606A`, white text).
- **Quick actions** — label "QUICK ACTIONS" (`11px/800` uppercase, letter-spacing .6px, `#98A0A6`), then a 4-up grid (gap 12px) of white cards (border `#E7E3DA`, radius 15px, padding 16px): each has a 38px tinted icon tile (bg `#FBEEE3`, icon `#BF5700`, radius 11px) + title (`13.5px/700`) + subtext (`11.5px #8A9298`). Cards: **Surface day pass**, **Add a vehicle**, **View citations**, **Join a waitlist**.
- **Help row** — full-width white card/button: "Need help? Frequently Asked Questions" (`14px/700 #005F86`, question-mark icon) with a right chevron.

### 2. Permits & Passes
- Title "Permits & Passes" (`24px/800`).
- **Permit card** (white, radius 18px, card shadow, `overflow:hidden`):
  - Header: permit type name (`19px/800`) + secondary line ("<class> · Permit no. <link>"); right side an **Active** status pill (bg `#E7F3EA`, text `#2F7D4E`, 7px green dot).
  - 3-up date chips (bg `#F7F5F0`, radius 11px): **Effective**, **Expires**, **Issued** — small uppercase label + `13px/700` value.
  - Action bar (3 equal buttons split by 1px dividers, top border `#EEEAE1`): **QR code**, **Vehicles (n)** (→ Vehicles), **Receipt**. Icon (`#BF5700`) + `13px/700 #5C6670`.
  - Footer strip (bg `#E7F3EA`, `#2F7D4E`): green check + "n vehicle(s) attached — you're covered for parking." (dynamic; if any account vehicle is unattached, show an amber/actionable variant instead).
- **Primary button** "Get a new permit or pass" → opens the purchase flow.
- **Info card** "How enforcement works" (white, radius 14px): info icon (`#005F86`) + heading + body paragraph (`13px #6B747B`) about license-plate enforcement.
- Link: "Read the Agreements for Permits and Passes ›" (centered, `#BF5700`).

### 3. Vehicles (max-width 760px)
- Header row: title "Vehicles" (`24px/800`) + primary **"Add vehicle"** button (burnt-orange, height 44px) → opens the Add-vehicle modal.
- **Registration meter card** (white, radius 16px): "Vehicles registered" + "n / max" (`#BF5700`), an 8px track (bg `#F0EBE1`) with a burnt-orange fill at the correct %, and a helper line ("You can register N more vehicle.").
- **Vehicle cards** in a 2-column grid (gap 14px). Each: 42px tinted tile (bg `#F0EBE1`) with a type icon (car / bicycle), the make·color (`15px/800`), a plate chip (Libre Franklin `13px/800`, letter-spacing 1px, bg `#F4F1EB`, border `#E7E3DA`, radius 6px) + "STATE · Driver", and a status badge: green "Attached to <permit>" (bg `#E7F3EA`) or neutral "Bicycle · no permit needed" (bg `#F0EBE1`).
- **Info card** "Enforcement is by license plate" (same style as Permits info card).

### 4. Citations (max-width 820px)
- Title "Citations" (`24px/800`).
- **Two-column grid** (`1fr 1fr`, gap 16px, columns **bottom-aligned / equal height**):
  - **Left column** (flex column, gap 14px): a **clear-state card** that grows to fill the column height (`flex:1`, centered) — 52px green check circle, "No active citations" (`18px/800`), "You're all clear.", and a compact **Balance** pill (`BALANCE $0.00`). Below it a 2-up row of stat cards (**Appeals** count, **Letters** count). Below that an info note (bg `#EAF3F7`, border `#CFE4EC`, `#3D6273`): "Citations cannot be paid via What I Owe (WIO) or Payroll Deduction."
    - When citations exist, replace the clear-state card with a list of citation rows (number, date, amount, status, appeal action).
  - **Right column** — **"Look up a citation"** card (white, radius 16px): heading + helper text, a **Citation number** text input, a row of **State** `<select>` + **Plate number** input, and a full-width dark **"Search citations"** button (`#333F48`). Inputs: height 44px, border `#E1DCD0`, radius 11px, bg `#FBFAF7`, focus border `#BF5700`.

### 5. Account (max-width 620px)
- Title "Account".
- **Profile card:** 52px burnt-orange avatar with initials + name (`16px/800`) + role line (`12px #8A9298`) + right chevron (→ manage profile).
- **"Help & info" list** (white card, rows split by `#F1EDE4`): Frequently Asked Questions · Agreements for Permits & Passes · Parking & Transportation Services · Send a comment. Each row `14px/600` + right chevron.
- **Sign out** button (white, border `#F0D9D6`, text `#B3261E`).
- Footer: "Parking & Transportation Services · The University of Texas at Austin" (remove the "Independent student redesign concept." line).

### Get a Permit or Pass (purchase flow — max-width 840px)
Entered from Home ("Buy a permit or pass") or Permits ("Get a new permit or pass"). Top nav stays visible with **Permits & Passes** highlighted.

Header row: a **Back** button (steps back, or exits to Permits from step 1), centered title "Get a Permit or Pass", and a step chip on the right ("Step 1 of 3" … "Confirmed").

Steps 1–3 use a **two-column layout** (`1.5fr 1fr`, gap 20px): the left column is the step content; the right column is a **sticky order-summary rail**.

- **Step 1 — Select:** intro text; a segmented control **Permits / Passes / Day Pass** (active segment = burnt-orange bg, white text); an info line "Prorated prices, if applicable, are shown at checkout."; then a list of **selectable option cards** (radio behavior). Each card: name (`15.5px/800`) + description, a selected check circle (burnt-orange) or empty ring, then price (`16px/800 #BF5700`) + price label + optional fee chip, and Effective/Expires dates. When "Permits" is selected, append a muted note that more permit types appear based on eligibility.
- **Step 2 — Agreement:** a card titled "Agreement for Permits and Passes" containing a scrollable terms box, followed by a required checkbox: "I have read and agree to the Agreement for Permits and Passes." (custom 24px checkbox; burnt-orange when checked).
- **Step 3 — Review:** payment-method row (card brand tile + "···· 4242" + Change link) and a fine-print line. The summary rail shows the full breakdown.
- **Summary rail** (sticky, white card): label "SUMMARY"; if an option is selected → item name + Eff/Exp + price, optional entry-fee row, and a **Total today** row (`17px/800 #BF5700`); if nothing selected → "Select a permit or pass to continue." The **primary action button** lives here with **≥16px top margin**; its label + enabled state change per step:
  - Step 1 "Continue" (disabled until an option is selected)
  - Step 2 "Agree & Continue" (disabled until the checkbox is checked)
  - Step 3 "Place Order"
- **Confirmation** (single centered column, replaces the 2-col layout): 72px green check circle, "Order placed", a line ("Your <item> has been added to your account. A receipt was emailed to you."), an order card (order number + a QR code + "Show this QR at the garage entry."), and a **"View in Permits"** button that returns to the Permits screen.

### Add-vehicle modal (over Vehicles)
Centered modal (440px, white, radius 20px, backdrop `rgba(20,15,5,.42)`): title "Add a vehicle" + × close, subtitle "What are you registering?", then three large choice rows (icon tile + title + subtext + chevron): **Car or truck** ("Standard vehicle · attaches to a permit"), **Motorcycle or moped**, **Bicycle or eScooter** ("No parking permit required"). Each proceeds to the respective registration form (not built in the reference — implement the form per your API).

---

## Interactions & Behavior
- **Navigation:** SPA-style tab switching (Home / Permits / Vehicles / Citations / Account); brand lockup → Home. Prefer real routes (`/`, `/permits`, `/vehicles`, `/citations`, `/account`, `/permits/new`).
- **Purchase flow gating:** "Continue" disabled until an option is selected; "Agree & Continue" disabled until the agreement checkbox is checked. Back steps backward; from step 1 Back exits to Permits.
- **Announcement** is dismissible (persist dismissal per user/session).
- **Modal:** backdrop click and × both close.
- **Hover/press:** buttons lift slightly / darken (burnt-orange hover ≈ `#9A4600`); nav pills tint on hover; transitions ~150ms.
- **Empty vs populated states:** Citations shows the clear-state card at 0, a list otherwise; Vehicles meter reflects `count / max`; permit footer reflects attachment status.
- **Responsive:** desktop-first. Collapse the two-column grids to single column below ~840px; the top nav can move secondary items into a menu on narrow widths (optional for this build).

## State Management
- `currentRoute / activeTab`
- `purchase = { open, step: 'select'|'agreement'|'review'|'done', type: 'permits'|'passes'|'daypass', selectedOptionId, agreed }`
- `addVehicleModalOpen`
- `announcementDismissed`
- Server data: `user`, `permits[]`, `vehicles[]`, `citations[]`, `appeals[]`, `letters[]`, `permitOptions[]`, `passOptions[]`, `paymentMethods[]`

## Design Tokens

**Colors**
- Primary (burnt orange): `#BF5700`; hover `#9A4600`; pressed `#9A4500`
- Ink / headings & dark card: `#333F48`
- Text secondary: `#5C6670`, `#6B747B`; muted: `#8A9298`, `#98A0A6`, `#A2A9AE`; faint: `#B7BEC3`
- Page bg: `#F4F1EB`; card bg: `#FFFFFF`; subtle fill: `#F7F5F0`, `#F0EBE1`; input bg: `#FBFAF7`
- Borders: card `#E7E3DA`; dividers `#EEEAE1`, `#F1EDE4`; input `#E1DCD0`
- Success: `#2F7D4E` on tint `#E7F3EA`
- Info: `#005F86` on tint `#EAF3F7`, border `#CFE4EC`
- Announcement tint `#FBEEE3`, border `#F2D9C4`
- Danger: `#B3261E`, border `#F0D9D6`

**Typography** — Libre Franklin (Google Fonts), weights 400/500/600/700/800/900.
- Page title 24–26px / 800; card title 15–20px / 800; body 13–14px / 400–600; labels 11px / 800 uppercase, letter-spacing .4–.6px; plate chips 13px / 800, letter-spacing 1px.

**Radius** — buttons 12–14px; cards 14–18px; chips 6–12px; pills/badges 16–20px; avatar 50%.

**Shadows** — card `0 14px 34px -24px rgba(40,30,10,.3)`; primary button `0 12px 26px -8px rgba(191,87,0,.5)`.

**Spacing** — content padding `26px 40px`; grid/stack gaps 12–20px; nav height 62px; button heights 44–52px; input height 44px.

## Assets
- `assets/texas-seal.png` — official UT **shield + TEXAS** lockup, **white**, transparent bg (1020×227). Use on burnt-orange backgrounds. Used in the top-nav brand chip.
- `assets/texas-shield.png` — the **shield only**, cropped from the lockup, white/transparent (~187×238). For compact square placements.
- These are the licensed UT seal (permission granted for this project). **Use your codebase's official UT brand asset** if one already exists. All other glyphs are simple inline stroke **SVG icons** (home, ticket, car, bicycle, document, user, bell, cart, chevron, plus, check, QR, lock, calendar, info, close, back-arrow) — reproduce with your icon library (e.g. Lucide) or inline SVG.

## Files in this bundle
- `reference/UT Parking Redesign.dc.html` — the full HTML design reference (contains the desktop app plus the mobile/case-study scaffolding to ignore).
- `assets/texas-seal.png`, `assets/texas-shield.png` — brand marks.
- `screenshots/` — desktop renders of each screen (see below).

### Screenshots (`screenshots/`)
Reference renders of the desktop flow, in order:
1. `01-home.png` — Home / dashboard
2. `02-permits.png` — Permits & Passes
3. `03-vehicles.png` — Vehicles
4. `04-citations.png` — Citations
5. `05-account.png` — Account
6. `06-buy-select.png` — Purchase flow, step 1 (select option, with sticky summary)
7. `07-buy-agreement.png` — Purchase flow, step 2 (agreement + checkbox gate)
8. `08-buy-review.png` — Purchase flow, step 3 (review + payment)
9. `09-buy-confirmation.png` — Purchase flow, confirmation (order placed + QR)
10. `10-add-vehicle-modal.png` — Add-vehicle type-chooser modal

> ⚠️ The screenshots still show the **presentation wrapper** described in "What to strip out" — the outer "UT Parking Portal — Redesign" bar with the Mobile/Desktop + Design notes + Restart controls, and the browser-window frame (traffic-light dots + `parking.utexas.edu/portal` URL bar). These are **not** part of the product. Build only the app **inside** the browser frame (the top nav downward). Note the nav label may render on two lines in the capture due to the presentation width — set the nav items to `white-space: nowrap` and give them room in the real build.

## Notes for the implementer
- The reference is one HTML file; the desktop app markup lives inside the `isDesktop` branch of the template. Read it for exact structure, then rebuild with your components.
- Keep all original **copy** intact (labels, warnings, agreement text) — this redesign preserves wording and only improves layout, hierarchy, navigation, and trust.
- Treat every warning/notice as a scoped, contextual component (not full-width alarm banners) — that intent is core to the design.

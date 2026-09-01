# Autoclaim Design Guidelines
## Plan Manager Operating System for NDIS Compliance

---

## Design Approach

**Selected System: Carbon Design System** (IBM's enterprise design language)
**Rationale**: Purpose-built for data-dense, compliance-driven enterprise applications requiring trust, precision, and operational efficiency. Carbon excels at complex workflows, dashboard interfaces, and information hierarchy—exactly what Autoclaim demands.

**Core Principles**:
- Trust through clarity and consistency
- Efficiency over decoration
- Information density with breathing room
- Audit-grade precision in every interaction

---

## Typography System

**Font Stack**: IBM Plex Sans (via Google Fonts CDN)
```
Primary: 'IBM Plex Sans', system-ui, sans-serif
Monospace: 'IBM Plex Mono' (for claim IDs, dollar amounts, timestamps)
```

**Hierarchy**:
- Display/Hero: 48px, 600 weight (dashboard titles)
- H1: 32px, 600 weight (page headers)
- H2: 24px, 600 weight (section headers)
- H3: 20px, 600 weight (card headers, panel titles)
- Body Large: 16px, 400 weight (primary content)
- Body: 14px, 400 weight (table data, descriptions)
- Caption: 12px, 400 weight (metadata, timestamps, helper text)
- Label: 14px, 500 weight (form labels, buttons, badges)
- Monospace Numbers: 14px IBM Plex Mono (all financial figures, claim IDs)

---

## Layout System

**Spacing Primitives**: Tailwind units of **2, 4, 6, 8, 12, 16** (exceptionally 20, 24 for major sections)

**Grid Philosophy**:
- 12-column grid for desktop (max-w-7xl container)
- 4-column for tablet
- Single column for mobile
- Gutters: gap-6 (desktop), gap-4 (mobile)

**Page Structure**:
```
Top Nav (fixed): h-16
Side Nav (optional): w-64 (collapsible to w-16 icon-only)
Main Content: flex-1 with max-w-7xl mx-auto px-6
```

**Content Zones**:
- Dashboard cards: p-6
- Data tables: p-4
- Form panels: p-8
- Modal dialogs: p-6

---

## Component Library

### Navigation
**Top Bar** (fixed, full-width):
- Logo left (h-8)
- Search bar center (max-w-lg)
- User menu + notifications right
- Height: h-16, subtle bottom border

**Side Navigation** (optional, for app views):
- Expandable/collapsible (w-64 ↔ w-16)
- Icons + labels
- Active state indicator (left border accent)

### Data Display

**Status Badges**:
- Pill shape (rounded-full)
- px-3 py-1, text-xs font-medium uppercase tracking-wide
- States: Pending, Flagged, Approved, Rejected, Processing

**Data Tables**:
- Sticky header row
- Alternating row treatment for scannability
- Hover row highlight
- Right-align: numbers, amounts
- Left-align: text, names, IDs
- Compact vertical padding (py-3)
- Font: 14px body, 12px caption for metadata

**Claim Cards**:
- Border card design (not shadowed)
- Header: Claim ID (mono), Status badge, Amount (bold, mono)
- Body: Service details, Provider, Date
- Footer: Action buttons, metadata
- Size: p-6, rounded-lg border

**Dashboard Stats Cards**:
- Large number display (32px mono)
- Label below (14px)
- Optional trend indicator (+/- with icon)
- 2x2 or 4-column grid layout
- Minimal padding: p-6

### Forms & Inputs

**Input Fields**:
- Height: h-12
- Padding: px-4
- Border: 1px solid
- Rounded: rounded-md
- Labels: above input (mb-2, font-medium)
- Helper text: text-xs, mt-1

**Buttons**:
- Primary: h-10 px-6 rounded-md font-medium
- Secondary: h-10 px-6 rounded-md font-medium, outline variant
- Tertiary: text-only with hover underline
- Icon buttons: h-10 w-10 rounded-md

**Search Bar**:
- Prominent in top nav
- Icon left, clear icon right
- h-10, rounded-md
- Width: w-full max-w-lg

### Overlays & Modals

**Modal Dialogs**:
- Max-width: max-w-2xl
- Padding: p-8
- Header: border-b pb-4 mb-6
- Footer: border-t pt-4 mt-6, actions right-aligned
- Overlay: backdrop with blur

**Side Panels** (for claim details):
- Slide from right
- w-full md:w-1/2 lg:w-1/3
- Full height, scrollable
- Close icon top-right

**Tooltips**:
- Text: 12px
- Padding: px-3 py-2
- Max-width: max-w-xs
- Rounded: rounded

---

## Page-Specific Layouts

### Claims Operations Hub (Primary Workspace)
- Filters sidebar left (w-64)
- Main claim list (table or card view toggle)
- Claim detail panel right (collapsible)
- Bulk action bar when items selected (sticky top)

### Compliance Dashboard
- Stats overview: 4-column grid at top
- Risk indicators: 2-column below
- Validation logs: full-width table at bottom
- All cards with consistent p-6 padding

### Plan Intelligence View
- Plan header: full-width card with key metrics
- Category breakdown: 3-column grid
- Spend velocity chart: 2-column span
- Risk indicators sidebar: 1-column

### Outcome & Analytics
- Date range selector: top right
- KPI cards: 4-column grid
- Trend charts: 2-column layout
- Detailed tables: full-width expandable sections

---

## Icons

**Library**: Heroicons (outline for navigation, solid for status indicators)
**CDN**: Latest Heroicons via CDN
**Usage**:
- Navigation: 20px outline icons
- Status/badges: 16px solid icons
- Action buttons: 20px outline
- Inline alerts: 20px solid

---

## Animations

**Minimal and Purposeful**:
- Page transitions: None (instant)
- Modal entry: Fade in (150ms)
- Dropdown menus: Slide down (100ms)
- Button hover: Subtle scale (duration-75)
- Loading states: Skeleton screens (no spinners unless API call >2s)

**NO**:
- Scroll-triggered animations
- Decorative motion
- Parallax effects

---

## Accessibility

- All interactive elements: min 44px touch target
- Form inputs: visible focus states with 2px outline offset
- Skip navigation link
- ARIA labels on icon-only buttons
- Table headers: scope attributes
- Error states: icon + text (never color alone)

---

## Critical Design Notes

1. **Enterprise Trust**: Every element reinforces precision, reliability, audit-readiness
2. **Information Density**: Pack data efficiently while maintaining scannability
3. **Monospace Numbers**: ALL financial figures, claim IDs, dates in monospace font
4. **Consistent Metadata**: Timestamps, user attribution in 12px caption style throughout
5. **Status-First Design**: Claim status immediately visible in every context
6. **No Marketing Fluff**: This is an operational tool—clarity over creativity
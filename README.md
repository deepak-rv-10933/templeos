# TempleOS

**Tamil Nadu HR&CE Digital Temple Platform** — mobile-first, Tamil-first SaaS for
temple discovery, pilgrimage planning, online services, and cultural preservation.

Built with React 19 · TypeScript · Vite · Tailwind CSS v4 · TanStack Query ·
React Router · Framer Motion. Data flows through a **swappable service layer** so
the mock backend can be replaced with Zoho Catalyst without touching the UI.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # type-check + production build
npm run typecheck  # tsc only
npm run lint       # eslint
npm run format     # prettier
```

## What's in this scaffold

This is the **foundation + design system** slice: the full app shell, navigation,
design tokens, component library, mock data layer, and every route wired up.

- **Design system** (`src/styles/globals.css`) — colors, typography scale, 8pt
  spacing, radii and soft shadows from the spec, as Tailwind v4 CSS-first tokens.
- **Core components** (`src/components/ui`) — Button, Input, Card, Badge, Avatar,
  Dialog, Drawer, Tabs, Table, Timeline, ProgressBar, Skeleton, SmartImage.
- **Temple components** (`src/components/temple`) — TempleCard, FeedCard,
  FestivalCard, RouteCard, BookingCard, DonationCard, SponsorCard, QRCard,
  JourneyCard, HeroBanner, GalleryGrid, TempleMap, KpiStat, CategoryChip.
- **Public pages** — Home, Explore (grid/list/map), Updates feed, Temple Profile
  (all sections + Follow/Book/Donate CTAs), Booking flow → QR ticket, Bookings,
  My Temple dashboard (passport, journey), Pilgrimage route detail.
- **Admin pages** — Dashboard, Temples, Bookings, Analytics (live), plus scaffolded
  placeholders for Services, Donations, Renovation, Sponsors, Users, Reports, Settings.
- **i18n** — Tamil-first with instant English switch (`src/store/locale.tsx`).
- **Accessibility** — senior-citizen mode + high-contrast mode (`src/store/preferences.tsx`).

## Folder structure

```
src/
  app/          App providers, router, navigation config
  components/   ui/ (primitives) · temple/ (domain) · common/ · layout/
  features/     feature modules (e.g. booking flow)
  hooks/        TanStack Query hooks
  i18n/         UI string dictionary
  layouts/      AppShell (public) · AdminLayout
  pages/        route pages (+ admin/)
  services/     service interfaces + mock impl (the swap point)
  store/        locale + preferences context
  styles/       design tokens + base CSS
  types/        domain model
  utils/        cn, format, icons
```

## Deploying to Zoho Catalyst Slate

This app is a Vite + React SPA — deploy it on Slate with Git-based hosting:

1. In the Catalyst console, open your project → **Slate** → **Start Exploring** (one-time).
2. Create a Slate app and connect this GitHub repo (`deepak-rv-10933/templeos`).
3. Settings (Slate auto-detects most of these):
   - **Framework:** `React (Vite)` — i.e. `react-vite` (gives SPA fallback so deep
     links like `/explore` and `/temple/:slug` resolve; do **not** pick `static`).
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **Base path:** leave at root `/` (this repo sets no Vite `base`, so assets
     serve correctly from root — setting a base path would 404 every asset).

CLI alternative:

```bash
catalyst slate:create --name templeos --framework react-vite --default
catalyst deploy slate -m "initial deploy"
```

> When you later add Catalyst Functions and call them from this Slate app, add the
> Slate domain under Authentication → Whitelisting (enable CORS) and let the gateway
> inject CORS headers — don't set them in function code for production origins.

## Swapping mock → Catalyst

The UI depends only on the `Api` interface (`src/services/api.types.ts`). To move
to Zoho Catalyst:

1. Implement `Api` in `src/services/catalyst/index.ts` (Data Store + Functions).
2. Change one line in `src/services/index.ts`:
   `export const api = catalystApi;`

No component changes required.

## Notes on mock assets

Image fields hold **seed strings**, not URLs. `<SmartImage>` turns a seed into a
deterministic calm gradient, so the app ships with zero external asset
dependencies. Replace seeds with real Catalyst Stratus URLs later — `SmartImage`
renders them as `<img>` automatically.

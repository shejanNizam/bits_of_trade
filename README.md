# BitsOfTrade

BitsOfTrade is a discipline-first trading journal and analytics dashboard for traders who want structure around execution, risk, journaling, and learning. The frontend is a Next.js application that connects to a backend API for authentication, trade imports, reports, learning content, subscriptions, notifications, and account management.

The product is organized around three ideas:

- **Discipline**: rules, limits, session states, violations, and safeguards before traders add or import more trades.
- **Journal**: daily reviews, trade notes, psychology logs, learning notes, mistakes, and rule links.
- **Learning**: structured lessons, courses, videos, and progress tracking connected back to trading performance.

## Tech Stack

- **Framework**: Next.js 15 App Router
- **Language**: TypeScript
- **UI**: React 19, Tailwind CSS 4, Ant Design 6
- **State/Data**: Redux Toolkit, RTK Query, React Redux
- **Charts**: Recharts
- **Theme**: next-themes plus Ant Design theme tokens
- **Auth integrations**: JWT backend auth and Google Identity Services
- **Payments**: Razorpay checkout loaded client-side through backend-created orders
- **Deployment target**: Vercel or any Node-compatible Next.js host

## Main Features

### Public Website

- Home page with product positioning, discipline system sections, reviews, pricing, and FAQs.
- Public pages for:
  - `/how-it-works`
  - `/discipline-system`
  - `/learning-hub`
  - `/pricing`
  - `/faqs`
- Public discipline test flow at `/discipline-test`.

### Authentication

- Email/password signup and login.
- Google sign-in through Google Identity Services.
- Forgot password, reset password, and verification flows.
- JWT access token storage in `localStorage`.
- `auth-token` browser cookie for Next.js middleware route protection.

### Onboarding

- New users are routed through `/onboarding`.
- Onboarding uses a welcome screen, question flow, and completion step.
- Authenticated users are sent to `/user-dashboard` after onboarding completion.

### Dashboard

The authenticated dashboard is under `/user-dashboard` and is split into four sidebar sections.

**Core**

- **Overview**: session status, P&L charts, calendar, metrics, trade distribution, discipline vs performance, and generated summaries.
- **Discipline Guard**: current status, active session rules, and violations timeline.
- **Trade Log**: manual trade creation, edit/preview/delete actions, bulk delete, import, pagination, filters, and trade tagging.
- **Journal**: daily journal, trade notes, psychology log, mistakes, rules, session recap, learning notes, streaks, and recent entries.

**Analysis**

- **Reports**: tabbed reports for performance, risk/drawdown, behavior, strategy, and journal analysis.
- **Insights**: behavioral scoring, trade scorecard, insight cards, overview categories, and strategy health.
- **Trade Intelligence**: on-demand backend analysis by market, broker, period, and custom date range.

**Improve**

- **Learning Hub**: lessons, courses, video watching, course progress, completed/in-progress state, and learning impact views.
- **Strategy Library**: personal strategies, community strategies, templates, search, create, edit, and add-to-mine flows.

**System**

- **Rules & Limits**: system default rules, custom rules, active/hard/soft rule stats, editing, deletion, and warning flows.
- **Mistakes**: mistake list, analytics, severity distribution, frequency, and impact views.
- **Settings**: profile, notifications, security, data/privacy, and billing.

## Route Map

| Area | Routes |
| --- | --- |
| Public | `/`, `/how-it-works`, `/discipline-system`, `/learning-hub`, `/pricing`, `/faqs`, `/discipline-test` |
| Auth | `/login`, `/signup`, `/forgot-password`, `/reset-password`, `/verify-code` |
| Onboarding | `/onboarding`, `/onboarding/discipline-test` |
| Dashboard Core | `/user-dashboard`, `/user-dashboard/discipline-guard`, `/user-dashboard/trade-log`, `/user-dashboard/journal` |
| Dashboard Analysis | `/user-dashboard/reports`, `/user-dashboard/insights`, `/user-dashboard/trade-intelligent` |
| Dashboard Improve | `/user-dashboard/learning-hub`, `/user-dashboard/strategy-library` |
| Dashboard System | `/user-dashboard/rules-limit`, `/user-dashboard/mistakes`, `/user-dashboard/settings` |
| Settings | `/user-dashboard/settings/profile`, `/user-dashboard/settings/notification`, `/user-dashboard/settings/security`, `/user-dashboard/settings/data-privacy`, `/user-dashboard/settings/billing` |

## Subscription Access

Dashboard feature access is controlled in `src/app/(userDashboard)/user-dashboard/components/SubscriptionGuard.tsx`.

Supported subscription types:

- `none`
- `tool`
- `learning`
- `both`

Access rules:

- `tool` or `both` can access trade tools such as Trade Log, Discipline Guard, Reports, Insights, Journal, Rules, Mistakes, Strategy Library, and Trade Intelligence.
- `learning` or `both` can access the dashboard Learning Hub.
- Settings are always open so users can manage profile, billing, and upgrades.

## Trade Import

Trade import is handled from the Trade Log import modal.

Supported broker presets:

- Zerodha
- Upstox
- Groww
- Angel One
- Fyers
- Dhan
- Custom/other broker name

Supported file formats:

- `.csv`
- `.xls`
- `.xlsx`
- `.ods`

Import constraints:

- Maximum file size: 10 MB.
- Required columns include `symbol`, `entry_price`, `exit_price`, `quantity`, and `segment`.
- Expected date format: `YYYY-MM-DD HH:MM:SS`.
- Sample import template: `public/templates/BitsOfTrade_Universal_Import_Template.xlsx`.

Imported trades should be tagged after upload with strategy, rules followed or violated, mistakes, psychology context, and notes so reports and insights stay accurate.

## Project Structure

```text
src/
  app/
    (main)/                  Public marketing routes and layouts
    (auth)/                  Login, signup, password, verification routes
    (onboarding_discipline)/ Onboarding and discipline test routes
    (userDashboard)/         Protected dashboard routes and dashboard components
    globals.css              Tailwind v4 setup and global theme variables
    layout.tsx               Root providers and app metadata
  components/                Shared and public-page components
  contexts/                  Dashboard filter context
  hooks/                     Shared React hooks
  Providers/                 Redux, Ant Design, and theme providers
  redux/
    api/                     Base API, auth API, user API
    features/                RTK Query slices for app domains
    slices/                  Redux slices such as auth
    store.ts                 Redux store setup
  types/                     Shared TypeScript interfaces
  utils/                     API errors, cookies, alerts, theme, scrolling
```

Important root files:

- `package.json`: scripts and dependencies.
- `next.config.ts`: Next.js configuration and remote image allowlist.
- `eslint.config.mjs`: Next.js and TypeScript ESLint config.
- `postcss.config.mjs`: Tailwind CSS 4 PostCSS plugin.
- `learning-hub.txt`: backend Learning Hub API documentation/reference.
- `vercel.json`: deployment rewrite config. Review this before production if SSR or App Router routes behave unexpectedly.

## API Integration

All RTK Query endpoints extend `src/redux/api/baseApi/baseApi.ts`.

The base API:

- Reads `NEXT_PUBLIC_API_URL`.
- Sends `credentials: "include"`.
- Adds `Authorization: Bearer <token>` from `localStorage` when a token exists.
- Uses RTK Query tags for cache invalidation across auth, onboarding, overview, discipline, trade log, journal, reports, insights, rules, mistakes, strategies, settings, notifications, pricing, payments, blog, and learning modules.

Main API slices:

- `authApi`: register, login, password reset, email verification, password change.
- `userApi`: current user and profile updates.
- `tradelogApi`: import, create, update, list, single trade, delete, bulk delete, screenshot upload.
- `overviewApi`: overview, trade distribution, calendar data.
- `disciplineApi`: current session, violations timeline, journal unlock.
- `journalApi`: daily journals, notes, psychology logs, trade links, session recaps, learning notes, streaks.
- `reportsApi`: performance, risk, behavior, strategy, and journal reports.
- `insightsApi`: insights metrics and scorecards.
- `tradeIntelligenceApi`: trade intelligence analysis.
- `rulesApi`: system rules and custom rules.
- `mistakeApi`: mistakes and mistake analytics.
- `strategyApi`: personal, community, template, and add-to-mine strategies.
- `learninghubApi`: lessons, courses, videos, course progress, watch/unwatch video.
- `learninghubPublicApi`: public Learning Hub CMS content.
- `notificationApi`: notifications, unread count, read/delete/clear, settings.
- `pricingApi`: pricing plans, Razorpay order creation, payment history.
- `reviewApi`, `blogApi`, `settingApi`, `utilsApi`, `accountDeletionApi`.

## Environment Variables

Create a local environment file such as `.env.local` and provide:

```env
NEXT_PUBLIC_API_URL=https://your-api.example.com
NEXT_PUBLIC_IMAGE_URL=https://your-api.example.com
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

Notes:

- Do not commit real environment values.
- The backend must allow the frontend origin for CORS and credentials.
- Google OAuth must include the local and production frontend origins.
- `next.config.ts` currently allows remote images from `bitsapi.dsrt321.online`; update it if your image host changes.

## Getting Started

### Prerequisites

- Node.js 20 or newer recommended.
- npm, using the committed `package-lock.json`.
- A running backend API compatible with the endpoint paths used by the RTK Query slices.

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### Build

```bash
npm run build
```

### Start Production Build

```bash
npm run start
```

### Lint

```bash
npm run lint
```

There is no test script configured in `package.json` at the moment.

## Styling and Theme

- Tailwind CSS 4 is imported in `src/app/globals.css`.
- Light/dark mode uses `next-themes` with the `bits-of-trade-theme` storage key.
- Ant Design is configured through `ThemeProvider` and `src/utils/antTheme.ts`.
- The root layout wraps the app with Redux, Ant Design registry, and theme providers.

## Auth and Middleware Flow

1. User logs in through email/password or Google.
2. The app stores the access token in `localStorage`.
3. The app writes the same access token to an `auth-token` cookie for middleware.
4. `src/middleware.ts` reads `auth-token` and protects dashboard routes.
5. Authenticated users are redirected away from public/auth routes to `/user-dashboard`.
6. Unauthenticated users trying to access protected routes are redirected to `/login`.

Public routes are defined directly in `src/middleware.ts`.

## Payments

Pricing cards are populated from `/api/cms/pricing/`.

Purchase flow:

1. User chooses a plan.
2. Frontend calls `/api/payments/create-order/`.
3. Backend returns Razorpay order data and key.
4. Frontend loads `https://checkout.razorpay.com/v1/checkout.js`.
5. Razorpay handles checkout.
6. Backend webhook should activate the subscription server-side.

Plan card keys used by the frontend:

- `discipline_tools`
- `learning_hub`
- `combo_monthly`
- `combo_annual`

## Deployment Notes

For Vercel or another production host:

1. Set all required environment variables.
2. Confirm the backend API allows the production frontend origin.
3. Configure Google OAuth authorized origins and redirect settings.
4. Configure Razorpay webhooks on the backend.
5. Verify remote image hosts in `next.config.ts`.
6. Review `vercel.json`; the current SPA-style rewrite may not be appropriate for all Next.js App Router deployments.

## Development Notes

- Keep API access inside RTK Query slices where possible.
- Use the shared dashboard filter context for cross-dashboard trade filters.
- Keep auth-sensitive dashboard pages under `/user-dashboard` so middleware and subscription guards apply consistently.
- Use existing shared components for buttons, modals, loading states, theme toggles, navbar, and footer.
- Imported trade data is intentionally raw; downstream analytics depend on users completing trade tags and journal context.


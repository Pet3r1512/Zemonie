# Zemonie Project Structure

A Gen Z-focused money management app — monorepo with client (React SPA) and server (Hono API), both deployed to Cloudflare Workers.

---

## Root

| Path | Purpose |
|---|---|
| `client/` | React frontend (Vite + TanStack Router + Tailwind v4) |
| `server/` | Hono + tRPC backend (Prisma + Neon PostgreSQL) |
| `public/` | Shared brand assets (`zemonie_icon.svg`, `zemonie_logo.webp`) |
| `.github/` | GitHub Actions CI & deploy workflows |
| `DESIGN_SYSTEM.md` | Design system reference (colors, typography, components) |
| `package.json` | Root workspace scripts (`dev` runs both client & server via concurrently) |
| `pnpm-workspace.yaml` | Declares `client` and `server` as workspace packages |

---

## Client (`client/`)

### Config Files

| File | Purpose |
|---|---|
| `vite.config.ts` | Vite config (TanStack Router plugin, React plugin, Cloudflare plugin, proxy) |
| `vitest.config.ts` | Vitest test runner config |
| `vitest.workspace.ts` | Vitest workspace (Chromium, Firefox, WebKit browser projects) |
| `wrangler.toml` | Cloudflare Workers production deployment config |
| `wrangler.staging.toml` | Cloudflare Workers staging deployment config |
| `tsconfig.app.json` | TypeScript config for app source (`src/`) |
| `tsconfig.node.json` | TypeScript config for tooling (`vite.config.ts`) |
| `components.json` | shadcn/ui config (aliases, base color) |
| `eslint.config.js` | Flat ESLint config (TypeScript, React hooks, Storybook) |
| `postcss.config.js` | PostCSS with Tailwind v4 |
| `index.html` | HTML entry point |
| `setupTests.ts` | Vitest test setup (global mocks, matchers) |
| `.prettierrc` | Prettier code formatting config |
| `.prettierignore` | Prettier ignore rules |
| `.storybook/` | Storybook config (main, preview, vitest addon) |
| `.husky/` | Git hooks (pre-commit runs lint-staged) |

### `src/` — Application Source

```
src/
├── api/              # API client functions (tRPC + fetch wrappers)
├── assets/           # Static images (react.svg)
├── components/       # UI components
├── constant/         # Constants (auth URLs)
├── helpers/          # Utility functions (hex-to-alpha, date parsing, name shortening)
├── hooks/            # Custom React hooks (session, user, transactions, screen size, theme)
├── lib/              # Core modules (auth-client, navigation, types, cn() utility)
├── routes/           # TanStack Router file-based routes
├── store/            # Zustand stores (balance)
├── stories/          # Storybook stories
├── types/            # TypeScript type definitions
├── main.tsx          # App entry point (Router + QueryClient setup)
├── index.css         # Global styles (Tailwind v4, theme variables, dark mode)
└── routeTree.gen.ts  # Auto-generated route tree
```

#### `api/` — API Client

| Path | Purpose |
|---|---|
| `categories/getGlobalCategories.ts` | Fetch default categories |
| `dashboard/charts/SpendingByCategory.ts` | Spending-by-category chart data |
| `users/accountSetup.ts` | Initial account setup |
| `users/checkUserSetup.ts` | Check if setup is complete |
| `users/createBalance.ts` | Create initial balance |
| `users/analytics/income/` | Income analytics (highest income, growth, total by month) |
| `users/analytics/expenses/` | Expense analytics (highest category, total by month) |
| `users/auth/` | Auth API (sign in, sign up, log out) |
| `users/balances/getCurrentBalance.ts` | Fetch current balance |
| `users/dashboard/getLatestTransactions.ts` | Fetch latest transactions |
| `users/transactions/createNewTransaction.ts` | Create a transaction |
| `users/transactions/getTransactions.ts` | Fetch paginated transactions |

#### `components/` — UI Components

| Path | Purpose |
|---|---|
| `SEO.tsx` | SEO meta tags component |
| `ThemeToggle.tsx` | Dark/light mode toggle |
| `AboutUs/` | About Us page (team, timeline, values) |
| `Auth/SignIn/` | Sign-in page + form |
| `Auth/SignUp/` | Sign-up page + form + tests |
| `Auth/FormErrorMessage.tsx` | Shared form error display |
| `Auth/SignInViaGoogleBtn.tsx` | Google OAuth button |
| `Banner/` | Release notes banner + version tag |
| `Dashboard/DashboardLayout.tsx` | Dashboard layout wrapper |
| `Dashboard/Category/CategoryTag.tsx` | Category badge/tag display |
| `Dashboard/Charts/` | Donut chart, spending-by-category |
| `Dashboard/Details/` | Expense/income detail views with tables |
| `Dashboard/InitAccountLayout.tsx` | First-time setup flow layout |
| `Dashboard/Overall/` | Dashboard summary cards, income/expense forms, category selectors |
| `Dashboard/Profile/` | User profile page |
| `Dashboard/Setup/` | Account setup form + avatar picker |
| `Dashboard/Sidebar/` | Sidebar (user info, footer) |
| `Dashboard/Transactions/` | Transaction list, grouped by date, summary |
| `Features/` | Landing features page (hero, showcase, grid, CTA) |
| `Layout/Header/` | Header with navbar + mobile sidebar |
| `Layout/Footer/` | Footer sections |
| `Layout/Home/` | Landing page (Hero, Features sections) |
| `Layout/LoadingScreen.tsx` | Loading spinner |
| `Layout/Logo.tsx` | Zemonie logo component |
| `Layout/Page.tsx` | Generic page wrapper |
| `ui/` | shadcn/ui primitives (button, dialog, select, table, sidebar, etc.) |
| `svg/GoogleSVG.tsx` | Google logo SVG |

#### `helpers/` — Utility Functions

| File | Purpose |
|---|---|
| `convertHexToAlpha.ts` | Convert hex color to rgba with alpha |
| `formatCurrency.ts` | Format number as currency string |
| `localISOString.ts` | Current local datetime as ISO string with timezone offset |
| `parseISOStringData.ts` | Parse ISO date string to locale-formatted date |
| `shortenUserName.ts` | Truncate long user names |

#### `lib/` — Core Modules

| File | Purpose |
|---|---|
| `auth-client.ts` | Better-Auth client config |
| `groupTransactions.ts` | Group transactions by local date |
| `navigations.ts` | Navigation menu definitions |
| `ping.ts` | Keep-alive ping to prevent cold starts |
| `utils.ts` | `cn()` utility (Tailwind class merging) |
| `types/` | Shared TypeScript types (sign-in/sign-up forms) |

#### `hooks/` — Custom Hooks

| Hook | Purpose |
|---|---|
| `useScreenSize.ts` | Responsive breakpoints (xs → 2xl) |
| `useMobile.ts` | Mobile detection |
| `useTheme.ts` | Dark/light theme |
| `useFetchSession.ts` | Auth session fetching |
| `useFetchUser.ts` | User data fetching |
| `useFetchTransactions.ts` | Paginated transaction fetching |
| `useFetchCurrentMonthIncome.ts` | Current month's income |
| `useLogOut.ts` | Logout handler |
| `useCurrentUrl.ts` | Current URL path |

#### `store/` — State Management

| File | Purpose |
|---|---|
| `store.ts` | Zustand balance store |

#### `types/` — TypeScript Type Definitions

| File | Purpose |
|---|---|
| `CategoryDict.ts` | Category ID → name/color lookup |
| `ComponentMap.ts` | Component registry for dynamic rendering |
| `Tailwind2Hex.ts` | Tailwind color names → hex values |

#### `routes/` — File-Based Routes (TanStack Router)

| Route | Component |
|---|---|
| `__root.tsx` | Root layout (sidebar, header, auth guard) |
| `index.tsx` | Home/landing page |
| `about-us.tsx` | About Us page |
| `cookie-policy.tsx` | Cookie Policy page |
| `faq.tsx` | FAQ page |
| `features.tsx` | Features page |
| `privacy.tsx` | Privacy Policy page |
| `release-notes.tsx` | Release notes / changelog |
| `terms.tsx` | Terms of Service page |
| `auth/signin.tsx` | Sign-in page |
| `auth/signup.tsx` | Sign-up page |
| `dashboard/index.tsx` | Dashboard main page |
| `dashboard/income.tsx` | Income detail page |
| `dashboard/expenses.tsx` | Expense detail page |
| `dashboard/profile.tsx` | Profile / settings page |
| `dashboard/transactions.tsx` | Transactions list |

---

## Server (`server/`)

### Config Files

| File | Purpose |
|---|---|
| `wrangler.jsonc` | Cloudflare Worker production config (cron, domain, env vars) |
| `wrangler.staging.jsonc` | Cloudflare Worker staging config (cron, domain, env vars) |
| `tsconfig.json` | TypeScript config |
| `prisma.config.ts` | Prisma config (schema path, datasource) |
| `prisma/schema.prisma` | Database schema |
| `.dev.vars` | Local dev secrets for wrangler |
| `.env` | Environment variables |

### `src/` — Server Source

```
src/
├── index.ts          # Hono app entry (CORS, session, tRPC mount, auth mount, cron)
├── env.ts            # Zod-validated environment variables
├── server/           # tRPC routers
├── lib/              # Auth config, Prisma client, analytics utilities
├── helpers/          # (empty)
└── utils/            # (empty)
```

#### `src/server/` — tRPC Routers

| File | Procedures |
|---|---|
| `tRPC.ts` | tRPC initialization (router, publicProcedure) |
| `context.ts` | tRPC context (request, response, auth) |
| `server.ts` | tRPC fetch handler with CORS |
| `_index.ts` | Root router (merges all sub-routers) |
| `transactions.ts` | getTransactions, addTransaction, summaries |
| `balance.ts` | createDefaultBalance, getCurrentBalance |
| `categories.ts` | seedDefaultCategories, getGlobalCategories |
| `analytics.ts` | highestIncomeOfMonth, incomeGrowth, expense analytics |
| `user.ts` | setup (avatar, currency, balance) |

#### `src/lib/` — Core Modules

| File | Purpose |
|---|---|
| `auth.ts` | Better-Auth config (adapter, email/password, sessions) |
| `prisma.ts` | Prisma client with Neon adapter |
| `analytics/CalculateHighestIncome.ts` | Highest income calculation utility |

### Database Models (`prisma/schema.prisma`)

| Model | Key Fields |
|---|---|
| **User** | id, name, email, emailVerified, image, createdAt |
| **User_Preferences** | id, userId (unique), currency, avatar, theme, isSetupDone |
| **Session** | id, expiresAt, token, userId, ipAddress, userAgent |
| **Account** | id, accountId, providerId, userId, accessToken, refreshToken, scope, password |
| **Verification** | id, identifier, value, expiresAt |
| **Category** | id, userId (nullable = global), name, description, type (INCOME/EXPENSE) |
| **Transaction** | id, userId, categoryId, amount (Decimal), currency, description, createdAt |
| **Balance** | id, userId (unique), amount (Decimal), currency |

Enums: `CategoryType` (INCOME, EXPENSE), `SupportedCurrency` (USD, AUD, VND)

### Migrations (`prisma/migrations/`)

| Migration | Purpose |
|---|---|
| `0001_init` | Initial schema |
| `20260527000000_add_indexes` | Composite indexes for query performance |
| `20260527054805_create_user_preferences` | Extract preferences from User into own table |
| `20260527054900_remove_is_setup_done_from_user` | Cleanup migrated field |

---

## Client `public/` Assets

| Directory | Content |
|---|---|
| `favicon.ico` | Browser tab favicon |
| `robots.txt` | Crawler rules |
| `sitemap.xml` | SEO sitemap |
| `logo/` | Zemonie icon and logo (SVG + WebP) |
| `screenshots/` | App screenshots (Dashboard.webp) |

---

## CI/CD — `.github/workflows/`

| File | Trigger | Purpose |
|---|---|---|
| `ci.yaml` | PR + push to master | Tests (Chromium, Firefox, WebKit) then build |
| `deploy-staging.yaml` | PR to master + workflow_dispatch | Deploy client + server to staging workers |
| `release.yaml` | Tag push `v*` | Deploy client + server to production workers |

---

## Tests

| File | Type |
|---|---|
| `client/src/components/Auth/SignUp/SignUpForm.test.tsx` | Component test (Vitest + React Testing Library) |
| `client/src/components/Layout/Logo.test.tsx` | Component test (Vitest + React Testing Library) |
| `client/src/helpers/shortenUserName.test.tsx` | Unit test (Vitest) |

Tests are written for Vitest and run via `@storybook/experimental-addon-test` across Chromium, Firefox, and WebKit.

---

## Storybook Stories (`client/src/stories/`)

| Story | Path |
|---|---|
| `ThemeToggle` | `ThemeToggle.stories.tsx` |
| `SignUpForm` | `auth/SignUp/SignUpForm.stories.tsx` |
| `Header` | `Layout/Header/Header.stories.tsx` |
| `Navbar` | `Layout/Header/Navbar.stories.tsx` |
| `Sidebar` | `Layout/Header/Sidebar.stories.tsx` |
| `Hero` | `Layout/Home/Hero.stories.tsx` |
| `Screenshot` | `Layout/Home/Screenshot.stories.tsx` |
| `FeatureCards` | `Layout/Home/Features/FeatureCards.stories.tsx` |
| `Features` | `Layout/Home/Features/Features.stories.tsx` |
| `Page` | `Layout/Page.stories.tsx` |

---

## Key Data Flow

```
Browser → Cloudflare Worker (client) → API calls → Cloudflare Worker (server) → Prisma → Neon PostgreSQL
                               ↑                            ↑
                         TanStack Router              Hono + tRPC
                         React Query                  Better-Auth
                         Tailwind v4                  Zod validation
```

- Dev: Vite proxy forwards `/api/*` to `localhost:8787`
- Prod: `www.zemonie.site` → client worker, `api.zemonie.site` → server worker
- Auth session cookies shared cross-subdomain
- Cron job pings server every 5 min to keep DB warm

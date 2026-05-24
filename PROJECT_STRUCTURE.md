# Zemonie Project Structure

A Gen Z-focused money management app — monorepo with client (React SPA) and server (Hono API), both deployed to Cloudflare Workers.

---

## Root

| Path | Purpose |
|---|---|
| `client/` | React frontend (Vite + TanStack Router + Tailwind v4) |
| `server/` | Hono + tRPC backend (Prisma + Neon PostgreSQL) |
| `public/` | Shared brand assets (logos, icons) |
| `.github/` | GitHub Actions CI workflows |
| `package.json` | Root workspace scripts (`dev` runs both client & server via concurrently) |
| `pnpm-workspace.yaml` | Declares `client` and `server` as workspace packages |

---

## Client (`client/`)

### Config Files

| File | Purpose |
|---|---|
| `vite.config.ts` | Vite config (TanStack Router plugin, React plugin, Cloudflare plugin, proxy) |
| `vitest.config.ts` | Vitest test runner config |
| `wrangler.toml` | Cloudflare Workers deployment config |
| `tsconfig.app.json` | TypeScript config for app source (`src/`) |
| `tsconfig.node.json` | TypeScript config for tooling (`vite.config.ts`) |
| `components.json` | shadcn/ui config (aliases, base color) |
| `eslint.config.js` | Flat ESLint config (TypeScript, React hooks, Storybook) |
| `postcss.config.js` | PostCSS with Tailwind v4 |
| `index.html` | HTML entry point |
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
| `users/accountSetup.ts` | Initial account setup |
| `users/checkUserSetup.ts` | Check if setup is complete |
| `users/createBalance.ts` | Create initial balance |
| `users/analytics/income/` | Income analytics (highest income, growth, total by month) |
| `users/analytics/expenses/` | Expense analytics (highest category, total by month) |
| `users/auth/` | Auth API (sign in, sign up, log out) |
| `users/balances/getCurrentBalance.ts` | Fetch current balance |
| `users/dashboard/getLatestTransactions.ts` | Fetch latest transactions |
| `users/transactions/` | Transaction CRUD |

#### `components/` — UI Components

| Path | Purpose |
|---|---|
| `Auth/SignIn/` | Sign-in page + form |
| `Auth/SignUp/` | Sign-up page + form + tests |
| `Auth/FormErrorMessage.tsx` | Shared form error display |
| `Auth/SignInViaGoogleBtn.tsx` | Google OAuth button |
| `Dashboard/DashboardLayout.tsx` | Dashboard layout wrapper |
| `Dashboard/Details/` | Expense/income detail views with tables |
| `Dashboard/InitAccountLayout.tsx` | First-time setup flow layout |
| `Dashboard/Overall/` | Dashboard summary, income/expense forms, category selectors |
| `Dashboard/Setup/` | Account setup form + avatar picker |
| `Dashboard/Sidebar/` | Sidebar (user info, footer) |
| `Dashboard/Transactions/` | Transaction list, grouped by date, summary |
| `Layout/Header/` | Header with navbar + mobile sidebar |
| `Layout/Footer/` | Footer sections |
| `Layout/Home/` | Landing page (Hero, Features sections) |
| `Layout/LoadingScreen.tsx` | Loading spinner |
| `Layout/Logo.tsx` | Zemonie logo component |
| `Layout/Page.tsx` | Generic page wrapper |
| `ui/` | shadcn/ui primitives (button, dialog, select, table, sidebar, etc.) |
| `svg/GoogleSVG.tsx` | Google logo SVG |
| `ThemeToggle.tsx` | Dark/light mode toggle |

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

#### `routes/` — File-Based Routes (TanStack Router)

| Route | Component |
|---|---|
| `index.tsx` | Home/landing page |
| `auth/signin.tsx` | Sign-in page |
| `auth/signup.tsx` | Sign-up page |
| `dashboard/index.tsx` | Dashboard main page |
| `dashboard/income.tsx` | Income detail page |
| `dashboard/expenses.tsx` | Expense detail page |
| `dashboard/transactions.tsx` | Transactions list |
| `dashboard/settings.tsx` | Settings page |
| `dashboard/helps.tsx` | Help/FAQ page |
| `pricing.tsx` | Pricing page |

---

## Server (`server/`)

### Config Files

| File | Purpose |
|---|---|
| `wrangler.jsonc` | Cloudflare Worker config (cron, domain, env vars) |
| `tsconfig.json` | TypeScript config |
| `prisma.config.ts` | Prisma config (schema path, datasource) |
| `prisma/schema.prisma` | Database schema (User, Session, Account, Transaction, Category, Balance) |
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
| `balances.ts` | createDefaultBalance, getCurrentBalance |
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
| **User** | id, name, email, isSetupDone |
| **Session** | id, expiresAt, token, userId |
| **Account** | id, accountId, providerId, userId |
| **Verification** | id, identifier, value, expiresAt |
| **Category** | id, userId (nullable = global), name, type (INCOME/EXPENSE) |
| **Transaction** | id, userId, categoryId, amount (Decimal), currency, description |
| **Balance** | id, userId (unique), amount (Decimal), currency |

Enums: `CategoryType` (INCOME, EXPENSE), `SupportedCurrency` (USD, AUD, VND)

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

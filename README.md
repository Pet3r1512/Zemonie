# Zemonie

Money management built for Gen Z — track spending, manage budgets, and grow savings with clarity.

[![CI](https://img.shields.io/github/actions/workflow/status/Pet3r1512/Zemonie/ci.yaml?branch=master&label=CI)](https://github.com/Pet3r1512/Zemonie/actions/workflows/ci.yaml)
[![Coverage](https://codecov.io/gh/Pet3r1512/Zemonie/branch/master/graph/badge.svg)](https://app.codecov.io/gh/Pet3r1512/Zemonie)
[![License: MIT](https://img.shields.io/github/license/Pet3r1512/Zemonie)](LICENSE)

---

## About the Project

Many members of Gen Z struggle with managing their finances and planning for the future. **Zemonie** is designed to provide greater clarity around spending habits and financial decisions.

In its initial release, Zemonie offers a simple platform where users can easily track expenses, make notes about spending, and visualize income and expenses through intuitive charts.

**Live:** [zemonie.site](https://www.zemonie.site)

---

## Features

### Transactions

- Create income and expense transactions with common categories
- View all transactions grouped by date, with a transaction details popup
- Update transactions
- Recurring transactions — automatically repeat income and expense entries

### Budgets

- Create monthly budgets for a specific expense category (one budget per category)
- Progress bar shows the percentage of budget used
- Recurring budgets automatically carry over to the next month
- Detailed budget view with spending progress and key information
- Edit budgets and related data — recalculates automatically

### Dashboard

- Current balance overview
- Overall analytics for spending behaviour
- Bar chart comparing income and expenses in the current month
- Pie chart displaying spending breakdown by categories
- Last 7 days spending chart
- Net savings for the current month, with savings rate
- Income growth and personalized insights (e.g. highest income of the month, top spending category)

### Currencies & Preferences

- Multi-currency support: AUD, USD, VND with automatic currency formatting
- Account setup wizard with avatar picker and currency selection
- Dark mode with theme settings
- Customisable profile avatar

### Security

- All financial amounts (transactions, budgets, balances) are encrypted at rest with AES-256-GCM
- Email verification
- Password reset via email link
- Password update in user's profile

---

## Tech Stack

| Layer               | Technology                                                                                                     |
| ------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Client**          | React 19, TypeScript, Vite, TanStack Router, TanStack Query, Zustand, Tailwind CSS v4, shadcn/ui, Lucide Icons |
| **Server**          | Hono, tRPC, TypeScript, Prisma, Neon PostgreSQL, Better-Auth, Brevo                                            |
| **Infrastructure**  | Cloudflare Workers (client + server), Wrangler                                                                 |
| **Testing**         | Vitest, React Testing Library, Playwright (Storybook browser tests)                                            |
| **Package Manager** | pnpm (monorepo)                                                                                                |

---

## Screenshots

<!-- Add screenshots here -->
<p align="center">
  <img src="public/screenshots/Dashboard.webp" alt="Dashboard" width="600">
</p>

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 22+
- [pnpm](https://pnpm.io/installation)
- A [Neon PostgreSQL](https://neon.tech/) database (or local Postgres for development)
- A [Brevo](https://www.brevo.com/) account for transactional email
- A Cloudflare account (for deployment)

### Installation

Clone the repository:

```bash
git clone https://github.com/Pet3r1512/Zemonie.git
cd Zemonie
```

Install dependencies:

```bash
pnpm install
```

### Environment Setup

Create the environment files:

```bash
# Client
cp client/.env.example client/.env.local   # if .env.example exists

# Server
cp server/.dev.vars.example server/.dev.vars   # if .dev.vars.example exists
```

Required server variables (`.dev.vars`):

```env
DATABASE_URL="postgresql://..."
BETTER_AUTH_SECRET="your-secret"
BETTER_AUTH_URL="http://localhost:8787"
ENCRYPTION_KEY="your-32-byte-base64-key"
BREVO_API_KEY="your-brevo-api-key"
TRUSTED_ORIGINS="http://localhost:5173"
```

### Running Locally

Start both workspaces in development mode:

```bash
pnpm dev
```

- Client: `http://localhost:5173` (Vite)
- Server: `http://localhost:8787` (Wrangler)

Vite proxies `/api/*` to the local server worker automatically.

### Running Tests

```bash
# Client (jsdom unit & component tests)
pnpm --dir client test

# Client with coverage
pnpm --dir client coverage

# Server tests
pnpm --dir server test

# Server with coverage
pnpm --dir server coverage
```

### Building

```bash
# Client
pnpm --dir client build

# Server (generates Prisma client)
cd server && pnpm prisma generate && pnpm wrangler deploy --minify
```

---

## Project Structure

```
Zemonie/
├── client/                 # React SPA (Vite + TanStack Router + Tailwind v4)
├── server/                 # Hono + tRPC API (Prisma + Neon PostgreSQL)
├── public/                 # Brand assets
├── .github/                # GitHub Actions workflows (CI, E2E, deploy)
├── AGENTS.md               # Development guidelines for contributors & AI agents
├── CONTRIBUTING.md         # Contributing guide
├── SECURITY.md             # Security policy
├── CODEOWNERS              # Repository ownership
├── SYSTEM_DESIGN.md        # High-level architecture & flow diagrams
├── PROJECT_STRUCTURE.md    # Detailed folder/route/API map
└── package.json            # Root workspace scripts
```

---

## Roadmap

- [x] Transactions (create, view, update, recurring)
- [x] Budgets (monthly, recurring, progress tracking)
- [x] Dashboard analytics & charts
- [x] Multi-currency support (AUD, USD, VND)
- [x] Encrypted financial data at rest
- [ ] Multiple money sources (bank accounts, digital wallets...)
- [ ] Group expense sharing for outings
- [ ] Savings goal categories (tuition, family savings, etc.)
- [ ] Dedicated mobile application

---

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, branching model, commit conventions, and the process for submitting pull requests.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

## Contact

Zemonie's Creator — [@Pet3r1512](https://github.com/Pet3r1512)

Project Link: [https://github.com/Pet3r1512/Zemonie](https://github.com/Pet3r1512/Zemonie)

---

<p align="right"><a href="#top">back to top</a></p>

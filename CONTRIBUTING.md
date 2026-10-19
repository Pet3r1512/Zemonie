# Contributing to Zemonie

Thanks for helping improve Zemonie — a Gen Z–focused money management app.
This is a **pnpm monorepo** with two workspaces, both deployed to Cloudflare Workers:

- `client/` — React SPA (Vite + TanStack Router + Tailwind v4)
- `server/` — Hono + tRPC API (Prisma + Neon PostgreSQL, Better-Auth)

Read `AGENTS.md` and `PROJECT_STRUCTURE.md` for the full development guidelines and codebase map.

---

## Getting started

1. Install [Node.js 22](https://nodejs.org/) (CI runs on Node 22).
2. Install dependencies from the repo root:

   ```bash
   pnpm install
   ```

3. Run both workspaces in dev mode:

   ```bash
   pnpm dev
   ```

   (`client` on Vite, `server` on Wrangler at `localhost:8787`.)

---

## Branching model

Branch off `master`. Keep branches short-lived and focused on one ticket.

**Branch name format:** `<type>/<kebab-case-description>/<TICKET-ID>`

Examples:

- `fix/email-verify-dialog-UI/FIX-056`
- `feature/edit-budget/FEAT-069`
- `test/about-us-page-components/TEST-020`
- `documentation/docs-for-ai/DOC-009`

Common types / ticket prefixes:

- `feature/` → `FEAT-###`
- `fix/` → `FIX-###`
- `improvement/` → `IMP-###`
- `test/` → `TEST-###`
- `documentation/` → `DOC-###`
- `ops / infra` → `OPS-###`
- `release/` → `release/vX.Y.Z`
- `HOTFIX/...` → urgent production fixes

---

## Commit messages

Use conventional prefixes describing the change type:

```
<type>: Short description
```

Examples: `fix: Email verify dialog UI`, `doc: Update system design`, `feat: Edit budget`

Release commits use `Release/vX.Y.Z`. The **PR title** uses the ticket format
`#TICKET-ID: Description` (e.g. `#FIX-056: Email verify dialog UI`).

---

## Making changes

- Always use `pnpm` — never `npm` or `yarn`.
- Run commands per workspace:

  ```bash
  pnpm --dir client <cmd>
  pnpm --dir server <cmd>
  ```

- Add a dependency to a specific workspace:

  ```bash
  pnpm --dir client add <pkg>
  pnpm --dir server add <pkg>
  ```

- Do not edit generated files (`client/src/routeTree.gen.ts`).
- Never commit secrets (`.env`, `.env.local`, `server/.dev.vars` are git-ignored).
- Use the `@/` path alias for imports within each workspace.
- Match existing conventions — mirror nearby files for structure, naming, and patterns.

---

## Verify before finishing

Run type-check, lint, format, and relevant tests:

```bash
# Formatting (fix, then check)
pnpm format:fix
pnpm format

# Lint
pnpm lint

# Client type-check
pnpm --filter client exec tsc --noEmit

# Tests
pnpm test:client   # or pnpm --dir client test
pnpm test:server   # or pnpm --dir server test
```

Git hooks (Husky) run `pnpm format:fix && lint-staged` on pre-commit, and
`tsc --noEmit` + `oxlint` on pre-push. Do not bypass with `--no-verify`.

---

## Opening a PR

1. Target `master`.
2. Title the PR with the ticket ID (`#TICKET-ID: Description`).
3. PRs are squash-merged with the PR number appended (e.g. `#FEAT-069: Edit budget (#323)`).
4. Before opening, ensure type-check, lint, format, and tests pass.
5. Fill out the pull request template (`.github/pull_request_template.md`).

When adding a component, route, API procedure, hook, or DB model, update
`PROJECT_STRUCTURE.md` in the same PR.

---

## Code of conduct

Be respectful and inclusive. Harassment, hate speech, and other harmful behavior
are not tolerated in issues, PRs, or discussions.

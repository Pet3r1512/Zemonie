<!--
Thanks for contributing to Zemonie! Before opening a PR, please make sure:
- You branched off `master` using `<type>/<kebab-case-description>/<TICKET-ID>`
- Your commit message uses conventional prefixes (`ops:`, `doc:`, `add:`, `fix:`, `feat:`, …)
- The PR title is `#TICKET_ID: description`
- Type-check, lint, format, and tests pass (see AGENTS.md "Verify before finishing")
-->

## Summary

Briefly describe what this PR changes and why.

## Ticket

Closes #TICKET-ID

## Type of change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation / chore / refactor

## Checklist

- [ ] Branched off `master`
- [ ] Branch name follows `<type>/<kebab-case-description>/<TICKET-ID>`
- [ ] Commit message(s) use conventional prefixes (`ops:`, `doc:`, `add:`, `fix:`, `feat:`, …)
- [ ] `pnpm format` passes
- [ ] `pnpm lint` passes
- [ ] Client type-check: `pnpm --filter client exec tsc --noEmit`
- [ ] Relevant tests pass (`pnpm test:client` / `pnpm test:server`)
- [ ] `PROJECT_STRUCTURE.md` updated (if adding a component, route, API procedure, hook, or DB model)
- [ ] No secrets added to tracked files (`.env`, `server/.dev.vars` are git-ignored)

## Screenshots (if UI change)

Add before/after screenshots here.

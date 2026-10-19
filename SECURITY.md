# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in Zemonie, please report it
responsibly. Do **not** open a public GitHub issue for security concerns.

Report it privately via
[GitHub Security Advisories](https://github.com/Pet3r1512/Zemonie/security/advisories/new)
instead of opening a public GitHub issue.

Include the following details:

- A clear description of the vulnerability
- Steps to reproduce it
- Affected versions / endpoints
- Possible impact and any suggested mitigation

We will acknowledge receipt, investigate, and coordinate a fix and disclosure
timeline with you before any public announcement.

## Security features in Zemonie

- All monetary amounts (transactions, balances, budgets) are encrypted at rest
  with AES-256-GCM (`server/src/lib/crypto.ts`).
- Session-based auth via Better-Auth with email verification and password reset.
- Input validation on all tRPC procedures with Zod.
- Secrets (encryption keys, DB URLs) are never committed — `.env`,
  `.env.local`, and `server/.dev.vars` are git-ignored.

# Zemonie — System Design

Zemonie is a Gen Z–focused money management app. It is a **pnpm monorepo** with two
workspaces, both deployed to **Cloudflare Workers**:

- `client/` — React SPA (Vite + TanStack Router + React Query + Tailwind v4).
- `server/` — Hono + tRPC API (Better-Auth, Zod, Prisma + Neon PostgreSQL).

See `PROJECT_STRUCTURE.md` for the full folder/route/API map and `DESIGN_SYSTEM.md`
for the visual design reference.

---

## High-level architecture

```mermaid
flowchart TB
    user([User])

    subgraph browser[Browser]
        spa["React SPA<br/>TanStack Router · React Query · Tailwind v4"]
    end

    subgraph cf[Cloudflare]
        clientWorker["Client Worker<br/>www.zemonie.site"]
        subgraph serverWorker["Server Worker — api.zemonie.site"]
            hono[Hono app]
            trpc["tRPC routers<br/>(+ Zod validation)"]
            auth[Better-Auth]
            crypto["AES-GCM crypto<br/>(balance encryption)"]
            cron["Cron<br/>recurring budgets & transactions"]
        end
    end

    db[("Neon PostgreSQL")]
    brevo["Brevo<br/>transactional email"]

    user --> spa
    spa --> clientWorker
    spa -->|"HTTPS /api/trpc/* (session cookie)"| hono
    hono --> trpc
    trpc --> auth
    trpc --> crypto
    trpc -->|"Prisma (Neon adapter)"| db
    cron --> db
    auth -->|"verify / reset / welcome emails"| brevo
```

> **Dev vs Prod routing**
>
> - **Dev:** Vite proxy forwards `/api/*` to the local server worker on `localhost:8787`.
> - **Prod:** `www.zemonie.site` → client worker, `api.zemonie.site` → server worker.
>   Auth session cookies are shared across the `zemonie.site` subdomains.
> - A cron job pings the server every ~15 min to keep the database warm.

---

## Request flow — "Add transaction"

This path exercises the auth guard, Zod validation, and AES-GCM amount
encryption before the row is persisted.

```mermaid
sequenceDiagram
    actor User
    participant SPA as React SPA<br/>(useMutation)
    participant API as Server Worker<br/>(Hono + tRPC)
    participant Auth as Better-Auth
    participant Crypto as crypto.ts<br/>(AES-GCM)
    participant DB as Neon PostgreSQL

    User->>SPA: fill form, submit

    Note over SPA: react-hook-form validation<br/>invalid → inline field errors, no request sent

    SPA->>API: POST /api/trpc/transactions.addTransaction<br/>(input + session cookie)

    API->>Auth: validate session
    alt no / expired session
        Auth-->>API: null
        API-->>SPA: TRPCError UNAUTHORIZED
    else authenticated
        Auth-->>API: userId
        API->>API: Zod validate input
        alt invalid input
            API-->>SPA: TRPCError BAD_REQUEST
        else valid
            API->>Crypto: writeAmount(amount)
            alt ENCRYPTION_KEY missing / crypto error
                Crypto-->>API: throws
                API-->>SPA: TRPCError INTERNAL_SERVER_ERROR
            else encrypted
                Crypto-->>API: encrypted string (iv:cipher)
                API->>DB: create transaction + upsert balance
                alt DB write fails
                    DB-->>API: error
                    API-->>SPA: TRPCError INTERNAL_SERVER_ERROR
                else success
                    DB-->>API: rows
                    API-->>SPA: { newTransaction, newBalance }
                end
            end
        end
    end

    alt response not ok
        SPA->>SPA: createNewTransaction throws<br/>Error(res.error?.message ?? "Unknown Error")
        SPA->>User: useMutation onError → toast.error()<br/>form stays mounted for retry
    else success
        SPA->>SPA: invalidate queries (transactions, balance, …)
        SPA->>User: toast.success · close dialog · UI updates
    end
```

---

## Data at rest — amount encryption

Monetary `amount` fields (balances, transactions) are stored **encrypted** with
AES-256-GCM (`server/src/lib/crypto.ts`):

- A random 12-byte IV is generated per write and prepended to the ciphertext
  (`iv:cipher`, base64). Identical amounts therefore never produce identical
  ciphertext.
- GCM's authentication tag means any tampering with the stored value causes
  decryption to **fail** rather than silently return a corrupted number.
- `writeAmount(number)` / `readAmount()` wrap the encrypt/decrypt primitives for
  the persistence pipeline. See `server/src/lib/crypto.test.ts` for the
  round-trip, IV-uniqueness, and tamper-detection tests.

---

## PlantUML sources

The diagrams above use Mermaid so they render directly on GitHub. The equivalent
PlantUML sources are kept here for editing on <https://www.plantuml.com/plantuml/uml/>
(paste between `@startuml`/`@enduml`).

<details>
<summary>Architecture (PlantUML)</summary>

```plantuml
@startuml Zemonie-Architecture
title Zemonie — Architecture (monorepo on Cloudflare Workers)

skinparam componentStyle rectangle
skinparam shadowing false

actor "User" as user

node "Browser" as browser {
  [React SPA\n(TanStack Router, React Query,\nTailwind v4)] as spa
}

cloud "Cloudflare" {
  node "Client Worker\n(www.zemonie.site)" as clientWorker {
    [Static assets / SPA host] as clienthost
  }
  node "Server Worker\n(api.zemonie.site)" as serverWorker {
    [Hono app] as hono
    [tRPC routers\n(+ Zod validation)] as trpc
    [Better-Auth] as auth
    [AES-GCM crypto\n(balance encryption)] as crypto
    [Cron: recurring\nbudgets & transactions] as cron
  }
}

database "Neon\nPostgreSQL" as db
cloud "Brevo\n(transactional email)" as brevo

user --> spa
spa --> clienthost
spa --> hono : "HTTPS /api/trpc/*\n(session cookie)"
hono --> trpc
trpc --> auth
trpc --> crypto
trpc --> db : "Prisma\n(Neon adapter)"
cron --> db
auth --> brevo : "verify / reset\n/ welcome emails"

note bottom of serverWorker
  Dev: Vite proxy forwards
  /api/* -> localhost:8787
end note
@enduml
```

</details>

<details>
<summary>Add Transaction sequence (PlantUML)</summary>

```plantuml
@startuml Zemonie-AddTransaction
title Add Transaction — request flow

actor User
participant "React SPA\n(React Query useMutation)" as SPA
participant "Server Worker\n(Hono + tRPC)" as API
participant "Better-Auth" as Auth
participant "crypto.ts\n(AES-GCM)" as Crypto
database "Neon\nPostgreSQL" as DB

User -> SPA : fill form, submit

note over SPA
  react-hook-form validation
  invalid -> inline errors, no request
end note

SPA -> API : POST /api/trpc/transactions.addTransaction\n(input, cookie)

API -> Auth : validate session
alt no / expired session
  Auth --> API : null
  API --> SPA : TRPCError UNAUTHORIZED
else authenticated
  Auth --> API : userId
  API -> API : Zod validate input
  alt invalid input
    API --> SPA : TRPCError BAD_REQUEST
  else valid
    API -> Crypto : writeAmount(amount)
    alt ENCRYPTION_KEY missing / crypto error
      Crypto --> API : throws
      API --> SPA : TRPCError INTERNAL_SERVER_ERROR
    else encrypted
      Crypto --> API : encrypted string (iv:cipher)
      API -> DB : create transaction + upsert balance
      alt DB write fails
        DB --> API : error
        API --> SPA : TRPCError INTERNAL_SERVER_ERROR
      else success
        DB --> API : rows
        API --> SPA : { newTransaction, newBalance }
      end
    end
  end
end

alt response not ok
  SPA -> SPA : throws Error(res.error?.message ?? "Unknown Error")
  SPA -> User : onError -> toast.error(); form stays mounted (retry)
else success
  SPA -> SPA : invalidate queries (transactions, balance, ...)
  SPA -> User : toast.success, close dialog, UI updates
end
@enduml
```

</details>

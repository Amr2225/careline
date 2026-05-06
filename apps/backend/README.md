# CareLine — Backend (API)

NestJS + Prisma + Neon Postgres API for CareLine, a single-clinic management platform.

This package serves the dashboard (`apps/dashboard`, Next.js) and the patient PWA (`apps/pwa`, Vite/React). It owns authentication (httpOnly access + refresh cookies with CSRF) and the dynamic RBAC engine (modules, roles, permissions, user-role assignments).

## Requirements

- Node 20+
- pnpm 9+
- A reachable Postgres instance (Neon recommended). Set `DATABASE_URL` in `apps/backend/.env`.

## Install

From the repo root:

```bash
pnpm install
```

## Environment

Create `apps/backend/.env` with at minimum:

```
DATABASE_URL="postgresql://..."
JWT_ACCESS_SECRET="..."
JWT_REFRESH_SECRET="..."
ACCESS_TOKEN_TTL="15m"
REFRESH_TOKEN_TTL="7d"
CSRF_SECRET="..."
```

The full schema is enforced at boot by `src/config/env.validate.ts` — the app refuses to start if anything is missing or malformed.

## Bootstrap order

The first time you set up a database (or after a reset) you **must** run these three steps **in this exact order**. Each step depends on the previous one and will fail with a clear error otherwise.

```bash
# 1. Apply schema (creates all tables, including modules / roles / role_permissions / user_roles)
pnpm --filter api prisma migrate dev

# 2. Seed system modules (8) and roles (5: Manager, Receptionist, Doctor, Scheduler, Patient).
#    Idempotent — safe to re-run; the second run is a no-op.
pnpm --filter api prisma db seed

# 3. Create the first admin user and assign the Manager role.
#    Fails fast if step 2 hasn't run yet (Manager role missing).
pnpm --filter api run cli create-admin
```

**Why this order matters**

- `migrate` must run before `seed` — the seed writes into tables that don't exist yet otherwise.
- `seed` must run before `create-admin` — `create-admin` looks up the system `Manager` role by name and assigns it to the new user. Without the seed there is no Manager role to assign and the command will exit with `"Manager role not found — run `prisma db seed` first."`.
- Any user with `isBootstrapAdmin = true` is automatically granted the Manager role at the end of the seed step, so re-seeding after manually flipping that flag is also a valid path.

## Running the API

```bash
# dev (watch)
pnpm --filter api run start:dev

# production
pnpm --filter api run build
pnpm --filter api run start:prod
```

## Tests

```bash
# unit tests
pnpm --filter api test

# coverage
pnpm --filter api run test:cov
```

RBAC unit tests cover the three lockout safeguards (`canDeleteRole`, `canRemoveRoleFromUser`, `canDeactivateUser`) — including the cases that _would_ lock the clinic out of its own admin surface, which the safeguards are required to prevent.

## RBAC at a glance

- **Modules** are code-defined in `packages/shared` (`MODULE_NAMES`) and seeded into the DB. There is no `GET /modules` endpoint — modules are not user-editable.
- **Actions**: `READ | WRITE | UPDATE | DELETE`.
- **Roles** are stored in the DB. The five seeded roles are flagged `isSystem = true`.
- **Permissions** are `(role, module, action)` triples with a composite unique constraint.
- **Guard chain**: `JwtAuthGuard` runs first, then `RbacGuard`. Routes annotated with `@Public()` skip both. Routes annotated with `@Requires(module, action)` require the authenticated user to have that permission via at least one assigned role.
- `/auth/me` returns the current user along with `roles[]` and a flat `permissions[]` array (`"Module:Action"` strings) for the frontend to drive UI affordances.

## Useful scripts

```bash
# regenerate the Prisma client into packages/shared/prisma
pnpm --filter api prisma generate

# inspect the DB
pnpm --filter api prisma studio

# reset everything (DROPS DATA — only in dev)
pnpm --filter api prisma migrate reset
```

`prisma migrate reset` runs the seed automatically afterwards, so after a reset you only need to re-run step 3 (`create-admin`).

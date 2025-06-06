[![CI](https://github.com/VictorFajardo/nestkit-backend/actions/workflows/ci.yml/badge.svg)](https://github.com/VictorFajardo/nestkit-backend/actions/workflows/ci.yml)

# NestKit Backend Boilerplate

A production-ready NestJS backend starter with:

- Authentication (JWT)
- Role-based access control
- Audit logging
- Swagger documentation
- Observability (metrics, health)
- Testing (unit + e2e)
- Dockerized local dev and production support

---

## 🚀 Project Structure

```bash
.
├── src/                  # Main application source
│   ├── auth/             # JWT auth, guards, roles
│   ├── users/            # User module, RBAC
│   ├── audit-log/        # Field-level audit diffs
│   └── main.ts           # App bootstrap
├── prisma/               # Prisma schema + migrations
├── scripts/              # Entrypoint, wait-for-it
├── test/                 # Unit and e2e tests
├── Dockerfile            # Dev Dockerfile
├── Dockerfile.prod       # Production Dockerfile
├── docker-compose.yml    # Dev environment
├── docker-compose.prod.yml # Production environment
├── .env                  # Local environment variables
└── README.md             # This file
```

---

## 🧪 Local Development

### Requirements

- Docker + Docker Compose
- Node.js 20+ (for local runs outside Docker)

### Start Dev Stack

```bash
npm run db:up
npm run dev
```

> Uses `Dockerfile` with `npm run start:dev`, hot reload enabled.

### Prisma Workflow (Dev)

```bash
npx prisma generate         # Regenerate client
npx prisma migrate dev      # Apply migrations locally
npx prisma studio           # GUI for DB access
```

---

## 🚢 Production Build & Run

### Build & Run Production Image

```bash
docker compose -f docker-compose.prod.yml up --build
```

> Uses `Dockerfile.prod`, multi-stage build, and secure config.

### docker-entrypoint.sh Summary

```bash
# Entrypoint script runs:
- wait-for-it.sh for DB readiness
- prisma migrate deploy
- seed script
- launches app via node dist/src/main.js
```

> Ensure production secrets are mounted as files via Docker secrets.

---

## 🔐 Security Features

- Helmet, HPP, and CORS
- Rate limiting on sensitive routes
- JWT with access and refresh tokens
- Role-based guards (`@Roles()`)
- Environment variable validation

---

## 🔍 Observability & Monitoring

- `/health` endpoint (liveness/readiness)
- Prometheus metrics via `prom-client` exposed at `/metrics`
- Histogram and counter for HTTP request durations

---

## 📜 Swagger API Docs

- Accessible at `/api`
- Shows auth-required routes with proper bearer token support
- Includes DTO examples and response models

---

## ✅ Testing

- Jest setup for unit tests
- `test/**/*.e2e-spec.ts` for integration tests
- `test/helpers/` for resetting/seeding test DB

```bash
npm run test
npm run test:e2e
```

---

## 📂 Secrets Management (Production)

Define each secret as a file under `./secrets/`, then Docker Compose will mount them:

```bash
secrets:
  JWT_SECRET:
    file: ./secrets/JWT_SECRET
  ...
```

Inside your app, read them via:

```ts
process.env.JWT_SECRET; // loaded from Docker secrets or .env
```

---

## 🛠️ Deployment Notes

- Secrets injection
- Port 3000 exposed
- PostgreSQL backend
- Optional: Prometheus scraping `/metrics`

---

## 🧰 Useful Commands

```bash
# Format
npm run format

# Lint
npm run lint

# Prisma
npx prisma migrate dev
npx prisma generate

# Start (prod mode locally)
npm run build && node dist/src/main.js
```

---

## 📦 License

MIT

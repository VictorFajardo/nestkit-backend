# NestKit Boilerplate

[![CI](https://github.com/VictorFajardo/nestkit-backend/actions/workflows/ci.yml/badge.svg)](https://github.com/VictorFajardo/nestkit-backend/actions/workflows/ci.yml)
[![Coverage Status](https://codecov.io/github/VictorFajardo/nestkit-backend/graph/badge.svg?token=31ZT244MDH)](https://codecov.io/github/VictorFajardo/nestkit-backend)
[![License](https://img.shields.io/github/license/VictorFajardo/nestkit-backend.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-20.x-green.svg)](https://nodejs.org/)
[![Built With](https://img.shields.io/badge/built%20with-NestJS-red.svg)](https://nestjs.com/)

> 🛠️ Production-ready NestJS starter kit with authentication, RBAC, audit logging, observability, e2e testing, and CI.

---

## 🚀 Features

- 🔐 **JWT Auth** with access/refresh token flow
- 🧑‍⚖️ **RBAC** role-based permissions (e.g., admin, user)
- 🧾 **Audit Logging** for login, logout, profile updates, etc.
- 📊 **Prometheus Metrics** with request histograms/counters
- 🧪 **Unit + E2E tests** using Jest and Supertest
- 🐘 **PostgreSQL** via Prisma ORM
- ☁️ **Dockerized** with dev and prod workflows
- 📦 **Modular architecture** ready for domain-driven expansion
- 📄 **Swagger Docs** auto-generated with example DTOs
- 🧹 **ESLint + Prettier** + strict TypeScript settings
- ✅ **GitHub Actions CI** with build/lint/test/e2e checks

---

## 📦 Getting Started

### 1. Clone and install

```bash
git clone https://github.com/VictorFajardo/nestkit-boilerplate.git
cd nestkit-boilerplate
npm install
```

### 2. Set up `.env`

```env
# .env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/nestkit
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_EXPIRES_IN=3600s
JWT_REFRESH_EXPIRES_IN=7d
PORT=3000
```

### 3. Run with Docker

```bash
docker compose up --build
```

Or run locally with hot reload:

```bash
npm run start:dev
```

---

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

---

## 🧰 Useful Commands

```bash
# Lint
npm run lint

# Format
npm run format

# Migrate database
npx prisma migrate dev

# Seed dev data
npm run seed

# Generate Swagger JSON
npm run export:swagger
```

---

## 📘 API Documentation

Swagger UI available at: [http://localhost:3000/api](http://localhost:3000/api)

Exported docs:

```bash
npm run export:swagger
```

---

## 📁 Project Structure

```
src/
  ├── auth/          # Auth + JWT + refresh
  ├── users/         # User CRUD
  ├── common/        # Shared filters, guards, interceptors
  ├── audit-log/     # Audit trail logging
  ├── health/        # Health check endpoint
  ├── logger/        # Winston logger setup
  ├── config/        # Config + env validation
  └── main.ts        # App entrypoint
```

---

## ✅ GitHub Actions CI

Runs on every push/pull request to `main`:

- Lint
- Unit tests
- E2E tests (with PostgreSQL service)
- Build

Check `.github/workflows/ci.yml` for config.

---

## 🔐 Security

- CORS enabled
- Helmet headers
- Rate limiting
- HPP protection
- `.env` validation at startup

---

## 📄 License

MIT © [Your Name](https://github.com/VictorFajardo)

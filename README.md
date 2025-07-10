# NestKit Backend

Production-ready NestJS boilerplate with authentication, RBAC, auditing, structured logging, metrics, and observability.

[![CI](https://github.com/VictorFajardo/nestkit-backend/actions/workflows/ci.yml/badge.svg)](https://github.com/VictorFajardo/nestkit-backend/actions/workflows/ci.yml)
[![Swagger Docs](https://img.shields.io/badge/docs-swagger-blue)](https://victorfajardo.github.io/nestkit-backend/)
[![Coverage Status](https://codecov.io/github/VictorFajardo/nestkit-backend/graph/badge.svg?token=31ZT244MDH)](https://codecov.io/github/VictorFajardo/nestkit-backend)
[![License](https://img.shields.io/github/license/VictorFajardo/nestkit-backend.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-20.x-green.svg)](https://nodejs.org/)
[![Built With](https://img.shields.io/badge/built%20with-NestJS-red.svg)](https://nestjs.com/)

---

## 🔥 Features

- **Authentication**: JWT-based access & refresh token flows
- **Authorization**: Role-based access control (`@Roles`, `@Public`)
- **Audit Logging**: Tracks user actions, metadata, and diffs
- **Exception Handling**: Global filters + Prisma error mapper
- **Structured Logging**: Winston + JSON + request context
- **Observability**: Prometheus metrics and `/metrics` endpoint
- **Tracing**: Sentry integration with request tracing
- **Swagger Docs**: Auth flows, response examples, RBAC
- **CI/CD**: GitHub Actions with lint/test/build
- **Dockerized Dev**: API, DB, and pgAdmin containerized
- **Testing**: Unit and E2E setup with DB seed/reset helpers

---

## 🚀 Quickstart

```bash
git clone https://github.com/VictorFajardo/nestkit-backend.git
cd nestkit-backend
cp .env.example .env
make dev  # or use docker-compose manually
```

---

## 🧪 Local Development

```bash
npm run db:up

npm install
npm run dev
```

---

## ⚙ Seed the Database

```bash
npm run db:seed
```

---

## 🧪 Running Tests

```bash
# Run unit and E2E tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run only E2E tests
npm run test:e2e
```

---

## 🧬 API Docs

- Swagger: [http://localhost:3000/api](http://localhost:3000/api)
- Health - Live: [http://localhost:3000/health/live](http://localhost:3000/health/live)
- Health - Ready: [http://localhost:3000/health/ready](http://localhost:3000/health/ready)
- Metrics: [http://localhost:3000/metrics](http://localhost:3000/metrics)

---

## 🛠 Tech Stack

- **Framework**: NestJS
- **ORM**: Prisma
- **DB**: PostgreSQL
- **Monitoring**: Prometheus + Sentry
- **Security**: Helmet, CORS, Rate-Limit, HPP
- **Testing**: Jest + Supertest

---

## ✨ Auth Flows

- `/auth/register`: Create user account
- `/auth/login`: Obtain access and refresh tokens
- `/auth/refresh`: Exchange refresh token
- `/auth/logout`: Invalidate refresh token

Include access token as:

```http
Authorization: Bearer <access_token>
```

---

## 🧪 Sample curl Commands

```bash
# Register
curl -X POST http://localhost:3000/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"email": "john@example.com", "password": "StrongP@ss1"}'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email": "john@example.com", "password": "StrongP@ss1"}'
```

---

## 📦 Deployment

Use Docker Compose or adapt to your preferred platform. Sentry and Prometheus require credentials and/or dashboards.

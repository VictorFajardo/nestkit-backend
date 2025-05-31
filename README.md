# NestKit Backend

A scalable, production-ready NestJS boilerplate with best practices baked in: modular architecture, throttling, guards, logging, validation, Prisma, and more.

## 🚀 Features

- ⚙️ Modular structure (Users, Auth, AI, etc.)
- 🔐 JWT Auth with role-based access control
- 📈 Rate-limiting with custom Throttler guard
- 🧰 Prisma ORM with PostgreSQL
- 🧪 Testing-ready (unit + e2e)
- 📊 Swagger API docs (`/api`)
- 🛡️ Security: Helmet, CORS, validation, exception filters
- 📦 Scalable config management

---

## 🧪 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-username/nestkit-backend.git
cd nestkit-backend
npm install
```

### 2. Configure `.env`

Create a `.env` file based on the example:

```bash
cp .env.example .env
```

Update values like `DATABASE_URL`, `JWT_SECRET`, etc.

### 3. Run Dev Server

```bash
npm run start:dev
```

---

## 🔧 Environment Variables

| Variable       | Description                 | Example                        |
| -------------- | --------------------------- | ------------------------------ |
| `PORT`         | Port app runs on            | `3000`                         |
| `DATABASE_URL` | Prisma DB connection        | `postgres://user:pass@host/db` |
| `JWT_SECRET`   | Secret for JWT signing      | `supersecretkey`               |
| `NODE_ENV`     | Environment (`dev`, `prod`) | `development`                  |

See `.env.example` for a full list.

---

## 📘 Scripts

| Script       | Description                    |
| ------------ | ------------------------------ |
| `start:dev`  | Run in watch mode (dev)        |
| `build`      | Compile TS -> JS               |
| `start:prod` | Run compiled app in production |
| `lint`       | Run ESLint                     |
| `test`       | Run unit tests                 |
| `test:e2e`   | Run end-to-end tests           |
| `seed:dev`   | Seed dev database (WIP)        |

---

## 🛠️ Tech Stack

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [JWT](https://jwt.io/)
- [Swagger](https://swagger.io/)
- [Helmet](https://helmetjs.github.io/)
- [Winston](https://github.com/winstonjs/winston)

---

## 🧩 Folder Structure

```
src/
├── auth/               # Auth module
├── users/              # Users module
├── ai/                 # AI feature module
├── common/             # Shared guards, filters, interceptors
├── config/             # Centralized config files
├── logger/             # Custom logger module
├── prisma/             # Prisma service + client
└── main.ts             # App bootstrap
```

---

## 🧪 Testing

```bash
npm run test          # Unit tests
npm run test:e2e      # E2E tests
```

---

## 📄 License

MIT — © 2025 Your Name

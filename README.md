# 🚀 NestKit – Modular Auth-Ready NestJS Backend

NestKit is a production-ready, modular backend starter built with [NestJS](https://nestjs.com/), featuring robust authentication, authorization, and scalable architecture out of the box.

---

## 📦 Features

- ✅ **Email/Password Authentication** (JWT + Refresh Token)
- 🔐 **Role-Based Authorization**
- ♻️ **Refresh Token Rotation** with hashed storage
- 📫 **Password Reset Flow (optional)** with token + email integration
- 🧰 Modular & Clean Codebase
- 🔧 Environment-based Config Management
- 🧪 Ready for Testing & Extension
- 🗃️ **PostgreSQL + Prisma ORM**

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- Docker + Docker Compose
- PostgreSQL (Docker recommended)

### Clone and Setup

```bash
git clone https://github.com/your-org/nestkit.git
cd nestkit
npm install
cp .env.example .env
```

### Run the app (with Docker)

```bash
docker-compose up -d
npm run prisma:generate
npm run start:dev
```

---

## 📁 Project Structure

```
src/
├── auth/             # Auth controllers, services, guards, strategies
│   ├── dto/
│   ├── guards/
│   ├── strategies/
│   ├── token/
│   └── hash/
├── users/            # User module & service
├── common/           # Shared decorators and interfaces
├── prisma/           # Prisma service and schema
├── app.module.ts     # Main module
```

---

## 🔑 Authentication

**Endpoints:**

| Method | URL              | Description               |
| ------ | ---------------- | ------------------------- |
| POST   | `/auth/register` | Register new user         |
| POST   | `/auth/login`    | Login, get access+refresh |
| POST   | `/auth/refresh`  | Renew access token        |
| POST   | `/auth/logout`   | Invalidate refresh token  |

**Protected Route Example:**

| Method | URL             | Auth Required |
| ------ | --------------- | ------------- |
| GET    | `/user/profile` | ✅            |

Use Bearer token in `Authorization` header.

---

## 🧪 API Testing Guide

You can test using Postman or curl.

### Register

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword",
  "name": "Jane Doe"
}
```

### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword"
}
```

---

## ⚙️ Environment Configuration

Create a `.env` file using `.env.example` as reference.

| Variable               | Description                  |
| ---------------------- | ---------------------------- |
| DATABASE_URL           | PostgreSQL connection string |
| JWT_SECRET             | Secret for JWT access tokens |
| JWT_EXPIRES_IN         | Expiry for access tokens     |
| JWT_REFRESH_SECRET     | Secret for refresh tokens    |
| JWT_REFRESH_EXPIRES_IN | Expiry for refresh tokens    |

---

## 🧰 Commands

| Command                   | Description                  |
| ------------------------- | ---------------------------- |
| `npm run start:dev`       | Start app in watch mode      |
| `npm run prisma:generate` | Generate Prisma client       |
| `npm run prisma:migrate`  | Run database migrations      |
| `docker-compose up -d`    | Start PostgreSQL and pgAdmin |

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Credits

Built with ❤️ using [NestJS](https://nestjs.com/), [Prisma](https://www.prisma.io/), and best practices for scalable Node.js backends.

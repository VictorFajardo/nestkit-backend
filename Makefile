# Variables
ENV ?= development
DOCKER_COMPOSE := docker-compose -f docker-compose.yml

# Default help command
.PHONY: help
help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Dev Workflow:"
	@echo "  make dev            Run local dev environment with Docker"
	@echo "  make logs           Tail logs from all containers"
	@echo ""
	@echo "Database:"
	@echo "  make migrate        Run Prisma migrations"
	@echo "  make db-reset       Reset DB (drop, migrate, seed)"
	@echo "  make seed-dev       Seed dev DB"
	@echo "  make seed-test      Seed test DB"
	@echo ""
	@echo "Testing:"
	@echo "  make test           Run all tests"
	@echo "  make test:unit      Run unit tests"
	@echo "  make test:e2e       Run e2e tests"
	@echo ""
	@echo "Misc:"
	@echo "  make bash           Enter the API container shell"
	@echo "  make lint           Run ESLint"

# Dev environment
.PHONY: dev
dev:
	$(DOCKER_COMPOSE) up --build

.PHONY: logs
logs:
	$(DOCKER_COMPOSE) logs -f

# DB and Prisma
.PHONY: migrate
migrate:
	npx prisma migrate dev --name init --schema prisma/schema.prisma

.PHONY: db-reset
db-reset:
	npx prisma migrate reset --force --skip-generate --schema prisma/schema.prisma
	npx prisma generate
	npx ts-node prisma/seed.ts

.PHONY: seed-dev
seed-dev:
	NODE_ENV=development npx ts-node prisma/seed.ts

.PHONY: seed-test
seed-test:
	NODE_ENV=test npx ts-node prisma/seed.ts

# Testing
.PHONY: test
test:
	npm run test

.PHONY: test:unit
test:unit:
	npm run test:unit

.PHONY: test:e2e
test:e2e:
	npm run test:e2e

# Linting
.PHONY: lint
lint:
	npx eslint .

# Shell into container
.PHONY: bash
bash:
	$(DOCKER_COMPOSE) exec api sh

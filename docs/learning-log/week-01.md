# Week 1 - Day 1: Project Setup & Environment Configuration

## 📅 Date: October 6, 2026

## 🎯 Objectives
* Set up the core development environment for the **Ops Hub** project.
* Initialize the NestJS backend application and push the initial codebase to GitHub.
* Practice standard Git workflow (branching, pull requests, and merging).

---

## ✅ Completed Tasks (Day 1 Checklist)
* [x] **Git & SSH:** Configured Git credentials and established a secure SSH connection with GitHub.
* [x] **Node.js Environment:** Verified Node.js LTS and npm installation.
* [x] **Docker:** Successfully ran `docker hello-world` to ensure the containerization runtime is functional.
* [x] **VS Code & WSL:** Set up and launched VS Code integrated with WSL for a Linux-based development experience.
* [x] **NestJS Initialization:** Created a new NestJS project (`ops-hub`) and verified it running smoothly on `localhost:3000`.
* [x] **GitHub Repository & Push:** Created the `ops-hub` repository on GitHub and pushed the initial commit.
* [x] **Pull Request & Merge:** Created a feature branch, opened a Pull Request, and successfully merged it into the main branch.
* [x] **Learning Log:** Documented Day 1 progress and pushed the learning log to the repository.

---

## 💡 Key Takeaways & Notes
* Since I have prior experience with Node.js, Git, VS Code, and NestJS, setting up the boilerplate and base structure went very smoothly.
* Verified that the local development workflow (WSL + Docker + NestJS) is fully operational for the upcoming database and backend tasks.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Week 1 - Day 2: PostgreSQL Schema Design, Docker Setup & Queries

## 📅 Date: October 7, 2026

## 🎯 Objectives
* Set up a PostgreSQL database instance using Docker Compose.
* Design a relational database schema (`users`, `products`, `orders`, `order_items`) and establish primary/foreign key relationships.
* Practice writing DDL/DML statements, SQL JOIN queries, index optimization (`EXPLAIN ANALYZE`), and troubleshooting Docker container issues.
* Document schema architecture decisions.

---


## ✅ Completed Tasks (Day 2 Checklist)
* [x] **Docker Compose Setup:** Created `docker-compose.yml` and ran `docker compose up -d`.
* [x] **Troubleshooting Container Initialization:** Encountered and resolved a PostgreSQL 18+ data path mount error by updating the path configuration in `docker-compose.yml` to `/var/lib/postgresql`.
* [x] **Database Management Tooling:** Installed DBeaver GUI client and successfully connected it to the local PostgreSQL database instance.
* [x] **Interactive CLI (psql):** Verified tables, relations, and database instances using `\dt`, `\d`, and `\l` commands.
* [x] **Schema Design & ER Diagram:** Modeled entities (`users`, `products`, `orders`, `order_items`) and mapped out 1:N and N:M relationships.
* [x] **Data Insertion & Interrogation:** Created tables, seeded sample test data, and executed multi-table JOIN queries.
* [x] **Query Execution Plan:** Evaluated index performance using `EXPLAIN ANALYZE` on indexed Foreign Key fields.
* [x] **Architecture Decision Record (ADR):** Created `docs/decisions/001-postgres-schema.md` to document the relational database design choices.
* [x] **Push Progress:** Pushed the learning log and ADR document to GitHub.

---

## 🛠️ Troubleshooting & Technical Insights
### Issue: Docker Container Crash on Startup (`ops-hub-db`)
* **Symptom:** The PostgreSQL container kept stopping immediately after starting `docker compose up -d`.
* **Root Cause:** In PostgreSQL image versions 18+, volume mounts require the data path configuration to match major-version directory structures rather than the default unused mount directory `/var/lib/postgresql/data`.
* **Resolution:** Reconfigured the volume mount target in `docker-compose.yml` to `/var/lib/postgresql`, allowing the container to initialize successfully. Connected DBeaver to verify data persistence.

---

## 💡 Conceptual Concepts Mastered
* **One-to-Many vs. Many-to-Many:**
  * *One-to-Many:* A single user can own multiple orders (`users.id` -> `orders.user_id`).
  * *Many-to-Many:* An order can contain multiple products, and a product can belong to multiple orders. This is resolved using a junction table (`order_items`).
* **Primary Key vs. Foreign Key vs. Index:**
  * *Primary Key:* Unique identifier for each row in a table.
  * *Foreign Key:* Enforces referential integrity between child and parent tables.
  * *Index:* A B-Tree data structure created on frequently queried columns (e.g., Foreign Keys) to improve lookup speeds from sequential scans (`Seq Scan`) to index scans (`Index Scan`).

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Week 1 - Day 3: Prisma 7 Integration, Driver Adapters & NestJS Products CRUD

## 📅 Date: October 8, 2026

## 🎯 Objectives
* Initialize and configure Prisma 7 with PostgreSQL using the new configuration structure and driver adapters.
* Set up `PrismaService` and `PrismaModule` inside the NestJS application.
* Implement DTOs, Services, and Controllers for the Products resource.
* Test and verify all CRUD endpoints, input validation, and error handling.

---

## ✅ Completed Tasks (Day 3 Checklist)
* [x] **Prisma Setup & Configuration:** Installed Prisma 7, configured `prisma.config.ts`, and set up correct database connection URLs in `.env`.
* [x] **Schema Modeling:** Defined the four core database models in `schema.prisma`.
* [x] **Database Migration:** Successfully executed `npx prisma migrate dev --name init`.
* [x] **Prisma Studio:** Visually inspected and managed database tables using Prisma Studio.
* [x] **NestJS Integration:** Created and integrated `PrismaService` and `PrismaModule` into the application.
* [x] **Products Module:** Developed DTOs, Service logic, and Controller endpoints for Products CRUD operations.
* [x] **Endpoint Testing:** Tested all product CRUD routes and verified validation rules and 404 error responses.
* [x] **Learning Log Push:** Committed progress and pushed the learning log to GitHub.

---

## 🛠️ Troubleshooting & Technical Insights (Prisma 7 Migration)
### 1. Prisma 7 Initialization & CLI Changes
* **Issue:** Running `npx prisma init` in Prisma 7 did not generate `prisma/schema.prisma` or `.env` as it did in older versions (v6/v7 legacy); instead, it initialized `prisma.config.ts` and agent skills.
* **Resolution:** Understood the structural shift in Prisma 7 where configuration is managed via `prisma.config.ts` and `datasource` settings are explicitly declared inside the config file rather than inside `schema.prisma`.

### 2. Special Characters in Database Passwords
* **Issue:** Database connection errors due to unescaped special characters (e.g., `@`, `#`, `:`, `%`) in the PostgreSQL password within the `.env` URL.
* **Resolution:** Properly URL-encoded the special characters in the connection string.

### 3. Prisma 7 Driver Adapter Requirement
* **Issue:** Encountered `PrismaClientInitializationError` stating that a driver adapter is required when instantiating `new PrismaClient()` directly.
* **Resolution:** Installed `@prisma/adapter-pg` and `pg` (along with `@types/pg`) and updated `PrismaService` to pass the `PrismaPg` adapter instance to the `PrismaClient` constructor.

### 4. Environment Variables Loading (`ConfigModule`)
* **Issue:** `process.env.DATABASE_URL` resolved to `undefined`, triggering `SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string` error during API requests.
* **Resolution:** Integrated `@nestjs/config` (`ConfigModule.forRoot()`) to ensure environment variables are correctly loaded and globally accessible before database queries execute.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Week 1 - Day 4: Database Transactions, Seed Scripts & Orders Module

## 📅 Date: October 9, 2026

## 🎯 Objectives
* Understand and implement database transactions (sequential vs. interactive transactions) in PostgreSQL using Prisma.
* Build the Orders module with nested DTO validation.
* Implement atomic operations (`$transaction`) combining stock checks, order creations, and inventory decrements.
* Configure database seeding in Prisma 7 and successfully populate initial data.

---

## ✅ Completed Tasks (Day 4 Checklist)
* [x] **Transaction Concepts:** Explored the differences between sequential and interactive database transactions.
* [x] **Orders Module & Validation:** Developed the Orders module with nested DTO validation for robust request payloads.
* [x] **Atomic Transactions (`$transaction`):** Implemented Prisma's `$transaction` to handle stock verification, order generation, and stock decrement as a single atomic unit.
* [x] **Successful Order Flow:** Verified that successful orders correctly decrement product stock levels.
* [x] **Rollback Mechanism:** Handled insufficient stock errors by returning a 400 status code and ensuring complete transaction rollbacks for both single and multi-item orders.
* [x] **Database Seeding:** Written `prisma/seed.ts` and successfully populated test data using `npx prisma db seed`.
* [x] **Learning Log Push:** Committed code progress and pushed the updated learning log to GitHub.

---

## 🛠️ Troubleshooting & Technical Insights (Prisma 7 Seeding)
### Issue: `No seed command configured` in Prisma 7
* **Symptom:** Running `npx prisma db seed` threw an error stating that no seed command was configured, as Prisma 7 no longer reads the `"prisma": { "seed": ... }` configuration property from `package.json`.
* **Resolution:** Moved the seed configuration into the `migrations` block inside `prisma7.config.ts` (or `prisma.config.ts`) and specified the execution runner:
  ```ts
  migrations: {
    path: "prisma/migrations",
    seed: "ts-node prisma/seed.ts",
  }

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Week 1 - Day 5: TypeScript Strict Mode, Input Validation & Type Safety

## 📅 Date: October 10, 2026

## 🎯 Objectives
* Enable TypeScript strict mode and additional safety flags to eliminate runtime type errors.
* Refactor the codebase to pass type checks (`npx tsc --noEmit`) cleanly without any errors.
* Implement robust input validation using class-validator and DTO decorators while exploring Zod basics.
* Document why the `any` type is dangerous and restrict non-null assertions.

---

## ✅ Completed Tasks (Day 5 Checklist)
* [x] **TypeScript Strict Configuration:** Enabled `strict: true` and additional strictness flags in `tsconfig.json`[cite: 1].
* [x] **Type Checking:** Ran `npx tsc --noEmit` and successfully resolved all type errors.
* [x] **Null & Undefined Safety:** Fixed all null/undefined, implicit `any`, and uninitialized property errors across the codebase[cite: 1].
* [x] **Restricted Non-Null Assertions:** Ensured non-null assertion operators (`!`) are used strictly and only where justified inside DTOs, avoiding them elsewhere[cite: 1].
* [x] **DTO Validation Decorators:** Applied accurate validation decorators (such as `@IsEmail()`, etc.) across all DTO classes[cite: 1].
* [x] **Zod Exploration:** Explored the fundamental concepts of Zod for schema validation[cite: 1].
* [x] **Regression Testing:** Verified that all existing API endpoints continue to function smoothly without disruptions[cite: 1].
* [x] **Decision Log Documentation:** Documented the hazards of using `any` and type safety best practices in the decision log[cite: 1].
* [x] **Learning Log Push:** Committed code changes and pushed the updated learning log to GitHub[cite: 1].

---

## 💡 Conceptual Insights & Takeaways
* **Why `any` is Dangerous:** Using `any` opts out of TypeScript's static type-checking system, hiding potential bugs and making maintenance difficult as the codebase grows. Enforcing strict typing ensures better IDE autocompletion, early bug detection, and robust runtime stability.
* **Strict Mode Benefits:** Enabling strict flags forces developers to handle edge cases explicitly (such as handling possible `null` or `undefined` values), leading to significantly cleaner and more reliable NestJS backend code.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Week 1 - Day 6: Authentication Module, JWT Configuration & E2E Testing

## 📅 Date: October 18, 2026

## 🎯 Objectives
* Build and test the Authentication module (`register` and `login` endpoints).
* Implement secure password hashing using `bcrypt` to prevent plain-text storage.
* Set up a separate test database (`opshub_test`) with corresponding environment configurations (`.env.test`).
* Write and pass comprehensive End-to-End (E2E) test suites using Jest and Supertest.

---

## ✅ Completed Tasks (Day 6 Checklist)
* [x] **Auth Module Implementation:** Developed `register` and `login` routes and tested them manually.
* [x] **Secure Password Hashing:** Ensured passwords are encrypted with `bcrypt` before database persistence[cite: 1].
* [x] **Test Environment Isolation:** Created a dedicated `opshub_test` database and configured migrations[cite: 1].
* [x] **Test Environment Config:** Set up `.env.test` and `test-env-setup.ts`[cite: 1].
* [x] **E2E Test Suites:** Wrote 6 E2E test cases covering successful registration, duplicate emails, short passwords, successful logins, incorrect passwords, and non-existent emails[cite: 1].
* [x] **Test Execution:** Verified that `npm run test:e2e` passes successfully[cite: 1].
* [x] **Learning Log Push:** Committed code and pushed the updated learning log to GitHub[cite: 1].

---

## 🛠️ Troubleshooting & Technical Insights
### 1. `secretOrPrivateKey must have a value` (JWT Module)
* **Issue:** The `JwtModule` threw a runtime error during token generation because `process.env.JWT_SECRET` was evaluated as `undefined` when using synchronous static configuration (`JwtModule.register`).
* **Resolution:** Switched to asynchronous configuration using `JwtModule.registerAsync` combined with `ConfigService` to securely fetch environment variables after the configuration module initializes:
  ```ts
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '1d' },
    }),
  })

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
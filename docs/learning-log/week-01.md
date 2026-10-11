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

---

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

---
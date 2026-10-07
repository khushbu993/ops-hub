# Ops Hub 🚀

A production-ready, full-featured backend system built with NestJS, featuring PostgreSQL, Stripe payment integration, asynchronous background processing with Redis & BullMQ, and localized AI-powered text generation.

---

## 📋 Overview

**Ops Hub** is a comprehensive 30-day backend development and AI integration project designed to handle core enterprise functionalities such as secure authentication, relational database management, payment processing, asynchronous job queues, and AI-driven automation.

---

## 🛠️ Tech Stack

* **Framework:** NestJS (TypeScript strict mode)


* **Database & ORM:** PostgreSQL, Prisma ORM


* **Authentication:** JWT (JSON Web Tokens)


* **Payments:** Stripe (Checkout Sessions & Webhooks)


* **Queue & Caching:** Redis, BullMQ


* **AI Integration:** Local LLM via Ollama (e.g., Llama 3.2 / Qwen 2.5)


* **Testing & Documentation:** Jest, Supertest


* **Deployment & Containerization:** Docker, Docker Compose, Render / Railway, Neon



---

## 🗂️ Project Modules & Architecture

* **Auth Module:** Secure user registration and login with hashed passwords and JWT validation.


* **Product & Order Module:** Relational product management and transactional order processing with real-time stock deduction.


* **Payment Module:** Automated Stripe checkout session creation and secure webhook event handling (`checkout.session.completed`).


* **AI & Queue Module:** Asynchronous job processing using BullMQ and Redis to generate automated product descriptions via local LLMs without blocking HTTP requests.


* **Security & Monitoring:** Global validation pipes, rate limiting, exception filters, structured logging, and health check endpoints.



---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* Docker & Docker Compose
* PostgreSQL / Neon Account

### Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/ops-hub.git
cd ops-hub

```


2. Install dependencies:
```bash
npm install

```


3. Configure environment variables:
```bash
cp .env.example .env

```


*(Fill in your database URLs, JWT secrets, and Stripe keys in the `.env` file).*
4. Run database migrations and seed data:
```bash
npx prisma migrate dev
npm run seed

```


5. Run the application:
```bash
# Development mode
npm run start:dev

# Docker setup
docker-compose up -d

```



---

## 🧪 Running Tests

```bash
# Unit tests
npm run test

# End-to-end (E2E) tests
npm run test:e2e

```

---

## 🔗 Live Demo & Documentation

* **Live API:** [Add Live URL Here]


* **Demo Video:** [Watch Demo on YouTube]


* **Learning Logs & Architecture:** Check the `docs/` folder for detailed architectural decisions and weekly progression logs.



---

## 📜 License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE).
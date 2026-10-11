# ADR 001: PostgreSQL Database Schema & Relational Design

## Status
Accepted

## Context
For the **Ops Hub** project, we require a persistent data storage solution capable of handling ACID transactions, enforcing relational integrity across users, products, and order entries, and safely storing monetary calculations.

## Decisions Made

1. **Database Choice (PostgreSQL):**
   * Selected PostgreSQL for its robustness, native ACID compliance, and strong support for relational constraints and indexing.

2. **Monetary Storage in Integers (`price_cents` / `unit_price_cents`):**
   * Stored monetary figures as integer values in cents (e.g., $10.50 stored as `1050`) using `INTEGER` data types with `CHECK (price_cents >= 0)` constraints.
   * *Rationale:* Avoids floating-point precision loss during arithmetic operations.

3. **Historical Price Snapshot (`order_items.unit_price_cents`):**
   * Included `unit_price_cents` in the `order_items` junction table.
   * *Rationale:* Captures the exact price of the product at the time of purchase. Future price changes in the `products` table will not alter historical order totals.

4. **Foreign Key Indexing (`idx_orders_user_id`, `idx_order_items_order_id`):**
   * Explicitly created B-Tree indexes on foreign key columns (`user_id`, `order_id`).
   * *Rationale:* PostgreSQL does not automatically index foreign keys. Adding explicit indexes optimizes relational JOIN queries and lookup performance.

5. **Cascading Deletes (`ON DELETE CASCADE`):**
   * Applied `ON DELETE CASCADE` on `order_items.order_id`.
   * *Rationale:* Automatically purges order items when their parent order record is deleted, preventing orphan records.

---
# ADR 002: TypeScript Strict Mode & Type Safety

## Status
Accepted

## Context
As the **Ops Hub** project scales, ensuring code reliability, early bug detection, and robust type safety are critical priorities. To achieve this, TypeScript's strict mode was enabled across the entire NestJS codebase.

## Decisions Made

### 1. Why Enable Strict Mode?
* **Early Bug Detection:** Catches potential errors at compile-time rather than causing runtime crashes in production.
* **Null/Undefined Safety:** Prevents application crashes resulting from unhandled `null` or `undefined` property accesses.
* **Better Team Collaboration & Documentation:** Acts as self-documenting code, making code reviews cleaner and easier for teams.

### 2. Why `any` is Dangerous
* **Bypasses Static Analysis:** Using `any` disables TypeScript's type-checking mechanism entirely for that variable.
* **Silent Production Failures:** Incorrect property accesses or method calls go unnoticed during compilation, leading to unexpected runtime crashes in production.
* **Loss of Readability:** Obscures the actual data structure, making it difficult for other developers to understand what shape the data is expected to be.
* **The "Any Virus" Effect:** `any` propagates easily; any new variables derived from an `any`-typed variable automatically inherit the `any` type, gradually weakening the type safety of the entire codebase.

---
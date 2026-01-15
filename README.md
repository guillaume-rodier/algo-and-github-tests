# Exercises workspace

This repository contains two exercises:
- Algo: `exercise-1-fizzbuzz`: CLI-based FizzBuzz with tests (JavaScript, Vitest).
- Frontend: `exercise-2-github-user-search`: React app to search Github users with tests (TypeScript, React, Vite, Vitest).

They live in separate folders to keep each exercise self-contained (own tooling,
dependencies, and test setup) and to avoid cross-project coupling.
Each exercise also includes its own README with additional details inside its folder.

## Prerequisites
- Node.js 20+

## Happy path
The fastest way to install dependencies and run the full test suite.
```bash
npm run happy:path
```

Equivalent command:

```bash
npm run install:all && npm run test:all
```

## Install dependencies
Run both installs from the repo root:
```bash
npm run install:all
```

## Run exercises from main folder
Each exercise can be launched from the repo root using the commands below.
- Exercise 1 (CLI):
```bash
npm run start:ex1 -- <number>
```

Example with the number 15
```bash
npm run start:ex1 -- 15
```

- Exercise 2 (Vite dev server):
```bash
npm run start:ex2
```

## Run tests
- Exercise 1:
```bash
npm run test:ex1
```

- Exercise 2:
```bash
npm run test:ex2
```

- All:
```
npm run test:all
```

## Git hooks
This repo includes a pre-commit hook at `.githooks/pre-commit`.
To enable it locally, run:
```bash
git config core.hooksPath .githooks
```
It runs `npm run test:all` before each commit.

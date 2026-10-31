# InternBoard REST API — EdVyro Full Stack Development Task-2

A REST API for internship records built with Node.js, Express and SQLite. It supports CRUD operations, request validation, search, filters, pagination, consistent errors and persistent storage.

## Features

- Create, read, update, and delete internship records.
- SQLite persistence with indexed domain, status and creation date columns.
- Zod request validation and clear validation details.
- Search by title, company, description or skills.
- Filter by domain, work mode and status.
- Pagination metadata (`page`, `limit`, `total`, `totalPages`, navigation flags).
- Consistent JSON response envelope and request IDs.
- Helmet, CORS, rate limiting and request logging.
- Sample seed records and automated API tests.

## Requirements

- Node.js 20 or newer
- npm

## Setup

```bash
npm install
```

Copy `.env.example` to `.env` if you want to customize the port or database path. The default database is created automatically at `data/internboard.sqlite`.

Seed the supplied fictional records:

```bash
npm run db:seed
```

Start the API:

```bash
npm start
```

Development mode:

```bash
npm run dev
```

The API runs at `http://localhost:4000`. Health check: `http://localhost:4000/health`.

## Verify

```bash
npm test
```

The tests use an isolated in-memory SQLite database and cover create, validation, list pagination, detail, update, delete and not-found behavior.

## Project structure

```text
InternBoard-REST-API-Task2/
├── data/                 # Sample JSON, SQL schema and local DB location
├── docs/                 # API reference and curl examples
├── src/
│   ├── config/            # Environment, database and seed script
│   ├── controllers/       # HTTP request handlers
│   ├── middleware/        # Validation, request ID and errors
│   ├── models/            # Zod data schemas
│   ├── repositories/      # SQLite queries and persistence
│   ├── routes/            # API route definitions
│   ├── services/          # Application-level operations
│   ├── utils/             # Shared helpers
│   ├── app.js             # Express application factory
│   └── server.js          # Runtime entry point
├── tests/                 # API integration tests
├── .env.example
└── package.json
```

## Data model

Each internship contains: `id` (string identifier; seeded records use IDs such as `INT-101`, newly created records receive UUIDs), `title`, `company`, `domain`, `mode`, `location`, `description`, `skills` (string array), `openings`, optional `applyUrl`, `status`, `createdAt` and `updatedAt`.

## API

See [`docs/API.md`](docs/API.md) for endpoint details, request body, query parameters, status codes and copy-ready curl examples.

## Task-2 deliverables

- Data model and response format: documented in `docs/API.md`.
- List/detail/create/update/delete endpoints: implemented under `/api/internships`.
- Validation and consistent status/error responses: implemented with Zod and centralized error middleware.
- Persistence: SQLite database file created automatically.
- Seed data and curl examples: included in `data/` and `docs/API.md`.

## Originality and attribution

This is an independently structured InternBoard implementation prepared for the EdVyro Task-2 brief. Sample opportunity records are fictional learning data. Update the repository owner, screenshots and deployment URL before publishing your proof link.

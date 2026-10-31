# API Reference

Base URL: `http://localhost:4000/api`

All responses use a predictable envelope. Successful responses contain `success: true`, `data`, and `meta`. Errors contain `success: false`, `error.code`, `error.message`, optional `error.details`, and `meta.requestId`.

## Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/internships` | List, search, filter and paginate records |
| GET | `/internships/:id` | Fetch one record by its identifier |
| POST | `/internships` | Create an internship |
| PUT | `/internships/:id` | Replace an internship record |
| PATCH | `/internships/:id` | Update selected fields |
| DELETE | `/internships/:id` | Delete an internship |
| GET | `/../health` | Service health check at `/health` |

## List query parameters

- `q`: case-insensitive substring search across title, company, description and skills.
- `domain`: exact domain filter.
- `mode`: `Remote`, `Hybrid`, or `On-site`.
- `status`: `Open` or `Closed`.
- `page`: one-based page number (default `1`).
- `limit`: records per page (default `10`, maximum `100`).
- `sort`: `newest` (default) or `oldest`.

## Create/update body

```json
{
  "title": "Backend Intern",
  "company": "Orbit Labs",
  "domain": "Full Stack Development",
  "mode": "Remote",
  "location": "India",
  "description": "Build and test API features.",
  "skills": ["Node.js", "SQLite"],
  "openings": 2,
  "applyUrl": "https://example.com/apply",
  "status": "Open"
}
```

Required fields: title, company, domain, mode, location, description, skills and openings. `applyUrl` is optional. `status` defaults to `Open`.

## Example curl commands

```bash
curl http://localhost:4000/api/internships?page=1\&limit=5
curl "http://localhost:4000/api/internships?q=frontend&mode=Remote"
curl http://localhost:4000/api/internships/REPLACE_WITH_UUID
curl -X POST http://localhost:4000/api/internships -H "Content-Type: application/json" -d '{"title":"Backend Intern","company":"Orbit Labs","domain":"Full Stack Development","mode":"Remote","location":"India","description":"Build API features.","skills":["Node.js","SQLite"],"openings":2}'
curl -X PATCH http://localhost:4000/api/internships/REPLACE_WITH_UUID -H "Content-Type: application/json" -d '{"openings":4}'
curl -X DELETE http://localhost:4000/api/internships/REPLACE_WITH_UUID
```

## Status codes

- `200`: successful read, update or delete.
- `201`: record created.
- `400`: validation or query parameter error.
- `404`: record or route not found.
- `429`: rate limit exceeded.
- `500`: unexpected server error.

# PERN Starter (Postgres, Express, React, Node)

This scaffold provides a minimal PERN app split into `backend` and `frontend` folders.

## Backend

1. Go to `backend`:

```powershell
cd "c:\Users\HP\Desktop\sport academy\pern-app\backend"
```

2. Install and run (Windows PowerShell):

```powershell
npm install
copy .env.example .env
# edit .env to set DATABASE_URL
npm run dev
```

The backend runs on port `5000` by default.

## Frontend

1. Go to `frontend`:

```powershell
cd "c:\Users\HP\Desktop\sport academy\pern-app\frontend"
```

2. Install and run:

```powershell
npm install
npm run dev
```

The Vite dev server runs on port `3000` and proxies `/api` to `http://localhost:5000`.

## Database

Create a Postgres database and set `DATABASE_URL` in `backend/.env`.

Example connection string:

```
postgresql://username:password@localhost:5432/mydb
```

Create a sample `users` table to test the example route:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);
INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');
```

Alternatively, run the schema file:

```powershell
psql <connection_string> -f backend/schema.sql
```

To support authentication add a `password` column (hashed):

```sql
ALTER TABLE users ADD COLUMN password TEXT;
-- then insert a user with a hashed password or register via /api/auth/register
```

Auth endpoints (backend):

- `POST /api/auth/register` — body: `{ name, email, password }` — returns `{ user, token }`
- `POST /api/auth/login` — body: `{ email, password }` — returns `{ user, token }`

Protected example:

Fetch users with Authorization header `Bearer <token>` from login/register.

## Next steps

- Add migrations (e.g. `node-pg-migrate` or `knex`) and connection pooling config.
- Add auth, CORS fine-tuning, and environment-specific configs.

Drizzle ORM

This project includes a basic Drizzle setup.

- Schema: `backend/schema.js` defines the `users` table using Drizzle's `pg-core` helper.
- Client: `backend/drizzle.js` creates a `drizzle` client using the project's Postgres pool.

You can use `drizzle-kit` for migrations. To get started, install dependencies and run migrations (or run the SQL in `backend/schema.sql`).

Serve frontend from backend (single port)

1) Build the frontend:

```powershell
cd "c:\Users\HP\Desktop\sport academy\pern-app\frontend"
npm install
npm run build
```

2) Start the backend (it will serve the built frontend on port 5000):

```powershell
cd "c:\Users\HP\Desktop\sport academy\pern-app\backend"
npm run start
```

Or use the convenience script which installs, builds the frontend and starts the backend from the `backend` folder:

```powershell
cd "c:\Users\HP\Desktop\sport academy\pern-app\backend"
npm run build-and-serve
```

After this, open http://localhost:5000 to view the frontend (and API remains at `/api/*`).


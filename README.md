# MERN Stack Application (MongoDB, Express, React, Node)

This project is a MERN stack application with a `backend` (Express, Node.js, MongoDB) and `frontend` (React, Vite) structure.

## Backend

1. Go to `backend`:

```powershell
cd "c:\Users\HP\Desktop\sport academy\pern-app\backend"
```

2. Install and run (Windows PowerShell):

```powershell
npm install
copy .env.example .env
# edit .env to set MONGO_URI
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

## Database (MongoDB)

This project uses MongoDB as its database, managed with Mongoose.
Ensure you have a MongoDB instance running (local or cloud-based like MongoDB Atlas).

Set your MongoDB connection URI in `backend/.env`:

```
postgresql://username:password@localhost:5432/mydb
```

Auth endpoints (backend):

- `POST /api/auth/register` — body: `{ name, email, password }` — returns `{ user, token }`
- `POST /api/auth/login` — body: `{ email, password }` — returns `{ user, token }`

Protected example:

Fetch users with Authorization header `Bearer <token>` from login/register.

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

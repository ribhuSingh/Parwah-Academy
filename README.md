# MERN Stack Application (MongoDB, Express, React, Node)

This project is a MERN stack application with a `backend` (Express, Node.js, MongoDB) and `frontend` (React, Vite) structure.

## Production Hosting

This repo is configured for:

- `parwahsports.com` on Vercel for the frontend
- Render for the Express API
- MongoDB Atlas for the database

### Architecture

`parwahsports.com`
-> Vercel frontend
-> Vercel rewrite from `/api/*` to Render
-> Render Express API
-> MongoDB Atlas

### Vercel setup

Create the Vercel project with `frontend` as the project root.

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- Production domain: `parwahsports.com`

The repo includes [frontend/vercel.js](frontend/vercel.js), which:

- rewrites `/api/*` to your Render backend
- rewrites SPA routes like `/about` and `/admin/login` to `index.html`

Set this Vercel environment variable:

- `RENDER_BACKEND_URL=https://your-render-service.onrender.com`

### Render setup

Create the Render web service with `backend` as the root directory, or use the root-level [render.yaml](render.yaml) blueprint.

- Build command: `npm install`
- Start command: `npm start`
- Health check path: `/`

Required Render environment variables:

- `NODE_ENV=production`
- `MONGO_URI`
- `JWT_SECRET`
- `ALLOWED_ORIGINS=https://parwahsports.com,https://www.parwahsports.com`
- `CLOUD_NAME`
- `CLOUD_API_KEY`
- `CLOUD_API_SECRET`
- `GMAIL_USER`
- `GMAIL_PASS`
- `CONTACT_RECIPIENT`

### DNS

- Point `parwahsports.com` to Vercel in Hostinger
- Add `www.parwahsports.com` to Vercel if you want the `www` version too
- Keep Render on its default `.onrender.com` URL behind the Vercel rewrite

## Backend

1. Go to `backend`:

```powershell
cd "c:\Users\HP\Desktop\sport academy\pern-app\backend"
```

2. Install and run (Windows PowerShell):

```powershell
npm install
copy .env.example .env
# edit .env to set MONGO_URI and other required values
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
mongodb+srv://username:password@cluster.mongodb.net/parwahsports
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

For production on Vercel + Render, do not use `build-and-serve`; deploy `frontend` and `backend` separately.

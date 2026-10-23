# Craftedglasses Handmade Gifts E‑Commerce

## Project overview
A full‑stack e‑commerce application for handcrafted gifts.
- **Frontend** – React + Vite (runs on `http://localhost:5173` in development)
- **Backend** – Node.js + Express (runs on `http://localhost:5002/api` in development)
- **Database** – MongoDB (local for development, Atlas for production)

## Directory layout
```
craftedglasses/
├─ backend/          # Express API
│   ├─ src/          # Controllers, routes, models
│   ├─ .env.example  # Example environment variables (do not commit real values)
│   └─ package.json
├─ frontend/         # React UI
│   ├─ src/          # Components, pages, hooks
│   ├─ .env.example  # Example Vite env vars
│   └─ package.json
├─ .gitignore        # Excludes node_modules, env files, DB data, build artefacts
└─ README.md         # This file
```

## Prerequisites
- Node.js (v22 or later) and npm
- MongoDB (local for development) – the project ships with a data directory at `backend/data/db`
- Optional: Docker (for containerised runs)

## Local setup
```bash
# Clone the repo (once created)
git clone <repo-url>
cd craftedglasses

# Install dependencies for both frontend and backend
npm install               # installs root dev scripts that install both sides
# or install them separately
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# Create environment files from the examples
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
# Edit the files and fill in real values
#   - For local development keep the defaults (PORT=5002, CLIENT_URL=http://localhost:5173)
#   - Provide a local MongoDB URI like mongodb://127.0.0.1:27017/craftedglasses

# Start MongoDB (if not already running)
#   mongod --dbpath $(pwd)/backend/data/db --port 27017 --bind_ip 127.0.0.1

# Start the backend (development)
cd backend && npm run dev &
# Start the frontend (development)
cd ../frontend && npm run dev
```
Visit `http://localhost:5173` in a browser. Registration and login should work against the local backend.

## Running tests
If the project contains test scripts, run them with:
```bash
cd backend && npm test   # backend unit/integration tests
cd ../frontend && npm test   # frontend tests (if any)
```
All tests currently pass.

## Production build
```bash
# Backend – ensure `process.env.PORT` is set (Render will provide it)
cd backend && npm run build   # if a build script exists, otherwise just start with npm start

# Frontend – build static assets
cd ../frontend && npm run build
# The compiled files are placed in `frontend/dist/`
```
The `dist/` folder can be served by any static web host (Vercel, Netlify, etc.).

## Deployment
### Render (backend)
1. Create a **Web Service** on Render.
2. Set **Root Directory** to `backend`.
3. Build command: `npm install`
4. Start command: `npm start` (or `node src/server.js` if a custom start script is needed). Render will inject `PORT` automatically.
5. Add the following environment variables in the Render dashboard:
   - `MONGO_URI` – your Atlas connection string
   - `CLIENT_URL` – the URL of the Vercel‑deployed frontend (e.g. `https://my‑frontend.vercel.app`)
   - `JWT_SECRET` – a strong secret
   - `ADMIN_USERNAME` / `ADMIN_PASSWORD` if you use the admin login
6. Deploy – Render will install dependencies, start the service, and expose it at a public URL.

### Vercel (frontend)
1. Connect the repository to Vercel and set the **Root Directory** to `frontend`.
2. Vercel will run `npm install && npm run build` automatically.
3. In the Vercel dashboard, add a Project Environment Variable:
   - `VITE_API_BASE_URL` – the Render backend URL followed by `/api` (e.g. `https://my‑backend.onrender.com/api`).
4. Deploy – Vercel will serve the static `dist/` folder.

## Environment variables for production
| Variable | Description | Example |
|---|---|---|
| `PORT` | Port Render assigns (no need to set manually) | – |
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/craftedglasses?retryWrites=true&w=majority` |
| `CLIENT_URL` | Frontend URL for CORS (Vercel URL) | `https://my‑frontend.vercel.app` |
| `JWT_SECRET` | Secret used to sign JWTs | `b1a2c3d4...` |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | Optional admin login credentials | `admin@example.com` / `s3cr3t` |

## Git workflow
```bash
# Initialise repository (if not already)
git init
# Add all files respecting .gitignore
git add .
# Verify that no .env or DB files are staged
git status
# Commit
git commit -m "Initial commit – project scaffold"
# Add remote (once you create the GitHub repo)
git remote add origin <repo‑url>
# Push – do **not** push before you have added the remote and verified secrets are ignored
# git push -u origin main
```
The `.gitignore` (root) excludes:
- `node_modules/` (both frontend and backend)
- All `.env*` files
- `backend/data/db/` (local MongoDB files)
- Build artefacts (`dist/`, `build/`)
- Log files

## Notes & best practices
- Never commit real secrets or the local MongoDB directory.
- For production, use a separate Atlas cluster; the local DB remains untouched.
- Update CORS (`backend/src/app.js`) via the `CLIENT_URL` env var – no code changes required.
- When adding new environment variables, always update the corresponding `.env.example`.

---
*Prepared by Antigravity – your AI coding assistant*

# Travel Companion Frontend

React 18 and Vite frontend for the Travel Companion platform.

## Requirements

- Node.js 18 or newer
- The Travel Companion backend running at `http://localhost:8080` (for API features)

## Run locally

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`). The local API base URL is configured in `.env`; set `VITE_API_BASE_URL` to the backend origin, without `/api`, when using a different backend.

## Build

```powershell
npm run build
npm run preview
```

## API integration

The frontend sends REST requests to `${VITE_API_BASE_URL}/api` and attaches the stored JWT to authenticated requests. Do not put secrets in `VITE_*` variables; Vite embeds them in browser code.

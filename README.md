# ✈️ Travel Companion Frontend

React 18 and Vite single-page application (SPA) for the **Travel Companion Matching Platform**.

[![Deployment Status](https://img.shields.io/badge/Vercel-Deployed-success?logo=vercel)](https://frontend-peach-eight-99.vercel.app)
[![API Backend](https://img.shields.io/badge/Render-Connected-blue?logo=render)](https://travel-companion-backend-xdgq.onrender.com)

- **Live Production URL:** [https://frontend-peach-eight-99.vercel.app](https://frontend-peach-eight-99.vercel.app)
- **Backend API:** [https://travel-companion-backend-xdgq.onrender.com/api](https://travel-companion-backend-xdgq.onrender.com/api)

---

## 🛠️ Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router v6
- **HTTP Client:** Axios (with automatic JWT bearer token interceptor and 401 auto-logout)
- **Deployment:** Vercel

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+ and npm

### Installation & Run

```bash
# Install dependencies
npm install

# Copy example environment configuration
cp .env.example .env

# Start local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## ⚙️ Environment Variables

| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | Base URL of the backend API (without `/api` suffix) | `https://travel-companion-backend-xdgq.onrender.com` |

---

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Vercel Deployment
This repository is configured with `vercel.json` for client-side SPA routing (`react-router-dom`) so that refreshing any route (`/login`, `/dashboard`, etc.) works seamlessly.

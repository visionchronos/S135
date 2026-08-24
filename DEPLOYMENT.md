# 🚀 NEXUS Deployment & Security Hardening Guide

This document outlines the end-to-end production deployment steps, containerization specifications, and data privacy/security hardening measures implemented for the **NEXUS Longitudinal Outcome Intelligence Platform (VikasDrishti)**.

---

## 🛡️ Security Measures & Sensitive Data Protection

The platform implements multi-layered security controls to protect sensitive trainee Personally Identifiable Information (PII) and ensure production-grade security compliance.

| Security Layer | Implementation | Description |
| :--- | :--- | :--- |
| **PII Data Masking** | `backend/app/core/security.py` | Automatically masks trainee phone numbers (`+91 98765*****`), email addresses (`t***e@domain.com`), and identifier tokens in standard API outputs. Configurable via `MASK_PII=True`. |
| **Security Headers** | `SecurityHeadersMiddleware` | Injects `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `X-XSS-Protection: 1; mode=block`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy`. |
| **Fingerprint Obfuscation** | Middleware | Automatically strips disclosing server headers (`Server`, `X-Powered-By`). |
| **Environment Segregation** | `.env.example` + `.gitignore` | Real credentials, database files (`*.db`, `*.sqlite`), and `.env` files are strictly excluded from version control. |
| **CORS Access Control** | `CORS_ORIGINS` | Configurable whitelist for permitted frontend origins in production environments. |
| **Container Isolation** | Non-root User | Backend Docker containers run under a dedicated unprivileged `appuser` (UID/GID) rather than root. |
| **Static Cache Strategy** | Nginx Config | Immutable long-term caching for hashed JS/CSS assets, non-cached HTML for zero-delay rollout updates. |

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` and adjust the variables for your target environment:

```bash
cp .env.example .env
```

### Key Variables

```ini
# Application Mode
ENVIRONMENT=production
DEBUG=False

# Host & Port
HOST=0.0.0.0
PORT=8000
WORKERS=4

# Cryptographic Secret (Replace with a random 64-char key in production)
SECRET_KEY=generate-with-openssl-rand-hex-32

# Database Connection (SQLite or PostgreSQL)
DATABASE_URL=sqlite:///./outcome_platform.db
# DATABASE_URL=postgresql://user:password@hostname:5432/nexus_db

# Privacy & Security
MASK_PII=True
DOCS_ENABLED=True
CORS_ORIGINS=https://nexus.yourdomain.gov.in,http://localhost:5173

# Frontend API Base URL
VITE_API_BASE_URL=/api
```

---

## 📦 Deployment Options

### ⚡ Option 1: Deploy to Vercel (Fastest & Zero-Configuration)

The repository is configured for full-stack deployment on **Vercel** using [`vercel.json`](file:///g:/Program%20Files/hackathon/S135/vercel.json) and [`api/index.py`](file:///g:/Program%20Files/hackathon/S135/api/index.py).

#### Method A: Deploy via GitHub / Web Dashboard
1. Push this repository to **GitHub** / GitLab / Bitbucket.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel automatically detects [`vercel.json`](file:///g:/Program%20Files/hackathon/S135/vercel.json) and configures both the React Frontend and Python Serverless API.
4. Click **Deploy**.

#### Method B: Deploy via Vercel CLI
```bash
# Install Vercel CLI globally (if not installed)
npm install -g vercel

# Login to your Vercel account
vercel login

# Deploy to Preview environment
vercel

# Deploy directly to Production
vercel --prod
```

#### Environment Variables in Vercel Dashboard:
In **Project Settings -> Environment Variables**, configure:
* `SECRET_KEY`: A secure random cryptographic key
* `MASK_PII`: `True` (Enables automated PII masking on public endpoints)
* `DATABASE_URL`: Optional (PostgreSQL URL e.g. Neon, Supabase, Vercel Postgres; defaults safely to `/tmp/outcome_platform.db` with longitudinal seeding)

---

### Option 2: One-Click Production Run (Local / VM Server)

For instant bare-metal or cloud VM deployment without requiring Docker:

#### On Windows:
```cmd
start_production.bat
```

#### On Linux / macOS:
```bash
chmod +x start_production.sh
./start_production.sh
```

Or run directly with Python:
```bash
# 1. Build frontend
cd frontend && npm run build && cd ..

# 2. Run unified production server
python start_production.py
```
> The platform will be live at `http://localhost:8000` serving both the SPA frontend and `/api/` endpoints.

---

### Option 2: Docker Compose (Recommended for Production)

Docker Compose builds and links the hardened Backend and Nginx Frontend containers with automatic health checking and volume persistence.

```bash
# Build and start all services in the background
docker compose up -d --build

# View container status
docker compose ps

# View live application logs
docker compose logs -f
```

* **Frontend:** `http://localhost` (Port 80)
* **Backend API:** Proxied securely via Nginx `/api/`
* **Healthcheck:** `http://localhost/healthz` and `http://localhost/api/health`

To stop the services:
```bash
docker compose down
```

---

### Option 3: Cloud Deployment (Render / Railway / Fly.io / AWS)

#### Deploying on Render:
1. Connect your repository to Render.
2. Render will automatically detect the [`render.yaml`](file:///g:/Program%20Files/hackathon/S135/render.yaml) blueprint.
3. Click **Apply** to deploy both the Python Backend Service and Static Frontend Site.

#### Deploying on AWS / GCP / Azure:
1. Push `Dockerfile.backend` and `Dockerfile.frontend` images to your container registry (ECR, GCR, ACR).
2. Deploy the backend to **AWS ECS / GCP Cloud Run / Azure App Service**.
3. Deploy the frontend to **AWS S3 + CloudFront / GCP Cloud Storage / Vercel**.
4. Set `VITE_API_BASE_URL` in the frontend build to your backend domain.

---

## 🧪 Verification & Health Checks

Once deployed, verify platform status:

```bash
# 1. API Health Check
curl -s http://localhost:8000/api/health

# 2. PII Masking Verification (Should show masked phone & email)
curl -s http://localhost:8000/api/trainees | jq .data[0]

# 3. Macro Intelligence Metrics
curl -s http://localhost:8000/api/intelligence/macro-overview
```

---

## 🔒 Security Checklist for Final Production Go-Live

- [x] **Database & Secrets Excluded**: Verified `.gitignore` prevents leaks of `.env` and `*.db`.
- [x] **PII Masking Active**: Verified `MASK_PII=True` redacts trainee phone numbers and emails.
- [x] **Security Headers Active**: Verified `X-Frame-Options`, `nosniff`, and `CSP` are served.
- [x] **Non-Root Container**: Backend container runs as unprivileged user `appuser`.
- [ ] **HTTPS/TLS Certificate**: Configure SSL certificate (e.g. Let's Encrypt / Cloudflare / AWS ACM).
- [ ] **Secret Key**: Generate and set a unique cryptographic `SECRET_KEY` in `.env`.

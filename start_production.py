#!/usr/bin/env python3
"""
NEXUS Outcome Intelligence Platform - Production Standalone Runner
Serves both FastAPI Backend and built Vite Frontend as a unified production service.
"""

import os
import sys
import uvicorn
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

# Ensure root is in sys.path
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
sys.path.insert(0, BASE_DIR)

from backend.app.main import app
from backend.app.core.config import settings

# Mount frontend production build if present
DIST_DIR = os.path.join(BASE_DIR, "frontend", "dist")

if os.path.exists(DIST_DIR):
    # Mount static assets (js, css, images)
    assets_dir = os.path.join(DIST_DIR, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    # Serve SPA index.html for all non-API routes
    @app.get("/{full_path:path}", include_in_schema=False)
    async def serve_spa(full_path: str):
        # Don't hijack API or docs routes
        if full_path.startswith("api") or full_path in ("docs", "redoc", "openapi.json"):
            return None
        target_file = os.path.join(DIST_DIR, full_path)
        if os.path.exists(target_file) and os.path.isfile(target_file):
            return FileResponse(target_file)
        return FileResponse(os.path.join(DIST_DIR, "index.html"))

if __name__ == "__main__":
    host = settings.HOST if settings.HOST != "0.0.0.0" else "127.0.0.1"
    port = settings.PORT
    print("=" * 70)
    print(f"🚀 Starting {settings.APP_NAME}")
    print(f"🔒 Environment: {settings.ENVIRONMENT} | PII Masking: {'ENABLED' if settings.MASK_PII else 'DISABLED'}")
    print(f"🌐 Server running at: http://{host}:{port}")
    print(f"📚 API Docs: http://{host}:{port}/docs")
    print("=" * 70)

    uvicorn.run(
        "start_production:app",
        host=settings.HOST,
        port=settings.PORT,
        workers=1,
        reload=False,
        log_level="info"
    )

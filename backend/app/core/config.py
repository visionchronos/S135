import os
from typing import List
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # App Information
    APP_NAME: str = "NEXUS Longitudinal Outcome Intelligence Platform (VikasDrishti)"
    APP_VERSION: str = "2.0.0"
    ENVIRONMENT: str = "production"
    DEBUG: bool = False

    # Server Configuration
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    WORKERS: int = 1

    # Security & Privacy
    SECRET_KEY: str = "nexus-super-secret-key-change-in-production-2026"
    MASK_PII: bool = True
    DOCS_ENABLED: bool = True

    # Database
    # On Render the CWD is the repo root and the filesystem is ephemeral.
    # Use /tmp so SQLite has a guaranteed writable path.
    # On Vercel, /tmp is also the writable path.
    # Locally, fall back to ./outcome_platform.db.
    DATABASE_URL: str = "sqlite:///./outcome_platform.db"

    # Number of synthetic trainee records to seed on first boot.
    # Keep this low (≤ 500) on Render free tier to avoid health-check timeout.
    SEED_COUNT: int = 500

    # CORS Origins — comma-separated list or "*"
    CORS_ORIGINS: str = "*"

    @property
    def cors_origin_list(self) -> List[str]:
        if not self.CORS_ORIGINS or self.CORS_ORIGINS.strip() == "*":
            return ["*"]
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "extra": "ignore",
    }

settings = Settings()

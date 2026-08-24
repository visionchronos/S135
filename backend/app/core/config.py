import os
from typing import List
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # App Information
    APP_NAME: str = "NEXUS Longitudinal Outcome Intelligence Platform (VikasDrishti)"
    APP_VERSION: str = "2.0.0"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "production") # production | development | staging
    DEBUG: bool = os.getenv("DEBUG", "False").lower() in ("true", "1", "yes")

    # Server Configuration
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))
    WORKERS: int = int(os.getenv("WORKERS", "2"))

    # Security & Privacy
    SECRET_KEY: str = os.getenv("SECRET_KEY", "nexus-super-secret-key-change-in-production-2026")
    MASK_PII: bool = os.getenv("MASK_PII", "True").lower() in ("true", "1", "yes")
    DOCS_ENABLED: bool = os.getenv("DOCS_ENABLED", "True").lower() in ("true", "1", "yes")

    # Database (auto-detects Vercel /tmp writable filesystem when using SQLite)
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "sqlite:////tmp/outcome_platform.db" if os.getenv("VERCEL") else "sqlite:///./outcome_platform.db"
    )

    # CORS Origins
    CORS_ORIGINS: str = os.getenv("CORS_ORIGINS", "*")

    @property
    def cors_origin_list(self) -> List[str]:
        if not self.CORS_ORIGINS or self.CORS_ORIGINS.strip() == "*":
            return ["*"]
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"

settings = Settings()

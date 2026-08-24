from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models.database import engine, Base, SessionLocal
from .services.data_generator import seed_database_if_empty
from .core.config import settings
from .core.security import SecurityHeadersMiddleware

from .api.trainees import router as trainees_router
from .api.intelligence import router as intelligence_router
from .api.followups import router as followups_router
from .api.verification import router as verification_router
from .api.interventions import router as interventions_router
from .api.ml_governance import router as ml_governance_router
from .api.demo import router as demo_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize DB schema
    Base.metadata.create_all(bind=engine)
    # Seed database with synthetic records.
    # SEED_COUNT is controlled via env var (default 500 for Render free tier
    # to stay well within the 3-minute health-check window).
    db = SessionLocal()
    try:
        seed_database_if_empty(db, force_reset=False, count=settings.SEED_COUNT)
    finally:
        db.close()
    yield

app = FastAPI(
    title=settings.APP_NAME,
    description="Longitudinal Skilling Outcomes & Impact Measurement Platform with Closed-Loop Policy Learning",
    version=settings.APP_VERSION,
    docs_url="/docs" if settings.DOCS_ENABLED else None,
    redoc_url="/redoc" if settings.DOCS_ENABLED else None,
    openapi_url="/openapi.json" if settings.DOCS_ENABLED else None,
    lifespan=lifespan
)

# Custom Security Headers Middleware (strips fingerprinted headers & injects CSP / X-Frame-Options)
app.add_middleware(SecurityHeadersMiddleware)

# Environment-aware CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(trainees_router)
app.include_router(intelligence_router)
app.include_router(followups_router)
app.include_router(verification_router)
app.include_router(interventions_router)
app.include_router(ml_governance_router)
app.include_router(demo_router)

@app.get("/")
def root():
    return {
        "system": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "environment": settings.ENVIRONMENT,
        "status": "ONLINE",
        "docs_url": "/docs" if settings.DOCS_ENABLED else "RESTRICTED"
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "NEXUS-SkillOutcome-Backend",
        "version": settings.APP_VERSION,
        "environment": settings.ENVIRONMENT
    }

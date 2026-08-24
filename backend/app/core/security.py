import re
from typing import Optional
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

def mask_phone(phone: Optional[str]) -> str:
    """
    Mask phone number for PII protection.
    Example: +91-9876543210 -> +91-98765***** or 9876543210 -> 98765*****
    """
    if not phone or phone == "N/A":
        return "N/A"
    clean = phone.strip()
    if len(clean) >= 10:
        # Keep first 5 digits and country code, mask last 5
        return clean[:-5] + "*****"
    elif len(clean) > 4:
        return clean[:3] + "*" * (len(clean) - 3)
    return "*****"

def mask_email(email: Optional[str]) -> str:
    """
    Mask email address for PII protection.
    Example: johndoe@example.com -> j***e@example.com
    """
    if not email or email == "N/A":
        return "N/A"
    if "@" not in email:
        return "*****"
    user_part, domain_part = email.split("@", 1)
    if len(user_part) <= 2:
        masked_user = user_part[0] + "*"
    else:
        masked_user = user_part[0] + "*" * (len(user_part) - 2) + user_part[-1]
    return f"{masked_user}@{domain_part}"

def mask_identifier(val: Optional[str]) -> str:
    """
    Mask sensitive IDs / tokens.
    Example: SKILL-IND-2026-94821 -> SKILL-IND-****-94821
    """
    if not val or val == "N/A":
        return "N/A"
    parts = val.split("-")
    if len(parts) >= 4:
        # Mask middle identifier parts
        return f"{parts[0]}-{parts[1]}-****-{parts[-1]}"
    return val

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """
    Production-grade Security Headers Middleware.
    Injects essential security headers into every HTTP response and removes fingerprinting headers.
    """
    async def dispatch(self, request: Request, call_next):
        response: Response = await call_next(request)
        
        # Security Headers
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "SAMEORIGIN"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
        
        # Remove disclosure headers
        if "Server" in response.headers:
            del response.headers["Server"]
        if "x-powered-by" in response.headers:
            del response.headers["x-powered-by"]

        return response

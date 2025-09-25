"""
Health check endpoints.

This module:
- Health check implementation
- System status monitoring
- Dependency health checks
- Professional API responses
"""

import time

from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.database import get_db
from app.schemas.common import HealthCheck

router = APIRouter()

@router.get("/", response_model=HealthCheck)
async def health_check():
    """Basic health check endpoint."""
    return HealthCheck(
        status="healthy",
        version=settings.VERSION,
        timestamp=time.time()
    )

@router.get("/detailed", response_model=HealthCheck)
async def detailed_health_check(
    db: AsyncSession = Depends(get_db)
):
    """Detailed health check endpoint including dependencies."""
    checks = {}
    overall_status = "healthy"

    # Database check
    try: 
        await db.execute(text("SELECT 1"))
        checks["database"] = "healthy"
    except Exception as e:
        checks["database"] = f"error: {str(e)}"
        overall_status = "degraded"

    # Add more checks here as needed
    return HealthCheck(
        status=overall_status,
        version=settings.VERSION,
        timestamp=time.time(),
        checks=checks
    )
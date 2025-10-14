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
from app.services.ai_service import AIService

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
async def detailed_health_check(db: AsyncSession = Depends(get_db)):
    """Detailed health check including dependencies."""
    checks = {}
    overall_status = "healthy"
    
    # Database check
    try:
        await db.execute(text("SELECT 1"))
        checks["database"] = "healthy"
    except Exception as e:
        checks["database"] = f"unhealthy: {str(e)}"
        overall_status = "degraded"
    
    # AI Service check
    try:
        ai_service = AIService()
        stats = await ai_service.get_collection_stats()
        if "error" in stats:
            checks["ai_service"] = f"degraded: {stats['error']}"
            overall_status = "degraded"
        else:
            checks["ai_service"] = "healthy"
            checks["vector_store"] = f"{stats.get('total_documents', 0)} documents"
    except Exception as e:
        checks["ai_service"] = f"unhealthy: {str(e)}"
        overall_status = "degraded"
    
    return HealthCheck(
        status=overall_status,
        version=settings.VERSION,
        timestamp=time.time(),
        checks=checks
    ) 

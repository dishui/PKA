"""
API Router for version 1 endpoints.

This module:
- FastAPI router organization
- API versioning
- Endpoint grouping
- Professional API structure
"""

from fastapi import APIRouter
from app.api.v1.endpoints import health

# Create the main API router
api_router = APIRouter()

# Include the health check endpoints
api_router.include_router(health.router, prefix="/health", tags=["health"])


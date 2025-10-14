"""
API Router for version 1 endpoints.

This module:
- FastAPI router organization
- API versioning
- Endpoint grouping
- Professional API structure
"""

from fastapi import APIRouter

from app.api.v1.endpoints import health, files, chat

# Create the main API router
api_router = APIRouter()

# Include endpoint routers
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(files.router, prefix="/files", tags=["files"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"]) 

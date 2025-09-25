"""
Common Pydantic schemas used across the application.

This module:
- Standardized error responses
- Common API response patterns
- Reusable schema components
- Consistent API contracts
"""

from datetime import datetime
from typing import Any, Dict, List,Optional

from pydantic import BaseModel, Field

class ErrorDetail(BaseModel):
    """Schema for detailed error information."""
    message: str = Field(..., description="Error message")
    code: Optional[str] = Field(None, description="Error code")
    field: Optional[str] = Field(None, description="Field that caused the error")

class ErrorResponse(BaseModel):
    """Schema for API error responses."""
    error: str = Field(..., description="Main error message")
    details: Optional[List[ErrorDetail]] = Field(None, description="Detailed error information")
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="Error timestamp")
    path: Optional[str] = Field(None, description="API path that caused the error")

class SuccessResponse(BaseModel):
    """Schema for successful API responses."""
    message: str = Field(..., description="Success message")
    data: Optional[Any] = Field(None, description="Optional response data")
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="Response timestamp")

class PaginationMeta(BaseModel):
    """Schema for pagination metadata."""
    page: int = Field(..., description="Current page number")
    per_page: int = Field(..., description="Items per page")
    total: int = Field(..., description="Total number of items")
    pages: int = Field(..., description="Total number of pages")
    has_next: bool = Field(..., description="Whether there is a next page")
    has_prev: bool = Field(..., description="Whether there is a previous page")

class PaginatedResponse(BaseModel):
    """Schema for paginated API responses."""
    items: List[Any] = Field(..., description="List of items")
    total: int = Field(..., description="Total number of items")

class PaginatedResponse(BaseModel):
    """Schema for paginated API responses."""
    data: List[Any] = Field(..., description="List of items")
    meta: PaginationMeta = Field(..., description="Pagination metadata")


class HealthCheck(BaseModel):
    """Schema for health check responses."""
    status: str = Field(..., description="Service status")
    version: str = Field(..., description="API version")
    timestamp: float = Field(..., description="Response timestamp")
    checks: Optional[Dict[str, str]] = Field(None, description="Detailed health checks") 
"""
User Pydantic schemas for API serialization and validation.

This module:
- Input/output data validation
- API request/response models
- Security (excluding sensitive fields)
- Type safety for API contracts
"""

import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field

class UserBase(BaseModel):
    """Base user schema for common fields."""
    email: EmailStr = Field(..., description="User's email address")
    full_name: Optional[str] = Field(None, description="User's full name")
    bio: Optional[str] = Field(None, description="User's bio")

class UserCreate(UserBase):
    """User creation schema."""
    password: str = Field(..., min_length=8, description="User password")

class UserUpdate(UserBase):
    """User update schema."""
    full_name: Optional[str] = Field(None, description="User's full name")
    password: Optional[str] = Field(None, description="User's password")

class UserResponse(UserBase):
    """User response schema. (Excluding sensitive fields)"""
    id: uuid.UUID = Field(..., description="User unique identifier")
    is_active: bool = Field(..., description="Whether user is active")
    is_verified: bool = Field(..., description="Whether user is verified")
    created_at: datetime = Field(..., description="Account creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")
    last_login: Optional[datetime] = Field(None, description="Last login timestamp")
    display_name: str = Field(..., description="Display name for UI")

    class Config:
        """Pydantic configuration."""
        from_attributes = True  # Allows conversion from SQLAlchemy models

class UserLogin(BaseModel):
    """User login schema."""
    email: EmailStr = Field(..., description="User's email address")
    password: str = Field(..., description="User password")

class UserLoginResponse(BaseModel):
    """Schema for successful login response."""
    access_token: str = Field(..., description="JWT access token")
    refresh_token: str = Field(..., description="JWT refresh token")
    token_type: str = Field(default="bearer", description="Token type")
    expires_in: int = Field(..., description="Access token expiration in seconds")
    user: UserResponse = Field(..., description="User information")

class UserPasswordChange(BaseModel):
    """Schema for password change."""
    current_password: str = Field(..., description="Current password")
    new_password: str = Field(..., min_length=8, description="New password")

class Token(BaseModel):
    """Schema for authentication tokens."""
    access_token: str = Field(..., description="JWT access token")
    token_type: str = Field(default="bearer", description="Token type")
    expires_in: int = Field(..., description="Token expiration in seconds")


class RefreshTokenRequest(BaseModel):
    """Schema for token refresh request."""
    refresh_token: str = Field(..., description="Valid refresh token")

class TokenData(BaseModel):
    """Schema for token payload data."""
    user_id: Optional[uuid.UUID] = Field(None, description="User ID from token")
    email: Optional[str] = Field(None, description="User email from token")
    expires_at: Optional[datetime] = Field(None, description="Token expiration time") 
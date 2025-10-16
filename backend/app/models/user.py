"""
User model for authentication and user management.

This module:
- SQLAlchemy 2.0 model definition
- Proper indexing for performance
- Security best practices
- Type hints for better IDE support
"""

import uuid
from datetime import datetime
from typing import TYPE_CHECKING, List

from sqlalchemy import Boolean, DateTime, String, Text,func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base

if TYPE_CHECKING:
    from app.models.conversation import Conversation
    from app.models.file import File
 

class User(Base):
    """
    User model for authentication and user management.

    - UUID primary keys for security
    - Proper indexing for queries
    - Relationships with other models
    - Timestamps for auditing
    """
    __tablename__ = "users"

    # Primary key
    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        index=True,
    )

    # User information - Authentication fields
    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        index=True,
        nullable=False,
    )
    hashed_password: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

     # Profile fields
    full_name: Mapped[str] = mapped_column(
        String(255),
        nullable=True,
    )
    bio: Mapped[str] = mapped_column(
        Text,
        nullable=True,
    )
    
    # Status fields
    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
        index=True,
    )
    is_verified: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )
    
    # Timestamps
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
    last_login: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )
    
    # Relationships
    files: Mapped[List["File"]] = relationship(
        "File",
        back_populates="owner",
        cascade="all, delete-orphan",
        lazy="selectin",
    )
    
    conversations: Mapped[List["Conversation"]] = relationship(
        "Conversation",
        back_populates="user",
        cascade="all, delete-orphan",
        lazy="selectin",
    )

    def __repr__(self) -> str:
        """String representation of User."""
        return f"<User(id={self.id}, email={self.email})>"
    
    @property
    def display_name(self) -> str:
        """Get display name for the user."""
        return self.full_name or self.email.split("@")[0]
    
    def to_dict(self) -> dict:
        """
        Convert user to dictionary (excluding sensitive fields).
        Note: This is kept for backward compatibility, but prefer
        using Pydantic schemas (UserResponse) for API serialization.
        
        """
        return {
            "id": str(self.id),
            "email": self.email,
            "full_name": self.full_name,
            "bio": self.bio,
            "is_active": self.is_active,
            "is_verified": self.is_verified,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
            "last_login": self.last_login.isoformat() if self.last_login else None,
            "display_name": self.display_name,
        } 

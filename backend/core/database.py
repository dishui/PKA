"""
Database configuration and connection management.

This module does database setup with:
- SQLAlchemy 2.0 async support
- Connection pooling
- Proper session management
- Migration support
"""

from typing import AsyncGenerator

import structlog
from sqlalchemy import MetaData, create_engine
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.pool import NullPool

from app.core.config import settings

logger = structlog.get_logger(__name__)

# Create async engine
engine = create_async_engine(
    str(settings.DATABASE_URL),
    echo=settings.DEBUG,
    future=True,
    poolclass=NullPool if settings.DEBUG else None,
    pool_pre_ping=True,
    pool_recycle=300,
)

# Create session factory
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
    autocommit=False,
)

# Create base class for models
metadata = MetaData(
    naming_convention={
        "ix": "ix_%(column_0_label)s",
        "uq": "uq_%(table_name)s_%(column_0_name)s",
        "ck": "ck_%(table_name)s_%(constraint_name)s",
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
        "pk": "pk_%(table_name)s",
    }
)

Base = declarative_base(metadata=metadata)

# Dependency to get database session
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    Database Dependency to get database session for FastAPI.
    Yields: 
        AsyncSession: Database session
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
        except Exception as e:
            logger.error("Database session error", error=str(e))
            await session.rollback()
            raise
        finally:
            await session.close()

async def create_tables() -> None:
    """
    Create all tables in the database.
    This is used for development and testing.
    In production, use Alembic for migrations.
    """
    try: 
        async with engine.begin() as conn:
            # Import all models to make sure they are registered
            from app.models.user import User
            # Add other models here as needed

            await conn.run_sync(Base.metadata.create_all)
            logger.info("Tables created successfully")
    except Exception as e:
        logger.error("Failed to create tables", error=str(e))
        raise

async def drop_tables() -> None:
    """
    Drop all tables in the database.
    This is used for development and testing.
    
    """
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.drop_all)
            logger.info("Tables dropped successfully")
    except Exception as e:
        logger.error("Failed to drop tables", error=str(e))
        raise

async def reset_database() -> None:
    """
    Reset the database by dropping and creating all tables.
    """
    try:
        await drop_tables()
        await create_tables()
        logger.info("Database reset successfully")
    except Exception as e:
        logger.error("Failed to reset database", error=str(e))
        raise
        
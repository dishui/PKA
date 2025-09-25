"""
Configuration management using Pydantic Settings.

This module is for configuration management with:
- Type-safe environment variables
- Validation and default values
- Separate development/production configs
- Security best practices
"""

import secrets
from typing import Any, Dict, List, Optional, Union
from pydantic import Field, validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Application settings class with environment variable support.
    """
    # Pydantic v2 settings configuration
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"  # Allow extra environment variables
    )

    # Base settings
    PROJECT_NAME: str = "Personal Knowledge Assistant"
    VERSION: str = "1.0.0"
    DESCRIPTION: str = "A practical Personal Knowledge Assistant"


    # Database settings
    DATABASE_URL: str = Field(..., description="The database URL")
    DATABASE_URL_TEST: str = Field(..., description="The test database URL")

    # Redis settings
    REDIS_HOST: str = Field(..., description="The Redis host")

    # OpenAI settings
    OPENAI_API_KEY: str = Field(..., description="The OpenAI API key")

    # LangGraph settings
    LANGGRAPH_API_KEY: str = Field(..., description="The LangGraph API key")
    
    @property
    def cors_origins(self) -> List[str]:
        """
        Get the CORS origins as a list.
        """
        return [origin.strip() for origin in self.BACKEND_CORS_ORIGINS.split(",") if origin.strip()]


class DevelopmentSettings(Settings):
    """
    Development settings class.
    """
    DEBUG: bool = True
    LOG_LEVEL: str = "DEBUG"
    

class ProductionSettings(Settings):
    """
    Production settings class.
    """
    DEBUG: bool = False
    LOG_LEVEL: str = "INFO"

    # Stricter security settings, 15 minutes
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15


class TestSettings(Settings):
    """
    Test settings class.
    """
    DEBUG: bool = True
    LOG_LEVEL: str = "DEBUG"

    # Use test database
    DATABASE_URL: str = "postgresql+asyncpg://test:test@localhost:5432/test_pka"
    REDIS_URL: str = "redis://localhost:6379/1"  # Different Redis DB for tests

    # Faster token expiration for testing
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1

    # Smaller limits for testing
    MAX_FILE_SIZE_MB: int = 1
    SEARCH_RESULTS_LIMIT: int = 5



def get_settings() -> "Settings":
        """
        Get the settings instance.
        Returns:
            Settings: The settings instance based on the environment variables.
        """
        import os

        environment = os.getenv("ENVIRONMENT", "development").lower()
        if environment == "production":
            return ProductioinSettings()
        elseif environment == "test":
            return TestSettings()
        else: 
            return DevelopmentSettings()

    # Global settings instance
    settings = get_settings()
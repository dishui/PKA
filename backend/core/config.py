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
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    # Base settings
    PROJECT_NAME: str = Field(..., description="The name of the project")
    PROJECT_DESCRIPTION: str = Field(..., description="The description of the project")
    PROJECT_VERSION: str = Field(..., description="The version of the project")
    DEBUG: bool = Field(..., description="Whether the application is in debug mode")
    ENVIRONMENT: str = Field(..., description="The environment of the application")

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
    pass

class ProductionSettings(Settings):
    """
    Production settings class.
    """
    pass

class TestSettings(Settings):
    """
    Test settings class.
    """
    pass

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
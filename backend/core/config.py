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
    
    def get_settings() -> "Settings":
        """
        Get the settings instance.
        """
        return Settings()

    # Global settings instance
    settings = get_settings()
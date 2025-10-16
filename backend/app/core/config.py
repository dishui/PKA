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
    Application settings with environment variable support.
    
    Demonstrates:
    - Type safety with Pydantic
    - Environment variable validation
    - Secure defaults
    - Documentation for each setting
    """
    
    # Pydantic v2 configuration
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

    # API Configuration
    API_V1_STR: str = "/api/v1"
    DEBUG: bool = Field(default=False, description="Enable debug mode")

    # Security settings
    SECRET_KEY: str = Field(
        default_factory=lambda: secrets.token_urlsafe(32), 
        description="The secret key for the JWT token generation"
    )
    ALGORITHM: str = Field(
        default="HS256",
        description="JWT signing algorithm"
    )
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(
        default=30,
        description="JWT access token expiration in minutes"
    )
    REFRESH_TOKEN_EXPIRE_DAYS: int = Field(
        default=7,
        description="JWT refresh token expiration in days"
    )
    
    # Password Security
    PASSWORD_MIN_LENGTH: int = Field(
        default=8,
        description="Minimum password length"
    )
    PASSWORD_HASH_ROUNDS: int = Field(
        default=12,
        description="Bcrypt hash rounds (higher = more secure, slower)"
    )
    
    # Rate Limiting
    RATE_LIMIT_REQUESTS: int = Field(
        default=100,
        description="Requests per minute per IP"
    )
    RATE_LIMIT_WINDOW: int = Field(
        default=60,
        description="Rate limit window in seconds"
    )
    
    # CORS Configuration - Simplified for now
    BACKEND_CORS_ORIGINS: str = Field(
        default="http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173",
        description="Comma-separated list of allowed CORS origins"
    )
    
    # Public Access Configuration
    PUBLIC_CHAT_ENABLED: bool = Field(
        default=True,
        description="Enable public chat endpoints without authentication"
    )
    ADMIN_PANEL_ENABLED: bool = Field(
        default=True,
        description="Enable admin panel endpoints (requires authentication)"
    )
    
    # Database Configuration
    DATABASE_URL: str = Field(
        default="postgresql+asyncpg://pka_user:pka_password@localhost:5432/pka_db",
        description="PostgreSQL database URL"
    )
    
    # Redis Configuration
    REDIS_URL: str = Field(
        default="redis://localhost:6379/0",
        description="Redis connection URL"
    )
    
    # AI Service Configuration
    LLM_PROVIDER: str = Field(
        default="ollama",
        description="LLM provider: 'openai' or 'ollama'"
    )
    
    # Ollama Configuration
    OLLAMA_BASE_URL: str = Field(
        default="http://localhost:11434",
        description="Ollama server base URL"
    )
    OLLAMA_MODEL: str = Field(
        default="llama3.1:8b",
        description="Ollama model to use for text generation"
    )
    
    # OpenAI Configuration
    OPENAI_API_KEY: str = Field(
        default="",
        description="OpenAI API key (required if LLM_PROVIDER=openai)"
    )
    OPENAI_MODEL: str = Field(
        default="gpt-3.5-turbo",
        description="OpenAI model to use (gpt-3.5-turbo, gpt-4, gpt-4-turbo, etc.)"
    )
    OPENAI_MAX_TOKENS: int = Field(
        default=500,
        description="Maximum tokens for OpenAI completion"
    )
    OPENAI_TEMPERATURE: float = Field(
        default=0.7,
        description="Temperature for OpenAI completion (0.0-2.0)"
    )
    
    # Embedding Configuration
    EMBEDDING_MODEL: str = Field(
        default="sentence-transformers/all-MiniLM-L6-v2",
        description="Sentence transformer model for embeddings"
    )
    EMBEDDING_DIMENSION: int = Field(
        default=384,
        description="Dimension of embedding vectors"
    )
    
    # ChromaDB Configuration
    CHROMA_PERSIST_DIRECTORY: str = Field(
        default="./chroma_db",
        description="ChromaDB persistence directory"
    )
    CHROMA_COLLECTION_NAME: str = Field(
        default="knowledge_base",
        description="ChromaDB collection name"
    )
    
    # File Processing
    MAX_FILE_SIZE_MB: int = Field(
        default=10,
        description="Maximum file size in megabytes"
    )
    ALLOWED_FILE_EXTENSIONS: List[str] = Field(
        default=[".txt", ".pdf", ".docx", ".md", ".json"],
        description="Allowed file extensions for upload"
    )
    CHUNK_SIZE: int = Field(
        default=1000,
        description="Text chunk size for processing"
    )
    CHUNK_OVERLAP: int = Field(
        default=200,
        description="Overlap between text chunks"
    )
    
    # Performance Settings
    MAX_CONCURRENT_UPLOADS: int = Field(
        default=5,
        description="Maximum concurrent file uploads"
    )
    SEARCH_RESULTS_LIMIT: int = Field(
        default=10,
        description="Maximum number of search results to return"
    )
    
    # Logging Configuration
    LOG_LEVEL: str = Field(
        default="INFO",
        description="Logging level"
    )
    
    # Simplified Email Configuration
    EMAILS_FROM_NAME: str = Field(
        default="Personal Knowledge Assistant",
        description="From name for emails"
    )

    # OpenAI settings
    OPENAI_API_KEY: str = Field(
        default="",
        description="The OpenAI API key"
    )

    # LangGraph settings
    LANGGRAPH_API_KEY: str = Field(
        default="",
        description="The LangGraph API key"
    )

    # Authentication
    SECRET_KEY: str = Field(..., description="Secret key for JWT token generation")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # CORS
    CORS_ORIGINS: str = "http://localhost:3000,https://your-app.vercel.app"
    ALLOWED_HOSTS: str = "localhost,127.0.0.1,your-backend.railway.app"

    @property
    def cors_origins(self) -> List[str]:
        """Get CORS origins as a list."""
        return [origin.strip() for origin in self.BACKEND_CORS_ORIGINS.split(",") if origin.strip()]

    @property
    def allowed_hosts_list(self) -> List[str]:
        """Convert ALLOWED_HOSTS string to list"""
        return [host.strip() for host in self.ALLOWED_HOSTS.split(",") if host.strip()]


class DevelopmentSettings(Settings):
    """Development-specific settings."""
    DEBUG: bool = True
    LOG_LEVEL: str = "DEBUG"


class ProductionSettings(Settings):
    """Production-specific settings."""
    DEBUG: bool = False
    LOG_LEVEL: str = "INFO"
    
    # Stricter security for production, 15 minutes
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 1  # Shorter refresh token lifetime
    
    # Stronger password requirements in production
    PASSWORD_MIN_LENGTH: int = 12
    PASSWORD_HASH_ROUNDS: int = 14  # Higher security, slower but acceptable for production
    
    # Stricter rate limiting
    RATE_LIMIT_REQUESTS: int = 60  # Lower request limit
    RATE_LIMIT_WINDOW: int = 60


class TestSettings(Settings):
    """Test-specific settings."""
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


def get_settings() -> Settings:
    """
    Factory function to get settings based on environment.
    
    Returns:
        Settings: Appropriate settings instance based on ENVIRONMENT variable
    """
    import os
    
    environment = os.getenv("ENVIRONMENT", "development").lower()
    
    if environment == "production":
        return ProductionSettings()
    elif environment == "test":
        return TestSettings()
    else:
        return DevelopmentSettings()


# Global settings instance
settings = get_settings() 

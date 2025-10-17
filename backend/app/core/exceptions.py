"""
Custom exception classes for the application.

This module is for error handling with:
- Custom exception hierarchy
- HTTP status code mapping
- Detailed error messages
- Structured error responses
"""

from typing import Any, Dict, Optional


class AppException(Exception):
    """
    Base application exception.
    
    All custom exceptions should inherit from this class.
    """
    
    def __init__(
        self,
        message: str,
        status_code: int = 500,
        details: Optional[Dict[str, Any]] = None,
    ):
        self.message = message
        self.status_code = status_code
        self.details = details or {}
        super().__init__(self.message)
        
class CustomException(Exception):
    """Base custom exception class"""
    
    def __init__(
        self,
        detail: str,
        status_code: int = 500,
        error_code: Optional[str] = None,
        extra_data: Optional[Any] = None
    ):
        self.detail = detail
        self.status_code = status_code
        self.error_code = error_code or "GENERIC_ERROR"
        self.extra_data = extra_data
        super().__init__(detail)

class AuthenticationError(CustomException):
    """Authentication related errors"""
    
    def __init__(self, detail: str = "Authentication failed"):
        super().__init__(
            detail=detail,
            status_code=401,
            error_code="AUTHENTICATION_ERROR"
        )


class AuthorizationError(CustomException):
    """Authorization related errors"""
    
    def __init__(self, detail: str = "Access denied"):
        super().__init__(
            detail=detail,
            status_code=403,
            error_code="AUTHORIZATION_ERROR"
        )

class ValidationError(AppException):
    """Raised when data validation fails."""
    
    def __init__(self, message: str, details: Optional[Dict[str, Any]] = None):
        super().__init__(message, status_code=400, details=details)


class NotFoundError(AppException):
    """Raised when a requested resource is not found."""
    
    def __init__(self, resource: str, identifier: Any = None):
        message = f"{resource} not found"
        if identifier:
            message += f" with identifier: {identifier}"
        super().__init__(message, status_code=404)


class UnauthorizedError(AppException):
    """Raised when authentication fails."""
    
    def __init__(self, message: str = "Authentication required"):
        super().__init__(message, status_code=401)


class ForbiddenError(AppException):
    """Raised when user lacks permission for an action."""
    
    def __init__(self, message: str = "Insufficient permissions"):
        super().__init__(message, status_code=403)


class ConflictError(AppException):
    """Raised when a resource conflict occurs."""
    
    def __init__(self, message: str, details: Optional[Dict[str, Any]] = None):
        super().__init__(message, status_code=409, details=details)


class FileTooLargeError(AppException):
    """Raised when uploaded file exceeds size limit."""
    
    def __init__(self, max_size_mb: int, actual_size_mb: float):
        message = f"File size ({actual_size_mb:.1f}MB) exceeds limit ({max_size_mb}MB)"
        details = {
            "max_size_mb": max_size_mb,
            "actual_size_mb": actual_size_mb,
        }
        super().__init__(message, status_code=413, details=details)


class UnsupportedFileTypeError(AppException):
    """Raised when file type is not supported."""
    
    def __init__(self, file_type: str, supported_types: list):
        message = f"File type '{file_type}' is not supported"
        details = {
            "file_type": file_type,
            "supported_types": supported_types,
        }
        super().__init__(message, status_code=415, details=details)


class AIServiceError(AppException):
    """Raised when AI service encounters an error."""
    
    def __init__(self, message: str, service: str = "AI"):
        details = {"service": service}
        super().__init__(f"{service} service error: {message}", status_code=503, details=details)


class DatabaseError(AppException):
    """Raised when database operation fails."""
    
    def __init__(self, message: str, operation: str = "unknown"):
        details = {"operation": operation}
        super().__init__(f"Database error during {operation}: {message}", status_code=500, details=details)


class RateLimitError(AppException):
    """Raised when rate limit is exceeded."""
    
    def __init__(self, limit: int, window: str = "minute"):
        message = f"Rate limit exceeded: {limit} requests per {window}"
        details = {
            "limit": limit,
            "window": window,
        }
        super().__init__(message, status_code=429, details=details)


class SearchError(AppException):
    """Raised when search operation fails."""
    
    def __init__(self, message: str, query: str = ""):
        details = {"query": query}
        super().__init__(f"Search error: {message}", status_code=500, details=details)


class EmbeddingError(AppException):
    """Raised when embedding generation fails."""
    
    def __init__(self, message: str, model: str = "unknown"):
        details = {"model": model}
        super().__init__(f"Embedding error with model {model}: {message}", status_code=500, details=details) 

class ExternalServiceError(CustomException):
    """External service errors"""
    
    def __init__(self, detail: str = "External service unavailable", service: Optional[str] = None):
        super().__init__(
            detail=detail,
            status_code=503,
            error_code="EXTERNAL_SERVICE_ERROR",
            extra_data={"service": service} if service else None
        ) 
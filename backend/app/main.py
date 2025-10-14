"""
Personal Knowledge Assistant - FastAPI Application

This module serves as the main entry point for the FastAPI application,
demonstrating production-ready setup with proper middleware, error handling,
and API routing.
"""

import time
from contextlib import asynccontextmanager
from typing import AsyncGenerator

import structlog
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
from prometheus_client import Counter, Histogram, generate_latest

from app.api.v1.router import api_router
from app.core.config import settings
from app.core.database import create_tables
from app.core.exceptions import AppException
from app.schemas.common import HealthCheck
from app.services.ai_service import AIService

# Configure structured logging
logger = structlog.get_logger(__name__)

# Prometheus metrics
REQUEST_COUNT = Counter(
    "http_requests_total", "Total HTTP requests", ["method", "endpoint", "status"]
)
REQUEST_DURATION = Histogram(
    "http_request_duration_seconds", "HTTP request duration", ["method", "endpoint"]
)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """
    Application lifespan manager for startup and shutdown events.
    
    Handles:
    - Database table creation
    - AI service initialization
    - Resource cleanup on shutdown
    """
    logger.info("Starting Personal Knowledge Assistant API")
    
    # Startup
    try:
        # Create database tables
        await create_tables()
        logger.info("Database tables created successfully")
        
        # Initialize AI service
        ai_service = AIService()
        await ai_service.initialize()
        logger.info("AI service initialized successfully")
        
        # Store AI service in app state
        app.state.ai_service = ai_service
        
        yield
        
    except Exception as e:
        logger.error("Failed to initialize application", error=str(e))
        raise
    finally:
        # Shutdown
        logger.info("Shutting down Personal Knowledge Assistant API")
        if hasattr(app.state, "ai_service"):
            await app.state.ai_service.cleanup()


def create_application() -> FastAPI:
    """
    Create and configure the FastAPI application.
    
    Returns:
        FastAPI: Configured application instance
    """
    app = FastAPI(
        title=settings.PROJECT_NAME,
        description="A sophisticated Personal Knowledge Assistant demonstrating modern full-stack development",
        version=settings.VERSION,
        openapi_url=f"{settings.API_V1_STR}/openapi.json" if settings.DEBUG else None,
        docs_url="/docs" if settings.DEBUG else None,
        redoc_url="/redoc" if settings.DEBUG else None,
        lifespan=lifespan,
    )
    
    # Configure CORS - Use the simplified configuration
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Add compression middleware
    app.add_middleware(GZipMiddleware, minimum_size=1000)
    
    # Add custom middleware
    app.middleware("http")(add_process_time_header)
    app.middleware("http")(log_requests)
    app.middleware("http")(prometheus_middleware)
    
    # Include API router
    app.include_router(api_router, prefix=settings.API_V1_STR)
    
    # Add exception handlers
    app.add_exception_handler(AppException, app_exception_handler)
    app.add_exception_handler(Exception, global_exception_handler)
    
    # Health check endpoint
    @app.get("/health", response_model=HealthCheck)
    async def health_check():
        """Health check endpoint for monitoring."""
        return HealthCheck(
            status="healthy",
            version=settings.VERSION,
            timestamp=time.time()
        )
    
    # Metrics endpoint
    @app.get("/metrics")
    async def metrics():
        """Prometheus metrics endpoint."""
        return Response(generate_latest(), media_type="text/plain")
    
    return app


async def add_process_time_header(request: Request, call_next):
    """Add processing time header to responses."""
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response


async def log_requests(request: Request, call_next):
    """Log all incoming requests with structured logging."""
    start_time = time.time()
    
    # Extract request info
    client_ip = request.client.host if request.client else "unknown"
    user_agent = request.headers.get("user-agent", "unknown")
    
    logger.info(
        "Request started",
        method=request.method,
        url=str(request.url),
        client_ip=client_ip,
        user_agent=user_agent,
    )
    
    try:
        response = await call_next(request)
        duration = time.time() - start_time
        
        logger.info(
            "Request completed",
            method=request.method,
            url=str(request.url),
            status_code=response.status_code,
            duration=duration,
        )
        
        return response
        
    except Exception as e:
        duration = time.time() - start_time
        logger.error(
            "Request failed",
            method=request.method,
            url=str(request.url),
            error=str(e),
            duration=duration,
        )
        raise


async def prometheus_middleware(request: Request, call_next):
    """Collect Prometheus metrics for all requests."""
    start_time = time.time()
    
    try:
        response = await call_next(request)
        
        # Record metrics
        REQUEST_COUNT.labels(
            method=request.method,
            endpoint=request.url.path,
            status=response.status_code
        ).inc()
        
        REQUEST_DURATION.labels(
            method=request.method,
            endpoint=request.url.path
        ).observe(time.time() - start_time)
        
        return response
        
    except Exception as e:
        REQUEST_COUNT.labels(
            method=request.method,
            endpoint=request.url.path,
            status=500
        ).inc()
        raise


async def app_exception_handler(request: Request, exc: AppException):
    """Handle application-specific exceptions."""
    logger.error(
        "Application exception occurred",
        error=exc.message,
        status_code=exc.status_code,
        url=str(request.url),
    )
    
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.message,
            "type": exc.__class__.__name__,
            "timestamp": time.time(),
        },
    )


async def global_exception_handler(request: Request, exc: Exception):
    """Handle unexpected exceptions."""
    logger.error(
        "Unexpected exception occurred",
        error=str(exc),
        error_type=exc.__class__.__name__,
        url=str(request.url),
    )
    
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "type": "InternalServerError",
            "timestamp": time.time(),
        },
    )


# Create the application instance
app = create_application()

if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG,
        log_level="info",
    ) 

from fastapi import FastAPI
from app.api.router import api_router
from app.core.config import settings

def create_application() -> FastAPI: 
    """
    Create and configurea the FastAPI application.
    Returns: 
        FastAPI: The configured FastAPI application instance.
    """
    app = FastAPI(
        title=settings.PROJECT_NAME,
        description=settings.PROJECT_DESCRIPTION,
        version=settings.PROJECT_VERSION,
        debug=settings.DEBUG,
        lifespan=lifespan,
        docs_url="/docs" if settings.DEBUG else None,
        redoc_url="/redoc" if settings.DEBUG else None,
        openapi_url="/openapi.json" if settings.DEBUG else None,
    )
    app.include_router(api_router)
    return app

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
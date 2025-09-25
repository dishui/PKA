from fastapi import FastAPI
from app.api.router import api_router
from app.core.config import settings

def create_application() -> FastAPI: 
    """
    Create and configurea the FastAPI application.
    Returns: 
        FastAPI: The configured FastAPI application instance.
    """
    app = FastAPI()
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
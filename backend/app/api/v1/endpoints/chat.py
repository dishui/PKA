"""
Chat endpoints for AI conversations.

This module demonstrates:
- AI chat integration with OpenAI/Ollama
- Multi-language support
- Streaming responses (SSE)
- RAG (Retrieval Augmented Generation)
- Public and authenticated endpoints
"""

import uuid
from typing import Optional

import structlog
from fastapi import APIRouter, Request
from sse_starlette.sse import EventSourceResponse

from app.core.config import settings
from app.core.exceptions import AIServiceError, ValidationError
from app.schemas.chat import (
    PublicChatRequest,
    PublicChatResponse,
    StreamChatRequest,
)
from app.services.ai_service import AIService
from app.services.language_service import get_language_service
from app.services.openai_service import get_openai_service

logger = structlog.get_logger(__name__)
router = APIRouter()


@router.post("/public", response_model=PublicChatResponse)
async def public_chat(
    request: PublicChatRequest,
    fastapi_request: Request
) -> PublicChatResponse:
    """
    Public chat endpoint (no authentication required).
    
    Features:
    - Automatic language detection
    - RAG with knowledge base search
    - Multi-turn conversations
    - Supports both OpenAI and Ollama
    """
    if not settings.PUBLIC_CHAT_ENABLED:
        raise ValidationError("Public chat is disabled")
    
    try:
        logger.info(
            "Public chat request received",
            message_preview=request.message[:50],
            conversation_id=request.conversation_id,
            use_rag=request.use_rag
        )
        
        # Initialize services
        language_service = get_language_service()
        ai_service = AIService()
        
        # Ensure AI service is initialized
        if not ai_service.embedding_model:
            await ai_service.initialize()
        
        # Detect language
        detected_lang = request.language or language_service.detect_language(request.message)
        logger.info("Language detected", language=detected_lang)
        
        # Search knowledge base if RAG is enabled
        context = None
        sources = None
        
        if request.use_rag:
            try:
                search_results = await ai_service.search_documents(
                    query=request.message,
                    limit=3
                )
                
                if search_results:
                    # Build context from search results
                    context = "\n\n".join([
                        f"Document {i+1}:\n{result['document']}"
                        for i, result in enumerate(search_results)
                    ])
                    
                    # Prepare sources for response
                    sources = [
                        {
                            "content": result["document"][:200] + "...",
                            "similarity": result["similarity"],
                            "metadata": result.get("metadata", {})
                        }
                        for result in search_results
                    ]
                    
                    logger.info(
                        "RAG context retrieved",
                        result_count=len(search_results)
                    )
            except Exception as e:
                logger.warning("RAG search failed, continuing without context", error=str(e))
        
        # Prepare messages for LLM
        messages = [
            {"role": "user", "content": request.message}
        ]
        
        # Add language-aware system prompt
        messages = language_service.add_language_context(messages, detected_lang)
        
        # Generate response based on LLM provider
        response_text = ""
        token_usage = None
        
        if settings.LLM_PROVIDER == "openai" and settings.OPENAI_API_KEY:
            # Use OpenAI
            openai_service = await get_openai_service()
            response_text = await openai_service.chat_completion(
                messages=messages,
                context=context
            )
            logger.info("Response generated via OpenAI")
            
        else:
            # Use Ollama (fallback)
            response_text = await ai_service.generate_response(
                prompt=request.message,
                context=context
            )
            logger.info("Response generated via Ollama")
        
        # Generate or use existing conversation ID
        conversation_id = request.conversation_id or str(uuid.uuid4())
        
        return PublicChatResponse(
            response=response_text,
            conversation_id=conversation_id,
            detected_language=detected_lang,
            sources=sources,
            token_usage=token_usage
        )
        
    except AIServiceError as e:
        logger.error("AI service error in public chat", error=str(e))
        raise
    except Exception as e:
        logger.error("Unexpected error in public chat", error=str(e))
        raise AIServiceError(f"Chat failed: {str(e)}")


@router.post("/stream")
async def stream_chat(request: StreamChatRequest) -> EventSourceResponse:
    """
    Streaming chat endpoint using Server-Sent Events (SSE).
    
    Features:
    - Real-time streaming responses
    - Automatic language detection
    - RAG support
    - Works with OpenAI streaming API
    """
    if not settings.PUBLIC_CHAT_ENABLED:
        raise ValidationError("Public chat is disabled")
    
    async def event_generator():
        try:
            logger.info(
                "Streaming chat request received",
                message_preview=request.message[:50]
            )
            
            # Initialize services
            language_service = get_language_service()
            ai_service = AIService()
            
            # Ensure AI service is initialized
            if not ai_service.embedding_model:
                await ai_service.initialize()
            
            # Detect language
            detected_lang = request.language or language_service.detect_language(request.message)
            
            # Send language detection event
            yield {
                "event": "language",
                "data": detected_lang
            }
            
            # Search knowledge base if RAG is enabled
            context = None
            if request.use_rag:
                try:
                    search_results = await ai_service.search_documents(
                        query=request.message,
                        limit=3
                    )
                    
                    if search_results:
                        context = "\n\n".join([
                            f"Document {i+1}:\n{result['document']}"
                            for i, result in enumerate(search_results)
                        ])
                        
                        # Send sources event
                        yield {
                            "event": "sources",
                            "data": str(len(search_results))
                        }
                except Exception as e:
                    logger.warning("RAG search failed in streaming", error=str(e))
            
            # Prepare messages
            messages = [
                {"role": "user", "content": request.message}
            ]
            messages = language_service.add_language_context(messages, detected_lang)
            
            # Stream response
            if settings.LLM_PROVIDER == "openai" and settings.OPENAI_API_KEY:
                # Stream from OpenAI
                openai_service = await get_openai_service()
                
                async for chunk in openai_service.chat_completion_stream(
                    messages=messages,
                    context=context,
                    temperature=request.temperature
                ):
                    yield {
                        "event": "message",
                        "data": chunk
                    }
            else:
                # Fallback: Generate full response and send it
                # (Ollama streaming would require additional implementation)
                response = await ai_service.generate_response(
                    prompt=request.message,
                    context=context
                )
                
                # Simulate streaming by sending words
                words = response.split()
                for i, word in enumerate(words):
                    yield {
                        "event": "message",
                        "data": word + (" " if i < len(words) - 1 else "")
                    }
            
            # Send completion event
            yield {
                "event": "done",
                "data": "complete"
            }
            
            logger.info("Streaming chat completed")
            
        except Exception as e:
            logger.error("Error in streaming chat", error=str(e))
            yield {
                "event": "error",
                "data": str(e)
            }
    
    return EventSourceResponse(event_generator())


@router.get("/history")
async def get_chat_history():
    """
    Get chat conversation history (placeholder).
    
    In production, this would:
    - Retrieve conversations from database
    - Support pagination
    - Filter by user/conversation
    """
    return {
        "conversations": [],
        "message": "Chat history endpoint - coming soon"
    } 

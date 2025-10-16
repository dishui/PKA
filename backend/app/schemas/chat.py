"""
Pydantic schemas for chat-related API endpoints.

This module defines the request and response models for:
- Public chat (no auth required)
- Authenticated chat
- Streaming chat
- Chat history
"""

from datetime import datetime
from typing import List, Optional
from uuid import UUID

from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    """Single chat message."""
    role: str = Field(..., description="Message role: 'user', 'assistant', or 'system'")
    content: str = Field(..., description="Message content")
    timestamp: Optional[datetime] = Field(default=None, description="Message timestamp")


class PublicChatRequest(BaseModel):
    """Request schema for public chat (no authentication required)."""
    message: str = Field(..., min_length=1, max_length=4000, description="User message")
    conversation_id: Optional[str] = Field(
        default=None,
        description="Optional conversation ID for multi-turn conversations"
    )
    language: Optional[str] = Field(
        default=None,
        description="Optional language code (auto-detected if not provided)"
    )
    use_rag: bool = Field(
        default=True,
        description="Whether to use RAG (knowledge base search)"
    )


class PublicChatResponse(BaseModel):
    """Response schema for public chat."""
    response: str = Field(..., description="Assistant's response")
    conversation_id: str = Field(..., description="Conversation ID for follow-ups")
    detected_language: str = Field(..., description="Detected or specified language")
    sources: Optional[List[dict]] = Field(
        default=None,
        description="Source documents used for RAG (if applicable)"
    )
    token_usage: Optional[dict] = Field(
        default=None,
        description="Token usage information (if available)"
    )


class ChatHistoryMessage(BaseModel):
    """Message in chat history."""
    id: UUID = Field(..., description="Message ID")
    role: str = Field(..., description="Message role")
    content: str = Field(..., description="Message content")
    timestamp: datetime = Field(..., description="Message timestamp")
    language: Optional[str] = Field(default=None, description="Message language")


class ChatHistoryResponse(BaseModel):
    """Response schema for chat history."""
    conversation_id: str = Field(..., description="Conversation ID")
    messages: List[ChatHistoryMessage] = Field(..., description="List of messages")
    total_messages: int = Field(..., description="Total number of messages")
    created_at: datetime = Field(..., description="Conversation start time")
    updated_at: datetime = Field(..., description="Last message time")


class StreamChatRequest(BaseModel):
    """Request schema for streaming chat."""
    message: str = Field(..., min_length=1, max_length=4000, description="User message")
    conversation_id: Optional[str] = Field(
        default=None,
        description="Optional conversation ID for multi-turn conversations"
    )
    language: Optional[str] = Field(
        default=None,
        description="Optional language code (auto-detected if not provided)"
    )
    use_rag: bool = Field(
        default=True,
        description="Whether to use RAG (knowledge base search)"
    )
    temperature: Optional[float] = Field(
        default=None,
        ge=0.0,
        le=2.0,
        description="Sampling temperature (0.0-2.0)"
    )


class FeedbackRequest(BaseModel):
    """Request schema for chat feedback."""
    conversation_id: str = Field(..., description="Conversation ID")
    message_id: Optional[UUID] = Field(default=None, description="Specific message ID")
    rating: int = Field(..., ge=1, le=5, description="Rating (1-5)")
    comment: Optional[str] = Field(
        default=None,
        max_length=1000,
        description="Optional feedback comment"
    )


class FeedbackResponse(BaseModel):
    """Response schema for feedback submission."""
    success: bool = Field(..., description="Whether feedback was recorded")
    message: str = Field(..., description="Confirmation message")


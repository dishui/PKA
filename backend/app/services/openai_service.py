"""
OpenAI integration service for GPT-based chat completions.

This module provides:
- OpenAI GPT chat completions
- Streaming support for real-time responses
- Token counting and cost estimation
- Error handling and fallbacks
"""

from typing import AsyncGenerator, Dict, List, Optional
import structlog
from openai import AsyncOpenAI, OpenAIError
import tiktoken

from app.core.config import settings
from app.core.exceptions import AIServiceError

logger = structlog.get_logger(__name__)


class OpenAIService:
    """
    Service for OpenAI GPT integration.
    
    Features:
    - Chat completions with GPT models
    - Streaming responses
    - Token counting
    - Cost estimation
    - RAG support (context injection)
    """
    
    def __init__(self):
        """Initialize OpenAI service."""
        self.client: Optional[AsyncOpenAI] = None
        self.encoding = None
        self._initialized = False
    
    async def initialize(self) -> None:
        """
        Initialize the OpenAI client.
        
        Raises:
            AIServiceError: If initialization fails
        """
        if self._initialized:
            logger.info("OpenAI service already initialized")
            return
        
        try:
            if not settings.OPENAI_API_KEY:
                logger.warning("OpenAI API key not provided, service disabled")
                return
            
            logger.info("Initializing OpenAI service", model=settings.OPENAI_MODEL)
            
            # Initialize OpenAI client
            self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
            
            # Initialize tokenizer for the model
            try:
                self.encoding = tiktoken.encoding_for_model(settings.OPENAI_MODEL)
            except KeyError:
                # Fallback to cl100k_base for newer models
                self.encoding = tiktoken.get_encoding("cl100k_base")
            
            # Test connection
            await self._test_connection()
            
            self._initialized = True
            logger.info("OpenAI service initialized successfully")
            
        except Exception as e:
            logger.error("Failed to initialize OpenAI service", error=str(e))
            raise AIServiceError(f"OpenAI initialization failed: {str(e)}")
    
    async def _test_connection(self) -> None:
        """Test the OpenAI API connection."""
        try:
            if not self.client:
                return
            
            # Make a minimal API call to test connection
            response = await self.client.chat.completions.create(
                model=settings.OPENAI_MODEL,
                messages=[{"role": "user", "content": "test"}],
                max_tokens=5
            )
            
            logger.info("OpenAI connection test successful")
            
        except OpenAIError as e:
            logger.warning("OpenAI connection test failed", error=str(e))
            raise AIServiceError(f"OpenAI connection test failed: {str(e)}")
    
    def count_tokens(self, messages: List[Dict[str, str]]) -> int:
        """
        Count tokens in a list of messages.
        
        Args:
            messages: List of message dictionaries
            
        Returns:
            Total token count
        """
        if not self.encoding:
            # Rough estimate if tokenizer not available
            return sum(len(msg.get('content', '').split()) for msg in messages) * 1.3
        
        try:
            num_tokens = 0
            for message in messages:
                # Every message follows <|start|>{role/name}\n{content}<|end|>\n
                num_tokens += 4
                for key, value in message.items():
                    num_tokens += len(self.encoding.encode(str(value)))
                    if key == "name":
                        num_tokens += -1  # Role is always 1 token
            num_tokens += 2  # Every reply is primed with <|start|>assistant
            return num_tokens
            
        except Exception as e:
            logger.warning("Token counting failed, using estimate", error=str(e))
            return sum(len(msg.get('content', '').split()) for msg in messages) * 1.3
    
    async def chat_completion(
        self,
        messages: List[Dict[str, str]],
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None,
        context: Optional[str] = None
    ) -> str:
        """
        Generate a chat completion using OpenAI.
        
        Args:
            messages: List of message dictionaries with 'role' and 'content'
            temperature: Sampling temperature (0.0 to 2.0)
            max_tokens: Maximum tokens to generate
            context: Optional RAG context to inject
            
        Returns:
            Generated response text
            
        Raises:
            AIServiceError: If completion fails
        """
        if not self.client:
            raise AIServiceError("OpenAI client not initialized")
        
        try:
            # Add context to messages if provided
            if context:
                messages = self._add_context_to_messages(messages, context)
            
            # Use config defaults if not specified
            temperature = temperature or settings.OPENAI_TEMPERATURE
            max_tokens = max_tokens or settings.OPENAI_MAX_TOKENS
            
            logger.debug(
                "Generating chat completion",
                model=settings.OPENAI_MODEL,
                message_count=len(messages),
                max_tokens=max_tokens
            )
            
            # Count input tokens
            input_tokens = self.count_tokens(messages)
            
            # Generate completion
            response = await self.client.chat.completions.create(
                model=settings.OPENAI_MODEL,
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens,
                stream=False
            )
            
            # Extract response
            completion_text = response.choices[0].message.content or ""
            
            # Log usage
            if response.usage:
                logger.info(
                    "Chat completion successful",
                    prompt_tokens=response.usage.prompt_tokens,
                    completion_tokens=response.usage.completion_tokens,
                    total_tokens=response.usage.total_tokens,
                    estimated_cost_usd=self._estimate_cost(response.usage.total_tokens)
                )
            
            return completion_text
            
        except OpenAIError as e:
            logger.error("OpenAI API error", error=str(e), error_type=type(e).__name__)
            raise AIServiceError(f"OpenAI completion failed: {str(e)}")
        except Exception as e:
            logger.error("Unexpected error in chat completion", error=str(e))
            raise AIServiceError(f"Chat completion failed: {str(e)}")
    
    async def chat_completion_stream(
        self,
        messages: List[Dict[str, str]],
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None,
        context: Optional[str] = None
    ) -> AsyncGenerator[str, None]:
        """
        Generate a streaming chat completion using OpenAI.
        
        Args:
            messages: List of message dictionaries with 'role' and 'content'
            temperature: Sampling temperature (0.0 to 2.0)
            max_tokens: Maximum tokens to generate
            context: Optional RAG context to inject
            
        Yields:
            Response chunks as they arrive
            
        Raises:
            AIServiceError: If streaming fails
        """
        if not self.client:
            raise AIServiceError("OpenAI client not initialized")
        
        try:
            # Add context to messages if provided
            if context:
                messages = self._add_context_to_messages(messages, context)
            
            # Use config defaults if not specified
            temperature = temperature or settings.OPENAI_TEMPERATURE
            max_tokens = max_tokens or settings.OPENAI_MAX_TOKENS
            
            logger.debug(
                "Starting streaming chat completion",
                model=settings.OPENAI_MODEL,
                message_count=len(messages)
            )
            
            # Generate streaming completion
            stream = await self.client.chat.completions.create(
                model=settings.OPENAI_MODEL,
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens,
                stream=True
            )
            
            # Stream chunks
            async for chunk in stream:
                if chunk.choices[0].delta.content:
                    yield chunk.choices[0].delta.content
            
            logger.debug("Streaming completion finished")
            
        except OpenAIError as e:
            logger.error("OpenAI streaming error", error=str(e))
            raise AIServiceError(f"OpenAI streaming failed: {str(e)}")
        except Exception as e:
            logger.error("Unexpected error in streaming", error=str(e))
            raise AIServiceError(f"Streaming failed: {str(e)}")
    
    def _add_context_to_messages(
        self,
        messages: List[Dict[str, str]],
        context: str
    ) -> List[Dict[str, str]]:
        """
        Add RAG context to messages.
        
        Args:
            messages: Original messages
            context: Context to inject
            
        Returns:
            Messages with context added
        """
        # Find the last user message
        modified_messages = messages.copy()
        
        for i in range(len(modified_messages) - 1, -1, -1):
            if modified_messages[i]['role'] == 'user':
                # Inject context before the user's question
                original_content = modified_messages[i]['content']
                modified_messages[i]['content'] = f"""Context from knowledge base:
{context}

User question: {original_content}"""
                break
        
        return modified_messages
    
    def _estimate_cost(self, total_tokens: int) -> float:
        """
        Estimate cost in USD for token usage.
        
        Args:
            total_tokens: Total tokens used
            
        Returns:
            Estimated cost in USD
        """
        # Cost per 1K tokens (as of 2024)
        costs = {
            'gpt-3.5-turbo': 0.0015,
            'gpt-3.5-turbo-16k': 0.003,
            'gpt-4': 0.03,
            'gpt-4-32k': 0.06,
            'gpt-4-turbo': 0.01,
            'gpt-4o': 0.005,
            'gpt-4o-mini': 0.00015,
        }
        
        # Get cost per 1K tokens for current model
        cost_per_1k = costs.get(settings.OPENAI_MODEL, 0.0015)
        
        # Calculate total cost
        return (total_tokens / 1000) * cost_per_1k
    
    async def cleanup(self) -> None:
        """Clean up resources."""
        logger.info("Cleaning up OpenAI service")
        
        if self.client:
            await self.client.close()
            self.client = None
        
        self._initialized = False
        logger.info("OpenAI service cleanup completed")


# Global instance
_openai_service: Optional[OpenAIService] = None


async def get_openai_service() -> OpenAIService:
    """
    Get the global OpenAI service instance.
    
    Returns:
        OpenAIService instance
    """
    global _openai_service
    
    if _openai_service is None:
        _openai_service = OpenAIService()
        await _openai_service.initialize()
    
    return _openai_service


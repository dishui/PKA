"""
AI Service for embeddings, vector search, and LLM integration.

This module demonstrates:
- Professional AI service architecture
- ChromaDB integration for vector search
- Ollama integration for local LLM
- Proper error handling and logging
- Async/await patterns for performance
"""

import asyncio
import hashlib
import json
from typing import Any, Dict, List, Optional

import chromadb
import httpx
import structlog
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer

from app.core.config import settings
from app.core.exceptions import AIServiceError, EmbeddingError, SearchError

logger = structlog.get_logger(__name__)


class AIService:
    """
    AI Service for handling embeddings, vector search, and LLM operations.
    
    This class demonstrates:
    - Singleton pattern for resource management
    - Async operations for performance
    - Proper error handling
    - Resource cleanup
    """
    
    _instance: Optional["AIService"] = None
    _initialized: bool = False
    
    def __new__(cls) -> "AIService":
        """Implement singleton pattern."""
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
    
    def __init__(self):
        """Initialize AI service components."""
        if not self._initialized:
            self.embedding_model: Optional[SentenceTransformer] = None
            self.chroma_client: Optional[chromadb.Client] = None
            self.collection: Optional[chromadb.Collection] = None
            self.http_client: Optional[httpx.AsyncClient] = None
            self._lock = asyncio.Lock()
            AIService._initialized = True
    
    async def initialize(self) -> None:
        """
        Initialize all AI service components.
        
        Raises:
            AIServiceError: If initialization fails
        """
        async with self._lock:
            if self.embedding_model is not None:
                logger.info("AI service already initialized")
                return
            
            try:
                logger.info("Initializing AI service components")
                
                # Initialize embedding model
                await self._initialize_embedding_model()
                
                # Initialize ChromaDB
                await self._initialize_chroma()
                
                # Initialize HTTP client for Ollama
                await self._initialize_http_client()
                
                # Test Ollama connection (optional)
                await self._test_ollama_connection()
                
                logger.info("AI service initialized successfully")
                
            except Exception as e:
                logger.error("Failed to initialize AI service", error=str(e))
                await self.cleanup()
                raise AIServiceError(f"Initialization failed: {str(e)}")
    
    async def _initialize_embedding_model(self) -> None:
        """Initialize the sentence transformer model."""
        try:
            logger.info("Loading embedding model", model=settings.EMBEDDING_MODEL)
            
            # Run in thread pool to avoid blocking
            loop = asyncio.get_event_loop()
            self.embedding_model = await loop.run_in_executor(
                None,
                lambda: SentenceTransformer(settings.EMBEDDING_MODEL)
            )
            
            logger.info("Embedding model loaded successfully")
            
        except Exception as e:
            raise EmbeddingError(f"Failed to load embedding model: {str(e)}", settings.EMBEDDING_MODEL)
    
    async def _initialize_chroma(self) -> None:
        """Initialize ChromaDB client and collection."""
        try:
            logger.info("Initializing ChromaDB", directory=settings.CHROMA_PERSIST_DIRECTORY)
            
            # Create ChromaDB client
            self.chroma_client = chromadb.PersistentClient(
                path=settings.CHROMA_PERSIST_DIRECTORY,
                settings=Settings(anonymized_telemetry=False)
            )
            
            # Get or create collection
            self.collection = self.chroma_client.get_or_create_collection(
                name=settings.CHROMA_COLLECTION_NAME,
                metadata={"description": "Personal Knowledge Assistant documents"}
            )
            
            logger.info("ChromaDB initialized successfully", 
                       collection_count=self.collection.count())
            
        except Exception as e:
            raise AIServiceError(f"Failed to initialize ChromaDB: {str(e)}")
    
    async def _initialize_http_client(self) -> None:
        """Initialize HTTP client for Ollama API calls."""
        self.http_client = httpx.AsyncClient(
            base_url=settings.OLLAMA_BASE_URL,
            timeout=30.0,
            headers={"Content-Type": "application/json"}
        )
    
    async def _test_ollama_connection(self) -> None:
        """Test connection to Ollama server."""
        try:
            if not self.http_client:
                raise AIServiceError("HTTP client not initialized")
            
            response = await self.http_client.get("/api/tags")
            
            if response.status_code == 200:
                models = response.json().get("models", [])
                logger.info("Ollama connection successful", 
                           available_models=[m["name"] for m in models])
            else:
                raise AIServiceError(f"Ollama server returned status {response.status_code}")
                
        except httpx.ConnectError:
            logger.warning("Ollama server not available - continuing without LLM support")
        except Exception as e:
            logger.warning("Ollama connection test failed", error=str(e))
    
    async def generate_embeddings(self, texts: List[str]) -> List[List[float]]:
        """
        Generate embeddings for a list of texts.
        
        Args:
            texts: List of texts to embed
            
        Returns:
            List of embedding vectors
            
        Raises:
            EmbeddingError: If embedding generation fails
        """
        if not self.embedding_model:
            raise EmbeddingError("Embedding model not initialized")
        
        try:
            logger.debug("Generating embeddings", text_count=len(texts))
            
            # Run embedding generation in thread pool
            loop = asyncio.get_event_loop()
            embeddings = await loop.run_in_executor(
                None,
                lambda: self.embedding_model.encode(texts, convert_to_numpy=True).tolist()
            )
            
            logger.debug("Embeddings generated successfully", 
                        embedding_count=len(embeddings),
                        embedding_dimension=len(embeddings[0]) if embeddings else 0)
            
            return embeddings
            
        except Exception as e:
            logger.error("Failed to generate embeddings", error=str(e))
            raise EmbeddingError(f"Embedding generation failed: {str(e)}")
    
    async def add_documents(
        self,
        documents: List[str],
        metadatas: List[Dict[str, Any]],
        ids: Optional[List[str]] = None
    ) -> None:
        """
        Add documents to the vector store.
        
        Args:
            documents: List of document texts
            metadatas: List of metadata dictionaries
            ids: Optional list of document IDs
            
        Raises:
            AIServiceError: If adding documents fails
        """
        if not self.collection:
            raise AIServiceError("ChromaDB collection not initialized")
        
        try:
            # Generate IDs if not provided
            if ids is None:
                ids = [self._generate_doc_id(doc, meta) for doc, meta in zip(documents, metadatas)]
            
            logger.info("Adding documents to vector store", document_count=len(documents))
            
            # Generate embeddings
            embeddings = await self.generate_embeddings(documents)
            
            # Add to ChromaDB
            self.collection.add(
                documents=documents,
                metadatas=metadatas,
                ids=ids,
                embeddings=embeddings
            )
            
            logger.info("Documents added successfully", 
                       document_count=len(documents),
                       total_documents=self.collection.count())
            
        except Exception as e:
            logger.error("Failed to add documents", error=str(e))
            raise AIServiceError(f"Failed to add documents: {str(e)}")
    
    async def search_documents(
        self,
        query: str,
        limit: int = 10,
        filter_metadata: Optional[Dict[str, Any]] = None
    ) -> List[Dict[str, Any]]:
        """
        Search for similar documents using vector similarity.
        
        Args:
            query: Search query text
            limit: Maximum number of results to return
            filter_metadata: Optional metadata filters
            
        Returns:
            List of search results with documents and metadata
            
        Raises:
            SearchError: If search fails
        """
        if not self.collection:
            raise SearchError("ChromaDB collection not initialized")
        
        try:
            logger.debug("Searching documents", query=query, limit=limit)
            
            # Generate query embedding
            query_embeddings = await self.generate_embeddings([query])
            
            # Search in ChromaDB
            results = self.collection.query(
                query_embeddings=query_embeddings,
                n_results=limit,
                where=filter_metadata,
                include=["documents", "metadatas", "distances"]
            )
            
            # Format results
            formatted_results = []
            if results["documents"] and results["documents"][0]:
                for i, doc in enumerate(results["documents"][0]):
                    formatted_results.append({
                        "document": doc,
                        "metadata": results["metadatas"][0][i] if results["metadatas"] else {},
                        "similarity": 1 - results["distances"][0][i] if results["distances"] else 0.0,
                        "distance": results["distances"][0][i] if results["distances"] else 1.0,
                    })
            
            logger.debug("Search completed", 
                        query=query,
                        result_count=len(formatted_results))
            
            return formatted_results
            
        except Exception as e:
            logger.error("Document search failed", error=str(e), query=query)
            raise SearchError(f"Search failed: {str(e)}", query)
    
    async def generate_response(
        self,
        prompt: str,
        context: Optional[str] = None,
        max_tokens: int = 500
    ) -> str:
        """
        Generate response using Ollama LLM.
        
        Args:
            prompt: The prompt for generation
            context: Optional context to include
            max_tokens: Maximum tokens to generate
            
        Returns:
            Generated response text
            
        Raises:
            AIServiceError: If generation fails
        """
        if not self.http_client:
            return self._generate_fallback_response(prompt, context)
        
        try:
            # Build the full prompt
            full_prompt = self._build_prompt(prompt, context)
            
            logger.debug("Generating LLM response", prompt_length=len(full_prompt))
            
            # Call Ollama API
            payload = {
                "model": settings.OLLAMA_MODEL,
                "prompt": full_prompt,
                "stream": False,
                "options": {
                    "num_predict": max_tokens,
                    "temperature": 0.7,
                }
            }
            
            response = await self.http_client.post("/api/generate", json=payload)
            
            if response.status_code != 200:
                logger.warning(f"Ollama API returned status {response.status_code}")
                return self._generate_fallback_response(prompt, context)
            
            result = response.json()
            generated_text = result.get("response", "").strip()
            
            logger.debug("LLM response generated successfully", 
                        response_length=len(generated_text))
            
            return generated_text or self._generate_fallback_response(prompt, context)
            
        except httpx.ConnectError:
            logger.warning("Ollama server not available, using fallback")
            return self._generate_fallback_response(prompt, context)
        except Exception as e:
            logger.warning("Failed to generate LLM response", error=str(e))
            return self._generate_fallback_response(prompt, context)
    
    def _build_prompt(self, prompt: str, context: Optional[str] = None) -> str:
        """Build a well-formatted prompt with context."""
        if context:
            return f"""Context Information:
{context}

Question: {prompt}

Please provide a helpful answer based on the context above. If the context doesn't contain relevant information, please say so.

Answer:"""
        else:
            return f"Question: {prompt}\n\nAnswer:"
    
    def _generate_fallback_response(self, prompt: str, context: Optional[str] = None) -> str:
        """Generate a fallback response when LLM is not available."""
        if context:
            # Simple keyword matching for demonstration
            query_words = set(prompt.lower().split())
            context_words = set(context.lower().split())
            common_words = query_words.intersection(context_words)
            
            if common_words:
                return f"Based on the available information, I found relevant content related to: {', '.join(common_words)}. However, the AI service is currently unavailable for detailed analysis. Please refer to the search results above for more information."
            else:
                return "I found some potentially relevant information in your documents, but the AI service is currently unavailable for detailed analysis. Please review the search results above."
        else:
            return "I apologize, but the AI service is currently unavailable. Please try again later or contact support if the issue persists."
    
    async def delete_documents(self, ids: List[str]) -> None:
        """
        Delete documents from the vector store.
        
        Args:
            ids: List of document IDs to delete
            
        Raises:
            AIServiceError: If deletion fails
        """
        if not self.collection:
            raise AIServiceError("ChromaDB collection not initialized")
        
        try:
            logger.info("Deleting documents", document_ids=ids)
            
            self.collection.delete(ids=ids)
            
            logger.info("Documents deleted successfully", 
                       deleted_count=len(ids),
                       total_documents=self.collection.count())
            
        except Exception as e:
            logger.error("Failed to delete documents", error=str(e))
            raise AIServiceError(f"Failed to delete documents: {str(e)}")
    
    def _generate_doc_id(self, document: str, metadata: Dict[str, Any]) -> str:
        """Generate a unique ID for a document based on content and metadata."""
        content = f"{document}{json.dumps(metadata, sort_keys=True)}"
        return hashlib.sha256(content.encode()).hexdigest()[:16]
    
    async def get_collection_stats(self) -> Dict[str, Any]:
        """
        Get statistics about the document collection.
        
        Returns:
            Dictionary with collection statistics
        """
        if not self.collection:
            return {"error": "Collection not initialized"}
        
        try:
            count = self.collection.count()
            
            return {
                "total_documents": count,
                "collection_name": settings.CHROMA_COLLECTION_NAME,
                "embedding_model": settings.EMBEDDING_MODEL,
                "embedding_dimension": settings.EMBEDDING_DIMENSION,
            }
            
        except Exception as e:
            logger.error("Failed to get collection stats", error=str(e))
            return {"error": str(e)}
    
    async def cleanup(self) -> None:
        """Clean up resources."""
        logger.info("Cleaning up AI service resources")
        
        if self.http_client:
            await self.http_client.aclose()
            self.http_client = None
        
        # ChromaDB client doesn't need explicit cleanup
        self.chroma_client = None
        self.collection = None
        self.embedding_model = None
        
        logger.info("AI service cleanup completed") 
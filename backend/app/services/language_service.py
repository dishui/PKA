"""
Language detection and multi-language support service.

This module provides:
- Automatic language detection from user input
- Language-specific system prompts
- Response formatting based on detected language
"""

from typing import Dict, Optional
import structlog
from langdetect import detect, DetectorFactory
from langdetect.lang_detect_exception import LangDetectException

# Set seed for consistent results
DetectorFactory.seed = 0

logger = structlog.get_logger(__name__)


class LanguageService:
    """
    Service for handling multi-language support in the chatbot.
    
    Features:
    - Automatic language detection
    - Language-specific system prompts
    - Supported languages: English, Spanish, and more
    """
    
    # Language codes and full names
    SUPPORTED_LANGUAGES = {
        'en': 'English',
        'es': 'Spanish',
        'fr': 'French',
        'de': 'German',
        'it': 'Italian',
        'pt': 'Portuguese',
        'ru': 'Russian',
        'zh-cn': 'Chinese (Simplified)',
        'ja': 'Japanese',
        'ko': 'Korean',
        'ar': 'Arabic',
    }
    
    # Default system prompts by language
    SYSTEM_PROMPTS = {
        'en': """You are a helpful and professional AI assistant. 
You provide clear, concise, and accurate answers based on the available knowledge base.
Always respond in English unless explicitly asked otherwise.
If you don't have enough information, say so clearly.""",
        
        'es': """Eres un asistente de IA profesional y útil.
Proporcionas respuestas claras, concisas y precisas basadas en la base de conocimientos disponible.
Siempre responde en español a menos que se te pida explícitamente lo contrario.
Si no tienes suficiente información, dilo claramente.""",
        
        'fr': """Vous êtes un assistant IA professionnel et utile.
Vous fournissez des réponses claires, concises et précises basées sur la base de connaissances disponible.
Répondez toujours en français sauf demande contraire explicite.
Si vous n'avez pas assez d'informations, dites-le clairement.""",
        
        'de': """Sie sind ein hilfreicher und professioneller KI-Assistent.
Sie geben klare, präzise und genaue Antworten basierend auf der verfügbaren Wissensdatenbank.
Antworten Sie immer auf Deutsch, es sei denn, es wird ausdrücklich anders verlangt.
Wenn Sie nicht genügend Informationen haben, sagen Sie dies klar.""",
    }
    
    def __init__(self):
        """Initialize the language service."""
        self.default_language = 'en'
    
    def detect_language(self, text: str) -> str:
        """
        Detect the language of the given text.
        
        Args:
            text: Text to analyze
            
        Returns:
            Language code (e.g., 'en', 'es', 'fr')
        """
        if not text or len(text.strip()) < 3:
            logger.warning("Text too short for language detection, using default")
            return self.default_language
        
        try:
            # Clean the text
            clean_text = text.strip()
            
            # Detect language
            detected_lang = detect(clean_text)
            
            # Normalize language codes
            if detected_lang == 'zh-cn' or detected_lang == 'zh-tw':
                detected_lang = 'zh-cn'
            
            logger.debug(
                "Language detected",
                detected_language=detected_lang,
                text_preview=clean_text[:50]
            )
            
            return detected_lang
            
        except LangDetectException as e:
            logger.warning(
                "Language detection failed, using default",
                error=str(e),
                text_preview=text[:50]
            )
            return self.default_language
        except Exception as e:
            logger.error(
                "Unexpected error in language detection",
                error=str(e),
                error_type=type(e).__name__
            )
            return self.default_language
    
    def get_system_prompt(self, language: str, custom_prompt: Optional[str] = None) -> str:
        """
        Get the system prompt for a specific language.
        
        Args:
            language: Language code
            custom_prompt: Optional custom prompt to override defaults
            
        Returns:
            System prompt in the appropriate language
        """
        if custom_prompt:
            return custom_prompt
        
        # Return language-specific prompt or default to English
        prompt = self.SYSTEM_PROMPTS.get(language, self.SYSTEM_PROMPTS['en'])
        
        logger.debug("Retrieved system prompt", language=language)
        
        return prompt
    
    def get_language_name(self, language_code: str) -> str:
        """
        Get the full name of a language from its code.
        
        Args:
            language_code: Language code (e.g., 'en', 'es')
            
        Returns:
            Full language name (e.g., 'English', 'Spanish')
        """
        return self.SUPPORTED_LANGUAGES.get(language_code, 'Unknown')
    
    def is_supported(self, language_code: str) -> bool:
        """
        Check if a language is explicitly supported with custom prompts.
        
        Args:
            language_code: Language code to check
            
        Returns:
            True if language has a custom prompt, False otherwise
        """
        return language_code in self.SYSTEM_PROMPTS
    
    def format_response_instruction(self, language: str) -> str:
        """
        Get instruction to respond in a specific language.
        
        Args:
            language: Language code
            
        Returns:
            Instruction string to append to prompts
        """
        language_names = {
            'en': 'English',
            'es': 'Spanish (Español)',
            'fr': 'French (Français)',
            'de': 'German (Deutsch)',
            'it': 'Italian (Italiano)',
            'pt': 'Portuguese (Português)',
            'ru': 'Russian (Русский)',
            'zh-cn': 'Chinese (中文)',
            'ja': 'Japanese (日本語)',
            'ko': 'Korean (한국어)',
            'ar': 'Arabic (العربية)',
        }
        
        lang_name = language_names.get(language, 'English')
        
        return f"\n\nIMPORTANT: Please respond in {lang_name}."
    
    def add_language_context(
        self,
        messages: list,
        detected_language: str,
        custom_system_prompt: Optional[str] = None
    ) -> list:
        """
        Add language-aware system prompt to message history.
        
        Args:
            messages: List of message dictionaries
            detected_language: Detected language code
            custom_system_prompt: Optional custom system prompt
            
        Returns:
            Messages with language-aware system prompt
        """
        # Get appropriate system prompt
        system_prompt = self.get_system_prompt(detected_language, custom_system_prompt)
        
        # Add language instruction if not using a custom prompt
        if not custom_system_prompt and detected_language != 'en':
            system_prompt += self.format_response_instruction(detected_language)
        
        # Prepend system message if not already present
        if not messages or messages[0].get('role') != 'system':
            messages = [{'role': 'system', 'content': system_prompt}] + messages
        else:
            # Update existing system message
            messages[0]['content'] = system_prompt
        
        return messages


# Global instance
_language_service: Optional[LanguageService] = None


def get_language_service() -> LanguageService:
    """
    Get the global language service instance.
    
    Returns:
        LanguageService instance
    """
    global _language_service
    
    if _language_service is None:
        _language_service = LanguageService()
    
    return _language_service


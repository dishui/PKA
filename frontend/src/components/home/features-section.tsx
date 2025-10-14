import SectionHeader from '@/components/ui/sections/section-header'
import SectionCard from '@/components/ui/sections/section-card'

const FeaturesSection = () => {
  return (
    <div className="container mx-auto px-4 py-12">
        <SectionHeader
          title="Knowledge Assistant ChatBot"
          description="Production-ready AI chatbot with multi-language support"
          actionText="Try the chat widget in the bottom-right corner! →"
          icon="🤖"
        />

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          <SectionCard
            title="Multi-Language"
            description="Automatic language detection and responses in 10+ languages including English, Spanish, French, German, and more."
            icon="🌍"
          />

          <SectionCard
            title="Real-time Streaming"
            description="Server-Sent Events (SSE) for progressive response streaming, providing instant feedback as the AI generates responses."
            icon="⚡"
          />

          <SectionCard
            title="RAG Search"
            description="Retrieval Augmented Generation with ChromaDB vector search for context-aware responses from your knowledge base."
            icon="🔍"
          />

          <SectionCard
            title="No Auth Required"
            description="Public chat endpoints allow anonymous conversations - perfect for website widgets and public-facing chatbots."
            icon="🔓"
          />

          <SectionCard
            title="OpenAI + Ollama"
            description="Flexible LLM provider support - use OpenAI GPT models for production or Ollama for local/cost-free development."
            icon="🤖"
          />

          <SectionCard
            title="Production Ready"
            description="FastAPI backend, PostgreSQL, Redis, Docker deployment, structured logging, and Prometheus metrics included."
            icon="📊"
          />
        </div>
    </div>
  )
}

export default FeaturesSection
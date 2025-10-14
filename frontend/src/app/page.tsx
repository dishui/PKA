'use client'
import { useState } from 'react'
import ChatWidget from '@/components/layouts/chat-widget'
import ChatWidgetStreaming from '@/components/layouts/chat-widget-streaming'

function App() {
  const [widgetType, setWidgetType] = useState<'standard' | 'streaming'>('streaming')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Personal Knowledge Assistant 🤖
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Production-ready AI chatbot with multi-language support
          </p>
          <p className="text-sm text-gray-500">
            Try the chat widget in the bottom-right corner! →
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-3 text-blue-600">🌍 Multi-Language</h3>
            <p className="text-gray-600 text-sm">
              Automatic language detection and responses in 10+ languages including English, Spanish, French, German, and more.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-3 text-green-600">⚡ Real-time Streaming</h3>
            <p className="text-gray-600 text-sm">
              Server-Sent Events (SSE) for progressive response streaming, providing instant feedback as the AI generates responses.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-3 text-purple-600">🔍 RAG Search</h3>
            <p className="text-gray-600 text-sm">
              Retrieval Augmented Generation with ChromaDB vector search for context-aware responses from your knowledge base.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-3 text-red-600">🔓 No Auth Required</h3>
            <p className="text-gray-600 text-sm">
              Public chat endpoints allow anonymous conversations - perfect for website widgets and public-facing chatbots.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-3 text-yellow-600">🤖 OpenAI + Ollama</h3>
            <p className="text-gray-600 text-sm">
              Flexible LLM provider support - use OpenAI GPT models for production or Ollama for local/cost-free development.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-3 text-indigo-600">📊 Production Ready</h3>
            <p className="text-gray-600 text-sm">
              FastAPI backend, PostgreSQL, Redis, Docker deployment, structured logging, and Prometheus metrics included.
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">🛠️ Tech Stack</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-3 text-gray-800">Backend</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✅ FastAPI (Python 3.11)</li>
                <li>✅ OpenAI GPT API + Ollama</li>
                <li>✅ ChromaDB Vector Store</li>
                <li>✅ PostgreSQL + pgvector</li>
                <li>✅ Redis Caching</li>
                <li>✅ sentence-transformers</li>
                <li>✅ langdetect (multi-language)</li>
                <li>✅ SSE Streaming (sse-starlette)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 text-gray-800">Frontend</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✅ React 18 + TypeScript</li>
                <li>✅ Tailwind CSS</li>
                <li>✅ Vite (Lightning Fast)</li>
                <li>✅ EventSource (SSE Client)</li>
                <li>✅ Lucide Icons</li>
                <li>✅ Embeddable Widget</li>
                <li>✅ Responsive Design</li>
                <li>✅ Real-time Updates</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Widget Selector */}
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto text-center">
          <h3 className="text-lg font-semibold mb-4">Choose Widget Type</h3>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setWidgetType('standard')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                widgetType === 'standard'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Standard Chat
            </button>
            <button
              onClick={() => setWidgetType('streaming')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                widgetType === 'streaming'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Streaming Chat ⚡
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            {widgetType === 'streaming' 
              ? 'Real-time streaming responses with SSE' 
              : 'Traditional request-response chat'}
          </p>
        </div>

        {/* API Endpoints */}
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mt-12">
          <h3 className="text-lg font-semibold mb-4">📡 API Endpoints</h3>
          <div className="space-y-2 text-sm font-mono">
            <div><span className="text-green-400">POST</span> /api/v1/chat/public - Public chat (no auth)</div>
            <div><span className="text-blue-400">GET</span> /api/v1/chat/stream - Streaming chat (SSE)</div>
            <div><span className="text-blue-400">GET</span> /api/v1/health - Health check</div>
            <div><span className="text-blue-400">GET</span> /api/v1/health/detailed - Detailed health</div>
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      {widgetType === 'standard' ? (
        <ChatWidget
          apiUrl="http://localhost:8000/api/v1"
          title="PKA Assistant"
          placeholder="Ask me anything..."
          primaryColor="#3B82F6"
          position="bottom-right"
        />
      ) : (
        <ChatWidgetStreaming
          apiUrl="http://localhost:8000/api/v1"
          title="PKA Assistant (Streaming)"
          placeholder="Ask me anything..."
          primaryColor="#8B5CF6"
          position="bottom-right"
          useStreaming={true}
        />
      )}
    </div>
  )
}

export default App

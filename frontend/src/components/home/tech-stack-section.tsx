const TechStackSection = () => {
  return (
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
  )
}

export default TechStackSection
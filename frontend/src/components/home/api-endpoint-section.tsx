const ApiEndpointSection = () => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mt-12">
        <h3 className="text-lg font-semibold mb-4">📡 API Endpoints</h3>
        <div className="space-y-2 text-sm font-mono">
          <div><span className="text-green-400">POST</span> /api/v1/chat/public - Public chat (no auth)</div>
          <div><span className="text-blue-400">GET</span> /api/v1/chat/stream - Streaming chat (SSE)</div>
          <div><span className="text-blue-400">GET</span> /api/v1/health - Health check</div>
          <div><span className="text-blue-400">GET</span> /api/v1/health/detailed - Detailed health</div>
        </div>
  </div>
  )
}

export default ApiEndpointSection
import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Personal Knowledge Assistant MVP
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Production-ready FastAPI + React + AI demo
        </p>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">🚀 MVP Features</h2>
          <ul className="text-left space-y-2">
            <li>✅ FastAPI Backend with async/await</li>
            <li>✅ PostgreSQL + Redis</li>
            <li>✅ ChromaDB Vector Search</li>
            <li>✅ Docker Development Environment</li>
            <li>✅ Production-Ready Architecture</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App

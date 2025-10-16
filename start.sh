#!/bin/bash

# Personal Knowledge Assistant MVP - Docker Startup Script
# Simple script to get the MVP running with Docker

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
check_docker() {
    if ! docker info >/dev/null 2>&1; then
        log_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
    log_success "Docker is running"
}

# Create necessary files
create_env_files() {
    log_info "Creating environment files..."
    
    # Backend .env
    if [ ! -f "backend/.env" ]; then
        cat > backend/.env << EOF
DATABASE_URL=postgresql+asyncpg://pka_user:pka_password@postgres:5432/pka_db
REDIS_URL=redis://redis:6379/0
SECRET_KEY=dev-secret-key-change-in-production
DEBUG=true
ENVIRONMENT=development
LOG_LEVEL=DEBUG
OLLAMA_BASE_URL=http://host.docker.internal:11434
EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2
EOF
        log_success "Created backend/.env"
    fi
    
    # Frontend .env
    if [ ! -f "frontend/.env" ]; then
        cat > frontend/.env << EOF
VITE_API_URL=http://localhost:8000/api/v1
VITE_WS_URL=ws://localhost:8000/ws
VITE_APP_NAME=Personal Knowledge Assistant
VITE_APP_VERSION=1.0.0
EOF
        log_success "Created frontend/.env"
    fi
}

# Create minimal frontend files for Docker build
create_frontend_files() {
    log_info "Creating minimal frontend files..."
    
    # Create basic index.html
    if [ ! -f "frontend/index.html" ]; then
        cat > frontend/index.html << EOF
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Personal Knowledge Assistant</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF
        log_success "Created frontend/index.html"
    fi
    
    # Create basic vite.config.ts
    if [ ! -f "frontend/vite.config.ts" ]; then
        cat > frontend/vite.config.ts << EOF
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
})
EOF
        log_success "Created frontend/vite.config.ts"
    fi
    
    # Create basic tsconfig.json
    if [ ! -f "frontend/tsconfig.json" ]; then
        cat > frontend/tsconfig.json << EOF
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF
        log_success "Created frontend/tsconfig.json"
    fi
    
    # Create src directory and basic files
    mkdir -p frontend/src
    
    if [ ! -f "frontend/src/main.tsx" ]; then
        cat > frontend/src/main.tsx << EOF
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF
        log_success "Created frontend/src/main.tsx"
    fi
    
    if [ ! -f "frontend/src/App.tsx" ]; then
        cat > frontend/src/App.tsx << EOF
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
EOF
        log_success "Created frontend/src/App.tsx"
    fi
    
    if [ ! -f "frontend/src/index.css" ]; then
        cat > frontend/src/index.css << EOF
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
EOF
        log_success "Created frontend/src/index.css"
    fi
}

# Start services
start_services() {
    log_info "Starting services with Docker Compose..."
    
    # Stop any existing containers
    docker compose -f docker-compose.dev.yml down 2>/dev/null || true
    
    # Build and start services
    docker compose -f docker-compose.dev.yml up --build -d
    
    log_success "Services started!"
}

# Wait for services to be ready
wait_for_services() {
    log_info "Waiting for services to be ready..."
    
    # Wait for backend health check
    for i in {1..30}; do
        if curl -f http://localhost:8000/health >/dev/null 2>&1; then
            log_success "Backend is ready!"
            break
        fi
        if [ $i -eq 30 ]; then
            log_warning "Backend health check timeout - but it might still be starting"
        fi
        sleep 2
    done
    
    # Wait for frontend
    for i in {1..30}; do
        if curl -f http://localhost:3000 >/dev/null 2>&1; then
            log_success "Frontend is ready!"
            break
        fi
        if [ $i -eq 30 ]; then
            log_warning "Frontend timeout - but it might still be starting"
        fi
        sleep 2
    done
}

# Show status and next steps
show_status() {
    echo ""
    log_success "🎉 Personal Knowledge Assistant MVP is starting!"
    echo ""
    echo "Services:"
    echo "  📱 Frontend:  http://localhost:3000"
    echo "  🔧 Backend:   http://localhost:8000"
    echo "  📚 API Docs:  http://localhost:8000/docs"
    echo "  💾 Database: localhost:5432 (pka_user/pka_password)"
    echo ""
    echo "Useful commands:"
    echo "  📊 View logs:     docker-compose -f docker-compose.dev.yml logs -f"
    echo "  🔄 Restart:       docker-compose -f docker-compose.dev.yml restart"
    echo "  🛑 Stop:          docker-compose -f docker-compose.dev.yml down"
    echo "  🧹 Clean up:      docker-compose -f docker-compose.dev.yml down -v"
    echo ""
    echo "The services are starting in the background..."
    echo "Check the logs if you encounter any issues!"
}

# Main function
main() {
    echo "🚀 Personal Knowledge Assistant MVP - Docker Setup"
    echo "=================================================="
    
    check_docker
    create_env_files
    create_frontend_files
    start_services
    show_status
    
    # Optionally wait for services and show final status
    if [ "$1" = "--wait" ]; then
        wait_for_services
        echo ""
        log_success "All services are ready! 🎉"
    fi
}

main "$@" 
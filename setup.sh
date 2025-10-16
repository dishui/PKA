#!/bin/bash

# Personal Knowledge Assistant MVP - Setup Script
# This script demonstrates professional project setup and initialization

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
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

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    local missing_deps=()
    
    if ! command_exists docker; then
        missing_deps+=("docker")
    fi
    
    if ! command_exists docker-compose; then
        if ! docker compose version >/dev/null 2>&1; then
            missing_deps+=("docker-compose")
        fi
    fi
    
    if ! command_exists node; then
        missing_deps+=("node")
    elif [[ $(node -v | sed 's/v//') < "18.0.0" ]]; then
        log_warning "Node.js version $(node -v) detected. Version 18+ recommended."
    fi
    
    if ! command_exists python3; then
        missing_deps+=("python3")
    elif [[ $(python3 --version | cut -d' ' -f2 | cut -d'.' -f1,2) < "3.11" ]]; then
        log_warning "Python $(python3 --version) detected. Version 3.11+ recommended."
    fi
    
    if ! command_exists git; then
        missing_deps+=("git")
    fi
    
    if [ ${#missing_deps[@]} -ne 0 ]; then
        log_error "Missing required dependencies: ${missing_deps[*]}"
        log_info "Please install the missing dependencies and run this script again."
        exit 1
    fi
    
    log_success "All prerequisites met!"
}

# Setup environment files
setup_environment() {
    log_info "Setting up environment files..."
    
    # Backend .env
    if [ ! -f "backend/.env" ]; then
        cat > backend/.env << EOF
# Database Configuration
DATABASE_URL=postgresql+asyncpg://pka_user:pka_password@localhost:5432/pka_db
REDIS_URL=redis://localhost:6379/0

# Security
SECRET_KEY=$(openssl rand -base64 32)
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# AI Services
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.1:8b
EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2

# Application
DEBUG=true
ENVIRONMENT=development
LOG_LEVEL=DEBUG

# CORS
BACKEND_CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# File Processing
MAX_FILE_SIZE_MB=10
CHUNK_SIZE=1000
CHUNK_OVERLAP=200
EOF
        log_success "Created backend/.env"
    else
        log_info "backend/.env already exists, skipping..."
    fi
    
    # Frontend .env
    if [ ! -f "frontend/.env" ]; then
        cat > frontend/.env << EOF
# API Configuration
VITE_API_URL=http://localhost:8000/api/v1
VITE_WS_URL=ws://localhost:8000/ws

# Application
VITE_APP_NAME=Personal Knowledge Assistant
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
EOF
        log_success "Created frontend/.env"
    else
        log_info "frontend/.env already exists, skipping..."
    fi
    
    # Root .env for Docker Compose
    if [ ! -f ".env" ]; then
        cat > .env << EOF
# Docker Compose Environment Variables
SECRET_KEY=$(openssl rand -base64 32)
POSTGRES_PASSWORD=pka_password
REDIS_PASSWORD=

# Development Tools
PGADMIN_EMAIL=admin@pka.com
PGADMIN_PASSWORD=admin
EOF
        log_success "Created .env for Docker Compose"
    else
        log_info ".env already exists, skipping..."
    fi
}

# Setup Python virtual environment
setup_python_env() {
    log_info "Setting up Python virtual environment..."
    
    cd backend
    
    if [ ! -d "venv" ]; then
        python3 -m venv venv
        log_success "Created Python virtual environment"
    fi
    
    # Activate virtual environment
    source venv/bin/activate
    
    # Upgrade pip
    pip install --upgrade pip
    
    # Install dependencies
    log_info "Installing Python dependencies..."
    pip install -r requirements.txt
    
    log_success "Python environment setup complete"
    cd ..
}

# Setup Node.js environment
setup_node_env() {
    log_info "Setting up Node.js environment..."
    
    cd frontend
    
    # Check if package manager is available
    if command_exists yarn; then
        log_info "Using Yarn package manager..."
        yarn install
    else
        log_info "Using NPM package manager..."
        npm install
    fi
    
    log_success "Node.js environment setup complete"
    cd ..
}

# Initialize database
init_database() {
    log_info "Initializing database..."
    
    # Start only database services
    docker-compose up -d postgres redis
    
    # Wait for services to be ready
    log_info "Waiting for database to be ready..."
    sleep 10
    
    # Run migrations
    cd backend
    source venv/bin/activate
    
    if [ ! -d "alembic" ]; then
        log_info "Initializing Alembic..."
        alembic init alembic
    fi
    
    # Create first migration
    if [ ! -f "alembic/versions/"*"initial_migration.py" ]; then
        log_info "Creating initial migration..."
        alembic revision --autogenerate -m "Initial migration"
    fi
    
    # Run migrations
    log_info "Running database migrations..."
    alembic upgrade head
    
    log_success "Database initialized successfully"
    cd ..
}

# Setup Ollama models
setup_ollama() {
    log_info "Setting up Ollama models..."
    
    # Start Ollama service
    docker-compose up -d ollama
    
    # Wait for Ollama to be ready
    log_info "Waiting for Ollama to be ready..."
    sleep 30
    
    # Pull required model
    log_info "Pulling Llama 3.1 model (this may take a while)..."
    docker-compose exec ollama ollama pull llama3.1:8b || {
        log_warning "Failed to pull Llama 3.1 model. You can do this manually later."
    }
    
    log_success "Ollama setup complete"
}

# Run tests
run_tests() {
    log_info "Running tests to verify setup..."
    
    # Backend tests
    log_info "Running backend tests..."
    cd backend
    source venv/bin/activate
    
    if command_exists pytest; then
        pytest --tb=short || log_warning "Some backend tests failed"
    else
        log_warning "pytest not available, skipping backend tests"
    fi
    
    cd ..
    
    # Frontend tests
    log_info "Running frontend tests..."
    cd frontend
    
    if command_exists yarn; then
        yarn test --run || log_warning "Some frontend tests failed"
    else
        npm test -- --run || log_warning "Some frontend tests failed"
    fi
    
    cd ..
    
    log_success "Test run complete"
}

# Setup development tools
setup_dev_tools() {
    log_info "Setting up development tools..."
    
    # Pre-commit hooks
    if command_exists pre-commit; then
        pre-commit install
        log_success "Pre-commit hooks installed"
    else
        log_warning "pre-commit not available, skipping hooks setup"
    fi
    
    # VS Code settings
    if [ ! -d ".vscode" ]; then
        mkdir -p .vscode
        
        cat > .vscode/settings.json << EOF
{
  "python.defaultInterpreterPath": "./backend/venv/bin/python",
  "python.formatting.provider": "black",
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": false,
  "python.linting.flake8Enabled": true,
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.associations": {
    "*.env": "dotenv"
  }
}
EOF
        
        cat > .vscode/extensions.json << EOF
{
  "recommendations": [
    "ms-python.python",
    "ms-python.black-formatter",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "ms-vscode-remote.remote-containers"
  ]
}
EOF
        
        log_success "VS Code settings created"
    fi
}

# Print success message
print_success_message() {
    echo ""
    log_success "🎉 Personal Knowledge Assistant MVP setup complete!"
    echo ""
    echo "Next steps:"
    echo "1. Start all services: docker-compose up -d"
    echo "2. View logs: docker-compose logs -f"
    echo "3. Access the application:"
    echo "   - Frontend: http://localhost:3000"
    echo "   - Backend API: http://localhost:8000/docs"
    echo "   - PgAdmin: http://localhost:5050 (if using --dev-tools)"
    echo ""
    echo "Development commands:"
    echo "- Backend: cd backend && source venv/bin/activate && uvicorn app.main:app --reload"
    echo "- Frontend: cd frontend && npm run dev"
    echo "- Tests: ./run_tests.sh"
    echo ""
    echo "For more information, see README.md"
}

# Main setup function
main() {
    echo "🚀 Personal Knowledge Assistant MVP Setup"
    echo "========================================"
    echo ""
    
    # Parse command line arguments
    SKIP_DEPS=false
    DEV_TOOLS=false
    QUICK_SETUP=false
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            --skip-deps)
                SKIP_DEPS=true
                shift
                ;;
            --dev-tools)
                DEV_TOOLS=true
                shift
                ;;
            --quick)
                QUICK_SETUP=true
                shift
                ;;
            --help)
                echo "Usage: $0 [OPTIONS]"
                echo ""
                echo "Options:"
                echo "  --skip-deps    Skip dependency installation"
                echo "  --dev-tools    Install development tools"
                echo "  --quick        Quick setup (skip tests and optional components)"
                echo "  --help         Show this help message"
                exit 0
                ;;
            *)
                log_error "Unknown option: $1"
                exit 1
                ;;
        esac
    done
    
    # Run setup steps
    check_prerequisites
    setup_environment
    
    if [ "$SKIP_DEPS" = false ]; then
        setup_python_env
        setup_node_env
    fi
    
    init_database
    
    if [ "$QUICK_SETUP" = false ]; then
        setup_ollama
        run_tests
    fi
    
    if [ "$DEV_TOOLS" = true ]; then
        setup_dev_tools
    fi
    
    print_success_message
}

# Run main function
main "$@" 
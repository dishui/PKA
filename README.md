This is a Pet Project for playing with ChromaDB and LangChain. This project is build with FastAPI and React, and AI technologies like LangGraph, Llama 3.1, and pgvector.

The first MVP is a simple Personal Knowledge Assistant. 

Even though it's a pet project, I'm going to try to make it with the best practices and clean architecture.

## **🎉 What To Expect**

### **Solid Technical Foundation**

- **tech stack**: LangGraph + FastAPI + React + PostgreSQL/Redis + Llama 3.1 a modern, scalable combination
- **Cost-effective design**: Open-source components, avoiding API fees
- **RAG implementation**: Smart use of pgvector for semantic search over personal notes

### **Architecture:**

1. **Docker-First Development** - Everything containerized
2. **Clean Code Architecture** - Proper separation of concerns
3. **Type Safety** - Full TypeScript + Pydantic coverage
4. **Error Handling** - Custom exceptions and graceful failures
5. **Configuration Management** - Environment-based settings
6. **Health Checks** - Monitoring and observability
7. **Security Best Practices** - Non-root containers, CORS, validation


## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   AI Services   │
│   React/TS      │◄──►│   FastAPI       │◄──►│   Ollama/Chroma │
│   + Zustand     │    │   + SQLAlchemy  │    │   + Embeddings  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │                        │
         ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Query   │    │   PostgreSQL    │    │   Vector Store  │
│   + React Hook  │    │   + Redis       │    │   (ChromaDB)    │
│   Form          │    │   + Alembic     │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

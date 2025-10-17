"""
File management endpoints.

This module:
- File upload handling
- File processing workflows
- RESTful API design
- Error handling
"""

from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from typing import List
#import chromadb
#from app.core.security import get_current_user


router = APIRouter()

@router.get("/")
async def list_files():
    """List uploaded files."""
    return {
        "files": [],
        "message": "File endpoints coming soon"
    }

@router.post("/upload")
async def upload_file(files: List[UploadFile] = File(...)):
    """Upload a file for processing."""
    client = chromadb.PersistentClient(path="/app/chroma_db")
    collection = client.get_or_create_collection("files")
    try: 
        for file in files:
            content = await file.read()
            # Store file metadata in ChromaDB
            collection.add(
                documents=[content.decode('utf-8') if file.content_type.startswith('text/') else content],
                metadatas=[{"filename": file.filename, "content_type": file.content_type, "size": file.size}],
                ids=[file.filename]
            )
        return {
            'message': 'Files uploaded successfully',
            'filenames': [file.filename for file in files],
            'file_count': len(files)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Failed to upload files: {str(e)}')

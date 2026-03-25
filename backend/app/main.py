# backend/app/main.py
from fastapi import FastAPI
from app.core.config import settings
from app.db.supabase import supabase

app = FastAPI(title=settings.PROJECT_NAME)

@app.get("/")
async def root():
    return {"message": f"Welcome to {settings.PROJECT_NAME} API"}

@app.get("/health")
async def health_check():
    try:
        # Simple query to verify Supabase connection
        # Replace 'users' with a table name that exists in your Supabase project
        response = supabase.table("profiles").select("*").limit(1).execute()
        return {
            "status": "healthy",
            "database": "connected",
            "ollama_config": settings.OLLAMA_BASE_URL
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e)
        }
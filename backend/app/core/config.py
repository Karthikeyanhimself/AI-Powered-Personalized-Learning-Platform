# backend/app/core/config.py
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # App Settings
    PROJECT_NAME: str = "AI Learning Platform"
    API_V1_STR: str = "/api/v1"
    
    # Supabase (Updated to match your .env)
    SUPABASE_URL: str
    SUPABASE_KEY: str  
    
    # Redis
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379
    
    # AI / Ollama
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    
    # Load .env file from the root or backend folder
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
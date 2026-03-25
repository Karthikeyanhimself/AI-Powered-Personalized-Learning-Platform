# backend/app/db/supabase.py
from supabase import create_client, Client
from app.core.config import settings

def get_supabase() -> Client:
    """
    Initializes and returns a Supabase client instance.
    """
    url: str = settings.SUPABASE_URL
    key: str = settings.SUPABASE_KEY 
    
    return create_client(url, key)

# Initialize a global instance
supabase: Client = get_supabase()
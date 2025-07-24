from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from dotenv import load_dotenv

# Load environment variables from .env file at the very beginning
load_dotenv()

import crud, models, schemas, auth, database
from database import create_db_and_tables
from routers import users, websites, llm_files, testimonials, payments
from routers import auth as auth_router

# This function is called on startup to create the database tables.
# It's better to handle migrations with a tool like Alembic in production.
def startup_event():
    create_db_and_tables()

app = FastAPI(on_startup=[startup_event])

# Configure CORS
# In a production environment, you should restrict this to your frontend's domain.
# Example: origins = ["http://localhost:5173", "https://your-frontend.com"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for development
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Include the routers
app.include_router(auth_router.router)
app.include_router(users.router)
app.include_router(websites.router)
app.include_router(llm_files.router)
app.include_router(testimonials.router)
app.include_router(payments.router)

@app.get("/")
def read_root():
    """
    Root endpoint for the API.
    """
    return {"message": "Welcome to the LLM SEO Platform API"}

if __name__ == "__main__":
    import uvicorn
    print("Starting server on http://127.0.0.1:8001")
    uvicorn.run("main:app", host="127.0.0.1", port=8001) 
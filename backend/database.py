from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os
from pathlib import Path

# It's important to load the .env file before other modules might need the variables
# We explicitly load the .env file from the same directory as this script.
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

DATABASE_URL = os.getenv("DATABASE_URL")

# A check to ensure the DATABASE_URL was loaded
if DATABASE_URL is None:
    raise ValueError("DATABASE_URL environment variable not set. Please create a .env file in the 'backend' directory.")


engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency to get a DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_db_and_tables():
    # This function will create all tables defined using the Base declarative system.
    # It's called on application startup.
    Base.metadata.create_all(bind=engine) 
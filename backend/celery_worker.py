import os
import asyncio
from celery import Celery
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

# It's crucial that this Celery app instance is defined at the top level of a module.
celery_app = Celery(
    "tasks",
    broker=os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0"),
    backend=os.getenv("CELERY_RESULT_BACKEND", "redis://localhost:6379/0"),
    include=['backend.celery_worker'] # Point to the module containing the tasks
)

# Optional Celery configuration
celery_app.conf.update(
    task_track_started=True,
)

# We must import the parts of our app the task will use *inside* the task function.
# This avoids circular imports and ensures the app is loaded correctly by the worker.
@celery_app.task(name="generate_llm_files_task")
def generate_llm_files_task(website_id: int, llms_txt_pages: list, llms_full_txt_urls: list):
    """
    Celery task to generate LLM files in the background.
    """
    from backend import crud, schemas, models
    from backend.database import SessionLocal
    import backend.services.content_processor as content_processor
    
    db = SessionLocal()
    try:
        website = db.query(models.Website).filter(models.Website.id == website_id).first()
        if not website:
            print(f"Task failed: Website with ID {website_id} not found.")
            return

        # Create initial pending file records
        llms_txt_record = crud.create_llm_file(db, schemas.LLMFileCreate(
            website_id=website_id,
            file_type='llms.txt',
            content_path='pending',
            status='processing'
        ))
        llms_full_txt_record = crud.create_llm_file(db, schemas.LLMFileCreate(
            website_id=website_id,
            file_type='llms_full.txt',
            content_path='pending',
            status='processing'
        ))
        
        GENERATED_FILES_DIR = Path("generated_files")
        GENERATED_FILES_DIR.mkdir(exist_ok=True)

        # --- Generate llms.txt ---
        llms_txt_content = content_processor.generate_llms_txt_content(
            website_name=website.name,
            root_url=website.root_url,
            pages_to_include=llms_txt_pages
        )
        llms_txt_path = GENERATED_FILES_DIR / f"llms_{website_id}_{llms_txt_record.id}.txt"
        with open(llms_txt_path, "w", encoding="utf-8") as f:
            f.write(llms_txt_content)
        crud.update_llm_file_status(db, llms_txt_record.id, 'generated', str(llms_txt_path))

        # --- Generate llms_full.txt ---
        # We need to run the async function in a new event loop for the Celery worker
        llms_full_txt_content = asyncio.run(
            content_processor.generate_llms_full_txt_content(urls_to_flatten=llms_full_txt_urls)
        )
        llms_full_txt_path = GENERATED_FILES_DIR / f"llms_full_{website_id}_{llms_full_txt_record.id}.txt"
        with open(llms_full_txt_path, "w", encoding="utf-8") as f:
            f.write(llms_full_txt_content)
        crud.update_llm_file_status(db, llms_full_txt_record.id, 'generated', str(llms_full_txt_path))

    except Exception as e:
        print(f"An error occurred in Celery task for website {website_id}: {e}")
        # Update status to 'error' if records were created
        if 'llms_txt_record' in locals() and llms_txt_record:
            crud.update_llm_file_status(db, llms_txt_record.id, 'error', 'error.txt')
        if 'llms_full_txt_record' in locals() and llms_full_txt_record:
            crud.update_llm_file_status(db, llms_full_txt_record.id, 'error', 'error.txt')
    finally:
        db.close() 
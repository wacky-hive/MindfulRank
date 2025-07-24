from fastapi import APIRouter, Depends, HTTPException, Path as FastApiPath, BackgroundTasks, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from typing import List, Optional
import uuid
import os
import asyncio
from pathlib import Path
import json

import crud, schemas, models, database, auth
from services import content_processor
from routers.payments import requires_active_subscription

router = APIRouter(
    prefix="/llm-files",
    tags=["llm-files"],
)

GENERATED_FILES_DIR = Path("generated_files")

@router.post("/websites/{website_id}/generate", status_code=200)
def generate_llm_files_for_website(
    request_body: schemas.LLMFileGenerationRequest,
    website_id: int = FastApiPath(..., description="The ID of the website"),
    background_tasks: BackgroundTasks = BackgroundTasks(),
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """
    Generate LLM files for a specific website.
    Requires active paid subscription.
    """
    # Check if user has active subscription
    requires_active_subscription(current_user)
    
    # Check if the website exists and belongs to the current user
    website = crud.get_website(db, website_id=website_id)
    if not website:
        raise HTTPException(status_code=404, detail="Website not found")
    if website.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this website")
    
    # Convert Pydantic models to simple data structures
    llms_txt_pages_serializable = [
        {
            "url": str(page.url),
            "title": page.title,
            "description": page.description
        }
        for page in request_body.llms_txt_pages
    ]
    llms_full_txt_urls_serializable = [str(url) for url in request_body.llms_full_txt_urls]
    
    
    try:
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
        
        GENERATED_FILES_DIR.mkdir(exist_ok=True)

        # --- Generate llms.txt ---
        llms_txt_content = content_processor.generate_llms_txt_content(
            website_name=website.name,
            root_url=website.root_url,
            pages_to_include=llms_txt_pages_serializable
        )
        llms_txt_path = GENERATED_FILES_DIR / f"llms_{website_id}_{llms_txt_record.id}.txt"
        with open(llms_txt_path, "w", encoding="utf-8") as f:
            f.write(llms_txt_content)
        crud.update_llm_file_status(db, llms_txt_record.id, 'generated', str(llms_txt_path))

        # --- Generate llms_full.txt ---
        # We need to run the async function in a new event loop
        llms_full_txt_content = asyncio.run(
            content_processor.generate_llms_full_txt_content(urls_to_flatten=llms_full_txt_urls_serializable)
        )
        llms_full_txt_path = GENERATED_FILES_DIR / f"llms_full_{website_id}_{llms_full_txt_record.id}.txt"
        with open(llms_full_txt_path, "w", encoding="utf-8") as f:
            f.write(llms_full_txt_content)
        crud.update_llm_file_status(db, llms_full_txt_record.id, 'generated', str(llms_full_txt_path))
     
        return {"message": "LLM files generated successfully."}

    except Exception as e:
        print(f"An error occurred during file generation for website {website_id}: {e}")
        # Update status to 'error' if records were created
        if 'llms_txt_record' in locals() and llms_txt_record:
            crud.update_llm_file_status(db, llms_txt_record.id, 'error', 'error.txt')
        if 'llms_full_txt_record' in locals() and llms_full_txt_record:
            crud.update_llm_file_status(db, llms_full_txt_record.id, 'error', 'error.txt')
        raise HTTPException(status_code=500, detail=f"Error generating files: {str(e)}")

@router.get("/websites/{website_id}", response_model=List[schemas.LLMFileResponse])
def get_llm_files_for_website(
    website_id: int = FastApiPath(...),
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """
    Get all LLM files for a specific website.
    """
    # Verify the website belongs to the current user
    website = crud.get_website(db, website_id=website_id)
    if not website:
        raise HTTPException(status_code=404, detail="Website not found")
    
    if website.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access files for this website")
    
    return crud.get_llm_files_by_website(db, website_id=website_id)

@router.get("/{file_id}/download")
def download_llm_file(
    file_id: int = FastApiPath(...),
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """
    Download a specific LLM file.
    """
    llm_file = crud.get_llm_file(db, file_id=file_id)
    if not llm_file:
        raise HTTPException(status_code=404, detail="File not found")
    
    # Verify the file belongs to a website owned by the current user
    website = crud.get_website(db, website_id=llm_file.website_id)
    if not website or website.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this file")
    
    file_path = Path(llm_file.content_path)
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found on disk")
    
    return FileResponse(
        path=str(file_path),
        filename=file_path.name,
        media_type='text/plain'
    )

@router.delete("/{file_id}", status_code=200)
def delete_llm_file(
    file_id: int = FastApiPath(...),
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """
    Delete a specific LLM file.
    """
    llm_file = crud.get_llm_file(db, file_id=file_id)
    if not llm_file:
        raise HTTPException(status_code=404, detail="File not found")
    
    # Verify the file belongs to a website owned by the current user
    website = crud.get_website(db, website_id=llm_file.website_id)
    if not website or website.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this file")
    
    success = crud.delete_llm_file(db, file_id=file_id)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to delete file")
    
    return {"message": "File deleted successfully"}

@router.post("/websites/{website_id}/auto-discover", status_code=200)
async def auto_discover_website_pages(
    website_id: int = FastApiPath(...),
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """
    Auto-discover pages on a website and return suggested titles and descriptions.
    """
    # Verify the website belongs to the current user
    website = crud.get_website(db, website_id=website_id)
    if not website:
        raise HTTPException(status_code=404, detail="Website not found")
    
    if website.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this website")
    
    try:
        # Auto-discover pages on the website
        discovered_pages = await content_processor.auto_discover_pages(
            root_url=website.root_url,
            max_pages=15
        )
        
        if not discovered_pages:
            raise HTTPException(status_code=404, detail="No pages could be discovered on this website")
        
        return {
            "message": f"Discovered {len(discovered_pages)} pages",
            "pages": discovered_pages
        }
        
    except Exception as e:
        print(f"Error during auto-discovery for website {website_id}: {e}")
        raise HTTPException(status_code=500, detail=f"Error discovering pages: {str(e)}") 
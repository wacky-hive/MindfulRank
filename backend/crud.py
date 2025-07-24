from sqlalchemy.orm import Session
import models, schemas, auth
from typing import Optional, List

def get_user_by_email(db: Session, email: str):
    """
    Fetches a user from the database by their email address.
    """
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_id(db: Session, user_id: int):
    """
    Fetches a user from the database by their ID.
    """
    return db.query(models.User).filter(models.User.id == user_id).first()

def create_user(db: Session, user: schemas.UserCreate):
    """
    Creates a new user in the database with a hashed password.
    """
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# CRUD functions for Website

def create_website(db: Session, website: schemas.WebsiteCreate, user_id: int):
    """
    Creates a new website for a specific user.
    """
    db_website = models.Website(
        **website.dict(), 
        user_id=user_id,
        status='pending'  # Explicitly set the initial status
    )
    db.add(db_website)
    db.commit()
    db.refresh(db_website)
    return db_website

def get_website(db: Session, website_id: int) -> Optional[models.Website]:
    """
    Fetches a website by its ID.
    """
    return db.query(models.Website).filter(models.Website.id == website_id).first()

def get_website_by_url(db: Session, url: str) -> Optional[models.Website]:
    """
    Fetches a website by its root URL across all users.
    """
    return db.query(models.Website).filter(models.Website.root_url == url).first()

def get_website_by_url_for_user(db: Session, url: str, user_id: int) -> Optional[models.Website]:
    """
    Fetches a website by its root URL for a specific user.
    """
    return db.query(models.Website).filter(models.Website.root_url == url, models.Website.user_id == user_id).first()

def get_websites_by_user(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    """
    Fetches all websites for a specific user.
    """
    return db.query(models.Website).filter(models.Website.user_id == user_id).offset(skip).limit(limit).all()

def delete_website(db: Session, website_id: int):
    """
    Deletes a website and all its associated LLM files.
    """
    # First delete all LLM files associated with this website
    db.query(models.LLMFile).filter(models.LLMFile.website_id == website_id).delete()
    
    # Then delete the website itself
    db_website = db.query(models.Website).filter(models.Website.id == website_id).first()
    if db_website:
        db.delete(db_website)
        db.commit()
        return True
    return False

# CRUD functions for LLMFile

def create_llm_file(db: Session, llm_file: schemas.LLMFileCreate) -> models.LLMFile:
    """
    Creates a new LLMFile record in the database.
    """
    db_llm_file = models.LLMFile(**llm_file.dict())
    db.add(db_llm_file)
    db.commit()
    db.refresh(db_llm_file)
    return db_llm_file

def get_llm_file(db: Session, file_id: int) -> Optional[models.LLMFile]:
    """
    Fetches an LLM file by its ID.
    """
    return db.query(models.LLMFile).filter(models.LLMFile.id == file_id).first()

def get_llm_files_by_website(db: Session, website_id: int, skip: int = 0, limit: int = 100):
    """
    Fetches all LLM files for a specific website.
    """
    return db.query(models.LLMFile).filter(models.LLMFile.website_id == website_id).offset(skip).limit(limit).all()

def update_llm_file_status(db: Session, llm_file_id: int, new_status: str, content_path: Optional[str] = None):
    """
    Updates the status and optionally the content path of an LLMFile.
    """
    db_llm_file = db.query(models.LLMFile).filter(models.LLMFile.id == llm_file_id).first()
    if db_llm_file:
        db_llm_file.status = new_status
        if content_path:
            db_llm_file.content_path = content_path
        db.commit()
        db.refresh(db_llm_file)
    return db_llm_file

def delete_llm_file(db: Session, file_id: int) -> bool:
    """
    Deletes an LLM file from both database and filesystem.
    Returns True if successful, False otherwise.
    """
    from pathlib import Path
    import os
    
    db_llm_file = db.query(models.LLMFile).filter(models.LLMFile.id == file_id).first()
    if not db_llm_file:
        return False
    
    # Try to delete the physical file if it exists
    if db_llm_file.content_path and db_llm_file.content_path != 'pending' and db_llm_file.content_path != 'error.txt':
        file_path = Path(db_llm_file.content_path)
        try:
            if file_path.exists():
                os.remove(file_path)
        except Exception as e:
            print(f"Warning: Could not delete physical file {file_path}: {e}")
    
    # Delete the database record
    db.delete(db_llm_file)
    db.commit()
    return True

# CRUD functions for Testimonials

def create_testimonial(db: Session, testimonial: schemas.TestimonialCreate, user_id: int) -> models.Testimonial:
    """
    Creates a new testimonial in the database.
    """
    db_testimonial = models.Testimonial(**testimonial.dict(), user_id=user_id)
    db.add(db_testimonial)
    db.commit()
    db.refresh(db_testimonial)
    return db_testimonial

def get_testimonial(db: Session, testimonial_id: int) -> Optional[models.Testimonial]:
    """
    Fetches a testimonial by its ID.
    """
    return db.query(models.Testimonial).filter(models.Testimonial.id == testimonial_id).first()

def get_testimonials_by_user(db: Session, user_id: int, skip: int = 0, limit: int = 100) -> List[models.Testimonial]:
    """
    Fetches all testimonials for a specific user.
    """
    return db.query(models.Testimonial).filter(models.Testimonial.user_id == user_id).offset(skip).limit(limit).all()

def get_approved_testimonials(db: Session, skip: int = 0, limit: int = 100) -> List[models.Testimonial]:
    """
    Fetches all approved testimonials for public display.
    """
    return db.query(models.Testimonial).filter(
        models.Testimonial.is_approved == True
    ).order_by(models.Testimonial.created_at.desc()).offset(skip).limit(limit).all()

def get_featured_testimonials(db: Session, limit: int = 6) -> List[models.Testimonial]:
    """
    Fetches featured testimonials for homepage display.
    """
    return db.query(models.Testimonial).filter(
        models.Testimonial.is_approved == True,
        models.Testimonial.is_featured == True
    ).order_by(models.Testimonial.created_at.desc()).limit(limit).all()

def approve_testimonial(db: Session, testimonial_id: int, is_featured: bool = False) -> Optional[models.Testimonial]:
    """
    Approves a testimonial and optionally marks it as featured.
    """
    from datetime import datetime
    
    db_testimonial = db.query(models.Testimonial).filter(models.Testimonial.id == testimonial_id).first()
    if db_testimonial:
        db_testimonial.is_approved = True
        db_testimonial.is_featured = is_featured
        db_testimonial.approved_at = datetime.now()
        db.commit()
        db.refresh(db_testimonial)
    return db_testimonial

def delete_testimonial(db: Session, testimonial_id: int) -> bool:
    """
    Deletes a testimonial from the database.
    """
    db_testimonial = db.query(models.Testimonial).filter(models.Testimonial.id == testimonial_id).first()
    if db_testimonial:
        db.delete(db_testimonial)
        db.commit()
        return True
    return False 
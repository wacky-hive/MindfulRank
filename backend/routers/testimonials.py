from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import crud, schemas, models, auth
from database import get_db

router = APIRouter(
    prefix="/testimonials",
    tags=["testimonials"]
)

@router.post("/", response_model=schemas.TestimonialResponse, status_code=status.HTTP_201_CREATED)
def create_testimonial(
    testimonial: schemas.TestimonialCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """
    Create a new testimonial for the authenticated user.
    """
    # Validate rating is between 1 and 5
    if testimonial.rating < 1 or testimonial.rating > 5:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Rating must be between 1 and 5"
        )
    
    # Validate testimonial length
    if len(testimonial.testimonial.strip()) < 20:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Testimonial must be at least 20 characters long"
        )
    
    # Check if user already has a testimonial (optional - you might want to allow multiple)
    existing_testimonials = crud.get_testimonials_by_user(db, current_user.id)
    if len(existing_testimonials) >= 3:  # Limit to 3 testimonials per user
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You have already submitted the maximum number of testimonials (3)"
        )
    
    return crud.create_testimonial(db=db, testimonial=testimonial, user_id=current_user.id)

@router.get("/my", response_model=List[schemas.TestimonialResponse])
def get_my_testimonials(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """
    Get all testimonials submitted by the current user.
    """
    return crud.get_testimonials_by_user(db=db, user_id=current_user.id, skip=skip, limit=limit)

@router.get("/public", response_model=List[schemas.TestimonialPublic])
def get_public_testimonials(
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    """
    Get all approved testimonials for public display.
    """
    testimonials = crud.get_approved_testimonials(db=db, skip=skip, limit=limit)
    
    # Convert to public format with user initials
    public_testimonials = []
    for testimonial in testimonials:
        user_email = testimonial.user.email
        # Create initials from email (e.g., john.doe@example.com -> J.D.)
        name_parts = user_email.split('@')[0].split('.')
        if len(name_parts) >= 2:
            initials = f"{name_parts[0][0].upper()}.{name_parts[1][0].upper()}."
        else:
            initials = f"{name_parts[0][0].upper()}."
        
        public_testimonial = schemas.TestimonialPublic(
            id=testimonial.id,
            rating=testimonial.rating,
            testimonial=testimonial.testimonial,
            company=testimonial.company,
            job_title=testimonial.job_title,
            created_at=testimonial.created_at,
            user_initials=initials
        )
        public_testimonials.append(public_testimonial)
    
    return public_testimonials

@router.get("/featured", response_model=List[schemas.TestimonialPublic])
def get_featured_testimonials(
    limit: int = 6,
    db: Session = Depends(get_db)
):
    """
    Get featured testimonials for homepage display.
    """
    testimonials = crud.get_featured_testimonials(db=db, limit=limit)
    
    # Convert to public format with user initials
    public_testimonials = []
    for testimonial in testimonials:
        user_email = testimonial.user.email
        # Create initials from email (e.g., john.doe@example.com -> J.D.)
        name_parts = user_email.split('@')[0].split('.')
        if len(name_parts) >= 2:
            initials = f"{name_parts[0][0].upper()}.{name_parts[1][0].upper()}."
        else:
            initials = f"{name_parts[0][0].upper()}."
        
        public_testimonial = schemas.TestimonialPublic(
            id=testimonial.id,
            rating=testimonial.rating,
            testimonial=testimonial.testimonial,
            company=testimonial.company,
            job_title=testimonial.job_title,
            created_at=testimonial.created_at,
            user_initials=initials
        )
        public_testimonials.append(public_testimonial)
    
    return public_testimonials

@router.delete("/{testimonial_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_testimonial(
    testimonial_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """
    Delete a testimonial (only the author can delete their own testimonial).
    """
    testimonial = crud.get_testimonial(db=db, testimonial_id=testimonial_id)
    if not testimonial:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Testimonial not found"
        )
    
    if testimonial.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete your own testimonials"
        )
    
    crud.delete_testimonial(db=db, testimonial_id=testimonial_id)
    return {"message": "Testimonial deleted successfully"} 
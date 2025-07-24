import os
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import models, schemas, auth, crud
from database import get_db
from routers.payments import requires_active_subscription

router = APIRouter(
    prefix="/websites",
    tags=["websites"],
)

@router.post("/", response_model=schemas.WebsiteResponse, status_code=status.HTTP_201_CREATED)
def create_website(
    website: schemas.WebsiteCreate, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(auth.get_current_user)
):
    """
    Create a new website for the current user.
    Requires active paid subscription.
    """
    # Check if user has active subscription
    requires_active_subscription(current_user)
    
    # Check if a website with this URL already exists
    existing_website = crud.get_website_by_url(db, website.root_url)
    if existing_website:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="A website with this URL already exists"
        )
    
    return crud.create_website(db=db, website=website, user_id=current_user.id)

@router.get("/", response_model=List[schemas.WebsiteResponse])
def read_websites(
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(auth.get_current_user)
):
    """
    Retrieve all websites for the current user.
    Requires active paid subscription.
    """
    # Check if user has active subscription
    requires_active_subscription(current_user)
    
    return crud.get_websites_by_user(db, user_id=current_user.id)

@router.delete("/{website_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_website(
    website_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """
    Delete a website. Only the owner can delete their website.
    """
    # Get the website and verify ownership
    website = crud.get_website(db, website_id=website_id)
    if not website:
        raise HTTPException(status_code=404, detail="Website not found")
    
    if website.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this website")
    
    # Delete the website and associated files
    crud.delete_website(db=db, website_id=website_id)
    return None
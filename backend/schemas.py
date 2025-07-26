from pydantic import BaseModel, EmailStr, HttpUrl
from datetime import datetime
from typing import List, Optional

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    stripe_customer_id: Optional[str] = None
    subscription_status: str = "inactive"
    subscription_plan: str = "free"
    subscription_id: Optional[str] = None
    current_period_end: Optional[datetime] = None

    class Config:
        # This allows Pydantic to read the data even if it is not a dict, but an ORM model
        from_attributes = True

# Schemas for Website
class WebsiteBase(BaseModel):
    root_url: str
    name: str

class WebsiteCreate(WebsiteBase):
    pass

class WebsiteResponse(WebsiteBase):
    id: int
    user_id: int
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Schemas for LLMFile
class LLMFileBase(BaseModel):
    website_id: int
    file_type: str
    content_path: str
    status: str

class LLMFileCreate(LLMFileBase):
    pass

class LLMFileResponse(BaseModel):
    id: int
    website_id: int
    file_type: str
    content_path: str
    file_size: Optional[int] = None
    status: str
    generated_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Schemas for LLM File Generation Request
class PageToInclude(BaseModel):
    url: HttpUrl
    title: str
    description: Optional[str] = None

class LLMFileGenerationRequest(BaseModel):
    llms_txt_pages: List[PageToInclude]
    llms_full_txt_urls: List[HttpUrl]

# Schemas for Testimonials
class TestimonialBase(BaseModel):
    rating: int
    testimonial: str
    company: Optional[str] = None
    job_title: Optional[str] = None

class TestimonialCreate(TestimonialBase):
    pass

class TestimonialResponse(TestimonialBase):
    id: int
    user_id: int
    is_approved: bool
    is_featured: bool
    created_at: datetime
    approved_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class TestimonialPublic(BaseModel):
    id: int
    rating: int
    testimonial: str
    company: Optional[str] = None
    job_title: Optional[str] = None
    created_at: datetime
    # We'll add user initials in the API response
    user_initials: str

    class Config:
        from_attributes = True

# Schemas for Authentication
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Schemas for Payments
class CheckoutSessionRequest(BaseModel):
    price_id: str
    success_url: str
    cancel_url: str

class CheckoutSessionResponse(BaseModel):
    checkout_url: str
    session_id: str

class SubscriptionPlan(BaseModel):
    id: str
    name: str
    price: int  # Price in cents
    interval: str  # month, year
    stripe_price_id: str  # Stripe price ID for checkout
    features: List[str]
    
class WebhookEvent(BaseModel):
    id: str
    type: str
    data: dict 
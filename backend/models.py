from sqlalchemy import Boolean, Column, Integer, String, DateTime, func, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    
    # Subscription fields
    stripe_customer_id = Column(String(255), nullable=True)
    subscription_status = Column(String(50), default="inactive")  # inactive, active, past_due, canceled
    subscription_plan = Column(String(50), default="inactive")  # inactive, starter, professional, enterprise (removed free)
    subscription_id = Column(String(255), nullable=True)
    current_period_end = Column(DateTime, nullable=True)
    
    websites = relationship("Website", back_populates="user")
    testimonials = relationship("Testimonial", back_populates="user")

class Website(Base):
    __tablename__ = "websites"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    root_url = Column(String(255), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    status = Column(String(50), default="active")
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="websites")
    llm_files = relationship("LLMFile", back_populates="website")

class LLMFile(Base):
    __tablename__ = "llm_files"

    id = Column(Integer, primary_key=True)
    website_id = Column(Integer, ForeignKey("websites.id"), nullable=False)
    file_type = Column(String(50), nullable=False)  # e.g., 'llms_txt', 'llms_full_txt'
    content_path = Column(String(500), nullable=False)
    status = Column(String(50), default="pending")  # e.g., 'pending', 'generated', 'error'
    generated_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    
    website = relationship("Website", back_populates="llm_files")

class Testimonial(Base):
    __tablename__ = "testimonials"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    rating = Column(Integer, nullable=False)  # 1-5 stars
    testimonial = Column(Text, nullable=False)
    company = Column(String(255), nullable=True)
    job_title = Column(String(255), nullable=True)
    is_approved = Column(Boolean, default=False)  # Admin approval required
    is_featured = Column(Boolean, default=False)  # Can be featured on homepage
    created_at = Column(DateTime, server_default=func.now())
    approved_at = Column(DateTime, nullable=True)
    
    user = relationship("User", back_populates="testimonials")

class PaymentTransaction(Base):
    __tablename__ = "payment_transactions"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    stripe_payment_intent_id = Column(String(255), nullable=True)
    stripe_session_id = Column(String(255), nullable=True)
    amount = Column(Integer, nullable=False)  # Amount in cents
    currency = Column(String(3), default="USD")
    status = Column(String(50), nullable=False)  # succeeded, failed, pending, canceled
    payment_method = Column(String(50), nullable=True)  # card, paypal, etc.
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    user = relationship("User")

class SubscriptionHistory(Base):
    __tablename__ = "subscription_history"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    action = Column(String(50), nullable=False)  # created, updated, canceled, reactivated
    old_plan = Column(String(50), nullable=True)
    new_plan = Column(String(50), nullable=True)
    old_status = Column(String(50), nullable=True)
    new_status = Column(String(50), nullable=True)
    stripe_subscription_id = Column(String(255), nullable=True)
    reason = Column(Text, nullable=True)
    created_at = Column(DateTime, server_default=func.now())

    user = relationship("User") 
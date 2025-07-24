import os
import stripe
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from typing import List
import crud, schemas, models, auth
from database import get_db
import json
from datetime import datetime

# Initialize Stripe
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

# Check if Stripe is properly configured
def is_stripe_configured():
    return bool(os.getenv("STRIPE_SECRET_KEY") and os.getenv("STRIPE_SECRET_KEY") != "sk_test_your_stripe_secret_key_here")

router = APIRouter(
    prefix="/payments",
    tags=["payments"]
)

# Subscription plans configuration - NO FREE PLAN
SUBSCRIPTION_PLANS = [
    {
        "id": "starter",
        "name": "Starter",
        "price": 1900,  # €19.00 in cents
        "interval": "year",
        "stripe_price_id": os.getenv("STRIPE_STARTER_PRICE_ID", "price_1Ro0ILJqPMD8922QvDfxlI9w"),  # Configurable Stripe price ID
        "features": [
            "Up to 5 websites",
            "100 requests/hour",
            "1,000 requests/day",
            "Email support",
            "Analytics"
        ]
    },
    {
        "id": "professional",
        "name": "Professional", 
        "price": 4900,  # €49.00 in cents
        "interval": "year",
        "stripe_price_id": os.getenv("STRIPE_PROFESSIONAL_PRICE_ID", "price_1Ro0IyJqPMD8922QLiGPxWGe"),  # Configurable Stripe price ID
        "features": [
            "Up to 25 websites",
            "500 requests/hour", 
            "10,000 requests/day",
            "Priority email support",
            "Analytics"
        ]
    },
    {
        "id": "enterprise",
        "name": "Enterprise",
        "price": 9900,  # €99.00 in cents
        "interval": "year",
        "stripe_price_id": os.getenv("STRIPE_ENTERPRISE_PRICE_ID", "price_1Ro0JFJqPMD8922Qck6M42Tt"),  # Configurable Stripe price ID
        "features": [
            "Unlimited websites",
            "2,000 requests/hour",
            "50,000 requests/day", 
            "White-label options",
            "Custom integrations"
        ]
    }
]

def requires_active_subscription(current_user: models.User):
    """
    Check if user has an active paid subscription.
    Raises HTTPException if user doesn't have access.
    """
    if not current_user.subscription_status or current_user.subscription_status == "inactive":
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail="Active subscription required. Please upgrade your plan to access this feature."
        )
    
    if current_user.subscription_plan == "inactive":
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail="Active subscription required. Please choose a plan to access the platform."
        )
    
    if current_user.subscription_status in ["canceled", "past_due"]:
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail="Your subscription is inactive. Please update your payment method or reactivate your subscription."
        )

@router.get("/plans", response_model=List[schemas.SubscriptionPlan])
def get_subscription_plans():
    """
    Get all available subscription plans.
    """
    try:
        return [schemas.SubscriptionPlan(**plan) for plan in SUBSCRIPTION_PLANS]
    except Exception as e:
        # Return plans even if Stripe is not configured
        return [schemas.SubscriptionPlan(**plan) for plan in SUBSCRIPTION_PLANS]

@router.post("/create-checkout-session", response_model=schemas.CheckoutSessionResponse)
def create_checkout_session(
    request: schemas.CheckoutSessionRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """
    Create a Stripe checkout session for subscription.
    """
    if not is_stripe_configured():
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Payment system is not configured. Please contact support."
        )
    
    try:
        # Ensure user has a Stripe customer ID
        if not current_user.stripe_customer_id:
            # Create Stripe customer
            customer = stripe.Customer.create(
                email=current_user.email,
                metadata={"user_id": current_user.id}
            )
            
            # Update user with customer ID
            current_user.stripe_customer_id = customer.id
            db.commit()
        
        # Validate that the price_id is valid (basic check)
        if not request.price_id or not request.price_id.startswith("price_"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid price ID provided."
            )
        
        # Debug logging
        print(f"Creating checkout session for user {current_user.email} with price_id: {request.price_id}")
        print(f"Success URL: {request.success_url}")
        print(f"Cancel URL: {request.cancel_url}")
        
        # Create checkout session
        checkout_session = stripe.checkout.Session.create(
            customer=current_user.stripe_customer_id,
            payment_method_types=['card'],
            line_items=[{
                'price': request.price_id,
                'quantity': 1,
            }],
            mode='subscription',
            success_url=request.success_url + '?session_id={CHECKOUT_SESSION_ID}',
            cancel_url=request.cancel_url,
            metadata={
                "user_id": current_user.id
            }
        )
        
        return schemas.CheckoutSessionResponse(
            checkout_url=checkout_session.url,
            session_id=checkout_session.id
        )
        
    except stripe.error.StripeError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Stripe error: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal error: {str(e)}"
        )

@router.post("/webhook")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
    """
    Handle Stripe webhooks for subscription updates.
    """
    payload = await request.body()
    sig_header = request.headers.get('stripe-signature')
    webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, webhook_secret
        )
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")
    
    # Handle the event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        await handle_checkout_session_completed(session, db)
    
    elif event['type'] == 'invoice.payment_succeeded':
        invoice = event['data']['object']
        await handle_invoice_payment_succeeded(invoice, db)
    
    elif event['type'] == 'invoice.payment_failed':
        invoice = event['data']['object']
        await handle_invoice_payment_failed(invoice, db)
    
    elif event['type'] == 'customer.subscription.updated':
        subscription = event['data']['object']
        await handle_subscription_updated(subscription, db)
    
    elif event['type'] == 'customer.subscription.deleted':
        subscription = event['data']['object']
        await handle_subscription_deleted(subscription, db)
    
    return {"status": "success"}

async def handle_checkout_session_completed(session, db: Session):
    """Handle successful checkout session completion."""
    print(f"=== WEBHOOK DEBUG: Checkout session completed ===")
    print(f"Session data: {session}")
    
    user_id = session.get('metadata', {}).get('user_id')
    print(f"User ID from metadata: {user_id}")
    
    if not user_id:
        print("ERROR: No user_id found in session metadata")
        return
    
    user = crud.get_user_by_id(db, int(user_id))
    if not user:
        print(f"ERROR: User with ID {user_id} not found in database")
        return
    
    print(f"Found user: {user.email}")
    
    # Log payment transaction
    payment_transaction = models.PaymentTransaction(
        user_id=int(user_id),
        stripe_session_id=session.get('id'),
        amount=session.get('amount_total', 0),
        currency=session.get('currency', 'usd').upper(),
        status='succeeded',
        payment_method=session.get('payment_method_types', ['card'])[0] if session.get('payment_method_types') else 'card',
        description=f"Subscription payment - Session {session.get('id', '')[:20]}..."
    )
    db.add(payment_transaction)
    print("Payment transaction logged")
    
    # Get subscription details
    subscription_id = session.get('subscription')
    print(f"Subscription ID: {subscription_id}")
    
    if subscription_id:
        subscription = stripe.Subscription.retrieve(subscription_id)
        print(f"Retrieved subscription: {subscription.id}, status: {subscription.status}")
        
        # Track subscription history
        old_plan = user.subscription_plan
        old_status = user.subscription_status
        print(f"Current user plan: {old_plan}, status: {old_status}")
        
        # Update user subscription info
        user.subscription_id = subscription_id
        user.subscription_status = subscription.status
        
        # Safely get current_period_end
        try:
            if hasattr(subscription, 'current_period_end') and subscription.current_period_end:
                user.current_period_end = datetime.fromtimestamp(subscription.current_period_end)
                print(f"Set current_period_end: {user.current_period_end}")
            else:
                print("Warning: No current_period_end found in subscription")
                user.current_period_end = None
        except Exception as e:
            print(f"Error setting current_period_end: {e}")
            user.current_period_end = None
        
        # Determine plan from price ID
        price_id = None
        
        # Try to get price ID from subscription items
        if hasattr(subscription, 'items') and hasattr(subscription.items, 'data') and subscription.items.data:
            price_id = subscription.items.data[0].price.id
            print(f"Got price ID from items.data: {price_id}")
        elif hasattr(subscription, 'plan') and hasattr(subscription.plan, 'id'):
            price_id = subscription.plan.id
            print(f"Got price ID from plan.id: {price_id}")
        else:
            print("ERROR: Could not find price ID in subscription")
            print(f"Subscription: {subscription}")
            
        if not price_id:
            print("WARNING: No price ID found, defaulting to inactive plan")
            user.subscription_plan = 'inactive'
            db.commit()
            return
            
        print(f"Subscription price ID: {price_id}")
        print(f"Available plans: {[plan['stripe_price_id'] for plan in SUBSCRIPTION_PLANS]}")
        
        new_plan = 'free'  # Default fallback
        for plan in SUBSCRIPTION_PLANS:
            plan_price_id = plan["stripe_price_id"] 
            print(f"Checking plan {plan['id']}: {plan_price_id} vs {price_id}")
            if plan_price_id == price_id:
                new_plan = plan["id"]
                print(f"MATCH FOUND: Setting plan to {new_plan}")
                break
        
        # If no match found, try to match by extracting the base price ID (remove test_ prefix if exists)
        if new_plan == 'free':
            print("No exact match found, trying flexible matching...")
            price_id_base = price_id.replace('price_test_', 'price_').replace('price_', '')
            for plan in SUBSCRIPTION_PLANS:
                plan_price_base = plan["stripe_price_id"].replace('price_test_', 'price_').replace('price_', '')
                if plan_price_base == price_id_base:
                    new_plan = plan["id"]
                    print(f"FLEXIBLE MATCH FOUND: Setting plan to {new_plan}")
                    break
        
        if new_plan == 'free':
            print(f"WARNING: No matching plan found for price ID {price_id}")
            print("Available price IDs in SUBSCRIPTION_PLANS:")
            for plan in SUBSCRIPTION_PLANS:
                print(f"  - {plan['id']}: {plan['stripe_price_id']}")
        
        user.subscription_plan = new_plan
        print(f"Updated user plan to: {new_plan}")
        
        # Log subscription history
        subscription_history = models.SubscriptionHistory(
            user_id=int(user_id),
            action='created',
            old_plan=old_plan,
            new_plan=new_plan,
            old_status=old_status,
            new_status=subscription.status,
            stripe_subscription_id=subscription_id,
            reason='Subscription created via checkout'
        )
        db.add(subscription_history)
        
        db.commit()
        print(f"=== WEBHOOK SUCCESS: User {user.email} updated to {new_plan} plan ===")
    else:
        print("ERROR: No subscription ID found in session")

async def handle_invoice_payment_succeeded(invoice, db: Session):
    """Handle successful invoice payment."""
    customer_id = invoice.get('customer')
    if not customer_id:
        return
    
    user = db.query(models.User).filter(models.User.stripe_customer_id == customer_id).first()
    if not user:
        return
    
    # Update subscription status to active
    user.subscription_status = "active"
    db.commit()

async def handle_invoice_payment_failed(invoice, db: Session):
    """Handle failed invoice payment."""
    customer_id = invoice.get('customer')
    if not customer_id:
        return
    
    user = db.query(models.User).filter(models.User.stripe_customer_id == customer_id).first()
    if not user:
        return
    
    # Update subscription status to past_due
    user.subscription_status = "past_due"
    db.commit()

async def handle_subscription_updated(subscription, db: Session):
    """Handle subscription updates."""
    customer_id = subscription.get('customer')
    if not customer_id:
        return
    
    user = db.query(models.User).filter(models.User.stripe_customer_id == customer_id).first()
    if not user:
        return
    
    # Update subscription info
    user.subscription_status = subscription.status
    user.current_period_end = datetime.fromtimestamp(subscription.current_period_end)
    db.commit()

async def handle_subscription_deleted(subscription, db: Session):
    """Handle subscription cancellation."""
    customer_id = subscription.get('customer')
    if not customer_id:
        return
    
    user = db.query(models.User).filter(models.User.stripe_customer_id == customer_id).first()
    if not user:
        return
    
    # Update user to inactive plan (requires new subscription)
    user.subscription_status = "canceled"
    user.subscription_plan = "inactive"
    user.subscription_id = None
    user.current_period_end = None
    db.commit()

@router.get("/subscription")
def get_user_subscription(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """
    Get current user's subscription information.
    """
    return {
        "subscription_status": current_user.subscription_status,
        "subscription_plan": current_user.subscription_plan,
        "current_period_end": current_user.current_period_end,
        "stripe_customer_id": current_user.stripe_customer_id
    }

@router.post("/cancel-subscription")
def cancel_subscription(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """
    Cancel user's subscription.
    """
    if not current_user.subscription_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No active subscription found"
        )
    
    try:
        # Cancel subscription at period end
        stripe.Subscription.modify(
            current_user.subscription_id,
            cancel_at_period_end=True
        )
        
        return {"message": "Subscription will be canceled at the end of the current billing period"}
        
    except stripe.error.StripeError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Stripe error: {str(e)}"
        )

@router.post("/reactivate-subscription")
def reactivate_subscription(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """
    Reactivate a canceled subscription.
    """
    if not current_user.subscription_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No subscription found"
        )
    
    try:
        # Reactivate subscription
        stripe.Subscription.modify(
            current_user.subscription_id,
            cancel_at_period_end=False
        )
        
        return {"message": "Subscription reactivated successfully"}
        
    except stripe.error.StripeError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Stripe error: {str(e)}"
        ) 

@router.post("/manual-update-subscription")
def manual_update_subscription(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """
    Manually update subscription status - for testing/debugging purposes.
    This endpoint checks the user's Stripe customer and updates local subscription status.
    """
    print(f"=== MANUAL SYNC DEBUG: Starting for user {current_user.email} ===")
    
    if not current_user.stripe_customer_id:
        print(f"ERROR: User {current_user.email} has no Stripe customer ID")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User has no Stripe customer ID"
        )
    
    print(f"User stripe customer ID: {current_user.stripe_customer_id}")
    
    try:
        # Get customer's subscriptions from Stripe
        print("Fetching subscriptions from Stripe...")
        subscriptions_response = stripe.Subscription.list(
            customer=current_user.stripe_customer_id,
            status='all',
            limit=10
        )
        
        print(f"Stripe response type: {type(subscriptions_response)}")
        print(f"Stripe response: {subscriptions_response}")
        
        subscriptions = subscriptions_response.data if hasattr(subscriptions_response, 'data') else subscriptions_response
        print(f"Found {len(subscriptions)} subscriptions for customer {current_user.stripe_customer_id}")
        
        if not subscriptions:
            print("No subscriptions found - setting to inactive plan")
            # No subscriptions found, set to inactive (requires payment)
            current_user.subscription_status = "inactive"
            current_user.subscription_plan = "inactive"
            current_user.subscription_id = None
            current_user.current_period_end = None
            db.commit()
            return {"message": "No active subscriptions found. Subscription required to access platform."}
        
        # Get the most recent active subscription
        active_subscription = None
        print("Looking for active subscriptions...")
        for i, sub in enumerate(subscriptions):
            print(f"Subscription {i}: {sub.id}, status: {sub.status}")
            if sub.status in ['active', 'trialing']:
                active_subscription = sub
                print(f"Found active subscription: {sub.id}")
                break
        
        if not active_subscription and subscriptions:
            print("No active subscription found, using most recent")
            # Use the most recent subscription even if not active
            active_subscription = subscriptions[0]
        
        if active_subscription:
            print(f"Processing subscription: {active_subscription.id}")
            print(f"Status: {active_subscription.status}")
            
            # Get price ID from subscription - try multiple approaches
            price_id = None
            
            # First try: Direct plan.id (most reliable for subscriptions)
            if hasattr(active_subscription, 'plan') and hasattr(active_subscription.plan, 'id'):
                price_id = active_subscription.plan.id
                print(f"Got price ID from plan.id: {price_id}")
            
            # Second try: From items.data[0].price.id
            elif hasattr(active_subscription, 'items') and hasattr(active_subscription.items, 'data'):
                items = active_subscription.items.data
                if items and len(items) > 0 and hasattr(items[0], 'price') and hasattr(items[0].price, 'id'):
                    price_id = items[0].price.id
                    print(f"Got price ID from items[0].price.id: {price_id}")
            
            if not price_id:
                print("ERROR: Could not find price ID in subscription")
                print(f"Subscription plan: {getattr(active_subscription, 'plan', 'No plan attribute')}")
                print(f"Subscription items: {getattr(active_subscription, 'items', 'No items attribute')}")
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Could not determine subscription price ID"
                )
            
            print(f"Using price ID: {price_id}")
            
            # Update user subscription info
            current_user.subscription_id = active_subscription.id
            current_user.subscription_status = active_subscription.status
            
            # Safely get current_period_end
            try:
                if hasattr(active_subscription, 'current_period_end') and active_subscription.current_period_end:
                    current_user.current_period_end = datetime.fromtimestamp(active_subscription.current_period_end)
                    print(f"Set current_period_end: {current_user.current_period_end}")
                else:
                    print("Warning: No current_period_end found in subscription")
                    current_user.current_period_end = None
            except Exception as e:
                print(f"Error setting current_period_end: {e}")
                current_user.current_period_end = None
            
            # Determine plan from price ID
            new_plan = 'inactive'  # Default fallback (requires payment)
            for plan in SUBSCRIPTION_PLANS:
                plan_price_id = plan["stripe_price_id"]
                print(f"Plan {plan['id']}: {plan_price_id} vs {price_id}")
                if plan_price_id == price_id:
                    new_plan = plan["id"]
                    print(f"MATCH FOUND: Setting plan to {new_plan}")
                    break
            
            # If no match found, try to match by extracting the base price ID (remove test_ prefix if exists)
            if new_plan == 'inactive':
                print("No exact match found, trying flexible matching...")
                price_id_base = price_id.replace('price_test_', 'price_').replace('price_', '')
                for plan in SUBSCRIPTION_PLANS:
                    plan_price_base = plan["stripe_price_id"].replace('price_test_', 'price_').replace('price_', '')
                    if plan_price_base == price_id_base:
                        new_plan = plan["id"]
                        print(f"FLEXIBLE MATCH FOUND: Setting plan to {new_plan}")
                        break
            
            if new_plan == 'inactive':
                print(f"WARNING: No matching plan found for price ID {price_id}")
                print("Available price IDs in SUBSCRIPTION_PLANS:")
                for plan in SUBSCRIPTION_PLANS:
                    print(f"  - {plan['id']}: {plan['stripe_price_id']}")
                # Keep as inactive - user will need to contact support
            
            current_user.subscription_plan = new_plan
            db.commit()
            
            print(f"=== MANUAL SYNC SUCCESS: User updated to {new_plan} plan ===")
            
            return {
                "message": "Subscription updated successfully",
                "subscription_id": active_subscription.id,
                "status": active_subscription.status,
                "plan": new_plan,
                "price_id": price_id,
                "current_period_end": current_user.current_period_end.isoformat() if current_user.current_period_end else None
            }
        
        print("No valid subscription found")
        return {"message": "No valid subscription found"}
        
    except stripe.error.StripeError as e:
        print(f"Stripe error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Stripe error: {str(e)}"
        )
    except Exception as e:
        print(f"Internal error: {str(e)}")
        print(f"Error type: {type(e)}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal error: {str(e)}"
        ) 

@router.get("/config-check")
def check_stripe_config():
    """
    Check Stripe configuration for debugging purposes.
    """
    config_info = {
        "stripe_configured": is_stripe_configured(),
        "has_secret_key": bool(os.getenv("STRIPE_SECRET_KEY")),
        "secret_key_preview": os.getenv("STRIPE_SECRET_KEY", "NOT_SET")[:7] + "..." if os.getenv("STRIPE_SECRET_KEY") else "NOT_SET",
        "has_webhook_secret": bool(os.getenv("STRIPE_WEBHOOK_SECRET")),
        "price_ids": {
            "starter": os.getenv("STRIPE_STARTER_PRICE_ID", "NOT_SET"),
            "professional": os.getenv("STRIPE_PROFESSIONAL_PRICE_ID", "NOT_SET"), 
            "enterprise": os.getenv("STRIPE_ENTERPRISE_PRICE_ID", "NOT_SET")
        },
        "current_plans": [
            {
                "id": plan["id"],
                "stripe_price_id": plan["stripe_price_id"]
            }
            for plan in SUBSCRIPTION_PLANS
        ]
    }
    
    return config_info 

@router.get("/test-updated-code")
def test_updated_code():
    """
    Test endpoint to verify the server is running updated code.
    """
    return {
        "message": "Server is running UPDATED code with fixes!",
        "timestamp": datetime.now().isoformat(),
        "version": "v2_with_fixes"
    } 
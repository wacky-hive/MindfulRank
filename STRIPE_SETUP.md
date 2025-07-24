# Stripe Setup Guide

## Prerequisites
- Stripe account (create at https://stripe.com)
- Access to your Stripe Dashboard

## Step 1: Get Your Stripe Keys

1. **Log into your Stripe Dashboard**: https://dashboard.stripe.com
2. **For testing**, use Test Mode (toggle in top left)
3. **Go to Developers > API Keys**
4. **Copy your keys**:
   - **Publishable key** (starts with `pk_test_` or `pk_live_`)
   - **Secret key** (starts with `sk_test_` or `sk_live_`)

## Step 2: Create Products and Pricing

### In your Stripe Dashboard:

1. **Go to Products**: https://dashboard.stripe.com/products
2. **Click "Create product"** for each plan:

### Starter Plan:
- **Name**: `Starter Plan`
- **Description**: `Up to 5 websites, 100 requests/hour, 1,000 requests/day`
- **Pricing**:
  - **Price**: `$19.00`
  - **Billing period**: `Yearly`
  - **Price ID**: Copy this! (e.g., `price_1ABC123def456GHI`)

### Professional Plan:
- **Name**: `Professional Plan`  
- **Description**: `Up to 25 websites, 500 requests/hour, 10,000 requests/day`
- **Pricing**:
  - **Price**: `$49.00`
  - **Billing period**: `Yearly`
  - **Price ID**: Copy this! (e.g., `price_1DEF789ghi012JKL`)

### Enterprise Plan:
- **Name**: `Enterprise Plan`
- **Description**: `Unlimited websites, 2,000 requests/hour, 50,000 requests/day`
- **Pricing**:
  - **Price**: `$99.00`
  - **Billing period**: `Yearly`
  - **Price ID**: Copy this! (e.g., `price_1MNO345pqr678STU`)

## Step 3: Configure Webhooks

1. **Go to Developers > Webhooks**: https://dashboard.stripe.com/webhooks
2. **Click "Add endpoint"**
3. **Endpoint URL**: `https://yourdomain.com/payments/webhook` (replace with your domain)
4. **Listen to events**:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. **Copy the Webhook Secret** (starts with `whsec_`)

## Step 4: Update Your Environment Variables

Add these to your `backend/.env` file:

```env
# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret_here
```

## Step 5: Update Price IDs in Code

Edit `backend/routers/payments.py` and replace the placeholder price IDs:

```python
SUBSCRIPTION_PLANS = [
    {
        "id": "starter",
        "name": "Starter",
        "price": 1900,  # $19.00 in cents
        "interval": "year",
        "stripe_price_id": "price_1ABC123def456GHI",  # ← Replace with your actual Starter price ID
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
        "price": 4900,  # $49.00 in cents
        "interval": "year",
        "stripe_price_id": "price_1DEF789ghi012JKL",  # ← Replace with your actual Professional price ID
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
        "price": 9900,  # $99.00 in cents
        "interval": "year",
        "stripe_price_id": "price_1MNO345pqr678STU",  # ← Replace with your actual Enterprise price ID
        "features": [
            "Unlimited websites",
            "2,000 requests/hour",
            "50,000 requests/day",
            "White-label options",
            "Custom integrations"
        ]
    }
]
```

## Step 6: Test the Setup

1. **Restart your backend server** after updating the environment variables
2. **Test in Stripe's test mode** first
3. **Use test card**: `4242 4242 4242 4242` with any future date and CVC
4. **Check webhook events** in your Stripe Dashboard

## Step 7: Go Live

1. **Switch to Live mode** in Stripe Dashboard
2. **Get your live keys** (pk_live_ and sk_live_)
3. **Update your .env** with live keys
4. **Update webhook endpoint** to use your production domain
5. **Test with real payment methods**

## Troubleshooting

### Common Issues:

1. **"Payment system not configured"**
   - Check that your `.env` file has valid Stripe keys
   - Restart your backend server

2. **"Invalid price ID"**  
   - Verify the price IDs in your code match those in Stripe Dashboard
   - Make sure you're using the correct test/live keys

3. **Webhook failures**
   - Check your webhook endpoint URL is accessible
   - Verify webhook secret matches your `.env` file

### Test Cards:

- **Success**: `4242424242424242`
- **Declined**: `4000000000000002` 
- **3D Secure**: `4000002500003155`

For more test cards: https://stripe.com/docs/testing#cards

## Support

- **Stripe Documentation**: https://stripe.com/docs
- **Stripe Support**: https://support.stripe.com 
-- Migration script to add payment support to existing databases
-- Run this if you already have a database and need to add payment features

USE llm_seo;

-- Add subscription fields to existing users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS stripe_customer_id VARCHAR(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS subscription_status VARCHAR(50) DEFAULT 'inactive',
ADD COLUMN IF NOT EXISTS subscription_plan VARCHAR(50) DEFAULT 'free',
ADD COLUMN IF NOT EXISTS subscription_id VARCHAR(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS current_period_end TIMESTAMP NULL;

-- Create payment_transactions table for tracking payment history
CREATE TABLE IF NOT EXISTS payment_transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    stripe_payment_intent_id VARCHAR(255),
    stripe_session_id VARCHAR(255),
    amount INT NOT NULL, -- Amount in cents
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(50) NOT NULL, -- succeeded, failed, pending, canceled
    payment_method VARCHAR(50), -- card, paypal, etc.
    description TEXT,
    payment_metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_stripe_payment_intent (stripe_payment_intent_id),
    INDEX idx_status (status)
);

-- Create subscription_history table for tracking subscription changes
CREATE TABLE IF NOT EXISTS subscription_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    action VARCHAR(50) NOT NULL, -- created, updated, canceled, reactivated
    old_plan VARCHAR(50),
    new_plan VARCHAR(50),
    old_status VARCHAR(50),
    new_status VARCHAR(50),
    stripe_subscription_id VARCHAR(255),
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action)
);

-- Verify migration completed successfully
SELECT 'Migration completed successfully!' as status;
SHOW TABLES; 
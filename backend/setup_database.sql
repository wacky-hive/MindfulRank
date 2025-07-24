-- Create the database
CREATE DATABASE IF NOT EXISTS llm_seo;
USE llm_seo;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Subscription fields
    stripe_customer_id VARCHAR(255) DEFAULT NULL,
    subscription_status VARCHAR(50) DEFAULT 'inactive',
    subscription_plan VARCHAR(50) DEFAULT 'free',
    subscription_id VARCHAR(255) DEFAULT NULL,
    current_period_end TIMESTAMP NULL
);

-- Create websites table
CREATE TABLE IF NOT EXISTS websites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    root_url VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create llm_files table
CREATE TABLE IF NOT EXISTS llm_files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    website_id INT NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    content_path VARCHAR(500),
    status VARCHAR(50) DEFAULT 'pending',
    generated_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (website_id) REFERENCES websites(id) ON DELETE CASCADE
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    testimonial TEXT NOT NULL,
    company VARCHAR(255),
    job_title VARCHAR(255),
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

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

-- Show tables to verify creation
SHOW TABLES; 
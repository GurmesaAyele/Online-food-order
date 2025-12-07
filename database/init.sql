-- Create database
CREATE DATABASE IF NOT EXISTS fooddelivery;
USE fooddelivery;

-- Users table is created by SQLAlchemy
-- This file contains additional indexes and optimizations

-- Add indexes for better query performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_restaurants_verified ON restaurants(is_verified);
CREATE INDEX idx_restaurants_location ON restaurants(latitude, longitude);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_restaurant ON orders(restaurant_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_menu_items_restaurant ON menu_items(restaurant_id);
CREATE INDEX idx_riders_status ON riders(status);

-- Sample data for testing
INSERT INTO users (email, hashed_password, full_name, phone, role, is_active, is_verified) VALUES
('admin@foodhub.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYzS3MV7skW', 'Admin User', '1234567890', 'admin', 1, 1),
('restaurant@test.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYzS3MV7skW', 'Test Restaurant', '1234567891', 'restaurant', 1, 1),
('customer@test.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYzS3MV7skW', 'Test Customer', '1234567892', 'customer', 1, 1),
('rider@test.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYzS3MV7skW', 'Test Rider', '1234567893', 'rider', 1, 1);

-- Note: Password for all test accounts is 'password123'

-- Add admin user manually
-- Password: admin123 (hashed with bcrypt)
INSERT INTO users (email, password, full_name, phone, role, created_at)
VALUES (
    'admin@foodhub.com',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYfQPz.B4qa',
    'Admin User',
    '1234567890',
    'admin',
    NOW()
);

-- Add a test customer
INSERT INTO users (email, password, full_name, phone, role, created_at)
VALUES (
    'customer@test.com',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYfQPz.B4qa',
    'Test Customer',
    '1111111111',
    'customer',
    NOW()
);

-- Add a test restaurant
INSERT INTO users (email, password, full_name, phone, role, created_at)
VALUES (
    'restaurant@test.com',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYfQPz.B4qa',
    'Test Restaurant',
    '2222222222',
    'restaurant',
    NOW()
);

-- Add a test rider
INSERT INTO users (email, password, full_name, phone, role, created_at)
VALUES (
    'rider@test.com',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYfQPz.B4qa',
    'Test Rider',
    '3333333333',
    'rider',
    NOW()
);

-- FoodieFleet PostgreSQL Database Schema

-- Drop existing tables for clean initialization
DROP TABLE IF EXISTS ratings CASCADE;
DROP TABLE IF EXISTS ordered_items CASCADE;
DROP TABLE IF EXISTS cart_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS restaurants CASCADE;
DROP TABLE IF EXISTS drivers CASCADE;
DROP TABLE IF EXISTS address CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 1. Users Table
-- Uses built-in gen_random_uuid() and native UUID type 
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT,
    auth_provider_username VARCHAR(255) UNIQUE,
    access_token TEXT
);

-- 2. Sessions Table
-- Ephemeral user sessions with secure, unguessable UUIDs
CREATE TABLE sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Address Table
-- Internal address record (uses auto-increment SERIAL instead of UUID)
CREATE TABLE address (
    id SERIAL PRIMARY KEY,
    address TEXT,
    latitude NUMERIC(10, 7) NOT NULL,
    longitude NUMERIC(10, 7) NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE
);

-- 4. Restaurants Table
-- Top-level public business entity requiring UUID primary key
CREATE TABLE restaurants (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    pictures VARCHAR(512),
    timings JSONB,
    open_timings INT,
    close_timings INT,
    override_timings VARCHAR(50),
    location JSONB,
    is_open BOOLEAN DEFAULT FALSE,
    owner_id UUID REFERENCES users(id) ON DELETE CASCADE
);

-- 5. Items Table (Menu Items)
-- Menu item details for restaurants
CREATE TABLE items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    is_vegetarian BOOLEAN DEFAULT FALSE NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    submenu VARCHAR(100),
    restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- 6. Cart Items Table
-- Junction table: Uses composite primary key (user_id, item_id) - no UUID surrogate needed
CREATE TABLE cart_items (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    item_id UUID REFERENCES items(id) ON DELETE CASCADE,
    quantity NUMERIC DEFAULT 1,
    PRIMARY KEY (user_id, item_id)
);

-- 7. Orders Table
-- Public customer orders requiring UUID for non-enumerable tracking
CREATE TABLE orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    status VARCHAR(50) DEFAULT 'PLACED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    pickup_time TIMESTAMP,
    delivered_time TIMESTAMP,
    total_amt NUMERIC(10, 2) DEFAULT 0,
    delivery_location JSONB,
    customer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    restaurant_id UUID REFERENCES restaurants(id) ON UPDATE CASCADE ON DELETE CASCADE,
    driver_id UUID REFERENCES users(id) ON DELETE SET NULL
);

-- 8. Ordered Items Table
-- Junction table: Uses composite primary key (order_id, item_id) - no UUID surrogate needed
CREATE TABLE ordered_items (
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    item_id UUID REFERENCES items(id) ON DELETE CASCADE,
    quantity NUMERIC DEFAULT 1,
    PRIMARY KEY (order_id, item_id)
);

-- 9. Drivers Table
-- 1-to-1 extension table: Reuses user_id as PRIMARY KEY - no UUID surrogate needed
CREATE TABLE drivers (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(255) DEFAULT 'AVAILABLE'
);

-- 10. Ratings Table
-- Internal feedback entity (uses auto-increment SERIAL instead of UUID)
CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    rating NUMERIC(2, 1) NOT NULL,
    review TEXT,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE
);


-- =============================================================================
-- SAMPLE DATA
-- =============================================================================

-- Sample Users (default password: 'password123')
INSERT INTO users (id, name, phone, email, password_hash, auth_provider_username) VALUES
('11111111-1111-1111-1111-111111111111', 'Mario Rossi', '+1-555-0101', 'mario@pizzeria.com', '$2b$10$EjNyOtXK49lX5ng84.w7NOia7K.PVF66KLSY6OZ5cVtGOgBrRUvEO', 'mario_owner'),
('22222222-2222-2222-2222-222222222222', 'Alice Smith', '+1-555-0102', 'alice@example.com', '$2b$10$EjNyOtXK49lX5ng84.w7NOia7K.PVF66KLSY6OZ5cVtGOgBrRUvEO', 'alice_s'),
('33333333-3333-3333-3333-333333333333', 'Bob Johnson', '+1-555-0103', 'bob@example.com', '$2b$10$EjNyOtXK49lX5ng84.w7NOia7K.PVF66KLSY6OZ5cVtGOgBrRUvEO', 'bob_j'),
('44444444-4444-4444-4444-444444444444', 'Charlie Driver', '+1-555-0104', 'charlie@fleet.com', '$2b$10$EjNyOtXK49lX5ng84.w7NOia7K.PVF66KLSY6OZ5cVtGOgBrRUvEO', 'charlie_d');

-- Sample Sessions
INSERT INTO sessions (id, user_id) VALUES
('55555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222');

-- Sample Addresses (auto-increment SERIAL)
INSERT INTO address (address, latitude, longitude, user_id) VALUES
('123 Main St, Springfield', 37.7749290, -122.4194160, '22222222-2222-2222-2222-222222222222'),
('456 Market St, Springfield', 37.7833180, -122.4037250, '33333333-3333-3333-3333-333333333333');

-- Sample Drivers
INSERT INTO drivers (user_id, status) VALUES
('44444444-4444-4444-4444-444444444444', 'AVAILABLE');

-- Sample Restaurants
INSERT INTO restaurants (id, name, description, pictures, timings, open_timings, close_timings, is_open, owner_id, location) VALUES
('66666666-6666-6666-6666-666666666666', 'Mario''s Authentic Pizzeria', 'Delicious wood-fired pizzas and homemade pasta.', 'https://images.example.com/pizzeria.jpg', '{"open": "1000", "close": "2200"}'::jsonb, 1000, 2200, TRUE, '11111111-1111-1111-1111-111111111111', '{"lat": 37.7749, "lng": -122.4194}'::jsonb);

-- Sample Menu Items
INSERT INTO items (id, name, is_vegetarian, description, price, submenu, restaurant_id) VALUES
('77777777-7777-7777-7777-777777777777', 'Margherita Pizza', TRUE, 'Classic cheese and basil pizza', 14.99, 'Pizzas', '66666666-6666-6666-6666-666666666666'),
('88888888-8888-8888-8888-888888888888', 'Pepperoni Pizza', FALSE, 'Loaded with spicy pepperoni slices', 16.99, 'Pizzas', '66666666-6666-6666-6666-666666666666'),
('99999999-9999-9999-9999-999999999999', 'Garlic Knots', TRUE, 'Fresh baked bread with garlic butter', 5.99, 'Appetizers', '66666666-6666-6666-6666-666666666666');

-- Sample Cart Items
INSERT INTO cart_items (user_id, item_id, quantity) VALUES
('22222222-2222-2222-2222-222222222222', '77777777-7777-7777-7777-777777777777', 2);

-- Sample Orders
INSERT INTO orders (id, status, total_amt, customer_id, restaurant_id, driver_id, delivery_location) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'DELIVERED', 37.97, '33333333-3333-3333-3333-333333333333', '66666666-6666-6666-6666-666666666666', '44444444-4444-4444-4444-444444444444', '{"address": "456 Market St", "lat": 37.7833, "lng": -122.4037}'::jsonb);

-- Sample Ordered Items
INSERT INTO ordered_items (order_id, item_id, quantity) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '77777777-7777-7777-7777-777777777777', 2),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '99999999-9999-9999-9999-999999999999', 1);

-- Sample Ratings
INSERT INTO ratings (rating, review, order_id, user_id) VALUES
(5.0, 'Amazing pizza, super fast delivery!', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333333');
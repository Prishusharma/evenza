/*
  # Create Events and Bookings Schema for Evenza

  ## Overview
  This migration sets up the complete database schema for the Evenza event planning and booking platform.

  ## New Tables
  
  ### 1. `categories`
  - `id` (uuid, primary key) - Unique category identifier
  - `name` (text) - Category name (Music, Tech, Workshops, etc.)
  - `icon` (text) - Icon name for the category
  - `description` (text) - Category description
  - `created_at` (timestamptz) - Creation timestamp

  ### 2. `events`
  - `id` (uuid, primary key) - Unique event identifier
  - `title` (text) - Event title
  - `description` (text) - Event description
  - `category_id` (uuid, foreign key) - Reference to categories table
  - `date` (date) - Event date
  - `time` (text) - Event time
  - `location` (text) - Event location
  - `image_url` (text) - Event image URL
  - `available_seats` (integer) - Current available seats
  - `total_seats` (integer) - Total seats capacity
  - `price` (numeric) - Ticket price
  - `created_at` (timestamptz) - Creation timestamp

  ### 3. `bookings`
  - `id` (uuid, primary key) - Unique booking identifier
  - `user_id` (uuid, foreign key) - Reference to auth.users
  - `event_id` (uuid, foreign key) - Reference to events table
  - `seats_booked` (integer) - Number of seats booked
  - `booking_date` (date) - Date of booking
  - `status` (text) - Booking status (confirmed, cancelled, pending)
  - `total_price` (numeric) - Total booking price
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - Enable RLS on all tables
  - Public can read events and categories
  - Authenticated users can create bookings
  - Users can only view/modify their own bookings
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  date date NOT NULL,
  time text NOT NULL,
  location text NOT NULL,
  image_url text NOT NULL,
  available_seats integer NOT NULL DEFAULT 0,
  total_seats integer NOT NULL DEFAULT 0,
  price numeric(10, 2) NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  event_id uuid REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  seats_booked integer NOT NULL DEFAULT 1,
  booking_date date NOT NULL DEFAULT CURRENT_DATE,
  status text NOT NULL DEFAULT 'confirmed',
  total_price numeric(10, 2) NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Categories policies (public read)
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO public
  USING (true);

-- Events policies (public read)
CREATE POLICY "Anyone can view events"
  ON events FOR SELECT
  TO public
  USING (true);

-- Bookings policies (authenticated users)
CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookings"
  ON bookings FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category_id);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_event ON bookings(event_id);
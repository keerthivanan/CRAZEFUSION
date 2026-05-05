-- Run this in your Supabase SQL Editor
-- Go to: https://supabase.com/dashboard → your project → SQL Editor → New Query

-- Drop if re-running
DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id            INTEGER PRIMARY KEY,        -- poster's own number (2811, 2812, etc.)
  name          TEXT NOT NULL,
  category      TEXT NOT NULL,
  sub           TEXT,
  price         NUMERIC(10,2) NOT NULL,
  original_price NUMERIC(10,2),
  badge         TEXT,
  img           TEXT NOT NULL,              -- mockup (room scene)
  img2          TEXT NOT NULL,              -- original poster
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Fast category filter
CREATE INDEX idx_products_category ON products(category);

-- Public reads (shop is public)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read" ON products FOR SELECT USING (true);

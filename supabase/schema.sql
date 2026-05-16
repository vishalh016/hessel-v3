-- ============================================================
-- HESSEL — Supabase Database Schema
-- Version: 1.0  |  BRD §12.2
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- ============================================================
-- 1. PACKAGES
-- Catering tier definitions (Silver, Gold, Royal, Corporate)
-- ============================================================
CREATE TABLE IF NOT EXISTS packages (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name                  TEXT NOT NULL,
  positioning           TEXT NOT NULL,           -- e.g. "Elegant essentials for intimate occasions"
  base_price_per_plate  NUMERIC(10,2) NOT NULL,  -- INR, used by pricing engine
  min_guests            INTEGER NOT NULL,
  max_guests            INTEGER NOT NULL,
  display_order         INTEGER NOT NULL DEFAULT 0,
  is_active             BOOLEAN NOT NULL DEFAULT true,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 2. MENU CATEGORIES
-- Dish groupings with selection constraints
-- ============================================================
CREATE TABLE IF NOT EXISTS menu_categories (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            TEXT NOT NULL,                 -- e.g. "Starters", "Main Course"
  min_selections  INTEGER NOT NULL DEFAULT 1,
  max_selections  INTEGER NOT NULL DEFAULT 8,
  display_order   INTEGER NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 3. MENU ITEMS
-- Individual dishes, linked to categories and optionally packages
-- ============================================================
CREATE TABLE IF NOT EXISTS menu_items (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id           UUID NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
  name                  TEXT NOT NULL,
  description           TEXT,
  price_per_plate_addon NUMERIC(10,2) NOT NULL DEFAULT 0,  -- 0 = included in package
  dietary_flags         TEXT[] NOT NULL DEFAULT '{}',      -- 'veg','vegan','gluten-free'
  package_ids           UUID[] NOT NULL DEFAULT '{}',      -- empty = available in all packages
  is_active             BOOLEAN NOT NULL DEFAULT true,
  display_order         INTEGER NOT NULL DEFAULT 0,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 4. TESTIMONIALS
-- Client quotes, referenced by gallery items
-- ============================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote         TEXT NOT NULL,
  event_type    TEXT NOT NULL,    -- e.g. "Royal Wedding", "Corporate Gala"
  guest_count   INTEGER,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active     BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 5. GALLERY ITEMS
-- Cloudinary-hosted event photography, optionally paired with testimonials
-- ============================================================
CREATE TABLE IF NOT EXISTS gallery_items (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cloudinary_url        TEXT NOT NULL,
  cloudinary_public_id  TEXT NOT NULL,             -- for deletion / transformation
  alt_text              TEXT NOT NULL DEFAULT '',
  display_order         INTEGER NOT NULL DEFAULT 0,
  linked_testimonial_id UUID REFERENCES testimonials(id) ON DELETE SET NULL,
  is_active             BOOLEAN NOT NULL DEFAULT true,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 6. QUOTATION REQUESTS
-- Menu Builder submissions — one row per lead
-- ============================================================
CREATE TABLE IF NOT EXISTS quotation_requests (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type      TEXT NOT NULL,
  guest_count     INTEGER NOT NULL,
  package_id      UUID REFERENCES packages(id) ON DELETE SET NULL,
  selected_dishes UUID[] NOT NULL DEFAULT '{}',    -- array of menu_items.id
  estimate        NUMERIC(12,2),                   -- display-only, not binding
  status          TEXT NOT NULL DEFAULT 'new'      -- new | contacted | closed
                    CHECK (status IN ('new', 'contacted', 'closed')),
  notes           TEXT,                            -- admin notes
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 7. SITE CONFIG
-- Admin-editable key-value content (no redeploy needed)
-- ============================================================
CREATE TABLE IF NOT EXISTS site_config (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_active    ON menu_items(is_active);
CREATE INDEX IF NOT EXISTS idx_gallery_order        ON gallery_items(display_order);
CREATE INDEX IF NOT EXISTS idx_quotations_status    ON quotation_requests(status);
CREATE INDEX IF NOT EXISTS idx_quotations_created   ON quotation_requests(created_at DESC);

-- ============================================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_packages_updated_at
  BEFORE UPDATE ON packages
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_menu_items_updated_at
  BEFORE UPDATE ON menu_items
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_gallery_items_updated_at
  BEFORE UPDATE ON gallery_items
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_quotations_updated_at
  BEFORE UPDATE ON quotation_requests
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_site_config_updated_at
  BEFORE UPDATE ON site_config
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE packages           ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_categories    ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items         ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials       ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items      ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config        ENABLE ROW LEVEL SECURITY;

-- Public: read-only for menu/gallery data (used by the website)
CREATE POLICY "public_read_packages"
  ON packages FOR SELECT TO anon USING (is_active = true);

CREATE POLICY "public_read_menu_categories"
  ON menu_categories FOR SELECT TO anon USING (true);

CREATE POLICY "public_read_menu_items"
  ON menu_items FOR SELECT TO anon USING (is_active = true);

CREATE POLICY "public_read_testimonials"
  ON testimonials FOR SELECT TO anon USING (is_active = true);

CREATE POLICY "public_read_gallery"
  ON gallery_items FOR SELECT TO anon USING (is_active = true);

-- Public: insert quotation requests (Menu Builder submission)
CREATE POLICY "public_insert_quotations"
  ON quotation_requests FOR INSERT TO anon WITH CHECK (true);

-- All writes and admin reads go through service role (bypasses RLS)
-- No additional policies needed — service role key is server-side only

-- ============================================================
-- SEED DATA
-- ============================================================

-- Site config defaults
INSERT INTO site_config (key, value) VALUES
  ('hero_headline',     'Every Occasion, Perfectly Served'),
  ('hero_subheadline',  'Luxury catering crafted for your most cherished moments.'),
  ('cta_primary',       'Build Your Menu'),
  ('cta_secondary',     'View Packages'),
  ('whatsapp_number',   '919000000000'),
  ('instagram_url',     'https://instagram.com/hessel'),
  ('facebook_url',      'https://facebook.com/hessel'),
  ('email',             'hello@hessel.in'),
  ('phone',             '+91 90000 00000')
ON CONFLICT (key) DO NOTHING;

-- Menu categories
INSERT INTO menu_categories (name, min_selections, max_selections, display_order) VALUES
  ('Starters',     2, 8, 1),
  ('Main Course',  2, 8, 2),
  ('Desserts',     1, 6, 3),
  ('Drinks',       1, 4, 4),
  ('Add-ons',      0, 99, 5)
ON CONFLICT DO NOTHING;

-- Packages
INSERT INTO packages (name, positioning, base_price_per_plate, min_guests, max_guests, display_order) VALUES
  ('Silver',    'Elegant essentials for intimate occasions',        650,   20,   100, 1),
  ('Gold',      'Elevated experience with extended menu choice',    950,   50,   300, 2),
  ('Royal',     'Signature Hessel experience, no compromise',      1400,  100,  1000, 3),
  ('Corporate', 'Professional catering for business events',        800,   30,   500, 4)
ON CONFLICT DO NOTHING;

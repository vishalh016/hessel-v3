# Hessel — Database Schema Reference
> BRD §12.2 | Supabase / PostgreSQL

## Tables Overview

| Table | Purpose | RLS |
|---|---|---|
| `packages` | Catering tier definitions | Public read (active only) |
| `menu_categories` | Dish groupings with selection rules | Public read |
| `menu_items` | Individual dishes | Public read (active only) |
| `testimonials` | Client quotes | Public read (active only) |
| `gallery_items` | Cloudinary-hosted photography | Public read (active only) |
| `quotation_requests` | Menu Builder lead submissions | Anon insert; service role read/update |
| `site_config` | Admin-editable key-value content | Service role only |

---

## Table: `packages`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID PK | `uuid_generate_v4()` |
| `name` | TEXT | Silver / Gold / Royal / Corporate |
| `positioning` | TEXT | One-line brand description |
| `base_price_per_plate` | NUMERIC(10,2) | INR — used by pricing engine |
| `min_guests` | INTEGER | Min headcount for package |
| `max_guests` | INTEGER | Max headcount for package |
| `display_order` | INTEGER | Sort order on Packages section |
| `is_active` | BOOLEAN | `false` = hidden from public |
| `created_at` | TIMESTAMPTZ | Auto |
| `updated_at` | TIMESTAMPTZ | Auto via trigger |

**Seed values:** Silver (₹650/plate, 20–100), Gold (₹950/plate, 50–300), Royal (₹1400/plate, 100–1000), Corporate (₹800/plate, 30–500)

---

## Table: `menu_categories`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID PK | |
| `name` | TEXT | Starters / Main Course / Desserts / Drinks / Add-ons |
| `min_selections` | INTEGER | Min dishes user must pick |
| `max_selections` | INTEGER | Max dishes user can pick |
| `display_order` | INTEGER | Order in Menu Builder Step 4 |
| `created_at` | TIMESTAMPTZ | Auto |

---

## Table: `menu_items`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID PK | |
| `category_id` | UUID FK → `menu_categories.id` | Cascade delete |
| `name` | TEXT | Dish name |
| `description` | TEXT nullable | Optional short description |
| `price_per_plate_addon` | NUMERIC(10,2) | `0` = included in package base price |
| `dietary_flags` | TEXT[] | `'veg'`, `'vegan'`, `'gluten-free'` |
| `package_ids` | UUID[] | Empty array = available in all packages |
| `is_active` | BOOLEAN | `false` = hidden from public |
| `display_order` | INTEGER | Sort order within category |
| `created_at` | TIMESTAMPTZ | Auto |
| `updated_at` | TIMESTAMPTZ | Auto via trigger |

---

## Table: `testimonials`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID PK | |
| `quote` | TEXT | Max 2–3 sentences (BRD §9.2) |
| `event_type` | TEXT | e.g. "Royal Wedding", "Corporate Gala" |
| `guest_count` | INTEGER nullable | Optional — displayed in Gallery section |
| `display_order` | INTEGER | |
| `is_active` | BOOLEAN | |
| `created_at` | TIMESTAMPTZ | Auto |

---

## Table: `gallery_items`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID PK | |
| `cloudinary_url` | TEXT | Full Cloudinary delivery URL |
| `cloudinary_public_id` | TEXT | Used for deletion and transformations |
| `alt_text` | TEXT | Required for WCAG AA compliance |
| `display_order` | INTEGER | Film Strip order |
| `linked_testimonial_id` | UUID FK → `testimonials.id` nullable | SET NULL on delete |
| `is_active` | BOOLEAN | |
| `created_at` | TIMESTAMPTZ | Auto |
| `updated_at` | TIMESTAMPTZ | Auto via trigger |

---

## Table: `quotation_requests`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID PK | |
| `event_type` | TEXT | From Step 1 |
| `guest_count` | INTEGER | From Step 2 |
| `package_id` | UUID FK → `packages.id` nullable | SET NULL if package deleted |
| `selected_dishes` | UUID[] | Array of `menu_items.id` |
| `estimate` | NUMERIC(12,2) nullable | Display-only — not binding |
| `status` | TEXT | `new` / `contacted` / `closed` |
| `notes` | TEXT nullable | Admin notes |
| `created_at` | TIMESTAMPTZ | Auto |
| `updated_at` | TIMESTAMPTZ | Auto via trigger |

---

## Table: `site_config`

| Key | Default Value | Purpose |
|---|---|---|
| `hero_headline` | Every Occasion, Perfectly Served | Hero H1 |
| `hero_subheadline` | Luxury catering crafted for... | Hero sub-copy |
| `cta_primary` | Build Your Menu | Primary hero CTA label |
| `cta_secondary` | View Packages | Secondary hero CTA label |
| `whatsapp_number` | 919000000000 | wa.me link number |
| `instagram_url` | https://instagram.com/hessel | Instagram link |
| `facebook_url` | https://facebook.com/hessel | Facebook link |
| `email` | hello@hessel.in | Contact email |
| `phone` | +91 90000 00000 | Contact phone |

---

## Row Level Security Summary

```sql
-- Public can SELECT active rows from content tables
packages, menu_categories, menu_items, testimonials, gallery_items → anon SELECT (is_active = true)

-- Public can INSERT quotation leads
quotation_requests → anon INSERT

-- All writes and admin reads → service role key only (bypasses RLS)
-- Never expose SUPABASE_SERVICE_ROLE_KEY to the browser
```

---

## Pricing Formula

```
Total Estimate = (base_price_per_plate × guest_count)
               + Σ (price_per_plate_addon × guest_count) for each selected dish
```

Items with `price_per_plate_addon = 0` are included in the package at no extra charge.

---

## Indexes

```sql
idx_menu_items_category   → menu_items(category_id)
idx_menu_items_active     → menu_items(is_active)
idx_gallery_order         → gallery_items(display_order)
idx_quotations_status     → quotation_requests(status)
idx_quotations_created    → quotation_requests(created_at DESC)
```

---

## How to Run the Schema

1. Open your Supabase project dashboard
2. Navigate to **SQL Editor** (left sidebar)
3. Create a new query
4. Paste the full contents of `supabase/schema.sql`
5. Click **Run**
6. Verify tables appear in **Table Editor**

> [!IMPORTANT]
> Run the schema on a **fresh project** only. If re-running, use `DROP TABLE IF EXISTS` statements or apply individual `ALTER TABLE` migrations to avoid conflicts.

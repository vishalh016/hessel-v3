// ============================================================
// Supabase TypeScript Types — generated from schema.sql
// Keep in sync with the database schema manually until
// `supabase gen types` is wired into the CI pipeline.
// ============================================================

export type DietaryFlag = "veg" | "vegan" | "gluten-free";
export type QuotationStatus = "new" | "contacted" | "closed";

export interface Package {
  id: string;
  name: string;
  positioning: string;
  base_price_per_plate: number;
  min_guests: number;
  max_guests: number;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  min_selections: number;
  max_selections: number;
  display_order: number;
  created_at: string;
}

export interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price_per_plate_addon: number;
  dietary_flags: DietaryFlag[];
  package_ids: string[];           // empty = available in all packages
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  event_type: string;
  guest_count: number | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  cloudinary_url: string;
  cloudinary_public_id: string;
  alt_text: string;
  display_order: number;
  linked_testimonial_id: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // Joined fields (optional — populated via select)
  testimonials?: Testimonial | null;
}

export interface QuotationRequest {
  id: string;
  event_type: string;
  guest_count: number;
  package_id: string | null;
  selected_dishes: string[];
  estimate: number | null;
  status: QuotationStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  packages?: Package | null;
}

export interface SiteConfig {
  key: string;
  value: string;
  updated_at: string;
}

// ── Menu Builder state (sessionStorage shape) ────────────────
export interface MenuBuilderState {
  step: number;
  event_type: string | null;
  guest_count: number | null;
  package_id: string | null;
  selected_dishes: string[];        // array of menu_items.id
  estimate: number | null;
}

// ── API response shapes ──────────────────────────────────────
export interface MenuApiResponse {
  packages: Package[];
  categories: (MenuCategory & { items: MenuItem[] })[];
}

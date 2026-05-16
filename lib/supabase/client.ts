import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase BROWSER client.
 * Uses the public anon key — safe to expose.
 * For READ operations on public tables (packages, menu, gallery).
 * For INSERT on quotation_requests (anonymous allowed via RLS).
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

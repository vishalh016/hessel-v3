import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { MenuApiResponse } from "@/lib/supabase/types";

/**
 * GET /api/menu
 * Returns all active packages and menu categories with their items.
 * Public — no auth required. RLS allows anon reads.
 */
export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();

    const [packagesResult, categoriesResult, itemsResult] = await Promise.all([
      supabase
        .from("packages")
        .select("*")
        .eq("is_active", true)
        .order("display_order"),
      supabase
        .from("menu_categories")
        .select("*")
        .order("display_order"),
      supabase
        .from("menu_items")
        .select("*")
        .eq("is_active", true)
        .order("display_order"),
    ]);

    if (packagesResult.error) throw packagesResult.error;
    if (categoriesResult.error) throw categoriesResult.error;
    if (itemsResult.error) throw itemsResult.error;

    // Nest items under their categories
    const categories = categoriesResult.data.map((cat) => ({
      ...cat,
      items: itemsResult.data.filter((item) => item.category_id === cat.id),
    }));

    const response: MenuApiResponse = {
      packages: packagesResult.data,
      categories,
    };

    return NextResponse.json(response, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (error) {
    console.error("[GET /api/menu]", error);
    return NextResponse.json(
      { error: "Failed to load menu data." },
      { status: 500 }
    );
  }
}

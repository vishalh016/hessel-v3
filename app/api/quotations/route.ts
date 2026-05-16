import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

/**
 * POST /api/quotations
 * Saves a Menu Builder submission to quotation_requests.
 * Public — no auth required. RLS allows anon inserts.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event_type, guest_count, package_id, selected_dishes, estimate } = body;

    // Basic validation
    if (!event_type || !guest_count || !package_id) {
      return NextResponse.json(
        { error: "Missing required fields: event_type, guest_count, package_id" },
        { status: 400 }
      );
    }

    if (typeof guest_count !== "number" || guest_count < 1) {
      return NextResponse.json(
        { error: "guest_count must be a positive number." },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from("quotation_requests")
      .insert({
        event_type: String(event_type).slice(0, 100),
        guest_count: Math.round(guest_count),
        package_id: package_id ?? null,
        selected_dishes: Array.isArray(selected_dishes) ? selected_dishes : [],
        estimate: typeof estimate === "number" ? estimate : null,
        status: "new",
      })
      .select("id")
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, id: data.id }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/quotations]", error);
    return NextResponse.json(
      { error: "Failed to save quotation. Please try again." },
      { status: 500 }
    );
  }
}

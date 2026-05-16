import type { Package, MenuItem, MenuBuilderState } from "@/lib/supabase/types";
import { formatINR } from "@/lib/utils";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

/**
 * Build a human-readable WhatsApp quotation message.
 * BRD §8.5: must read like a natural inquiry, not a raw JSON dump.
 */
export function buildWhatsAppMessage({
  state,
  pkg,
  dishes,
  categoryNames,
}: {
  state: MenuBuilderState;
  pkg: Package;
  dishes: MenuItem[];
  categoryNames: Record<string, string>; // category_id → category name
}): string {
  const dishLines = buildDishLines(dishes, categoryNames);

  const lines = [
    `Hi Hessel! I'd like a quotation for my event.`,
    ``,
    `Event Type: ${state.event_type}`,
    `Guests: ${state.guest_count}`,
    `Package: ${pkg.name}`,
    ``,
    ...dishLines,
    ``,
    state.estimate
      ? `Estimated Total: ${formatINR(state.estimate)} *(estimate only — subject to review)*`
      : ``,
  ].filter((line) => line !== undefined);

  return lines.join("\n").trim();
}

function buildDishLines(
  dishes: MenuItem[],
  categoryNames: Record<string, string>
): string[] {
  if (dishes.length === 0) return [];

  // Group by category
  const grouped: Record<string, MenuItem[]> = {};
  for (const dish of dishes) {
    const cat = categoryNames[dish.category_id] ?? "Other";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(dish);
  }

  const lines: string[] = [];
  for (const [category, items] of Object.entries(grouped)) {
    lines.push(`${category}: ${items.map((d) => d.name).join(", ")}`);
  }
  return lines;
}

/** Generate the wa.me deep link URL */
export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

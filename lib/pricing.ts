import type { Package, MenuItem } from "@/lib/supabase/types";

interface PricingInput {
  pkg: Package;
  guestCount: number;
  selectedDishes: MenuItem[];
}

interface PricingResult {
  baseTotal: number;       // base_price_per_plate × guest_count
  addOnTotal: number;      // sum of add-on price_per_plate_addon × guest_count
  grandTotal: number;      // baseTotal + addOnTotal
  isEstimate: true;
}

/**
 * Calculate the live price estimate.
 * Formula (BRD §8.4):
 *   Total = (base_price_per_plate × guest_count) + Σ(add-on item costs)
 *
 * Add-on cost = price_per_plate_addon × guest_count
 * Items with price_per_plate_addon = 0 are included in the package.
 */
export function calculateEstimate({
  pkg,
  guestCount,
  selectedDishes,
}: PricingInput): PricingResult {
  const baseTotal = pkg.base_price_per_plate * guestCount;

  const addOnTotal = selectedDishes.reduce((sum, dish) => {
    return sum + dish.price_per_plate_addon * guestCount;
  }, 0);

  return {
    baseTotal,
    addOnTotal,
    grandTotal: baseTotal + addOnTotal,
    isEstimate: true,
  };
}

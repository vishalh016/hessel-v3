"use client";

import { useState, useMemo } from "react";
import { Package, MenuItem, MenuCategory } from "@/lib/supabase/types";
import { calculateEstimate } from "@/lib/pricing";

/**
 * Specialized hook for real-time pricing calculation within the Menu Builder.
 */
export function usePricingEngine(
  selectedPackage: Package | null,
  guestCount: number | null,
  allDishes: MenuItem[],
  selectedDishIds: string[]
) {
  const selectedDishes = useMemo(() => {
    return allDishes.filter((d) => selectedDishIds.includes(d.id));
  }, [allDishes, selectedDishIds]);

  const estimate = useMemo(() => {
    if (!selectedPackage || !guestCount) return null;
    return calculateEstimate({
      pkg: selectedPackage,
      guestCount,
      selectedDishes,
    });
  }, [selectedPackage, guestCount, selectedDishes]);

  return {
    estimate,
    selectedDishes,
  };
}

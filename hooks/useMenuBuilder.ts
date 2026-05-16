"use client";

import { useState, useCallback, useEffect } from "react";
import { 
  MenuBuilderState, 
  Package, 
  MenuItem, 
  MenuCategory 
} from "@/lib/supabase/types";
import { 
  loadMenuBuilderState, 
  saveMenuBuilderState, 
  clearMenuBuilderState 
} from "@/lib/menu-builder-storage";
import { calculateEstimate } from "@/lib/pricing";

/**
 * Main state machine hook for the Menu Builder.
 * Manages steps, selections, and pricing.
 */
export function useMenuBuilder() {
  const [state, setState] = useState<MenuBuilderState>(() => loadMenuBuilderState());

  // Persist state to sessionStorage on change
  useEffect(() => {
    saveMenuBuilderState(state);
  }, [state]);

  const setStep = useCallback((step: number) => {
    setState((prev) => ({ ...prev, step }));
  }, []);

  const nextStep = useCallback(() => {
    setState((prev) => ({ ...prev, step: Math.min(prev.step + 1, 6) }));
  }, []);

  const prevStep = useCallback(() => {
    setState((prev) => ({ ...prev, step: Math.max(prev.step - 1, 1) }));
  }, []);

  const setEventType = useCallback((event_type: string) => {
    setState((prev) => ({ ...prev, event_type }));
    nextStep();
  }, [nextStep]);

  const setGuestCount = useCallback((guest_count: number) => {
    setState((prev) => ({ ...prev, guest_count }));
    nextStep();
  }, [nextStep]);

  const setPackage = useCallback((package_id: string) => {
    setState((prev) => ({ ...prev, package_id, selected_dishes: [] })); // Reset dishes on package change
    nextStep();
  }, [nextStep]);

  const toggleDish = useCallback((dish_id: string) => {
    setState((prev) => {
      const isSelected = prev.selected_dishes.includes(dish_id);
      const newDishes = isSelected
        ? prev.selected_dishes.filter((id) => id !== dish_id)
        : [...prev.selected_dishes, dish_id];
      return { ...prev, selected_dishes: newDishes };
    });
  }, []);

  const updateEstimate = useCallback((pkg: Package, dishes: MenuItem[]) => {
    if (!state.guest_count) return;
    const result = calculateEstimate({
      pkg,
      guestCount: state.guest_count,
      selectedDishes: dishes,
    });
    setState((prev) => ({ ...prev, estimate: result.grandTotal }));
  }, [state.guest_count]);

  const reset = useCallback(() => {
    clearMenuBuilderState();
    setState({
      step: 1,
      event_type: null,
      guest_count: null,
      package_id: null,
      selected_dishes: [],
      estimate: null,
    });
  }, []);

  return {
    state,
    setStep,
    nextStep,
    prevStep,
    setEventType,
    setGuestCount,
    setPackage,
    toggleDish,
    updateEstimate,
    reset,
  };
}

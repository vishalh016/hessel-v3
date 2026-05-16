import { MenuBuilderState } from "@/lib/supabase/types";

const STORAGE_KEY = "hessel_menu_builder";

const DEFAULT_STATE: MenuBuilderState = {
  step: 1,
  event_type: null,
  guest_count: null,
  package_id: null,
  selected_dishes: [],
  estimate: null,
};

/** Persist Menu Builder state to sessionStorage */
export function saveMenuBuilderState(state: MenuBuilderState): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // sessionStorage unavailable (private browsing, storage full)
  }
}

/** Load Menu Builder state from sessionStorage */
export function loadMenuBuilderState(): MenuBuilderState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<MenuBuilderState>;
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return DEFAULT_STATE;
  }
}

/** Clear Menu Builder state (called after successful submission) */
export function clearMenuBuilderState(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {}
}

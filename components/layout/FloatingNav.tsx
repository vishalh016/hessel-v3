"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SideDrawer from "./SideDrawer";
import DrawerOverlay from "./DrawerOverlay";
import { useActiveSection } from "@/hooks/useActiveSection";

/**
 * Floating navigation trigger that persists across scroll.
 * Features a glassmorphism trigger and opens the cinematic SideDrawer.
 */
export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useActiveSection(["hero", "experiences", "packages", "menu", "gallery", "contact"]);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating Trigger */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-8 right-8 z-50 w-12 h-12 flex items-center justify-center bg-surface/40 backdrop-blur-md border border-accent/20 rounded-full shadow-accent-glow text-accent hover:border-accent/40 transition-all group"
        aria-label="Open navigation"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="group-hover:stroke-accent-soft transition-colors"
        >
          <line x1="4" y1="8" x2="20" y2="8" strokeLinecap="round" />
          <line x1="4" y1="16" x2="20" y2="16" strokeLinecap="round" />
        </svg>
      </motion.button>

      {/* Drawer & Overlay */}
      <DrawerOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <SideDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} activeSection={activeSection} />
    </>
  );
}

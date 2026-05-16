"use client";

import { motion } from "framer-motion";

interface DrawerOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Full-screen semi-transparent overlay with backdrop blur.
 * Closes the drawer when clicked.
 */
export default function DrawerOverlay({ isOpen, onClose }: DrawerOverlayProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm cursor-pointer"
      aria-hidden="true"
    />
  );
}

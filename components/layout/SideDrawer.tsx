"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string | null;
}

const NAV_ITEMS = [
  { label: "Packages", href: "/#packages" },
  { label: "Build Your Menu", href: "/#menu" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#footer" },
];

const SOCIAL_ITEMS = [
  { label: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#", external: true },
  { label: "WhatsApp", href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`, external: true },
];

/**
 * Animated side drawer for navigation.
 * Features staggered reveals and cinematic spring motion.
 */
export default function SideDrawer({ isOpen, onClose, activeSection }: SideDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-[320px] bg-surface shadow-drawer flex flex-col p-12 text-right"
        >
          {/* Header/Close button area */}
          <div className="flex justify-start mb-12">
            <button
              onClick={onClose}
              className="p-2 text-secondary hover:text-accent transition-colors"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1">
            <motion.ul
              initial="closed"
              animate="open"
              variants={{
                open: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.1 },
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
              className="space-y-6"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.split("#")[1];
                return (
                  <motion.li
                    key={item.href}
                    variants={{
                      open: { x: 0, opacity: 1 },
                      closed: { x: 20, opacity: 0 },
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "group relative flex items-center justify-end text-2xl font-display transition-colors",
                        isActive ? "text-accent" : "text-primary hover:text-accent"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeIndicator"
                          className="absolute -right-12 w-1 h-8 bg-accent"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      {item.label}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          </nav>

          {/* Social Links / Footer */}
          <div className="mt-auto pt-12 border-t border-divider">
            <ul className="space-y-4">
              {SOCIAL_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="text-body-sm text-secondary hover:text-accent uppercase tracking-widest transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

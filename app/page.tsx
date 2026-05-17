"use client";

import { motion } from "framer-motion";
import FloatingNav from "@/components/layout/FloatingNav";
import HeroSection from "@/components/sections/HeroSection";
import PackagesSection from "@/components/sections/PackagesSection";
import GallerySection from "@/components/sections/GallerySection";
import StepRouter from "@/components/menu-builder/StepRouter";
import Footer from "@/components/layout/Footer";

/**
 * Hessel — Home Page
 * Single-page application with 5 sections.
 */
export default function HomePage() {
  return (
    <main className="relative">
      {/* Navigation */}
      <FloatingNav />

      {/* Sections */}
      <HeroSection />

      <section id="experiences" className="min-h-screen hidden">
        {/* Experience showcased within Hero per BRD */}
      </section>

      <PackagesSection />

      <section id="menu" className="min-h-screen bg-surface py-section relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-accent font-semibold tracking-widest uppercase text-sm mb-4 inline-block"
          >
            Craft Your Experience
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-display-lg text-primary mb-12"
          >
            Menu <span className="italic text-accent">Builder</span>
          </motion.h2>
          
          {/* Menu Builder Router */}
          <div className="max-w-4xl mx-auto bg-base/40 backdrop-blur-xl border border-divider/20 rounded-[40px] p-12 min-h-[600px] flex items-center justify-center">
             <StepRouter />
          </div>
        </div>
      </section>

      <GallerySection />
      
      <Footer />
    </main>
  );
}

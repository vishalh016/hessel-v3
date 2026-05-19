"use client";

import { motion } from "framer-motion";
import FloatingNav from "@/components/layout/FloatingNav";
import HeroSection from "@/components/sections/HeroSection";
import PackagesSection from "@/components/sections/PackagesSection";
import GallerySection from "@/components/sections/GallerySection";
import StepRouter from "@/components/menu-builder/StepRouter";
import Footer from "@/components/layout/Footer";
import SilkBackground from "@/components/layout/SilkBackground";

/**
 * Hessel — Home Page
 * Single-page application with 5 sections.
 */
export default function HomePage() {
  return (
    <SilkBackground>
      {/* Navigation */}
      <FloatingNav />

      {/* Sections */}
      <HeroSection />

      <section id="experiences" className="min-h-screen hidden">
        {/* Experience showcased within Hero per BRD */}
      </section>

      <PackagesSection />


      <GallerySection />
      
      <Footer />
    </SilkBackground>
  );
}

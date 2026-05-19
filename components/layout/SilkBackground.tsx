"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SilkBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full bg-base text-primary overflow-hidden">
      {/* ── LUXURY BURGUNDY SILK SATEEN SYSTEM (Unified site-wide background) ── */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Layer 1: THE PHYSICAL SILK SURFACE (High-Res Image) */}
        <div className="absolute inset-0">
          <Image
            src="/images/bg-1.png"
            alt="Hessel Heritage Silk"
            fill
            className="object-cover opacity-80"
            priority
          />
          {/* Subtle Burgundy Depth Mix */}
          <div className="absolute inset-0 bg-[#4A1625]/45 mix-blend-multiply" />
        </div>

        {/* Dynamic slow ambient candlelight shimmer */}
        <motion.div 
            animate={{ opacity: [0.1, 0.16, 0.1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/[0.04] blur-[140px] rounded-full"
        />

        {/* Secondary atmospheric candle light glow */}
        <motion.div 
            animate={{ opacity: [0.08, 0.14, 0.08], scale: [1, 1.05, 1] }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 left-[20%] w-[450px] h-[450px] bg-accent/[0.03] blur-[110px] rounded-full"
        />
        
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(26,5,11,0.96)_95%)]" />

        {/* Scattered Alpana Watermark illustration */}
        <div 
            className="absolute inset-0 opacity-[0.06] mix-blend-screen" 
            style={{ 
                backgroundImage: `url("https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png")`, 
                backgroundSize: "260px", 
                backgroundRepeat: "repeat" 
            }} 
        />

        {/* Ultra-Soft Film Grain for Velvety Depth */}
        <svg className="absolute w-0 h-0 hidden">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.06 0" />
          </filter>
        </svg>
        <div className="absolute inset-0 mix-blend-overlay opacity-20" style={{ filter: "url(#grain)" }} />
      </div>

      {/* Main Page Content */}
      <div className="relative z-10 w-full min-h-screen">
        {children}
      </div>
    </div>
  );
}

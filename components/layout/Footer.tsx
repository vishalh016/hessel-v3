"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const ContactButton = ({ 
  icon, 
  href, 
  label,
  delay 
}: { 
  icon: React.ReactNode, 
  href: string, 
  label: string,
  delay: number 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.a 
        href={href} 
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true }}
        className="group relative flex flex-col items-center justify-center cursor-pointer shrink-0"
    >
      {/* Icon circle body - Tightly matching the luxurious mock-up */}
      <div className={cn(
        "flex items-center justify-center w-14 h-14 rounded-full border border-accent/25 text-accent/80 transition-all duration-500 ease-out bg-[#1A050B]/60 backdrop-blur-md relative overflow-hidden shrink-0",
        isHovered && "text-accent border-accent/60 shadow-[0_0_20px_rgba(212,163,115,0.25)]"
      )}>
        {/* Soft gold hover glow */}
        <div className={cn(
          "absolute inset-0 bg-accent/0 blur-sm transition-all duration-500 ease-out",
          isHovered && "bg-accent/5"
        )} />
        {icon}
      </div>

      {/* Individual Hover Tooltip Label */}
      <div className="absolute top-[110%] left-1/2 -translate-x-1/2 w-max pointer-events-none z-20">
        <AnimatePresence>
          {isHovered && (
            <motion.p
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 0.85, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="font-body text-[11px] tracking-[0.15em] uppercase text-accent-soft font-semibold text-center whitespace-nowrap bg-[#1A050B]/95 px-2 py-1 rounded border border-accent/10"
            >
              {label}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.a>
  );
};

export default function Footer({ className }: { className?: string }) {
  return (
    <footer id="footer" className={cn("relative w-full bg-transparent overflow-hidden border-t border-accent/5", className)}>
        {/* Cinematic Background Atmosphere */}
        <div className="absolute inset-0 pointer-events-none z-0">
            {/* Warmer emotional lighting near Bengali identity on the left */}
            <motion.div 
                animate={{ opacity: [0.15, 0.25, 0.15], scale: [1, 1.04, 1] }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-[15%] md:left-[20%] -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-accent/5 blur-[95px] rounded-full"
            />

            {/* Subtle atmospheric interaction glow centered behind interaction cluster */}
            <motion.div 
                animate={{ opacity: [0.08, 0.14, 0.08] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-accent/[0.03] blur-[85px] rounded-full"
            />
            
            {/* Asymmetrical Crest/Logo Watermark - Magnified, deep atmospheric blur on far right fade */}
            <motion.div 
                animate={{ 
                    y: [0, -6, 0],
                    x: [0, 4, 0],
                    rotate: [0, 0.5, 0]
                }}
                transition={{ 
                    duration: 30, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
                className="absolute -right-20 bottom-[-30px] opacity-[0.04] mix-blend-screen w-[260px] h-[260px] md:w-[320px] md:h-[320px] pointer-events-none blur-[8px]"
            >
                <Image src="/logo/logo-premium.png" alt="" fill className="object-contain" priority />
            </motion.div>
        </div>

        {/* Soft visual dissolve fade layer at the absolute bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-base via-base/30 to-transparent pointer-events-none z-10" />

        {/* Cinematic Asymmetrical Editorial Layout */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-8 flex flex-col justify-center">
            
            {/* 3-Column Editorial Grid matching the luxury mock-up perfectly */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-center justify-between pb-3 relative z-10">
                
                {/* COLUMN 1: LEFT — BENGALI WORDMARK */}
                <div className="relative flex flex-col items-center md:items-start text-center md:text-left w-full gap-0 col-span-1">
                    {/* Slow, ambient candlelight shimmer backlight specifically behind the typography */}
                    <motion.div 
                        animate={{ opacity: [0.015, 0.03, 0.015], scale: [0.97, 1.03, 0.97] }}
                        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/2 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 w-[260px] h-[90px] bg-accent blur-[55px] rounded-full pointer-events-none z-0" 
                    />
                    
                    {/* Primary wordmark - Grand scale, left-aligned, emotional anchor */}
                    <motion.h2
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
                        viewport={{ once: true }}
                        className="relative z-10 font-display font-light italic text-6xl md:text-[5.2rem] lg:text-[6.3rem] text-accent-soft tracking-wide leading-[1.15] [text-shadow:0_4px_30px_rgba(212,163,115,0.08)] opacity-95 md:max-w-md"
                    >
                        হেঁশেল
                    </motion.h2>

                    {/* Supporting subline - Spacing tightened for robust visual weight, opacity boosted */}
                    <motion.p
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 0.85, x: 0 }}
                        transition={{ duration: 1.6, delay: 0.2, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="font-body text-[16px] sm:text-[18px] tracking-[0.16em] text-accent-soft z-10 font-medium mt-[-4px] md:mt-[-10px] opacity-85"
                    >
                        আভিজাত্যে বাঙালিয়ানা
                    </motion.p>
                </div>

                {/* COLUMN 2: CENTER — SPEAK WITH US */}
                <div className="flex flex-col items-center justify-center text-center relative z-10 w-full col-span-1">
                    
                    {/* Speak With Us Header */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.5 }}
                        transition={{ duration: 1.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="font-body text-[12px] tracking-[0.25em] uppercase text-accent-soft mb-3 font-semibold w-full text-center"
                    >
                        Speak With Us
                    </motion.p>

                    {/* Center Row Buttons (WhatsApp, Phone, Mail) */}
                    <div className="flex flex-row items-center justify-center gap-6 relative w-full">
                        <ContactButton 
                            icon={<WhatsAppIcon />} 
                            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919162917996'}`} 
                            label="Chat With Us"
                            delay={0.2} 
                        />

                        <ContactButton 
                            icon={<Phone className="w-6 h-6" strokeWidth={1.5} />} 
                            href="tel:+919162917996"
                            label="Call Us"
                            delay={0.3} 
                        />

                        <ContactButton 
                            icon={<Mail className="w-6 h-6" strokeWidth={1.5} />} 
                            href="mailto:hello@hessel.in"
                            label="Email Us"
                            delay={0.4} 
                        />
                    </div>
                </div>

                {/* COLUMN 3: RIGHT — SOCIAL */}
                <div className="flex flex-col items-center justify-center text-center relative z-10 w-full col-span-1">
                    
                    {/* Social Header */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.5 }}
                        transition={{ duration: 1.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="font-body text-[12px] tracking-[0.25em] uppercase text-accent-soft mb-3 font-semibold w-full text-center"
                    >
                        Social
                    </motion.p>

                    {/* Right Row Buttons (Instagram, Facebook, Location) */}
                    <div className="flex flex-row items-center justify-center gap-6 relative w-full">
                        <ContactButton 
                            icon={<InstagramIcon />} 
                            href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#"} 
                            label="Instagram"
                            delay={0.5} 
                        />

                        <ContactButton 
                            icon={<FacebookIcon />} 
                            href={process.env.NEXT_PUBLIC_FACEBOOK_URL || "#"} 
                            label="Facebook"
                            delay={0.6} 
                        />

                        <ContactButton 
                            icon={<MapPin className="w-6 h-6" strokeWidth={1.5} />} 
                            href="https://maps.google.com/?q=Kolkata,+West+Bengal"
                            label="Location"
                            delay={0.7} 
                        />
                    </div>
                </div>

            </div>

            {/* Luxurious Horizontal Divider with Ornate Gold Diamond Crest */}
            <div className="relative w-full flex items-center justify-center my-4 z-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-[0.5px] bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-40" />
              </div>
              <div className="relative px-6 bg-[#2D0B13]/90 backdrop-blur-md text-accent flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L19 9L22 12L19 15L12 22L5 15L2 12L5 9L12 2Z" strokeLinejoin="round" fill="rgba(212, 163, 115, 0.2)"/>
                </svg>
              </div>
            </div>

            {/* BOTTOM CENTER UNIFIED LUXURY SIGNATURE */}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-row items-center justify-center text-center w-full z-10 relative pt-1"
            >
                <p className="font-display font-light italic text-[16px] sm:text-[18px] text-accent-soft/65 tracking-wider">
                    Crafted by হেঁশেল • Since 2024
                </p>
            </motion.div>

        </div>
    </footer>
  );
}

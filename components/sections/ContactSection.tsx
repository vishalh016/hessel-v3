"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const SOCIALS = [
  { label: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#" },
  { label: "Facebook", href: process.env.NEXT_PUBLIC_FACEBOOK_URL || "#" },
  { label: "WhatsApp", href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}` },
];

/**
 * Contact Section / Footer.
 * Minimalist, high-end footer with social links and basic info.
 */
export default function ContactSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-surface pt-32 pb-12 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <h2 className="text-4xl font-display text-accent mb-8">Hessel</h2>
            <p className="text-secondary text-lg max-w-sm leading-relaxed mb-12">
              Transforming hospitality into cinematic experiences. Kolkata's premier luxury catering destination.
            </p>
            <div className="flex gap-6">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-accent uppercase text-[10px] font-bold tracking-[0.2em] transition-colors"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-primary font-display text-xl mb-8">Navigate</h4>
            <ul className="space-y-4">
              {["Experiences", "Packages", "Menu Builder", "Gallery"].map((link) => (
                <li key={link}>
                  <Link
                    href={`/#${link.toLowerCase().replace(" ", "")}`}
                    className="text-secondary/60 hover:text-accent transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-primary font-display text-xl mb-8">Get in Touch</h4>
            <ul className="space-y-6">
              <li>
                <p className="text-accent text-[10px] font-bold uppercase tracking-widest mb-1">Email</p>
                <a href="mailto:hello@hessel.in" className="text-secondary/60 hover:text-accent transition-colors">
                  hello@hessel.in
                </a>
              </li>
              <li>
                <p className="text-accent text-[10px] font-bold uppercase tracking-widest mb-1">WhatsApp</p>
                <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`} className="text-secondary/60 hover:text-accent transition-colors">
                  +91 {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-divider/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-secondary/40 text-[10px] uppercase tracking-widest">
            © {currentYear} Hessel Catering. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-secondary/40 hover:text-accent transition-colors text-[10px] uppercase tracking-widest">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-secondary/40 hover:text-accent transition-colors text-[10px] uppercase tracking-widest">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const fineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [markRef.current, metaRef.current, fineRef.current],
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: footerRef.current, start: 'top 85%', once: true },
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      style={{
        padding: '80px 48px 60px',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
        background: 'var(--bg-1)',
      }}
    >
      <div ref={markRef} style={{ fontFamily: 'var(--font-playfair, Playfair Display), serif', fontStyle: 'italic', fontSize: 32, color: 'var(--ink)', marginBottom: 24, letterSpacing: '-0.01em', opacity: 0 }}>
        KS<span style={{ color: 'var(--teal)' }}>&amp;</span>R · Short Form Media
      </div>

      <div ref={metaRef} style={{ fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontSize: 12, color: 'var(--ink-2)', letterSpacing: '0.1em', marginBottom: 12, opacity: 0 }}>
        REPORT PREPARED BY SHORT FORM MEDIA · DATA: LINKEDIN ANALYTICS EXPORT · JAN 19 – APR 18, 2026
      </div>

      <div ref={fineRef} style={{ fontSize: 12, color: 'var(--ink-3)', fontStyle: 'italic', maxWidth: 540, margin: '0 auto', lineHeight: 1.6, opacity: 0 }}>
        All engagement metrics are organic unless otherwise noted. Sponsored campaign data included where relevant for comparison.
      </div>
    </footer>
  );
}

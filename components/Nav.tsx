'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const NAV_SECTIONS = [
  { id: 'hero', label: 'Overview' },
  { id: 'funnel', label: 'Funnel' },
  { id: 'content', label: 'Content' },
  { id: 'video', label: 'Video' },
  { id: 'versus', label: 'Paid vs Organic' },
  { id: 'audience', label: 'Audience' },
  { id: 'growth', label: 'Growth' },
  { id: 'next', label: "What's Next" },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
    );

    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);

      const offset = window.innerHeight * 0.35;
      let idx = 0;
      NAV_SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= y + offset) idx = i;
      });
      setActiveIdx(idx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '18px 48px',
        background: scrolled ? 'rgba(10, 15, 30, 0.92)' : 'rgba(10, 15, 30, 0.6)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
        transition: 'border-color 300ms var(--ease), background 300ms var(--ease)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        opacity: 0,
      }}
    >
      {/* Brand */}
      <div
        style={{
          fontFamily: 'var(--font-space-mono, Space Mono), monospace',
          fontSize: 12,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--ink)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: 8,
            height: 8,
            background: 'var(--teal)',
            borderRadius: '50%',
            boxShadow: '0 0 12px var(--teal-glow)',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
        KS&amp;R · LINKEDIN INTEL · Q1 2026
      </div>

      {/* Section dots */}
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        {NAV_SECTIONS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            title={s.label}
            style={{
              position: 'relative',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: i === activeIdx ? 'var(--teal)' : 'var(--border-2)',
              boxShadow: i === activeIdx ? '0 0 10px var(--teal-glow)' : 'none',
              cursor: 'pointer',
              transition: 'all 200ms var(--ease)',
              border: 'none',
              padding: 0,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget;
              el.style.transform = 'scale(1.4)';
              el.style.background = i === activeIdx ? 'var(--teal)' : 'var(--ink-2)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              el.style.transform = 'scale(1)';
              el.style.background = i === activeIdx ? 'var(--teal)' : 'var(--border-2)';
            }}
          />
        ))}
      </div>
    </nav>
  );
}

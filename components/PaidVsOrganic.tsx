'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PaidVsOrganic() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const organicCardRef = useRef<HTMLDivElement>(null);
  const paidCardRef = useRef<HTMLDivElement>(null);
  const bigNumRef = useRef<HTMLDivElement>(null);
  const calloutTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = (trigger: Element | null, start = 'top 75%') => ({ trigger, start, once: true });

      gsap.fromTo([eyebrowRef.current, titleRef.current, introRef.current], { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12, scrollTrigger: st(sectionRef.current) });

      // Cards slide in from opposite sides
      gsap.fromTo(organicCardRef.current, { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: st(organicCardRef.current) });
      gsap.fromTo(paidCardRef.current, { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: st(paidCardRef.current) });

      // Big 2.12× number pops in with scale
      ScrollTrigger.create({
        trigger: bigNumRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.fromTo(bigNumRef.current, { scale: 0.5, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'back.out(1.7)' });
        },
      });

      gsap.fromTo(calloutTextRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: st(calloutTextRef.current, 'top 85%') });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const statStyle = {
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'baseline' as const,
    borderBottom: '1px solid var(--border)',
    paddingBottom: 18,
    marginBottom: 22,
  };

  return (
    <section
      ref={sectionRef}
      id="versus"
      style={{
        padding: '120px 48px',
        background: 'linear-gradient(to bottom, var(--bg-0) 0%, var(--bg-1) 50%, var(--bg-0) 100%)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        <div ref={eyebrowRef} style={{ fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12, opacity: 0 }}>
          <span style={{ width: 32, height: 1, background: 'var(--teal)', display: 'inline-block' }} />
          SECTION 05 · PAID VS ORGANIC
        </div>

        <h2 ref={titleRef} style={{ fontFamily: 'var(--font-playfair, Playfair Display), Georgia, serif', fontWeight: 700, fontSize: 'clamp(36px, 4.2vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.01em', color: 'var(--ink)', marginBottom: 24, maxWidth: 920, opacity: 0 }}>
          Where is the real value coming from?
        </h2>

        <p ref={introRef} style={{ fontSize: 17, color: 'var(--ink-2)', maxWidth: 640, lineHeight: 1.65, marginBottom: 64, opacity: 0 }}>
          Two posts were boosted via LinkedIn campaigns, generating significant impression volume. But organic content — built post by post, day by day — outperformed on every quality metric.
        </p>

        {/* VS Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 28, alignItems: 'stretch', marginBottom: 36 }}>

          {/* Organic card */}
          <div
            ref={organicCardRef}
            style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderTop: '3px solid var(--teal)', borderRadius: 4, padding: 40, opacity: 0 }}
          >
            <div style={{ fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-2)', marginBottom: 8 }}>CARD 01 · CHANNEL</div>
            <div style={{ fontFamily: 'var(--font-playfair, Playfair Display), serif', fontSize: 36, color: 'var(--teal)', marginBottom: 32, letterSpacing: '-0.01em' }}>Organic</div>

            {[
              { label: 'Impressions', val: '50,560' },
              { label: 'Clicks', val: '7,362' },
              { label: 'Avg Engagement Rate', val: '19.1%', valColor: 'var(--teal)' },
              { label: 'Cost', val: 'Content team investment', small: true },
            ].map((s, i) => (
              <div key={i} style={{ ...statStyle, ...(i === 3 ? { borderBottom: 'none', marginBottom: 0, paddingBottom: 0 } : {}) }}>
                <span style={{ fontSize: 12, color: 'var(--ink-2)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{s.label}</span>
                <span style={{ fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontWeight: 700, fontSize: s.small ? 14 : 24, color: s.valColor || 'var(--ink)', textAlign: 'right' }}>{s.val}</span>
              </div>
            ))}

            <div style={{ fontSize: 12, color: 'var(--ink-3)', fontStyle: 'italic', lineHeight: 1.5, marginTop: 28 }}>
              125 posts published across 13 weeks. Zero ad spend.
            </div>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-playfair, Playfair Display), serif', fontStyle: 'italic', fontSize: 28, color: 'var(--ink-3)', width: 60 }}>
            <div style={{ width: 1, flex: 1, background: 'var(--border)' }} />
            <div style={{ padding: '12px 0' }}>vs.</div>
            <div style={{ width: 1, flex: 1, background: 'var(--border)' }} />
          </div>

          {/* Paid card */}
          <div
            ref={paidCardRef}
            style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderTop: '3px solid var(--amber)', borderRadius: 4, padding: 40, opacity: 0 }}
          >
            <div style={{ fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-2)', marginBottom: 8 }}>CARD 02 · CHANNEL</div>
            <div style={{ fontFamily: 'var(--font-playfair, Playfair Display), serif', fontSize: 36, color: 'var(--amber)', marginBottom: 32, letterSpacing: '-0.01em' }}>Paid</div>

            {[
              { label: 'Impressions', val: '443,595' },
              { label: 'Clicks', val: '3,472' },
              { label: 'Avg Engagement Rate', val: '~1–2%', valColor: 'var(--amber)' },
              { label: 'Campaigns', val: 'LEGO® SERIOUS PLAY® Webinar + Brand Rebrand', small: true },
            ].map((s, i) => (
              <div key={i} style={{ ...statStyle, ...(i === 3 ? { borderBottom: 'none', marginBottom: 0, paddingBottom: 0 } : {}) }}>
                <span style={{ fontSize: 12, color: 'var(--ink-2)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{s.label}</span>
                <span style={{ fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontWeight: 700, fontSize: s.small ? 13 : 24, color: s.valColor || 'var(--ink)', textAlign: 'right', lineHeight: 1.4 }}>{s.val}</span>
              </div>
            ))}

            <div style={{ fontSize: 12, color: 'var(--ink-3)', fontStyle: 'italic', lineHeight: 1.5, marginTop: 28 }}>
              2 boosted posts. 89.8% of total impression volume.
            </div>
          </div>
        </div>

        {/* Hero callout with 2.12× */}
        <div style={{ background: 'linear-gradient(135deg, rgba(245,166,35,0.06), transparent)', border: '1px solid var(--border)', borderLeft: '3px solid var(--amber)', padding: '36px 40px', borderRadius: '0 4px 4px 0', marginBottom: 24 }}>
          <div ref={bigNumRef} style={{ fontFamily: 'var(--font-playfair, Playfair Display), serif', fontWeight: 900, fontSize: 'clamp(48px, 6vw, 80px)', color: 'var(--amber)', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 16, opacity: 0 }}>
            2.12<span style={{ fontStyle: 'italic' }}>×</span>
          </div>
          <div ref={calloutTextRef} style={{ fontSize: 18, color: 'var(--ink)', maxWidth: 720, lineHeight: 1.5, opacity: 0 }}>
            Organic content generated{' '}
            <strong style={{ color: 'var(--amber)' }}>2.12× more clicks than paid</strong>
            {' '}— using just{' '}
            <strong style={{ color: 'var(--amber)' }}>10.2% of the impressions</strong>.
          </div>
        </div>

      </div>
    </section>
  );
}

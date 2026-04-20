'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    num: 'STAGE 01',
    label: 'Total Impressions',
    value: 494155,
    pct: 100,
    pctLabel: '100% — TOP OF FUNNEL',
    splits: [
      { type: 'organic', label: 'Organic', val: '50,560 · 10.2%' },
      { type: 'paid', label: 'Paid', val: '443,595 · 89.8%' },
    ],
  },
  {
    num: 'STAGE 02',
    label: 'Total Page Visits',
    value: 2732,
    pct: 0.55,
    pctLabel: '0.55% OF IMPRESSIONS',
    splits: [],
  },
  {
    num: 'STAGE 03',
    label: 'Unique Visitors',
    value: 1184,
    pct: 43.3,
    pctLabel: '43.3% OF VISITS',
    splits: [],
  },
  {
    num: 'STAGE 04',
    label: 'New Followers',
    value: 169,
    pct: 14.3,
    pctLabel: '14.3% OF UNIQUE VISITORS',
    splits: [],
  },
];

function animateCount(el: HTMLElement, target: number, duration = 1600) {
  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.floor(target * eased).toLocaleString('en-US');
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString('en-US');
  };
  requestAnimationFrame(step);
}

export default function Funnel() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const stagesRef = useRef<HTMLDivElement>(null);
  const calloutRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        [eyebrowRef.current, titleRef.current, introRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );

      // Stage cards stagger in
      if (stagesRef.current) {
        gsap.fromTo(
          stagesRef.current.children,
          { y: 50, opacity: 0, scale: 0.96 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out', stagger: 0.12,
            scrollTrigger: { trigger: stagesRef.current, start: 'top 70%' },
          }
        );
      }

      // Funnel bars + count-ups
      barRefs.current.forEach((bar, i) => {
        if (!bar) return;
        const stage = STAGES[i];
        const visualPct = Math.max(4, Math.min(100, stage.pct));
        const numEl = numRefs.current[i];

        ScrollTrigger.create({
          trigger: bar,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.fromTo(bar, { width: '0%' }, { width: `${visualPct}%`, duration: 1.4, ease: 'power3.out', delay: 0.2 });
            if (numEl) setTimeout(() => animateCount(numEl, stage.value), 400);
          },
        });
      });

      // Callout
      gsap.fromTo(
        calloutRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: calloutRef.current, start: 'top 85%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="funnel"
      style={{ padding: '120px 48px', position: 'relative' }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Header */}
        <div
          ref={eyebrowRef}
          style={{
            fontFamily: 'var(--font-space-mono, Space Mono), monospace',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--teal)',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            opacity: 0,
          }}
        >
          <span style={{ width: 32, height: 1, background: 'var(--teal)', display: 'inline-block' }} />
          SECTION 02 · THE FUNNEL
        </div>

        <h2
          ref={titleRef}
          style={{
            fontFamily: 'var(--font-playfair, Playfair Display), Georgia, serif',
            fontWeight: 700,
            fontSize: 'clamp(36px, 4.2vw, 56px)',
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            color: 'var(--ink)',
            marginBottom: 24,
            maxWidth: 920,
            opacity: 0,
          }}
        >
          From content to community: the full funnel.
        </h2>

        <p
          ref={introRef}
          style={{ fontSize: 17, color: 'var(--ink-2)', maxWidth: 640, lineHeight: 1.65, marginBottom: 64, opacity: 0 }}
        >
          Every piece of content KS&amp;R publishes starts a chain reaction. Impressions bring people to the page. Page visits convert to followers. This is that chain, made visible.
        </p>

        {/* Funnel stages */}
        <div
          ref={stagesRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 0,
            marginBottom: 48,
          }}
        >
          {STAGES.map((stage, i) => (
            <div
              key={i}
              style={{
                position: 'relative',
                padding: '40px 28px',
                background: 'var(--bg-2)',
                border: '1px solid var(--border)',
                borderRight: i < 3 ? 'none' : '1px solid var(--border)',
                opacity: 0,
              }}
            >
              {/* Stage number */}
              <div style={{
                fontFamily: 'var(--font-space-mono, Space Mono), monospace',
                fontSize: 11, color: 'var(--teal)', letterSpacing: '0.2em', marginBottom: 12,
              }}>
                {stage.num}
              </div>

              {/* Label */}
              <div style={{
                fontSize: 13, color: 'var(--ink-2)', textTransform: 'uppercase',
                letterSpacing: '0.1em', marginBottom: 18,
              }}>
                {stage.label}
              </div>

              {/* Big number */}
              <div style={{
                fontFamily: 'var(--font-space-mono, Space Mono), monospace',
                fontWeight: 700, fontSize: 'clamp(28px, 3.4vw, 44px)',
                color: 'var(--ink)', lineHeight: 1, marginBottom: 14,
              }}>
                <span ref={el => { numRefs.current[i] = el; }}>0</span>
              </div>

              {/* Splits (only for stage 1) */}
              {stage.splits.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 10 }}>
                  {stage.splits.map((s, si) => (
                    <div key={si} style={{
                      display: 'flex', justifyContent: 'space-between',
                      fontFamily: 'var(--font-space-mono, Space Mono), monospace',
                      fontSize: 12, color: 'var(--ink-2)',
                    }}>
                      <span>{s.label}</span>
                      <strong style={{ color: si === 0 ? 'var(--teal)' : 'var(--amber)', fontWeight: 700 }}>
                        {s.val}
                      </strong>
                    </div>
                  ))}
                </div>
              )}

              {/* Bar */}
              <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden', marginTop: 18 }}>
                <div
                  ref={el => { barRefs.current[i] = el; }}
                  style={{
                    height: '100%', background: 'var(--teal)', width: '0%',
                    boxShadow: '0 0 12px var(--teal-glow)', borderRadius: 3,
                  }}
                />
              </div>

              {/* Percentage label */}
              <div style={{
                fontFamily: 'var(--font-space-mono, Space Mono), monospace',
                fontSize: 11, color: 'var(--ink-3)', marginTop: 10, letterSpacing: '0.05em',
              }}>
                {stage.pctLabel}
              </div>

              {/* Arrow between stages */}
              {i < 3 && (
                <div style={{
                  position: 'absolute', right: -10, top: '50%', transform: 'translateY(-50%)',
                  width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--bg-0)', color: 'var(--teal)', zIndex: 2,
                  fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontSize: 14,
                }}>
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Callout */}
        <div
          ref={calloutRef}
          style={{
            border: '1px solid var(--border)', background: 'var(--bg-2)', padding: '28px 32px',
            borderLeft: '3px solid var(--teal)', fontSize: 17, lineHeight: 1.55,
            color: 'var(--ink)', borderRadius: '0 4px 4px 0', opacity: 0,
          }}
        >
          <span style={{
            fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontSize: 10,
            letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-3)',
            marginBottom: 10, display: 'block',
          }}>
            SIGNAL
          </span>
          Organic content drove{' '}
          <strong style={{ color: 'var(--teal)', fontWeight: 600 }}>7,362 clicks</strong>
          {' '}— more than double the{' '}
          <strong style={{ color: 'var(--teal)', fontWeight: 600 }}>3,472 clicks</strong>
          {' '}from paid campaigns, despite receiving just{' '}
          <strong style={{ color: 'var(--teal)', fontWeight: 600 }}>10.2% of total impressions</strong>.
        </div>

      </div>
    </section>
  );
}

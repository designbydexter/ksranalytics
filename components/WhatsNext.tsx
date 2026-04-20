'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WORKING = [
  'People-first culture content drives the highest engagement (avg ER 70–148% on top posts).',
  'Consistent 9–12 posts/week cadence is sustaining algorithmic reach.',
  'Organic content is outperforming paid on every quality metric.',
  'A decision-maker audience (Senior + Director + VP + CXO = 58.3%) is actively engaged.',
  'International reach growing organically — India is top 3 market.',
];

const NEXT = [
  'Directors and CXOs are visiting but not following. They show up at nearly 2× their follow rate. Content that speaks directly to their priorities could convert them.',
  'The LinkedIn Life page has zero traffic. It\'s completely empty. This is KS&R\'s talent brand page — activating it is a straightforward win.',
  'Small and mid-size firms are actively visiting. They make up 58.9% of page visitors but aren\'t reflected in the content mix. An opportunity to speak to them directly.',
  'Video engagement is growing. ER went from 14.6% in January to 16.1% in April. Tighter hooks and sharper copywriting on video will accelerate this further.',
  'Business Development is the #1 follower function (947 followers). There is very little content currently aimed at BD professionals. That\'s a wide-open lane.',
];

export default function WhatsNext() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const workingColRef = useRef<HTMLDivElement>(null);
  const nextColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = (trigger: Element | null, start = 'top 75%') => ({ trigger, start, once: true });

      gsap.fromTo([eyebrowRef.current, titleRef.current], { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12, scrollTrigger: st(sectionRef.current) });

      // Working column items stagger from left
      if (workingColRef.current) {
        const items = workingColRef.current.querySelectorAll('li');
        gsap.fromTo(items, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1, scrollTrigger: st(workingColRef.current) });
      }

      // Next column items stagger from right
      if (nextColRef.current) {
        const items = nextColRef.current.querySelectorAll('li');
        gsap.fromTo(items, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1, scrollTrigger: st(nextColRef.current) });
      }

      // Column cards slide in
      gsap.fromTo(workingColRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: st(workingColRef.current) });
      gsap.fromTo(nextColRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.12, scrollTrigger: st(nextColRef.current) });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const colStyle = (teal: boolean) => ({
    background: 'var(--bg-2)' as const,
    border: '1px solid var(--border)' as const,
    padding: 44,
    borderRadius: 4,
    opacity: 0,
  });

  const h3Style = (teal: boolean) => ({
    fontFamily: 'var(--font-playfair, Playfair Display), serif',
    fontSize: 28,
    color: teal ? 'var(--teal)' : 'var(--amber)',
    marginBottom: 28,
    paddingBottom: 18,
    borderBottom: '1px solid var(--border)',
    letterSpacing: '-0.01em',
  });

  return (
    <section ref={sectionRef} id="next" style={{ padding: '120px 48px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        <div ref={eyebrowRef} style={{ fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12, opacity: 0 }}>
          <span style={{ width: 32, height: 1, background: 'var(--teal)', display: 'inline-block' }} />
          SECTION 08 · WHAT'S NEXT
        </div>

        <h2 ref={titleRef} style={{ fontFamily: 'var(--font-playfair, Playfair Display), Georgia, serif', fontWeight: 700, fontSize: 'clamp(36px, 4.2vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.01em', color: 'var(--ink)', marginBottom: 64, maxWidth: 920, opacity: 0 }}>
          The signal is clear. Here's how we build on it.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>

          {/* What's Working */}
          <div ref={workingColRef} style={colStyle(true)}>
            <h3 style={h3Style(true)}>What's Working</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 22 }}>
              {WORKING.map((item, i) => (
                <li key={i} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: 16, alignItems: 'flex-start', fontSize: 15, lineHeight: 1.55, color: 'var(--ink)' }}>
                  <span style={{
                    width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontWeight: 700, fontSize: 13,
                    color: 'var(--teal)', background: 'rgba(0,212,180,0.12)', borderRadius: 4, marginTop: 1,
                  }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Opportunities Ahead */}
          <div ref={nextColRef} style={colStyle(false)}>
            <h3 style={h3Style(false)}>Opportunities Ahead</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 22 }}>
              {NEXT.map((item, i) => (
                <li key={i} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: 16, alignItems: 'flex-start', fontSize: 15, lineHeight: 1.55, color: 'var(--ink)' }}>
                  <span style={{
                    width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontWeight: 700, fontSize: 13,
                    color: 'var(--amber)', background: 'rgba(245,166,35,0.12)', borderRadius: 4, marginTop: 1,
                  }}>→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}

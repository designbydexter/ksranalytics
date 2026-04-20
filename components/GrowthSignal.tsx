'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, LineElement,
  PointElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';

gsap.registerPlugin(ScrollTrigger);
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, Filler);

const COLOR = {
  bg0: '#0A0F1E', bg2: '#111827',
  teal: '#00D4B4', amber: '#F5A623',
  ink: '#F0F4FF', ink2: '#8896B3', ink3: '#5A6885',
  border: '#1E2A40', border2: '#2A3855',
};
const gridConfig = { color: 'rgba(30,42,64,0.5)', lineWidth: 1, drawTicks: false } as const;
const tickConfig = { color: COLOR.ink2, font: { family: "'Space Mono', monospace", size: 11 as number }, padding: 8 } as const;

const SIGNALS = [
  { icon: '↑', headline: 'Engagement Rate Up 61%', detail: 'Jan: 14.1% → Mar: 22.7%', amber: false },
  { icon: '◎', headline: 'Organic Clicks 2× Paid', detail: '7,362 vs. 3,472 · 10.2% of impressions', amber: true },
  { icon: '◆', headline: 'Decision-Makers in Funnel', detail: 'Directors + CXOs over-indexed among visitors', amber: false },
];

export default function GrowthSignal() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const signalsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = (trigger: Element | null, start = 'top 75%') => ({ trigger, start, once: true });

      gsap.fromTo([eyebrowRef.current, titleRef.current, introRef.current], { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12, scrollTrigger: st(sectionRef.current) });
      gsap.fromTo(chartRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: st(chartRef.current) });

      if (signalsRef.current) {
        gsap.fromTo(signalsRef.current.children, { y: 50, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.2)', stagger: 0.12, scrollTrigger: st(signalsRef.current) });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const growthData = {
    labels: ['Jan 2026', 'Feb 2026', 'Mar 2026', 'Apr 2026 (partial)'],
    datasets: [{
      label: 'New Followers',
      data: [28, 59, 42, 40],
      borderColor: COLOR.teal,
      backgroundColor: (ctx: import('chart.js').ScriptableContext<'line'>) => {
        const chart = ctx.chart;
        const { ctx: c, chartArea } = chart;
        if (!chartArea) return 'rgba(0,212,180,0.15)';
        const g = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        g.addColorStop(0, 'rgba(0,212,180,0.35)');
        g.addColorStop(1, 'rgba(0,212,180,0)');
        return g;
      },
      borderWidth: 2.5,
      fill: true,
      tension: 0.4,
      pointRadius: 6,
      pointHoverRadius: 9,
      pointBackgroundColor: COLOR.bg0,
      pointBorderColor: COLOR.teal,
      pointBorderWidth: 2.5,
    }],
  };

  return (
    <section ref={sectionRef} id="growth" style={{ padding: '120px 48px', background: 'linear-gradient(to bottom, var(--bg-0) 0%, var(--bg-1) 50%, var(--bg-0) 100%)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        <div ref={eyebrowRef} style={{ fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12, opacity: 0 }}>
          <span style={{ width: 32, height: 1, background: 'var(--teal)', display: 'inline-block' }} />
          SECTION 07 · THE GROWTH SIGNAL
        </div>

        <h2 ref={titleRef} style={{ fontFamily: 'var(--font-playfair, Playfair Display), Georgia, serif', fontWeight: 700, fontSize: 'clamp(36px, 4.2vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.01em', color: 'var(--ink)', marginBottom: 24, maxWidth: 920, opacity: 0 }}>
          90 days in. Here's the direction.
        </h2>

        <p ref={introRef} style={{ fontSize: 17, color: 'var(--ink-2)', maxWidth: 640, lineHeight: 1.65, marginBottom: 64, opacity: 0 }}>
          169 new followers gained in 90 days — 100% organic, zero paid follower campaigns. February marked the highest single-month growth, coinciding with the highest content volume. April is on pace to match or exceed March despite being a partial month.
        </p>

        <div ref={chartRef} style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 4, padding: 36, marginBottom: 48, opacity: 0 }}>
          <h3 style={{ fontFamily: 'var(--font-playfair, Playfair Display), serif', fontWeight: 700, fontSize: 26, color: 'var(--ink)', marginBottom: 8, letterSpacing: '-0.01em' }}>Monthly New Followers</h3>
          <p style={{ color: 'var(--ink-2)', fontSize: 14, marginBottom: 28 }}>Organic follower acquisition by month.</p>
          <div style={{ position: 'relative', height: 320 }}>
            <Line data={growthData} options={{
              responsive: true, maintainAspectRatio: false,
              animation: { duration: 1300, easing: 'easeOutCubic' },
              plugins: { legend: { display: false }, tooltip: { backgroundColor: '#0E1426', titleColor: COLOR.ink, bodyColor: COLOR.ink, borderColor: COLOR.border2, borderWidth: 1, padding: 12, cornerRadius: 4, callbacks: { label: (ctx) => `${ctx.parsed.y} new followers` } } },
              scales: { x: { grid: { display: false }, ticks: tickConfig }, y: { grid: gridConfig, ticks: tickConfig, beginAtZero: true } },
            } as Parameters<typeof Line>[0]['options']} />
          </div>
        </div>

        <div ref={signalsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {SIGNALS.map((s, i) => (
            <div key={i} style={{
              background: 'var(--bg-2)', border: '1px solid var(--border)', padding: 32, borderRadius: 4,
              transition: 'transform 300ms var(--ease), border-color 300ms var(--ease)', opacity: 0,
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-2)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'; }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: s.amber ? 'rgba(245,166,35,0.12)' : 'rgba(0,212,180,0.12)',
                color: s.amber ? 'var(--amber)' : 'var(--teal)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20, fontSize: 20,
              }}>
                {s.icon}
              </div>
              <div style={{ fontFamily: 'var(--font-playfair, Playfair Display), serif', fontSize: 22, color: 'var(--ink)', marginBottom: 12, lineHeight: 1.2 }}>
                {s.headline}
              </div>
              <div style={{ fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontSize: 13, color: 'var(--ink-2)', letterSpacing: '0.02em' }}>
                {s.detail}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

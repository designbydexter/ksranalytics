'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  ArcElement, Title, Tooltip, Legend,
} from 'chart.js';

gsap.registerPlugin(ScrollTrigger);
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const COLOR = {
  bg0: '#0A0F1E', bg2: '#111827',
  teal: '#00D4B4', amber: '#F5A623',
  ink: '#F0F4FF', ink2: '#8896B3', ink3: '#5A6885',
  border: '#1E2A40', border2: '#2A3855',
};

const gridConfig = { color: 'rgba(30,42,64,0.5)', lineWidth: 1, drawTicks: false } as const;
const tickConfig = { color: COLOR.ink2, font: { family: "'Space Mono', monospace", size: 11 as number }, padding: 8 } as const;

const CITIES = [
  ['New York City Metro', 597],
  ['Greater Syracuse-Auburn', 411],
  ['Greater Delhi, India', 256],
  ['Los Angeles Metro', 210],
  ['San Francisco Bay Area', 182],
  ['Atlanta Metro', 173],
  ['Dallas-Fort Worth', 173],
  ['Greater Chicago', 163],
  ['DC-Baltimore', 145],
  ['Greater Philadelphia', 135],
] as [string, number][];

function GeoBar({ city, count, max, idx }: { city: string; count: number; max: number; idx: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;
        setTimeout(() => {
          gsap.fromTo(el, { width: '0%' }, { width: `${(count / max) * 100}%`, duration: 1.2, ease: 'power3.out' });
        }, idx * 60);
      },
    });
    return () => trigger.kill();
  }, [count, max, idx]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 70px', gap: 20, alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
      <div style={{ fontSize: 15, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontSize: 11, color: 'var(--ink-3)', marginRight: 4 }}>
          {String(idx + 1).padStart(2, '0')}
        </span>
        {city}
      </div>
      <div style={{ height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
        <div
          ref={barRef}
          style={{ height: '100%', background: 'linear-gradient(90deg, var(--teal), rgba(0,212,180,0.4))', width: '0%', borderRadius: 4 }}
        />
      </div>
      <div style={{ fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontWeight: 700, fontSize: 14, color: 'var(--ink)', textAlign: 'right' }}>
        {count.toLocaleString()}
      </div>
    </div>
  );
}

export default function AudienceIntelligence() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const grid1Ref = useRef<HTMLDivElement>(null);
  const callout1Ref = useRef<HTMLDivElement>(null);
  const funcCardRef = useRef<HTMLDivElement>(null);
  const callout2Ref = useRef<HTMLDivElement>(null);
  const gapCardRef = useRef<HTMLDivElement>(null);
  const callout3Ref = useRef<HTMLDivElement>(null);
  const sizeCardRef = useRef<HTMLDivElement>(null);
  const callout4Ref = useRef<HTMLDivElement>(null);
  const geoCardRef = useRef<HTMLDivElement>(null);
  const callout5Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = (trigger: Element | null, start = 'top 75%') => ({ trigger, start, once: true });

      gsap.fromTo([eyebrowRef.current, titleRef.current, introRef.current], { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12, scrollTrigger: st(sectionRef.current) });

      if (grid1Ref.current) {
        gsap.fromTo(grid1Ref.current.children, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15, scrollTrigger: st(grid1Ref.current) });
      }

      [callout1Ref, callout2Ref, callout3Ref, callout4Ref, callout5Ref].forEach(ref => {
        gsap.fromTo(ref.current, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: st(ref.current, 'top 85%') });
      });

      [funcCardRef, gapCardRef, sizeCardRef, geoCardRef].forEach(ref => {
        gsap.fromTo(ref.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: st(ref.current) });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const seniorityData = {
    labels: ['Senior', 'Entry', 'Director', 'Manager', 'VP', 'Owner', 'CXO'],
    datasets: [{
      label: 'Followers',
      data: [2340, 1583, 611, 519, 299, 224, 178],
      backgroundColor: (ctx: import('chart.js').ScriptableContext<'bar'>) => {
        const labels = ['Senior', 'Entry', 'Director', 'Manager', 'VP', 'Owner', 'CXO'];
        const dm = ['Director', 'VP', 'CXO'];
        return dm.includes(labels[ctx.dataIndex] ?? '') ? COLOR.amber : COLOR.teal;
      },
      borderRadius: 2,
      barThickness: 18,
    }],
  };

  const industryData = {
    labels: ['Market Research', 'Software Dev', 'IT Consulting', 'Higher Ed', 'Business Consulting', 'Advertising', 'Financial Services', 'Healthcare'],
    datasets: [{
      label: 'Followers',
      data: [1212, 365, 330, 288, 245, 232, 164, 109],
      backgroundColor: (ctx: import('chart.js').ScriptableContext<'bar'>) => ctx.dataIndex === 0 ? COLOR.teal : 'rgba(0,212,180,0.45)',
      borderRadius: 2,
      barThickness: 22,
    }],
  };

  const functionData = {
    labels: ['Business Development', 'Research', 'Sales', 'Marketing', 'IT', 'Operations'],
    datasets: [{
      label: 'Followers',
      data: [947, 566, 539, 524, 421, 360],
      backgroundColor: (ctx: import('chart.js').ScriptableContext<'bar'>) => ctx.dataIndex === 0 ? COLOR.amber : COLOR.teal,
      borderRadius: 2,
      barThickness: 22,
    }],
  };

  const gapData = {
    labels: ['Director', 'Senior', 'Entry', 'CXO'],
    datasets: [
      { label: 'Followers %', data: [10.4, 39.8, 26.9, 3.0], backgroundColor: COLOR.teal, borderRadius: 2, barThickness: 28 },
      { label: 'Visitors %', data: [19.6, 31.7, 25.4, 5.9], backgroundColor: COLOR.amber, borderRadius: 2, barThickness: 28 },
    ],
  };

  const sizeFollowData = {
    labels: ['10,001+ employees', '51–200 employees', '11–50 employees'],
    datasets: [{ data: [24.5, 17.5, 14.6], backgroundColor: [COLOR.teal, 'rgba(0,212,180,0.55)', 'rgba(0,212,180,0.28)'], borderColor: '#111827', borderWidth: 3 }],
  };

  const sizeVisitData = {
    labels: ['51–200 employees', '11–50 employees', '2–10 employees'],
    datasets: [{ data: [31.7, 27.2, 12.1], backgroundColor: [COLOR.amber, 'rgba(245,166,35,0.6)', 'rgba(245,166,35,0.3)'], borderColor: '#111827', borderWidth: 3 }],
  };

  const hBarOpts = (label: string) => ({
    indexAxis: 'y' as const,
    responsive: true, maintainAspectRatio: false,
    animation: { duration: 1000, easing: 'easeOutCubic' as const },
    plugins: { legend: { display: false }, tooltip: { backgroundColor: '#0E1426', titleColor: COLOR.ink, bodyColor: COLOR.ink, borderColor: COLOR.border2, borderWidth: 1, padding: 12, cornerRadius: 4, callbacks: { label: (ctx: import('chart.js').TooltipItem<'bar'>) => `${(ctx.parsed?.x ?? 0).toLocaleString()} followers` } } },
    scales: {
      x: { grid: gridConfig, ticks: { ...tickConfig, callback: (v: number | string) => Number(v).toLocaleString() } },
      y: { grid: { display: false }, ticks: { ...tickConfig, color: COLOR.ink, font: { family: "'DM Sans', sans-serif", size: 13 } } },
    },
  });

  const vBarOpts = {
    responsive: true, maintainAspectRatio: false,
    animation: { duration: 1000, easing: 'easeOutCubic' as const },
    plugins: { legend: { display: false }, tooltip: { backgroundColor: '#0E1426', titleColor: COLOR.ink, bodyColor: COLOR.ink, borderColor: COLOR.border2, borderWidth: 1, padding: 12, cornerRadius: 4, callbacks: { label: (ctx: import('chart.js').TooltipItem<'bar'>) => `${ctx.parsed.y.toLocaleString()} followers` } } },
    scales: {
      x: { grid: { display: false }, ticks: { ...tickConfig, font: { family: "'DM Sans', sans-serif", size: 11 }, maxRotation: 35, minRotation: 35 } },
      y: { grid: gridConfig, ticks: { ...tickConfig, callback: (v: number | string) => Number(v).toLocaleString() } },
    },
  };

  const donutOpts = {
    cutout: '64%',
    responsive: true, maintainAspectRatio: false,
    animation: { duration: 1000, easing: 'easeOutCubic' as const },
    plugins: { legend: { position: 'bottom' as const, labels: { color: COLOR.ink2, font: { family: "'DM Sans', sans-serif", size: 12 }, usePointStyle: true, padding: 14 } }, tooltip: { backgroundColor: '#0E1426', titleColor: COLOR.ink, bodyColor: COLOR.ink, borderColor: COLOR.border2, borderWidth: 1, padding: 12, cornerRadius: 4, callbacks: { label: (ctx: import('chart.js').TooltipItem<'doughnut'>) => `${ctx.label}: ${ctx.parsed}%` } } },
  };

  const maxCityCount = CITIES[0][1];

  return (
    <section ref={sectionRef} id="audience" style={{ padding: '120px 48px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        <div ref={eyebrowRef} style={{ fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12, opacity: 0 }}>
          <span style={{ width: 32, height: 1, background: 'var(--teal)', display: 'inline-block' }} />
          SECTION 06 · AUDIENCE INTELLIGENCE
        </div>

        <h2 ref={titleRef} style={{ fontFamily: 'var(--font-playfair, Playfair Display), Georgia, serif', fontWeight: 700, fontSize: 'clamp(36px, 4.2vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.01em', color: 'var(--ink)', marginBottom: 24, maxWidth: 920, opacity: 0 }}>
          Who is KS&amp;R's LinkedIn audience?
        </h2>

        <p ref={introRef} style={{ fontSize: 17, color: 'var(--ink-2)', maxWidth: 640, lineHeight: 1.65, marginBottom: 64, opacity: 0 }}>
          5,885 followers. 1,184 unique page visitors over 90 days. Here's who they are — and what it means.
        </p>

        {/* Seniority + Industry grid */}
        <div ref={grid1Ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 4, padding: 36, opacity: 0 }}>
            <h3 style={{ fontFamily: 'var(--font-playfair, Playfair Display), serif', fontWeight: 700, fontSize: 26, color: 'var(--ink)', marginBottom: 8, letterSpacing: '-0.01em' }}>Seniority Breakdown</h3>
            <p style={{ color: 'var(--ink-2)', fontSize: 14, marginBottom: 28 }}>Followers by job seniority (n = 5,885).</p>
            <div style={{ position: 'relative', height: 320 }}>
              <Bar data={seniorityData} options={hBarOpts('') as Parameters<typeof Bar>[0]['options']} />
            </div>
          </div>

          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 4, padding: 36, opacity: 0 }}>
            <h3 style={{ fontFamily: 'var(--font-playfair, Playfair Display), serif', fontWeight: 700, fontSize: 26, color: 'var(--ink)', marginBottom: 8, letterSpacing: '-0.01em' }}>Top Industries</h3>
            <p style={{ color: 'var(--ink-2)', fontSize: 14, marginBottom: 28 }}>Followers by industry — top 8.</p>
            <div style={{ position: 'relative', height: 320 }}>
              <Bar data={industryData} options={vBarOpts as Parameters<typeof Bar>[0]['options']} />
            </div>
          </div>
        </div>

        <div ref={callout1Ref} style={{ border: '1px solid var(--border)', background: 'var(--bg-2)', padding: '28px 32px', borderLeft: '3px solid var(--teal)', fontSize: 17, lineHeight: 1.55, color: 'var(--ink)', borderRadius: '0 4px 4px 0', marginBottom: 64, opacity: 0 }}>
          <span style={{ fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 10, display: 'block' }}>DECISION-MAKER SIGNAL</span>
          <strong style={{ color: 'var(--teal)', fontWeight: 600 }}>58.3%</strong> of KS&amp;R's audience holds Senior, Director, VP, or C-suite titles. This is a decision-maker audience. Market Research accounts for <strong style={{ color: 'var(--teal)', fontWeight: 600 }}>20.6%</strong> of all followers — KS&amp;R's peer set is watching.
        </div>

        {/* Job functions chart */}
        <div ref={funcCardRef} style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 4, padding: 36, marginBottom: 32, opacity: 0 }}>
          <h3 style={{ fontFamily: 'var(--font-playfair, Playfair Display), serif', fontWeight: 700, fontSize: 26, color: 'var(--ink)', marginBottom: 8, letterSpacing: '-0.01em' }}>Top Job Functions</h3>
          <p style={{ color: 'var(--ink-2)', fontSize: 14, marginBottom: 28 }}>What people following KS&amp;R actually do for a living.</p>
          <div style={{ position: 'relative', height: 280 }}>
            <Bar data={functionData} options={hBarOpts('') as Parameters<typeof Bar>[0]['options']} />
          </div>
        </div>

        <div ref={callout2Ref} style={{ border: '1px solid var(--border)', background: 'var(--bg-2)', padding: '28px 32px', borderLeft: '3px solid var(--teal)', fontSize: 17, lineHeight: 1.55, color: 'var(--ink)', borderRadius: '0 4px 4px 0', marginBottom: 64, opacity: 0 }}>
          <span style={{ fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 10, display: 'block' }}>PROSPECTING-READY</span>
          <strong style={{ color: 'var(--teal)', fontWeight: 600 }}>Business Development is the #1 job function</strong> following KS&amp;R — ahead of Research itself. This is a prospecting-ready audience.
        </div>

        {/* Gap chart */}
        <div ref={gapCardRef} style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 4, padding: 36, marginBottom: 32, opacity: 0 }}>
          <h3 style={{ fontFamily: 'var(--font-playfair, Playfair Display), serif', fontWeight: 700, fontSize: 26, color: 'var(--ink)', marginBottom: 8, letterSpacing: '-0.01em' }}>Visitors vs. Followers — The Seniority Gap</h3>
          <p style={{ color: 'var(--ink-2)', fontSize: 14, marginBottom: 28 }}>Where intent runs ahead of commitment.</p>
          <div style={{ position: 'relative', height: 320 }}>
            <Bar data={gapData} options={{
              responsive: true, maintainAspectRatio: false,
              animation: { duration: 1100, easing: 'easeOutCubic' },
              plugins: {
                legend: { position: 'top', align: 'end', labels: { color: COLOR.ink2, font: { family: "'Space Mono', monospace", size: 11 }, usePointStyle: true, padding: 16 } },
                tooltip: { backgroundColor: '#0E1426', titleColor: COLOR.ink, bodyColor: COLOR.ink, borderColor: COLOR.border2, borderWidth: 1, padding: 12, cornerRadius: 4, callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}%` } },
              },
              scales: {
                x: { grid: { display: false }, ticks: { ...tickConfig, color: COLOR.ink, font: { family: "'DM Sans', sans-serif", size: 13 } } },
                y: { grid: gridConfig, ticks: { ...tickConfig, callback: (v) => v + '%' }, beginAtZero: true },
              },
            } as Parameters<typeof Bar>[0]['options']} />
          </div>
        </div>

        <div ref={callout3Ref} style={{ border: '1px solid var(--border)', background: 'rgba(245,166,35,0.04)', padding: '28px 32px', borderLeft: '3px solid var(--amber)', fontSize: 17, lineHeight: 1.55, color: 'var(--ink)', borderRadius: '0 4px 4px 0', marginBottom: 64, opacity: 0 }}>
          <span style={{ fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 10, display: 'block' }}>HIGH-INTENT FUNNEL</span>
          Directors and CXOs are visiting KS&amp;R's page at nearly <strong style={{ color: 'var(--amber)', fontWeight: 600 }}>2× the rate they follow</strong>. High-intent decision-makers are in the funnel — they just haven't committed yet.
        </div>

        {/* Company size donuts */}
        <div ref={sizeCardRef} style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 4, padding: 36, marginBottom: 32, opacity: 0 }}>
          <h3 style={{ fontFamily: 'var(--font-playfair, Playfair Display), serif', fontWeight: 700, fontSize: 26, color: 'var(--ink)', marginBottom: 24, letterSpacing: '-0.01em' }}>Company Size: Followers vs. Visitors</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontSize: 11, color: 'var(--teal)', letterSpacing: '0.18em', marginBottom: 16 }}>FOLLOWERS · TOP 4</div>
              <div style={{ position: 'relative', height: 280 }}>
                <Doughnut data={sizeFollowData} options={donutOpts as Parameters<typeof Doughnut>[0]['options']} />
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontSize: 11, color: 'var(--amber)', letterSpacing: '0.18em', marginBottom: 16 }}>VISITORS · TOP 4</div>
              <div style={{ position: 'relative', height: 280 }}>
                <Doughnut data={sizeVisitData} options={donutOpts as Parameters<typeof Doughnut>[0]['options']} />
              </div>
            </div>
          </div>
        </div>

        <div ref={callout4Ref} style={{ border: '1px solid var(--border)', background: 'var(--bg-2)', padding: '28px 32px', borderLeft: '3px solid var(--teal)', fontSize: 17, lineHeight: 1.55, color: 'var(--ink)', borderRadius: '0 4px 4px 0', marginBottom: 64, opacity: 0 }}>
          <span style={{ fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 10, display: 'block' }}>WHERE THEY WORK</span>
          Followers are mostly from large companies (<strong style={{ color: 'var(--teal)', fontWeight: 600 }}>10,001+ employees</strong> is #1 at 24.5%). Visitors are mostly from small and mid-size companies (<strong style={{ color: 'var(--teal)', fontWeight: 600 }}>51–200</strong> is #1 at 31.7%, <strong style={{ color: 'var(--teal)', fontWeight: 600 }}>11–50</strong> is #2 at 27.2%). Smaller firms are coming to check KS&amp;R out — they just aren't following yet.
        </div>

        {/* Geo chart */}
        <div ref={geoCardRef} style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 4, padding: 36, marginBottom: 32, opacity: 0 }}>
          <h3 style={{ fontFamily: 'var(--font-playfair, Playfair Display), serif', fontWeight: 700, fontSize: 26, color: 'var(--ink)', marginBottom: 8, letterSpacing: '-0.01em' }}>Geographic Reach</h3>
          <p style={{ color: 'var(--ink-2)', fontSize: 14, marginBottom: 28 }}>Top 10 cities by follower count.</p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {CITIES.map(([city, count], i) => (
              <GeoBar key={i} city={city} count={count} max={maxCityCount} idx={i} />
            ))}
          </div>
        </div>

        <div ref={callout5Ref} style={{ border: '1px solid var(--border)', background: 'var(--bg-2)', padding: '28px 32px', borderLeft: '3px solid var(--teal)', fontSize: 17, lineHeight: 1.55, color: 'var(--ink)', borderRadius: '0 4px 4px 0', opacity: 0 }}>
          <span style={{ fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 10, display: 'block' }}>GLOBAL REACH</span>
          KS&amp;R's audience spans <strong style={{ color: 'var(--teal)', fontWeight: 600 }}>100 cities across 6 continents</strong>. India is the 3rd-largest market by followers — a meaningful international footprint for a Syracuse-headquartered firm.
        </div>

      </div>
    </section>
  );
}

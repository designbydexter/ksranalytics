'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, LineElement, PointElement,
  Title, Tooltip, Legend, Filler,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

gsap.registerPlugin(ScrollTrigger);
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, Filler);

const COLOR = {
  bg0: '#0A0F1E', bg2: '#111827',
  teal: '#00D4B4', tealSoft: 'rgba(0,212,180,0.15)',
  amber: '#F5A623', amberSoft: 'rgba(245,166,35,0.18)',
  ink: '#F0F4FF', ink2: '#8896B3', ink3: '#5A6885',
  border: '#1E2A40', border2: '#2A3855',
};

const gridConfig = { color: 'rgba(30,42,64,0.5)', lineWidth: 1, drawTicks: false } as const;
const tickConfig = { color: COLOR.ink2, font: { family: "'Space Mono', monospace", size: 11 as number }, padding: 8 } as const;

const TOP_POSTS = [
  { rank: '01', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7437498788468084737', excerpt: '"We couldn\'t resist the trend. The baby photos are cute. The people behind the insights are even better."', date: 'MAR 11, 2026', type: 'Culture / People', likes: 40, comments: 6, reposts: 8, er: '148.1%', impressions: 927 },
  { rank: '02', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7422987999585476608', excerpt: '"Three words, straight from the people who live the work. At KS&R, insight is shared, energy is collective…"', date: 'JAN 30, 2026', type: 'Video', likes: 35, comments: 6, reposts: 5, er: '17.3%', impressions: 805 },
  { rank: '03', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7419726248605593600', excerpt: '"KS&R Chairman Jay Scott didn\'t start his career in a boardroom. He started in grocery stores, selling candy bars…"', date: 'JAN 21, 2026', type: 'Video', likes: 26, comments: 4, reposts: 4, er: '14.4%', impressions: 804 },
  { rank: '04', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7420088700161810432', excerpt: '"Christine Nelson\'s role at KS&R has evolved at every stage. She began focused on a single core account…"', date: 'JAN 22, 2026', type: 'Video', likes: 35, comments: 2, reposts: 5, er: '14.4%', impressions: 717 },
  { rank: '05', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7434975974573723648', excerpt: '"A big #KSRcrew welcome to our newest teammates!"', date: 'MAR 4, 2026', type: 'Culture / People', likes: 35, comments: 6, reposts: 1, er: '79.3%', impressions: 677 },
];

export default function ContentPerformance() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const chartCardRef = useRef<HTMLDivElement>(null);
  const callout1Ref = useRef<HTMLDivElement>(null);
  const postsHeaderRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);
  const callout2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const triggerOpts = (trigger: Element | null, start = 'top 75%') => ({
        trigger, start, once: true,
      });

      gsap.fromTo(
        [eyebrowRef.current, titleRef.current],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12, scrollTrigger: triggerOpts(sectionRef.current) }
      );

      gsap.fromTo(
        chartCardRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: triggerOpts(chartCardRef.current) }
      );

      gsap.fromTo(
        callout1Ref.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: triggerOpts(callout1Ref.current, 'top 85%') }
      );

      gsap.fromTo(
        postsHeaderRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: triggerOpts(postsHeaderRef.current) }
      );

      if (postsRef.current) {
        gsap.fromTo(
          postsRef.current.children,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1, scrollTrigger: triggerOpts(postsRef.current) }
        );
      }

      gsap.fromTo(
        callout2Ref.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: triggerOpts(callout2Ref.current, 'top 85%') }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const monthlyData = {
    labels: ['Jan 2026', 'Feb 2026', 'Mar 2026', 'Apr 2026 (partial)'],
    datasets: [
      {
        type: 'bar' as const,
        label: 'Organic Impressions',
        data: [8906, 16932, 15101, 6420],
        backgroundColor: COLOR.tealSoft,
        borderColor: COLOR.teal,
        borderWidth: 1.5,
        borderRadius: 2,
        yAxisID: 'y',
        order: 2,
      },
      {
        type: 'line' as const,
        label: 'Avg Engagement Rate (%)',
        data: [14.1, 16.9, 22.7, 20.1],
        borderColor: COLOR.amber,
        backgroundColor: COLOR.amber,
        borderWidth: 2.5,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: COLOR.bg0,
        pointBorderWidth: 2,
        tension: 0.35,
        yAxisID: 'y1',
        order: 1,
      },
    ],
  };

  return (
    <section
      ref={sectionRef}
      id="content"
      style={{
        padding: '120px 48px',
        background: 'linear-gradient(to bottom, var(--bg-0) 0%, var(--bg-1) 50%, var(--bg-0) 100%)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Header */}
        <div
          ref={eyebrowRef}
          style={{
            fontFamily: 'var(--font-space-mono, Space Mono), monospace',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 20,
            display: 'flex', alignItems: 'center', gap: 12, opacity: 0,
          }}
        >
          <span style={{ width: 32, height: 1, background: 'var(--teal)', display: 'inline-block' }} />
          SECTION 03 · CONTENT PERFORMANCE
        </div>

        <h2
          ref={titleRef}
          style={{
            fontFamily: 'var(--font-playfair, Playfair Display), Georgia, serif',
            fontWeight: 700, fontSize: 'clamp(36px, 4.2vw, 56px)', lineHeight: 1.05,
            letterSpacing: '-0.01em', color: 'var(--ink)', marginBottom: 64,
            maxWidth: 920, opacity: 0,
          }}
        >
          125 posts. Here's what the data says.
        </h2>

        {/* Monthly chart card */}
        <div
          ref={chartCardRef}
          style={{
            background: 'var(--bg-2)', border: '1px solid var(--border)',
            borderRadius: 4, padding: 36, marginBottom: 32, opacity: 0,
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-playfair, Playfair Display), serif', fontWeight: 700, fontSize: 26, color: 'var(--ink)', marginBottom: 8, letterSpacing: '-0.01em' }}>
            Monthly Volume &amp; Engagement
          </h3>
          <p style={{ color: 'var(--ink-2)', fontSize: 14, marginBottom: 28 }}>
            Organic impressions per month against average engagement rate.
          </p>
          <div style={{ position: 'relative', height: 380 }}>
            <Chart
              type="bar"
              data={monthlyData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                animation: { duration: 1100, easing: 'easeOutCubic' },
                plugins: {
                  legend: {
                    position: 'top', align: 'end',
                    labels: { color: COLOR.ink2, font: { family: "'Space Mono', monospace", size: 11 }, usePointStyle: true, padding: 16 },
                  },
                  tooltip: {
                    backgroundColor: '#0E1426', titleColor: COLOR.ink, bodyColor: COLOR.ink,
                    borderColor: COLOR.border2, borderWidth: 1, padding: 12, cornerRadius: 4,
                    callbacks: {
                      label: (ctx) => ctx.dataset.yAxisID === 'y1'
                        ? `${ctx.dataset.label}: ${ctx.parsed.y}%`
                        : `${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString()}`,
                    },
                  },
                },
                scales: {
                  x: { grid: { display: false }, ticks: tickConfig },
                  y: { position: 'left', grid: gridConfig, ticks: { ...tickConfig, callback: (v) => Number(v).toLocaleString() }, title: { display: true, text: 'IMPRESSIONS', color: COLOR.teal, font: { family: "'Space Mono', monospace", size: 10 } } },
                  y1: { position: 'right', grid: { display: false }, ticks: { ...tickConfig, callback: (v) => v + '%' }, title: { display: true, text: 'ENGAGEMENT RATE', color: COLOR.amber, font: { family: "'Space Mono', monospace", size: 10 } } },
                },
              }}
            />
          </div>
        </div>

        {/* Callout 1 */}
        <div
          ref={callout1Ref}
          style={{
            border: '1px solid var(--border)', background: 'var(--bg-2)', padding: '28px 32px',
            borderLeft: '3px solid var(--teal)', fontSize: 17, lineHeight: 1.55,
            color: 'var(--ink)', borderRadius: '0 4px 4px 0', marginBottom: 64, opacity: 0,
          }}
        >
          <span style={{ fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 10, display: 'block' }}>
            INSIGHT
          </span>
          Engagement rate increased <strong style={{ color: 'var(--teal)', fontWeight: 600 }}>61%</strong> from January to March — even as posting volume scaled. Quality and quantity moved in the same direction.
        </div>

        {/* Posts header */}
        <div ref={postsHeaderRef} style={{ marginBottom: 24, opacity: 0 }}>
          <h3 style={{ fontFamily: 'var(--font-playfair, Playfair Display), serif', fontWeight: 700, fontSize: 28, color: 'var(--ink)', marginBottom: 6, letterSpacing: '-0.01em' }}>
            Top 5 Organic Posts by Impressions
          </h3>
          <p style={{ color: 'var(--ink-2)', fontSize: 14, marginBottom: 28 }}>
            Ranked by reach. Click any title to open the post on LinkedIn.
          </p>
        </div>

        {/* Posts list */}
        <div ref={postsRef} style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {TOP_POSTS.map((post, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '72px 1fr auto',
                gap: 24,
                alignItems: 'start',
                background: 'var(--bg-2)',
                border: '1px solid var(--border)',
                padding: '22px 26px',
                borderRadius: 4,
                transition: 'border-color 200ms var(--ease), transform 200ms var(--ease)',
                opacity: 0,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateX(4px)';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-2)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateX(0)';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
              }}
            >
              {/* Rank */}
              <div style={{ fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontWeight: 700, fontSize: 36, color: 'var(--amber)', lineHeight: 1.1 }}>
                {post.rank}
              </div>

              {/* Main content */}
              <div style={{ minWidth: 0 }}>
                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', color: 'var(--ink)', fontSize: 15, lineHeight: 1.5, fontStyle: 'italic', textDecoration: 'none', marginBottom: 10, transition: 'color 160ms var(--ease)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--teal)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink)'; }}
                >
                  {post.excerpt}
                  <span style={{ display: 'inline', fontStyle: 'normal', fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontSize: 11, color: 'var(--ink-3)', marginLeft: 6 }}>↗</span>
                </a>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontSize: 11, color: 'var(--ink-2)', letterSpacing: '0.05em' }}>
                  <span>{post.date}</span>
                  <span style={{ color: 'var(--ink-3)' }}>·</span>
                  <span>{post.type}</span>
                  <span style={{ color: 'var(--ink-3)' }}>·</span>
                  <span>♥ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                  <span>↻ {post.reposts}</span>
                  <span style={{ color: 'var(--ink-3)' }}>·</span>
                  <span style={{ color: 'var(--teal)' }}>ER {post.er}</span>
                </div>
              </div>

              {/* Impressions */}
              <div style={{ textAlign: 'right', fontFamily: 'var(--font-space-mono, Space Mono), monospace', whiteSpace: 'nowrap' }}>
                <span style={{ fontWeight: 700, fontSize: 22, color: 'var(--ink)', lineHeight: 1, display: 'block' }}>{post.impressions}</span>
                <span style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginTop: 6 }}>Impressions</span>
              </div>
            </div>
          ))}
        </div>

        {/* Callout 2 */}
        <div
          ref={callout2Ref}
          style={{
            border: '1px solid var(--border)', background: 'var(--bg-2)', padding: '28px 32px',
            borderLeft: '3px solid var(--teal)', fontSize: 17, lineHeight: 1.55,
            color: 'var(--ink)', borderRadius: '0 4px 4px 0', opacity: 0,
          }}
        >
          <span style={{ fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 10, display: 'block' }}>
            PATTERN
          </span>
          The most-seen posts are a mix of{' '}
          <strong style={{ color: 'var(--teal)', fontWeight: 600 }}>people-first culture content and SFM-produced video</strong>.
          {' '}Humans behind the research, told on camera.
        </div>

      </div>
    </section>
  );
}

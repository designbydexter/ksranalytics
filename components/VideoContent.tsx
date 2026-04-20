'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement,
  PointElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

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

const VIDEO_POSTS = [
  { rank: '01', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7422987999585476608', excerpt: '"Three words, straight from the people who live the work…"', date: 'JAN 30, 2026', likes: 35, er: '17.3%', impressions: 805, views: '361 Views' },
  { rank: '02', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7419726248605593600', excerpt: '"KS&R Chairman Jay Scott didn\'t start his career in a boardroom…"', date: 'JAN 21, 2026', likes: 26, er: '14.4%', impressions: 804, views: '405 Views' },
  { rank: '03', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7420088700161810432', excerpt: '"Christine Nelson\'s role at KS&R has evolved at every stage…"', date: 'JAN 22, 2026', likes: 35, er: '14.4%', impressions: 717, views: '408 Views' },
  { rank: '04', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7443267085272748032', excerpt: '"If market research were an Olympic sport, gold would go to whoever can turn the most complex challenge…"', date: 'MAR 27, 2026', likes: 23, er: '15.5%', impressions: 672, views: '341 Views' },
  { rank: '05', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7432047530328334336', excerpt: '"Remote work still needs real connection. That\'s why we bring people together…"', date: 'FEB 24, 2026', likes: 33, er: '12.0%', impressions: 668, views: '313 Views' },
];

const VSTATS = [
  { label: 'Total Video Posts', val: '74' },
  { label: 'Avg Views / Post', val: '210' },
  { label: 'Total Video Views', val: '29,528' },
];

export default function VideoContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const chart1Ref = useRef<HTMLDivElement>(null);
  const callout1Ref = useRef<HTMLDivElement>(null);
  const chart2Ref = useRef<HTMLDivElement>(null);
  const callout2Ref = useRef<HTMLDivElement>(null);
  const postsHeaderRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);
  const callout3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = (trigger: Element | null, start = 'top 75%') => ({
        trigger, start, once: true,
      });

      gsap.fromTo([eyebrowRef.current, titleRef.current, introRef.current], { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12, scrollTrigger: st(sectionRef.current) });

      if (statsRef.current) {
        gsap.fromTo(statsRef.current.children, { y: 40, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)', stagger: 0.1, scrollTrigger: st(statsRef.current) });
      }

      gsap.fromTo(chart1Ref.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: st(chart1Ref.current) });
      gsap.fromTo(callout1Ref.current, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: st(callout1Ref.current, 'top 85%') });
      gsap.fromTo(chart2Ref.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: st(chart2Ref.current) });
      gsap.fromTo(callout2Ref.current, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: st(callout2Ref.current, 'top 85%') });
      gsap.fromTo(postsHeaderRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: st(postsHeaderRef.current) });

      if (postsRef.current) {
        gsap.fromTo(postsRef.current.children, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1, scrollTrigger: st(postsRef.current) });
      }

      gsap.fromTo(callout3Ref.current, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: st(callout3Ref.current, 'top 85%') });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const months = ['Jan 2026', 'Feb 2026', 'Mar 2026', 'Apr 2026 (partial)'];

  const erData = {
    labels: months,
    datasets: [{
      label: 'Video ER (%)',
      data: [14.6, 15.2, 15.8, 16.1],
      borderColor: COLOR.amber,
      backgroundColor: 'rgba(245,166,35,0)',
      borderWidth: 2.5,
      fill: true,
      tension: 0.4,
      pointRadius: 6,
      pointHoverRadius: 9,
      pointBackgroundColor: COLOR.bg0,
      pointBorderColor: COLOR.amber,
      pointBorderWidth: 2.5,
    }],
  };

  const viewData = {
    labels: months,
    datasets: [{
      label: 'Viewers per 100 Impressions',
      data: [51, 53, 56, 57],
      backgroundColor: (ctx: import('chart.js').ScriptableContext<'bar'>) => ctx.parsed && ctx.parsed.y >= 55 ? COLOR.teal : 'rgba(0,212,180,0.55)',
      borderRadius: 2,
      barThickness: 48,
    }],
  };

  const chartOpts = (yLabel: string, isLine = false) => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: isLine ? 1400 : 1100, easing: 'easeOutCubic' as const },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0E1426', titleColor: COLOR.ink, bodyColor: COLOR.ink,
        borderColor: COLOR.border2, borderWidth: 1, padding: 12, cornerRadius: 4,
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: tickConfig },
      y: { grid: gridConfig, ticks: { ...tickConfig, callback: (v: number | string) => v + (isLine ? '%' : '') }, suggestedMin: isLine ? 12 : 0, suggestedMax: isLine ? 20 : 100, title: { display: true, text: yLabel, color: isLine ? COLOR.amber : COLOR.teal, font: { family: "'Space Mono', monospace", size: 10 } } },
    },
  });

  return (
    <section ref={sectionRef} id="video" style={{ padding: '120px 48px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        <div ref={eyebrowRef} style={{ fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12, opacity: 0 }}>
          <span style={{ width: 32, height: 1, background: 'var(--teal)', display: 'inline-block' }} />
          SECTION 04 · VIDEO CONTENT BY SHORT FORM MEDIA
        </div>

        <h2 ref={titleRef} style={{ fontFamily: 'var(--font-playfair, Playfair Display), Georgia, serif', fontWeight: 700, fontSize: 'clamp(36px, 4.2vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.01em', color: 'var(--ink)', marginBottom: 24, maxWidth: 920, opacity: 0 }}>
          Video Content: 74 Posts, Building Momentum
        </h2>

        <p ref={introRef} style={{ fontSize: 17, color: 'var(--ink-2)', maxWidth: 640, lineHeight: 1.65, marginBottom: 64, opacity: 0 }}>
          These are the video posts produced by Short Form Media. 74 videos published over 90 days. Here's how they performed — and where the trend is heading.
        </p>

        {/* Stat tiles */}
        <div ref={statsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          {VSTATS.map((s, i) => (
            <div key={i} style={{
              background: 'var(--bg-2)', border: '1px solid var(--border)', borderTop: '2px solid var(--amber)',
              padding: 28, borderRadius: 4, opacity: 0,
            }}>
              <div style={{ fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-2)', marginBottom: 14 }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontWeight: 700, fontSize: 38, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* ER chart */}
        <div ref={chart1Ref} style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 4, padding: 36, marginBottom: 32, opacity: 0 }}>
          <h3 style={{ fontFamily: 'var(--font-playfair, Playfair Display), serif', fontWeight: 700, fontSize: 26, color: 'var(--ink)', marginBottom: 8, letterSpacing: '-0.01em' }}>Video Engagement Rate: Month by Month</h3>
          <p style={{ color: 'var(--ink-2)', fontSize: 14, marginBottom: 28 }}>Average engagement rate across video posts per month.</p>
          <div style={{ position: 'relative', height: 320 }}>
            <Line data={erData} options={chartOpts('ENGAGEMENT RATE %', true) as Parameters<typeof Line>[0]['options']} />
          </div>
        </div>

        <div ref={callout1Ref} style={{ border: '1px solid var(--border)', background: 'var(--bg-2)', padding: '28px 32px', borderLeft: '3px solid var(--amber)', fontSize: 17, lineHeight: 1.55, color: 'var(--ink)', borderRadius: '0 4px 4px 0', marginBottom: 64, opacity: 0 }}>
          <span style={{ fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 10, display: 'block' }}>TREND</span>
          Video engagement rate has grown <strong style={{ color: 'var(--amber)', fontWeight: 600 }}>10.6%</strong> from January to April — from 14.6% to 16.1%. The trend is moving in the right direction.
        </div>

        {/* View rate chart */}
        <div ref={chart2Ref} style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 4, padding: 36, marginBottom: 32, opacity: 0 }}>
          <h3 style={{ fontFamily: 'var(--font-playfair, Playfair Display), serif', fontWeight: 700, fontSize: 26, color: 'var(--ink)', marginBottom: 8, letterSpacing: '-0.01em' }}>Video View Rate: Viewers per 100 Impressions</h3>
          <p style={{ color: 'var(--ink-2)', fontSize: 14, marginBottom: 28 }}>Out of every 100 people who saw a video, this many watched it.</p>
          <div style={{ position: 'relative', height: 320 }}>
            <Bar data={viewData} options={chartOpts('VIEWERS / 100 IMPR') as Parameters<typeof Bar>[0]['options']} />
          </div>
        </div>

        <div ref={callout2Ref} style={{ border: '1px solid var(--border)', background: 'var(--bg-2)', padding: '28px 32px', borderLeft: '3px solid var(--teal)', fontSize: 17, lineHeight: 1.55, color: 'var(--ink)', borderRadius: '0 4px 4px 0', marginBottom: 64, opacity: 0 }}>
          <span style={{ fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 10, display: 'block' }}>HOLDING STRONG</span>
          View rate held above <strong style={{ color: 'var(--teal)', fontWeight: 600 }}>50%</strong> every month. In March and April, more than <strong style={{ color: 'var(--teal)', fontWeight: 600 }}>55 out of every 100</strong> people who saw a video actually stopped to watch it.
        </div>

        {/* Top 5 videos */}
        <div ref={postsHeaderRef} style={{ marginBottom: 24, opacity: 0 }}>
          <h3 style={{ fontFamily: 'var(--font-playfair, Playfair Display), serif', fontWeight: 700, fontSize: 28, color: 'var(--ink)', marginBottom: 6, letterSpacing: '-0.01em' }}>Top 5 Video Posts by Impressions</h3>
          <p style={{ color: 'var(--ink-2)', fontSize: 14, marginBottom: 28 }}>SFM-produced video, ranked by reach. Click any title to open on LinkedIn.</p>
        </div>

        <div ref={postsRef} style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {VIDEO_POSTS.map((post, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '72px 1fr auto', gap: 24, alignItems: 'start', background: 'var(--bg-2)', border: '1px solid var(--border)', padding: '22px 26px', borderRadius: 4, transition: 'border-color 200ms var(--ease), transform 200ms var(--ease)', opacity: 0 }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateX(4px)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-2)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateX(0)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'; }}
            >
              <div style={{ fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontWeight: 700, fontSize: 36, color: 'var(--amber)', lineHeight: 1.1 }}>{post.rank}</div>
              <div style={{ minWidth: 0 }}>
                <a href={post.href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', color: 'var(--ink)', fontSize: 15, lineHeight: 1.5, fontStyle: 'italic', textDecoration: 'none', marginBottom: 10, transition: 'color 160ms var(--ease)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--teal)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink)'; }}
                >
                  {post.excerpt}
                  <span style={{ display: 'inline', fontStyle: 'normal', fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontSize: 11, color: 'var(--ink-3)', marginLeft: 6 }}>↗</span>
                </a>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontSize: 11, color: 'var(--ink-2)', letterSpacing: '0.05em' }}>
                  <span>{post.date}</span>
                  <span style={{ color: 'var(--ink-3)' }}>·</span>
                  <span>♥ {post.likes}</span>
                  <span style={{ color: 'var(--ink-3)' }}>·</span>
                  <span style={{ color: 'var(--teal)' }}>ER {post.er}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right', fontFamily: 'var(--font-space-mono, Space Mono), monospace', whiteSpace: 'nowrap' }}>
                <span style={{ fontWeight: 700, fontSize: 22, color: 'var(--ink)', lineHeight: 1, display: 'block' }}>{post.impressions}</span>
                <span style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginTop: 6 }}>Impressions</span>
                <span style={{ display: 'block', fontSize: 13, color: 'var(--amber)', marginTop: 8, fontWeight: 700 }}>{post.views}</span>
              </div>
            </div>
          ))}
        </div>

        <div ref={callout3Ref} style={{ border: '1px solid var(--border)', background: 'var(--bg-2)', padding: '28px 32px', borderLeft: '3px solid var(--amber)', fontSize: 17, lineHeight: 1.55, color: 'var(--ink)', borderRadius: '0 4px 4px 0', opacity: 0 }}>
          <span style={{ fontFamily: 'var(--font-space-mono, Space Mono), monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 10, display: 'block' }}>THE FOUNDATION</span>
          <strong style={{ color: 'var(--amber)', fontWeight: 600 }}>3 of the top 5 most-viewed posts</strong> on the entire page are video. View rates are holding above <strong style={{ color: 'var(--amber)', fontWeight: 600 }}>55%</strong> in March and April. Engagement rate is trending up. The foundation is there — stronger copy and tighter hooks will compound these numbers.
        </div>

      </div>
    </section>
  );
}

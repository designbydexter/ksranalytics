'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const KPIS = [
  { meta: '01a', count: 50560, label: 'Organic Impressions', decimals: 0, suffix: '' },
  { meta: '01b', count: 443595, label: 'Paid Impressions', decimals: 0, suffix: '' },
  { meta: '02', count: 19.1, label: 'Organic Engagement Rate', decimals: 1, suffix: '%' },
  { meta: '03', count: 2732, label: 'Total Page Visits', decimals: 0, suffix: '' },
  { meta: '04', count: 169, label: 'New Followers Gained', decimals: 0, suffix: '' },
  { meta: '05', count: 125, label: 'Total Posts Published', decimals: 0, suffix: '' },
];

function animateCount(el: HTMLElement, target: number, decimals: number, suffix: string, duration = 1800) {
  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const cur = target * eased;
    const display = decimals > 0 ? cur.toFixed(decimals) : Math.floor(cur).toLocaleString('en-US');
    el.textContent = display + suffix;
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = (decimals > 0 ? target.toFixed(decimals) : target.toLocaleString('en-US')) + suffix;
  };
  requestAnimationFrame(step);
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const kpiRowRef = useRef<HTMLDivElement>(null);
  const footRef = useRef<HTMLParagraphElement>(null);
  const kpiNumRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // Particle canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0;
    let animId: number;

    const particles: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];
    const N = 70;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      w = canvas.width = rect.width * window.devicePixelRatio;
      h = canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < N; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: Math.random() * 1.6 + 0.4,
          a: Math.random() * 0.45 + 0.1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const threshold = 150 * window.devicePixelRatio;
          if (d < threshold) {
            const op = (1 - d / threshold) * 0.14;
            ctx.strokeStyle = `rgba(0, 212, 180, ${op})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      particles.forEach(p => {
        ctx.fillStyle = `rgba(0, 212, 180, ${p.a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();
    window.addEventListener('resize', () => { resize(); init(); });

    // GSAP entrance timeline
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      eyebrowRef.current,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
    )
    .fromTo(
      titleRef.current,
      { y: 60, opacity: 0, skewY: 2 },
      { y: 0, opacity: 1, skewY: 0, duration: 0.9, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(
      subRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(
      kpiRowRef.current!.children,
      { y: 40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out', stagger: 0.08 },
      '-=0.4'
    )
    .fromTo(
      footRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.2'
    );

    // Trigger count-ups after KPI tiles animate in
    tl.call(() => {
      kpiNumRefs.current.forEach((el, i) => {
        if (!el) return;
        const kpi = KPIS[i];
        setTimeout(() => animateCount(el, kpi.count, kpi.decimals, kpi.suffix), i * 80);
      });
    }, [], '-=0.4');

    return () => {
      cancelAnimationFrame(animId);
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        minHeight: '100vh',
        paddingTop: 140,
        paddingBottom: 80,
        paddingLeft: 48,
        paddingRight: 48,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background layer */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        {/* Grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(to right, rgba(30,42,64,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,42,64,0.4) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 75%)',
          }}
        />
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            width: 800,
            height: 800,
            left: '50%',
            top: '30%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(0,212,180,0.08) 0%, transparent 60%)',
            filter: 'blur(40px)',
          }}
        />
        {/* Particles */}
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', width: '100%' }}>

        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          style={{
            fontFamily: 'var(--font-space-mono, Space Mono), monospace',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'var(--teal)',
            marginBottom: 28,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '8px 16px',
            border: '1px solid var(--border)',
            background: 'rgba(0,212,180,0.04)',
            borderRadius: 100,
            opacity: 0,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              background: 'var(--teal)',
              borderRadius: '50%',
              boxShadow: '0 0 8px var(--teal-glow)',
              animation: 'pulse 2s ease-in-out infinite',
              display: 'inline-block',
            }}
          />
          90-DAY PERFORMANCE REPORT · LIVE DATA
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          style={{
            fontFamily: 'var(--font-playfair, Playfair Display), Georgia, serif',
            fontWeight: 900,
            fontSize: 'clamp(56px, 8vw, 116px)',
            lineHeight: 0.95,
            letterSpacing: '-0.025em',
            marginBottom: 32,
            opacity: 0,
          }}
        >
          KS&amp;R on{' '}
          <span style={{ fontStyle: 'italic', fontWeight: 700, color: 'var(--teal)' }}>
            LinkedIn
          </span>
          <br />
          90-Day Performance Report
        </h1>

        {/* Subheadline */}
        <div
          ref={subRef}
          style={{
            fontSize: 18,
            color: 'var(--ink-2)',
            letterSpacing: '0.02em',
            marginBottom: 64,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
            opacity: 0,
          }}
        >
          <span>January 19 – April 18, 2026</span>
          <span style={{ color: 'var(--ink-3)' }}>·</span>
          <span>Prepared by</span>
          <span
            style={{
              fontFamily: 'var(--font-space-mono, Space Mono), monospace',
              fontSize: 12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              padding: '6px 12px',
              border: '1px solid var(--border-2)',
              borderRadius: 4,
            }}
          >
            Short Form Media
          </span>
        </div>

        {/* KPI Row */}
        <div
          ref={kpiRowRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 16,
            marginBottom: 32,
          }}
        >
          {KPIS.map((kpi, i) => (
            <div
              key={i}
              style={{
                position: 'relative',
                background: 'var(--bg-2)',
                border: '1px solid var(--border)',
                padding: '32px 24px 28px',
                borderRadius: 4,
                overflow: 'hidden',
                transition: 'transform 300ms var(--ease), border-color 300ms var(--ease)',
                opacity: 0,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-2)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'; }}
            >
              {/* Top border accent */}
              <div
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: 2,
                  background: 'var(--teal)',
                  boxShadow: '0 0 16px var(--teal-glow)',
                }}
              />
              {/* Meta label */}
              <span
                style={{
                  position: 'absolute',
                  top: 14, right: 18,
                  fontFamily: 'var(--font-space-mono, Space Mono), monospace',
                  fontSize: 10,
                  color: 'var(--ink-3)',
                  letterSpacing: '0.1em',
                }}
              >
                {kpi.meta}
              </span>
              {/* Number */}
              <div
                style={{
                  fontFamily: 'var(--font-space-mono, Space Mono), monospace',
                  fontWeight: 700,
                  fontSize: 'clamp(24px, 2.2vw, 34px)',
                  color: 'var(--ink)',
                  lineHeight: 1,
                  marginBottom: 12,
                  letterSpacing: '-0.02em',
                }}
              >
                <span ref={el => { kpiNumRefs.current[i] = el; }}>0</span>
              </div>
              {/* Label */}
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: 'var(--ink-2)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                }}
              >
                {kpi.label}
              </div>
            </div>
          ))}

          {/* Total impressions line */}
          <div
            style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              fontFamily: 'var(--font-space-mono, Space Mono), monospace',
              fontSize: 11,
              letterSpacing: '0.2em',
              color: 'var(--ink-3)',
              textTransform: 'uppercase',
              marginTop: -8,
              marginBottom: 8,
            }}
          >
            TOTAL IMPRESSIONS ·{' '}
            <strong style={{ color: 'var(--ink)', fontWeight: 400 }}>494,155</strong>
            {' '}· ORGANIC 10.2% · PAID 89.8%
          </div>
        </div>

        {/* Footer note */}
        <p
          ref={footRef}
          style={{
            fontStyle: 'italic',
            color: 'var(--ink-2)',
            fontSize: 14,
            maxWidth: 720,
            opacity: 0,
          }}
        >
          Organic engagement rate of{' '}
          <strong style={{ color: 'var(--teal)', fontStyle: 'normal', fontWeight: 500 }}>
            19.1%
          </strong>{' '}
          significantly exceeds the B2B LinkedIn industry average of 1–5%.
        </p>
      </div>
    </section>
  );
}

'use client';

import dynamic from 'next/dynamic';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';

// Dynamic imports for chart-heavy sections (client-only)
const Funnel = dynamic(() => import('@/components/Funnel'), { ssr: false });
const ContentPerformance = dynamic(() => import('@/components/ContentPerformance'), { ssr: false });
const VideoContent = dynamic(() => import('@/components/VideoContent'), { ssr: false });
const PaidVsOrganic = dynamic(() => import('@/components/PaidVsOrganic'), { ssr: false });
const AudienceIntelligence = dynamic(() => import('@/components/AudienceIntelligence'), { ssr: false });
const GrowthSignal = dynamic(() => import('@/components/GrowthSignal'), { ssr: false });
const WhatsNext = dynamic(() => import('@/components/WhatsNext'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function Home() {
  return (
    <main style={{ background: 'var(--bg-0)' }}>
      <Nav />
      <Hero />
      <Funnel />
      <ContentPerformance />
      <VideoContent />
      <PaidVsOrganic />
      <AudienceIntelligence />
      <GrowthSignal />
      <WhatsNext />
      <Footer />
    </main>
  );
}

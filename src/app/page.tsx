'use client';

import HeroSection from '@/components/HeroSection';
import TopNav from '@/components/landing/TopNav';
import AfterHero from '@/components/landing/AfterHero';
import HowItWorks from '@/components/landing/HowItWorks';
import ROI from '@/components/landing/ROI';
import Pricing from '@/components/landing/Pricing';
import Security from '@/components/landing/Security';
import Integrations from '@/components/landing/Integrations';
import HawkeyeBeta from '@/components/landing/HawkeyeBeta';
import Team from '@/components/landing/Team';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <TopNav />
      <HeroSection />
      <AfterHero />
      <HowItWorks />
      <ROI />
      <Pricing />
      <Security />
      <Integrations />
      <HawkeyeBeta />
      <Team />
      <FinalCTA />
      <Footer />
    </main>
  );
}

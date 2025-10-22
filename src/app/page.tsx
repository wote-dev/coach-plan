'use client';

import HeroSection from '@/components/HeroSection';
import TopNav from '@/components/landing/TopNav';
import SocialProof from '@/components/landing/SocialProof';
import ProblemSolution from '@/components/landing/ProblemSolution';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import ROI from '@/components/landing/ROI';
import Pricing from '@/components/landing/Pricing';
import Security from '@/components/landing/Security';
import Integrations from '@/components/landing/Integrations';
import Team from '@/components/landing/Team';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <TopNav />
      <HeroSection />
      <SocialProof />
      <ProblemSolution />
      <Features />
      <HowItWorks />
      <ROI />
      <Pricing />
      <Security />
      <Integrations />
      <Team />
      <FinalCTA />
      <Footer />
    </main>
  );
}

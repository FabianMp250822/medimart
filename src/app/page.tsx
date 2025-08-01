"use client"
import { Hero } from '@/components/hero';
import { Services } from '@/components/services';
import { Commitment } from '@/components/commitment';
import { ComprehensiveCare } from '@/components/comprehensive-care';
import { Priority } from '@/components/priority';
import { HowWeServe } from '@/components/how-we-serve';
import { Testimonials } from '@/components/testimonials';
import { Team } from '@/components/team';
import { RecentArticles } from '@/components/recent-articles';
import { AppFooter } from '@/components/footer';
import { Header } from '@/components/header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="flex-1 w-full">
        <div className="container mx-auto">
          <main className="flex-1 py-8">
            <Hero />
            <Services />
            <Commitment />
            <ComprehensiveCare />
            <Priority />
            <HowWeServe />
            <Testimonials />
            <Team />
            <RecentArticles />
          </main>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

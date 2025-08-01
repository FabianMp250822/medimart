import { Phone, MapPin, ChevronDown } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { MainNav } from '@/components/main-nav';
import { Hero } from '@/components/hero';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Services } from '@/components/services';
import { Commitment } from '@/components/commitment';
import { ComprehensiveCare } from '@/components/comprehensive-care';
import { Priority } from '@/components/priority';
import { HowWeServe } from '@/components/how-we-serve';
import { Testimonials } from '@/components/testimonials';
import { Team } from '@/components/team';
import { RecentArticles } from '@/components/recent-articles';
import { AppFooter } from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-2 px-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>Atención: +57 (605) 3369999 Ext. 1.</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>carrera 50 no 80-90, Barranquilla WhatsApp</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-card shadow-sm sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between p-4 gap-4">
          <div className="flex-1 hidden lg:flex">
            <Button variant="ghost" className="text-foreground/80 hover:text-accent">
              <span>Seleccionar Sede: Clínica de la Costa - Barranquilla</span>
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </div>
          <div className="flex-shrink-0">
            <Link href="/" aria-label="Volver al inicio">
              <Logo />
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-end gap-2 md:gap-4">
            <Button variant="outline" className="border-accent text-accent hover:bg-accent/10 hover:text-accent">
              Trabaje con nosotros
            </Button>
            <Button className="bg-accent hover:bg-accent/90">
              Contacto
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 w-full">
        <div className="container mx-auto flex">
          <aside className="w-[280px] py-8 pr-8 hidden lg:block">
            <Card className="p-4">
              <MainNav />
            </Card>
          </aside>
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
      
      {/* Footer */}
      <AppFooter />
    </div>
  );
}

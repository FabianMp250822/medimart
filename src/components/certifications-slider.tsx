'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Award, Shield } from 'lucide-react';
import Link from 'next/link';

const certifications = [
  {
    code: 'ISO 9001:2015',
    entity: 'Icontec',
    icon: <Award className="h-8 w-8 text-accent" />
  },
  {
    code: 'BPC INVIMA',
    entity: 'INVIMA',
    icon: <Shield className="h-8 w-8 text-accent" />
  },
  {
    code: 'BPE INVIMA',
    entity: 'INVIMA',
    icon: <Shield className="h-8 w-8 text-accent" />
  },
  {
    code: 'Calidad Certificada',
    entity: 'INVIMA',
    icon: <Award className="h-8 w-8 text-accent" />
  },
  {
    code: 'Excelencia Internacional',
    entity: 'Red Internacional',
    icon: <Award className="h-8 w-8 text-accent" />
  }
];

export function CertificationsSlider() {
  return (
    <section className="py-12 bg-primary/5">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">
            Certificaciones
          </h2>
          <p className="text-muted-foreground">
            Compromiso con la calidad respaldado por organismos reconocidos
          </p>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3500,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {certifications.map((cert, index) => (
              <CarouselItem
                key={`${cert.code}-${index}`}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-accent/30">
                  <CardContent className="flex flex-col items-center justify-center p-6 h-full min-h-[140px]">
                    <div className="mb-3">
                      {cert.icon}
                    </div>
                    <h3 className="text-lg font-bold text-center text-primary mb-1">
                      {cert.code}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {cert.entity}
                    </span>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        <div className="text-center mt-6">
          <Link 
            href="/nosotros/certificaciones" 
            className="text-accent hover:underline font-semibold text-sm"
          >
            Ver todas las certificaciones →
          </Link>
        </div>
      </div>
    </section>
  );
}

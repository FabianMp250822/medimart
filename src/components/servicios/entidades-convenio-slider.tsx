'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import { Shield } from 'lucide-react';

interface Entidad {
  nombre: string;
  logo?: string;
  categoria?: string;
}

const entidadesConvenio: Entidad[] = [
  { nombre: 'COLMENA ARL', categoria: 'ARL' },
  { nombre: 'POSITIVA COMPAÑÍA DE SEGUROS', categoria: 'Seguros' },
  { nombre: 'AXA COLPATRIA', categoria: 'Seguros' },
  { nombre: 'SURA ARL', categoria: 'ARL' },
  { nombre: 'ANAS WAYUU', categoria: 'EPS' },
  { nombre: 'SURA EPS', categoria: 'EPS' },
  { nombre: 'MUTUAL SER', categoria: 'EPS' },
  { nombre: 'ALIANZ SEGUROS MEDICOS', categoria: 'Seguros' },
  { nombre: 'PANAMERICAN LIFE', categoria: 'Seguros' },
  { nombre: 'FOMAG', categoria: 'Fondo' },
  { nombre: 'BMI', categoria: 'Seguros' },
  { nombre: 'BASE NAVAL', categoria: 'Fuerzas Militares' },
  { nombre: 'EJERCITO NACIONAL', categoria: 'Fuerzas Militares' },
  { nombre: 'SENA ATLANTICO', categoria: 'Institución' },
  { nombre: 'COOSALUD', categoria: 'EPS' },
  { nombre: 'FUERZA AEREA', categoria: 'Fuerzas Militares' },
  { nombre: 'BAVARIA', categoria: 'Empresarial' },
  { nombre: 'DUSAKAWI', categoria: 'EPS' },
  { nombre: 'MUNDIAL DE SEGUROS', categoria: 'Seguros' },
  { nombre: 'SALUD TOTAL', categoria: 'EPS' },
  { nombre: 'POLICIA ATLANTICO', categoria: 'Fuerzas Militares' },
];

// Eliminar duplicados
const entidadesUnicas = Array.from(
  new Map(entidadesConvenio.map(item => [item.nombre, item])).values()
);

export function EntidadesConvenioSlider() {
  return (
    <section className="py-12 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-accent" />
            <h2 className="text-3xl font-bold text-primary">
              Entidades en Convenio
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trabajamos con las principales entidades de salud, ARL y seguros para brindarte la mejor atención.
            Contamos con más de 20 convenios activos.
          </p>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {entidadesUnicas.map((entidad, index) => (
              <CarouselItem
                key={`${entidad.nombre}-${index}`}
                className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-accent/30">
                  <CardContent className="flex flex-col items-center justify-center p-6 h-full min-h-[180px]">
                    <div className="relative w-full h-24 mb-3 flex items-center justify-center">
                      {entidad.logo ? (
                        <Image
                          src={entidad.logo}
                          alt={entidad.nombre}
                          fill
                          style={{ objectFit: 'contain' }}
                          className="transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                          <Shield className="h-10 w-10 text-primary" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-center text-primary line-clamp-2 mb-2">
                      {entidad.nombre}
                    </h3>
                    {entidad.categoria && (
                      <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent font-medium">
                        {entidad.categoria}
                      </span>
                    )}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            ¿Tu entidad no aparece en la lista?{' '}
            <a href="/contacto" className="text-accent hover:underline font-semibold">
              Contáctanos
            </a>{' '}
            para más información sobre nuestros convenios.
          </p>
        </div>
      </div>
    </section>
  );
}

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
  logo: string;
  categoria: string;
}

// Orden exacto según las categorías y el listado proporcionado
const entidadesConvenio: Entidad[] = [
  // 1. PÓLIZAS DE SALUD
  { nombre: 'Allianz Seguros Médicos', categoria: 'Pólizas de Salud', logo: '/logos-entidades/ALIANZ SEGUROS MEDICOS-8.png' },
  { nombre: 'Panamerican Life', categoria: 'Pólizas de Salud', logo: '/logos-entidades/PNAMERICAN LIFE-8.png' },
  { nombre: 'BMI', categoria: 'Pólizas de Salud', logo: '/logos-entidades/bmi-8.png' },
  { nombre: 'Mundial de Seguros', categoria: 'Pólizas de Salud', logo: '/logos-entidades/MUNDIAL DE SEGUROS-8.png' },
  { nombre: 'Seguros Bolívar', categoria: 'Pólizas de Salud', logo: '/logos-entidades/SEGUROS BOLIVAR-8.png' },
  
  // 2. MEDICINA PREPAGADA
  { nombre: 'Colsanitas', categoria: 'Medicina Prepagada', logo: '/logos-entidades/COLSANITAS-8.png' },
  { nombre: 'Coomeva Medicina Prepagada', categoria: 'Medicina Prepagada', logo: '/logos-entidades/COOMEVA-8.png' },
  { nombre: 'Allianz Seguros Médicos', categoria: 'Medicina Prepagada', logo: '/logos-entidades/ALIANZ SEGUROS MEDICOS-8.png' },
  
  // 3. ARL
  { nombre: 'Colmena ARL', categoria: 'ARL', logo: '/logos-entidades/colmena-8.png' },
  { nombre: 'Positiva Compañía de Seguros', categoria: 'ARL', logo: '/logos-entidades/POSITIVA.png' },
  { nombre: 'AXA Colpatria', categoria: 'ARL', logo: '/logos-entidades/AXA COLPATRIA-8.png' },
  { nombre: 'SURA ARL', categoria: 'ARL', logo: '/logos-entidades/SURA ARL-8.png' },
  
  // 4. RÉGIMEN DE EXCEPCIÓN
  { nombre: 'FOMAG – Fiduprevisora', categoria: 'Régimen de Excepción', logo: '/logos-entidades/FOMAG-8.png' },
  { nombre: 'SENA Atlántico', categoria: 'Régimen de Excepción', logo: '/logos-entidades/SENA ATLANTICO-8.png' },
  { nombre: 'Bavaria S.A.', categoria: 'Régimen de Excepción', logo: '/logos-entidades/BAVARIA-8.png' },
  { nombre: 'Policía Nacional – Regional Atlántico', categoria: 'Régimen de Excepción', logo: '/logos-entidades/POLICIA ATLANTICO-8.png' },
  { nombre: 'Base Naval ARC – Dispensario Médico Nivel II', categoria: 'Régimen de Excepción', logo: '/logos-entidades/BASE NAVAL-8.png' },
  { nombre: 'Ejército Nacional (Sanidad BAS02)', categoria: 'Régimen de Excepción', logo: '/logos-entidades/EJERCITO NACIONAL-8.png' },
  
  // 5. EPS
  { nombre: 'Mutual Ser EPS', categoria: 'EPS', logo: '/logos-entidades/MUTUAL SER-8.png' },
  { nombre: 'Anas Wayuu EPSI', categoria: 'EPS', logo: '/logos-entidades/ANAS WAYUU-8.png' },
  { nombre: 'Dusakawi EPSI', categoria: 'EPS', logo: '/logos-entidades/DUSAKAWI-8.png' },
  { nombre: 'Salud Total EPS', categoria: 'EPS', logo: '/logos-entidades/SALUD TOTAL-8.png' },
  { nombre: 'Coosalud EPS S.A.', categoria: 'EPS', logo: '/logos-entidades/COOSALUD-8.png' },
   { nombre: 'Sura EPS', categoria: 'EPS', logo: '/logos-entidades/SURA EPS-8.png' },
];

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
            {entidadesConvenio.map((entidad, index) => (
              <CarouselItem
                key={`${entidad.nombre}-${index}`}
                className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-accent/30">
                  <CardContent className="flex flex-col items-center justify-center p-6 h-full min-h-[180px]">
                    <div className="relative w-full h-24 mb-3 flex items-center justify-center">
                      <Image
                        src={entidad.logo}
                        alt={entidad.nombre}
                        fill
                        style={{ objectFit: 'contain' }}
                        className="transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      />
                    </div>
                    <h3 className="text-sm font-semibold text-center text-primary line-clamp-2 mb-2">
                      {entidad.nombre}
                    </h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent font-medium">
                      {entidad.categoria}
                    </span>
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

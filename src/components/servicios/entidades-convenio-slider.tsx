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
  { nombre: 'ALIANZ SEGUROS MEDICOS', categoria: 'Seguros', logo: 'https://firebasestorage.googleapis.com/v0/b/contenedor-de-video.firebasestorage.app/o/public%2FALIANZ%20SEGUROS%20MEDICOS-8.png?alt=media&token=054a4e79-56c7-4632-8097-e6d25efe7f69' },
  { nombre: 'ANAS WAYUU', categoria: 'EPS', logo: 'https://firebasestorage.googleapis.com/v0/b/contenedor-de-video.firebasestorage.app/o/public%2FANAS%20WAYUU-8.png?alt=media&token=2474a9fc-abf5-4c84-aada-988b5cb525d8' },
  { nombre: 'AXA COLPATRIA', categoria: 'Seguros', logo: 'https://firebasestorage.googleapis.com/v0/b/contenedor-de-video.firebasestorage.app/o/public%2FAXA%20COLPATRIA-8.png?alt=media&token=2341544e-721a-4b5d-b1a2-b3ccc6fc1db5' },
  { nombre: 'BASE NAVAL', categoria: 'Fuerzas Militares', logo: 'https://firebasestorage.googleapis.com/v0/b/contenedor-de-video.firebasestorage.app/o/public%2FBASE%20NAVAL-8.png?alt=media&token=aba49af7-b156-4b69-a9e3-1871bfb339d3' },
  { nombre: 'BAVARIA', categoria: 'Empresarial', logo: 'https://firebasestorage.googleapis.com/v0/b/contenedor-de-video.firebasestorage.app/o/public%2FBAVARIA-8.png?alt=media&token=5199f054-8e76-446e-93d0-cfa397b53116' },
  { nombre: 'COOSALUD', categoria: 'EPS', logo: 'https://firebasestorage.googleapis.com/v0/b/contenedor-de-video.firebasestorage.app/o/public%2FCOOSALUD-8.png?alt=media&token=0c7ae798-11c3-4c9b-9b53-324e7f163799' },
  { nombre: 'DUSAKAWI', categoria: 'EPS', logo: 'https://firebasestorage.googleapis.com/v0/b/contenedor-de-video.firebasestorage.app/o/public%2FDUSAKAWI-8.png?alt=media&token=1fe09a54-42ff-45b3-89c2-b308dff4caa2' },
  { nombre: 'EJERCITO NACIONAL', categoria: 'Fuerzas Militares', logo: 'https://firebasestorage.googleapis.com/v0/b/contenedor-de-video.firebasestorage.app/o/public%2FEJERCITO%20NACIONAL-8.png?alt=media&token=6bc924f5-53ec-4f09-b1cd-6df36e6fee32' },
  { nombre: 'FOMAG', categoria: 'Fondo', logo: 'https://firebasestorage.googleapis.com/v0/b/contenedor-de-video.firebasestorage.app/o/public%2FFOMAG-8.png?alt=media&token=87bd2e96-f650-48e0-a8e3-c65a5af09620' },
  { nombre: 'FUERZA AEREA', categoria: 'Fuerzas Militares', logo: 'https://firebasestorage.googleapis.com/v0/b/contenedor-de-video.firebasestorage.app/o/public%2FFUERZA%20AEREA-8.png?alt=media&token=74f2493c-9414-4bf2-84bf-f971e772a91c' },
  { nombre: 'MUNDIAL DE SEGUROS', categoria: 'Seguros', logo: 'https://firebasestorage.googleapis.com/v0/b/contenedor-de-video.firebasestorage.app/o/public%2FMUNDIAL%20DE%20SEGUROS-8.png?alt=media&token=9dc2bd38-8cbf-4524-ba97-a9787963398b' },
  { nombre: 'MUTUAL SER', categoria: 'EPS', logo: 'https://firebasestorage.googleapis.com/v0/b/contenedor-de-video.firebasestorage.app/o/public%2FMUTUAL%20SER-8.png?alt=media&token=830194e9-86ad-4298-aff8-412241225511' },
  { nombre: 'PANAMERICAN LIFE', categoria: 'Seguros', logo: 'https://firebasestorage.googleapis.com/v0/b/contenedor-de-video.firebasestorage.app/o/public%2FPNAMERICAN%20LIFE-8.png?alt=media&token=7c25961d-747b-4d55-b871-4206f26649b4' },
  { nombre: 'POLICIA ATLANTICO', categoria: 'Fuerzas Militares', logo: 'https://firebasestorage.googleapis.com/v0/b/contenedor-de-video.firebasestorage.app/o/public%2FPOLICIA%20ATLANTICO-8.png?alt=media&token=3bfb33f5-4f6f-4746-8b63-921516e1efab' },
  { nombre: 'SALUD TOTAL', categoria: 'EPS', logo: 'https://firebasestorage.googleapis.com/v0/b/contenedor-de-video.firebasestorage.app/o/public%2FSALUD%20TOTAL-8.png?alt=media&token=4a93e0ec-8296-4309-ab7d-1bd03fa17dd7' },
  { nombre: 'SENA ATLANTICO', categoria: 'Institución', logo: 'https://firebasestorage.googleapis.com/v0/b/contenedor-de-video.firebasestorage.app/o/public%2FSENA%20ATLANTICO-8.png?alt=media&token=84817663-bd92-47fd-b726-f070549ae92d' },
  { nombre: 'SURA ARL', categoria: 'ARL', logo: 'https://firebasestorage.googleapis.com/v0/b/contenedor-de-video.firebasestorage.app/o/public%2FSURA%20ARL-8.png?alt=media&token=11cf3ca4-ff8f-45cd-b7ca-31eacd02cf7a' },
  { nombre: 'SURA EPS', categoria: 'EPS', logo: 'https://firebasestorage.googleapis.com/v0/b/contenedor-de-video.firebasestorage.app/o/public%2FSURA%20EPS-8.png?alt=media&token=58b01446-faf6-4689-b795-5a955edbcf68' },
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

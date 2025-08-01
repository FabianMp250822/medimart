import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const careItems = [
  {
    title: 'Radiología',
    description: 'Equipos de última generación para diagnósticos precisos por imagen.',
    image: 'https://placehold.co/400x300.png',
    hint: 'radiology equipment'
  },
  {
    title: 'Laboratorio Clínico',
    description: 'Análisis clínicos confiables con entrega de resultados oportuna.',
    image: 'https://placehold.co/400x300.png',
    hint: 'clinic laboratory'
  },
  {
    title: 'Salas Quirúrgicas',
    description: 'Quirófanos equipados con la más alta tecnología para procedimientos seguros.',
    image: 'https://placehold.co/400x300.png',
    hint: 'operating room'
  },
];

export function ComprehensiveCare() {
  return (
    <section className="py-16 text-center">
      <span className="text-accent font-semibold">NUESTROS SERVICIOS</span>
      <h2 className="text-3xl font-bold text-primary my-4">Atención Integral, Cuidando de Ti Siempre</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {careItems.map((item) => (
          <Card key={item.title} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
            <CardContent className="p-0">
              <div className="relative h-56">
                <Image src={item.image} alt={item.title} layout="fill" objectFit="cover" data-ai-hint={item.hint}/>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start p-6 bg-card">
              <h3 className="text-xl font-bold text-primary">{item.title}</h3>
              <p className="text-muted-foreground mt-2 mb-4 text-left">{item.description}</p>
              <Button variant="link" className="p-0 text-accent group-hover:underline">
                Leer más <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

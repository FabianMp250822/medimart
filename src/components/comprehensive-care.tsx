import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const careItems = [
  {
    title: 'Neurocirugía',
    description: 'Equipos de última generación para procedimientos neuroquirúrgicos de alta complejidad.',
    image: 'https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%204.42.37%20PM(1).jpeg?alt=media&token=a0535648-1f07-4a43-87c1-8901f530dd94',
    hint: 'neurosurgery equipment'
  },
  {
    title: 'Laboratorio Moderno',
    description: 'Análisis clínicos confiables con tecnología de punta para entrega de resultados oportuna.',
    image: 'https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%204.42.37%20PM.jpeg?alt=media&token=0073f503-653b-4326-907b-665688257340',
    hint: 'modern laboratory'
  },
  {
    title: 'Médicos Experimentados',
    description: 'Un equipo de profesionales altamente calificados y dedicados al cuidado de tu salud.',
    image: 'https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%205.16.32%20PM.jpeg?alt=media&token=e4b6c4cb-586f-49e9-b5f9-9d73d30a01f8',
    hint: 'experienced doctors'
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

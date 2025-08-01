import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const steps = [
  {
    step: '01',
    title: 'Agenda tu Cita',
    description: 'Selecciona el especialista y horario que más te convenga a través de nuestro portal en línea o por teléfono.',
    image: 'https://placehold.co/400x400.png',
    hint: 'woman phone'
  },
  {
    step: '02',
    title: 'Recibe Atención',
    description: 'Nuestros especialistas te brindarán una atención personalizada para diagnosticar y tratar tu condición.',
    image: 'https://placehold.co/400x400.png',
    hint: 'doctor patient'
  },
  {
    step: '03',
    title: 'Sigue tu Tratamiento',
    description: 'Obtén tu plan de tratamiento y seguimiento para una pronta y efectiva recuperación.',
    image: 'https://placehold.co/400x400.png',
    hint: 'doctor microscope'
  },
];

export function HowWeServe() {
  return (
    <section className="py-16 text-center">
      <span className="text-accent font-semibold">CÓMO FUNCIONA</span>
      <h2 className="text-3xl font-bold text-primary my-4">Fácil y Rápido: Cómo Te Atendemos</h2>
      <p className="max-w-2xl mx-auto text-muted-foreground">Nuestro proceso está diseñado para ser lo más simple y eficiente posible, garantizando que recibas la mejor atención sin complicaciones.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 relative">
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2"></div>
        {steps.map((item) => (
          <div key={item.step} className="relative flex flex-col items-center">
            <div className="relative z-10">
                <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-card shadow-lg">
                    <Image src={item.image} alt={item.title} layout="fill" objectFit="cover" data-ai-hint={item.hint} />
                </div>
                <div className="absolute -top-4 -left-4 bg-accent text-accent-foreground h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">
                    {item.step}
                </div>
            </div>
            <h3 className="text-xl font-bold text-primary mt-6">{item.title}</h3>
            <p className="text-muted-foreground mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

import Image from 'next/image';
import { Button } from './ui/button';
import { CheckCircle } from 'lucide-react';

export function Commitment() {
  return (
    <section className="py-16 bg-card rounded-lg p-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
                src="https://placehold.co/600x400.png"
                alt="Clínica exterior"
                layout="fill"
                objectFit="cover"
                data-ai-hint="clinic exterior"
            />
             <div className="absolute bottom-4 left-4 flex space-x-4">
                <Button size="icon" className="bg-accent rounded-full h-12 w-12">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </Button>
                <Button size="icon" className="bg-accent rounded-full h-12 w-12">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Button>
             </div>
        </div>
        <div>
          <span className="text-accent font-semibold">SOBRE NOSOTROS</span>
          <h2 className="text-3xl font-bold text-primary my-4">Comprometidos con tu Salud y Bienestar</h2>
          <p className="text-muted-foreground mb-6">
            En Clínica de la Costa, nos dedicamos a ofrecer atención médica de la más alta calidad, con un equipo de profesionales experimentados y tecnología de vanguardia para garantizar su bienestar.
          </p>
          <ul className="space-y-4 text-muted-foreground">
            <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-accent" /> Más de 30 años de experiencia</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-accent" /> Equipo médico especializado</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-accent" /> Tecnología médica avanzada</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-accent" /> Atención personalizada y humana</li>
          </ul>
          <Button className="mt-8 bg-accent hover:bg-accent/90">Conozca más</Button>
        </div>
      </div>
    </section>
  );
}

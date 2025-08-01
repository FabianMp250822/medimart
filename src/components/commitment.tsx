import Image from 'next/image';
import { Button } from './ui/button';
import { CheckCircle } from 'lucide-react';

export function Commitment() {
  return (
    <section className="py-16 bg-card rounded-lg p-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
                src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%2011.40.55%20AM.jpeg?alt=media&token=128aa14c-6aa0-4a6f-a301-68276956f641"
                alt="Clínica exterior"
                layout="fill"
                objectFit="cover"
                data-ai-hint="clinic exterior"
            />
        </div>
        <div>
          <span className="text-accent font-semibold">SOBRE NOSOTROS</span>
          <h2 className="text-3xl font-bold text-primary my-4">Comprometidos con tu Salud y Bienestar</h2>
          <p className="text-muted-foreground mb-6">
            En Clínica de la Costa, nos dedicamos a ofrecer atención médica de la más alta calidad, con un equipo de profesionales experimentados y tecnología de vanguardia para garantizar su bienestar.
          </p>
          <ul className="space-y-4 text-muted-foreground">
            <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-accent" /> Servicios de Ambulancia disponibles</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-accent" /> Oxígeno a Domicilio para tu comodidad</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-accent" /> Farmacia en Clínica para mayor conveniencia</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-accent" /> Médicos de Guardia siempre listos</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-accent" /> Emergencias Médicas 24/7</li>
          </ul>
          <Button className="mt-8 bg-accent hover:bg-accent/90">Descubre Más Sobre Nosotros</Button>
        </div>
      </div>
    </section>
  );
}

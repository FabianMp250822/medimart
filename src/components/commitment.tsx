import Image from 'next/image';
import { Button } from './ui/button';
import { CheckCircle, Shield, HeartPulse } from 'lucide-react';
import Link from 'next/link';

const WaveIcon = () => (
    <svg width="64" height="18" viewBox="0 0 64 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-auto">
        <path d="M1 9C1 9 8 -3 17 9C26 21 39 -3 48 9C57 21 63 9 63 9" stroke="url(#wave-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <defs>
            <linearGradient id="wave-gradient" x1="0" y1="9" x2="64" y2="9" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D946EF"/>
                <stop offset="0.5" stopColor="#8B5CF6"/>
                <stop offset="1" stopColor="#EC4899"/>
            </linearGradient>
        </defs>
    </svg>
);


export function Commitment() {
  return (
    <section className="py-16 bg-card rounded-lg p-8 overflow-hidden">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Image Column */}
        <div className="relative h-96 md:h-[500px] w-full flex items-center justify-center">
            {/* Background shape */}
            <div className="absolute inset-0 bg-background rounded-full -translate-x-1/4 scale-150"></div>

            {/* Main Image with Clip Path */}
            <div className="relative h-full w-full" style={{ clipPath: 'circle(50% at 50% 50%)' }}>
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%2011.40.55%20AM.jpeg?alt=media&token=128aa14c-6aa0-4a6f-a301-68276956f641"
                    alt="Clínica exterior"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="clinic exterior"
                    className="z-10"
                />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute top-10 left-10 md:top-16 md:left-20 z-20">
                <div className="bg-cyan-400 p-4 rounded-xl shadow-lg">
                    <Shield className="h-8 w-8 text-white" />
                </div>
            </div>
            <div className="absolute bottom-10 right-5 md:bottom-20 md:right-10 z-20">
                 <div className="bg-blue-600 p-4 rounded-xl shadow-lg">
                    <HeartPulse className="h-8 w-8 text-white" />
                </div>
            </div>
             <div className="absolute bottom-20 left-0 md:bottom-32 md:left-5 z-20">
                <WaveIcon />
            </div>

            {/* Text Box */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 bg-card/90 backdrop-blur-sm p-4 rounded-xl shadow-lg w-64 z-20">
                <h3 className="font-bold text-primary">Clínica de la Costa</h3>
                <span className="text-sm text-accent">Comprometidos con Tu Bienestar</span>
            </div>
        </div>

        {/* Content Column */}
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
           <Button asChild className="mt-8 bg-accent hover:bg-accent/90">
             <Link href="#">Descubre Más Sobre Nosotros</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

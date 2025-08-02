import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

const RedDiamond = () => (
    <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-1/2 left-4 h-8 w-8 text-red-500 opacity-50">
        <defs>
            <radialGradient id="red-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="60%" stopColor="#EF4444" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
            </radialGradient>
        </defs>
        <path d="M50 0L100 50L50 100L0 50L50 0Z" fill="url(#red-glow)" />
    </svg>
);

const GreenTriangle = () => (
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-1/4 right-16 h-12 w-12 text-green-400 opacity-30">
        <path d="M50 0L100 100L0 100L50 0Z" stroke="currentColor" strokeWidth="8"/>
    </svg>
);


export function Hero() {
  const foundingYear = 1989;
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - foundingYear;

  return (
    <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-blue-900/90 z-0"></div>
        <RedDiamond />
        <GreenTriangle />
        <div className="relative container mx-auto px-4 py-24 sm:py-32 lg:py-40 z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content Column */}
                <div className="text-center lg:text-left">
                    <span className="text-lg text-primary-foreground/80">Cuidando de Ti y de los Tuyos</span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-2 leading-tight">
                        Tu Salud, Nuestra Prioridad
                    </h1>
                     <span className="block text-3xl sm:text-4xl text-accent font-semibold mt-2">por {yearsOfExperience} Años</span>
                    <p className="mt-6 text-base text-primary-foreground/80 max-w-lg mx-auto lg:mx-0">
                        En la Clínica de la Costa Barranquilla, sabemos que en los momentos más importantes de tu salud, necesitas un equipo que te acompañe con calidez y humanidad. Nuestro compromiso es brindarte atención personalizada, asegurando que te sientas en un entorno seguro y de confianza en cada paso de tu recuperación
                    </p>
                    <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8 py-6 text-lg">
                        <Link href="/pacientes/solicitar-cita">Agenda tu cita</Link>
                    </Button>
                </div>
                {/* Image Column */}
                <div className="relative h-80 lg:h-[450px] w-full animate-float-bob">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%2011.40.55%20AM.jpeg?alt=media&token=128aa14c-6aa0-4a6f-a301-68276956f641"
                        alt="Fachada de la Clínica de la Costa"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-xl shadow-2xl"
                        data-ai-hint="clinic exterior"
                        priority
                    />
                </div>
            </div>
        </div>
        {/* Wave Shape Divider */}
        <div className="absolute bottom-0 left-0 w-full h-24">
             <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
                <path d="M1440 29.5C1296.5 9.16666 1007.5 -29.5 720 29.5C432.5 88.5 143.5 109.833 0 90V120H1440V29.5Z" fill="hsl(var(--background))"/>
            </svg>
        </div>
    </section>
  );
}

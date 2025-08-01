import Image from 'next/image';
import { Users, BriefcaseMedical, CalendarDays, HeartPulse } from 'lucide-react';
import { Card } from './ui/card';

const features = [
    { icon: <Users className="h-8 w-8 text-accent" />, title: "Personal Médico Comprometido", description: "Nuestro equipo está formado por médicos y especialistas apasionados por cuidarte." },
    { icon: <BriefcaseMedical className="h-8 w-8 text-accent" />, title: "Atención de Emergencias 24/7", description: "Estamos disponibles las 24 horas, siempre listos para ayudarte." },
    { icon: <CalendarDays className="h-8 w-8 text-accent" />, title: "Citas Médicas en Línea", description: "Agenda tus citas fácilmente desde la comodidad de tu hogar." },
    { icon: <HeartPulse className="h-8 w-8 text-accent" />, title: "Atención Continuada", description: "Nuestros servicios están disponibles 24/7, porque tu bienestar es nuestra prioridad." }
];

const stats = [
    { value: "75+", label: "Médicos Especialistas" },
    { value: "100000+", label: "Pacientes Felices" },
    { value: "300+", label: "Habitaciones Modernas" },
    { value: "10", label: "Premios Ganados" },
];

export function Priority() {
    return (
        <section className="py-16">
            <div className="grid md:grid-cols-2 gap-0 items-center bg-primary text-primary-foreground rounded-lg overflow-hidden">
                <div className="p-8 md:p-12">
                    <span className="text-accent font-semibold">¿Por qué Elegirnos?</span>
                    <h2 className="text-3xl lg:text-4xl font-bold my-4">Tu Salud Es Nuestra Mayor Prioridad</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
                        {features.map(feature => (
                             <div key={feature.title} className="flex items-start gap-4">
                                {feature.icon}
                                <div>
                                    <h3 className="font-bold text-lg">{feature.title}</h3>
                                    <p className="text-sm text-primary-foreground/80 mt-1">{feature.description}</p>
                                </div>
                             </div>
                        ))}
                    </div>
                </div>
                <div className="relative h-96 md:h-full w-full min-h-[400px]">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%205.39.18%20PM.jpeg?alt=media&token=f5430294-929e-4089-be48-1ee6674b1d1f"
                        alt="Equipo médico de alta tecnología"
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint="medical equipment"
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 -mt-16 z-10 relative px-4 md:px-8">
                {stats.map(stat => (
                    <Card key={stat.label} className="p-6 text-center shadow-xl bg-card">
                        <p className="text-3xl lg:text-4xl font-bold text-accent">{stat.value}</p>
                        <p className="text-muted-foreground text-sm mt-2">{stat.label}</p>
                    </Card>
                ))}
            </div>
        </section>
    );
}

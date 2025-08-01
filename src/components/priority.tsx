import Image from 'next/image';
import { CheckCircle, Users, HeartPulse, Stethoscope, BriefcaseMedical } from 'lucide-react';
import { Card } from './ui/card';

const features = [
    { icon: <CheckCircle className="h-8 w-8 text-accent" />, title: "Prevención y Bienestar", description: "Programas de chequeo y prevención para mantener su salud." },
    { icon: <HeartPulse className="h-8 w-8 text-accent" />, title: "Urgencias 24/7", description: "Atención inmediata para emergencias médicas a cualquier hora." },
    { icon: <BriefcaseMedical className="h-8 w-8 text-accent" />, title: "Chequeos Médicos Ejecutivos", description: "Programas de salud diseñados para ejecutivos y empresas." },
    { icon: <Stethoscope className="h-8 w-8 text-accent" />, title: "Servicio de Cardiología", description: "Diagnóstico y tratamiento de enfermedades cardiovasculares." }
];

const stats = [
    { value: "75+", label: "Especialistas" },
    { value: "10000+", label: "Pacientes Satisfechos" },
    { value: "301+", label: "Camas Hospitalarias" },
    { value: "11", label: "Premios y Reconocimientos" },
];

export function Priority() {
    return (
        <section className="py-16">
            <div className="grid md:grid-cols-2 gap-12 items-center bg-primary text-primary-foreground p-8 rounded-lg">
                <div>
                    <span className="text-accent font-semibold">POR QUÉ ELEGIRNOS</span>
                    <h2 className="text-3xl font-bold my-4">Tu Salud Es Nuestra Mayor Prioridad</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                        {features.map(feature => (
                             <div key={feature.title} className="flex items-start gap-4">
                                {feature.icon}
                                <div>
                                    <h3 className="font-bold text-lg">{feature.title}</h3>
                                    <p className="text-sm text-primary-foreground/80">{feature.description}</p>
                                </div>
                             </div>
                        ))}
                    </div>
                </div>
                <div className="relative h-96 w-full rounded-lg overflow-hidden">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%205.39.18%20PM.jpeg?alt=media&token=f5430294-929e-4089-be48-1ee6674b1d1f"
                        alt="Equipo médico"
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint="medical equipment"
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 -mt-12 z-10 relative px-4">
                {stats.map(stat => (
                    <Card key={stat.label} className="p-6 text-center shadow-xl">
                        <p className="text-3xl font-bold text-accent">{stat.value}</p>
                        <p className="text-muted-foreground mt-2">{stat.label}</p>
                    </Card>
                ))}
            </div>
        </section>
    );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, Stethoscope, CheckCircle, HeartHandshake, UserCheck } from 'lucide-react';
import type { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';

export const metadata: Metadata = {
    title: 'Servicios de Hospitalización - Clínica de la Costa',
    description: 'Ofrecemos servicios de hospitalización para adultos, pediátricos y pacientes crónicos. Atención integral con calidad, seguridad y un enfoque humano.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', '==', 'Medicina Interna')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Hospitalización: ", error);
        return [];
    }
}

const hospitalizacionServices = [
    {
        title: "Hospitalización Adultos",
        icon: <UserCheck className="h-8 w-8 text-accent" />,
        description: "Servicios adaptados para adultos que requieren atención médica especializada, incluyendo recuperación posquirúrgica, manejo de enfermedades agudas y crónicas, y tratamientos oncológicos con apoyo integral.",
        image: "https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-20%20at%203.09.31%20PM.jpeg?alt=media&token=e9ddd974-a65a-43ba-b24b-413c926ff44f",
        hint: "hospital room adult"
    },
    {
        title: "Hospitalización Pediátrica",
        icon: <HeartHandshake className="h-8 w-8 text-accent" />,
        description: "Espacios diseñados para la seguridad y comodidad de los niños, con habitaciones amigables, especialistas pediátricos, tecnología avanzada para diagnósticos rápidos y apoyo emocional para los padres.",
        image: "https://placehold.co/600x400.png",
        hint: "pediatric hospital room"
    }
];

const pacienteCronicoFeatures = [
    "Monitoreo continuo de parámetros respiratorios y vitales.",
    "Terapias respiratorias y de rehabilitación personalizadas.",
    "Cuidados intensivos las 24 horas por un equipo multidisciplinario.",
    "Asesoramiento y apoyo a familiares sobre el manejo del paciente."
];

export default async function HospitalizacionPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%206.31.54%20PM.jpeg?alt=media&token=128385f5-0c3a-452c-9183-439023b2c3a0"
                        alt="Servicios de Hospitalización"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="hospitalization services"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Servicios de Hospitalización: Cuidado Humano y de Calidad</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Nuestra Filosofía y Objetivos</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            Contamos con un equipo humano dedicado y comprometido a servir a los usuarios con una atención personalizada y especializada con calidad y amor, alto nivel de conocimientos y experiencia; apoyados tecnológicamente para el diagnóstico y tratamiento de las enfermedades.
                        </p>
                        <p>
                            Uno de nuestros principales objetivos es la seguridad y comodidad en las instalaciones; por esto contamos con la más amplia capacidad en habitaciones. La Unidad de Hospitalización apoya los servicios de Urgencias, Cirugía y Consulta Externa, con personal idóneo y calificado dentro del marco de la directriz médico–asistencial que nos orienta a la <strong>"Atención integral en salud con oportunidad, eficiencia y calidad”.</strong>
                        </p>
                    </CardContent>
                </Card>
            </section>

            <section className="space-y-8">
              {hospitalizacionServices.map((service) => (
                <Card key={service.title} className="overflow-hidden">
                    <div className="grid md:grid-cols-2 items-center">
                        <div className="relative h-64 md:h-full w-full min-h-[300px]">
                            <Image 
                                src={service.image}
                                alt={service.title}
                                layout="fill"
                                objectFit="cover"
                                data-ai-hint={service.hint}
                            />
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                                {service.icon}
                                <h3 className="text-2xl font-bold text-primary">{service.title}</h3>
                            </div>
                            <p className="text-muted-foreground">{service.description}</p>
                        </div>
                    </div>
                </Card>
              ))}
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Hospitalización de Paciente Crónico</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-6">
                            Este servicio está enfocado en pacientes que requieren soporte constante, con o sin ventilador, debido a condiciones críticas. Ofrecemos un cuidado integral que incluye:
                        </p>
                        <ul className="space-y-3">
                            {pacienteCronicoFeatures.map((feature, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </section>

            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Médicos Internistas"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">¿Necesitas Más Información?</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo de hospitalización está listo para brindarte la mejor atención. Contáctanos para más detalles o explora nuestro directorio de especialistas.</p>
                <div className="mt-6 flex justify-center gap-4">
                    <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                        <Link href="/contacto">
                            <Phone className="mr-2 h-5 w-5" />
                            Contáctanos
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                        <Link href="/especialistas">
                            <Users className="mr-2 h-5 w-5" />
                            Ver Especialistas
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}

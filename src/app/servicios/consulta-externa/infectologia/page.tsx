import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';

export const metadata: Metadata = {
    title: 'Infectología - Clínica de la Costa',
    description: 'Diagnóstico y tratamiento de enfermedades infecciosas. Nuestro equipo de especialistas utiliza las herramientas más avanzadas para garantizar tu recuperación.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', '==', 'Infectología')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Infectología: ", error);
        return [];
    }
}

const services = [
    "Diagnóstico y tratamiento de infecciones bacterianas, virales, fúngicas y parasitarias.",
    "Manejo de enfermedades infecciosas crónicas como VIH/SIDA y hepatitis.",
    "Control de infecciones en pacientes inmunocomprometidos.",
    "Prevención y manejo de infecciones nosocomiales.",
    "Asesoramiento en enfermedades infecciosas de viaje."
];

const benefits = [
    "Diagnósticos rápidos y precisos utilizando tecnología avanzada.",
    "Tratamientos efectivos basados en guías internacionales.",
    "Prevención de complicaciones y control de infecciones recurrentes.",
    "Atención personalizada para casos complejos.",
    "Educación y orientación para prevenir infecciones futuras."
];

const technologies = [
    { title: "Diagnóstico Molecular", description: "Identificación rápida y precisa de agentes infecciosos." },
    { title: "Antibióticos Personalizados", description: "Selección de tratamientos según el perfil del paciente." },
    { title: "Laboratorios Especializados", description: "Cultivos microbiológicos y pruebas serológicas avanzadas." },
    { title: "Control de Infecciones", description: "Protocolos estrictos para reducir infecciones hospitalarias." }
];

export default async function InfectologiaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Finfectologia.jpg?alt=media"
                        alt="Servicios de Infectología"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="infectious disease lab"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Infectología</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Diagnóstico y Tratamiento de Enfermedades Infecciosas</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            En la Clínica de la Costa SAS, nuestra especialidad en Infectología está dedicada a la prevención, diagnóstico y tratamiento de enfermedades infecciosas. Nuestro equipo de especialistas utiliza las herramientas más avanzadas para garantizar la recuperación y el bienestar de nuestros pacientes.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Ftratamiento-infectologia.jpg?alt=media"
                    alt="Diagnóstico en Infectología"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    data-ai-hint="infectology diagnosis"
                />
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Servicios de Infectología</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {services.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Beneficios de Nuestra Atención</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-3">
                            {benefits.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
             <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Tecnología y Métodos Avanzados</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {technologies.map((tech) => (
                            <div key={tech.title} className="p-4 rounded-lg bg-primary/5">
                                <h3 className="font-semibold text-lg text-primary mb-2">{tech.title}</h3>
                                <p className="text-muted-foreground text-sm">{tech.description}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>

            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Nuestros Infectólogos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Confía en nuestros especialistas para proteger tu salud y bienestar. ¡Estamos aquí para ayudarte!</p>
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

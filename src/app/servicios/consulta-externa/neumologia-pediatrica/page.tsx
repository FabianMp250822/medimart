import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle, HeartHandshake } from 'lucide-react';
import type { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';

export const metadata: Metadata = {
    title: 'Neumología Pediátrica - Clínica de la Costa',
    description: 'Cuidado integral para enfermedades respiratorias en niños, desde asma hasta condiciones complejas, con un enfoque personalizado y humano.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', '==', 'Neumología Pediátrica')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Neumología Pediátrica: ", error);
        return [];
    }
}

const teamMembers = [
    "Neumólogos pediátricos con amplia experiencia.",
    "Fisioterapeutas especializados en rehabilitación pulmonar.",
    "Psicólogos para apoyo emocional a pacientes y familias.",
    "Nutricionistas para planes alimenticios adaptados."
];

const programBenefits = [
    "Diagnósticos precisos utilizando tecnología avanzada.",
    "Planes de tratamiento personalizados.",
    "Seguimiento continuo para asegurar una mejora constante.",
    "Apoyo integral para las familias en el manejo de enfermedades crónicas."
];

const specializedServices = [
    { title: "Consulta Externa", description: "Diagnóstico y manejo de enfermedades respiratorias en niños." },
    { title: "Pruebas Funcionales", description: "Espirometría, pruebas de esfuerzo y monitoreo continuo." },
    { title: "Rehabilitación Pulmonar", description: "Terapias especializadas para fortalecer la función pulmonar." },
    { title: "Atención Hospitalaria", description: "Manejo avanzado de enfermedades respiratorias críticas." }
];

export default async function NeumologiaPediatricaPage() {
    const specialists = await getSpecialists();

    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fneumologia-pediatrica.jpg?alt=media"
                        alt="Atención en Neumología Pediátrica"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="pediatric pulmonology"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Neumología Pediátrica</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Cuidado Integral de las Vías Respiratorias Infantiles</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La Clínica de la Costa SAS cuenta con un programa especializado en Neumología Pediátrica, diseñado para atender enfermedades respiratorias en niños. Desde problemas comunes como el asma y las infecciones respiratorias, hasta condiciones más complejas como fibrosis quística o displasia broncopulmonar, ofrecemos un enfoque integral, personalizado y humanizado para garantizar el bienestar de los pequeños.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Equipo Multidisciplinario</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {teamMembers.map((member, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                    <span>{member}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Beneficios del Programa</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {programBenefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Servicios Especializados</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {specializedServices.map((service) => (
                            <div key={service.title} className="p-4 rounded-lg bg-primary/5">
                                <h3 className="font-semibold text-lg text-primary mb-2">{service.title}</h3>
                                <p className="text-muted-foreground text-sm">{service.description}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>

            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Neumólogos Pediátricos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro compromiso es brindar atención integral, innovadora y humanizada para garantizar la salud respiratoria de los niños. ¡Tu tranquilidad y la de tu familia son nuestra prioridad!</p>
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

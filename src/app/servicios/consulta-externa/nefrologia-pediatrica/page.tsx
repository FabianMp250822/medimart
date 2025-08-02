import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle, Baby } from 'lucide-react';
import type { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';

export const metadata: Metadata = {
    title: 'Nefrología Pediátrica - Clínica de la Costa',
    description: 'Atención integral para enfermedades del sistema renal en niños, desde infecciones urinarias hasta insuficiencia renal, con un equipo altamente calificado.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', '==', 'Nefrología Pediátrica')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Nefrología Pediátrica: ", error);
        return [];
    }
}

const teamMembers = [
    "Nefrólogos pediátricos altamente capacitados.",
    "Psicólogos especializados en pediatría.",
    "Nutricionistas enfocados en dietas renales infantiles.",
    "Enfermería especializada en cuidados renales."
];

const programBenefits = [
    "Diagnóstico temprano y preciso.",
    "Planes de tratamiento personalizados.",
    "Atención humanizada centrada en el niño y su familia.",
    "Educación sobre cuidado renal en el hogar."
];

const specializedServices = [
    { title: "Consulta Externa", description: "Atención ambulatoria para diagnóstico y seguimiento." },
    { title: "Hospitalización Pediátrica", description: "Áreas especializadas en manejo renal agudo y crónico." },
    { title: "Diálisis Pediátrica", description: "Instalaciones modernas adaptadas para niños." },
    { title: "Educación Familiar", description: "Talleres y guías para padres sobre cuidado renal." }
];

export default async function NefrologiaPediatricaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fimage%20(1).jpg?alt=media&token=477643ba-d800-498a-9bf8-c0c7a737fcf0"
                        alt="Cuidado Integral en Nefrología Pediátrica"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="pediatric nephrology"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Nefrología Pediátrica</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Atención Integral para los Riñones de los Más Pequeños</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La nefrología pediátrica se enfoca en el diagnóstico, tratamiento y manejo integral de las enfermedades del sistema renal en niños. En la Clínica de la Costa SAS, contamos con un equipo altamente calificado y tecnología avanzada para abordar desde infecciones urinarias hasta condiciones más complejas como el síndrome nefrótico o insuficiencia renal.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Equipo Especializado</CardTitle>
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
                    specialtyName="Nefrólogos Pediátricos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro objetivo es garantizar una atención integral, segura y oportuna para los pacientes pediátricos con condiciones renales, asegurando su bienestar y calidad de vida.</p>
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

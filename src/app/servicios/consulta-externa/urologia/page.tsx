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
    title: 'Urología - Clínica de la Costa',
    description: 'Cuidado integral del sistema urinario. Ofrecemos diagnóstico y tratamiento para cálculos renales, infecciones, disfunción eréctil y más, con tecnología de vanguardia.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', '==', 'Urología')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Urología: ", error);
        return [];
    }
}

const services = [
    "Diagnóstico y tratamiento de cálculos renales.",
    "Manejo de infecciones urinarias recurrentes.",
    "Tratamiento de disfunción eréctil.",
    "Control de hiperplasia prostática benigna.",
    "Cirugía urológica mínimamente invasiva."
];

const benefits = [
    "Diagnósticos precisos y personalizados.",
    "Procedimientos seguros y mínimamente invasivos.",
    "Prevención de complicaciones asociadas a problemas urinarios.",
    "Mejora de la calidad de vida de los pacientes.",
    "Seguimiento integral y orientación especializada."
];

const technologies = [
    { title: "Ureteroscopia y Litotricia Láser", description: "Tratamiento avanzado de cálculos renales y uretrales." },
    { title: "Cirugía Robótica", description: "Procedimientos precisos y mínimamente invasivos." },
    { title: "Diagnóstico por Imágenes", description: "Ecografía y tomografía computarizada de alta resolución." },
    { title: "Terapias Focalizadas", description: "Tratamientos no invasivos para afecciones prostáticas." }
];

export default async function UrologiaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Furologia.jpg?alt=media&token=12345678-abcd-efgh-ijkl-mnopqrstuvwxyz"
                        alt="Servicios de Urología"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="urology service"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Urología</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Cuidado Integral del Sistema Urinario</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            En la Clínica de la Costa SAS, ofrecemos servicios especializados en Urología para el diagnóstico, tratamiento y seguimiento de enfermedades del sistema urinario y el aparato reproductor masculino. Contamos con un equipo de especialistas altamente calificados y tecnología de última generación.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Ftratamiento-urologia.jpg?alt=media&token=12345678-abcd-efgh-ijkl-mnopqrstuvwxyz"
                    alt="Tratamiento de Urología"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    data-ai-hint="urology treatment"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Nuestros Servicios</CardTitle>
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
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    specialtyName="Nuestros Urólogos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Confía en nuestro equipo para ofrecerte soluciones efectivas y personalizadas. ¡Estamos aquí para cuidarte!</p>
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

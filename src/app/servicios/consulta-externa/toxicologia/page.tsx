import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { safeQuery } from '@/lib/firebase-helpers';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';

export const metadata: Metadata = {
    title: 'Toxicología - Clínica de la Costa',
    description: 'Servicios especializados para evaluar, diagnosticar y tratar intoxicaciones agudas y crónicas, con un equipo multidisciplinario y tecnología avanzada.',
};

async function getSpecialists(): Promise<Medico[]> { return safeQuery(async (db) => { const snapshot = await db.collection('medicos')
            .where('especialidad', '==', 'Toxicología')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    }, []); }

const services = [
    "Diagnóstico y manejo de intoxicaciones agudas.",
    "Evaluación de exposición a sustancias tóxicas.",
    "Monitorización en casos de sobredosis de medicamentos.",
    "Asesoramiento en toxicología ocupacional.",
    "Análisis de toxicidad en exposición ambiental."
];

const benefits = [
    "Diagnósticos rápidos y precisos.",
    "Tratamientos personalizados y seguros.",
    "Reducción de complicaciones por exposición a toxinas.",
    "Acceso a tecnología avanzada para análisis toxicológicos.",
    "Educación y prevención para evitar nuevas exposiciones."
];

export default async function ToxicologiaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Ftoxicologia.jpg?alt=media"
                        alt="Servicios de Toxicología"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="toxicology lab"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Toxicología</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Evaluación y Manejo de Intoxicaciones</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            En la Clínica de la Costa SAS, ofrecemos servicios especializados en toxicología para evaluar, diagnosticar y tratar intoxicaciones agudas y crónicas. Contamos con un equipo multidisciplinario y tecnología avanzada para garantizar un manejo efectivo y seguro.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="relative h-96 w-full rounded-lg overflow-hidden">
                 <Image
                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Ftratamiento-toxicologia.jpg?alt=media"
                    alt="Tratamiento de Toxicología"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    data-ai-hint="toxicology treatment"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Servicios de Toxicología</CardTitle>
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

            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Nuestros Toxicólogos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro objetivo es ofrecer atención integral y profesional para el manejo de intoxicaciones. ¡Confía en nuestra experiencia para cuidar tu salud!</p>
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

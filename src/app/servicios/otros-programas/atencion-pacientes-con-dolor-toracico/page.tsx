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
    title: 'Atención a Pacientes con Dolor Torácico - Clínica de la Costa',
    description: 'Programa especializado para el manejo integral de pacientes con dolor torácico, enfocado en el diagnóstico y tratamiento de enfermedades cardíacas y vasculares.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', '==', 'Cardiología')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Dolor Torácico: ", error);
        return [];
    }
}

const procedures = [
    "Diagnóstico y tratamiento de aneurisma aórtico, estenosis aórtica, fibrilación auricular, entre otros.",
    "Tratamiento de enfermedades valvulares cardíacas e insuficiencia cardíaca."
];

const specializedServices = [
    "Laboratorio de imagen cardiovascular avanzada.",
    "Métodos no invasivos como ecocardiogramas y monitoreo Holter.",
    "Electrofisiología y cirugía cardiovascular avanzada."
];

export default async function DolorToracicoPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2Funidades.jpg?alt=media"
                        alt="Atención a Pacientes con Dolor Torácico"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="chest pain program"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Programa de Atención a Pacientes con Dolor Torácico</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Equipo Especializado en Enfermedades Cardíacas y Vasculares</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                           Nuestro programa está diseñado para el manejo integral de pacientes con dolor torácico, con un enfoque en el diagnóstico y tratamiento de enfermedades cardíacas y vasculares. Contamos con un equipo multidisciplinario y tecnología avanzada para ofrecer la mejor atención.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
             <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                    src="https://picsum.photos/1200/400?random=12"
                    alt="Transporte Asistencial"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    data-ai-hint="ambulance"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Procedimientos Destacados</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {procedures.map((item, index) => (
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
                        <CardTitle className="text-2xl text-primary">Servicios Especializados</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-3">
                            {specializedServices.map((item, index) => (
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
                    specialtyName="Nuestros Cardiólogos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo está listo para brindarte el apoyo y la atención que necesitas. Contáctanos para conocer más.</p>
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

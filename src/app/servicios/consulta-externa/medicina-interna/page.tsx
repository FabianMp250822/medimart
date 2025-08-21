import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';
import { ServiceNavigation } from '@/components/servicios/service-navigation';

export const metadata: Metadata = {
    title: 'Medicina Interna - Clínica de la Costa',
    description: 'Atención integral para adultos. Prevenimos, diagnosticamos y tratamos enfermedades crónicas y complejas con un enfoque personalizado y basado en evidencia.',
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
        console.error("Error fetching specialists for Medicina Interna: ", error);
        return [];
    }
}

const services = [
    "Diagnóstico y manejo de enfermedades crónicas como hipertensión y diabetes.",
    "Evaluación y tratamiento de enfermedades infecciosas complejas.",
    "Control de enfermedades autoinmunes y reumatológicas.",
    "Seguimiento de pacientes con múltiples patologías.",
    "Prevención y control de factores de riesgo cardiovascular."
];

const benefits = [
    "Atención integral y coordinada para pacientes con múltiples necesidades.",
    "Prevención de complicaciones y progresión de enfermedades crónicas.",
    "Acceso a especialistas en diversas áreas médicas.",
    "Planificación y seguimiento personalizado del tratamiento.",
    "Educación para el autocuidado y la mejora de la calidad de vida."
];

const technologies = [
    { title: "Diagnóstico por Imágenes", description: "Estudios avanzados como tomografía y resonancia magnética." },
    { title: "Laboratorios Clínicos", description: "Análisis detallados para apoyo en el diagnóstico." },
    { title: "Monitoreo Digital", description: "Seguimiento remoto de pacientes con enfermedades crónicas." },
    { title: "Protocolos de Última Generación", description: "Basados en evidencia científica actualizada." }
];

export default async function MedicinaInternaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fmedicina-interna.jpg?alt=media"
                        alt="Medicina Interna"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="internal medicine doctor"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Medicina Interna</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Atención Integral para Adultos</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            En la Clínica de la Costa SAS, nuestro servicio de Medicina Interna está diseñado para prevenir, diagnosticar y tratar enfermedades crónicas y complejas en adultos. Nuestros especialistas ofrecen una atención integral, personalizada y basada en evidencia científica para garantizar la salud y el bienestar de nuestros pacientes.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="relative h-96 w-full rounded-lg overflow-hidden">
                 <Image
                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Ftratamiento-medicina-interna.jpg?alt=media"
                    alt="Consulta de Medicina Interna"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    data-ai-hint="doctor patient consultation"
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
                    specialtyName="Nuestros Médicos Internistas"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo de Medicina Interna está dedicado a ofrecer un enfoque integral y profesional. ¡Estamos aquí para cuidar de ti!</p>
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

             <ServiceNavigation
                currentPath="/servicios/consulta-externa/medicina-interna"
                categorySlug="consulta-externa"
            />
        </div>
    );
}

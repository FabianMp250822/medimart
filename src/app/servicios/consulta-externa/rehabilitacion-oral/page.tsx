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
    title: 'Rehabilitación Oral - Clínica de la Costa',
    description: 'Restauración funcional y estética de tu sonrisa. Ofrecemos coronas, puentes, prótesis e implantes dentales para devolverte la confianza.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', '==', 'Rehabilitación Oral')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Rehabilitación Oral: ", error);
        return [];
    }
}

const services = [
    "Coronas y puentes dentales.",
    "Prótesis dentales fijas y removibles.",
    "Implantes dentales para reemplazo de dientes perdidos.",
    "Rehabilitación en casos de desgaste dental severo.",
    "Reconstrucción estética y funcional completa."
];

const benefits = [
    "Restauración de la funcionalidad masticatoria.",
    "Mejora de la estética dental y facial.",
    "Prevención de problemas en la articulación temporomandibular (ATM).",
    "Mayor confianza y autoestima gracias a una sonrisa renovada.",
    "Soluciones duraderas con materiales de alta calidad."
];

const technologies = [
    { title: "Diseño Digital de Sonrisas (DSD)", description: "Planificación detallada para resultados estéticos precisos." },
    { title: "Implantes Dentales", description: "Tecnología de última generación para restauración fija." },
    { title: "Escaneo Intraoral", description: "Diagnóstico y planificación digital sin moldes tradicionales." },
    { title: "Materiales Estéticos", description: "Cerámica y zirconio para prótesis naturales y resistentes." }
];

export default async function RehabilitacionOralPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Frehabilitacion-oral.jpg?alt=media"
                        alt="Servicios de Rehabilitación Oral"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="oral rehabilitation"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Rehabilitación Oral</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Restauración Funcional y Estética</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            En la Clínica de la Costa SAS, ofrecemos servicios especializados en Rehabilitación Oral para restaurar la funcionalidad y la estética dental. Nuestro equipo utiliza tecnología avanzada y un enfoque personalizado para devolver la confianza y la calidad de vida a nuestros pacientes.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
             <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Ftratamiento-rehabilitacion.jpg?alt=media"
                    alt="Tratamiento de Rehabilitación Oral"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    data-ai-hint="rehabilitation treatment"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Servicios de Rehabilitación Oral</CardTitle>
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
                        <CardTitle className="text-2xl text-primary">Beneficios de la Rehabilitación Oral</CardTitle>
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
                    specialtyName="Nuestros Especialistas"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Recupera la funcionalidad, la estética y la confianza en tu sonrisa con nuestros tratamientos especializados. ¡Estamos aquí para ayudarte a volver a sonreír!</p>
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

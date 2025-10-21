import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle, Monitor } from 'lucide-react';
import type { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';

export const metadata: Metadata = {
    title: 'Tomografía (TAC) - Clínica de la Costa',
    description: 'Servicio de Tomografía Axial Computarizada (TAC) con tecnología avanzada para diagnósticos rápidos y precisos de una amplia gama de condiciones médicas.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', '==', 'Radiología')
            .limit(5)
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Tomografía: ", error);
        return [];
    }
}

const applications = [
    "Detección y seguimiento de tumores y cáncer.",
    "Diagnóstico de lesiones internas y hemorragias.",
    "Evaluación de enfermedades vasculares como aneurismas y obstrucciones.",
    "Estudio de fracturas complejas y patologías óseas.",
    "Guía para biopsias y procedimientos intervencionistas."
];

const benefits = [
    "Imágenes de alta resolución que ofrecen un nivel de detalle excepcional.",
    "Procedimiento rápido, crucial en situaciones de emergencia.",
    "Capacidad para visualizar huesos, tejidos blandos y vasos sanguíneos en un solo estudio.",
    "Técnica no invasiva y segura para el paciente."
];

export default async function TomografiaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Funnamed%20(2).jpg?alt=media&token=48899b56-764a-4ef2-a8a8-e81fbec4d772"
                        alt="Equipo de Tomografía (TAC)"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="ct scanner"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Tomografía (TAC)</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Diagnóstico por Imágenes de Alta Precisión</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La Tomografía Axial Computarizada (TAC o CT Scan) es una técnica de diagnóstico por imagen que utiliza rayos X para crear imágenes transversales detalladas del cuerpo. En la Clínica de la Costa, nuestro servicio de Tomografía cuenta con equipos modernos que permiten a nuestros especialistas obtener vistas claras y precisas de órganos, huesos y tejidos, facilitando un diagnóstico rápido y certero.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Aplicaciones Clínicas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {applications.map((item, index) => (
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
                        <CardTitle className="text-2xl text-primary">Beneficios de la Tomografía</CardTitle>
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
                    specialtyName="Nuestros Radiólogos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Agende su Tomografía</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo está listo para brindarle un servicio de diagnóstico por imagen de la más alta calidad. Contáctenos para más información y para agendar su cita.</p>
                <div className="mt-6 flex justify-center gap-4">
                    <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                        <Link href="/contacto">
                            <Phone className="mr-2 h-5 w-5" />
                            Contáctanos
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                        <Link href="/pacientes/preparacion-examenes">
                            <Monitor className="mr-2 h-5 w-5" />
                            Preparación para el examen
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}

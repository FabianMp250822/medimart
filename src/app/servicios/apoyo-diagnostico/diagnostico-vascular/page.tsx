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
    title: 'Diagnóstico Vascular - Clínica de la Costa',
    description: 'Precisión y tecnología avanzada para el diagnóstico de enfermedades vasculares. Ofrecemos ecografía Doppler, angiografía y más para un cuidado integral.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', 'in', ['Cirugía Vascular y Angiológica', 'Radiología Intervencionista'])
            .limit(5)
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Diagnóstico Vascular: ", error);
        return [];
    }
}

const diagnosticMethods = [
    { title: "Ecografía Doppler Vascular", description: "Evalúa el flujo sanguíneo en arterias y venas." },
    { title: "Angiografía por Tomografía", description: "Visualiza en detalle las arterias con medio de contraste." },
    { title: "Índice Tobillo-Brazo", description: "Detecta problemas en la circulación periférica." }
];

const diagnosedDiseases = [
    "Insuficiencia venosa crónica y varices.",
    "Trombosis venosa profunda.",
    "Enfermedades arteriales periféricas.",
    "Aneurismas y obstrucciones arteriales."
];

const benefits = [
    "Precisión: Resultados detallados y confiables.",
    "Rapidez: Diagnósticos en tiempo récord.",
    "Equipo especializado: Profesionales altamente capacitados.",
    "Atención personalizada: Soluciones adaptadas a cada paciente."
];

export default async function DiagnosticoVascularPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Funnamed%20(1).png?alt=media&token=eb087a7c-4318-42fd-ae8d-3194774bc622"
                        alt="Diagnóstico Vascular"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="vascular diagnosis"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Diagnóstico Vascular</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Precisión y Tecnología Avanzada</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                           El diagnóstico vascular es un conjunto de pruebas médicas que evalúan el estado de las arterias y venas del cuerpo. Estas pruebas permiten identificar problemas como obstrucciones, aneurismas o insuficiencia venosa. En la Clínica de la Costa, utilizamos tecnología avanzada para garantizar diagnósticos precisos y rápidos.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Métodos de Diagnóstico</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">Estas pruebas no invasivas ofrecen resultados rápidos y confiables, permitiendo a nuestros especialistas detectar problemas de manera temprana.</p>
                        <ul className="space-y-3">
                            {diagnosticMethods.map((method, index) => (
                                <li key={index}>
                                    <h4 className="font-semibold text-foreground">{method.title}</h4>
                                    <p className="text-sm text-muted-foreground">{method.description}</p>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Enfermedades Diagnosticadas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">Gracias a nuestro enfoque multidisciplinario, garantizamos una atención integral, desde el diagnóstico hasta el tratamiento.</p>
                        <ul className="space-y-3">
                            {diagnosedDiseases.map((disease, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                    <span>{disease}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
             <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Beneficios en la Clínica de la Costa</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {benefits.map((benefit, index) => (
                                <li key={index} className="flex items-center gap-3 bg-primary/5 p-4 rounded-lg">
                                    <CheckCircle className="h-6 w-6 text-accent flex-shrink-0" />
                                    <span className="font-medium">{benefit}</span>
                                </li>
                            ))}
                        </ul>
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
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo está listo para ofrecerte un diagnóstico vascular preciso y oportuno. Contáctanos para agendar una consulta.</p>
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

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
    title: 'Centro Neurológico - Clínica de la Costa',
    description: 'Unidad médica especializada en la detección y tratamiento de patologías del sistema nervioso, con un equipo de neurólogos altamente capacitados.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', 'in', ['Neurología', 'Neuropediatría'])
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Neurología: ", error);
        return [];
    }
}

const diagnosticServices = [
    { title: "Polisomnografía", description: "Estudio del sueño para diagnosticar problemas como apnea del sueño." },
    { title: "Polisomnografía con oximetría y titulación de CPAP", description: "Evaluación avanzada para el tratamiento de trastornos del sueño." },
    { title: "Electroencefalograma (EEG)", description: "Diagnóstico de trastornos como epilepsia." },
    { title: "Video telemetrías", description: "Monitoreo prolongado para estudiar episodios neurológicos." },
    { title: "Potenciales evocados visuales y somatosensoriales", description: "Evaluación de la función sensorial y nerviosa." },
    { title: "Test sueño", description: "Diagnóstico de trastornos relacionados con la somnolencia diurna y apnea." },
];

const otherServices = [
    "Consulta especializada en neurología.",
    "Urgencias neurológicas disponibles 24/7.",
    "Tratamiento de enfermedades degenerativas como Parkinson y movimientos anormales.",
    "Atención a pacientes con problemas de sueño."
];

export default async function NeurologiaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fneurol.webp?alt=media&token=4308c88a-51d4-4e53-b0ef-f3c00ee999be"
                        alt="Centro Neurológico"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="neurology center"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Centro Neurológico</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Especialistas en el Cuidado del Sistema Nervioso</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            El Centro Neurológico de la Clínica de la Costa SAS es una unidad médica especializada en la detección y tratamiento de patologías relacionadas con el funcionamiento del sistema nervioso. Contamos con un equipo de neurólogos altamente capacitados y tecnología avanzada para atender las necesidades de pacientes con condiciones complejas.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-20%20at%203.40.56%20PM.jpeg?alt=media&token=58c3d9c0-c8e4-4252-8899-af7c2692bdec"
                    alt="Atención Hospitalaria Neurológica"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    data-ai-hint="neurology hospital care"
                />
            </div>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Pruebas y Diagnóstico Avanzado</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {diagnosticServices.map((service) => (
                            <div key={service.title} className="p-4 rounded-lg bg-primary/5">
                                <h3 className="font-semibold text-lg text-primary mb-2">{service.title}</h3>
                                <p className="text-muted-foreground text-sm">{service.description}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Otros Servicios</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {otherServices.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </section>

            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Nuestros Neurólogos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo de neurología está listo para brindarte el mejor cuidado. Contáctanos para conocer más sobre nuestros servicios.</p>
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

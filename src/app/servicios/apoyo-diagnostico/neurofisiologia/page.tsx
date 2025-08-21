import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle, BrainCircuit, Waves, Activity } from 'lucide-react';
import type { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';

export const metadata: Metadata = {
    title: 'Laboratorio de Neurofisiología - Clínica de la Costa',
    description: 'Estudios avanzados para el diagnóstico de trastornos neurológicos, del sueño y neuromusculares, incluyendo polisomnografía, potenciales evocados y telemetría.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', 'in', ['Neurología', 'Neurofisiología'])
            .limit(5)
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Neurofisiología: ", error);
        return [];
    }
}

const services = [
    {
        icon: <Waves className="h-8 w-8 text-accent" />,
        title: "Polisomnografía (Estudio del Sueño)",
        description: "Diagnóstico preciso de trastornos del sueño como la apnea, el insomnio y la narcolepsia. Monitoreamos la actividad cerebral, la respiración, el ritmo cardíaco y los movimientos corporales durante el sueño para identificar la causa de sus problemas de descanso."
    },
    {
        icon: <Activity className="h-8 w-8 text-accent" />,
        title: "Potenciales Evocados",
        description: "Evaluación de la integridad de las vías nerviosas sensoriales (visuales, auditivas y somatosensoriales). Este estudio es clave para el diagnóstico de esclerosis múltiple, lesiones de la médula espinal y otras enfermedades que afectan el sistema nervioso."
    },
    {
        icon: <BrainCircuit className="h-8 w-8 text-accent" />,
        title: "Telemetría (Video EEG)",
        description: "Monitoreo prolongado de la actividad eléctrica cerebral con grabación de video simultánea. Es la herramienta fundamental para el diagnóstico y caracterización de crisis epilépticas y otros eventos neurológicos paroxísticos."
    }
];


export default async function NeurofisiologiaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://placehold.co/1200x400.png"
                        alt="Laboratorio de Neurofisiología"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="neurophysiology lab"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Laboratorio de Neurofisiología</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Diagnóstico Avanzado del Sistema Nervioso</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                           Nuestro Laboratorio de Neurofisiología en la Clínica de la Costa se especializa en el estudio funcional del sistema nervioso central y periférico. A través de tecnología de vanguardia y un equipo de neurólogos y técnicos expertos, ofrecemos diagnósticos precisos para una amplia gama de condiciones neurológicas, desde trastornos del sueño hasta epilepsia y enfermedades neuromusculares.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Nuestros Estudios Neurofisiológicos</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       {services.map((service) => (
                         <div key={service.title} className="p-4 rounded-lg bg-primary/5 flex flex-col items-center text-center">
                            <div className="mb-4">{service.icon}</div>
                            <h3 className="font-semibold text-lg text-primary mb-2">{service.title}</h3>
                            <p className="text-muted-foreground text-sm flex-grow">{service.description}</p>
                        </div>
                       ))}
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
                <h2 className="text-2xl font-bold text-primary">Agende su Estudio Neurofisiológico</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo está listo para brindarle un diagnóstico preciso y un cuidado excepcional. Contáctenos para más información y para programar su cita.</p>
                <div className="mt-6 flex justify-center gap-4">
                    <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                        <Link href="/contacto">
                            <Phone className="mr-2 h-5 w-5" />
                            Contáctanos
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                        <Link href="/pacientes/preparacion-examenes">
                            <BrainCircuit className="mr-2 h-5 w-5" />
                            Preparación para el examen
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}

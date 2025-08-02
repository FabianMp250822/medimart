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
    title: 'Cirugía Endovascular Neurológica - Clínica de la Costa',
    description: 'Tratamientos mínimamente invasivos para enfermedades cerebrovasculares como aneurismas y ACV isquémico, utilizando tecnología de punta para una recuperación más rápida.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', 'in', ['Neurocirugía', 'Radiología Intervencionista'])
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Cirugía Endovascular: ", error);
        return [];
    }
}

const conditionsTreated = [
    "Aneurismas cerebrales: Reparación mediante coils o stents para prevenir su ruptura.",
    "Malformaciones arteriovenosas (MAV): Corrección de conexiones anormales para reducir el riesgo de hemorragias.",
    "Accidente cerebrovascular (ACV) isquémico: Trombectomía mecánica para eliminar coágulos y restaurar el flujo sanguíneo.",
    "Estenosis arterial: Colocación de stents para tratar estrecheces en arterias que irrigan el cerebro.",
    "Fístulas arteriovenosas: Reparación de conexiones anormales en el sistema nervioso central."
];

const benefits = [
    "Mínima invasión sin necesidad de grandes incisiones ni apertura del cráneo.",
    "Recuperación más rápida y menor tiempo de hospitalización.",
    "Reducción significativa del riesgo de complicaciones como dolor e infecciones.",
    "Alta precisión gracias al uso de imágenes en tiempo real durante el procedimiento."
];


export default async function CirugiaEndovascularNeurologicaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2FDSC01594.JPG?alt=media&token=d932da45-0f06-4b19-85dc-58b718ff3a30"
                        alt="Cirugía Endovascular Neurológica"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="endovascular surgery"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Cirugía Endovascular Neurológica</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Tratamientos Mínimamente Invasivos para Enfermedades Cerebrovasculares</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La cirugía endovascular neurológica es una técnica avanzada y mínimamente invasiva utilizada para tratar enfermedades de los vasos sanguíneos del cerebro y la médula espinal. A través de pequeñas punciones, se introducen catéteres y dispositivos especializados guiados por imágenes avanzadas para realizar tratamientos que antes requerían cirugías abiertas complejas.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Condiciones Tratadas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {conditionsTreated.map((item, index) => (
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
                        <CardTitle className="text-2xl text-primary">Beneficios Principales</CardTitle>
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
                    specialtyName="Nuestros Neurocirujanos y Radiólogos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo de especialistas está listo para brindarte el mejor cuidado. Contáctanos para conocer más sobre nuestros procedimientos endovasculares.</p>
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

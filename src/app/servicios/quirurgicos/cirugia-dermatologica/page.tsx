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
    title: 'Cirugía Dermatológica - Clínica de la Costa',
    description: 'Tratamientos quirúrgicos especializados para la piel, incluyendo cáncer de piel, lesiones benignas y procedimientos estéticos, con tecnología de punta y un enfoque en la seguridad del paciente.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', '==', 'Dermatología')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Cirugía Dermatológica: ", error);
        return [];
    }
}

const procedures = [
    {
        title: "Cirugía para el cáncer de piel",
        items: [
            "Extirpación de tumores malignos como carcinoma basocelular, espinocelular y melanoma.",
            "Reconstrucción estética para minimizar cicatrices tras la extirpación."
        ]
    },
    {
        title: "Cirugía de lesiones benignas",
        items: [
            "Eliminación de nevus (lunares), quistes sebáceos, lipomas y otros crecimientos cutáneos.",
            "Tratamiento de verrugas resistentes."
        ]
    },
    {
        title: "Procedimientos estéticos",
        items: [
            "Eliminación de cicatrices y queloides.",
            "Reparación de daños cutáneos causados por el sol o lesiones.",
            "Resurfacing cutáneo para mejorar la textura de la piel."
        ]
    },
    {
        title: "Biopsias cutáneas",
        items: ["Realización de biopsias para el diagnóstico preciso de enfermedades de la piel."]
    },
];

const innovations = [
    "Cirugía de Mohs: Técnica avanzada para el tratamiento del cáncer de piel que preserva la mayor cantidad de tejido sano.",
    "Técnicas de sutura estética: Diseñadas para minimizar cicatrices y mejorar los resultados visuales.",
    "Láser quirúrgico: Ideal para lesiones superficiales y tratamientos estéticos no invasivos."
];

export default async function CirugiaDermatologicaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-18%20at%202.35.13%20PM.jpeg?alt=media&token=6aae6289-d76f-4b36-b1be-59ad722a2551"
                        alt="Cirugía Dermatológica"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="dermatological surgery"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Cirugía Dermatológica</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Tratamientos Especializados para la Piel</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La cirugía dermatológica es una rama especializada enfocada en el diagnóstico y tratamiento quirúrgico de enfermedades de la piel, cabello y uñas. En la Clínica de la Costa SAS, nuestros dermatólogos quirúrgicos utilizan tecnología avanzada para ofrecer soluciones seguras, precisas y efectivas, combinando la precisión quirúrgica con un enfoque estético para garantizar el mejor resultado funcional y visual posible.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Procedimientos Comunes</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {procedures.map((proc) => (
                            <div key={proc.title} className="p-4 rounded-lg bg-primary/5">
                                <h3 className="font-semibold text-lg text-primary mb-2">{proc.title}</h3>
                                <ul className="space-y-2 list-disc list-inside text-muted-foreground text-sm">
                                    {proc.items.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Innovación en Técnicas Quirúrgicas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {innovations.map((item, index) => (
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
                    specialtyName="Nuestros Dermatólogos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo de cirugía dermatológica está aquí para ofrecerte el mejor cuidado. Contáctanos para resolver tus dudas.</p>
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

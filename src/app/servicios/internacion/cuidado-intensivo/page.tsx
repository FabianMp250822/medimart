import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users } from 'lucide-react';
import type { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';

export const metadata: Metadata = {
    title: 'Unidades de Cuidado Intensivo - Clínica de la Costa',
    description: 'Conozca nuestras Unidades de Cuidado Intensivo (UCI) especializadas para adultos, pediátricas y neonatales. Atención crítica con tecnología de punta y un equipo humano comprometido.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', '==', 'Medicina Crítica y Cuidado Intensivo')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Cuidado Intensivo: ", error);
        return [];
    }
}


const cuidados = [
    {
        title: "Cuidado Intermedio Neonatal",
        description: "Esta unidad se especializa en atender recién nacidos que requieren cuidados especializados, pero no están en estado crítico.",
        items: [
            "Atención a neonatos prematuros o con necesidades médicas leves.",
            "Equipos de soporte respiratorio y monitoreo constante.",
            "Ambientes adaptados para la seguridad y comodidad de los recién nacidos."
        ]
    },
    {
        title: "Cuidado Intensivo Neonatal",
        description: "Nuestra UCI Neonatal está equipada con tecnología de punta para atender a recién nacidos en estado crítico, como bebés prematuros extremos o con afecciones graves al nacer.",
        items: [
            "Incubadoras de alta tecnología.",
            "Ventilación asistida para bebés con problemas respiratorios.",
            "Atención las 24 horas por neonatólogos e intensivistas."
        ]
    }
];

const compromisos = [
    { title: "Tecnología de punta", description: "Monitoreo avanzado para cada paciente." },
    { title: "Atención continua", description: "Supervisión las 24 horas del día por un equipo interdisciplinario." },
    { title: "Personal capacitado", description: "Profesionales especializados en el manejo de pacientes críticos." },
];

const unidadesSoporte = [
    { title: "Unidad de Medicina Crítica", description: "Equipo interdisciplinario que atiende pacientes con enfermedades complejas." },
    { title: "Unidad Coronaria", description: "Enfocada en el manejo integral de pacientes con enfermedades coronarias." },
];

export default async function CuidadoIntensivoPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%206.31.54%20PM.jpeg?alt=media&token=128385f5-0c3a-452c-9183-439023b2c3a0"
                        alt="Unidad de Cuidados Intensivos"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="intensive care unit"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Unidades de Cuidado Intensivo: Atención Especializada para Cada Necesidad</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">¿Qué son las Unidades de Cuidado Intensivo?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Las Unidades de Cuidado Intensivo (UCI) son áreas especializadas para el manejo de pacientes en estado crítico o que requieren monitoreo continuo. En nuestra institución, estas unidades están diseñadas para atender a pacientes de todas las edades, desde neonatos hasta adultos, ofreciendo una atención personalizada y enfocada en sus necesidades específicas.
                        </p>
                    </CardContent>
                </Card>
            </section>

            <section className="text-center">
                <div className="relative h-96 w-full rounded-lg overflow-hidden">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-20%20at%209.10.01%20AM.jpeg?alt=media&token=89506541-c55f-44f6-8d77-b64301cf8550"
                        alt="Atención Hospitalaria de calidad"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                        data-ai-hint="quality hospital care"
                    />
                </div>
                <p className="text-foreground text-lg italic mt-4">Atención especializada y humana en los momentos más críticos.</p>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Tipos de Cuidado en las UCI</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {cuidados.map(cuidado => (
                            <div key={cuidado.title}>
                                <h3 className="font-semibold text-xl text-foreground mb-2">{cuidado.title}</h3>
                                <p className="text-muted-foreground mb-3">{cuidado.description}</p>
                                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                                    {cuidado.items.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Compromiso con la Calidad y Seguridad</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <p className="text-muted-foreground mb-4">Nuestras Unidades de Cuidado Intensivo están diseñadas para ofrecer:</p>
                        <ul className="space-y-3">
                            {compromisos.map(item => (
                                <li key={item.title}>
                                    <p className="font-semibold text-foreground">{item.title}</p>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Unidades Especializadas de Soporte</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">Estas unidades están diseñadas para ofrecer soporte especializado en áreas críticas, como:</p>
                         <ul className="space-y-3">
                            {unidadesSoporte.map(item => (
                                <li key={item.title}>
                                    <p className="font-semibold text-foreground">{item.title}</p>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Intensivistas"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">¿Necesitas Más Información?</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo está listo para ayudarte. Contáctanos para resolver tus dudas o conoce a nuestros especialistas en medicina crítica.</p>
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

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';
import { safeQuery } from '@/lib/firebase-helpers';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';

export const metadata: Metadata = {
    title: 'Cirugía de la Mano - Clínica de la Costa',
    description: 'Servicio experto en cirugía de la mano para restaurar la funcionalidad y calidad de vida. Tratamos lesiones, enfermedades degenerativas y deformidades con tecnología avanzada.',
};

async function getSpecialists(): Promise<Medico[]> { return safeQuery(async (db) => { const snapshot = await db.collection('medicos')
            .where('especialidad', 'in', ['Cirugía de la Mano', 'Ortopedia y Traumatología'])
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    }, []); }

const procedures = [
    {
        title: "Lesiones traumáticas",
        items: [
            "Reparación de fracturas de mano, muñeca y dedos.",
            "Reconstrucción de tendones y nervios.",
            "Tratamiento de lesiones por aplastamiento o amputaciones parciales."
        ]
    },
    {
        title: "Enfermedades degenerativas",
        items: [
            "Tratamiento quirúrgico de la artrosis de la mano y muñeca.",
            "Artroplastia (reemplazo articular) para restaurar la movilidad."
        ]
    },
    {
        title: "Síndrome del túnel carpiano",
        items: ["Liberación quirúrgica del nervio mediano para aliviar el dolor, entumecimiento y debilidad."]
    },
    {
        title: "Deformidades congénitas",
        items: [
            "Corrección de anomalías como dedos fusionados (sindactilia) y dedos adicionales (polidactilia).",
            "Tratamiento para la ausencia parcial o completa de estructuras de la mano."
        ]
    },
    {
        title: "Reparación de lesiones crónicas",
        items: [
            "Tratamiento de dedo en gatillo y otras condiciones que afectan la movilidad.",
            "Cirugía para corregir contracturas, como la contractura de Dupuytren."
        ]
    },
    {
        title: "Cirugía reconstructiva",
        items: [
            "Reimplante de dedos o manos amputados.",
            "Reconstrucción de tejidos blandos y huesos tras traumatismos."
        ]
    }
];

const whyChooseUs = [
    "Equipo especializado con amplia experiencia en procedimientos avanzados de la mano.",
    "Tecnología de última generación que asegura precisión y seguridad en cada intervención.",
    "Planes de tratamiento diseñados a la medida de las necesidades de cada paciente.",
    "Cuidado integral desde el diagnóstico hasta la rehabilitación completa."
];

export default async function CirugiaDeManoPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2FDSC01594.JPG?alt=media&token=d932da45-0f06-4b19-85dc-58b718ff3a30"
                        alt="Cirugía de la Mano"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="hand surgery"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Cirugía de la Mano</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Restaurando la Funcionalidad y Calidad de Vida</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La cirugía de la mano es una especialidad médica que se enfoca en el diagnóstico, tratamiento y rehabilitación de lesiones, deformidades y enfermedades que afectan la mano, muñeca y antebrazo. En la Clínica de la Costa SAS, nuestro equipo de cirujanos expertos y tecnología avanzada garantizan resultados efectivos y personalizados, ayudando a nuestros pacientes a recuperar su funcionalidad y mejorar su calidad de vida.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Procedimientos Especializados</CardTitle>
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
                        <CardTitle className="text-2xl text-primary flex items-center gap-3"><ShieldCheck /> ¿Por Qué Elegirnos?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {whyChooseUs.map((item, index) => (
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
                    specialtyName="Especialistas en Cirugía de la Mano"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo está listo para brindarte el apoyo y la atención que necesitas. Contáctanos para conocer más sobre nuestros procedimientos.</p>
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

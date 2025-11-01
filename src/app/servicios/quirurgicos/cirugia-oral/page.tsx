import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { safeQuery } from '@/lib/firebase-helpers';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';

export const metadata: Metadata = {
    title: 'Cirugía Oral - Clínica de la Costa',
    description: 'Servicios especializados en cirugía oral, incluyendo extracción de muelas del juicio, implantes dentales y cirugía ortognática para mejorar tu salud bucal.',
};

async function getSpecialists(): Promise<Medico[]> {
    return safeQuery(async (db) => {
        const snapshot = await db.collection('medicos')
            .where('especialidad', 'in', ['Cirugía Oral', 'Cirugía Maxilofacial'])
            .get();
        if (snapshot.empty) return [];
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    }, []);
}

const procedures = [
    { 
        title: "Extracción de Muelas del Juicio", 
        description: "Realizamos la extracción quirúrgica de muelas del juicio impactadas o problemáticas con técnicas avanzadas para un procedimiento seguro y una recuperación rápida." 
    },
    { 
        title: "Implantes Dentales", 
        description: "Ofrecemos la colocación de implantes dentales para restaurar dientes perdidos, devolviendo la funcionalidad y estética de tu sonrisa con soluciones duraderas." 
    },
    { 
        title: "Cirugía Ortognática", 
        description: "Corregimos deformidades en los maxilares para mejorar la mordida, la funcionalidad masticatoria y la armonía facial, en colaboración con ortodoncistas." 
    }
];

export default async function CirugiaOralPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%204.42.37%20PM(1).jpeg?alt=media&token=a0535648-1f07-4a43-87c1-8901f530dd94"
                        alt="Cirugía Oral"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="oral surgery"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Cirugía Oral</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Servicios Especializados para tu Salud Bucal</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La cirugía oral es una especialidad enfocada en el diagnóstico y tratamiento quirúrgico de problemas complejos en los dientes, encías, maxilares y tejidos relacionados. En la Clínica de la Costa, ofrecemos servicios de cirugía oral avanzados para mejorar tu salud bucal y calidad de vida.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Nuestros Procedimientos</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {procedures.map((proc) => (
                            <div key={proc.title} className="p-4 rounded-lg bg-primary/5">
                                <h3 className="font-semibold text-lg text-primary mb-2">{proc.title}</h3>
                                <p className="text-muted-foreground text-sm">{proc.description}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>
            
            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Cirujanos Orales y Maxilofaciales"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo de cirugía oral está listo para brindarte el mejor cuidado. Contáctanos para conocer más sobre nuestros procedimientos.</p>
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

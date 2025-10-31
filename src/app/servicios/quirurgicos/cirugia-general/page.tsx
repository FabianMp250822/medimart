import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { safeQuery } from '@/lib/firebase-helpers';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';
import { getServiceMetadata } from '@/lib/services-metadata';
import { generateServiceMetadata } from '@/lib/metadata-helpers';
import { generateMedicalServiceSchema } from '@/lib/structured-data';

const serviceData = getServiceMetadata('cirugia-general')!;

export const metadata: Metadata = generateServiceMetadata(serviceData);

async function getSpecialists(): Promise<Medico[]> {
    return safeQuery(async (db) => {
        const snapshot = await db.collection('medicos')
            .where('especialidad', '==', 'Cirugía General')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    }, []);
}

const objectives = [
    "Atención oportuna en urgencias y emergencias traumáticas y médico-quirúrgicas.",
    "Consulta externa especializada para procedimientos de cirugía electiva.",
    "Diagnóstico y tratamiento de patologías abdominales y del sistema digestivo.",
];

const uniqueFeatures = [
    "Disponibilidad 24/7 para abordar situaciones críticas con rapidez y eficacia.",
    "Cirugías electivas personalizadas y enfocadas en patologías específicas.",
    "Coordinación con otras áreas médicas para una atención integral.",
    "Recursos de última generación para diagnósticos y procedimientos quirúrgicos."
];

export default async function CirugiaGeneralPage() {
    const specialists = await getSpecialists();
    
    const serviceSchema = generateMedicalServiceSchema({
        name: serviceData.name,
        description: serviceData.description,
        url: `https://clinica-de-la-costa.app/${serviceData.slug}`,
        alternateName: serviceData.searchTerms // Incluir términos alternativos para mejor SEO
    });
    
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <div className="space-y-12">
                <Card className="overflow-hidden">
                    <div className="relative h-64 sm:h-80 md:h-96 w-full">
                        <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%204.42.37%20PM(1).jpeg?alt=media&token=a0535648-1f07-4a43-87c1-8901f530dd94"
                        alt="Cirugía General"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="general surgery"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Cirugía General</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Atención Integral para Emergencias y Cirugías Electivas</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            El Servicio de Cirugía General de la Clínica de la Costa SAS está diseñado para ofrecer una atención completa y especializada en situaciones traumáticas y médico-quirúrgicas. Nuestro compromiso es brindar soluciones rápidas, efectivas y seguras, adaptadas a las necesidades individuales de cada paciente.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Objetivos del Servicio</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {objectives.map((item, index) => (
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
                        <CardTitle className="text-2xl text-primary">¿Qué Hace Único a Nuestro Servicio?</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-3">
                            {uniqueFeatures.map((item, index) => (
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
                    specialtyName="Cirujanos Generales"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo de cirugía general está preparado para atenderte. Contáctanos para más detalles sobre nuestros procedimientos.</p>
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
        </>
    );
}

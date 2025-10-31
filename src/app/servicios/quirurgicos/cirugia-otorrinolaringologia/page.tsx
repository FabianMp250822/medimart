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
import { unstable_cache } from 'next/cache';

const serviceData = getServiceMetadata('cirugia-otorrinolaringologica')!;

export const metadata: Metadata = generateServiceMetadata(serviceData);

const getSpecialists = unstable_cache(
    async (): Promise<Medico[]> => {
        return safeQuery(async (db) => {
            const snapshot = await db.collection('medicos')
                .where('especialidad', '==', serviceData.specialty)
                .get();
            if (snapshot.empty) {
                return [];
            }
            return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
        }, []);
    },
    ['specialists-cirugia-otorrinolaringologica'],
    { revalidate: 3600, tags: ['specialists', 'cirugia-otorrinolaringologica'] }
);

const procedures = [
    { title: "Cirugía de oídos (otología)", description: "Timpanoplastia, mastoidectomía e implantes cocleares." },
    { title: "Cirugía de nariz y senos paranasales", description: "Septoplastia, cirugía endoscópica y rinoplastia funcional." },
    { title: "Cirugía de garganta (laringología)", description: "Amigdalectomía, cirugía de cuerdas vocales y laringectomía." },
    { title: "Cirugía de cuello y glándulas salivales", description: "Extirpación de quistes y tumores, tratamiento de trastornos salivales." },
    { title: "Tratamiento quirúrgico de apnea del sueño", description: "Cirugía para corregir obstrucciones respiratorias superiores." },
];

const whyChooseUs = [
    "Especialistas en otorrinolaringología altamente capacitados en procedimientos avanzados.",
    "Tecnología avanzada para garantizar precisión y seguridad en cada intervención.",
    "Atención personalizada con planes quirúrgicos adaptados a las necesidades de cada paciente.",
    "Cuidado integral, desde el diagnóstico hasta la recuperación, con un acompañamiento completo."
];

export default async function CirugiaOtorrinolaringologiaPage() {
    const specialists = await getSpecialists();
    
    const serviceSchema = generateMedicalServiceSchema({
        name: serviceData.name,
        description: serviceData.description,
        url: `https://clinica-de-la-costa.app/${serviceData.slug}`,
        alternateName: serviceData.searchTerms
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
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2FDSC01594.JPG?alt=media&token=d932da45-0f06-4b19-85dc-58b718ff3a30"
                        alt="Cirugía de Otorrinolaringología"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="otolaryngology surgery"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Cirugía de Otorrinolaringología</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Soluciones Avanzadas para Oídos, Nariz y Garganta</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La cirugía de otorrinolaringología se enfoca en el diagnóstico y tratamiento quirúrgico de enfermedades que afectan los oídos, la nariz, la garganta, y estructuras relacionadas del cuello y la cabeza. En la Clínica de la Costa SAS, nuestros especialistas y tecnología de última generación ofrecen procedimientos seguros y efectivos, adaptados a las necesidades de cada paciente.
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
                                <p className="text-muted-foreground text-sm">{proc.description}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">¿Por Qué Elegirnos?</CardTitle>
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
                    specialtyName="Nuestros Otorrinolaringólogos"
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
        </>
    );
}

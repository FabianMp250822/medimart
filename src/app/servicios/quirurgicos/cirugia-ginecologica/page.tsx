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

const serviceData = getServiceMetadata('cirugia-ginecologica')!;

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
    ['specialists-cirugia-ginecologica'],
    { revalidate: 3600, tags: ['specialists', 'cirugia-ginecologica'] }
);

const procedures = [
    {
        title: "Histerectomía",
        items: ["Extirpación del útero por vía abdominal, vaginal o laparoscópica para tratar fibromas, endometriosis o cáncer."]
    },
    {
        title: "Miomectomía",
        items: ["Extirpación de fibromas uterinos, preservando el útero para futuras gestaciones."]
    },
    {
        title: "Cirugía de Quistes Ováricos",
        items: ["Eliminación de quistes en los ovarios, a menudo mediante laparoscopia para una recuperación más rápida."]
    },
    {
        title: "Cirugía de Endometriosis",
        items: ["Extirpación de tejido endometrial fuera del útero para aliviar el dolor y mejorar la fertilidad."]
    },
    {
        title: "Procedimientos de Suelo Pélvico",
        items: ["Corrección de prolapso de órganos pélvicos y tratamiento de la incontinencia urinaria."]
    },
    {
        title: "Ligadura de Trompas",
        items: ["Esterilización quirúrgica mediante el cierre o corte de las trompas de Falopio por laparoscopia."]
    }
];

const benefits = [
    "Incisiones pequeñas que resultan en cicatrices casi imperceptibles.",
    "Reducción significativa del dolor tras la cirugía.",
    "Tiempo de hospitalización reducido y pronta reincorporación a las actividades diarias.",
    "Mejor visualización de los órganos pélvicos, lo que mejora la precisión quirúrgica."
];

export default async function CirugiaGinecologicaPage() {
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
                        alt="Cirugía Ginecológica Laparoscópica"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="gynecological surgery"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Cirugía Ginecológica y Laparoscópica</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Innovación y Precisión al Servicio de la Salud Femenina</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La cirugía ginecológica laparoscópica es una técnica quirúrgica avanzada y mínimamente invasiva que permite diagnosticar y tratar una variedad de condiciones ginecológicas mediante pequeñas incisiones. En la Clínica de la Costa SAS, ofrecemos este enfoque moderno como una alternativa segura, eficaz y menos invasiva para nuestras pacientes, garantizando una recuperación más rápida y resultados óptimos.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Procedimientos Destacados</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        <CardTitle className="text-2xl text-primary">Beneficios de la Cirugía Laparoscópica</CardTitle>
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
            </section>
            
            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Ginecólogos y Obstetras"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo de ginecología está listo para brindarte el mejor cuidado. Contáctanos para conocer más sobre nuestros procedimientos.</p>
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

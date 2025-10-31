import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, Stethoscope, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { safeQuery } from '@/lib/firebase-helpers';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';
import { getServiceMetadata } from '@/lib/services-metadata';
import { generateServiceMetadata } from '@/lib/metadata-helpers';
import { generateMedicalServiceSchema } from '@/lib/structured-data';
import { unstable_cache } from 'next/cache';

const serviceData = getServiceMetadata('cirugia-cardiovascular')!;

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
    ['specialists-cirugia-cardiovascular'],
    { revalidate: 3600, tags: ['specialists', 'cirugia-cardiovascular'] }
);

const specializedProcedures = [
    {
        category: "Cirugía coronaria",
        items: ["Bypass coronario (CABG)", "Revascularización quirúrgica para tratar enfermedades coronarias avanzadas."]
    },
    {
        category: "Cirugía valvular",
        items: ["Reparación y reemplazo de válvulas cardíacas dañadas.", "Uso de válvulas biológicas o mecánicas, según las necesidades del paciente."]
    },
    {
        category: "Cirugía de la aorta",
        items: ["Reparación de aneurismas aórticos mediante técnicas abiertas o endovasculares.", "Tratamiento de disección aórtica para prevenir complicaciones graves."]
    },
    {
        category: "Cirugía de arritmias",
        items: ["Implantación de dispositivos como marcapasos y desfibriladores automáticos implantables (DAI)."]
    },
    {
        category: "Cirugía cardíaca pediátrica",
        items: ["Tratamiento de defectos cardíacos congénitos en recién nacidos, niños y adolescentes."]
    }
];

const innovations = [
    "Cirugía mínimamente invasiva: Procedimientos realizados a través de pequeñas incisiones que reducen el tiempo de recuperación.",
    "Cirugía robótica asistida: Ofrece mayor precisión y mejores resultados estéticos.",
    "Cirugía endovascular: Tratamientos menos invasivos para enfermedades de la aorta y arterias principales."
];

const benefits = [
    "Menor tiempo de recuperación gracias a técnicas mínimamente invasivas.",
    "Reducción de complicaciones con uso de tecnología avanzada y procedimientos precisos.",
    "Mejor calidad de vida al restaurar la funcionalidad cardíaca.",
];

export default async function CirugiaCardiovascularPage() {
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
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-18%20at%202.35.13%20PM.jpeg?alt=media&token=6aae6289-d76f-4b36-b1be-59ad722a2551"
                        alt="Cirugía Cardiovascular"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="cardiovascular surgery"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Cirugía Cardiovascular</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Soluciones Avanzadas para la Salud del Corazón</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La cirugía cardiovascular es una especialidad médica dedicada al diagnóstico, tratamiento y corrección de enfermedades del corazón y los grandes vasos. En la Clínica de la Costa SAS, contamos con cirujanos cardiovasculares altamente capacitados y tecnología de última generación para brindar procedimientos efectivos, seguros y personalizados que mejoran la calidad de vida de nuestros pacientes.
                        </p>
                        <p>
                            Nuestro enfoque es proporcionar tratamientos quirúrgicos avanzados que ayuden a restaurar la función cardíaca y a prevenir complicaciones a largo plazo.
                        </p>
                    </CardContent>
                </Card>
            </section>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Procedimientos Especializados</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {specializedProcedures.map((proc) => (
                            <div key={proc.category}>
                                <h3 className="font-semibold text-lg text-foreground">{proc.category}</h3>
                                <ul className="list-disc list-inside space-y-1 mt-2 text-muted-foreground">
                                    {proc.items.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>

            <div className="grid md:grid-cols-2 gap-8 items-start">
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
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Beneficios de Nuestros Procedimientos</CardTitle>
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
                    specialtyName="Cirujanos Cardiovasculares"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo está listo para brindarte el apoyo y la atención que necesitas. Contáctanos para conocer más sobre nuestros procedimientos cardiovasculares.</p>
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

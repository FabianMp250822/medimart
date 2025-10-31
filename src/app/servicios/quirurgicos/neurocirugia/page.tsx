import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle, BrainCircuit } from 'lucide-react';
import type { Metadata } from 'next';
import { safeQuery } from '@/lib/firebase-helpers';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';
import { getServiceMetadata } from '@/lib/services-metadata';
import { generateServiceMetadata } from '@/lib/metadata-helpers';
import { generateMedicalServiceSchema } from '@/lib/structured-data';
import { unstable_cache } from 'next/cache';

const serviceData = getServiceMetadata('neurocirugia')!;

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
    ['specialists-neurocirugia'],
    { revalidate: 3600, tags: ['specialists', 'neurocirugia'] }
);

const services = [
    {
        title: "Manejo de emergencias neuroquirúrgicas",
        items: ["Atención permanente para accidentes cerebrovasculares (ACV) y otros eventos críticos."]
    },
    {
        title: "Cirugía de columna",
        items: ["Procedimientos convencionales, de alta complejidad y mínimamente invasivos."]
    },
    {
        title: "Cirugía funcional",
        items: ["Tratamiento para Parkinson, espasticidad y dolor crónico."]
    },
    {
        title: "Manejo de defectos congénitos",
        items: ["Atención especializada para malformaciones del sistema nervioso central."]
    }
];

const multidisciplinarySupport = [
    "Neuroradiología diagnóstica e intervencionista.",
    "Cuidados intensivos neurológicos.",
    "Neuro-oncología y neuro-anestesia.",
    "Neuropsicología y neurología clínica."
];

export default async function NeurocirugiaPage() {
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
                        alt="Neurocirugía"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="neurosurgery"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Neurocirugía</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Innovación y Excelencia en el Cuidado del Sistema Nervioso</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            En la Clínica de la Costa SAS, ofrecemos un servicio de neurocirugía de vanguardia, diseñado para atender tanto procedimientos diagnósticos como terapéuticos relacionados con el cerebro y el sistema nervioso central. Contamos con un equipo médico altamente especializado y tecnología de última generación, lo que nos permite brindar una atención oportuna, segura y eficaz en cada caso.
                        </p>
                    </CardContent>
                </Card>
            </section>

             <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2FDSC01594.JPG?alt=media&token=d932da45-0f06-4b19-85dc-58b718ff3a30"
                    alt="Atención Hospitalaria Neurocirugía"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    data-ai-hint="neurosurgery hospital care"
                />
            </div>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Servicios que Ofrecemos</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {services.map((service) => (
                            <div key={service.title} className="p-4 rounded-lg bg-primary/5">
                                <h3 className="font-semibold text-lg text-primary mb-2">{service.title}</h3>
                                <ul className="space-y-2 list-disc list-inside text-muted-foreground text-sm">
                                    {service.items.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary flex items-center gap-3"><BrainCircuit /> Enfoque Multidisciplinario</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                           El éxito de nuestro servicio se basa en la colaboración con otras especialidades, garantizando un tratamiento integral.
                        </p>
                        <ul className="space-y-3">
                            {multidisciplinarySupport.map((item, index) => (
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
                        <CardTitle className="text-2xl text-primary">Tecnología de Última Generación</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Utilizamos técnicas avanzadas para mejorar los resultados y la seguridad del paciente:
                        </p>
                         <ul className="space-y-3">
                            <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-accent mt-1" /><span>Cirugías mínimamente invasivas para una recuperación más rápida.</span></li>
                            <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-accent mt-1" /><span>Radiocirugía de alta precisión para tumores y lesiones.</span></li>
                            <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-accent mt-1" /><span>Neurointervencionismo para condiciones vasculares.</span></li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Nuestros Neurocirujanos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo de neurocirugía está preparado para atenderte. Contáctanos para más detalles sobre nuestros procedimientos.</p>
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

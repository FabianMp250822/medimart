import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle } from 'lucide-react';
import { safeQuery } from '@/lib/firebase-helpers';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';
import { getServiceMetadata } from '@/lib/services-metadata';
import { generateServiceMetadata } from '@/lib/metadata-helpers';
import { generateMedicalServiceSchema } from '@/lib/structured-data';
import { unstable_cache } from 'next/cache';

const serviceData = getServiceMetadata('ortopedia-traumatologia')!;
export const metadata = generateServiceMetadata(serviceData);

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
    ['specialists-ortopedia-traumatologia'],
    { revalidate: 3600, tags: ['specialists', 'ortopedia-traumatologia'] }
);

const areas = [
    "Lesiones deportivas.",
    "Fracturas y luxaciones.",
    "Artroscopía y cirugía mínimamente invasiva.",
    "Reemplazos articulares.",
    "Tratamiento de escoliosis y deformidades."
];

const benefits = [
    "Diagnóstico rápido y preciso.",
    "Planes de tratamiento personalizados.",
    "Recuperación óptima con el uso de tecnología avanzada.",
    "Rehabilitación integral postquirúrgica.",
    "Atención multidisciplinaria para resultados efectivos."
];

const specializedServices = [
    { title: "Consulta Especializada", description: "Evaluación de lesiones agudas y crónicas." },
    { title: "Cirugía Ortopédica", description: "Procedimientos avanzados para corrección de lesiones." },
    { title: "Rehabilitación Fisioterapéutica", description: "Programas diseñados para recuperación funcional." },
    { title: "Urgencias Traumáticas", description: "Atención inmediata para fracturas y lesiones graves." }
];

export default async function OrtopediaYTraumatologiaPage() {
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
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fortopedia-traumatologia.jpg?alt=media"
                        alt="Atención en Ortopedia y Traumatología"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="orthopedics traumatology"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Ortopedia y Traumatología</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Cuidado Integral del Sistema Musculoesquelético</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            En la Clínica de la Costa SAS, nuestro servicio de Ortopedia y Traumatología está diseñado para prevenir, diagnosticar y tratar lesiones y enfermedades del sistema musculoesquelético. Combinamos tecnología avanzada con experiencia médica para garantizar una recuperación óptima y mejorar la calidad de vida de nuestros pacientes.
                        </p>
                    </CardContent>
                </Card>
            </section>

             <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Ftratamiento-ortopedia.jpg?alt=media"
                    alt="Tratamiento en Ortopedia y Traumatología"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    data-ai-hint="orthopedic treatment"
                />
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Áreas de Especialidad</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {areas.map((item, index) => (
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
                        <CardTitle className="text-2xl text-primary">Beneficios de Nuestra Atención</CardTitle>
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
            
             <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Servicios Especializados</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {specializedServices.map((service) => (
                            <div key={service.title} className="p-4 rounded-lg bg-primary/5">
                                <h3 className="font-semibold text-lg text-primary mb-2">{service.title}</h3>
                                <p className="text-muted-foreground text-sm">{service.description}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>

            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Nuestros Ortopedistas"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestra misión es devolver la movilidad y calidad de vida a nuestros pacientes. ¡Confía en nuestros especialistas para tu bienestar!</p>
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

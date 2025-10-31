import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, CheckCircle } from 'lucide-react';
import { safeQuery } from '@/lib/firebase-helpers';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';
import { getServiceMetadata } from '@/lib/services-metadata';
import { generateServiceMetadata } from '@/lib/metadata-helpers';
import { generateMedicalServiceSchema } from '@/lib/structured-data';
import { unstable_cache } from 'next/cache';

const serviceData = getServiceMetadata('dermatologia')!;
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
    ['specialists-dermatologia'],
    { revalidate: 3600, tags: ['specialists', 'dermatologia'] }
);

const services = [
    "Diagnóstico y tratamiento de acné y rosácea.",
    "Manejo de enfermedades de la piel (psoriasis, eczema, dermatitis).",
    "Detección y tratamiento de cáncer de piel.",
    "Tratamiento de manchas, cicatrices y melasma.",
    "Procedimientos estéticos con láser y toxina botulínica.",
    "Dermatología pediátrica."
];

const benefits = [
    "Diagnósticos precisos con dermatoscopia digital.",
    "Tratamientos personalizados según tipo de piel.",
    "Tecnología láser de última generación.",
    "Seguimiento continuo y prevención.",
    "Atención para todas las edades."
];

const technologies = [
    { title: "Dermatoscopia Digital", description: "Evaluación detallada de lunares y lesiones de piel." },
    { title: "Láser Terapéutico", description: "Tratamiento de manchas, cicatrices y rejuvenecimiento." },
    { title: "Criocirugía", description: "Eliminación de verrugas y lesiones cutáneas." },
    { title: "Terapia Fotodinámica", description: "Tratamiento avanzado de cáncer de piel no melanoma." }
];

export default async function DermatologiaPage() {
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
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fdermatologia.jpg?alt=media"
                        alt="Servicios de Dermatología"
                        fill
                        className="object-cover z-0"
                        data-ai-hint="dermatology service"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Dermatología</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Cuidado Integral de la Piel</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            En la Clínica de la Costa SAS, ofrecemos servicios especializados en Dermatología para el diagnóstico, tratamiento y prevención de enfermedades de la piel, cabello y uñas. Contamos con dermatólogos certificados y tecnología láser de última generación para garantizar los mejores resultados.
                        </p>
                    </CardContent>
                </Card>
            </section>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Nuestros Servicios</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {services.map((item, index) => (
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
                        <CardTitle className="text-2xl text-primary">Tecnología y Métodos Avanzados</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {technologies.map((tech) => (
                            <div key={tech.title} className="p-4 rounded-lg bg-primary/5">
                                <h3 className="font-semibold text-lg text-primary mb-2">{tech.title}</h3>
                                <p className="text-muted-foreground text-sm">{tech.description}</p>
                            </div>
                        ))}
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
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Confía en nuestro equipo para el cuidado de tu piel. ¡Estamos aquí para ayudarte!</p>
                <div className="mt-6 flex justify-center gap-4">
                    <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                        <Link href="/contacto">
                            <Phone className="mr-2 h-5 w-5" />
                            Contáctanos
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                        <Link href="/especialistas">
                            Ver Especialistas
                        </Link>
                    </Button>
                </div>
            </section>
            </div>
        </>
    );
}

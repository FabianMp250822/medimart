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

const serviceData = getServiceMetadata('cirugia-plastica')!;

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
    ['specialists-cirugia-plastica'],
    { revalidate: 3600, tags: ['specialists', 'cirugia-plastica'] }
);

const services = {
    estetica: [
        "Rinoplastia (cirugía de nariz)",
        "Lifting facial",
        "Abdominoplastia",
        "Aumento, reducción o levantamiento de senos",
        "Liposucción y contorno corporal"
    ],
    reconstructiva: [
        "Reconstrucción mamaria tras mastectomía",
        "Reparación de cicatrices complejas",
        "Corrección de deformidades congénitas",
        "Tratamiento reconstructivo tras traumatismos o quemaduras"
    ],
    complementarios: [
        "Rejuvenecimiento facial con técnicas mínimamente invasivas",
        "Aplicación de toxina botulínica y rellenos dérmicos"
    ]
};

export default async function CirugiaPlasticaYEsteticaPage() {
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
                        alt="Cirugía Plástica y Estética"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="plastic surgery"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Cirugía Plástica y Estética</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Innovación y Excelencia que Transforman Vidas</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            En la Clínica de la Costa SAS, estamos a la vanguardia de la cirugía plástica, estética y reconstructiva, combinando la más avanzada tecnología con la habilidad y precisión de un equipo de cirujanos altamente capacitados. Nuestros especialistas son pioneros en nuevas técnicas, garantizando resultados que reflejan excelencia y profesionalismo.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Servicios Destacados</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="font-semibold text-lg text-primary mb-3">Cirugía Estética</h3>
                            <ul className="space-y-2">
                                {services.estetica.map((item, index) => (
                                     <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         <div>
                            <h3 className="font-semibold text-lg text-primary mb-3">Cirugía Reconstructiva</h3>
                            <ul className="space-y-2">
                                {services.reconstructiva.map((item, index) => (
                                     <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         <div>
                            <h3 className="font-semibold text-lg text-primary mb-3">Tratamientos Complementarios</h3>
                            <ul className="space-y-2">
                                {services.complementarios.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </section>
            
            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Cirujanos Plásticos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo de cirugía plástica está listo para ayudarte a alcanzar tus objetivos. Contáctanos para una consulta.</p>
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

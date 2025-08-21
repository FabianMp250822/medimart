import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle, Bone } from 'lucide-react';
import type { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';

export const metadata: Metadata = {
    title: 'Rayos X Convencional - Clínica de la Costa',
    description: 'Servicio de radiografía convencional (Rayos X) rápido y eficaz para el diagnóstico de fracturas, enfermedades pulmonares y otras condiciones médicas.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', '==', 'Radiología')
            .limit(5)
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Rayos X: ", error);
        return [];
    }
}

const applications = [
    "Diagnóstico de fracturas, luxaciones y otras lesiones óseas.",
    "Detección de neumonía, tuberculosis y otras afecciones pulmonares.",
    "Evaluación de la posición de dispositivos médicos como catéteres o marcapasos.",
    "Estudio de problemas articulares como la artritis.",
    "Detección de obstrucciones intestinales o cuerpos extraños."
];

const benefits = [
    "Procedimiento extremadamente rápido, ideal para emergencias.",
    "Técnica no invasiva y completamente indolora.",
    "Ampliamente disponible y accesible para una gran variedad de diagnósticos.",
    "Dosis de radiación baja y controlada para garantizar la seguridad del paciente."
];

export default async function RayosXPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://placehold.co/1200x400.png"
                        alt="Equipo de Rayos X"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="x-ray machine"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Rayos X Convencional</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Diagnóstico Rápido y Esencial</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La radiografía convencional, comúnmente conocida como Rayos X, es una de las herramientas de diagnóstico por imagen más fundamentales y utilizadas en la medicina. Permite obtener imágenes de las estructuras internas del cuerpo, especialmente de los huesos, de forma rápida y eficaz. En la Clínica de la Costa, nuestro servicio de Rayos X es esencial para el diagnóstico en urgencias, traumatología y muchas otras especialidades.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Aplicaciones Clínicas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {applications.map((item, index) => (
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
                        <CardTitle className="text-2xl text-primary">Beneficios de los Rayos X</CardTitle>
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
                    specialtyName="Nuestros Radiólogos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Consulte por su Examen de Rayos X</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Para diagnósticos rápidos y confiables, nuestro servicio de radiografía está a su disposición. Contáctenos para más información.</p>
                <div className="mt-6 flex justify-center gap-4">
                    <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                        <Link href="/contacto">
                            <Phone className="mr-2 h-5 w-5" />
                            Contáctanos
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                         <Link href="/pacientes/preparacion-examenes">
                            <Bone className="mr-2 h-5 w-5" />
                            Preparación para el examen
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}

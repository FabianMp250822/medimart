import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle, Leaf } from 'lucide-react';
import type { Metadata } from 'next';
import { safeQuery } from '@/lib/firebase-helpers';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';
import { generateMedicalServiceSchema } from '@/lib/structured-data';
import { getServiceMetadata } from '@/lib/services-metadata';
import { generateServiceMetadata } from '@/lib/metadata-helpers';

const serviceData = getServiceMetadata('nutricion-dietetica')!;

export const metadata: Metadata = generateServiceMetadata(serviceData);

async function getSpecialists(): Promise<Medico[]> {
    return safeQuery(async (db) => {
        const snapshot = await db.collection('medicos')
            .where('especialidad', '==', 'Nutrición y Dietética')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    }, []);
}

const services = [
    { 
        title: "Evaluación y Planificación Nutricional", 
        items: [
            "Análisis del estado nutricional de los pacientes.",
            "Diseño de planes alimenticios personalizados.",
            "Atención especializada para condiciones médicas específicas."
        ]
    },
    { 
        title: "Servicios Hospitalarios", 
        items: [
            "Soporte nutricional para pacientes críticos.",
            "Alimentación enteral y parenteral.",
            "Evaluación y seguimiento en casos de desnutrición y obesidad."
        ]
    },
];

export default async function NutricionYDieteticaPage() {
    const specialists = await getSpecialists();

    // Generar datos estructurados para este servicio
    const serviceSchema = generateMedicalServiceSchema({
        name: 'Nutrición y Dietética',
        description: 'Servicio especializado de nutrición y dietética con planes alimenticios personalizados para mejorar la calidad de vida de nuestros pacientes.',
        url: 'https://clinica-de-la-costa.app/servicios/consulta-externa/nutricion-y-dietetica'
    });

    return (
        <>
            {/* Datos estructurados JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://placehold.co/1200x400.png"
                        alt="Unidad de Nutrición y Dietética"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="nutrition healthy food"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Unidad de Nutrición y Dietética</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Promoviendo la Salud Integral</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La Unidad de Nutrición y Dietética de la Clínica de la Costa SAS es un servicio especializado que combina ciencia, tecnología y un enfoque humano para ofrecer orientación y tratamientos dietéticos personalizados, diseñados para mejorar la calidad de vida de nuestros pacientes.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Nuestros Servicios Nutricionales</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((service) => (
                            <div key={service.title}>
                                <h3 className="font-semibold text-lg text-primary mb-3">{service.title}</h3>
                                <ul className="space-y-2">
                                    {service.items.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>

             <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary flex items-center gap-3"><Leaf /> Promoción de Hábitos Saludables</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                           Ofrecemos talleres y programas educativos dirigidos a pacientes y sus familias para fomentar hábitos alimenticios saludables, empoderándolos para tomar decisiones informadas sobre su alimentación.
                        </p>
                    </CardContent>
                </Card>
            </section>

            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Nuestros Nutricionistas"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">La Unidad de Nutrición y Dietética combina tecnología de punta y un enfoque humano para garantizar una atención nutricional integral que promueve la salud y el bienestar de cada paciente.</p>
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

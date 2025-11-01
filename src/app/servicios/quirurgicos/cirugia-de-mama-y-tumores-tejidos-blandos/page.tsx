import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';
import { safeQuery } from '@/lib/firebase-helpers';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';

export const metadata: Metadata = {
    title: 'Cirugía de Mama y Tumores de Tejidos Blandos - Clínica de la Costa',
    description: 'Tratamiento quirúrgico especializado para tumores y enfermedades de la mama y tejidos blandos, con técnicas avanzadas y un enfoque integral y personalizado.',
};

async function getSpecialists(): Promise<Medico[]> { return safeQuery(async (db) => { const snapshot = await db.collection('medicos')
            .where('especialidad', 'in', ['Cirugía Oncológica', 'Cirugía Plástica Oncológica'])
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    }, []); }

const ourApproach = [
    "Equipo de especialistas dedicados que te guiarán en cada etapa del tratamiento.",
    "Tecnología avanzada que garantiza procedimientos precisos y seguros.",
    "Planes quirúrgicos personalizados y adaptados a las necesidades de cada paciente."
];

const whyChooseUs = [
    "Resultados efectivos, enfocados en eliminar la enfermedad y cuidar tu salud general.",
    "Cuidado integral en colaboración con oncólogos, psicólogos y otros especialistas.",
    "Acompañamiento cercano y apoyo durante todo el proceso."
];

export default async function CirugiaDeMamaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2FDSC01594.JPG?alt=media&token=d932da45-0f06-4b19-85dc-58b718ff3a30"
                        alt="Cirugía de Mama y Tumores de Tejidos Blandos"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="breast surgery"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Cirugía de Mama y Tumores de Tejidos Blandos</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Tratamiento Especializado para tu Salud</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La Cirugía de Mama y Tumores de Tejidos Blandos es una especialidad que se enfoca en el tratamiento de tumores y enfermedades en las mamas, proporcionando soluciones médicas precisas y personalizadas. En la Clínica de la Costa SAS, nuestro equipo altamente capacitado garantiza resultados efectivos y seguros, apoyados en las técnicas más avanzadas.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Tipos de Cirugía Disponibles</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-xl text-foreground">Cuadrantectomía o Mastectomía Parcial</h3>
                            <p className="text-muted-foreground mt-2">
                                Este procedimiento consiste en extirpar únicamente la parte del seno afectada por el cáncer, junto con una pequeña porción de tejido normal circundante. Su objetivo principal es eliminar la enfermedad mientras se conserva la mayor cantidad posible de tejido mamario sano.
                            </p>
                        </div>
                         <div>
                            <h3 className="font-semibold text-xl text-foreground">Mastectomía</h3>
                            <p className="text-muted-foreground mt-2">
                                La mastectomía es una cirugía más extensa en la que se extirpa todo el seno, incluyendo el tejido mamario y, en ocasiones, tejidos cercanos afectados. Esta técnica se utiliza cuando la enfermedad afecta una mayor parte del seno o cuando es esencial para el tratamiento integral del paciente.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </section>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Nuestro Enfoque</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {ourApproach.map((item, index) => (
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
            </div>
            
            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Nuestros Especialistas"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo de cirugía de mama está aquí para brindarte el apoyo y la atención que mereces. Contáctanos para resolver tus dudas.</p>
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
    );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';

export const metadata: Metadata = {
    title: 'Psiquiatría - Clínica de la Costa',
    description: 'Atención integral de la salud mental. Ofrecemos diagnóstico, tratamiento y prevención de trastornos mentales y emocionales para mejorar tu calidad de vida.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', '==', 'Psiquiatría')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Psiquiatría: ", error);
        return [];
    }
}

const services = [
    "Evaluación y diagnóstico de trastornos mentales.",
    "Psicoterapia individual y grupal.",
    "Tratamiento farmacológico personalizado.",
    "Programas de intervención en crisis.",
    "Seguimiento para trastornos crónicos como depresión, ansiedad y esquizofrenia."
];

const benefits = [
    "Atención integral y personalizada para cada paciente.",
    "Diagnósticos precisos con enfoque multidisciplinario.",
    "Reducción del estigma asociado a la salud mental.",
    "Promoción de la estabilidad emocional y funcionalidad diaria.",
    "Soporte continuo para pacientes y familiares."
];

const technologies = [
    { title: "Terapias Digitales", description: "Uso de aplicaciones para seguimiento y control." },
    { title: "Diagnóstico por Imágenes", description: "Técnicas avanzadas para estudiar el cerebro y su funcionamiento." },
    { title: "Neuroestimulación", description: "Métodos innovadores para tratar trastornos complejos." },
    { title: "Atención Telepsiquiátrica", description: "Consultas a distancia para mayor accesibilidad." }
];

export default async function PsiquiatriaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fpsiquiatria.jpg?alt=media&token=12345678-abcd-efgh-ijkl-mnopqrstuvwxyz"
                        alt="Servicios de Psiquiatría"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="psychiatry session"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Psiquiatría</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Atención Integral de la Salud Mental</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            En la Clínica de la Costa SAS, ofrecemos servicios especializados en psiquiatría para el diagnóstico, tratamiento y prevención de trastornos mentales y emocionales. Nuestro equipo está comprometido con brindar atención personalizada y humanizada para mejorar la calidad de vida de nuestros pacientes y sus familias.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Ftratamiento-psiquiatria.jpg?alt=media&token=12345678-abcd-efgh-ijkl-mnopqrstuvwxyz"
                    alt="Tratamiento de Psiquiatría"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    data-ai-hint="psychiatry treatment"
                />
            </div>

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
                    specialtyName="Nuestros Psiquiatras"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Ofrecemos un entorno seguro y profesional para atender tus necesidades de salud mental. ¡Confía en nosotros para ayudarte a recuperar el equilibrio!</p>
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

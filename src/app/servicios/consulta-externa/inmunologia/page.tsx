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
    title: 'Inmunología - Clínica de la Costa',
    description: 'Servicio especializado en el diagnóstico y manejo de enfermedades del sistema inmune, como lupus, artritis y alergias graves, con tecnología avanzada y tratamientos personalizados.',
};

async function getSpecialists(): Promise<Medico[]> {
    return safeQuery(async (db) => {
        const snapshot = await db.collection('medicos')
            .where('especialidad', '==', 'Inmunología')
            .get();
        if (snapshot.empty) return [];
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    }, []);
}

const services = [
    "Diagnóstico de enfermedades autoinmunes como lupus y artritis reumatoide.",
    "Manejo de inmunodeficiencias primarias y secundarias.",
    "Tratamiento de alergias graves e hipersensibilidades.",
    "Inmunoterapia para pacientes con enfermedades inmunológicas crónicas.",
    "Asesoramiento genético y pruebas inmunológicas avanzadas."
];

const benefits = [
    "Diagnósticos precisos y tratamientos personalizados.",
    "Prevención de complicaciones relacionadas con enfermedades inmunológicas.",
    "Acceso a terapias avanzadas y tecnología de vanguardia.",
    "Educación para el manejo efectivo de condiciones inmunológicas.",
    "Mejora de la calidad de vida para pacientes y sus familias."
];

const technologies = [
    { title: "Pruebas de Laboratorio Especializadas", description: "Inmunofenotipado y estudios serológicos avanzados." },
    { title: "Inmunoterapia Personalizada", description: "Tratamientos dirigidos para enfermedades específicas." },
    { title: "Diagnóstico Molecular", description: "Evaluación genética para condiciones autoinmunes." },
    { title: "Monitoreo Digital", description: "Seguimiento remoto para enfermedades inmunológicas crónicas." }
];

export default async function InmunologiaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Finmunologia.jpg?alt=media"
                        alt="Servicios de Inmunología"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="immunology lab"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Inmunología</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Diagnóstico y Manejo de Enfermedades del Sistema Inmune</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            En la Clínica de la Costa SAS, el servicio de Inmunología está enfocado en la evaluación, diagnóstico y tratamiento de enfermedades relacionadas con el sistema inmunológico. Nuestro equipo de especialistas utiliza tecnología avanzada para ofrecer atención integral y personalizada a nuestros pacientes.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Servicios de Inmunología</CardTitle>
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
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    specialtyName="Nuestros Inmunólogos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo de expertos está aquí para apoyarte en cada etapa del proceso. ¡Confía en nosotros para cuidar de tu salud inmunológica!</p>
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

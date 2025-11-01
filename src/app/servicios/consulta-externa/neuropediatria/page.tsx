import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle, Baby } from 'lucide-react';
import type { Metadata } from 'next';
import { safeQuery } from '@/lib/firebase-helpers';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';

export const metadata: Metadata = {
    title: 'Neuropediatría - Clínica de la Costa',
    description: 'Cuidado especializado para la salud neurológica de los niños, desde el diagnóstico hasta el tratamiento de trastornos del neurodesarrollo y epilepsias.',
};

async function getSpecialists(): Promise<Medico[]> { return safeQuery(async (db) => { const snapshot = await db.collection('medicos')
            .where('especialidad', '==', 'Neuropediatría')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    }, []); }

const conditionsTreated = [
    { title: "Trastornos del neurodesarrollo", description: "TDAH, TEA, retraso global del desarrollo." },
    { title: "Epilepsias", description: "Diagnóstico y manejo de crisis epilépticas con EEG y video EEG." },
    { title: "Enfermedades neuromusculares", description: "Distrofias musculares, miopatías congénitas, atrofia muscular espinal." },
    { title: "Trastornos del movimiento", description: "Parálisis cerebral infantil, distonías y coreas." },
    { title: "Trastornos del sueño", description: "Apnea del sueño, insomnio infantil, sonambulismo." },
    { title: "Infecciones y enfermedades metabólicas", description: "Meningitis, enfermedades metabólicas con manifestaciones neurológicas." },
];

const specializedServices = [
    "Diagnóstico integral: Evaluaciones neurológicas completas, estudios de imagen y pruebas neurofisiológicas.",
    "Tratamientos personalizados: Terapias farmacológicas y planes multidisciplinarios con fisioterapia y terapia ocupacional.",
    "Rehabilitación neurológica: Programas diseñados para mejorar habilidades motoras, cognitivas y sociales.",
    "Apoyo emocional y educativo: Orientación a familias y coordinación con instituciones educativas."
];

export default async function NeuropediatriaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2Fneuropediatria.jpg?alt=media"
                        alt="Neuropediatría"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="pediatric neurology"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Neuropediatría</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Cuidado Especializado para la Salud Neurológica de los Niños</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La neuropediatría es una subespecialidad de la pediatría que se enfoca en el diagnóstico, tratamiento y manejo de trastornos neurológicos en recién nacidos, niños y adolescentes. Estos trastornos pueden afectar el desarrollo motor, cognitivo y conductual, así como las funciones del sistema nervioso central y periférico. En la Clínica de la Costa SAS, ofrecemos un servicio integral y especializado en neuropediatría, diseñado para atender las necesidades únicas de nuestros pacientes más jóvenes.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="relative h-96 w-full rounded-lg overflow-hidden">
                 <Image
                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-18%20at%202.35.13%20PM.jpeg?alt=media&token=6aae6289-d76f-4b36-b1be-59ad722a2551"
                    alt="Atención Hospitalaria Pediátrica"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    data-ai-hint="pediatric hospital care"
                />
            </div>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Condiciones Tratadas</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {conditionsTreated.map((condition) => (
                            <div key={condition.title} className="p-4 rounded-lg bg-primary/5">
                                <h3 className="font-semibold text-lg text-primary mb-2">{condition.title}</h3>
                                <p className="text-muted-foreground text-sm">{condition.description}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary flex items-center gap-3"><Baby /> Servicios y Enfoque Multidisciplinario</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                           Nuestro equipo está compuesto por neuropediatras, fisioterapeutas, psicólogos, terapeutas ocupacionales y nutricionistas pediátricos para garantizar un cuidado de calidad.
                        </p>
                         <ul className="space-y-3">
                            {specializedServices.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </section>

            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Nuestros Neuropediatras"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Estamos comprometidos con la salud neurológica de los niños, ofreciendo un servicio especializado y humanizado que busca mejorar su calidad de vida y desarrollo integral.</p>
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

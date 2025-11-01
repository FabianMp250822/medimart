import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { safeQuery } from '@/lib/firebase-helpers';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';

export const metadata: Metadata = {
    title: 'Periodoncia - Clínica de la Costa',
    description: 'Salud de las encías y el soporte dental. Tratamos gingivitis, periodontitis y realizamos injertos de encía para una sonrisa saludable.',
};

async function getSpecialists(): Promise<Medico[]> { return safeQuery(async (db) => { const snapshot = await db.collection('medicos')
            .where('especialidad', '==', 'Periodoncia')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    }, []); }

const services = [
    "Tratamiento de gingivitis y periodontitis.",
    "Cirugía periodontal para regeneración ósea.",
    "Injertos de encía para corregir la recesión gingival.",
    "Limpiezas profundas (raspado y alisado radicular).",
    "Mantenimiento periodontal para prevenir recaídas."
];

const benefits = [
    "Prevención de la pérdida dental.",
    "Mejora de la salud general al reducir la inflamación crónica.",
    "Eliminación de infecciones en encías y huesos.",
    "Restauración estética de las encías.",
    "Mejora de la función masticatoria y estabilidad dental."
];

const technologies = [
    { title: "Láser Dental", description: "Tratamientos mínimamente invasivos para encías." },
    { title: "Regeneración Ósea Guiada", description: "Técnicas avanzadas para preservar el soporte dental." },
    { title: "Diagnóstico 3D", description: "Imágenes digitales para planificación precisa." }
];

export default async function PeriodonciaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fperiodoncia.jpg?alt=media"
                        alt="Tratamiento de Periodoncia"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="periodontics treatment"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Periodoncia</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Salud de las Encías y el Soporte Dental</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            En la Clínica de la Costa SAS, nuestro servicio de Periodoncia está enfocado en la prevención, diagnóstico y tratamiento de enfermedades de las encías y del hueso que soporta los dientes. Con el uso de tecnología avanzada y un enfoque personalizado, ayudamos a nuestros pacientes a mantener una sonrisa saludable y funcional.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
             <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Ftratamiento-periodoncia.jpg?alt=media"
                    alt="Tratamiento de Periodoncia"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    data-ai-hint="periodontics procedure"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Servicios de Periodoncia</CardTitle>
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
                        <CardTitle className="text-2xl text-primary">Beneficios del Tratamiento Periodontal</CardTitle>
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
                        <CardTitle className="text-2xl text-primary">Tecnología Avanzada en Periodoncia</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    specialtyName="Nuestros Periodoncistas"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Estamos comprometidos con preservar la salud de tus encías y el soporte de tus dientes. ¡Confía en nuestros especialistas para cuidar tu sonrisa!</p>
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

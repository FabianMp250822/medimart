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
    title: 'Medicina Física y Rehabilitación - Clínica de la Costa',
    description: 'Recupera tu funcionalidad y calidad de vida con programas personalizados de rehabilitación. Fisioterapia, terapias neurológicas y manejo del dolor crónico.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', '==', 'Medicina Física y Rehabilitación')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Medicina Física y Rehabilitación: ", error);
        return [];
    }
}

const services = [
    "Fisioterapia para recuperación de lesiones musculoesqueléticas.",
    "Terapias de rehabilitación neurológica (post-ictus, lesiones medulares).",
    "Programas de manejo del dolor crónico.",
    "Rehabilitación cardiovascular para pacientes con enfermedades cardíacas.",
    "Adaptación funcional para personas con prótesis y órtesis."
];

const benefits = [
    "Mejora de la movilidad y la fuerza muscular.",
    "Reducción del dolor y recuperación funcional.",
    "Prevención de complicaciones relacionadas con inmovilidad.",
    "Reintegración activa a la vida cotidiana y laboral.",
    "Incremento de la independencia y la calidad de vida."
];

const technologies = [
    { title: "Electroterapia y Ultrasonido", description: "Herramientas avanzadas para tratamiento del dolor y la inflamación." },
    { title: "Entrenamiento Virtual", description: "Rehabilitación asistida por realidad aumentada." },
    { title: "Robótica en Rehabilitación", description: "Exoesqueletos y dispositivos para movilidad avanzada." },
    { title: "Terapias Acuáticas", description: "Recuperación funcional en piscinas adaptadas." }
];

export default async function MedicinaFisicaYRehabilitacionPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fmedicina-fisica-rehabilitacion.jpg?alt=media"
                        alt="Medicina Física y Rehabilitación"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="physical therapy rehabilitation"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Medicina Física y Rehabilitación</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Recupera tu Funcionalidad y Calidad de Vida</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            En la Clínica de la Costa SAS, nuestra especialidad en Medicina Física y Rehabilitación está enfocada en maximizar la funcionalidad y mejorar la calidad de vida de personas con discapacidades temporales o permanentes. Contamos con programas personalizados para cada paciente, adaptados a sus necesidades específicas.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Nuestros Servicios de Rehabilitación</CardTitle>
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
                        <CardTitle className="text-2xl text-primary">Beneficios de la Rehabilitación Física</CardTitle>
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
                    specialtyName="Especialistas en Fisiatría"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro compromiso es ayudarte a recuperar tu funcionalidad, independencia y bienestar. ¡Confía en nosotros para tu rehabilitación!</p>
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

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
    title: 'Medicina Familiar - Clínica de la Costa',
    description: 'Cuidado integral para toda la familia. Promovemos la prevención y la detección temprana de enfermedades en un entorno de confianza y cercanía.',
};

async function getSpecialists(): Promise<Medico[]> { return safeQuery(async (db) => { const snapshot = await db.collection('medicos')
            .where('especialidad', '==', 'Medicina Familiar')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    }, []); }

const services = [
    "Atención médica para pacientes de todas las edades.",
    "Detección temprana de enfermedades crónicas.",
    "Asesoramiento en hábitos de vida saludables.",
    "Manejo de enfermedades comunes y complejas.",
    "Coordinación con otras especialidades médicas."
];

const benefits = [
    "Atención integral y centrada en el paciente y su entorno.",
    "Prevención activa de enfermedades en todos los grupos etarios.",
    "Mejora de la comunicación y confianza médico-paciente.",
    "Seguimiento continuo y personalizado.",
    "Foco en la promoción de la salud y el bienestar familiar."
];

const technologies = [
    { title: "Historial Clínico Electrónico", description: "Seguimiento eficiente del estado de salud de cada miembro de la familia." },
    { title: "Protocolos de Prevención", description: "Vacunación y controles periódicos actualizados." },
    { title: "Monitoreo Continuo", description: "Evaluación remota para pacientes con condiciones crónicas." },
    { title: "Educación Familiar", description: "Talleres y programas para el manejo de la salud en casa." }
];

export default async function MedicinaFamiliarPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fmedicina-familiar.jpg?alt=media"
                        alt="Servicios de Medicina Familiar"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="family medicine doctor"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Medicina Familiar</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Cuidado Integral para Toda la Familia</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            En la Clínica de la Costa SAS, la Medicina Familiar se centra en el cuidado integral y continuo de cada miembro de la familia. Nuestros especialistas están capacitados para abordar problemas de salud física, mental y emocional, promoviendo la prevención y la detección temprana de enfermedades.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Ftratamiento-familiar.jpg?alt=media"
                    alt="Consulta de Medicina Familiar"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    data-ai-hint="family consultation"
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
                        <CardTitle className="text-2xl text-primary">Beneficios de la Atención Familiar</CardTitle>
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
                    specialtyName="Médicos Familiares"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">¡Confía en nosotros para cuidar de ti y de los tuyos!</p>
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

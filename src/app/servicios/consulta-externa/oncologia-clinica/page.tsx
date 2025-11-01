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
    title: 'Oncología Clínica - Clínica de la Costa',
    description: 'Cuidado integral para pacientes con cáncer, combinando tecnología avanzada, un equipo multidisciplinario y una atención humanizada para la mejor calidad de vida.',
};

async function getSpecialists(): Promise<Medico[]> { return safeQuery(async (db) => { const snapshot = await db.collection('medicos')
            .where('especialidad', '==', 'Oncología Clínica')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    }, []); }

const services = [
    "Quimioterapia personalizada.",
    "Evaluación oncológica integral.",
    "Seguimiento y control de recaídas.",
    "Apoyo en cuidados paliativos.",
    "Terapias complementarias para manejo de síntomas."
];

const benefits = [
    "Enfoque integral que combina lo médico, emocional y social.",
    "Equipos multidisciplinarios especializados.",
    "Planes de tratamiento individualizados.",
    "Atención en todas las etapas de la enfermedad.",
    "Apoyo continuo a las familias."
];

const multidisciplinaryFocus = [
    { title: "Hematología y Oncología Clínica", description: "Tratamientos avanzados y personalizados." },
    { title: "Psicooncología", description: "Apoyo emocional durante todo el proceso." },
    { title: "Nutrición Oncológica", description: "Planes nutricionales adaptados a cada paciente." },
    { title: "Cuidados Paliativos", description: "Manejo del dolor y mejora de calidad de vida." }
];

export default async function OncologiaClinicaPage() {
    const specialists = await getSpecialists();

    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Foncologia-clinica.jpg?alt=media"
                        alt="Atención en Oncología Clínica"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="oncology clinic care"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Oncología Clínica</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Cuidado Integral para Pacientes con Cáncer</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La Clínica de la Costa SAS ofrece un programa especializado en Oncología Clínica, centrado en el diagnóstico, tratamiento y seguimiento de pacientes con cáncer. Nuestro enfoque integral combina tecnología avanzada, un equipo multidisciplinario altamente capacitado y una atención humanizada para garantizar la mejor calidad de vida posible para nuestros pacientes y sus familias.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Servicios Principales</CardTitle>
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
                        <CardTitle className="text-2xl text-primary">Beneficios del Programa</CardTitle>
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
                        <CardTitle className="text-2xl text-primary">Enfoque Multidisciplinario</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {multidisciplinaryFocus.map((focus) => (
                            <div key={focus.title} className="p-4 rounded-lg bg-primary/5">
                                <h3 className="font-semibold text-lg text-primary mb-2">{focus.title}</h3>
                                <p className="text-muted-foreground text-sm">{focus.description}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>

            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Nuestros Oncólogos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Estamos comprometidos con acompañarte en cada etapa del tratamiento, brindándote la mejor calidad de atención en Oncología Clínica.</p>
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

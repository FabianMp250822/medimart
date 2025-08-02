import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';

export const metadata: Metadata = {
    title: 'Servicio Integral de Vacunación - Clínica de la Costa',
    description: 'Protección completa para tu salud y la de tu familia con nuestro programa de vacunación integral, incluyendo vacunas para todas las edades y COVID-19.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', '==', 'Medicina General')
            .limit(5)
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Vacunación: ", error);
        return [];
    }
}

const covidVaccinationFeatures = [
    "Vacunas de última generación aprobadas por organismos de salud.",
    "Personal capacitado para el manejo seguro y atención a posibles efectos secundarios.",
    "Sistema de agendamiento eficiente que minimiza tiempos de espera.",
    "Campañas educativas para informar sobre la importancia de la inmunización."
];

const comprehensiveProgram = [
    { title: "Niños y adolescentes", description: "Esquema completo incluyendo DPT, Polio, Hepatitis A y B, SRP, Rotavirus y más." },
    { title: "Adultos", description: "Vacunas para influenza estacional, Tétanos, Herpes Zóster y Neumococo." },
    { title: "Grupos de riesgo", description: "Mujeres embarazadas, pacientes inmunosuprimidos y trabajadores de la salud." }
];

const serviceBenefits = [
    "Cadena de frío garantizada para mantener la efectividad de las vacunas.",
    "Historial de vacunación digital para un seguimiento seguro y accesible.",
    "Campañas educativas y jornadas masivas de vacunación.",
    "Vacunación domiciliaria para quienes no pueden trasladarse."
];

export default async function VacunacionPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%2010.21.42%20PM.jpeg?alt=media&token=d3d6929d-318f-46d0-aa74-289d073beda8"
                        alt="Servicio de Vacunación"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="vaccination service"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Servicio Integral de Vacunación</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Protección Completa para tu Salud y la de tu Familia</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            En la Clínica de la Costa SAS, ofrecemos el servicio de vacunación más completo y confiable de la región. Nuestro objetivo es garantizar la prevención de enfermedades a través de un programa de vacunación integral que incluye vacunas para todas las edades y atención especializada para grupos con necesidades específicas.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FIMG_20241114_145357863_HDR.jpg?alt=media&token=5f196456-6569-4bff-b4d4-80355565138c"
                    alt="Campaña de vacunación"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    data-ai-hint="vaccination campaign"
                />
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Vacunación contra el COVID-19</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {covidVaccinationFeatures.map((item, index) => (
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
                        <CardTitle className="text-2xl text-primary">Beneficios de Nuestro Servicio</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-3">
                            {serviceBenefits.map((item, index) => (
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
                        <CardTitle className="text-2xl text-primary">Programa de Vacunación Integral</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {comprehensiveProgram.map((program) => (
                            <div key={program.title} className="p-4 rounded-lg bg-primary/5">
                                <h3 className="font-semibold text-lg text-primary mb-2">{program.title}</h3>
                                <p className="text-muted-foreground text-sm">{program.description}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>

            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Médicos Generales"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Contáctanos para agendar tu cita o participar en nuestras jornadas de vacunación. Estamos comprometidos con la prevención y el cuidado de tu bienestar.</p>
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

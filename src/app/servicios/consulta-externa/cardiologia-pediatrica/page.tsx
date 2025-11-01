import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle, Heart, Baby } from 'lucide-react';
import type { Metadata } from 'next';
import { safeQuery } from '@/lib/firebase-helpers';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';

export const metadata: Metadata = {
    title: 'Cardiología Pediátrica - Clínica de la Costa',
    description: 'Cuidado especializado para el corazón de los más pequeños. Detección temprana, tratamiento y manejo integral de cardiopatías congénitas y enfermedades cardíacas en niños.',
};

async function getSpecialists(): Promise<Medico[]> { return safeQuery(async (db) => { const snapshot = await db.collection('medicos')
            .where('especialidad', '==', 'Cardiología Pediátrica')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    }, []); }

const attentionAreas = [
    "Ecocardiografía Doppler Color: Diagnóstico y evaluación del flujo sanguíneo del corazón.",
    "Ecocardiografía Fetal: Detección de cardiopatías congénitas durante el embarazo.",
    "Hemodinamia Pediátrica: Procedimientos para corregir defectos estructurales.",
    "Cirugía Cardiovascular Pediátrica: Tratamiento quirúrgico para malformaciones complejas.",
    "Monitoreo y rehabilitación cardíaca: Holter EKG, pruebas de esfuerzo y programas personalizados.",
    "Consulta externa: Seguimiento periódico y educación para padres.",
    "Unidad de Cuidados Intensivos Pediátrica: Monitoreo avanzado para pacientes críticos."
];

const programBenefits = [
    "Detección temprana de cardiopatías para tratamientos efectivos.",
    "Atención integral desde el diagnóstico prenatal hasta la rehabilitación.",
    "Tecnología avanzada para estudios y procedimientos precisos.",
    "Equipo multidisciplinario con un enfoque personalizado y humano.",
    "Soporte continuo a las familias durante todo el proceso."
];

export default async function CardiologiaPediatricaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2Fcardiologia-pediatrica.jpg?alt=media"
                        alt="Cardiología Pediátrica"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="pediatric cardiology"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Cardiología Pediátrica</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Cuidado Especializado para el Corazón de los Más Pequeños</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            El programa de Cardiología Pediátrica de la Clínica de la Costa SAS está diseñado para la detección temprana, tratamiento y manejo integral de cardiopatías congénitas, enfermedades del corazón presentes desde el nacimiento. Nuestro objetivo es garantizar una atención oportuna y efectiva para mejorar la calidad de vida de los niños y sus familias.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary flex items-center gap-3"><Heart /> Áreas de Atención</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            {attentionAreas.map((area, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                    <span>{area}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </section>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card className="h-full">
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary flex items-center gap-3"><Baby /> Beneficios de Nuestro Programa</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-3">
                            {programBenefits.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                 <div className="relative h-80 w-full rounded-lg overflow-hidden">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-18%20at%202.35.13%20PM.jpeg?alt=media&token=6aae6289-d76f-4b36-b1be-59ad722a2551"
                        alt="Atención Hospitalaria Pediátrica"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                        data-ai-hint="pediatric hospital care"
                    />
                </div>
            </div>
            
            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Cardiólogos Pediátricos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo de cardiología pediátrica está comprometido con la salud del corazón de su hijo. Contáctenos para agendar una consulta.</p>
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

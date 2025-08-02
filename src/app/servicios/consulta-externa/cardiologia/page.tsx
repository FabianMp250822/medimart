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
    title: 'Programa de Cardiología - Clínica de la Costa',
    description: 'Cuidado integral para la salud cardiovascular. Desde la prevención hasta la cirugía avanzada, garantizamos que disfrutes de una vida sana y activa.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', '==', 'Cardiología')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Cardiología: ", error);
        return [];
    }
}

const diseasesTreated = [
    "Aneurisma aórtico", "Estenosis aórtica", "Fibrilación auricular",
    "Arritmias", "Cardiomiopatía", "Enfermedad de arterias coronarias",
    "Trombosis venosa profunda", "Insuficiencia cardíaca", "Enfermedades valvulares",
    "Ataque cardíaco", "Venas varicosas", "Enfermedad vascular periférica"
];

const specializedServices = [
    { 
        title: "Diagnóstico avanzado", 
        items: ["Resonancia magnética cardíaca", "Angio TC Coronario", "Calcium Score", "Ecocardiografía", "Pruebas de esfuerzo y Holter."]
    },
    { 
        title: "Electrofisiología", 
        items: ["Mapeo tridimensional de arritmias", "Implantación de marcapasos y desfibriladores."]
    },
    { 
        title: "Hemodinamia", 
        items: ["Angioplastias y cierre de defectos cardíacos."]
    },
    { 
        title: "Cirugía Cardiovascular", 
        items: ["Revascularización coronaria", "Cirugía de válvulas cardíacas y aorta."]
    },
     { 
        title: "Rehabilitación Cardíaca", 
        items: ["Programas personalizados para recuperación postquirúrgica y manejo de cardiopatías crónicas."]
    }
];

const programBenefits = [
    "Descubrir riesgos de salud de forma temprana.",
    "Reducir factores de riesgo mediante educación y cambios en el estilo de vida.",
    "Atención oportuna frente a síntomas cardíacos.",
    "Adopción de hábitos saludables con apoyo especializado."
];


export default async function CardiologiaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2Fprograma-cardiologia.jpg?alt=media"
                        alt="Programa de Cardiología"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="cardiology program"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Programa de Cardiología</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Cuidado Integral para la Salud Cardiovascular</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            En la Clínica de la Costa SAS, nuestro Programa de Cardiología está diseñado para ofrecer atención especializada y de calidad a pacientes con enfermedades cardiovasculares. Desde la prevención hasta la cirugía avanzada, nuestra misión es garantizar que usted y sus seres queridos puedan disfrutar de una vida sana y activa.
                        </p>
                         <p>
                            Nuestros especialistas están capacitados para tratar todo tipo de enfermedades cardíacas y vasculares, incluidas las más complejas, brindando un enfoque integral y personalizado que cubre diagnóstico, tratamiento y rehabilitación.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Enfermedades Tratadas</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {diseasesTreated.map((disease, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                    <span>{disease}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </section>

             <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-18%20at%202.35.13%20PM.jpeg?alt=media&token=6aae6289-d76f-4b36-b1be-59ad722a2551"
                    alt="Atención Hospitalaria Cardiovascular"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    data-ai-hint="cardiovascular hospital care"
                />
            </div>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Servicios Especializados</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {specializedServices.map((service) => (
                            <div key={service.title} className="p-4 rounded-lg bg-primary/5">
                                <h3 className="font-semibold text-lg text-primary mb-2">{service.title}</h3>
                                <ul className="space-y-2 list-disc list-inside text-muted-foreground text-sm">
                                    {service.items.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>
            
            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Nuestros Cardiólogos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Estamos comprometidos con la salud cardiovascular de nuestros pacientes, garantizando un cuidado integral y de excelencia en cada etapa de su tratamiento.</p>
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

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
    title: 'Unidad de Quimioterapia - Clínica de la Costa',
    description: 'Atención integral para pacientes oncológicos y hematológicos, con un equipo multidisciplinario y una infraestructura moderna y cómoda para tratamientos ambulatorios y hospitalarios.',
};

async function getSpecialists(): Promise<Medico[]> { return safeQuery(async (db) => { const snapshot = await db.collection('medicos')
            .where('especialidad', '==', 'Oncología Clínica')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    }, []); }

const infrastructureFeatures = [
    "Espacios amplios y ventilados que garantizan el bienestar.",
    "Iluminación adecuada y condiciones higiénicas óptimas.",
    "Privacidad y accesibilidad diseñadas para necesidades individuales.",
    "Tecnología de última generación para tratamientos de alta calidad."
];

const offeredServices = [
    "Instalaciones cómodas con sala de espera amplia y estaciones individuales.",
    "Atención especializada para administración y monitoreo de quimioterapia.",
    "Hospitalización oncológica para supervisión y tratamiento continuo."
];

const serviceBenefits = [
    "Atención multidisciplinaria con oncólogos, hematólogos y enfermeros.",
    "Ambiente seguro y confortable para la tranquilidad de los pacientes.",
    "Equipos de última tecnología que aseguran precisión y seguridad.",
    "Cuidado personalizado adaptado a las necesidades de cada paciente."
];

export default async function QuimioterapiaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-20%20at%209.05.39%20AM.jpeg?alt=media&token=a5096045-8ae8-438c-ac4c-45877a0e8d84"
                        alt="Unidad de Quimioterapia"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="chemotherapy unit"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Unidad de Quimioterapia</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Atención Integral para Pacientes Oncológicos</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La Unidad de Quimioterapia de la Clínica de la Costa SAS está diseñada para atender tanto a pacientes ambulatorios como hospitalizados, brindando un servicio integral para el manejo de patologías hematológicas y oncológicas. Contamos con un equipo multidisciplinario altamente capacitado, dedicado exclusivamente a ofrecer un cuidado especializado, seguro y humanizado.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-18%20at%202.35.13%20PM.jpeg?alt=media&token=6aae6289-d76f-4b36-b1be-59ad722a2551"
                    alt="Atención Hospitalaria de Quimioterapia"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    data-ai-hint="chemotherapy hospital care"
                />
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Infraestructura Moderna y Cómoda</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {infrastructureFeatures.map((item, index) => (
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
                        <CardTitle className="text-2xl text-primary">Servicios Ofrecidos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {offeredServices.map((item, index) => (
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
                    specialtyName="Oncólogos Clínicos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo de quimioterapia está listo para brindarte el mejor cuidado. Contáctanos para conocer más sobre nuestros tratamientos.</p>
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

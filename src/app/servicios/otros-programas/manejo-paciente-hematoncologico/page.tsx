import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle, HeartHandshake } from 'lucide-react';
import type { Metadata } from 'next';
import { safeQuery } from '@/lib/firebase-helpers';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';

export const metadata: Metadata = {
    title: 'Manejo Integral del Paciente Hematoncológico - Clínica de la Costa',
    description: 'Programa especializado para la atención oportuna, accesible y de alta calidad para pacientes hematoncológicos adultos y pediátricos.',
};

async function getSpecialists(): Promise<Medico[]> { return safeQuery(async (db) => { const snapshot = await db.collection('medicos')
            .where('especialidad', 'in', ['Hematología Oncológica', 'Cirugía Oncológica', 'Oncología Clínica'])
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    }, []); }

const teamMembers = [
    "Hematología – Oncológica (Adulto y Pediátrica)", "Cirugía Oncológica", "Oncología Clínica",
    "Ginecología Oncológica", "Urología Oncológica", "Ortopedia Oncológica",
    "Enfermería especializada", "Psicología y Trabajo Social", "Nutrición",
    "Químico farmacéutico", "Radioterapia y Medicina Nuclear", "Patología Oncológica"
];

const programBenefits = [
    "Atención integral especializada.",
    "Tratamiento oportuno y personalizado.",
    "Soporte informativo y educativo para el paciente y su familia."
];

export default async function ManejoIntegralHematoncologicoPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fimage%20(1).jpg?alt=media&token=477643ba-d800-498a-9bf8-c0c7a737fcf0"
                        alt="Manejo Integral Hematoncológico"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="hematology oncology care"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Manejo Integral del Paciente Hematoncológico</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Cuidado Integral para Pacientes Hematoncológicos</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            En la Clínica de la Costa SAS, contamos con un programa especializado en el manejo integral del paciente hematoncológico, diseñado para garantizar una atención oportuna, accesible y de alta calidad. Este programa está respaldado por un equipo multidisciplinario y los más altos niveles de excelencia académica e investigación, abarcando tanto población adulta como pediátrica.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Equipo Multidisciplinario</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {teamMembers.map((member, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                    <span>{member}</span>
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
                            {programBenefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                         <div className="relative h-64 w-full rounded-lg overflow-hidden mt-6">
                            <Image
                                src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-20%20at%203.09.31%20PM.jpeg?alt=media&token=e9ddd974-a65a-43ba-b24b-413c926ff44f"
                                alt="Atención Hospitalaria de Calidad"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                                data-ai-hint="quality hospital care"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Servicios Especializados</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-4">
                            <li><strong>Hospitalización Oncológica:</strong> Dos pabellones con 16 camas cada uno para atención especializada pediátrica y adulta.</li>
                            <li><strong>Sala de Quimioterapia:</strong> Ubicada en el tercer piso del bloque oncológico, diseñada bajo las normas del Ministerio de Salud para atender pacientes ambulatorios y hospitalizados.</li>
                            <li>Personal multidisciplinario con entrenamiento y dedicación exclusiva para la atención de pacientes con patologías hematológicas y oncológicas.</li>
                        </ul>
                    </CardContent>
                </Card>
            </section>

            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Equipo Hematoncológico"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro compromiso es ofrecer un cuidado integral, seguro y humanizado para pacientes con enfermedades hematoncológicas, asegurando resultados positivos y mejorando su calidad de vida.</p>
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

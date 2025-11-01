import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle, ShieldCheck, Star } from 'lucide-react';
import type { Metadata } from 'next';
import { safeQuery } from '@/lib/firebase-helpers';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';

export const metadata: Metadata = {
    title: 'Cirugía de Cabeza y Cuello - Clínica de la Costa',
    description: 'Servicio de excelencia en cirugía de cabeza y cuello para el manejo integral de patologías benignas y malignas, con un equipo multidisciplinario y tecnología de punta.',
};

async function getSpecialists(): Promise<Medico[]> { return safeQuery(async (db) => { const snapshot = await db.collection('medicos')
            .where('especialidad', '==', 'Cirugía de Cabeza y Cuello')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    }, []); }

const serviceFeatures = [
    "Atención integral y especializada por profesionales con habilidades avanzadas.",
    "Diagnósticos seguros y precisos con tecnología de última generación.",
    "Tratamientos completos, incluyendo técnicas reconstructivas y manejo oncológico.",
    "Garantía de seguridad y calidad en un entorno seguro para cada paciente.",
    "Oportunidad en la atención sin listas de espera prolongadas."
];

const innovations = [
    "Técnicas reconstructivas para recuperar funcionalidad y estética.",
    "Manejo complementario oncológico en coordinación con otros especialistas.",
    "Rehabilitación postquirúrgica para mejorar la calidad de vida."
];

export default async function CirugiaDeCabezaYCuelloPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2FDSC01594.JPG?alt=media&token=d932da45-0f06-4b19-85dc-58b718ff3a30"
                        alt="Cirugía de Cabeza y Cuello"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="head and neck surgery"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Cirugía de Cabeza y Cuello</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Un Enfoque Especializado para Patologías Complejas</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La Clínica de la Costa SAS ofrece un servicio de cirugía de cabeza y cuello de excelencia, respaldado por profesionales altamente capacitados y especializados en el manejo integral de patologías benignas y malignas que afectan esta compleja área del cuerpo.
                        </p>
                        <p>
                            Entendemos el aumento en la incidencia de estas patologías y la dificultad para acceder a especialistas. Por ello, respondemos con un equipo multidisciplinario, ofreciendo diagnósticos precisos y tratamientos que cumplen con los más altos estándares médicos.
                        </p>
                    </CardContent>
                </Card>
            </section>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary flex items-center gap-3"><ShieldCheck /> Características de Nuestro Servicio</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {serviceFeatures.map((feature, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </section>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Innovación en Tratamientos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {innovations.map((item, index) => (
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
                        <CardTitle className="text-2xl text-primary">Compromiso con los Pacientes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">Nos esforzamos por:</p>
                         <ul className="space-y-3">
                            <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-accent mt-1" /><span>Garantizar un acceso fácil y rápido.</span></li>
                            <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-accent mt-1" /><span>Proveer atención personalizada.</span></li>
                            <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-accent mt-1" /><span>Ofrecer un entorno humanizado y de confianza.</span></li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Especialistas en Cirugía de Cabeza y Cuello"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">¿Necesitas Más Información?</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo está listo para brindarte el apoyo y la atención que necesitas. Contáctanos para conocer más sobre nuestros procedimientos.</p>
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

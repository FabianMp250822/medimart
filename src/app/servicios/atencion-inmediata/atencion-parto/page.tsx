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
    title: 'Atención del Parto: Ginecología, Obstetricia y Maternidad - Clínica de la Costa',
    description: 'Ofrecemos un cuidado integral para la mujer, desde el control prenatal hasta el postparto, con un equipo especializado en embarazos de alto riesgo y cirugías ginecológicas.',
};

async function getSpecialists(): Promise<Medico[]> { return safeQuery(async (db) => { const snapshot = await db.collection('medicos')
            .where('especialidad', '==', 'Ginecología y Obstetricia')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    }, []); }

const specializedServices = [
    "Atención de embarazo normal y de alto riesgo.",
    "Cesáreas seguras realizadas por especialistas experimentados.",
    "Control prenatal personalizado con chequeos regulares y asesoramiento.",
    "Monitoreo fetal avanzado, como perfil biofísico y amniocentesis.",
    "Cirugía ginecológica para infertilidad, cáncer y otros problemas."
];

const benefits = [
    "Equipo especializado con experiencia en casos complejos.",
    "Tecnología avanzada para monitoreo fetal y cirugías.",
    "Atención personalizada con planes diseñados para cada mujer.",
    "Cuidado integral desde la concepción hasta el postparto."
];

export default async function AtencionPartoPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-20%20at%207.40.07%20PM.jpeg?alt=media&token=dd444583-361a-4086-be8f-020e30ed7418"
                        alt="Atención del Parto"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="childbirth delivery room"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Atención del Parto: Ginecología, Obstetricia y Maternidad</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Cuidado Integral para la Salud Femenina</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            En la Clínica de la Costa SAS, ofrecemos una atención coordinada y compasiva para cada etapa de la vida de la mujer. Nuestro servicio de Ginecología, Obstetricia y Maternidad está diseñado para brindar un cuidado integral a mujeres jóvenes, futuras madres y aquellas que enfrentan desafíos de salud específicos, como el embarazo de alto riesgo o la postmenopausia.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-21%20at%2010.41.08%20AM.jpeg?alt=media&token=74bbca1e-5b72-441b-a54a-e80765a00245"
                    alt="Atención Hospitalaria Materna"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    data-ai-hint="maternity hospital care"
                />
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Servicios Especializados</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {specializedServices.map((item, index) => (
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
                        <CardTitle className="text-2xl text-primary">Beneficios de Elegirnos</CardTitle>
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
            
            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Ginecólogos y Obstetras"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo de ginecología está listo para brindarte el mejor cuidado en cada etapa de tu vida. Contáctanos para conocer más.</p>
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

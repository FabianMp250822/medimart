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
    title: 'Odontología General - Clínica de la Costa',
    description: 'Salud y cuidado dental para toda la familia. Ofrecemos prevención, diagnóstico y tratamiento de enfermedades dentales con un enfoque integral.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', '==', 'Odontología General')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Odontología General: ", error);
        return [];
    }
}

const services = [
    "Control y prevención de caries.",
    "Limpiezas dentales profesionales.",
    "Tratamientos de restauración dental.",
    "Atención de emergencias dentales.",
    "Aplicación de sellantes dentales."
];

const benefits = [
    "Prevención de problemas dentales a largo plazo.",
    "Diagnóstico temprano de enfermedades bucales.",
    "Atención personalizada para todas las edades.",
    "Promoción de hábitos de higiene oral adecuados."
];

const approach = [
    { title: "Consulta General", description: "Evaluación completa de la salud bucal." },
    { title: "Tratamiento Preventivo", description: "Protección contra caries y enfermedades periodontales." },
    { title: "Atención Restauradora", description: "Soluciones avanzadas para restaurar dientes dañados." },
    { title: "Educación en Higiene Oral", description: "Orientación para mantener una buena salud bucal." }
];

export default async function OdontologiaGeneralPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fodontologia-general.jpg?alt=media&token=12345678-abcd-efgh-ijkl-mnopqrstuvwxyz"
                        alt="Atención en Odontología General"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="general dentistry"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Odontología General</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Salud y Cuidado Dental para Toda la Familia</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La Clínica de la Costa SAS ofrece servicios de Odontología General diseñados para garantizar la salud bucal de nuestros pacientes. Nuestro equipo de odontólogos se dedica a la prevención, diagnóstico y tratamiento de enfermedades dentales y bucales, asegurando una atención integral y de calidad para todas las edades.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Ftratamiento-odontologia.jpg?alt=media&token=12345678-abcd-efgh-ijkl-mnopqrstuvwxyz"
                    alt="Tratamiento de Odontología General"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    data-ai-hint="dentistry treatment"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Servicios Destacados</CardTitle>
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
                        <CardTitle className="text-2xl text-primary">Beneficios de la Odontología General</CardTitle>
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
                        <CardTitle className="text-2xl text-primary">Enfoque Integral en el Cuidado Dental</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {approach.map((item) => (
                            <div key={item.title} className="p-4 rounded-lg bg-primary/5">
                                <h3 className="font-semibold text-lg text-primary mb-2">{item.title}</h3>
                                <p className="text-muted-foreground text-sm">{item.description}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>

            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Nuestros Odontólogos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestra misión es proporcionar un cuidado dental de calidad y accesible, promoviendo sonrisas saludables y una mejor calidad de vida para nuestros pacientes. ¡Confía en nosotros para cuidar tu salud bucal y la de tu familia!</p>
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

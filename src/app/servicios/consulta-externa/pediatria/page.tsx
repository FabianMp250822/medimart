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
    title: 'Pediatría - Clínica de la Costa',
    description: 'Cuidado integral para niños y adolescentes. Nuestro equipo de pediatras se dedica a garantizar el bienestar y desarrollo saludable de los más pequeños.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', '==', 'Pediatría')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Pediatría: ", error);
        return [];
    }
}

const services = [
    "Controles de crecimiento y desarrollo.",
    "Diagnóstico y tratamiento de enfermedades pediátricas.",
    "Vacunación infantil y adolescente.",
    "Atención en neonatología y seguimiento del recién nacido.",
    "Asesoría en nutrición y lactancia materna."
];

const benefits = [
    "Enfoque integral en la salud y el bienestar infantil.",
    "Prevención y detección temprana de enfermedades.",
    "Orientación para padres en el cuidado infantil.",
    "Ambiente seguro y amigable para los niños.",
    "Equipos médicos especializados en atención pediátrica."
];

const technologies = [
    { title: "Monitoreo de Crecimiento", description: "Herramientas digitales para seguimiento preciso." },
    { title: "Diagnóstico Avanzado", description: "Imágenes pediátricas de alta resolución." },
    { title: "Vacunación", description: "Protocolos actualizados y certificados por las normativas de salud." },
    { title: "Teleconsulta", description: "Atención remota para seguimiento y orientación pediátrica." }
];

export default async function PediatriaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fpediatria.jpg?alt=media&token=12345678-abcd-efgh-ijkl-mnopqrstuvwxyz"
                        alt="Atención Pediátrica Integral"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="pediatric care"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Pediatría</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Cuidado Integral para Niños y Adolescentes</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            En la Clínica de la Costa SAS, ofrecemos servicios especializados en pediatría enfocados en el bienestar y desarrollo integral de niños y adolescentes. Nuestro equipo multidisciplinario está dedicado a garantizar una atención médica de alta calidad, personalizada y humanizada.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fpediatria-tratamiento.jpg?alt=media&token=12345678-abcd-efgh-ijkl-mnopqrstuvwxyz"
                    alt="Servicios de Pediatría"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    data-ai-hint="pediatric services"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Servicios de Pediatría</CardTitle>
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
                        <CardTitle className="text-2xl text-primary">Beneficios de Nuestra Atención Pediátrica</CardTitle>
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
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    specialtyName="Nuestros Pediatras"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Estamos comprometidos con el cuidado integral de la salud infantil. ¡Confía en nosotros para cuidar a tus hijos!</p>
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

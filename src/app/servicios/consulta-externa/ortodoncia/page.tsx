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
    title: 'Ortodoncia - Clínica de la Costa',
    description: 'Sonrisa perfecta y salud dental. Ofrecemos tratamientos de ortodoncia modernos y personalizados para alinear dientes y mejorar la mordida en pacientes de todas las edades.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', '==', 'Ortodoncia')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Ortodoncia: ", error);
        return [];
    }
}

const services = [
    "Aparatos fijos tradicionales (brackets metálicos).",
    "Aparatos estéticos (brackets de cerámica o zafiro).",
    "Ortodoncia invisible (alineadores transparentes).",
    "Corrección de maloclusiones dentales.",
    "Ortodoncia infantil y para adultos."
];

const benefits = [
    "Mejora de la función masticatoria.",
    "Prevención de enfermedades periodontales y caries.",
    "Aumento de la autoestima a través de una sonrisa estética.",
    "Reducción del desgaste dental anormal.",
    "Corrección de problemas de pronunciación causados por maloclusiones."
];

const technologies = [
    { title: "Escaneo Digital", description: "Diagnóstico y planificación con imágenes tridimensionales." },
    { title: "Ortodoncia Invisible", description: "Uso de alineadores como Invisalign para una experiencia discreta." },
    { title: "Control y Seguimiento", description: "Revisiones periódicas para asegurar el progreso adecuado del tratamiento." }
];

export default async function OrtodonciaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fortodoncia.jpg?alt=media&token=12345678-abcd-efgh-ijkl-mnopqrstuvwxyz"
                        alt="Tratamientos de Ortodoncia"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="orthodontics"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Ortodoncia</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Sonrisa Perfecta y Salud Dental</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            En la Clínica de la Costa SAS, nuestro servicio de Ortodoncia está enfocado en alinear dientes, mejorar la mordida y corregir maloclusiones, utilizando técnicas modernas y personalizadas. Nuestro objetivo es lograr una sonrisa funcional, estética y saludable para cada paciente, sin importar su edad.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Ftratamiento-ortodoncia.jpg?alt=media&token=12345678-abcd-efgh-ijkl-mnopqrstuvwxyz"
                    alt="Tratamiento de Ortodoncia"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    data-ai-hint="orthodontic treatment"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Servicios de Ortodoncia</CardTitle>
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
                        <CardTitle className="text-2xl text-primary">Beneficios de la Ortodoncia</CardTitle>
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
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    specialtyName="Nuestros Ortodoncistas"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro compromiso es brindarte tratamientos de ortodoncia personalizados, diseñados para mejorar la funcionalidad y la estética de tu sonrisa. ¡Déjanos ayudarte a lograr la sonrisa que siempre has deseado!</p>
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

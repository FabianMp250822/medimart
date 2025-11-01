import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle, Baby } from 'lucide-react';
import type { Metadata } from 'next';
import { safeQuery } from '@/lib/firebase-helpers';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';

export const metadata: Metadata = {
    title: 'Neonatología - Clínica de la Costa',
    description: 'Cuidado especializado para recién nacidos, especialmente prematuros o con condiciones médicas complejas. Servicio integral con UCIN y programas de seguimiento.',
};

async function getSpecialists(): Promise<Medico[]> { return safeQuery(async (db) => { const snapshot = await db.collection('medicos')
            .where('especialidad', '==', 'Neonatología')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    }, []); }

const ucinServices = [
    "Atención especializada las 24 horas del día.",
    "Monitoreo continuo con equipos de última generación.",
    "Manejo integral para recién nacidos prematuros, bebés con bajo peso al nacer, trastornos respiratorios e ictericia neonatal severa."
];

const criticalConditions = [
    { title: "Soporte respiratorio avanzado", description: "Ventilación mecánica, terapia CPAP y oxígeno de alto flujo." },
    { title: "Monitoreo metabólico y nutricional", description: "Nutrición enteral y parenteral personalizada." },
    { title: "Tratamiento de anomalías congénitas", description: "Manejo inicial y coordinación con especialistas en cirugía pediátrica." }
];

export default async function NeonatologiaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-20%20at%206.51.25%20PM.jpeg?alt=media&token=72ce5a52-b391-435a-ae35-9bdf6339e919"
                        alt="Neonatología"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="neonatology unit"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Neonatología</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Cuidado Especializado para los Recién Nacidos</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La neonatología es una subespecialidad pediátrica que se enfoca en la atención y el cuidado de los recién nacidos, especialmente aquellos que nacen prematuramente, con bajo peso, enfermedades congénitas o que requieren atención médica especializada en sus primeros días de vida. En la Clínica de la Costa SAS, ofrecemos un servicio integral de neonatología, diseñado para garantizar la salud y el bienestar de los recién nacidos y brindar apoyo a sus familias.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Unidad de Cuidados Intensivos Neonatales (UCIN)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {ucinServices.map((item, index) => (
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
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-20%20at%207.40.07%20PM.jpeg?alt=media&token=dd444583-361a-4086-be8f-020e30ed7418"
                        alt="Atención Hospitalaria Neonatal"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                        data-ai-hint="neonatal hospital care"
                    />
                </div>
            </div>
            
             <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Manejo de Condiciones Críticas y Seguimiento</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {criticalConditions.map((tech) => (
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
                    specialtyName="Nuestros Neonatólogos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro compromiso es brindar el mejor cuidado para los recién nacidos, apoyando su desarrollo y garantizando tranquilidad a las familias.</p>
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

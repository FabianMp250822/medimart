import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle, Bone } from 'lucide-react';
import type { Metadata } from 'next';
import { safeQuery } from '@/lib/firebase-helpers';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';

export const metadata: Metadata = {
    title: 'Ortopedia Pediátrica - Clínica de la Costa',
    description: 'Diagnóstico y tratamiento de trastornos musculoesqueléticos en niños y adolescentes, desde problemas congénitos hasta lesiones traumáticas.',
};

async function getSpecialists(): Promise<Medico[]> { return safeQuery(async (db) => { const snapshot = await db.collection('medicos')
            .where('especialidad', '==', 'Ortopedia Pediátrica')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    }, []); }

const conditionsTreated = [
    "Deformidades congénitas: Pie equinovaro, displasia del desarrollo de la cadera.",
    "Lesiones traumáticas: Fracturas y lesiones deportivas.",
    "Enfermedades neuromusculares: Parálisis cerebral infantil, distrofias musculares.",
    "Infecciones y tumores óseos: Osteomielitis y tumores benignos o malignos."
];

const featuredServices = [
    "Consulta especializada con diagnóstico temprano.",
    "Tratamientos quirúrgicos avanzados.",
    "Rehabilitación pediátrica con fisioterapia adaptada.",
    "Prevención y seguimiento continuo del desarrollo."
];

export default async function OrtopediaPediatricaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2Fortopedia-pediatrica.jpg?alt=media"
                        alt="Ortopedia Pediátrica"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="pediatric orthopedics"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Ortopedia Pediátrica</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">¿Qué es la Ortopedia Pediátrica?</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La ortopedia pediátrica es una especialidad médica que se enfoca en el diagnóstico, tratamiento y prevención de trastornos musculoesqueléticos en niños y adolescentes. Esto incluye problemas congénitos, lesiones traumáticas, deformidades óseas y condiciones adquiridas que afectan el crecimiento y desarrollo del sistema óseo, muscular y articular.
                        </p>
                        <p>
                            Se distingue de la ortopedia general porque los niños están en constante crecimiento, lo que requiere enfoques específicos y un entendimiento profundo de sus necesidades físicas y emocionales.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-18%20at%202.35.13%20PM.jpeg?alt=media&token=6aae6289-d76f-4b36-b1be-59ad722a2551"
                    alt="Atención Hospitalaria Pediátrica"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    data-ai-hint="pediatric hospital care"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Condiciones Tratadas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {conditionsTreated.map((item, index) => (
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
                        <CardTitle className="text-2xl text-primary">Servicios Destacados</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {featuredServices.map((item, index) => (
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
                    specialtyName="Ortopedistas Pediátricos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Estamos comprometidos con el bienestar físico y emocional de los niños, asegurando un enfoque integral y profesional para cada paciente.</p>
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

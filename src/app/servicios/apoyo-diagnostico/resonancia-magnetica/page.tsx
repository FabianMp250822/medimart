import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle, Radio } from 'lucide-react';
import type { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';

export const metadata: Metadata = {
    title: 'Resonancia Magnética - Clínica de la Costa',
    description: 'Servicio de Resonancia Magnética (RM) de alta resolución para diagnósticos detallados del sistema nervioso, musculoesquelético y tejidos blandos sin radiación.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', '==', 'Radiología')
            .limit(5)
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Resonancia Magnética: ", error);
        return [];
    }
}

const applications = [
    "Diagnóstico de enfermedades neurológicas como esclerosis múltiple, tumores cerebrales y ACV.",
    "Evaluación de lesiones en articulaciones, ligamentos y músculos (rodilla, hombro, etc.).",
    "Estudio detallado de la columna vertebral y la médula espinal.",
    "Detección de tumores y anomalías en tejidos blandos y órganos internos.",
    "Análisis de la salud cardiovascular sin uso de radiación ionizante."
];

const benefits = [
    "No utiliza radiación ionizante, lo que la hace extremadamente segura.",
    "Proporciona imágenes de altísima calidad y detalle de los tejidos blandos.",
    "Capacidad para detectar anomalías que no son visibles con otras técnicas de imagen.",
    "Es una herramienta fundamental para la planificación quirúrgica precisa."
];

export default async function ResonanciaMagneticaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FGemini_Generated_Image_2suckz2suckz2suc.png?alt=media&token=0b9f7b24-5435-4713-a91e-746aa78b9ccc"
                        alt="Equipo de Resonancia Magnética"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="mri scanner"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Resonancia Magnética</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Visualización Avanzada para un Diagnóstico Confiable</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La Resonancia Magnética (RM) es una técnica de diagnóstico por imagen que utiliza un potente campo magnético y ondas de radio para crear imágenes detalladas de los órganos y tejidos del cuerpo. En la Clínica de la Costa, ofrecemos este estudio avanzado para obtener diagnósticos de alta precisión sin exponer al paciente a radiación ionizante.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Aplicaciones Clínicas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {applications.map((item, index) => (
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
                        <CardTitle className="text-2xl text-primary">Beneficios de la Resonancia Magnética</CardTitle>
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
                    specialtyName="Nuestros Radiólogos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Agende su Resonancia Magnética</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo está comprometido con brindarle un diagnóstico preciso y seguro. Contáctenos para más información o para programar su estudio.</p>
                <div className="mt-6 flex justify-center gap-4">
                    <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                        <Link href="/contacto">
                            <Phone className="mr-2 h-5 w-5" />
                            Contáctanos
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                        <Link href="/pacientes/preparacion-examenes">
                            <Radio className="mr-2 h-5 w-5" />
                            Preparación para el examen
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}

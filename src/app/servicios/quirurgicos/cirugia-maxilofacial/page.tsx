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
    title: 'Cirugía Maxilofacial - Clínica de la Costa',
    description: 'Cuidado avanzado para la salud bucal y facial. Tratamos lesiones, defectos y enfermedades de la mandíbula, cara y cavidad oral con tecnología de punta.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', 'in', ['Cirugía Maxilofacial', 'Cirugía Oral'])
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Cirugía Maxilofacial: ", error);
        return [];
    }
}

const procedures = [
    "Cirugía Ortognática: Corrección de desórdenes en la alineación de la mandíbula.",
    "Extracción de Muelas del Juicio: Extracción quirúrgica de terceros molares impactados.",
    "Cirugía Reconstructiva: Reparación de estructuras faciales dañadas por traumas o tumores.",
    "Trastornos de la ATM: Cirugía para aliviar dolor crónico y bloqueo mandibular.",
    "Extirpación de Tumores y Quistes Bucales: Eliminación de lesiones en la cavidad oral.",
    "Implantes Dentales y Regeneración Ósea: Colocación de implantes y manejo de pérdida ósea."
];

const benefits = [
    "Mejora funcional y estética, restaurando salud y apariencia.",
    "Procedimientos personalizados para las necesidades específicas del paciente.",
    "Recuperación efectiva con técnicas avanzadas para minimizar molestias."
];


export default async function CirugiaMaxilofacialPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2FDSC01594.JPG?alt=media&token=d932da45-0f06-4b19-85dc-58b718ff3a30"
                        alt="Cirugía Maxilofacial"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="maxillofacial surgery"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Cirugía Maxilofacial</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Cuidado Avanzado para la Salud Bucal y Facial</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La cirugía maxilofacial es una especialidad quirúrgica que se enfoca en el diagnóstico y tratamiento de enfermedades, lesiones y defectos de la cavidad oral, la cara, la mandíbula y el cuello. En la Clínica de la Costa SAS, nuestros cirujanos maxilofaciales altamente capacitados y la tecnología de última generación ofrecen soluciones integrales y personalizadas, restaurando la funcionalidad y la estética de nuestros pacientes.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Procedimientos Especializados</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {procedures.map((item, index) => (
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
                        <CardTitle className="text-2xl text-primary">Beneficios de la Cirugía Maxilofacial</CardTitle>
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
                    specialtyName="Cirujanos Maxilofaciales"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo de especialistas está listo para brindarte el mejor cuidado. Contáctanos para conocer más sobre nuestros procedimientos.</p>
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

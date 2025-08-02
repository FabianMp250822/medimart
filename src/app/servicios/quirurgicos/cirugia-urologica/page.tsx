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
    title: 'Cirugía Urológica - Clínica de la Costa',
    description: 'Soluciones avanzadas para la salud urológica. Ofrecemos procedimientos mínimamente invasivos para riñón, próstata y más, con tecnología de vanguardia.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', '==', 'Urología')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Cirugía Urológica: ", error);
        return [];
    }
}

const procedures = [
    "Extirpación parcial o total del riñón por cáncer o enfermedades benignas.",
    "Tratamiento de piedras renales grandes y complejas.",
    "Reconstrucción de estrecheces del uréter.",
    "Cirugía prostática por enfermedades benignas o cáncer.",
    "Extirpación de tumores malignos de testículo.",
    "Cirugías andrológicas: Vasectomía, vasovasostomía, y más.",
    "Tratamiento de estrecheces de la uretra y malformaciones congénitas."
];

const laparoscopyBenefits = [
    "Evita grandes incisiones, resultando en menor dolor postoperatorio.",
    "Menor sangrado y menor consumo de analgésicos.",
    "Recuperación más rápida y pronta reincorporación a las actividades diarias."
];

export default async function CirugiaUrologicaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2FDSC01594.JPG?alt=media&token=d932da45-0f06-4b19-85dc-58b718ff3a30"
                        alt="Cirugía Urológica"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="urology surgery"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Cirugía Urológica</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Soluciones Avanzadas para la Salud Urológica</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La cirugía urológica agrupa todas las técnicas quirúrgicas que tratan el sistema genital y urinario del varón y el sistema urinario de la mujer. Incluye procedimientos para riñón, próstata, testículos, uréter y uretra, abordando tanto enfermedades benignas como cáncer.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Cirugías y Procedimientos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {procedures.map((proc, index) => (
                                 <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                    <span>{proc}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </section>

             <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Laparoscopia: Técnica Mínimamente Invasiva</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                           La laparoscopia es una técnica que utiliza una cámara y herramientas especializadas introducidas a través de pequeños puertos en el abdomen, ofreciendo múltiples ventajas frente a la cirugía tradicional:
                        </p>
                         <ul className="space-y-3">
                            {laparoscopyBenefits.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </section>
            
            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Nuestros Urólogos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo de urología está listo para brindarte el mejor cuidado. Contáctanos para conocer más.</p>
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

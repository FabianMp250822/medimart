import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle, Baby } from 'lucide-react';
import type { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';

export const metadata: Metadata = {
    title: 'Cirugía Pediátrica - Clínica de la Costa',
    description: 'Cuidado quirúrgico integral para niños y niñas, desde la etapa prenatal hasta los 18 años. Equipo especializado y tecnología de punta para la salud de los más pequeños.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', '==', 'Cirugía Pediátrica')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Cirugía Pediátrica: ", error);
        return [];
    }
}

const commonSurgeries = {
    ambulatorias: [
        "Herniorrafia inguinal",
        "Herniorrafia umbilical",
        "Resección de quistes tiroglosos",
        "Dilataciones esofágicas"
    ],
    complejas: [
        "Resección de quistes del colédoco",
        "Corrección de atresias de vías biliares y de esófago",
        "Corrección de defectos de la pared abdominal (gastrosquisis, onfalocele)",
        "Corrección de malformaciones anorrectales",
        "Gastrostomía y Apendicectomía por laparoscopia"
    ]
};

const commitmentPoints = [
    "Brindar información clara y detallada a los padres y cuidadores.",
    "Ofrecer un entorno cálido y seguro para los pacientes más jóvenes.",
    "Garantizar un seguimiento cercano en el proceso postoperatorio."
];

export default async function CirugiaPediatricaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-20%20at%207.40.07%20PM.jpeg?alt=media&token=dd444583-361a-4086-be8f-020e30ed7418"
                        alt="Cirugía Pediátrica"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="pediatric surgery"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Cirugía Pediátrica</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Cuidado Integral para los Más Pequeños</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La Cirugía Pediátrica es una especialidad dedicada al tratamiento quirúrgico de enfermedades que afectan a niños y niñas, desde la etapa prenatal hasta los 18 años. En la Clínica de la Costa SAS, este servicio garantiza un cuidado integral, respaldado por más de 20 años de experiencia y un equipo altamente especializado en el manejo de patologías en cuello, tórax, abdomen, pelvis, genitales y extremidades.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Cirugías Comunes</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-semibold text-lg text-primary mb-3">Cirugías Ambulatorias</h3>
                            <ul className="space-y-2">
                                {commonSurgeries.ambulatorias.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         <div>
                            <h3 className="font-semibold text-lg text-primary mb-3">Cirugías Complejas</h3>
                            <ul className="space-y-2">
                                {commonSurgeries.complejas.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </section>

             <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary flex items-center gap-3"><Baby /> Nuestro Compromiso con las Familias</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                           Sabemos que cada intervención quirúrgica puede ser un momento desafiante para las familias. Por ello, nuestro equipo se esfuerza en:
                        </p>
                         <ul className="space-y-3">
                            {commitmentPoints.map((item, index) => (
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
                    specialtyName="Nuestros Cirujanos Pediátricos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo de cirugía pediátrica está aquí para cuidar de la salud de tus hijos. Contáctanos para resolver tus dudas.</p>
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

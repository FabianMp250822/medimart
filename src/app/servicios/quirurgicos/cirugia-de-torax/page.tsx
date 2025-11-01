import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';
import { safeQuery } from '@/lib/firebase-helpers';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';

export const metadata: Metadata = {
    title: 'Cirugía de Tórax - Clínica de la Costa',
    description: 'Atención especializada para enfermedades del tórax, incluyendo pulmones, esófago y tráquea, utilizando técnicas avanzadas como la toracoscopía (VATS).',
};

async function getSpecialists(): Promise<Medico[]> { return safeQuery(async (db) => { const snapshot = await db.collection('medicos')
            .where('especialidad', '==', 'Cirugía de Tórax')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    }, []); }

const procedures = [
    {
        title: "Cirugía pulmonar",
        items: ["Resección de tumores malignos y benignos.", "Tratamiento de quistes y lesiones infecciosas.", "Lobectomías y segmentectomías."]
    },
    {
        title: "Cirugía de la tráquea y bronquios",
        items: ["Reparación de estenosis (estrecheces).", "Tratamiento de lesiones traumáticas o congénitas."]
    },
    {
        title: "Cirugía del esófago",
        items: ["Resección de tumores esofágicos.", "Reparación de hernias de hiato.", "Manejo de perforaciones esofágicas."]
    },
    {
        title: "Cirugía del mediastino",
        items: ["Extirpación de tumores y quistes.", "Diagnóstico y tratamiento de timomas o linfomas."]
    },
    {
        title: "Cirugía de la pared torácica",
        items: ["Reparación de fracturas costales y deformidades.", "Reconstrucción de la pared torácica."]
    }
];

const commitment = [
    "Atención personalizada con planes quirúrgicos adaptados a cada paciente.",
    "Tecnología de punta con equipos modernos que garantizan procedimientos seguros.",
    "Equipo especializado de cirujanos torácicos con amplia experiencia.",
    "Cuidado integral desde el diagnóstico hasta la recuperación completa."
];

export default async function CirugiaDeToraxPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%204.42.37%20PM(1).jpeg?alt=media&token=a0535648-1f07-4a43-87c1-8901f530dd94"
                        alt="Cirugía de Tórax"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="thoracic surgery"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Cirugía de Tórax</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Atención Especializada para Enfermedades del Tórax</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La cirugía de tórax es una especialidad dedicada al diagnóstico y tratamiento quirúrgico de enfermedades que afectan los órganos dentro del tórax, incluyendo pulmones, esófago, tráquea, mediastino y pared torácica. En la Clínica de la Costa SAS, contamos con cirujanos expertos y tecnología avanzada para brindar atención integral y personalizada.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Procedimientos Especializados</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {procedures.map((proc) => (
                             <div key={proc.title} className="p-4 rounded-lg bg-primary/5">
                                <h3 className="font-semibold text-lg text-primary mb-2">{proc.title}</h3>
                                <ul className="space-y-2 list-disc list-inside text-muted-foreground text-sm">
                                    {proc.items.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Técnicas Quirúrgicas Avanzadas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h3 className="font-semibold text-lg text-foreground">Toracoscopía asistida por video (VATS)</h3>
                        <p className="text-muted-foreground mt-1 mb-2">Técnica mínimamente invasiva para tratar patologías del tórax a través de pequeñas incisiones, resultando en menor dolor y una recuperación más rápida.</p>
                        <h3 className="font-semibold text-lg text-foreground mt-4">Cirugía robótica</h3>
                        <p className="text-muted-foreground mt-1">Ofrece mayor precisión en procedimientos complejos, especialmente en cirugía oncológica del tórax.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Compromiso con Nuestros Pacientes</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-3">
                            {commitment.map((item, index) => (
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
                    specialtyName="Cirujanos de Tórax"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo de cirugía torácica está listo para brindarte el mejor cuidado. Contáctanos para conocer más sobre nuestros procedimientos.</p>
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

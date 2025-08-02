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
    title: 'Cirugía Gastrointestinal - Clínica de la Costa',
    description: 'Soluciones quirúrgicas avanzadas para enfermedades del sistema digestivo. Ofrecemos cirugía de esófago, estómago, colon y más, con técnicas mínimamente invasivas.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', 'in', ['Cirugía Gastrointestinal', 'Cirugía General'])
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Cirugía Gastrointestinal: ", error);
        return [];
    }
}

const areas = [
    {
        title: "Cirugía de esófago y estómago",
        items: ["Tratamiento de hernia hiatal y reflujo.", "Extirpación de tumores esofágicos y gástricos.", "Reconstrucciones postquirúrgicas."]
    },
    {
        title: "Cirugía de intestinos y colon",
        items: ["Resección de tumores y pólipos.", "Tratamiento de enfermedades inflamatorias.", "Cirugía para obstrucciones intestinales."]
    },
    {
        title: "Cirugía hepatobiliar y pancreática",
        items: ["Extirpación de tumores de hígado, vesícula y páncreas.", "Tratamiento de cálculos biliares.", "Cirugía laparoscópica para colecistitis."]
    },
    {
        title: "Cirugía colorrectal",
        items: ["Tratamiento de cáncer de colon y recto.", "Reparación de fisuras y fístulas anales.", "Manejo de diverticulitis y hemorroides."]
    }
];

const benefits = [
    "Menor tiempo de recuperación.",
    "Menos dolor postoperatorio.",
    "Reducción del sangrado quirúrgico.",
    "Incisiones más pequeñas y menor riesgo de infecciones."
];

export default async function CirugiaGastrointestinalPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%204.42.37%20PM(1).jpeg?alt=media&token=a0535648-1f07-4a43-87c1-8901f530dd94"
                        alt="Cirugía Gastrointestinal"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="gastrointestinal surgery"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Cirugía Gastrointestinal</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Soluciones Quirúrgicas Avanzadas para el Sistema Digestivo</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La cirugía gastrointestinal se enfoca en el tratamiento quirúrgico de enfermedades y trastornos del sistema digestivo, incluyendo esófago, estómago, intestinos, colon, recto, hígado, páncreas y vesícula biliar. En la Clínica de la Costa SAS, nuestro equipo de cirujanos altamente capacitados y tecnología de última generación ofrecen procedimientos efectivos, seguros y personalizados.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Áreas de Especialización</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {areas.map((area) => (
                            <div key={area.title} className="p-4 rounded-lg bg-primary/5">
                                <h3 className="font-semibold text-lg text-primary mb-2">{area.title}</h3>
                                <ul className="space-y-2 list-disc list-inside text-muted-foreground text-sm">
                                    {area.items.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Innovación en Cirugía Mínimamente Invasiva</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Estamos a la vanguardia de los procedimientos laparoscópicos, que ofrecen múltiples beneficios:
                        </p>
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
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Enfoque Multidisciplinario</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Nuestro equipo trabaja en conjunto con otras especialidades para garantizar un tratamiento integral:
                        </p>
                         <ul className="space-y-3">
                            <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-accent mt-1" /><span>Gastroenterólogos para un diagnóstico preciso.</span></li>
                            <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-accent mt-1" /><span>Oncólogos para casos de cáncer gastrointestinal.</span></li>
                            <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-accent mt-1" /><span>Nutricionistas clínicos para guiar la recuperación.</span></li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Cirujanos Gastrointestinales"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">¿Necesitas Más Información?</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo de cirugía gastrointestinal está listo para brindarte el mejor cuidado. Contáctanos para conocer más.</p>
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

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
    title: 'Cirugía Ginecológica - Clínica de la Costa',
    description: 'Ofrecemos procedimientos de cirugía ginecológica avanzados para el tratamiento de diversas condiciones, utilizando técnicas mínimamente invasivas para una recuperación más rápida.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', 'in', ['Ginecología y Obstetricia', 'Cirugía Ginecológica'])
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Cirugía Ginecológica: ", error);
        return [];
    }
}

const procedures = [
    {
        title: "Histerectomía",
        items: ["Extirpación del útero, realizada por vía abdominal, vaginal o laparoscópica para tratar fibromas, endometriosis o cáncer."]
    },
    {
        title: "Miomectomía",
        items: ["Extirpación de fibromas uterinos, preservando el útero para futuras gestaciones."]
    },
    {
        title: "Cirugía de quistes ováricos",
        items: ["Eliminación de quistes en los ovarios, a menudo mediante laparoscopia para una recuperación más rápida."]
    },
    {
        title: "Cirugía de endometriosis",
        items: ["Extirpación de tejido endometrial fuera del útero para aliviar el dolor y mejorar la fertilidad."]
    },
    {
        title: "Procedimientos de suelo pélvico",
        items: ["Corrección de prolapso de órganos pélvicos y tratamiento de la incontinencia urinaria."]
    }
];

const whyChooseUs = [
    "Equipo de ginecólogos cirujanos con amplia experiencia en procedimientos complejos.",
    "Uso de técnicas mínimamente invasivas (laparoscopia) para una recuperación más rápida y menos dolorosa.",
    "Atención integral y personalizada, desde el diagnóstico hasta el seguimiento postoperatorio.",
    "Tecnología de última generación que garantiza la máxima seguridad y precisión en cada intervención."
];

export default async function CirugiaGinecologicaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%204.42.37%20PM(1).jpeg?alt=media&token=a0535648-1f07-4a43-87c1-8901f530dd94"
                        alt="Cirugía Ginecológica"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="gynecological surgery"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Cirugía Ginecológica</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Cuidado Especializado para la Salud Femenina</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La cirugía ginecológica se dedica al tratamiento de enfermedades y condiciones del sistema reproductor femenino. En la Clínica de la Costa SAS, ofrecemos un enfoque integral y personalizado, utilizando las técnicas quirúrgicas más avanzadas para garantizar la seguridad, el bienestar y una pronta recuperación de nuestras pacientes.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Procedimientos Destacados</CardTitle>
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
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">¿Por Qué Elegirnos?</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-3">
                            {whyChooseUs.map((item, index) => (
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
                    specialtyName="Ginecólogos y Obstetras"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo de ginecología está listo para brindarte el mejor cuidado. Contáctanos para conocer más sobre nuestros procedimientos.</p>
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

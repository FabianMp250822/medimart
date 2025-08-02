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
    title: 'Cirugía Oftalmológica - Clínica de la Costa',
    description: 'Innovación y precisión para la salud visual. Ofrecemos cirugía de cataratas, refractiva, glaucoma y más, con tecnología de última generación para restaurar tu visión.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', 'in', ['Oftalmología', 'Cirugía Oftalmológica'])
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Cirugía Oftalmológica: ", error);
        return [];
    }
}

const procedures = [
    {
        title: "Cirugía de Cataratas",
        items: ["Facoemulsificación para eliminar el cristalino opaco y reemplazarlo con una lente intraocular personalizada."]
    },
    {
        title: "Cirugía Refractiva",
        items: ["Corrección de miopía, hipermetropía y astigmatismo mediante LASIK, PRK o lentes fáquicos."]
    },
    {
        title: "Cirugía de Glaucoma",
        items: ["Tratamientos para reducir la presión intraocular como trabeculectomía, implantes de drenaje o láser (SLT)."]
    },
    {
        title: "Cirugía de Retina y Vítreo",
        items: ["Vitrectomía para tratar desprendimientos de retina, retinopatía diabética y agujero macular."]
    },
    {
        title: "Cirugía de Párpados",
        items: ["Reparación de ptosis (párpado caído), corrección de entropión/ectropión y tratamiento de obstrucciones lagrimales."]
    },
    {
        title: "Cirugía de Estrabismo",
        items: ["Corrección del desalineamiento ocular en niños y adultos para restaurar la visión binocular."]
    }
];

const whyChooseUs = [
    "Especialistas en oftalmología quirúrgica con experiencia en las últimas técnicas.",
    "Tecnología avanzada como láser de femtosegundo para asegurar resultados óptimos y seguros.",
    "Atención personalizada con planes quirúrgicos adaptados a las necesidades visuales de cada paciente.",
    "Cuidado integral, desde el diagnóstico preciso hasta la recuperación completa de la visión."
];

export default async function CirugiaOftalmologicaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2FDSC01594.JPG?alt=media&token=d932da45-0f06-4b19-85dc-58b718ff3a30"
                        alt="Cirugía Oftalmológica"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="ophthalmology surgery"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Cirugía Oftalmológica</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Innovación y Precisión para la Salud Visual</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La cirugía oftalmológica es una especialidad médica que se enfoca en el diagnóstico y tratamiento quirúrgico de enfermedades que afectan los ojos. En la Clínica de la Costa SAS, nuestros oftalmólogos especializados y la tecnología de última generación ofrecen procedimientos quirúrgicos precisos y seguros que mejoran la salud visual y la calidad de vida de nuestros pacientes.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Procedimientos Especializados</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    specialtyName="Nuestros Oftalmólogos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo de oftalmología está listo para ayudarte a ver el mundo con claridad. Contáctanos para conocer más.</p>
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

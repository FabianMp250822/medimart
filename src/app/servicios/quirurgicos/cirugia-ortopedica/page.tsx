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
    title: 'Cirugía Ortopédica - Clínica de la Costa',
    description: 'Restaurando movimiento y calidad de vida con cirugía de reemplazo articular, columna, fracturas y lesiones deportivas. Tecnología avanzada y un equipo experto.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', '==', 'Ortopedia y Traumatología')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Cirugía Ortopédica: ", error);
        return [];
    }
}

const areas = [
    {
        title: "Cirugía de Reemplazo Articular",
        items: ["Artroplastia de cadera, rodilla y hombro para tratar el desgaste severo o fracturas."]
    },
    {
        title: "Cirugía de Columna Vertebral",
        items: ["Tratamiento de hernias discales, escoliosis y otras patologías de la columna."]
    },
    {
        title: "Reparación de Fracturas",
        items: ["Manejo quirúrgico de fracturas complejas en extremidades, pelvis o columna."]
    },
    {
        title: "Cirugía Deportiva",
        items: ["Reparación de ligamentos (cruzados, meniscos) y lesiones de tendones."]
    },
    {
        title: "Cirugía de Mano y Extremidades",
        items: ["Tratamiento del túnel carpiano, dedo en gatillo y lesiones traumáticas."]
    },
    {
        title: "Ortopedia Pediátrica",
        items: ["Corrección de deformidades congénitas y tratamiento de fracturas en niños."]
    }
];

const whyChooseUs = [
    "Experiencia comprobada de cirujanos ortopédicos altamente calificados.",
    "Tecnología de punta que asegura precisión y seguridad en cada procedimiento.",
    "Planes de tratamiento personalizados según las necesidades de cada paciente.",
    "Enfoque en resultados para restaurar el movimiento y mejorar la calidad de vida."
];

export default async function CirugiaOrtopedicaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2FDSC01594.JPG?alt=media&token=d932da45-0f06-4b19-85dc-58b718ff3a30"
                        alt="Cirugía Ortopédica"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="orthopedic surgery"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Cirugía Ortopédica</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Restaurando Movimiento y Calidad de Vida</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La cirugía ortopédica es una especialidad dedicada al diagnóstico, tratamiento y rehabilitación de lesiones y enfermedades del sistema musculoesquelético, que incluyen huesos, articulaciones, ligamentos, tendones y músculos. En la Clínica de la Costa SAS, nuestro objetivo es ayudar a nuestros pacientes a recuperar la funcionalidad, aliviar el dolor y mejorar su calidad de vida.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Áreas de Especialización</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    specialtyName="Ortopedistas y Traumatólogos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo de ortopedia está listo para ayudarte a recuperar tu movilidad. Contáctanos para más detalles.</p>
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

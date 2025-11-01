import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { safeQuery } from '@/lib/firebase-helpers';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';

export const metadata: Metadata = {
    title: 'Cirugía Plástica Oncológica - Clínica de la Costa',
    description: 'Restaurando forma y función tras procedimientos oncológicos. Ofrecemos reconstrucción de mama, piel, cabeza y cuello para mejorar tu calidad de vida.',
};

async function getSpecialists(): Promise<Medico[]> { return safeQuery(async (db) => { const snapshot = await db.collection('medicos')
            .where('especialidad', '==', 'Cirugía Plástica Oncológica')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    }, []); }

const reconstructionAreas = [
    {
        title: "Cáncer de piel",
        items: [
            "Reconstrucción tras la extirpación de tumores cutáneos.",
            "Reparación estética y funcional para minimizar cicatrices visibles."
        ]
    },
    {
        title: "Cáncer de mama",
        items: [
            "Reconstrucción mamaria inmediata o diferida tras una mastectomía.",
            "Uso de implantes o tejido del propio paciente para resultados naturales."
        ]
    },
    {
        title: "Cáncer de cabeza y cuello",
        items: [
            "Restauración de áreas críticas como el rostro, mandíbula o garganta.",
            "Recuperación de funciones esenciales como la masticación o el habla."
        ]
    }
];

const benefits = [
    "Mejor calidad de vida al recuperar la forma y función de las áreas afectadas.",
    "Resultados estéticos óptimos que buscan restaurar la apariencia natural.",
    "Apoyo emocional al reconstruir la confianza y autoestima del paciente."
];

export default async function CirugiaPlasticaOncologicaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%204.42.37%20PM(1).jpeg?alt=media&token=a0535648-1f07-4a43-87c1-8901f530dd94"
                        alt="Cirugía Plástica Oncológica"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="oncology plastic surgery"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Cirugía Plástica Oncológica</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Restaurando Forma y Función para una Mejor Calidad de Vida</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La Cirugía Plástica Oncológica es una rama especializada enfocada en la reconstrucción de pacientes tras procedimientos oncológicos. En la Clínica de la Costa SAS, entendemos la importancia de no solo tratar la enfermedad, sino también de restaurar la confianza y calidad de vida de quienes han enfrentado una cirugía oncológica, restaurando tanto la forma como la función.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Áreas de Reconstrucción Frecuentes</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {reconstructionAreas.map((area) => (
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
                        <CardTitle className="text-2xl text-primary">Beneficios para los Pacientes</CardTitle>
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
            </section>
            
            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Cirujanos Plásticos Oncólogos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo está aquí para apoyarte en tu proceso de recuperación. Contáctanos para conocer más.</p>
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

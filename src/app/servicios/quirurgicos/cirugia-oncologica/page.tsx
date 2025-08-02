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
    title: 'Cirugía Oncológica - Clínica de la Costa',
    description: 'Tratamiento quirúrgico del cáncer con un equipo especializado y tecnología avanzada. Ofrecemos cirugía curativa, paliativa, preventiva y más.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', '==', 'Cirugía Oncológica')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Cirugía Oncológica: ", error);
        return [];
    }
}

const surgeryTypes = [
    { 
        title: "Cirugía curativa", 
        description: "Cirugía radical para extirpar completamente el tumor y tejido afectado, buscando la cura total en etapas iniciales del cáncer." 
    },
    { 
        title: "Cirugía paliativa", 
        description: "Diseñada para aliviar síntomas y mejorar la calidad de vida en pacientes con cáncer avanzado, eliminando tumores que causan dolor u obstrucciones." 
    },
    { 
        title: "Cirugía preventiva", 
        description: "También conocida como profiláctica, se dirige a pacientes con alto riesgo genético para reducir significativamente la probabilidad de desarrollar cáncer." 
    },
    { 
        title: "Cirugía diagnóstica", 
        description: "Se utiliza para obtener muestras de tejido (biopsia) y llegar a un diagnóstico definitivo de cáncer, determinando el tipo y la etapa de la enfermedad." 
    },
    { 
        title: "Cirugía citorreductora", 
        description: "Enfocada en reducir el tamaño del tumor antes de iniciar tratamientos como quimioterapia o radioterapia para mejorar su efectividad." 
    },
    { 
        title: "Cirugía de reescisión", 
        description: "Una segunda intervención para asegurar que no queden células cancerosas residuales tras una cirugía inicial, común en cáncer de piel y mama." 
    }
];

const whyChooseUs = [
    "Enfoque multidisciplinario en conjunto con oncólogos, radioterapeutas y otros especialistas.",
    "Tecnología avanzada que asegura precisión en cada procedimiento quirúrgico.",
    "Cuidado centrado en el paciente, priorizando la calidad de vida y el bienestar emocional.",
    "Equipo médico altamente capacitado y con años de experiencia en el tratamiento del cáncer."
];

export default async function CirugiaOncologicaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2FDSC01594.JPG?alt=media&token=d932da45-0f06-4b19-85dc-58b718ff3a30"
                        alt="Cirugía Oncológica"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="oncology surgery"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Cirugía Oncológica</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Especialistas en el Tratamiento Quirúrgico del Cáncer</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La cirugía oncológica, también conocida como oncocirugía, es una especialidad enfocada en el tratamiento del cáncer mediante procedimientos quirúrgicos. Su principal objetivo es extirpar tumores malignos, lo que puede mejorar significativamente la calidad de vida de los pacientes y, en muchos casos, prolongarla.
                        </p>
                        <p>
                            En la Clínica de la Costa SAS, contamos con un equipo especializado y tecnología avanzada para ofrecer tratamientos quirúrgicos personalizados, adaptados a las necesidades y características de cada paciente.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Tipos de Cirugía Oncológica que Ofrecemos</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {surgeryTypes.map((type) => (
                            <div key={type.title} className="p-4 rounded-lg bg-primary/5">
                                <h3 className="font-semibold text-lg text-primary mb-2">{type.title}</h3>
                                <p className="text-muted-foreground text-sm">{type.description}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">¿Por Qué Elegir la Clínica de la Costa?</CardTitle>
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
                    specialtyName="Cirujanos Oncólogos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo de cirugía oncológica está aquí para brindarte el apoyo y el cuidado que necesitas. Contáctanos para más detalles.</p>
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

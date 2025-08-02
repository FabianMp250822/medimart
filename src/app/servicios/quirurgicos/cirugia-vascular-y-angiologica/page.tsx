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
    title: 'Cirugía Vascular y Angiológica - Clínica de la Costa',
    description: 'Tratamientos especializados para enfermedades de arterias, venas y vasos linfáticos, utilizando técnicas avanzadas mínimamente invasivas para tu salud vascular.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', '==', 'Cirugía Vascular y Angiológica')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Cirugía Vascular: ", error);
        return [];
    }
}

const treatedConditions = {
    arteriales: [
        "Aneurismas: Reparación de dilataciones anormales en arterias.",
        "Enfermedad arterial periférica: Tratamiento de obstrucciones en arterias de las extremidades.",
        "Estenosis carotídea: Para prevenir accidentes cerebrovasculares."
    ],
    venosas: [
        "Varices: Tratamiento con técnicas mínimamente invasivas como escleroterapia o ablación láser.",
        "Trombosis venosa profunda (TVP): Manejo quirúrgico y endovascular para disolver coágulos.",
        "Insuficiencia venosa crónica."
    ],
    linfaticas: [
        "Linfedema: Manejo quirúrgico para reducir la acumulación de líquido en las extremidades."
    ]
};

export default async function CirugiaVascularYAngiologicaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2FDSC01594.JPG?alt=media&token=d932da45-0f06-4b19-85dc-58b718ff3a30"
                        alt="Cirugía Vascular y Angiológica"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="vascular surgery"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Cirugía Vascular y Angiológica</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Atención Especializada para tu Sistema Vascular</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La cirugía vascular y angiológica es una especialidad médica enfocada en el diagnóstico y tratamiento de enfermedades que afectan las arterias, venas y vasos linfáticos. En la Clínica de la Costa SAS, ofrecemos soluciones quirúrgicas avanzadas para mejorar la salud vascular y la calidad de vida de nuestros pacientes.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Condiciones que Tratamos</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="font-semibold text-lg text-primary mb-3">Enfermedades Arteriales</h3>
                            <ul className="space-y-2">
                                {treatedConditions.arteriales.map((item, index) => (
                                     <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         <div>
                            <h3 className="font-semibold text-lg text-primary mb-3">Enfermedades Venosas</h3>
                            <ul className="space-y-2">
                                {treatedConditions.venosas.map((item, index) => (
                                     <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         <div>
                            <h3 className="font-semibold text-lg text-primary mb-3">Enfermedades Linfáticas</h3>
                            <ul className="space-y-2">
                                {treatedConditions.linfaticas.map((item, index) => (
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
            
            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Cirujanos Vasculares"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo de cirugía vascular está listo para ofrecerte soluciones efectivas. Contáctanos para una consulta.</p>
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

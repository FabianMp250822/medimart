import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle, Hospital } from 'lucide-react';
import type { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';

export const metadata: Metadata = {
    title: 'Gastroenterología, Coloproctología y Endoscopia Digestiva - Clínica de la Costa',
    description: 'Servicio integral con un equipo de gastroenterólogos y coloproctólogos para el diagnóstico y tratamiento de enfermedades digestivas, con tecnología de endoscopia avanzada.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', 'in', ['Gastroenterología', 'Coloproctología'])
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Gastroenterología: ", error);
        return [];
    }
}

const procedures = [
    "Endoscopia bajo sedación", "Colonoscopia", "CEPRE (Colangiopancreatografía retrógrada endoscópica)",
    "Gastrostomía", "Rectosigmoidoscopia", "Proctosigmoidoscopia", "Polipectomía endoscópica",
    "Ligadura de varices esofágicas", "Esofagogastroduodenoscopia", "Obturación de varices gástricas",
    "Dilatación digestiva", "Cápsula endoscópica", "Spyglass (Litotricia Intraductal por coledoscopia)",
    "POEM (Miotomía endoscópica para acalasia)", "Terapia de Argón Plasma"
];

const facilities = [
    "Sala de espera confortable", "Área de admisión y preparación del paciente", "Salas de procedimientos equipadas",
    "Área de recuperación post-procedimiento", "Unidades sanitarias", "Área para transcripción de resultados",
    "Almacenamiento seguro de insumos y equipos"
];

export default async function GastroenterologiaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2Fgastroenterologia.jpg?alt=media"
                        alt="Gastroenterología y Endoscopia Digestiva"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="gastroenterology endoscopy"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Gastroenterología, Coloproctología y Endoscopia Digestiva</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Atención Integral para tu Salud Digestiva</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            El Servicio de Gastroenterología Clínica y Endoscopia Digestiva de la Clínica de la Costa SAS cuenta con un equipo de gastroenterólogos, coloproctólogos y personal especializado en endoscopia. Este equipo atiende tanto a pacientes de urgencias como a aquellos en consulta externa o chequeos médicos preventivos, ofreciendo diagnósticos y tratamientos de alta calidad.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Procedimientos que Realizamos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                        <CardTitle className="text-2xl text-primary flex items-center gap-3"><Hospital /> Instalaciones Especializadas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-6">
                            Nuestra unidad de gastroenterología está ubicada en el segundo piso de la sede principal y cuenta con una infraestructura diseñada bajo las normas vigentes para instituciones de salud.
                        </p>
                         <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {facilities.map((item, index) => (
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
                    specialtyName="Gastroenterólogos y Coloproctólogos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">¿Necesitas Más Información?</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo está listo para brindarte el mejor cuidado digestivo. Contáctanos para agendar una consulta.</p>
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

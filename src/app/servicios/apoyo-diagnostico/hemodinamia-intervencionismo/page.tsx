import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle, Heart } from 'lucide-react';
import type { Metadata } from 'next';
import { safeQuery } from '@/lib/firebase-helpers';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';

export const metadata: Metadata = {
    title: 'Hemodinamia y Radiología Intervencionista - Clínica de la Costa',
    description: 'Procedimientos mínimamente invasivos para el diagnóstico y tratamiento de enfermedades cardiovasculares y vasculares periféricas, con tecnología de vanguardia.',
};

async function getSpecialists(): Promise<Medico[]> {
    return safeQuery(async (db) => {
        const snapshot = await db.collection('medicos')
            .where('especialidad', 'in', ['Cardiología Intervencionista', 'Radiología Intervencionista', 'Hemodinamia'])
            .limit(5)
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    }, []);
}

const procedures = [
    { 
        title: "Cateterismo Cardíaco", 
        description: "Procedimiento diagnóstico para evaluar la función del corazón y las arterias coronarias." 
    },
    { 
        title: "Angioplastia Coronaria con Stent", 
        description: "Apertura de arterias coronarias bloqueadas para restaurar el flujo sanguíneo al corazón." 
    },
    { 
        title: "Estudios Electrofisiológicos", 
        description: "Diagnóstico y tratamiento de arritmias cardíacas." 
    },
    { 
        title: "Embolización de Tumores", 
        description: "Bloqueo del suministro de sangre a tumores para reducir su tamaño." 
    },
    { 
        title: "Manejo de ACV Isquémico", 
        description: "Extracción de coágulos cerebrales para tratar accidentes cerebrovasculares." 
    },
    { 
        title: "Tratamiento de Enfermedad Arterial Periférica", 
        description: "Angioplastia y colocación de stents en las arterias de las piernas." 
    }
];

const benefits = [
    "Recuperación más rápida en comparación con la cirugía abierta.",
    "Menor dolor postoperatorio y cicatrices más pequeñas.",
    "Reducción del riesgo de complicaciones.",
    "Procedimientos de alta precisión guiados por imágenes avanzadas.",
    "Estancias hospitalarias más cortas."
];

export default async function HemodinamiaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%204.42.37%20PM(1).jpeg?alt=media&token=a0535648-1f07-4a43-87c1-8901f530dd94"
                        alt="Sala de Hemodinamia"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="hemodynamics cath lab"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Hemodinamia y Radiología Intervencionista</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Diagnóstico y Tratamiento Mínimamente Invasivo</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La Hemodinamia y Radiología Intervencionista es una subespecialidad que utiliza técnicas mínimamente invasivas, guiadas por imágenes, para diagnosticar y tratar una amplia variedad de enfermedades cardiovasculares y vasculares. En la Clínica de la Costa, contamos con una sala de hemodinamia de última generación y un equipo de especialistas dedicados a proporcionar procedimientos seguros y efectivos que mejoran la salud de nuestros pacientes con una recuperación más rápida.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Procedimientos que Realizamos</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {procedures.map((proc) => (
                            <div key={proc.title} className="p-4 rounded-lg bg-primary/5">
                                <h3 className="font-semibold text-lg text-primary mb-2">{proc.title}</h3>
                                <p className="text-muted-foreground text-sm">{proc.description}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Beneficios para el Paciente</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </section>
            
            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Nuestros Especialistas"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Agende su Procedimiento</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo está listo para brindarle un servicio de la más alta calidad. Contáctenos para más información y para agendar su cita.</p>
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

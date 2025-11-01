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
    title: 'Atención Prehospitalaria - Clínica de la Costa',
    description: 'Respuesta rápida y efectiva en emergencias. Nuestro servicio de atención prehospitalaria garantiza asistencia médica inmediata y estabilización en situaciones críticas.',
};

async function getSpecialists(): Promise<Medico[]> { return safeQuery(async (db) => { const snapshot = await db.collection('medicos')
            .where('especialidad', 'in', ['Medicina de Emergencias', 'Medicina General'])
            .limit(5)
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    }, []); }

const services = [
    {
        title: "Respuesta inmediata",
        items: [
            "Disponibilidad las 24 horas, los 7 días de la semana.",
            "Atención para emergencias médicas, accidentes de tránsito y eventos cardiovasculares.",
            "Manejo de situaciones críticas como traumatismos graves."
        ]
    },
    {
        title: "Transporte asistencial medicalizado",
        items: [
            "Ambulancias completamente equipadas con tecnología avanzada.",
            "Soporte vital básico y avanzado durante el traslado.",
            "Personal médico capacitado para emergencias críticas."
        ]
    },
    {
        title: "Estabilización en el lugar del incidente",
        items: [
            "Diagnóstico rápido y administración de tratamientos iniciales.",
            "Uso de equipos avanzados como desfibriladores y monitores cardíacos."
        ]
    }
];


export default async function AtencionPrehospitalariaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-20%20at%203.40.56%20PM.jpeg?alt=media&token=58c3d9c0-c8e4-4252-8899-af7c2692bdec"
                        alt="Atención Prehospitalaria"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="prehospital care ambulance"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Atención Prehospitalaria</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Respuesta Rápida y Efectiva en Emergencias</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La Atención Prehospitalaria de la Clínica de la Costa SAS está diseñada para brindar asistencia médica inmediata en el lugar donde ocurre una emergencia, estabilizando al paciente antes de su traslado a un centro hospitalario. Nuestro servicio combina rapidez, eficiencia y un equipo altamente capacitado para garantizar una atención integral en situaciones críticas.
                        </p>
                    </CardContent>
                </Card>
            </section>

            <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-18%20at%202.35.13%20PM.jpeg?alt=media&token=6aae6289-d76f-4b36-b1be-59ad722a2551"
                    alt="Equipo de atención hospitalaria"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    data-ai-hint="hospital care team"
                />
            </div>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Nuestros Servicios de Atención Prehospitalaria</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <div key={service.title} className="p-4 rounded-lg bg-primary/5">
                                <h3 className="font-semibold text-lg text-primary mb-2">{service.title}</h3>
                                <ul className="space-y-2 list-disc list-inside text-muted-foreground text-sm">
                                    {service.items.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>
            
            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Nuestro Equipo"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Estamos comprometidos con la seguridad y bienestar de nuestros pacientes, brindando un servicio de atención prehospitalaria confiable y de alta calidad.</p>
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

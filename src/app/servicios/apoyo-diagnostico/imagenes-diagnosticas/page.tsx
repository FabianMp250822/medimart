import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Monitor, Radio, Bone } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Imágenes Diagnósticas - Clínica de la Costa',
    description: 'Tecnología de vanguardia para diagnósticos precisos. Ofrecemos Tomografía (TAC), Resonancia Magnética y Rayos X para un cuidado integral y confiable.',
};

const diagnosticServices = [
    {
        title: "Tomografía (TAC)",
        description: "Imágenes transversales detalladas para detectar tumores, lesiones internas y enfermedades vasculares con alta precisión.",
        url: "/servicios/apoyo-diagnostico/tomografia",
        icon: <Monitor className="h-10 w-10 text-accent" />
    },
    {
        title: "Resonancia Magnética",
        description: "Estudio avanzado de tejidos blandos, articulaciones y sistema nervioso sin radiación, ideal para diagnósticos neurológicos y musculoesqueléticos.",
        url: "/servicios/apoyo-diagnostico/resonancia-magnetica",
        icon: <Radio className="h-10 w-10 text-accent" />
    },
    {
        title: "Rayos X Convencional",
        description: "Herramienta esencial y rápida para visualizar huesos y ciertas estructuras torácicas, fundamental en traumatología y neumología.",
        url: "/servicios/apoyo-diagnostico/rayos-x",
        icon: <Bone className="h-10 w-10 text-accent" />
    }
];

export default function ImagenesDiagnosticasPage() {
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-20%20at%203.40.56%20PM.jpeg?alt=media&token=58c3d9c0-c8e4-4252-8899-af7c2692bdec"
                        alt="Imágenes Diagnósticas"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="diagnostic imaging"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Imágenes Diagnósticas</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Tecnología de Vanguardia para un Diagnóstico Preciso</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            Nuestro centro de Imágenes Diagnósticas en la Clínica de la Costa está equipado con tecnología de última generación para proporcionar a nuestros médicos la información más clara y precisa posible. Esto nos permite realizar diagnósticos tempranos, planificar tratamientos efectivos y monitorear la evolución de nuestros pacientes con la máxima confianza y seguridad.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {diagnosticServices.map((service) => (
                         <Card key={service.title} className="flex flex-col text-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardHeader>
                                <div className="mx-auto bg-accent/10 p-4 rounded-full w-fit mb-4">
                                    {service.icon}
                                </div>
                                <CardTitle className="text-xl text-primary">{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground">{service.description}</p>
                            </CardContent>
                            <div className="p-6 pt-0">
                                <Button asChild variant="outline">
                                    <Link href={service.url}>
                                        Conocer más <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

        </div>
    );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle, UserCheck, HeartHandshake } from 'lucide-react';
import type { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';
import { EntidadesConvenioSlider } from '@/components/servicios/entidades-convenio-slider';

export const metadata: Metadata = {
    title: 'Servicios de Hospitalización - Clínica de la Costa',
    description: 'Ofrecemos servicios de hospitalización para adultos y pediátricos. Atención integral con calidad, seguridad y un enfoque humano.',
    keywords: ['hospitalización', 'hospital', 'clínica', 'servicios médicos', 'cuidados intensivos', 'hospitalización pediátrica'],
    openGraph: {
        title: 'Servicios de Hospitalización - Clínica de la Costa',
        description: 'Atención integral en hospitalización para adultos y pediatría. Equipo humano, tecnología y seguridad.',
        url: '/servicios/internacion/hospitalizacion',
        siteName: 'Clínica de la Costa',
        images: [
            {
                url: 'https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fhospitalizacion.jpg?alt=media',
                width: 1200,
                height: 630,
                alt: 'Servicios de Hospitalización'
            }
        ],
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Servicios de Hospitalización - Clínica de la Costa',
        description: 'Atención integral en hospitalización para adultos y pediatría.'
    }
};


async function getSpecialists(): Promise<Medico[]> {
    try {
        if (!adminDb) {
            console.warn('adminDb no está inicializado. getSpecialists devolverá lista vacía.');
            return [];
        }
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', '==', 'Medicina Interna')
            .limit(5)
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Hospitalización: ", error);
        return [];
    }
}

const hospitalizacionServices = [
    {
        title: "Hospitalización Adultos",
        icon: <UserCheck className="h-8 w-8 text-accent" />,
        image: "https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-20%20at%203.09.31%20PM.jpeg?alt=media&token=e9ddd974-a65a-43ba-b24b-413c926ff44f",
        hint: "hospital room adult"
    },
    {
        title: "Hospitalización Pediátrica",
        icon: <HeartHandshake className="h-8 w-8 text-accent" />,
        image: "https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Funnamed.jpg?alt=media&token=94042da7-0fe5-44f5-939a-03617e485388",
        hint: "pediatric hospital room"
    }
];


export default async function HospitalizacionPage() {
    const specialists = await getSpecialists();
    const lastUpdated = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });

    const hospitalJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Hospital',
        'name': 'Clínica de la Costa',
        'description': metadata.description,
        'department': {
            '@type': 'MedicalDepartment',
            'name': 'Servicio de Hospitalización'
        }
    };

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
            {
                '@type': 'Question',
                'name': '¿Cómo solicito una habitación de hospitalización? ',
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'Puede solicitar hospitalización a través de nuestro formulario de contacto o llamando al número de atención. También puede solicitar cita desde la sección de especialistas para valoración previa.'
                }
            },
            {
                '@type': 'Question',
                'name': '¿Atienden pacientes pediátricos?',
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'Sí, contamos con hospitalización pediátrica con personal especializado.'
                }
            }
        ]
    };
    
    return (
        <div className="space-y-12">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([hospitalJsonLd, faqJsonLd]) }} />

            <div className="text-sm text-muted-foreground flex justify-end gap-4 pr-4">
                <span>Última actualización: <strong>{lastUpdated}</strong></span>
                <span>Especialistas disponibles: <strong>{specialists.length}</strong></span>
            </div>
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%206.31.54%20PM.jpeg?alt=media&token=128385f5-0c3a-452c-9183-439023b2c3a0"
                        alt="Servicios de Hospitalización"
                        fill
                        style={{ objectFit: 'cover' }}
                        className="z-0"
                        data-ai-hint="hospitalization services"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Servicios de Hospitalización</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Cuidado Humano y de Calidad</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            Contamos con un equipo humano dedicado y comprometido a servir a los usuarios con una atención personalizada y especializada con calidad y amor, alto nivel de conocimientos y experiencia; apoyados tecnológicamente para el diagnóstico y tratamiento de las enfermedades.
                        </p>
                        <p>
                            Uno de nuestros principales objetivos es la seguridad y comodidad en las instalaciones; por esto contamos con la más amplia capacidad en habitaciones. La Unidad de Hospitalización apoya los servicios de Urgencias, Cirugía y Consulta Externa, con personal idóneo y calificado dentro del marco de la directriz médico–asistencial que nos orienta a la <strong>"Atención integral en salud con oportunidad, eficiencia y calidad”.</strong>
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <section>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {hospitalizacionServices.map((service) => (
                        <Card key={service.title} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                            <div className="relative h-64 w-full">
                                <Image 
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    data-ai-hint={service.hint}
                                    className="transition-transform duration-300 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    {service.icon}
                                    <h3 className="text-2xl font-bold text-primary">{service.title}</h3>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Ambiente y Capacidad</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                       <p>
                         El área de hospitalización ofrece un ambiente cómodo y seguro para la recuperación de los pacientes, con un equipo médico y de enfermería altamente capacitado y tecnología de punta para el monitoreo continuo. Con 156 camas de hospitalización y 48 camas en la Unidad de Cuidados Intensivos, brindamos una atención integral en salud que garantiza eficiencia y calidad en cada etapa del proceso médico.
                       </p>
                    </CardContent>
                </Card>
            </section>

            <EntidadesConvenioSlider />

            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Médicos Internistas"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">¿Necesitas Más Información?</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo de hospitalización está listo para brindarte la mejor atención. Contáctanos para más detalles o explora nuestro directorio de especialistas.</p>
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

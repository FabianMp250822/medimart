import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, Stethoscope, CheckCircle, HeartHandshake } from 'lucide-react';
import type { Metadata } from 'next';
import { safeQuery } from '@/lib/firebase-helpers';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';
import { getServiceMetadata } from '@/lib/services-metadata';
import { generateServiceMetadata } from '@/lib/metadata-helpers';
import { generateMedicalServiceSchema } from '@/lib/structured-data';

const serviceData = getServiceMetadata('atencion-vih')!;

export const metadata: Metadata = generateServiceMetadata(serviceData);

async function getSpecialists(): Promise<Medico[]> {
    return safeQuery(async (db) => {
        const snapshot = await db.collection('medicos')
            .where('especialidad', '==', serviceData.specialty)
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    }, []);
}

const specializedServices = [
    "Psicología clínica especializada", "Psiquiatría", "Medicina Interna",
    "Infectología (Adultos y Pediátrica)", "Medicina General", "Nutrición",
    "Enfermería", "Trabajo Social", "Vacunación",
    "Servicio Farmacéutico con central de mezclas certificada",
    "Transporte Asistencial Medicalizado"
];

const healthPromotionAreas = [
    "Consulta especializada con equipo interdisciplinario.",
    "Apoyo diagnóstico y terapéutico.",
    "Servicio farmacéutico especializado.",
    "Promoción y prevención a través de educación continua y vacunación.",
    "Grupos de apoyo para pacientes y familias."
];

const comprehensiveCarePoints = [
    "Asesoría previa y posterior a pruebas diagnósticas.",
    "Consultas especializadas en infectología y medicina interna.",
    "Remisiones para hospitalización y urgencias en casos especiales.",
    "Coordinación de servicios y orientación sobre derechos y deberes.",
    "Servicios complementarios como terapia asistida y seguimiento farmacoterapéutico."
];

export default async function VIHPage() {
    const specialists = await getSpecialists();
    
    const serviceSchema = generateMedicalServiceSchema({
        name: serviceData.name,
        description: serviceData.description,
        url: `https://clinica-de-la-costa.app/${serviceData.slug}`,
        alternateName: serviceData.searchTerms
    });
    
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <div className="space-y-12">
                <Card className="overflow-hidden">
                    <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%206.31.54%20PM.jpeg?alt=media&token=128385f5-0c3a-452c-9183-439023b2c3a0"
                        alt="Programa de Atención Integral VIH"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="support group"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Programa de Atención Integral para Pacientes con VIH/SIDA</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Un Enfoque Humano y Profesional</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La Clínica de la Costa SAS ofrece un servicio integral con altos estándares de calidad, enfocado en la atención, prevención y control del VIH/SIDA. Con un equipo multidisciplinario altamente capacitado, este programa busca mejorar la calidad de vida de los pacientes y sus familias, a través de un enfoque humano y profesional.
                        </p>
                    </CardContent>
                </Card>
            </section>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Servicios Especializados</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {specializedServices.map((service, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                    <span>{service}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Áreas y Promoción de la Salud</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-3">
                            {healthPromotionAreas.map((area, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                    <span>{area}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary flex items-center gap-3"><HeartHandshake /> Atención Integral y Acompañamiento</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-6">
                            Nuestro equipo multidisciplinario acompaña al paciente en todas las etapas del tratamiento, ofreciendo:
                        </p>
                        <ul className="space-y-3">
                            {comprehensiveCarePoints.map((point, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </section>

            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Especialistas en Infectología"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo está listo para brindarte el apoyo y la atención que necesitas. Contáctanos para conocer más sobre nuestro programa de VIH/SIDA.</p>
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
        </>
    );
}

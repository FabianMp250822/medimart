import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, Stethoscope, CheckCircle, ShieldCheck, User, Baby } from 'lucide-react';
import type { Metadata } from 'next';
import { safeQuery } from '@/lib/firebase-helpers';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';
import { getServiceMetadata } from '@/lib/services-metadata';
import { generateServiceMetadata } from '@/lib/metadata-helpers';
import { generateMedicalServiceSchema } from '@/lib/structured-data';

const serviceData = getServiceMetadata('cuidado-critico')!;

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

const uciUnits = [
    {
        title: "Unidad Coronaria",
        description: "14 camas con monitoreo continuo, soporte vital avanzado y tecnología de punta para pacientes con enfermedades coronarias.",
        icon: <Stethoscope className="h-8 w-8 text-accent" />
    },
    {
        title: "UCI Adultos",
        description: "Atención integral a pacientes críticos con patologías complejas como insuficiencia renal, neurológica y postquirúrgica.",
        icon: <Users className="h-8 w-8 text-accent" />
    },
    {
        title: "UCI Neonatal y Pediátrica",
        description: "Monitoreo avanzado y programas personalizados para recién nacidos y niños en estado crítico.",
        icon: <Baby className="h-8 w-8 text-accent" />
    }
];

const personalFeatures = [
    "Formación continua en educación médica.",
    "Capacitación en ACLS (Advanced Cardiac Life Support).",
    "Especialización en áreas como neurocirugía, nefrointensivismo y trauma."
];

const ginecologiaServices = [
    "Atención de embarazo normal y de alto riesgo.",
    "Control prenatal con monitoreo avanzado.",
    "Diagnósticos como perfil biofísico fetal y amniocentesis.",
    "Cirugías ginecológicas especializadas."
];

export default async function CuidadoCriticoPage() {
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
                        alt="Cuidado Crítico"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="critical care unit"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Cuidado Crítico y Unidades Especializadas</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Atención Integral para Pacientes en Estado Crítico</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            En la Clínica de la Costa SAS, contamos con un servicio especializado en Medicina Crítica y Unidades de Cuidado Intensivo (UCI) que abarca atención a pacientes adultos, pediátricos y neonatales en estado crítico. Nuestras unidades están equipadas con tecnología de punta y son atendidas por un equipo interdisciplinario capacitado para garantizar una atención integral y de calidad las 24 horas del día.
                        </p>
                    </CardContent>
                </Card>
            </section>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Nuestras Unidades de Cuidado Intensivo (UCI)</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-3 gap-6">
                        {uciUnits.map((unit) => (
                            <div key={unit.title} className="p-4 rounded-lg bg-primary/5 flex items-start gap-4">
                                <div>{unit.icon}</div>
                                <div>
                                    <h3 className="font-semibold text-lg text-primary">{unit.title}</h3>
                                    <p className="text-muted-foreground text-sm mt-1">{unit.description}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Personal Altamente Capacitado</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <p className="text-muted-foreground mb-4">Nuestro equipo médico y de enfermería se distingue por su:</p>
                        <ul className="space-y-3">
                            {personalFeatures.map((feature, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Ginecología, Obstetricia y Maternidad</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">Ofrecemos un cuidado completo para la mujer en todas las etapas:</p>
                         <ul className="space-y-3">
                            {ginecologiaServices.map((service, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                    <span>{service}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
            <section className="text-center">
                 <div className="relative h-96 w-full rounded-lg overflow-hidden">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-20%20at%209.10.01%20AM.jpeg?alt=media&token=89506541-c55f-44f6-8d77-b64301cf8550"
                        alt="Equipo de Cuidado Crítico"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                        data-ai-hint="critical care team"
                    />
                </div>
                <p className="text-foreground text-lg italic mt-4">
                    Nuestra prioridad es ofrecer una atención integral, humanizada y de alta calidad.
                </p>
            </section>

            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Especialistas en Cuidado Crítico"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">¿Necesitas Más Información?</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo de Cuidado Crítico está preparado para atenderte. Contáctanos para más detalles o explora nuestro directorio de especialistas.</p>
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

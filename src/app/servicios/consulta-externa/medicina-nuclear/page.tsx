import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Users, CheckCircle, Heart, Bone, Syringe, Radio, BrainCircuit, Dna, ShieldCheck, Stethoscope, Clock, BookUser, Building, Handshake, Award } from 'lucide-react';
import type { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata: Metadata = {
    title: 'Medicina Nuclear - Clínica de la Costa',
    description: 'Servicios diagnósticos y terapéuticos de la más alta calidad con tecnología de vanguardia y un equipo médico especializado en Medicina Nuclear.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', '==', 'Medicina Nuclear')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Medicina Nuclear: ", error);
        return [];
    }
}

const diagnosticServices = [
    {
        category: "Cardiología Nuclear",
        icon: <Heart className="h-5 w-5" />,
        studies: [
            { name: "Perfusión Miocárdica (SPECT)", indications: "Diagnóstico de enfermedad arterial coronaria, evaluación de viabilidad miocárdica." },
            { name: "Ventriculografía Isotópica (MUGA)", indications: "Evaluación de función ventricular, seguimiento de cardiotoxicidad." }
        ]
    },
    {
        category: "Endocrinología Nuclear",
        icon: <Dna className="h-5 w-5" />,
        studies: [
            { name: "Gammagrafía de Tiroides", indications: "Evaluación de nódulos tiroideos, hipertiroidismo, cáncer de tiroides." },
            { name: "Captación de Yodo Radiactivo (RAIU)", indications: "Diagnóstico diferencial de hipertiroidismo." },
            { name: "Gammagrafía de Paratiroides", indications: "Localización de adenomas paratiroideos." }
        ]
    },
    {
        category: "Sistema Óseo",
        icon: <Bone className="h-5 w-5" />,
        studies: [
            { name: "Gammagrafía Ósea", indications: "Detección de metástasis óseas, infecciones, fracturas." },
            { name: "Gammagrafía Ósea Trifásica", indications: "Osteomielitis, síndrome de dolor regional complejo." }
        ]
    },
    {
        category: "Sistema Genitourinario",
        icon: <Syringe className="h-5 w-5" />,
        studies: [
            { name: "Renograma Diurético", indications: "Evaluación de obstrucción urinaria, función renal diferencial." },
            { name: "Gammagrafía Renal Estática (DMSA)", indications: "Evaluación de cicatrices renales, función renal diferencial." },
            { name: "Cistogammagrafía Directa", indications: "Detección de reflujo vesicoureteral." }
        ]
    },
     {
        category: "Neurología y Oncología",
        icon: <BrainCircuit className="h-5 w-5" />,
        studies: [
            { name: "SPECT Cerebral de Perfusión", indications: "Demencia, epilepsia, accidente cerebrovascular." },
            { name: "Gammagrafía con Octreótido (SomatoScan)", indications: "Detección de tumores neuroendocrinos." },
            { name: "Gammagrafía con Galio-67", indications: "Detección de procesos inflamatorios e infecciosos." }
        ]
    },
     {
        category: "Otros Sistemas",
        icon: <Stethoscope className="h-5 w-5" />,
        studies: [
            { name: "Gammagrafía Pulmonar de Ventilación/Perfusión (V/Q)", indications: "Diagnóstico de tromboembolismo pulmonar." },
            { name: "Gammagrafía de Vaciamiento Gástrico", indications: "Evaluación de gastroparesia, trastornos de motilidad." },
            { name: "Gammagrafía Hepatoesplénica", indications: "Evaluación de función hepatocelular, masas hepáticas." },
            { name: "Detección de Sangrado Gastrointestinal", indications: "Localización de sangrado gastrointestinal activo." }
        ]
    }
];

const therapeuticServices = [
    { title: "Yodo Radiactivo (I-131) para Hipertiroidismo", indications: "Enfermedad de Graves, bocio multinodular tóxico." },
    { title: "Yodo Radiactivo (I-131) para Cáncer de Tiroides", indications: "Ablación de remanente tiroideo post-tiroidectomía." },
    { title: "Radiosinoviortesis", indications: "Artritis reumatoide, sinovitis crónica." }
];

const patientInfo = [
    { title: "Antes del Estudio", details: ["Programación de citas: Llamar con 48 horas de anticipación.", "Instrucciones específicas se proporcionan según el estudio.", "Consultar sobre suspensión temporal de medicamentos.", "Informar sobre embarazo/lactancia al programar."] },
    { title: "Durante el Procedimiento", details: ["Duración variable.", "Molestias mínimas en la mayoría de los casos.", "Acompañante permitido según protocolo.", "Comunicación constante con el personal médico."] },
    { title: "Después del Estudio", details: ["Se entregan instrucciones post-procedimiento.", "Precauciones radiológicas cuando sea necesario.", "Resultados disponibles en 24-48 horas.", "Seguimiento médico según indicación."] }
];

export default async function MedicinaNuclearPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-20%20at%209.31.29%20AM.jpeg?alt=media&token=328a483e-a5ad-43da-aba7-397182223a5d"
                        alt="Medicina Nuclear"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="nuclear medicine"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Medicina Nuclear</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Diagnóstico y Terapia de Vanguardia</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La Unidad de Medicina Nuclear de Clínica de la Costa cuenta con tecnología de punta y un equipo médico especializado para brindar servicios diagnósticos y terapéuticos de la más alta calidad. Nuestro compromiso es ofrecer atención integral con los más altos estándares de seguridad radiológica y excelencia médica.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Servicios Diagnósticos</CardTitle>
                        <CardDescription>Utilizamos radiofármacos para obtener imágenes funcionales del cuerpo y detectar enfermedades en sus etapas iniciales.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Tabs defaultValue={diagnosticServices[0].category} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto">
                                {diagnosticServices.map((service) => (
                                <TabsTrigger key={service.category} value={service.category} className="flex flex-col sm:flex-row gap-2 items-center justify-center py-2">
                                    {service.icon}
                                    <span className="text-xs sm:text-sm">{service.category}</span>
                                </TabsTrigger>
                                ))}
                            </TabsList>
                            {diagnosticServices.map((service) => (
                                <TabsContent key={service.category} value={service.category} className="mt-6">
                                    <Card>
                                        <CardContent className="p-6">
                                            <ul className="space-y-4">
                                                {service.studies.map(study => (
                                                    <li key={study.name} className="pb-4 border-b last:border-b-0 last:pb-0">
                                                        <p className="font-semibold text-primary">{study.name}</p>
                                                        <p className="text-sm text-muted-foreground mt-1">{study.indications}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </CardContent>
                </Card>
            </section>

             <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Servicios Terapéuticos</CardTitle>
                        <CardDescription>Tratamientos dirigidos que utilizan dosis terapéuticas de material radiactivo para tratar diversas enfermedades.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {therapeuticServices.map(service => (
                             <div key={service.title} className="p-4 rounded-lg bg-primary/5">
                                <h3 className="font-semibold text-lg text-primary mb-1">{service.title}</h3>
                                <p className="text-sm text-muted-foreground">{service.indications}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary flex items-center gap-3"><BookUser/> Información para Pacientes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {patientInfo.map(info => (
                             <div key={info.title} className="mb-4">
                                <h4 className="font-semibold text-primary">{info.title}</h4>
                                <ul className="list-disc list-inside text-sm text-muted-foreground mt-1 space-y-1">
                                    {info.details.map((detail, index) => <li key={index}>{detail}</li>)}
                                </ul>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary flex items-center gap-3"><ShieldCheck /> Seguridad y Calidad</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                           Nuestra unidad está comprometida con la excelencia y la seguridad del paciente:
                        </p>
                         <ul className="space-y-3">
                            <li className="flex items-start gap-3"><Award className="h-5 w-5 text-accent mt-1" /><span>Cumplimiento estricto de normativas de radioprotección.</span></li>
                            <li className="flex items-start gap-3"><Award className="h-5 w-5 text-accent mt-1" /><span>Control de calidad diario de equipos y radiofármacos.</span></li>
                            <li className="flex items-start gap-3"><Award className="h-5 w-5 text-accent mt-1" /><span>Personal altamente calificado y en formación continua.</span></li>
                             <li className="flex items-start gap-3"><Award className="h-5 w-5 text-accent mt-1" /><span>Acreditaciones y licencias del Ministerio de Salud y el IDEAM.</span></li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Especialistas en Medicina Nuclear"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo de Medicina Nuclear está listo para brindarte el mejor cuidado. Contáctanos para programar tu cita o resolver tus dudas.</p>
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

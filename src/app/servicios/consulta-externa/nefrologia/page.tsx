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
    title: 'Nefrología - Clínica de la Costa',
    description: 'Especialistas en el diagnóstico y tratamiento de pacientes renales, con un enfoque integral que incluye orientación para pacientes y familias.',
};

async function getSpecialists(): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos')
            .where('especialidad', '==', 'Nefrología')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    } catch (error) {
        console.error("Error fetching specialists for Nefrología: ", error);
        return [];
    }
}

const attentionAreas = [
    "Respuesta de interconsultas.",
    "Hospitalización en nefrología clínica general.",
    "Unidad de hemodiálisis aguda.",
    "Diálisis intrahospitalaria – Nefrointensivismo.",
    "Atención de pacientes en UCI.",
    "Toma de biopsia.",
    "Valoración por consulta externa.",
    "Hemodiálisis aguda.",
    "Diálisis peritoneal aguda.",
    "Terapias de reemplazo renal continuo."
];

const renalUnitServices = [
    { title: "Hemodiálisis intermitente", description: "" },
    { title: "Terapias de reemplazo renal continuo", description: "(hemodiafiltración, hemofiltración)." },
    { title: "Diálisis peritoneal", description: "" },
    { title: "Plasmaféresis", description: "" }
];

const differentialFactors = [
    "Equipo humano con amplia experiencia en el manejo de pacientes renales.",
    "Atención especializada para pacientes pediátricos.",
    "Productos de alta calidad y biocompatibles.",
    "Circuito cerrado de suministro de solución ácida y bicarbonato.",
    "Acceso a servicios complementarios como imágenes diagnósticas, laboratorio clínico y farmacéutico de alta complejidad."
];


export default async function NefrologiaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fnefro.webp?alt=media&token=ca179fa3-0784-45b6-b2f1-c48ebed387d2"
                        alt="Programa de Nefrología"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="nephrology care"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Nefrología</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Especialistas en el Cuidado Renal</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            En la Clínica de la Costa SAS, nuestro programa de nefrología se enfoca en atender patologías como el lupus, con un enfoque integral que incluye orientación y educación tanto para los pacientes como para sus familias. Además, somos especialistas en el diagnóstico y tratamiento de pacientes renales, ofreciendo soluciones personalizadas para cada necesidad.
                        </p>
                    </CardContent>
                </Card>
            </section>

             <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-20%20at%203.40.56%20PM.jpeg?alt=media&token=58c3d9c0-c8e4-4252-8899-af7c2692bdec"
                    alt="Atención Hospitalaria de Nefrología"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    data-ai-hint="nephrology hospital care"
                />
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Áreas de Atención</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {attentionAreas.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Unidad Renal y Terapias</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Contamos con personal altamente calificado y tecnología de punta para realizar terapias de soporte renal a pacientes críticamente enfermos, así como a aquellos con enfermedad renal crónica.
                        </p>
                        <ul className="space-y-3">
                           {renalUnitServices.map((service, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                    <span><strong>{service.title}</strong> {service.description}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Factores Diferenciales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {differentialFactors.map((item, index) => (
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
                    specialtyName="Nuestros Nefrólogos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo de nefrología está listo para brindarte el mejor cuidado. Contáctanos para conocer más sobre nuestros programas de atención renal.</p>
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

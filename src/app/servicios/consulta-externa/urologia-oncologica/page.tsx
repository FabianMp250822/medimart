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
    title: 'Urología Oncológica - Clínica de la Costa',
    description: 'Atención especializada para pacientes con cáncer urológico. Ofrecemos diagnóstico y tratamiento para cáncer de riñón, vejiga, próstata y más.',
};

async function getSpecialists(): Promise<Medico[]> { return safeQuery(async (db) => { const snapshot = await db.collection('medicos')
            .where('especialidad', '==', 'Urología Oncológica')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    }, []); }

const conditions = [
    "Cáncer de riñón: Tumores malignos que afectan el sistema renal.",
    "Cáncer de vejiga: Tratamiento de tumores superficiales e invasivos.",
    "Cáncer de próstata: Abordado con enfoques modernos y efectivos.",
    "Cáncer testicular: Manejo quirúrgico y seguimiento especializado.",
    "Cáncer de pene y glándulas suprarrenales."
];

const specializedServices = [
    { title: "Diagnóstico Avanzado", description: "Resonancia magnética, tomografía, biopsias guiadas y análisis genéticos." },
    { title: "Tratamientos Quirúrgicos", description: "Cirugía laparoscópica, prostatectomía radical, nefrectomía parcial, y más." },
    { title: "Terapias Complementarias", description: "Inmunoterapia, quimioterapia, radioterapia y terapia hormonal." }
];

export default async function UrologiaOncologicaPage() {
    const specialists = await getSpecialists();
    
    return (
        <div className="space-y-12">
            <Card className="overflow-hidden">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2Furologia-oncologica.jpg?alt=media"
                        alt="Urología Oncológica"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="oncology urology"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
                        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">Urología Oncológica</h1>
                    </div>
                </div>
            </Card>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Atención Especializada para Pacientes con Cáncer Urológico</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La urología oncológica es una subespecialidad que se enfoca en el diagnóstico, tratamiento y seguimiento de los tumores malignos que afectan el sistema genitourinario. En la Clínica de la Costa SAS, contamos con un servicio integral de urología oncológica, diseñado para brindar un manejo multidisciplinario y personalizado a cada paciente.
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-18%20at%202.35.13%20PM.jpeg?alt=media&token=6aae6289-d76f-4b36-b1be-59ad722a2551"
                    alt="Atención Hospitalaria de Urología Oncológica"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    data-ai-hint="oncology hospital care"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Condiciones Tratadas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {conditions.map((item, index) => (
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
                        <CardTitle className="text-2xl text-primary">Equipo Multidisciplinario</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                           En nuestra unidad trabajamos con especialistas como urólogos oncológicos, oncólogos clínicos, radioterapeutas, nutricionistas y psicólogos, asegurando un tratamiento integral y humanizado.
                        </p>
                    </CardContent>
                </Card>
            </div>
            
             <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Servicios Especializados</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {specializedServices.map((service) => (
                            <div key={service.title} className="p-4 rounded-lg bg-primary/5">
                                <h3 className="font-semibold text-lg text-primary mb-2">{service.title}</h3>
                                <p className="text-muted-foreground text-sm">{service.description}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>

            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Urólogos Oncólogos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">Contáctenos para Más Información</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestra prioridad es ofrecer un servicio de urología oncológica de excelencia, combinando innovación, experiencia y atención personalizada.</p>
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

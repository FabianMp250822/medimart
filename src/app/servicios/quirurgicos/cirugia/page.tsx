import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Phone, Users, Hospital, Stethoscope, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { safeQuery } from '@/lib/firebase-helpers';
import { Medico } from '@/types/medico';
import { RelatedSpecialists } from '@/components/servicios/related-specialists';
import { CirugiaContent } from '@/components/servicios/quirurgicos/cirugia-content';

export const metadata: Metadata = {
    title: 'Servicios Quirúrgicos y Cirugía Ambulatoria - Clínica de la Costa',
    description: 'Con 6 salas de cirugía equipadas con tecnología de última generación, ofrecemos una amplia gama de procedimientos quirúrgicos seguros y de alta calidad, tanto ambulatorios como hospitalarios.',
};

async function getSpecialists(): Promise<Medico[]> {
    return safeQuery(async (db) => {
        const snapshot = await db.collection('medicos')
            .where('especialidad', 'in', ['Cirugía General', 'Neurocirugía', 'Cirugía Plástica'])
            .limit(10)
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }));
    }, []);
}

const ambulatoryBenefits = [
    "Reincorporación rápida a la vida habitual.",
    "Procedimientos quirúrgicos seguros sin necesidad de hospitalización.",
    "Menor riesgo de infección.",
    "Disminución de la ansiedad.",
    "Atención personalizada y seguimiento postoperatorio."
];

const surgicalServices = [
    "Cirugía de cabeza y cuello", "Cirugía cardiovascular", "Cirugía general", "Cirugía ginecológica",
    "Cirugía maxilofacial", "Cirugía oftalmológica", "Cirugía otorrinolaringológica", "Cirugía oncológica",
    "Cirugía oral", "Cirugía pediátrica", "Cirugía plástica y estética", "Cirugía de la mano", "Cirugía de tórax",
    "Neurocirugía"
];

export default async function CirugiaPage() {
    const specialists = await getSpecialists();

    return (
        <div className="space-y-12">
            <CirugiaContent />

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary flex items-center gap-3"><Hospital /> Infraestructura de Vanguardia</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <p>
                            La Clínica de la Costa cuenta con 6 salas de cirugía integradas y equipadas con tecnología de última generación que garantiza una versatilidad del 100% en toda la gama de complejidad. Nuestras instalaciones incluyen:
                        </p>
                        <ul>
                            <li>1 quirófano destinado a cirugías gineco-obstétricas.</li>
                            <li>1 quirófano para cirugía cardiovascular.</li>
                            <li>4 quirófanos para diversas especialidades, incluyendo técnicas mínimamente invasivas y endoscópicas.</li>
                        </ul>
                        <p>
                            Todas las salas están dotadas con sistema automatizado de control de humedad, flujo de aire laminar para disminuir el riesgo de infecciones, máquinas de anestesia de última generación y sistemas de monitoreo del paciente (invasivos y no invasivos).
                        </p>
                    </CardContent>
                </Card>
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Cirugía Ambulatoria</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-6">
                            Este servicio está diseñado para garantizar una atención integral que inicia desde la evaluación del paciente por las especialidades involucradas hasta el seguimiento telefónico posterior al egreso, ofreciendo múltiples beneficios.
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {ambulatoryBenefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </section>

             <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Nuestras Especialidades Quirúrgicas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-6">
                            La clínica ofrece una amplia gama de procedimientos quirúrgicos, que abarcan las siguientes especialidades:
                        </p>
                        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                           {surgicalServices.map((service, index) => (
                               <li key={index} className="flex items-start gap-3">
                                   <Stethoscope className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                                   <span>{service}</span>
                               </li>
                           ))}
                        </ul>
                    </CardContent>
                </Card>
            </section>

            {specialists.length > 0 && (
                <RelatedSpecialists
                    specialists={specialists}
                    specialtyName="Nuestros Cirujanos"
                />
            )}

            <section className="text-center bg-primary/5 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-primary">¿Necesitas Más Información?</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Nuestro equipo quirúrgico está listo para ofrecerte una atención segura y de calidad. Contáctanos para más detalles o explora nuestro directorio de especialistas.</p>
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

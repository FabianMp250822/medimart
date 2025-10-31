import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeCheck, Building } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Certificaciones y Acreditaciones - Clínica de la Costa',
  description: 'Conozca las certificaciones INVIMA y acreditaciones en gestión de calidad que avalan la excelencia y seguridad de nuestros servicios en Barranquilla, Cartagena, Riohacha y Santa Marta.',
};

const certificaciones = [
    {
        title: 'Norma ISO 9001:2015',
        description: 'Certificación otorgada por Icontec que avala nuestro sistema de gestión de calidad basado en estándares internacionales. Esta norma garantiza que nuestros procesos están orientados a la satisfacción del cliente y la mejora continua.',
        organismo: 'Icontec'
    },
    {
        title: 'Certificación en Buenas Prácticas Clínicas (BPC)',
        description: 'Otorgada por el INVIMA, esta certificación valida que cumplimos con los estándares internacionales en investigación clínica y atención a pacientes, garantizando la protección de los derechos, seguridad y bienestar de los participantes en estudios clínicos.',
        organismo: 'INVIMA'
    },
    {
        title: 'Certificación en Buenas Prácticas de Elaboración (BPE)',
        description: 'Certificación otorgada por el INVIMA que avala que nuestros procesos de elaboración y preparación de medicamentos cumplen con los más altos estándares de calidad, seguridad e higiene.',
        organismo: 'INVIMA'
    },
    {
        title: 'INVIMA (Instituto Nacional de Vigilancia de Medicamentos y Alimentos)',
        description: 'La certificación del INVIMA valida que nuestros procesos y servicios de salud cumplen rigurosamente con las normativas nacionales de vigilancia y control sanitario. Esto garantiza la seguridad de nuestros pacientes en cada procedimiento.',
        organismo: 'INVIMA'
    },
    {
        title: 'Acreditación en Gestión de Calidad',
        description: 'Poseemos una acreditación que demuestra que nuestro sistema de gestión de calidad cumple con altos estándares. En la Clínica de la Costa, esto se traduce en prácticas estandarizadas, procesos optimizados y una atención eficiente y de máxima calidad, siempre enfocada en la mejora continua y la satisfacción del paciente.',
        organismo: 'Entidad Certificadora'
    },
    {
        title: 'Aval Internacional a la Excelencia',
        description: 'Formamos parte de una red internacional de organizaciones reconocidas por su excelencia. Este aval refuerza nuestro compromiso con mantener los más altos estándares de calidad y nos impulsa a tener un sistema de gestión transparente, eficaz y en constante evolución.',
        organismo: 'Red Internacional'
    }
];

const sedes = ['Barranquilla', 'Cartagena', 'Riohacha', 'Santa Marta'];

export default function CertificacionesPage() {
  return (
    <div className="space-y-8">
        <div className="text-center">
            <BadgeCheck className="mx-auto h-16 w-16 text-accent mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Nuestras Certificaciones</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Compromiso con la calidad y la seguridad, respaldado por organismos reconocidos.
            </p>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <BadgeCheck />
                    Calidad Certificada
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
               {certificaciones.map((cert, index) => (
                 <div key={index} className="border-l-4 border-accent pl-4 py-2">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1">
                            <h3 className="font-semibold text-lg text-foreground">{cert.title}</h3>
                            {cert.organismo && (
                                <span className="text-sm text-accent font-medium">Otorgada por: {cert.organismo}</span>
                            )}
                            <p className="text-muted-foreground mt-2">{cert.description}</p>
                        </div>
                    </div>
                 </div>
               ))}
               
               <div className="mt-8 p-6 bg-accent/5 rounded-lg border-2 border-accent/20">
                    <p className="text-center text-foreground font-medium">
                        Estas certificaciones respaldan nuestro <strong className="text-accent">compromiso con la calidad, la seguridad y la mejora continua</strong> en todos nuestros procesos institucionales.
                    </p>
               </div>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <Building />
                    Disponible en las sedes
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-4">
                    {sedes.map(sede => (
                        <div key={sede} className="bg-accent/10 text-accent font-medium px-4 py-2 rounded-full">
                            {sede}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    </div>
  );
}

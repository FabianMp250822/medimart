import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Compass } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Direccionamiento Estratégico - Clínica de la Costa',
  description: 'Conozca los pilares de nuestro direccionamiento estratégico y cómo guiamos a la clínica hacia el futuro de la salud.',
};

export default function DireccionamientoEstrategicoPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
            <Compass className="mx-auto h-16 w-16 text-accent mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Direccionamiento Estratégico</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Nuestra hoja de ruta para un futuro de excelencia en salud.
            </p>
        </div>
        
        <main className="mt-12">
            <Card>
                <CardHeader>
                    <CardTitle>Nuestros Pilares Estratégicos</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                    <p>
                        El direccionamiento estratégico de la Clínica de la Costa se fundamenta en una visión clara y objetivos definidos que guían todas nuestras decisiones y acciones. Nuestro plan estratégico se centra en los siguientes pilares fundamentales:
                    </p>
                    <ul>
                        <li><strong>Excelencia Clínica y Seguridad del Paciente:</strong> Implementar y mantener los más altos estándares de calidad y seguridad en todos nuestros servicios.</li>
                        <li><strong>Experiencia del Paciente y su Familia:</strong> Diseñar y ofrecer una experiencia de atención humanizada, cálida y centrada en las necesidades de nuestros pacientes.</li>
                        <li><strong>Innovación y Transformación Digital:</strong> Adoptar tecnologías de vanguardia para mejorar la eficiencia operativa, el diagnóstico y el tratamiento.</li>
                        <li><strong>Sostenibilidad y Crecimiento:</strong> Asegurar la viabilidad a largo plazo de la clínica a través de una gestión financiera responsable y la expansión estratégica de servicios.</li>
                        <li><strong>Desarrollo del Talento Humano:</strong> Fomentar un ambiente de trabajo que promueva el crecimiento profesional, el bienestar y el compromiso de nuestro equipo.</li>
                    </ul>
                </CardContent>
            </Card>
        </main>
      </div>
    </div>
  );
}

import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sistema Integrado de Gestión - Clínica de la Costa',
  description: 'Conozca nuestro Sistema Integrado de Gestión (SIG), que garantiza la calidad, seguridad y eficiencia de nuestros procesos.',
};

export default function SistemaIntegradoPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
            <ShieldCheck className="mx-auto h-16 w-16 text-accent mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Sistema Integrado de Gestión</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Garantizando la calidad y seguridad en todo lo que hacemos.
            </p>
        </div>
        
        <main className="mt-12">
            <Card>
                <CardHeader>
                    <CardTitle>Nuestro Enfoque en la Calidad Total</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                    <p>
                        El Sistema Integrado de Gestión (SIG) de la Clínica de la Costa es el conjunto de políticas, procesos y procedimientos que nos permiten gestionar de manera unificada y eficiente la calidad de nuestros servicios, la seguridad y salud en el trabajo, y nuestro impacto ambiental.
                    </p>
                     <p>
                        Nuestro SIG está diseñado para asegurar la mejora continua y el cumplimiento de los más altos estándares, integrando diferentes sistemas de gestión para funcionar como un todo coherente. Los componentes principales de nuestro SIG incluyen:
                    </p>
                    <ul>
                        <li><strong>Gestión de la Calidad:</strong> Enfocado en la satisfacción del paciente y la excelencia en la prestación de servicios.</li>
                        <li><strong>Seguridad y Salud en el Trabajo:</strong> Comprometidos con la protección de nuestro personal y la prevención de riesgos laborales.</li>
                        <li><strong>Gestión Ambiental:</strong> Minimizando nuestro impacto en el medio ambiente a través de prácticas sostenibles.</li>
                         <li><strong>Seguridad del Paciente:</strong> Implementando barreras y prácticas seguras para minimizar los riesgos durante la atención.</li>
                    </ul>
                </CardContent>
            </Card>
        </main>
      </div>
    </div>
  );
}

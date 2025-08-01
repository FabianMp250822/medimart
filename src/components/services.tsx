import { Stethoscope, HeartPulse, Microscope, Pill } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    icon: <Stethoscope className="h-10 w-10 text-accent" />,
    title: 'Consultas Generales',
    description: 'Atención médica primaria para toda la familia. Diagnóstico y tratamiento de enfermedades comunes.',
  },
  {
    icon: <HeartPulse className="h-10 w-10 text-accent" />,
    title: 'Urgencias Médicas 24/7',
    description: 'Servicio de urgencias disponible las 24 horas del día, los 7 días de la semana.',
  },
  {
    icon: <Microscope className="h-10 w-10 text-accent" />,
    title: 'Laboratorio Clínico y Pruebas',
    description: 'Análisis clínicos y pruebas diagnósticas con tecnología de punta para resultados precisos y rápidos.',
  },
  {
    icon: <Pill className="h-10 w-10 text-accent" />,
    title: 'Farmacia y Suministros Médicos',
    description: 'Amplia gama de medicamentos y suministros médicos para su conveniencia y tratamiento.',
  },
];

export function Services() {
  return (
    <section className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service) => (
          <Card key={service.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-col items-center">
              <div className="bg-accent/10 p-4 rounded-full mb-4">
                {service.icon}
              </div>
              <CardTitle className="text-lg font-semibold text-primary">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

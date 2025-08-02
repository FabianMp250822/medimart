import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { servicesData } from '@/lib/servicios-links';
import Link from 'next/link';
import { List } from 'lucide-react';
import Image from 'next/image';

const category = servicesData.find(cat => cat.slug === 'consulta-externa');

export const metadata: Metadata = {
  title: `${category?.title || 'Servicios'} - Clínica de la Costa`,
  description: `Conozca nuestros servicios de ${category?.title.toLowerCase()}. Atención integral y especializada.`,
};

export default function ServiceCategoryPage() {
  if (!category) return <div>Categoría no encontrada</div>;

  const supportServices = [
      "Patología: Diagnóstico y análisis de enfermedades.",
      "Gestión pre-transfusional: Preparación para transfusiones sanguíneas.",
      "Imágenes diagnósticas: Radiografías y tomografías.",
      "Hemodinamia e intervencionismo: Tratamiento de enfermedades cardiovasculares.",
      "Diagnóstico vascular: Exámenes para arterias y venas.",
      "Laboratorio clínico y toma de muestras.",
      "Laboratorio de citologías y de histotecnología.",
      "Medicina nuclear: Diagnósticos con radioisótopos."
  ];

  const therapeuticServices = [
      "Fisioterapia: Terapias para recuperar movilidad.",
      "Terapia respiratoria: Tratamiento para mejorar la capacidad pulmonar.",
      "Diálisis peritoneal y hemodiálisis.",
      "Quimioterapia y radioterapia.",
      "Servicio farmacéutico: Suministro y asesoramiento en medicamentos.",
      "Terapia ocupacional y fonoaudiología."
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-primary">{category.title}</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none text-muted-foreground">
           <p>
            En la Clínica de la Costa SAS, nuestra unidad de consulta externa está diseñada para ofrecer una atención integral y personalizada, brindada por un equipo de profesionales con formación académica certificada y avalada por entidades educativas competentes. Nuestro compromiso es garantizar un servicio oportuno, de calidad y con calidez para todos los pacientes que confían en nosotros.
          </p>
        </CardContent>
      </Card>
      
      <div className="relative h-96 w-full rounded-lg overflow-hidden">
          <Image
              src="https://placehold.co/1200x400.png"
              alt="Consulta Externa"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              data-ai-hint="outpatient consultation"
          />
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card>
              <CardHeader><CardTitle className="text-xl text-primary">Servicios de Apoyo Diagnóstico</CardTitle></CardHeader>
              <CardContent>
                  <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                      {supportServices.map(item => <li key={item}>{item}</li>)}
                  </ul>
              </CardContent>
          </Card>
          <Card>
              <CardHeader><CardTitle className="text-xl text-primary">Servicios de Apoyo Terapéutico</CardTitle></CardHeader>
              <CardContent>
                  <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                      {therapeuticServices.map(item => <li key={item}>{item}</li>)}
                  </ul>
              </CardContent>
          </Card>
      </div>

      <Card>
          <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold text-primary">Especialidades Disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {category.subservices.map((service) => (
                <li key={service.name} className="flex items-start gap-3">
                  <List className="h-5 w-5 mt-1 text-accent flex-shrink-0" />
                  <Link href={service.url} className="text-muted-foreground hover:text-accent hover:underline transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
      </Card>

    </div>
  );
}

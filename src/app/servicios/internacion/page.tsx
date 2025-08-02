import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { servicesData } from '@/lib/servicios-links';
import Link from 'next/link';
import { List } from 'lucide-react';

const category = servicesData.find(cat => cat.slug === 'internacion');

export const metadata: Metadata = {
  title: `${category?.title || 'Servicios'} - Clínica de la Costa`,
  description: `Conozca nuestros servicios de ${category?.title.toLowerCase()}.`,
};

export default function ServiceCategoryPage() {
  if (!category) return <div>Categoría no encontrada</div>;

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-primary">{category.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Nuestros servicios de internación están diseñados para proporcionar un cuidado integral y continuo a pacientes que requieren hospitalización. Contamos con unidades especializadas y un equipo multidisciplinario para garantizar la mejor atención en un entorno seguro y confortable.
          </p>
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

import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { servicesData } from '@/lib/servicios-links';
import Link from 'next/link';
import { List } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Servicios - Clínica de la Costa',
  description: 'Descubra la amplia gama de servicios médicos que ofrecemos, desde internación y cirugía hasta consulta externa y apoyo diagnóstico.',
};

export default function ServiciosPage() {
  return (
    <div className="space-y-12">
      {servicesData.map((category) => (
        <Card key={category.title} id={category.slug}>
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold text-primary">{category.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {category.subservices.map((service) => (
                <li key={service.name} className="flex items-start gap-3">
                    <List className="h-5 w-5 mt-1 text-accent flex-shrink-0" />
                    <Link href={service.url} className="text-muted-foreground hover:text-accent hover:underline">
                        {service.name}
                    </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

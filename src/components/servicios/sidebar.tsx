"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { servicesData } from '@/lib/servicios-links';

export function ServiciosSidebar() {
  const pathname = usePathname();

  return (
    <Card className="sticky top-24 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl text-primary">Categorías</CardTitle>
      </CardHeader>
      <CardContent>
        <nav className="flex flex-col space-y-1">
          {servicesData.map((item) => (
            <Link
              key={item.slug}
              href={`/servicios/${item.slug}`}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out",
                pathname === `/servicios/${item.slug}`
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent/10 hover:text-accent hover:pl-4"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
}

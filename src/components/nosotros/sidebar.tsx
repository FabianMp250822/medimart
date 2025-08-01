"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { nosotrosSubItems } from '@/lib/nosotros-links';

export function NosotrosSidebar() {
  const pathname = usePathname();

  return (
    <Card className="sticky top-24 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl text-primary">Sobre Nosotros</CardTitle>
      </CardHeader>
      <CardContent>
        <nav className="flex flex-col space-y-1">
          {nosotrosSubItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out",
                pathname === item.href
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent/10 hover:text-accent hover:pl-4"
              )}
            >
              {item.label.split(':')[0]}
            </Link>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
}

import { servicesData } from '@/lib/servicios-links';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface ServiceNavigationProps {
  currentPath: string;
  categorySlug: string;
}

export function ServiceNavigation({ currentPath, categorySlug }: ServiceNavigationProps) {
  const category = servicesData.find(cat => cat.slug === categorySlug);
  if (!category) return null;

  const currentIndex = category.subservices.findIndex(service => service.url === currentPath);
  if (currentIndex === -1) return null;

  const prevService = currentIndex > 0 ? category.subservices[currentIndex - 1] : null;
  const nextService = currentIndex < category.subservices.length - 1 ? category.subservices[currentIndex + 1] : null;

  return (
    <div className="mt-16">
        <Separator />
        <div className="flex justify-between items-center py-8">
            <div>
                {prevService && (
                    <Button asChild variant="outline">
                        <Link href={prevService.url}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Anterior: {prevService.name}
                        </Link>
                    </Button>
                )}
            </div>
            <div>
                {nextService && (
                    <Button asChild variant="outline">
                        <Link href={nextService.url}>
                            Siguiente: {nextService.name}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                )}
            </div>
        </div>
    </div>
  );
}

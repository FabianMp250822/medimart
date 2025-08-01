"use client";

import { OfertaEmpleo } from '@/types/oferta-empleo';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, Clock, Calendar } from 'lucide-react';

interface JobOfferCardProps {
  oferta: OfertaEmpleo;
}

export function JobOfferCard({ oferta }: JobOfferCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col group">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <Badge variant="secondary">{oferta.tipoContrato}</Badge>
                <CardTitle className="mt-2 text-xl font-bold text-primary">
                    <Link href={`/trabaja-con-nosotros/${oferta.id}`} className="hover:underline stretched-link">
                    {oferta.titulo}
                    </Link>
                </CardTitle>
            </div>
            {/* You can add a logo here if you want */}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3">
          {oferta.descripcion}
        </p>
      </CardContent>
      <CardFooter className="bg-primary/5 p-4 flex flex-wrap items-center justify-between text-sm text-muted-foreground gap-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{oferta.ubicacion}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{oferta.jornada}</span>
        </div>
         <Button asChild size="sm" className="bg-accent hover:bg-accent/90">
            <Link href={`/trabaja-con-nosotros/${oferta.id}`}>Ver detalles</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

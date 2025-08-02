import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import { Medico } from '@/types/medico';

interface TeamProps {
  teamMembers: Medico[];
}

export function Team({ teamMembers }: TeamProps) {
  return (
    <section className="py-16 text-center">
      <span className="text-accent font-semibold">NUESTRO EQUIPO</span>
      <h2 className="text-3xl font-bold text-primary my-4">Conozca a Nuestro Equipo de Profesionales</h2>
      {teamMembers.length > 0 ? (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
          {teamMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <Link href={`/especialistas/${member.id}`} className="block">
                <div className="relative h-64 bg-gray-200">
                    <Image 
                      src={member.profileImage || "https://placehold.co/300x400.png"} 
                      alt={member.nombreCompleto} 
                      layout="fill" 
                      objectFit="cover" 
                      objectPosition="top" 
                      data-ai-hint="doctor portrait"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                    />
                </div>
              </Link>
              <CardContent className="p-6">
                 <Link href={`/especialistas/${member.id}`} className="hover:underline">
                  <h3 className="text-lg font-bold text-primary">{member.nombreCompleto}</h3>
                </Link>
                <p className="text-accent">{member.especialidad}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button asChild className="mt-12 bg-accent hover:bg-accent/90">
          <Link href="/especialistas">Ver todo el equipo</Link>
        </Button>
      </>
      ) : (
         <p className="text-muted-foreground mt-8">No hay miembros del equipo para mostrar.</p>
      )}
    </section>
  );
}

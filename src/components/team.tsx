import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from './ui/button';

const teamMembers = [
  {
    name: 'Dr. Carlos E. Uribe M.',
    specialty: 'Médico Internista',
    image: 'https://placehold.co/300x400.png',
    hint: 'doctor portrait'
  },
  {
    name: 'Dr. Marco A. Flórez P.',
    specialty: 'Médico U.C.I.',
    image: 'https://placehold.co/300x400.png',
    hint: 'doctor portrait'
  },
  {
    name: 'Dr. Oscar de Jesús Padilla',
    specialty: 'Médico U.C.I.',
    image: 'https://placehold.co/300x400.png',
    hint: 'doctor portrait'
  },
  {
    name: 'Dra. María Jimena Artera',
    specialty: 'Pediatra',
    image: 'https://placehold.co/300x400.png',
    hint: 'doctor portrait'
  },
];

export function Team() {
  return (
    <section className="py-16 text-center">
      <span className="text-accent font-semibold">NUESTRO EQUIPO</span>
      <h2 className="text-3xl font-bold text-primary my-4">Conozca a Nuestro Equipo de Profesionales</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
        {teamMembers.map((member) => (
          <Card key={member.name} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <div className="relative h-64 bg-gray-200">
                <Image src={member.image} alt={member.name} layout="fill" objectFit="cover" objectPosition="top" data-ai-hint={member.hint} />
            </div>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-primary">{member.name}</h3>
              <p className="text-accent">{member.specialty}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button className="mt-12 bg-accent hover:bg-accent/90">Ver todo el equipo</Button>
    </section>
  );
}

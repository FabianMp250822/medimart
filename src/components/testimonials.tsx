import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Star, StarHalf } from 'lucide-react';

export function Testimonials() {
  return (
    <section className="py-16 bg-card rounded-lg">
      <div className="grid md:grid-cols-2 gap-12 items-center container mx-auto">
        <div className="relative h-[500px] w-full rounded-lg overflow-hidden">
          <Image
            src="https://placehold.co/600x800.png"
            alt="Pasillo de la clínica"
            layout="fill"
            objectFit="cover"
            data-ai-hint="hospital hallway"
          />
        </div>
        <div className="relative">
             <span className="text-accent font-semibold">TESTIMONIOS</span>
             <h2 className="text-3xl font-bold text-primary my-4">Lo Que Dicen Nuestros Pacientes</h2>
             <p className="text-muted-foreground mb-8">
                Nos enorgullece recibir comentarios positivos de nuestros pacientes. Sus historias nos motivan a seguir mejorando cada día.
             </p>

            <div className="relative">
                 <svg className="absolute top-0 left-0 h-16 w-16 text-primary/10 -translate-x-4 -translate-y-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.333 8.167h5.833L12.5 14h5.833L15.667 24H4.333L9.333 8.167zM20.333 8.167h5.833L23.5 14h5.833L26.667 24H15.333L20.333 8.167z" />
                </svg>
                <Card className="relative p-6 shadow-lg border-l-4 border-accent">
                    <CardContent className="p-0">
                        <p className="text-lg italic text-foreground">
                            "El trato fue excelente desde el primer día. El personal médico y administrativo demostró un gran profesionalismo y calidez humana. Me sentí seguro y bien atendido en todo momento."
                        </p>
                        <div className="flex items-center mt-6">
                            <div className="relative h-16 w-16 rounded-full overflow-hidden">
                                <Image src="https://placehold.co/100x100.png" data-ai-hint="man portrait" alt="Carlos Santana" layout="fill" objectFit="cover" />
                            </div>
                            <div className="ml-4">
                                <p className="font-bold text-primary">Carlos Santana</p>
                                <p className="text-sm text-muted-foreground">Paciente de Cardiología</p>
                                <div className="flex text-yellow-500 mt-1">
                                    <Star className="h-5 w-5 fill-current" />
                                    <Star className="h-5 w-5 fill-current" />
                                    <Star className="h-5 w-5 fill-current" />
                                    <Star className="h-5 w-5 fill-current" />
                                    <Star className="h-5 w-5 fill-current" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </section>
  );
}

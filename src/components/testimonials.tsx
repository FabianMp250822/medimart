import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import type { Testimonial } from '@/types/testimonial';

interface TestimonialsProps {
  testimonial: Testimonial | null;
}

const RatingStars = ({ rating }: { rating: number }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`h-5 w-5 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    );
  }
  return <div className="flex">{stars}</div>;
};

export function Testimonials({ testimonial }: TestimonialsProps) {
  return (
    <section className="py-16 bg-card rounded-lg">
      <div className="grid md:grid-cols-2 gap-12 items-center container mx-auto">
        <div className="relative h-[500px] w-full rounded-lg overflow-hidden">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%206.02.22%20PM.jpeg?alt=media&token=d493e491-0d1b-484a-a35a-8d6a8a6d7e13"
            alt="Pasillo de la clínica"
            fill
            style={{ objectFit: 'cover' }}
            data-ai-hint="hospital hallway"
            sizes="(max-width: 768px) 100vw, 50vw"
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
                {testimonial ? (
                    <Card className="relative p-6 shadow-lg border-l-4 border-accent">
                        <CardContent className="p-0">
                            <p className="text-lg italic text-foreground">
                                &quot;{testimonial.comment}&quot;
                            </p>
                            <div className="flex items-center mt-6">
                                <div className="relative h-16 w-16 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                                    <span className="text-2xl font-bold text-primary">{testimonial.name.charAt(0)}</span>
                                </div>
                                <div className="ml-4">
                                    <p className="font-bold text-primary">{testimonial.name}</p>
                                    <p className="text-sm text-muted-foreground">Paciente Verificado</p>
                                    <div className="flex text-yellow-500 mt-1">
                                      <RatingStars rating={testimonial.rating} />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <p className="text-muted-foreground">No hay testimonios para mostrar en este momento.</p>
                )}
            </div>
        </div>
      </div>
    </section>
  );
}

import { Medico } from "@/types/medico";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { Stethoscope } from "lucide-react";

interface RelatedSpecialistsProps {
  specialists: Medico[];
  specialtyName: string;
}

export function RelatedSpecialists({ specialists, specialtyName }: RelatedSpecialistsProps) {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-primary">
          {specialtyName} Expertos
        </h2>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          Un equipo de profesionales altamente calificados y dedicados a su
          bienestar.
        </p>

        <Carousel
          opts={{
            align: "start",
            loop: specialists.length > 3,
          }}
          className="w-full max-w-5xl mx-auto mt-8"
        >
          <CarouselContent>
            {specialists.map((specialist) => (
              <CarouselItem
                key={specialist.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <Link href={`/especialistas/${specialist.id}`}>
                        <div className="relative h-40 w-40 rounded-full overflow-hidden border-4 border-transparent group-hover:border-accent transition-colors duration-300">
                           <Image
                            src={specialist.profileImage}
                            alt={specialist.nombreCompleto}
                            layout="fill"
                            objectFit="cover"
                            data-ai-hint="doctor portrait"
                          />
                        </div>
                      </Link>
                      <h3 className="text-xl font-bold text-primary mt-4">
                        <Link href={`/especialistas/${specialist.id}`} className="hover:underline">
                            {specialist.nombreCompleto}
                        </Link>
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <Stethoscope className="h-4 w-4 text-accent" />
                        <span>{specialist.especialidad}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}

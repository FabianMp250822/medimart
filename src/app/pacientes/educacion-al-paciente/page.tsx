
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Video } from 'lucide-react';
import { VideoGallery } from '@/components/pacientes/video-gallery';

export const metadata: Metadata = {
  title: 'Educación al Paciente - Clínica de la Costa',
  description: 'Explore nuestros videos educativos sobre diversas condiciones de salud, consejos de prevención y guías de tratamiento para pacientes y sus familias.',
};

const videos = [
    {
        title: "Insulina: educación al paciente",
        url: "https://www.youtube.com/watch?v=HM3XPLlX-Os",
    },
    {
        title: "Educación al paciente Diabetes",
        url: "https://www.youtube.com/watch?v=DZTcWqi36gE",
    },
    {
        title: "Educación al paciente - Clínica San Francisco",
        url: "https://www.youtube.com/watch?v=UDfk4793p-o",
    },
    {
        title: "#43 Educación al Paciente - Jefe Yazmín Torres",
        url: "https://www.youtube.com/watch?v=n0w35YhAnhE",
    },
    {
        title: "Educación al Paciente y su Familia",
        url: "https://www.youtube.com/watch?v=kbf7VYYkyxc",
    },
    {
        title: "Programa de información y educación al paciente y su familia",
        url: "https://www.youtube.com/watch?v=6B5u2MHiuHM",
    },
    {
        title: "Conversatorio: ¿Por qué es importante educar al paciente?",
        url: "https://www.youtube.com/watch?v=GiYkHO0-gMs",
    },
    {
        title: "Insuficiencia Cardíaca - Educación para el paciente",
        url: "https://www.youtube.com/watch?v=waglFOqXMuI",
    },
];

export default function EducacionPacientePage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-primary">
            <Video />
            Videos Informativos para Pacientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Explore nuestros videos educativos sobre diversas condiciones de salud. Haga clic en cualquiera de ellos para ver más detalles y reproducir el contenido.
          </p>
        </CardContent>
      </Card>

      <VideoGallery videos={videos} />
    </div>
  );
}

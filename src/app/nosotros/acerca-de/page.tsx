import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Acerca de Nosotros - Clínica de la Costa',
  description: 'Conozca nuestra misión, visión, valores y la historia que nos ha convertido en un referente de salud en la región.',
};

export default function AcercaDePage() {
  return (
    <div className="bg-background">
      <div className="relative bg-primary/80 text-white py-20 sm:py-28 md:py-32 flex items-center justify-center text-center">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/banner%2Fmisionvision_(1)-transformed.jpeg?alt=media&token=fc787cf2-c0e8-4f7a-a5a4-da0291536d42"
          alt="Equipo médico colaborando"
          layout="fill"
          objectFit="cover"
          className="z-0 opacity-20"
          data-ai-hint="medical team collaboration"
        />
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-bold">Acerca de Nosotros</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            Nuestra historia, valores y compromiso con la excelencia médica.
          </p>
        </div>
      </div>
      <main className="container mx-auto py-12 px-4">
        <div className="prose lg:prose-xl max-w-4xl mx-auto">
            <h2>Nuestra Misión</h2>
            <p>
                Proporcionar atención médica integral y de alta calidad, centrada en el paciente, con un equipo humano comprometido con la excelencia, la innovación y la calidez humana.
            </p>
            <h2>Nuestra Visión</h2>
            <p>
                Ser la institución de salud líder en la región Caribe, reconocida por nuestro modelo de atención innovador, la seguridad del paciente y la contribución al bienestar de la comunidad.
            </p>
            <h2>Nuestros Valores</h2>
            <ul>
                <li><strong>Compromiso:</strong> Con la salud y bienestar de nuestros pacientes.</li>
                <li><strong>Excelencia:</strong> En cada uno de nuestros procesos y servicios.</li>
                <li><strong>Humanismo:</strong> Trato digno, cálido y respetuoso.</li>
                <li><strong>Integridad:</strong> Actuamos con ética y transparencia.</li>
                <li><strong>Innovación:</strong> Buscamos constantemente nuevas y mejores formas de servir.</li>
            </ul>
            <h2>Nuestra Historia</h2>
            <p>
                Fundada en 1989, la Clínica de la Costa ha crecido hasta convertirse en un pilar fundamental de la atención médica en Barranquilla y la región. A lo largo de más de tres décadas, hemos mantenido un compromiso inquebrantable con la modernización de nuestra infraestructura, la adquisición de tecnología de punta y, lo más importante, la formación continua de nuestro talentoso equipo humano.
            </p>
        </div>
      </main>
    </div>
  );
}

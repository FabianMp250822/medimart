import { SedeProvider } from './context/SedeContext'; // Importa el contexto
import "@/node_modules/react-modal-video/css/modal-video.css";
import "../public/assets/css/bootstrap.css";
import "../public/assets/css/color.css";
import "../public/assets/css/style.css";
import 'swiper/css';
import "swiper/css/pagination";
import 'swiper/css/free-mode';

export const metadata = {
  title: 'Clínica de la Costa Barranquilla',
  description: 'La Clínica de la Costa es una de las instituciones médicas líderes en Barranquilla, Colombia, ofreciendo servicios médicos especializados con tecnología de vanguardia.',
  keywords: 'Clínica de la Costa, Barranquilla, servicios médicos, atención en salud, consultas médicas, radioterapia, atención especializada, citas médicas',
  openGraph: {
    title: 'Clínica de la Costa Barranquilla',
    description: 'Clínica de la Costa en Barranquilla ofrece atención médica especializada con un enfoque en el bienestar de sus pacientes.',
    url: 'https://clinicadelacosta.co',
    type: 'website',
    locale: 'es_CO',
    site_name: 'Clínica de la Costa',
    images: [
      {
        url: '/assets/images/clinicadelacosta-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Clínica de la Costa Barranquilla',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@clinicadelacosta',
    title: 'Clínica de la Costa Barranquilla',
    description: 'Servicios médicos especializados en la Clínica de la Costa, Barranquilla.',
    image: '/assets/images/clinicadelacosta-og-image.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <SedeProvider>
      <html lang="es">
        <body>{children}</body>
      </html>
    </SedeProvider>
  );
}

import Providers from "./Providers";
import "@/node_modules/react-modal-video/css/modal-video.css";
import "../public/assets/css/bootstrap.css";
import "../public/assets/css/color.css";
import "../public/assets/css/style.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

// Opcional: metadatos para SEO
export const metadata = {
  title: "Clínica de la Costa Barranquilla",
  description: "La Clínica de la Costa es una de las instituciones médicas líderes en Barranquilla, Colombia...",
  keywords: "...",
  openGraph: {
    title: "...",
    description: "...",
    url: "https://clinicadelacosta.co",
    type: "website",
    locale: "es_CO",
    site_name: "Clínica de la Costa",
    images: [
      {
        url: "/assets/images/clinicadelacosta-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Clínica de la Costa Barranquilla",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@clinicadelacosta",
    title: "...",
    description: "...",
    image: "/assets/images/clinicadelacosta-og-image.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {/* Aquí envolvemos la app en Providers, que es un Client Component */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

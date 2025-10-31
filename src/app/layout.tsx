import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ChatWidget } from '@/components/chat/chat-widget';
import { Open_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { clinicaStructuredData, organizationStructuredData } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: {
    default: 'Clínica de la Costa - Atención Médica Especializada en Barranquilla',
    template: '%s | Clínica de la Costa'
  },
  description: 'Líder en atención médica especializada en la Región Caribe. Urgencias 24/7, más de 30 especialidades, tecnología de punta. Calle 52 No. 46-102, Barranquilla.',
  keywords: ['clínica', 'hospital', 'Barranquilla', 'urgencias', 'médicos especialistas', 'cirugía', 'hospitalización', 'consulta externa', 'atención médica'],
  authors: [{ name: 'Clínica de la Costa' }],
  creator: 'Clínica de la Costa',
  publisher: 'Clínica de la Costa',
  metadataBase: new URL('https://clinica-de-la-costa.app'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://clinica-de-la-costa.app',
    siteName: 'Clínica de la Costa',
    title: 'Clínica de la Costa - Atención Médica Especializada en Barranquilla',
    description: 'Líder en atención médica especializada en la Región Caribe. Urgencias 24/7, más de 30 especialidades, tecnología de punta.',
    images: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fhospitalizacion.jpg?alt=media',
        width: 1200,
        height: 630,
        alt: 'Clínica de la Costa - Instalaciones'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clínica de la Costa',
    description: 'Líder en atención médica especializada en la Región Caribe',
    images: ['https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fhospitalizacion.jpg?alt=media']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  icons: {
    icon: 'https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/fondosweb%2Ficon_76d6dee740193497ee4a2507b55fc4e6.ico?alt=media&token=edeeb037-3515-43ce-9f23-5b778dc47f93',
    apple: 'https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/fondosweb%2Ficon_76d6dee740193497ee4a2507b55fc4e6.ico?alt=media&token=edeeb037-3515-43ce-9f23-5b778dc47f93',
  },
  verification: {
    // Agregar cuando tengas los códigos de verificación
    // google: 'verification_token',
  }
};

// Configuración optimizada de fuentes con next/font
const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-open-sans',
  display: 'swap', // Evita el parpadeo de texto (FOIT)
  preload: true, // Precarga la fuente para mejor rendimiento
  fallback: ['system-ui', 'arial', 'sans-serif'], // Fuentes de respaldo
  adjustFontFallback: true, // Ajusta métricas de fuentes de respaldo
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Datos Estructurados Schema.org para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([clinicaStructuredData, organizationStructuredData])
          }}
        />
      </head>
      <body className={cn(openSans.variable, 'font-body antialiased')}>
        {children}
        <Toaster />
        <ChatWidget />
      </body>
    </html>
  );
}

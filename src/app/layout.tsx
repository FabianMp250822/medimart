import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ChatWidget } from '@/components/chat/chat-widget';
import { Open_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Clinica de la Costa',
  description: 'Atención médica integral y especializada en Barranquilla. Ofrecemos una amplia gama de servicios para cuidar de tu salud y la de tu familia.',
  icons: {
    icon: 'https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/fondosweb%2Ficon_76d6dee740193497ee4a2507b55fc4e6.ico?alt=media&token=edeeb037-3515-43ce-9f23-5b778dc47f93',
    apple: 'https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/fondosweb%2Ficon_76d6dee740193497ee4a2507b55fc4e6.ico?alt=media&token=edeeb037-3515-43ce-9f23-5b778dc47f93',
  },
};

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-open-sans',
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
      </head>
      <body className={cn(openSans.variable, 'font-body antialiased')}>
        {children}
        <Toaster />
        <ChatWidget />
      </body>
    </html>
  );
}

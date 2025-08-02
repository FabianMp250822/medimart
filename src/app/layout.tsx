import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ChatWidget } from '@/components/chat/chat-widget';

export const metadata: Metadata = {
  title: 'Clinica de la Costa',
  description: 'Clinica de la Costa',
  icons: {
    icon: 'https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/banner%2FChatGPT%20Image%2031%20jul%202025%2C%2023_17_13.png?alt=media&token=67a7820a-9219-41ef-8d56-0d50ee82bb1c',
    apple: 'https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/banner%2FChatGPT%20Image%2031%20jul%202025%2C%2023_17_13.png?alt=media&token=67a7820a-9219-41ef-8d56-0d50ee82bb1c',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <ChatWidget />
      </body>
    </html>
  );
}

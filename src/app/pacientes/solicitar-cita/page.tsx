'use client';

import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, ShieldCheck } from 'lucide-react';
import { Logo } from '@/components/logo';
import Link from 'next/link';

export default function SolicitarCitaPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="mb-8">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="mb-8 w-full max-w-lg lg:max-w-4xl grid gap-4 md:grid-cols-2">
        <Card className="hover:border-accent/50 transition-colors cursor-pointer group" onClick={() => window.open('https://wa.me/573218150179', '_blank')}>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Programación de Cirugías</p>
              <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">Servicios Quirúrgicos</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-accent/50 transition-colors cursor-pointer group" onClick={() => window.open('https://wa.me/573213339684', '_blank')}>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Citas y Exámenes</p>
              <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">Citas Generales y Lab.</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full max-w-lg lg:max-w-4xl mt-6 border border-border/40 bg-card/50 shadow-sm">
        <CardContent className="p-6 space-y-4 text-left">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-foreground">Consentimiento y Protección de Datos Personales</h4>
          </div>

          <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
            <p>
              En cumplimiento de la <strong>Ley Estatutaria 1581 de 2012</strong> de Protección de Datos Personales y el Decreto 1377 de 2013, la <strong>Clínica de la Costa</strong> informa que los datos personales suministrados a través de nuestros canales de atención (WhatsApp, telefónico o presencial) serán tratados de manera confidencial y segura.
            </p>
            <p>
              Al hacer clic en los botones de contacto y continuar con el proceso de agendamiento, usted autoriza de manera libre, previa, expresa e informada el tratamiento de sus datos personales sensibles (incluyendo datos de salud) para las siguientes finalidades:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Gestión y asignación de citas médicas y procedimientos.</li>
              <li>Validación de derechos ante su entidad aseguradora (EPS/Prepagada).</li>
              <li>Envío de recordatorios, confirmaciones y preparación para exámenes.</li>
              <li>Contactarlo para dar respuesta a sus solicitudes.</li>
            </ul>
            <p>
              Usted tiene derecho a conocer, actualizar y rectificar sus datos personales, así como a solicitar la supresión de los mismos, conforme a nuestra <Link href="/nosotros/politica-de-tratamiento-de-datos" className="text-primary hover:underline font-medium">Política de Tratamiento de Datos</Link>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

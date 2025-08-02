import Link from 'next/link';
import { Logo } from './logo';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Image from 'next/image';

export function AppFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo and Info */}
          <div className="flex flex-col">
            <Logo />
            <p className="mt-4 text-sm text-primary-foreground/80">
              Clínica de la Costa, su salud es nuestra prioridad. Ofrecemos atención médica de calidad con un equipo de profesionales comprometidos.
            </p>
            <div className="flex space-x-4 mt-4">
                <Link href="#" className="text-primary-foreground/80 hover:text-accent"><Facebook className="h-5 w-5" /></Link>
                <Link href="#" className="text-primary-foreground/80 hover:text-accent"><Twitter className="h-5 w-5" /></Link>
                <Link href="#" className="text-primary-foreground/80 hover:text-accent"><Instagram className="h-5 w-5" /></Link>
                <Link href="#" className="text-primary-foreground/80 hover:text-accent"><Linkedin className="h-5 w-5" /></Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Enlaces Rápidos</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#" className="text-primary-foreground/80 hover:text-accent">Inicio</Link></li>
              <li><Link href="#" className="text-primary-foreground/80 hover:text-accent">Sobre Nosotros</Link></li>
              <li><Link href="#" className="text-primary-foreground/80 hover:text-accent">Servicios</Link></li>
              <li><Link href="#" className="text-primary-foreground/80 hover:text-accent">Especialistas</Link></li>
              <li><Link href="#" className="text-primary-foreground/80 hover:text-accent">Contacto</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white">Contacto</h3>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
              <li>Carrera 50 No. 80-90</li>
              <li>Barranquilla, Colombia</li>
              <li className="pt-2">Tel: +57 (605) 3369999</li>
              <li>Email: info@clinicadelacosta.com</li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white">Suscríbase a Nuestro Boletín</h3>
            <p className="mt-4 text-sm text-primary-foreground/80">
              Reciba las últimas noticias y ofertas especiales directamente en su bandeja de entrada.
            </p>
            <div className="flex mt-4">
              <Input type="email" placeholder="Su correo electrónico" className="bg-primary-foreground/10 border-primary-foreground/20 text-white placeholder:text-primary-foreground/60 rounded-r-none" />
              <Button type="submit" className="bg-accent hover:bg-accent/90 rounded-l-none">Suscribirse</Button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Image 
              src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/banner%2Fsupersalud.svg?alt=media&token=a5985584-fa36-4106-a434-5aacfbeaf973"
              alt="SuperSalud Logo"
              width={150}
              height={40}
              className="h-10 w-auto"
            />
            <p>© {new Date().getFullYear()} Clínica de la Costa. Diseño y Desarrollo: Fabian Muñoz Puello & Leidy Vega Anaya para tecnosalud internacional . Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client"
import { Phone, MapPin, Menu, Clock, MessageSquare } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { MainNav } from '@/components/main-nav';
import { HeaderNav } from '@/components/header-nav';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link';
import Flag from 'react-world-flags';

export function Header() {
  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto flex flex-wrap items-center justify-between py-2 px-4 text-xs sm:text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Atención: +57 (605) 3369999 Ext. 1.</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>carrera 50 no 80-90, Barranquilla</span>
            </div>
             <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Flag code="ES" className="w-6 h-auto" />
            <Flag code="US" className="w-6 h-auto" />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-card shadow-sm sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between p-4 gap-4">
          <div className="flex-shrink-0">
            <Link href="/" aria-label="Volver al inicio">
              <Logo />
            </Link>
          </div>
          
          <div className="flex-1 hidden lg:flex justify-center">
            <HeaderNav />
          </div>

          <div className="flex items-center justify-end gap-2 md:gap-4 lg:flex-1">
             <Button asChild className="bg-accent hover:bg-accent/90 hidden lg:flex">
              <Link href="/trabaja-con-nosotros">Trabaje con nosotros</Link>
            </Button>
            <div className="lg:hidden">
               <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Abrir menú</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <div className="p-6">
                    <Link href="/" aria-label="Volver al inicio">
                      <Logo />
                    </Link>
                    <div className="mt-8">
                       <MainNav />
                       <Button asChild className="w-full mt-4 bg-accent hover:bg-accent/90">
                          <Link href="/trabaja-con-nosotros">Trabaje con nosotros</Link>
                       </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

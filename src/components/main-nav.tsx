"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

const nosotrosSubItems = [
    { href: '/nosotros/acerca-de', label: 'Acerca De Nosotros' },
    { href: '/trabaja-con-nosotros', label: 'Trabaja Con Nosotros' },
    { href: '/nosotros/gestion-documental', label: 'Gestión Documental' },
    { href: '/nosotros/certificaciones', label: 'Certificaciones' },
    { href: '/nosotros/responsabilidad-social', label: 'Responsabilidad Social' },
    { href: '/nosotros/direccionamiento-estrategico', label: 'Direccionamiento Estratégico' },
    { href: '/nosotros/marco-legal', label: 'Marco Legal' },
    { href: '/nosotros/sistema-integrado-de-gestion', label: 'Sistema Integrado De Gestión' },
    { href: '/nosotros/politica-de-tratamiento-de-datos', label: 'Política De Datos' },
]

const navItems = [
  { href: '/', label: 'Inicio' },
  { 
    label: 'Nosotros', 
    isDropdown: true,
    subItems: nosotrosSubItems,
  },
  { href: '#', label: 'Servicios' },
  { href: '#', 'label': 'Pacientes' },
  { href: '/especialistas', label: 'Especialistas' },
  { href: '/noticias', label: 'Noticias' },
  { href: "#", label: "Contacto" },
];

export function MainNav() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="w-full">
      <ul className="flex flex-col space-y-1">
        {navItems.map((item, index) => (
          <li key={item.label}>
            {item.isDropdown ? (
               <Collapsible open={openDropdown === item.label} onOpenChange={() => setOpenDropdown(prev => prev === item.label ? null : item.label)}>
                <CollapsibleTrigger className="w-full">
                  <div
                    className={`flex justify-between items-center py-3 px-4 rounded-md font-semibold transition-colors text-foreground/80 hover:bg-accent/10 hover:text-accent`}
                  >
                    {item.label}
                    <ChevronDown className={`h-5 w-5 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="py-1 pl-6 pr-2 space-y-1">
                  {item.subItems?.map(subItem => (
                     <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block py-2 px-4 rounded-md text-sm text-foreground/70 hover:bg-accent/10 hover:text-accent"
                      >
                       {subItem.label}
                     </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
               <Link
                href={item.href || '#'}
                className={`block py-3 px-4 rounded-md font-semibold transition-colors text-foreground/80 hover:bg-accent/10 hover:text-accent ${
                    index === 0 ? 'bg-accent/10 text-accent' : ''
                }`}
                >
                {item.label}
                </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

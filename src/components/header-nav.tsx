import Link from 'next/link';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-react';
import { nosotrosSubItems } from '@/lib/nosotros-links';
import { pacientesSubItems } from '@/lib/pacientes-links';
import { servicesData } from '@/lib/servicios-links';

const navItems = [
  { href: '/', label: 'Inicio' },
  { 
    label: 'Nosotros', 
    isDropdown: true,
    subItems: nosotrosSubItems.map(item => ({ href: item.href, label: item.label.split(':')[0] })),
  },
  { 
    label: 'Servicios',
    isDropdown: true,
    subItems: servicesData.map(item => ({ href: `/servicios/${item.slug}`, label: item.title })),
  },
  { 
    label: 'Pacientes', 
    isDropdown: true,
    subItems: pacientesSubItems,
  },
  { href: '/especialistas', label: 'Especialistas' },
  { href: "/noticias", label: "Noticias" },
  { href: "/contacto", label: "Contacto" },
];

export function HeaderNav() {
  return (
    <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
      {navItems.map((item) => (
        item.isDropdown ? (
            <DropdownMenu key={item.label}>
                <DropdownMenuTrigger className="flex items-center gap-1 text-foreground/80 transition-colors hover:text-foreground focus:outline-none">
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-primary text-primary-foreground border-primary-foreground/20">
                    {item.subItems?.map((subItem, index) => (
                       <React.Fragment key={subItem.label}>
                         <DropdownMenuItem asChild>
                           <Link href={subItem.href} className="focus:bg-accent/20 focus:text-accent-foreground transition-all duration-200 ease-in-out hover:pl-3">
                             {subItem.label}
                           </Link>
                         </DropdownMenuItem>
                         {index < (item.subItems?.length ?? 0) - 1 && <DropdownMenuSeparator className="bg-primary-foreground/20" />}
                       </React.Fragment>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        ) : (
            <Link
              key={item.label}
              href={item.href || '#'}
              className="text-foreground/80 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
        )
      ))}
    </nav>
  );
}

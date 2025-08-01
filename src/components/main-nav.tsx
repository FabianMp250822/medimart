"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { DropdownMenuSeparator } from './ui/dropdown-menu';
import { nosotrosSubItems } from '@/lib/nosotros-links';

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
                <CollapsibleContent className="py-1 pl-6 pr-2 space-y-1 bg-primary/5 rounded-md">
                  {item.subItems?.map((subItem, subIndex) => (
                     <React.Fragment key={subItem.label}>
                        <Link
                            href={subItem.href}
                            className="block py-2 px-4 rounded-md text-sm text-foreground/70 hover:bg-accent/10 hover:text-accent"
                        >
                            {subItem.label.split(':')[0]}
                        </Link>
                        {subIndex < (item.subItems?.length ?? 0) - 1 && <DropdownMenuSeparator className="bg-border/50" />}
                     </React.Fragment>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
               <Link
                href={item.href || '#'}
                className={`block py-3 px-4 rounded-md font-semibold transition-colors text-foreground/80 hover:bg-accent/10 hover:text-accent`}
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

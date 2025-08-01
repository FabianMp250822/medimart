import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-react';

const nosotrosSubItems = [
    { href: '/nosotros/acerca-de', label: 'Acerca De Nosotros: Misión, Visión, Valores, Historia' },
    { href: '/trabaja-con-nosotros', label: 'Trabaja Con Nosotros' },
    { href: '/nosotros/gestion-documental', label: 'Gestión Documental' },
    { href: '/nosotros/certificaciones', label: 'Certificaciones' },
    { href: '/nosotros/responsabilidad-social', label: 'Responsabilidad Social Y Empresarial' },
    { href: '/nosotros/direccionamiento-estrategico', label: 'Direccionamiento Estratégico' },
    { href: '/nosotros/marco-legal', label: 'Marco Legal' },
    { href: '/nosotros/sistema-integrado-de-gestion', label: 'Sistema Integrado De Gestión' },
    { href: '/nosotros/politica-de-tratamiento-de-datos', label: 'Política De Tratamiento De Datos' },
]

const navItems = [
  { href: '/', label: 'Inicio' },
  { 
    label: 'Nosotros', 
    isDropdown: true,
    subItems: nosotrosSubItems,
  },
  { href: '#', label: 'Servicios' },
  { href: '#', label: 'Pacientes' },
  { href: '/especialistas', label: 'Especialistas' },
  { href: "/noticias", label: "Noticias" },
  { href: "#", label: "Contacto" },
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
                <DropdownMenuContent>
                    {item.subItems?.map(subItem => (
                        <DropdownMenuItem key={subItem.label} asChild>
                            <Link href={subItem.href}>{subItem.label}</Link>
                        </DropdownMenuItem>
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

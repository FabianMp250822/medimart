import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '#', label: 'Nosotros' },
  { href: '#', label: 'Servicios' },
  { href: '#', label: 'Pacientes' },
  { href: '/especialistas', label: 'Especialistas' },
  { href: "/noticias", label: "Noticias" },
  { href: "/trabaja-con-nosotros", label: "Trabaja con Nosotros" },
  { href: "#", label: "Contacto" },
];

export function HeaderNav() {
  return (
    <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="text-foreground/80 transition-colors hover:text-foreground"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

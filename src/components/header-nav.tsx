import Link from 'next/link';

const navItems = [
  { href: '#', label: 'Inicio' },
  { href: '#', label: 'Nosotros' },
  { href: '#', label: 'Servicios' },
  { href: '#', label: 'Pacientes' },
  { href: '#', label: 'Especialistas' },
  { href: "#", label: "Faq's" },
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

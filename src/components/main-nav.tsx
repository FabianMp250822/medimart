import Link from 'next/link';

const navItems = [
  { href: '#', label: 'Inicio' },
  { href: '#', label: 'Nosotros' },
  { href: '#', label: 'Servicios' },
  { href: '#', label: 'Pacientes' },
  { href: '#', label: 'Especialistas' },
  { href: '#', label: "Faq's" },
];

export function MainNav() {
  return (
    <nav className="w-full">
      <ul className="flex flex-col space-y-1">
        {navItems.map((item, index) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className={`block py-3 px-4 rounded-md font-semibold transition-colors ${
                index === 0
                  ? 'bg-accent/10 text-accent'
                  : 'text-foreground/80 hover:bg-accent/10 hover:text-accent'
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

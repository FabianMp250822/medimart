'use client';

import Link from "next/link";

export default function SidebarMenu() {
    const menuItems = [
        { title: "Trabaja con nosotros", link: "/trabaja-con-nosotros" },
        { title: "Acerca de Nosotros: Misión, Visión, Valores, Historia", link: "/about-us" },
        { title: "Certificaciones", link: "/certificaciones" },
        { title: "Responsabilidad social y empresarial", link: "/responsabilidad-social" },
        { title: "Direccionamiento Estratégico", link: "/direccionamiento-estrategico" },
        { title: "Marco Legal", link: "/marco-legal" },
        { title: "Reglamento Interno de Trabajo", link: "/reglamento-interno-trabajo" },
        { title: "Informes de Sostenibilidad", link: "/informes-de-sostenibilidad" },
        { title: "Sistema Integrado de Gestión", link: "/sistema-integrado-de-gestion" },
        { title: "Política de tratamiento de datos", link: "/politica-de-datos" },
    ];

    return (
        <div
            style={{
                padding: '20px',
                backgroundColor: '#F7F7F7',
                borderRadius: '8px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                fontFamily: "'Roboto', sans-serif",
            }}
        >
            <h4
                style={{
                    color: '#1A1A3B',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                    fontSize: '18px',
                    letterSpacing: '1px',
                    marginTop: '0',
                }}
            >
                Sobre Nosotros
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {menuItems.map((item, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                        <Link
                            href={item.link}
                            style={{
                                textDecoration: 'none',
                                color: '#3B3B3B',
                                fontSize: '16px',
                                fontWeight: '500',
                                display: 'block',
                                transition: 'all 0.3s ease',
                                padding: '8px 12px',
                                borderRadius: '5px',
                            }}
                        >
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
            
            <style jsx>{`
                a:hover {
                    color: #ffffff !important;
                    background-color: #1A1A3B !important;
                    text-decoration: none !important;
                }
            `}</style>
        </div>
    );
}

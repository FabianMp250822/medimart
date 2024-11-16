'use client';

import Link from "next/link";

export default function SidebarMenu() {
    const menuItems = [
        { title: "Trabaja con nosotros", link: "/trabaja-con-nosotros" },
        { title: "Acerca de Nosotros: Misión, Visión, Valores, Historia", link: "/service-details-3" },
        { title: "Certificaciones", link: "/certificaciones" },
        { title: "Responsabilidad social y empresarial", link: "/responsabilidad-social" },
        { title: "Direccionamiento Estratégico", link: "/direccionamiento-estrategico" },
        { title: "Marco Legal", link: "/marco-legal" },
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
                fontFamily: "'Roboto', sans-serif", // Fuente elegante
            }}
        >
            <h4
                style={{
                    color: '#1A1A3B',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                    fontSize: '18px', // Mejor tamaño para el título
                    letterSpacing: '1px', // Espaciado para un efecto limpio
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
                                fontSize: '16px', // Tamaño de letra más grande
                                fontWeight: '500',
                                display: 'inline-block', // Para aplicar efecto hover en todo el enlace
                                transition: 'all 0.3s ease', // Transición suave
                                padding: '5px 10px', // Espaciado adicional
                                borderRadius: '5px', // Bordes redondeados en hover
                            }}
                            onMouseOver={(e) => {
                                e.target.style.color = '#ffffff'; // Cambia el color del texto
                                e.target.style.backgroundColor = '#1A1A3B'; // Fondo oscuro
                            }}
                            onMouseOut={(e) => {
                                e.target.style.color = '#3B3B3B'; // Color original del texto
                                e.target.style.backgroundColor = 'transparent'; // Fondo transparente
                            }}
                        >
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

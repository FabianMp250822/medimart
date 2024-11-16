'use client';

import Link from "next/link";

export default function PacienteMenu() {
    const menuItems = [
        { title: "Solicitar Cita Médica", link: "/appointment" },
        { title: "Directorio de Especialidades y Servicios", link: "/directorio-especialistas" },
        { title: "Tus Resultados Médicos", link: "/reclamar-resultados" },
        { title: "Laboratorio Clínico", link: "/laboratorio-clinico" },
        { title: "Preparación para Exámenes Médicos", link: "/preparacion-examenes" },
        { title: "Entidades en Convenio", link: "/entidades-convenio" },
        { title: "Solicitud de Historia Clínica", link: "/solicitud-historia-clinica" },
        { title: "Derechos y Deberes del Paciente", link: "/derechos-y-deberes" },
        { title: "Durante su Visita", link: "/durante-visita" },
        { title: "Educación al Paciente", link: "/educacion-paciente" },
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
                Pacientes
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

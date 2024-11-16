'use client';

import Link from "next/link";

export default function Menu() {
    const nosotrosMenuItems = [
        { title: "Acerca de Nosotros: Misión, Visión, Valores, Historia", link: "/service-details-3" },
        { title: "Trabaja con nosotros", link: "/trabaja-con-nosotros" },
        { title: "Gestión Documental", link: "/service-details-2" },
        { title: "Certificaciones", link: "/certificaciones" },
        { title: "Responsabilidad social y empresarial", link: "/responsabilidad-social" },
        { title: "Direccionamiento Estratégico", link: "/direccionamiento-estrategico" },
        { title: "Marco Legal", link: "/marco-legal" },
        { title: "Informes de Sostenibilidad", link: "/informes-de-sostenibilidad" },
        { title: "Sistema Integrado de Gestión", link: "/sistema-integrado-de-gestion" },
        { title: "Política de tratamiento de datos", link: "/politica-de-datos" },
    ];

    const pacientesMenuItems = [
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
        <>
            <ul className="navigation clearfix">
                {/* Menú principal */}
                <li className="dropdown"><Link href="/">Inicio</Link></li>

                {/* Sección "Nosotros" */}
                <li className="dropdown">
                    <Link href="#">Nosotros</Link>
                    <ul className="nosotros-submenu">
                        {nosotrosMenuItems.map((item, index) => (
                            <li key={index}>
                                <Link href={item.link}>{item.title}</Link>
                            </li>
                        ))}
                    </ul>
                </li>

                {/* Sección "Servicios" */}
                <li className="dropdown">
                    <Link href="/service-details-6">Servicios</Link>
                </li>

                {/* Sección "Pacientes" */}
                <li className="dropdown">
                    <Link href="#">Pacientes</Link>
                    <ul className="pacientes-submenu">
                        {pacientesMenuItems.map((item, index) => (
                            <li key={index}>
                                <Link href={item.link}>{item.title}</Link>
                            </li>
                        ))}
                    </ul>
                </li>

                {/* Sección "Equipo" */}
                <li className="dropdown">
                    <Link href="/team">Especialistas</Link>
                </li>

                {/* Sección "Preguntas Frecuentes" */}
                <li><Link href="/faq">Faq's</Link></li>

                {/* Sección "Contacto" */}
                <li><Link href="/contact">Contacto</Link></li>
            </ul>

            <style jsx>{`
                .nosotros-submenu, .pacientes-submenu {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                    padding: 10px;
                    background-color: #f9f9f9;
                    min-width: 400px;
                }

                .nosotros-submenu li, .pacientes-submenu li {
                    list-style: none;
                }

                .nosotros-submenu li a, .pacientes-submenu li a {
                    color: #333;
                    text-decoration: none;
                    font-size: 0.9rem;
                }

                .nosotros-submenu li a:hover, .pacientes-submenu li a:hover {
                    color: #2563eb;
                }
            `}</style>
        </>
    );
}

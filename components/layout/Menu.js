import Link from "next/link";

export default function Menu() {
    return (
        <>
            <ul className="navigation clearfix">
                {/* Menú principal */}
                <li className="dropdown"><Link href="/">Inicio</Link></li>

                {/* Sección "Nosotros" */}
                <li className="dropdown">
                    <Link href="/about-us">Nosotros</Link>
                    <ul className="nosotros-submenu">
                    <li><Link href="/service-details-2">Gestión Documental</Link></li>
                        <li><Link href="/about-us/mission">Acerca de Nosotros: Misión, Visión, Valores, Historia</Link></li>
                        <li><Link href="/about-us/social-responsibility">Responsabilidad social y empresarial</Link></li>
                        <li><Link href="/about-us/strategic-direction">Direccionamiento Estratégico</Link></li>
                        <li><Link href="/about-us/integrated-management">Sistema Integrado de Gestión</Link></li>
                        <li><Link href="/about-us/certifications">Certificaciones</Link></li>
                        <li><Link href="/about-us/sustainability-reports">Informes de Sostenibilidad</Link></li>
                        <li><Link href="/about-us/legal-framework">Marco Legal</Link></li>
                        <li><Link href="/about-us/data-policy">Política de tratamiento de datos</Link></li>
                        <li><Link href="/about-us/payment-info">Información proceso de pagos para proveedores</Link></li>
                        <li><Link href="/about-us/jobs">Trabaja con nosotros</Link></li>
                      
                    </ul>
                </li>

                {/* Sección "Servicios" */}
                <li className="dropdown">
                    <Link href="/service-details-6">Servicios</Link>
                </li>

                {/* Sección "Pacientes" actualizada */}
                <li className="dropdown">
                    <Link href="/pacientes">Pacientes</Link>
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
                .nosotros-submenu {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                    padding: 10px;
                    background-color: #f9f9f9;
                    min-width: 400px; /* Aumentar el ancho para acomodar el texto */
                }

                .nosotros-submenu li {
                    list-style: none;
                }

                .nosotros-submenu li a {
                    color: #333;
                    text-decoration: none;
                    font-size: 0.9rem;
                }

                .nosotros-submenu li a:hover {
                    color: #2563eb; /* Color al pasar el mouse */
                }
            `}</style>
        </>
    );
}

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
                    <ul>
                        <li><Link href="/service-details-2">Gestión Documental</Link></li>
                    </ul>
                </li>

                {/* Sección "Servicios" */}
                <li className="dropdown">
                    <Link href="/service-details-6">Servicios</Link>
                    <ul>
                    <li><Link href="/works">Servicio de Urgencias</Link></li>
                        <li><Link href="/hospitalizacion">Hospitalización</Link></li>
                        <li><Link href="/cuidado-critico">Cuidado Crítico</Link></li>
                        <li><Link href="/imagenes-diagnosticas">Departamento de Imágenes Diagnósticas</Link></li>
                        <li><Link href="/laboratorio-patologia">Laboratorio de Patología</Link></li>
                        <li><Link href="/laboratorio-clinico">Laboratorio Clínico</Link></li>
                        <li><Link href="/programas-especiales">Programas Especiales</Link></li>
                    </ul>
                </li>

                {/* Sección "Pacientes" actualizada */}
                <li className="dropdown">
                    <Link href="/pacientes">Pacientes</Link>

                </li>

                {/* Sección "Equipo" */}
                <li className="dropdown">
                    <Link href="/">RRHH</Link>
                    <ul>
                        <li><Link href="/team">Nuestros Profesionales </Link></li>
                    </ul>
                </li>

                {/* Sección "Preguntas Frecuentes" */}
                <li><Link href="/faq">Faq's</Link></li>

                {/* Sección "Contacto" */}
                <li><Link href="/contact">Contacto</Link></li>
            </ul>
        </>
    );
}

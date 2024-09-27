import Link from "next/link"
// import { useRouter } from "next/router"

export default function Menu() {
    // const router = useRouter()

    return (
        <>

            {/* <ul className="sub-menu">
                <Link className={router.pathname == "/" ? "active" : ""}>Home Default</Link>
                <Link className={router.pathname == "/index-2" ? "active" : ""}>Home Interior</Link>
            </ul> */}

            <ul className="navigation clearfix">
                <li className="dropdown"><Link href="/">Inicio</Link>

                </li>
                <li className="dropdown"><Link href="/about-us">Nosotros</Link>
                    <ul>

                        <li><Link href="/service-details">Nuestra Clínica</Link></li>
                        <li><Link href="/service-details-2">Gestion documental</Link></li>
                       

                        {/* ... (similarly for other service items) */}
                    </ul>
                </li>
                <li className="dropdown"><Link href="/">Servicios</Link>
                    <ul>

                        <li><Link href="/service-details">Hospitalización</Link></li>
                        <li><Link href="/service-details-2">Cuidado Crítico</Link></li>
                        <li><Link href="/service-details-3">Departamento de Imágenes Diagnósticas</Link></li>
                        <li><Link href="/service-details-4">Laboratorio de Patología</Link></li>
                        <li><Link href="/service-details-5">Laboratorio Clínico</Link></li>
                        <li><Link href="/service-details-6">Programas Especiales</Link></li>
                        <li><Link href="//service">Atención al Paciente</Link></li>

                        {/* ... (similarly for other service items) */}
                    </ul>
                </li>
                <li className="dropdown"><Link href="/">Pacientes</Link>
                    <ul>

                        <li><Link href="/service">Servicio de Urgencias</Link></li>
                        <li><Link href="/service-details">Hospitalización</Link></li>
                        <li><Link href="/service-details-2">Cuidado Crítico</Link></li>
                        <li><Link href="/service-details-3">Departamento de Imágenes Diagnósticas</Link></li>
                        <li><Link href="/service-details-4">Laboratorio de Patología</Link></li>
                        <li><Link href="/service-details-5">Laboratorio Clínico</Link></li>
                        <li><Link href="/service-details-6">Programas Especiales</Link></li>
                        <li><Link href="/service-details-7">Atención al Paciente</Link></li>


                        {/* ... (similarly for other service items) */}
                    </ul>
                </li>
                <li className="dropdown"><Link href="/">Equipo</Link>
                    <ul>
                        <li><Link href="/team">Nuestro equipo </Link></li>

                    </ul>
                </li>
                {/* Pages */}
                {/* <li className="dropdown"><Link href="/">Pages</Link>
                    <ul>
                        <li className="dropdown"><Link href="/">Blog</Link>
                            <ul>
                                <li><Link href="/blog">Blog Grid</Link></li>
                                <li><Link href="/blog-2">Blog Sidebar</Link></li>
                                <li><Link href="/blog-details">Blog Details</Link></li>
                            </ul>
                        </li>
                        <li><Link href="/tesmonial">Tesmonial</Link></li>
                        <li><Link href="/works">How it works</Link></li>
                        <li><Link href="/chooseus">Why Choose Us</Link></li>
                        <li><Link href="/pricing-table">Pricing-Table</Link></li>
                        <li><Link href="/faq">Faq's</Link></li>
                        <li><Link href="/gallery">Gallery</Link></li>
                        <li><Link href="/appointment">Make Appointment</Link></li>
                        <li><Link href="/error-page">Page Not Found</Link></li>


                        
                    </ul>
                </li> */}
                <li><Link href="/faq">Faq's</Link></li>
                {/* Contact */}
                <li><Link href="/contact">Contact</Link></li>
            </ul>

        </>
    )
}

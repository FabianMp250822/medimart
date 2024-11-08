'use client'
import Link from "next/link";
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Menu() {
    const [nosotrosSubmenu, setNosotrosSubmenu] = useState([]);

    useEffect(() => {
        const fetchNosotrosSubmenu = async () => {
            try {
                const nosotrosRef = collection(db, 'nosotros');
                const nosotrosSnapshot = await getDocs(nosotrosRef);
                const submenus = nosotrosSnapshot.docs
                    .map(doc => ({
                        id: doc.id,
                        title: doc.data().nombre
                    }))
                    .filter(submenu => submenu.title.toLowerCase() !== 'gestión documental'); // Excluir "Gestión Documental"

                setNosotrosSubmenu(submenus);
            } catch (error) {
                console.error("Error fetching nosotros submenu:", error);
            }
        };

        fetchNosotrosSubmenu();
    }, []);

    return (
        <>
            <ul className="navigation clearfix">
                {/* Menú principal */}
                <li className="dropdown"><Link href="/">Inicio</Link></li>

                {/* Sección "Nosotros" */}
                <li className="dropdown">
                    <Link href="/about-us">Nosotros</Link>
                    <ul className="nosotros-submenu">
                        {/* Excluir Gestión Documental */}
                        <li><Link href="/service-details-2">Gestión Documental</Link></li>
                        
                        {/* Renderizar submenús dinámicamente */}
                        {nosotrosSubmenu.map((submenu) => (
                            <li key={submenu.id}>
                                <Link href={`/nosotros/${submenu.id}`}>{submenu.title}</Link>
                            </li>
                        ))}
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

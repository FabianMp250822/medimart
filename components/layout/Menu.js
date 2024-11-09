'use client';
import Link from "next/link";
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Menu() {
    const [nosotrosSubmenu, setNosotrosSubmenu] = useState([]);
    const [pacientesSubmenu, setPacientesSubmenu] = useState([]);

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

        const fetchPacientesSubmenu = async () => {
            try {
                const pacientesRef = collection(db, 'pacientes');
                const pacientesSnapshot = await getDocs(pacientesRef);
                const submenus = pacientesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    title: doc.data().nombre // Campo que contiene el nombre del submenú
                }));
                setPacientesSubmenu(submenus);
            } catch (error) {
                console.error("Error fetching pacientes submenu:", error);
            }
        };

        fetchNosotrosSubmenu();
        fetchPacientesSubmenu();
    }, []);

    return (
        <>
            <ul className="navigation clearfix">
                {/* Menú principal */}
                <li className="dropdown"><Link href="/">Inicio</Link></li>

                {/* Sección "Nosotros" */}
                <li className="dropdown">
                    <Link href="#">Nosotros</Link>
                    <ul className="nosotros-submenu">
                        <li><Link href="/service-details-2">Gestión Documental</Link></li>
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

                {/* Sección "Pacientes" */}
                <li className="dropdown">
                    <Link href="#">Pacientes</Link>
                    <ul className="pacientes-submenu">
                        {pacientesSubmenu.map((submenu) => {
                            const title = submenu.title.toLowerCase();

                            // Verificar si el título es "Tus Resultados Médicos", "Solicitar Cita" o "Directorio de Especialidades y Servicios"
                            if (title === "tus resultados médicos") {
                                return (
                                    <li key={submenu.id}>
                                        <Link href="/reclamar-resultados">Tus Resultados Médicos</Link>
                                    </li>
                                );
                            } else if (title === "solicitar cita" || title === "solicitar cita médica") {
                                return (
                                    <li key={submenu.id}>
                                        <Link href="/appointment">Solicitar Cita Médica</Link>
                                    </li>
                                );
                            } else if (title === "directorio de especialidades y servicios") {
                                return (
                                    <li key={submenu.id}>
                                        <Link href="/service-details-6">Directorio de Especialidades y Servicios</Link>
                                    </li>
                                );
                            }

                            // Para el resto de los elementos, usar la ruta dinámica
                            return (
                                <li key={submenu.id}>
                                    <Link href={`/pacientes/${submenu.id}`}>{submenu.title}</Link>
                                </li>
                            );
                        })}
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

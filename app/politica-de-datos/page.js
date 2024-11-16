'use client';

import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import SidebarMenu from "@/components/elements/SidebarMenu";

export default function Service() {
    const [isActive, setIsActive] = useState({
        status: false,
        key: 1,
    });

    const [sedes, setSedes] = useState([]);

    const handleToggle = (key) => {
        setIsActive((prevState) => ({
            status: prevState.key !== key || !prevState.status,
            key,
        }));
    };

    useEffect(() => {
        const fetchSedes = async () => {
            try {
                const sedesRef = collection(db, "sedes");
                const sedesSnapshot = await getDocs(sedesRef);
                const sedesList = sedesSnapshot.docs.map((doc) => {
                    const nombreCompleto = doc.data().nombre;
                    const nombreProcesado = nombreCompleto.replace("Clínica de la Costa - ", "");
                    return nombreProcesado;
                });
                setSedes(sedesList);
            } catch (error) {
                console.error("Error al obtener las sedes:", error);
            }
        };

        fetchSedes();
    }, []);

    const titulo = "Política de Tratamiento de Datos Personales";
    const descripcion = `
        Este documento detalla las políticas y procedimientos adoptados por la Clínica de la Costa para garantizar el correcto manejo de los datos personales de pacientes, colaboradores y demás partes interesadas, conforme a la legislación vigente y los estándares internacionales de privacidad.
    `;

    const sections = [
        {
            title: "Introducción",
            content: `
                En cumplimiento de las disposiciones legales de protección de datos personales vigentes en Colombia (Ley 1581 de 2012, Decreto 1377 de 2013) y los estándares internacionales como el Reglamento General de Protección de Datos (GDPR), la Clínica de la Costa establece esta política para garantizar la seguridad, confidencialidad y correcto tratamiento de los datos personales.
            `,
        },
        {
            title: "Alcance",
            content: `
                Esta política aplica a todas las actividades relacionadas con la recolección, almacenamiento, uso, transferencia y eliminación de datos personales, ya sea en formato físico o digital.
            `,
        },
        {
            title: "Definiciones",
            content: `
                <ul>
                    <li><strong>Dato Personal:</strong> Información que permite identificar o hacer identificable a una persona.</li>
                    <li><strong>Dato Sensible:</strong> Información que afecta la intimidad del titular o cuyo uso indebido podría generar discriminación.</li>
                    <li><strong>Titular:</strong> Persona natural cuyos datos son objeto de tratamiento.</li>
                    <li><strong>Responsable del Tratamiento:</strong> La Clínica de la Costa, quien decide sobre la base de datos y su tratamiento.</li>
                </ul>
            `,
        },
        {
            title: "Principios Rectores",
            content: `
                <ul>
                    <li><strong>Legalidad:</strong> Cumplimiento de las leyes locales e internacionales aplicables.</li>
                    <li><strong>Finalidad:</strong> Recolección de datos con propósitos legítimos y específicos.</li>
                    <li><strong>Transparencia:</strong> Garantizar el derecho del titular a conocer el tratamiento de sus datos.</li>
                    <li><strong>Seguridad:</strong> Protección adecuada frente a riesgos de pérdida, robo o acceso no autorizado.</li>
                </ul>
            `,
        },
        {
            title: "Finalidades del Tratamiento de Datos",
            content: `
                <ul>
                    <li><strong>Pacientes:</strong>
                        <ul>
                            <li>Gestión administrativa y asistencial.</li>
                            <li>Coordinación de citas y procedimientos.</li>
                            <li>Comunicación sobre salud preventiva y programas de bienestar.</li>
                        </ul>
                    </li>
                    <li><strong>Médicos y Personal:</strong>
                        <ul>
                            <li>Gestión de contratos laborales y certificaciones profesionales.</li>
                        </ul>
                    </li>
                    <li><strong>Proveedores y Terceros:</strong>
                        <ul>
                            <li>Gestión de contratos y facturación.</li>
                        </ul>
                    </li>
                </ul>
            `,
        },
        {
            title: "Derechos de los Titulares",
            content: `
                <ul>
                    <li>Conocer, actualizar y rectificar sus datos personales.</li>
                    <li>Solicitar la supresión de sus datos cuando no sean necesarios para las finalidades establecidas.</li>
                    <li>Presentar quejas ante la autoridad de protección de datos correspondiente.</li>
                </ul>
            `,
        },
        {
            title: "Medidas de Seguridad",
            content: `
                <ul>
                    <li><strong>Seguridad Física:</strong>
                        <ul>
                            <li>Control de acceso restringido a áreas de almacenamiento.</li>
                        </ul>
                    </li>
                    <li><strong>Seguridad Digital:</strong>
                        <ul>
                            <li>Cifrado de datos sensibles.</li>
                            <li>Monitoreo continuo de redes y sistemas.</li>
                        </ul>
                    </li>
                </ul>
            `,
        },
        {
            title: "Transferencia y Conservación de Datos",
            content: `
                <ul>
                    <li>Transferencia a terceros solo con autorización explícita.</li>
                    <li>Conservación de datos durante el tiempo necesario para las finalidades establecidas.</li>
                </ul>
            `,
        },
        {
            title: "Actualización de la Política",
            content: `
                La Clínica de la Costa se reserva el derecho de modificar esta política según nuevas disposiciones legales o avances tecnológicos. Las actualizaciones serán notificadas a través de nuestros canales oficiales.
            `,
        },
    ];

    return (
        <>
            <Layout footerStyle={1}>
                <div
                    className="d-flex flex-column flex-md-row align-items-center p-4"
                    style={{
                        backgroundColor: '#1A1A3B',
                        borderRadius: '8px',
                        marginBottom: '10px',
                        marginTop: '20px',
                        padding: '20px',
                    }}
                >
                    <div className="container">
                        <div
                            className="d-flex flex-column flex-md-row align-items-center"
                            style={{
                                gap: '20px',
                            }}
                        >
                            <div style={{ flex: '1.5' }}>
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/banner%2Fmisionvision_(1)-transformed.jpeg?alt=media&token=fc787cf2-c0e8-4f7a-a5a4-da0291536d42"
                                    alt="Imagen de Servicio"
                                    style={{
                                        borderRadius: '8px',
                                        width: '100%',
                                        height: '100%',
                                        maxHeight: '450px',
                                        objectFit: 'cover',
                                        marginTop: "50px",
                                    }}
                                />
                            </div>
                            <div style={{ flex: '1' }}>
                                <Link href="/servicios" legacyBehavior>
                                    <a
                                        className="text-decoration-none mb-3 d-inline-flex align-items-center"
                                        style={{
                                            fontSize: '16px',
                                            color: '#F0E7D8',
                                            marginBottom: '10px',
                                            marginTop: '50px',
                                        }}
                                    >
                                        <i className="fas fa-arrow-left mr-2"></i> Todos los Servicios
                                    </a>
                                </Link>
                                <h1
                                    style={{
                                        color: '#F0E7D8',
                                        fontSize: '32px',
                                        margin: '20px 0',
                                    }}
                                >
                                    {titulo}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="service-details pb_110">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-3">
                                <SidebarMenu />
                            </div>
                            <div className="col-12 col-md-9">
                                <div className="pt-4">
                                    <div className="mb-4">
                                        <p style={{ fontSize: '16px', color: '#3B3B3B', textAlign: 'justify', lineHeight: '1.8' }}>
                                            {descripcion}
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-muted text-uppercase mb-2" style={{ color: '#F0E7D8' }}>
                                            Disponible en las sedes:
                                        </p>
                                        <div className="d-flex flex-wrap" style={{ gap: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                                            {sedes.map((sede, index) => (
                                                <span
                                                    key={index}
                                                    style={{
                                                        padding: '5px 15px',
                                                        borderRadius: '20px',
                                                        backgroundColor: '#3B3B3B',
                                                        color: '#F0E7D8',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {sede}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="accordion mt-4" id="accordionExample">
                                        {sections.map(({ title, content }, index) => (
                                            <div
                                                className="card"
                                                style={{
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    marginBottom: '15px',
                                                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                                }}
                                                key={index}
                                            >
                                                <div
                                                    className="card-header"
                                                    style={{
                                                        backgroundColor: '#2C2C5B',
                                                        borderRadius: '8px',
                                                    }}
                                                >
                                                    <button
                                                        className="btn btn-link"
                                                        onClick={() => handleToggle(index)}
                                                        style={{
                                                            color: isActive.key === index ? '#F0E7D8' : '#F0E7D8CC',
                                                            width: '100%',
                                                            textAlign: 'left',
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        {title}
                                                    </button>
                                                </div>
                                                {isActive.key === index && (
                                                    <div
                                                        className="card-body"
                                                        style={{
                                                            padding: '20px',
                                                            color: '#3B3B3B',
                                                        }}
                                                        dangerouslySetInnerHTML={{ __html: content }}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

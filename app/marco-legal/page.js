'use client';

import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import SidebarMenu from "@/components/elements/SidebarMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

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

    const titulo = "Marco Legal Clínica de la Costa";
    const descripcion = `
        Este documento establece el marco legal aplicable a la operación de la Clínica de la Costa en Colombia, garantizando el cumplimiento de las normativas locales, nacionales e internacionales en los ámbitos de salud, protección de datos, responsabilidad social, derechos laborales y sostenibilidad ambiental.
    `;

    const sections = [
        {
            title: "Ámbito de Aplicación",
            content: `
                El marco legal cubre todas las actividades de la Clínica de la Costa relacionadas con:
                <ul>
                    <li>Prestación de servicios de salud.</li>
                    <li>Gestión de datos personales y confidenciales.</li>
                    <li>Cumplimiento de normativas laborales y de seguridad.</li>
                    <li>Protección del medio ambiente y gestión de residuos hospitalarios.</li>
                    <li>Responsabilidad social empresarial.</li>
                </ul>
            `,
        },
        {
            title: "Legislación Nacional",
            content: `
                <ul>
                    <li><strong>Sector Salud:</strong>
                        <ul>
                            <li>Ley 100 de 1993: Sistema General de Seguridad Social en Salud.</li>
                            <li>Resolución 2003 de 2014: Condiciones mínimas para las IPS.</li>
                            <li>Ley 1438 de 2011: Reforma del Sistema de Salud priorizando la atención primaria.</li>
                            <li>Resolución 3100 de 2019: Normas de habilitación para las IPS.</li>
                        </ul>
                    </li>
                    <li><strong>Protección de Datos Personales:</strong>
                        <ul>
                            <li>Ley 1581 de 2012: Régimen General de Protección de Datos Personales.</li>
                            <li>Decreto 1377 de 2013: Reglamentación de la Ley 1581 de 2012.</li>
                        </ul>
                    </li>
                    <li><strong>Normativa Laboral y Seguridad en el Trabajo:</strong>
                        <ul>
                            <li>Código Sustantivo del Trabajo.</li>
                            <li>Ley 1562 de 2012: Sistema de Gestión de Seguridad y Salud en el Trabajo.</li>
                            <li>Resolución 0312 de 2019: Estándares mínimos del SG-SST.</li>
                        </ul>
                    </li>
                    <li><strong>Gestión Ambiental:</strong>
                        <ul>
                            <li>Ley 99 de 1993: Marco General de Protección Ambiental.</li>
                            <li>Decreto 351 de 2014: Gestión de residuos hospitalarios.</li>
                            <li>Resolución 1164 de 2002: Manual de Gestión Integral de Residuos Hospitalarios.</li>
                        </ul>
                    </li>
                </ul>
            `,
        },
        {
            title: "Estándares Internacionales",
            content: `
                <ul>
                    <li><strong>Protección de Datos y Privacidad:</strong>
                        <ul>
                            <li>Reglamento General de Protección de Datos (GDPR).</li>
                            <li>HIPAA (Health Insurance Portability and Accountability Act).</li>
                        </ul>
                    </li>
                    <li><strong>Calidad en la Prestación de Servicios de Salud:</strong>
                        <ul>
                            <li>Norma ISO 9001: Gestión de Calidad.</li>
                            <li>Norma ISO 45001: Seguridad y Salud en el Trabajo.</li>
                            <li>Norma ISO 14001: Gestión Ambiental.</li>
                            <li>Joint Commission International (JCI): Estándares de calidad para instituciones de salud.</li>
                        </ul>
                    </li>
                    <li><strong>Derechos Humanos y Ética:</strong>
                        <ul>
                            <li>Declaración Universal de Derechos Humanos (ONU).</li>
                            <li>Código Internacional de Ética Médica (Asociación Médica Mundial).</li>
                            <li>Objetivos de Desarrollo Sostenible (ODS).</li>
                        </ul>
                    </li>
                </ul>
            `,
        },
        {
            title: "Mecanismos de Supervisión y Cumplimiento",
            content: `
                <ul>
                    <li>Auditorías Internas: Verificaciones periódicas del cumplimiento normativo.</li>
                    <li>Capacitación Continua: Formación del personal en leyes y estándares aplicables.</li>
                    <li>Reportes de Sostenibilidad: Informes anuales sobre acciones tomadas.</li>
                    <li>Comité de Cumplimiento Legal: Monitoreo y gestión del cumplimiento normativo.</li>
                </ul>
            `,
        },
        {
            title: "Consecuencias del Incumplimiento",
            content: `
                El incumplimiento de las normativas puede derivar en:
                <ul>
                    <li>Sanciones económicas y administrativas por parte de las autoridades.</li>
                    <li>Daño reputacional afectando la confianza de pacientes y aliados estratégicos.</li>
                    <li>Pérdida de acreditaciones y certificaciones.</li>
                </ul>
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
                            <ServiceHeader titulo={titulo} />
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

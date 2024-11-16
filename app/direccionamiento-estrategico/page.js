'use client';

import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import SidebarMenu from "@/components/elements/SidebarMenu";
import PacienteMenu from "@/components/elements/Pacientemenu";

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

    const titulo = "Dirección Estratégico Clínica de la Costa, Barranquilla";
    const descripcion = `
        Este documento detalla el direccionamiento estratégico de la Clínica de la Costa, alineado con los estándares más exigentes en planificación estratégica y gestión de instituciones de salud. La estrategia define nuestro propósito, metas y métodos para lograr un impacto positivo en nuestros pacientes, colaboradores, la comunidad y el entorno.
    `;

    const sections = [
        {
            title: "Propósito Estratégico",
            content: `
                <ul>
                    <li><strong>Propósito General:</strong> Brindar servicios de salud de alta calidad, accesibles y sostenibles, con un enfoque humano, ético y comprometido con el bienestar integral de nuestros pacientes y la comunidad.</li>
                    <li><strong>Objetivo Central:</strong> Ser líderes en el sector salud en Barranquilla y el Caribe colombiano, destacándonos por nuestra excelencia médica, innovación tecnológica y responsabilidad social.</li>
                </ul>
            `,
        },
        {
            title: "Valores Corporativos",
            content: `
                <ul>
                    <li>Compromiso: Actuar con responsabilidad hacia nuestros pacientes y colaboradores.</li>
                    <li>Calidad: Buscar la excelencia en todos los procesos asistenciales y administrativos.</li>
                    <li>Innovación: Adoptar prácticas y tecnologías que transformen positivamente el sector salud.</li>
                    <li>Empatía: Ofrecer atención basada en el respeto, la dignidad y la humanidad.</li>
                    <li>Sostenibilidad: Operar de manera social, ambiental y económicamente responsable.</li>
                </ul>
            `,
        },
        {
            title: "Misión y Visión",
            content: `
                <ul>
                    <li><strong>Misión:</strong> Proveer atención médica integral que combine tecnología avanzada, talento humano capacitado y un enfoque centrado en el paciente, promoviendo el bienestar y la calidad de vida de nuestra comunidad.</li>
                    <li><strong>Visión:</strong> Para el año 2030, ser reconocidos como el principal referente de servicios de salud en el Caribe colombiano, destacándonos por nuestro liderazgo en innovación, calidad asistencial y responsabilidad social.</li>
                </ul>
            `,
        },
        {
            title: "Análisis del Entorno (DOFA)",
            content: `
                <ul>
                    <li><strong>Fortalezas:</strong>
                        <ul>
                            <li>Prestigio en el sector salud regional.</li>
                            <li>Infraestructura moderna y equipada con tecnología de punta.</li>
                            <li>Talento humano calificado con amplia experiencia.</li>
                            <li>Alto nivel de satisfacción del paciente.</li>
                        </ul>
                    </li>
                    <li><strong>Oportunidades:</strong>
                        <ul>
                            <li>Crecimiento del turismo de salud en Barranquilla.</li>
                            <li>Demanda de servicios médicos especializados en la región.</li>
                            <li>Alianzas estratégicas con entidades públicas y privadas.</li>
                            <li>Uso de telemedicina para ampliar el alcance de nuestros servicios.</li>
                        </ul>
                    </li>
                    <li><strong>Debilidades:</strong>
                        <ul>
                            <li>Dependencia de recursos externos para proyectos de innovación.</li>
                            <li>Alta competencia en el sector privado de salud.</li>
                            <li>Necesidad de fortalecer los programas de fidelización de pacientes.</li>
                        </ul>
                    </li>
                    <li><strong>Amenazas:</strong>
                        <ul>
                            <li>Cambios frecuentes en las normativas del sector salud.</li>
                            <li>Incremento de costos operativos y tecnológicos.</li>
                            <li>Factores económicos que afectan la capacidad de pago de los pacientes.</li>
                            <li>Incremento en los riesgos asociados a pandemias y emergencias sanitarias.</li>
                        </ul>
                    </li>
                </ul>
            `,
        },
        {
            title: "Objetivos Estratégicos",
            content: `
                <ul>
                    <li><strong>Objetivos a Corto Plazo:</strong>
                        <ul>
                            <li>Incrementar en un 20% la satisfacción de los pacientes mediante mejoras en los procesos asistenciales.</li>
                            <li>Ampliar los programas de salud preventiva a comunidades vulnerables en Barranquilla.</li>
                            <li>Implementar un sistema de gestión de residuos hospitalarios alineado con estándares internacionales.</li>
                        </ul>
                    </li>
                    <li><strong>Objetivos a Mediano Plazo:</strong>
                        <ul>
                            <li>Ser reconocidos como una institución certificada en calidad por ICONTEC (ISO 9001).</li>
                            <li>Reducir en un 30% la huella de carbono de nuestras operaciones.</li>
                            <li>Establecer un programa integral de telemedicina para zonas rurales.</li>
                        </ul>
                    </li>
                    <li><strong>Objetivos a Largo Plazo:</strong>
                        <ul>
                            <li>Convertirnos en un hospital universitario, formando profesionales de la salud.</li>
                            <li>Consolidarnos como el centro de referencia en especialidades médicas en la región Caribe.</li>
                            <li>Lograr una cobertura total de nuestras operaciones bajo prácticas de sostenibilidad.</li>
                        </ul>
                    </li>
                </ul>
            `,
        },
        {
            title: "Conclusión",
            content: `
                El direccionamiento estratégico de la Clínica de la Costa está diseñado para consolidar nuestra posición como líderes en el sector salud, actuando con responsabilidad social, ambiental y económica. Este marco estratégico nos permitirá afrontar los desafíos del futuro mientras brindamos un servicio médico excepcional y humano.
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
                                        marginTop:"50px",
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
                                <PacienteMenu />
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

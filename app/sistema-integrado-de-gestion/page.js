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
    const currentYear = new Date().getFullYear();

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

    const titulo = `Sistema Integrado de Gestión (SIG) - Clínica de la Costa`;
    const descripcion = `
        El Sistema Integrado de Gestión (SIG) de la Clínica de la Costa está diseñado para garantizar la excelencia en todas las áreas operativas y administrativas de la institución. Este sistema articula los componentes de calidad, seguridad y salud en el trabajo, gestión ambiental, y responsabilidad social, con base en normativas nacionales e internacionales.
    `;

    const sections = [
        {
            title: "Propósito del SIG",
            content: `
                El propósito del SIG es asegurar que todas las actividades de la Clínica de la Costa se realicen con los más altos estándares de calidad, seguridad y sostenibilidad, garantizando el bienestar de los trabajadores, usuarios, proveedores, contratistas y visitantes.
            `,
        },
        {
            title: "Políticas Integradas",
            content: `
                <h5>Política de Seguridad y Salud en el Trabajo</h5>
                <p><strong>Fecha:</strong> 30 de mayo de 2019 | <strong>Versión:</strong> 04</p>
                <ul>
                    <li>Prevenir riesgos laborales y garantizar la calidad de vida laboral de sus colaboradores.</li>
                    <li>Cumplir con la legislación vigente en Colombia y otros requisitos aplicables.</li>
                    <li>Implementar un sistema de mejora continua en seguridad y salud en el trabajo.</li>
                    <li>Diseñar e implementar planes de prevención y respuesta ante emergencias.</li>
                    <li>Fomentar una cultura de autocuidado y el uso de elementos de protección personal.</li>
                    <li>Proveer formación y sensibilización en temas de seguridad laboral y prevención de riesgos.</li>
                </ul>
                <h5>Política de Calidad</h5>
                <ul>
                    <li>La mejora continua de procesos asistenciales y administrativos.</li>
                    <li>La implementación de tecnologías de última generación.</li>
                    <li>La capacitación constante del talento humano.</li>
                </ul>
                <h5>Política Ambiental</h5>
                <ul>
                    <li>Gestión adecuada de residuos hospitalarios.</li>
                    <li>Reducción del consumo de recursos no renovables.</li>
                    <li>Programas de sensibilización ambiental para colaboradores y usuarios.</li>
                </ul>
                <h5>Política de Responsabilidad Social</h5>
                <ul>
                    <li>La inclusión de programas sociales para población vulnerable.</li>
                    <li>La generación de empleo local y el fortalecimiento de proveedores regionales.</li>
                    <li>La implementación de proyectos que fomenten la equidad, la diversidad y la inclusión.</li>
                </ul>
            `,
        },
        {
            title: "Componentes del SIG",
            content: `
                <h5>Sistema de Gestión de Seguridad y Salud en el Trabajo (SG-SST)</h5>
                <ul>
                    <li>Identificación y control de peligros en todas las áreas locativas.</li>
                    <li>Programas de capacitación y sensibilización.</li>
                    <li>Planes de emergencia y contingencia.</li>
                </ul>
                <h5>Sistema de Gestión de Calidad (SGC)</h5>
                <ul>
                    <li>Protocolos de atención médica basados en estándares internacionales.</li>
                    <li>Monitoreo y medición de indicadores de calidad.</li>
                    <li>Gestión eficiente de los recursos.</li>
                </ul>
                <h5>Sistema de Gestión Ambiental (SGA)</h5>
                <ul>
                    <li>Gestión integral de residuos hospitalarios.</li>
                    <li>Reducción de emisiones y consumo de energía.</li>
                    <li>Cumplimiento de normativas ambientales locales e internacionales.</li>
                </ul>
                <h5>Sistema de Responsabilidad Social Empresarial (RSE)</h5>
                <ul>
                    <li>Alianzas estratégicas con organizaciones comunitarias.</li>
                    <li>Proyectos sociales y educativos para poblaciones vulnerables.</li>
                    <li>Promoción de la igualdad y diversidad en el ámbito laboral.</li>
                </ul>
            `,
        },
        {
            title: "Indicadores Clave de Desempeño (KPIs)",
            content: `
                <table class="table">
                    <thead>
                        <tr>
                            <th>Área</th>
                            <th>Indicador</th>
                            <th>Meta Anual</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Seguridad y Salud</td>
                            <td>Tasa de accidentabilidad laboral</td>
                            <td>< 2%</td>
                        </tr>
                        <tr>
                            <td>Calidad</td>
                            <td>Nivel de satisfacción del usuario</td>
                            <td>> 95%</td>
                        </tr>
                        <tr>
                            <td>Ambiental</td>
                            <td>Residuos reciclados (en toneladas)</td>
                            <td>> 60% del total</td>
                        </tr>
                        <tr>
                            <td>RSE</td>
                            <td>Beneficiarios de programas comunitarios</td>
                            <td>10,000 personas</td>
                        </tr>
                    </tbody>
                </table>
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

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

    const titulo = "Política de Responsabilidad Social Empresarial (RSE)";
    const descripcion = `
        La Clínica de la Costa se compromete a fomentar el bienestar social, ambiental y económico de la comunidad en la que opera,
        en línea con los principios éticos y los valores que definen nuestra institución. Este documento establece las directrices y 
        compromisos de la clínica en materia de responsabilidad social empresarial (RSE), alineados con estándares internacionales y 
        normativas locales.
    `;

    const sections = [
        {
            title: "Misión y Visión en RSE",
            content: `
                <ul>
                    <li><strong>Misión:</strong> Promover el desarrollo sostenible mediante iniciativas sociales, ambientales y económicas que contribuyan al bienestar de la comunidad y fortalezcan la relación entre la clínica y sus grupos de interés.</li>
                    <li><strong>Visión:</strong> Ser reconocidos como líderes en responsabilidad social en el sector salud, consolidando una operación ética y sostenible que inspire confianza y beneficie a las generaciones futuras.</li>
                </ul>
            `,
        },
        {
            title: "Principios Fundamentales",
            content: `
                <ul>
                    <li>Ética y Transparencia: Actuar de manera ética en todos los niveles de la organización.</li>
                    <li>Inclusión y Diversidad: Promover un entorno inclusivo, respetuoso y libre de discriminación.</li>
                    <li>Sostenibilidad: Minimizar nuestro impacto ambiental y maximizar las prácticas sostenibles.</li>
                    <li>Compromiso Comunitario: Priorizar el bienestar de las comunidades a las que servimos.</li>
                    <li>Innovación y Mejora Continua: Implementar tecnologías y procesos que fomenten prácticas responsables.</li>
                </ul>
            `,
        },
        {
            title: "Áreas de Actuación",
            content: `
                <ul>
                    <li><strong>Responsabilidad Social con la Comunidad:</strong>
                        <ul>
                            <li>Jornadas médicas gratuitas en zonas vulnerables.</li>
                            <li>Programas de educación sobre prevención de enfermedades crónicas.</li>
                        </ul>
                    </li>
                    <li><strong>Compromiso con el Medio Ambiente:</strong>
                        <ul>
                            <li>Implementar un sistema de gestión de residuos.</li>
                            <li>Uso de energías renovables y reciclaje.</li>
                        </ul>
                    </li>
                    <li><strong>Responsabilidad con los Colaboradores:</strong>
                        <ul>
                            <li>Programas de cuidado físico y mental.</li>
                            <li>Capacitación y condiciones laborales dignas.</li>
                        </ul>
                    </li>
                </ul>
            `,
        },
        {
            title: "Estrategias de Implementación",
            content: `
                <ul>
                    <li>Diagnóstico inicial para evaluar impactos sociales, ambientales y económicos.</li>
                    <li>Establecer metas medibles a corto, mediano y largo plazo.</li>
                    <li>Crear alianzas estratégicas para maximizar el alcance de las iniciativas.</li>
                </ul>
            `,
        },
        {
            title: "Comunicación y Transparencia",
            content: `
                <ul>
                    <li>Publicar informes anuales de sostenibilidad.</li>
                    <li>Mantener canales abiertos con la comunidad para recibir retroalimentación.</li>
                </ul>
            `,
        },
        {
            title: "Cumplimiento Normativo y Estándares Internacionales",
            content: `
                <ul>
                    <li>Cumplir con leyes ambientales, laborales y de salud de Colombia.</li>
                    <li>Alinear las operaciones con ISO 26000 y los ODS de Naciones Unidas.</li>
                </ul>
            `,
        },
        {
            title: "Reconocimientos y Certificaciones",
            content: `
                <ul>
                    <li>Certificación ISO 14001 en gestión ambiental.</li>
                    <li>Reconocimientos por programas de impacto social.</li>
                </ul>
            `,
        },
        {
            title: "Compromiso Futuro",
            content: `
                La Clínica de la Costa reafirma su compromiso de ser un agente de cambio positivo, liderando iniciativas innovadoras y
                sostenibles que beneficien a nuestros pacientes, colaboradores y la comunidad en general.
            `,
        },
    ];

    return (
        <>
            <Layout footerStyle={1}>
                {/* Banner principal */}
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
                            {/* Imagen */}
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

                            {/* Contenido */}
                            <ServiceHeader titulo={titulo} />
                        </div>
                    </div>
                </div>

                {/* Contenedor principal */}
                <div className="service-details pb_110">
                    <div className="container">
                        <div className="row">
                            {/* Menú lateral */}
                            <div className="col-12 col-md-3">
                                <SidebarMenu />
                            </div>

                            {/* Contenido principal */}
                            <div className="col-12 col-md-9">
                                <div className="pt-4">
                                    {/* Descripción */}
                                    <div className="mb-4">
                                        <p style={{ fontSize: '16px', color: '#3B3B3B', textAlign: 'justify', lineHeight: '1.8' }}>
                                            {descripcion}
                                        </p>
                                    </div>

                                    {/* Sedes */}
                                    <div className="mb-4">
                                        <p
                                            className="text-muted text-uppercase mb-2"
                                            style={{
                                                color: '#F0E7D8',
                                            }}
                                        >
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

                                    {/* Acordeón */}
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

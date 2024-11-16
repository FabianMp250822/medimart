'use client';

import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import SidebarMenu from "@/components/elements/SidebarMenu";
import PacienteMenu from "@/components/elements/Pacientemenu";

export default function MedicalRecordsRequest() {
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

    const titulo = "Solicitud de Historia Clínica";
    const descripcion = `
        La Clínica de la Costa facilita la solicitud de historias clínicas, cumpliendo con la legislación colombiana en materia de protección de datos personales y confidencialidad. A continuación, encontrarás los pasos, requisitos y las directrices necesarias para realizar la solicitud correctamente.
    `;

    const sections = [
        {
            title: "¿Qué es la Historia Clínica?",
            content: `
                <p>
                    La historia clínica es un documento privado, obligatorio y sometido a reserva, que contiene información relevante sobre la salud del paciente, tratamientos recibidos, y demás datos relacionados con la atención médica. Su manejo está regulado por la legislación colombiana y sólo puede ser solicitado bajo ciertas condiciones.
                </p>
            `,
        },
        {
            title: "¿Quién Puede Solicitarla?",
            content: `
                <ul>
                    <li><strong>El titular:</strong> El paciente directamente, presentando su documento de identidad.</li>
                    <li><strong>Terceros autorizados:</strong> Representantes legales o familiares del paciente con autorización escrita y copia de sus documentos de identidad.</li>
                    <li><strong>Por orden judicial:</strong> Autoridades competentes, siempre y cuando se presente una solicitud oficial.</li>
                    <li><strong>En caso de fallecimiento del paciente:</strong> Los familiares en primer grado de consanguinidad, presentando certificado de defunción y documento que acredite parentesco.</li>
                </ul>
            `,
        },
        {
            title: "Requisitos para la Solicitud",
            content: `
                <ul>
                    <li><strong>Para el titular:</strong>
                        <ul>
                            <li>Copia del documento de identidad del paciente.</li>
                            <li>Formato de solicitud firmado (descargable en <a href="mailto:archivo@clinicadelacosta.co">archivo@clinicadelacosta.co</a>).</li>
                        </ul>
                    </li>
                    <li><strong>Para terceros autorizados:</strong>
                        <ul>
                            <li>Copia del documento de identidad del solicitante y del paciente.</li>
                            <li>Carta de autorización firmada por el paciente.</li>
                        </ul>
                    </li>
                    <li><strong>Por orden judicial:</strong>
                        <ul>
                            <li>Copia de la solicitud oficial emitida por la autoridad competente.</li>
                            <li>Documento que acredite la identidad del solicitante.</li>
                        </ul>
                    </li>
                    <li><strong>En caso de fallecimiento:</strong>
                        <ul>
                            <li>Copia del certificado de defunción.</li>
                            <li>Documento que acredite parentesco.</li>
                        </ul>
                    </li>
                </ul>
            `,
        },
        {
            title: "Proceso de Solicitud",
            content: `
                <ol>
                    <li>Enviar un correo a <a href="mailto:archivo@clinicadelacosta.co">archivo@clinicadelacosta.co</a> con los documentos requeridos según el caso.</li>
                    <li>Especificar en el correo:
                        <ul>
                            <li>Nombre completo del paciente.</li>
                            <li>Número de identificación.</li>
                            <li>Fecha de atención médica o servicio solicitado (si aplica).</li>
                            <li>Motivo de la solicitud.</li>
                        </ul>
                    </li>
                    <li>Esperar la confirmación por parte del equipo administrativo, que indicará los pasos siguientes.</li>
                </ol>
            `,
        },
        {
            title: "Tiempos de Respuesta",
            content: `
                <p>
                    De acuerdo con la legislación colombiana, la Clínica de la Costa responderá a la solicitud dentro de un plazo máximo de 10 días hábiles. En caso de requerir tiempo adicional, se notificará al solicitante oportunamente.
                </p>
            `,
        },
        {
            title: "Consideraciones Importantes",
            content: `
                <ul>
                    <li>La solicitud de la historia clínica no tiene costo para el paciente o solicitante, excepto cuando se requieran copias adicionales.</li>
                    <li>La información será entregada únicamente al titular o al tercero autorizado.</li>
                    <li>En ningún caso se entregará información confidencial sin el cumplimiento de los requisitos legales.</li>
                </ul>
            `,
        },
    ];

    return (
        <>
            <Layout footerStyle={1}>
                {/* Encabezado */}
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
                                    src="https://picsum.photos/800/400"
                                    alt="Solicitud de Historia Clínica"
                                    style={{
                                        borderRadius: '8px',
                                        width: '100%',
                                        height: '100%',
                                        maxHeight: '450px',
                                        objectFit: 'cover',
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

                {/* Contenedor Principal */}
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

                                    {/* Sedes */}
                                    <div className="mb-4">
                                        <p className="text-muted text-uppercase mb-2">
                                            Disponible en las sedes:
                                        </p>
                                        <div
                                            className="d-flex flex-wrap"
                                            style={{ gap: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr' }}
                                        >
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

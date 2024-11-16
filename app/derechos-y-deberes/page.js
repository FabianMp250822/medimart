'use client';

import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import SidebarMenu from "@/components/elements/SidebarMenu";
import PacienteMenu from "@/components/elements/Pacientemenu";

export default function RightsAndDuties() {
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

    const titulo = "Derechos y Deberes del Paciente";
    const descripcion = `
        En la Clínica de la Costa, garantizamos que todos nuestros pacientes sean tratados con respeto, dignidad y cuidado. Los derechos y deberes del paciente están diseñados para proteger su salud y promover una relación efectiva con nuestro personal médico y administrativo.
    `;

    const sections = [
        {
            title: "Derechos del Paciente",
            content: `
                <ul>
                    <li><strong>Acceso a la Atención:</strong> Recibir servicios de salud de calidad sin discriminación de raza, religión, género o condición socioeconómica.</li>
                    <li><strong>Información Clara:</strong> Ser informado sobre su estado de salud, tratamientos, alternativas disponibles, riesgos y pronósticos de forma clara y comprensible.</li>
                    <li><strong>Consentimiento Informado:</strong> Aceptar o rechazar procedimientos médicos después de ser debidamente informado.</li>
                    <li><strong>Confidencialidad:</strong> Garantía de privacidad respecto a la información contenida en su historia clínica.</li>
                    <li><strong>Decisiones sobre su Cuerpo:</strong> Ser tratado con respeto, incluyendo la decisión de donar órganos y tejidos.</li>
                    <li><strong>Segunda Opinión:</strong> Solicitar la opinión de otro profesional médico sobre su diagnóstico o tratamiento.</li>
                    <li><strong>Atención Digna:</strong> Ser tratado con cortesía, consideración y respeto en todas las interacciones.</li>
                </ul>
            `,
        },
        {
            title: "Deberes del Paciente",
            content: `
                <ul>
                    <li><strong>Proveer Información Veraz:</strong> Informar con exactitud sobre su estado de salud, antecedentes médicos y hábitos de vida.</li>
                    <li><strong>Seguir Indicaciones:</strong> Cumplir con las recomendaciones y tratamientos prescritos por el personal médico.</li>
                    <li><strong>Respeto Mutuo:</strong> Tratar con respeto al personal de la clínica y a otros pacientes.</li>
                    <li><strong>Cuidado de los Recursos:</strong> Hacer uso adecuado de las instalaciones y recursos de la clínica.</li>
                    <li><strong>Responsabilidad Financiera:</strong> Cumplir con los compromisos económicos relacionados con los servicios recibidos.</li>
                    <li><strong>Consentimiento:</strong> Firmar el consentimiento informado antes de la realización de procedimientos médicos.</li>
                    <li><strong>Participación Activa:</strong> Asistir puntualmente a las citas médicas y reportar cualquier cambio en su estado de salud.</li>
                </ul>
            `,
        },
        {
            title: "Protección de Datos Personales",
            content: `
                <p>
                    De acuerdo con la Ley 1581 de 2012, la Clínica de la Costa garantiza la protección de sus datos personales. Usted tiene derecho a conocer, actualizar y rectificar su información en nuestras bases de datos. Para más información, comuníquese con nuestro equipo a través del correo <a href="mailto:protecciondedatos@clinicadelacosta.co">protecciondedatos@clinicadelacosta.co</a>.
                </p>
            `,
        },
        {
            title: "Reclamaciones y Sugerencias",
            content: `
                <p>
                    Si desea presentar una queja, reclamo o sugerencia, puede hacerlo a través de nuestras líneas de atención o enviando un correo a 
                    <a href="mailto:quejas@clinicadelacosta.co">quejas@clinicadelacosta.co</a>. Nuestro equipo está comprometido a resolver sus inquietudes de manera rápida y eficiente.
                </p>
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
                                    alt="Derechos y Deberes del Paciente"
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

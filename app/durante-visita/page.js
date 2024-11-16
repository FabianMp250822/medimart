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

    const titulo = "Recomendaciones de Seguridad para Visitantes";
    const descripcion = `
        Descubra nuestras recomendaciones de seguridad para garantizar una estancia segura y agradable en la Clínica de la Costa. Cada categoría está detallada para facilitar su cumplimiento.
    `;

    const recommendations = [
        {
            title: "Identificación Correcta",
            content: `
                <ul>
                    <li>Registro de visitantes: Al ingresar, todos los visitantes deben registrarse en recepción presentando un documento de identidad válido.</li>
                    <li>Uso de credenciales: Es obligatorio portar la credencial de visitante en un lugar visible durante toda la estancia en la clínica.</li>
                </ul>
            `,
        },
        {
            title: "Higiene de Manos",
            content: `
                <ul>
                    <li>Lavado de manos: Lávese las manos con agua y jabón al entrar y salir de la habitación del paciente.</li>
                    <li>Uso de desinfectante: Utilice gel antibacterial disponible en dispensadores ubicados estratégicamente en la clínica.</li>
                </ul>
            `,
        },
        {
            title: "Uso de Elementos de Protección Personal (EPP)",
            content: `
                <ul>
                    <li>Mascarillas: El uso de mascarilla es obligatorio en todas las áreas de la clínica.</li>
                    <li>Guantes y batas: En casos específicos, se requerirá el uso de guantes y batas desechables según las indicaciones del personal de salud.</li>
                </ul>
            `,
        },
        {
            title: "Restricciones de Visita",
            content: `
                <ul>
                    <li>Horarios de visita: Respete los horarios establecidos para visitas.</li>
                    <li>Número de visitantes: Limite el número de visitantes por paciente para evitar aglomeraciones.</li>
                    <li>Pacientes en aislamiento: Consulte al personal antes de visitar pacientes en aislamiento.</li>
                </ul>
            `,
        },
        {
            title: "Comportamiento dentro de la Clínica",
            content: `
                <ul>
                    <li>Silencio: Mantenga un ambiente tranquilo.</li>
                    <li>Higiene personal: Evite visitar la clínica si presenta síntomas de enfermedad contagiosa.</li>
                    <li>Prohibición de fumar: Está prohibido fumar en todas las instalaciones.</li>
                </ul>
            `,
        },
        {
            title: "Participación en la Seguridad del Paciente",
            content: `
                <ul>
                    <li>Comunicación: Informe al personal de salud sobre cualquier observación relacionada con la seguridad del paciente.</li>
                    <li>Cumplimiento de indicaciones: Siga las instrucciones proporcionadas por el personal de salud.</li>
                </ul>
            `,
        },
        {
            title: "Manejo de Residuos",
            content: `
                <ul>
                    <li>Desechos comunes: Deposite los residuos en los recipientes adecuados.</li>
                    <li>Objetos punzocortantes: No manipule objetos punzocortantes; informe al personal.</li>
                </ul>
            `,
        },
        {
            title: "Evacuación y Emergencias",
            content: `
                <ul>
                    <li>Salidas de emergencia: Familiarícese con las rutas de evacuación y las salidas de emergencia señalizadas.</li>
                    <li>Procedimientos de emergencia: En caso de una emergencia, siga las instrucciones del personal.</li>
                </ul>
            `,
        },
        {
            title: "Prohibición de Fotografía y Grabación",
            content: `
                <ul>
                    <li>Privacidad: No está permitido tomar fotografías ni realizar grabaciones dentro de las instalaciones.</li>
                </ul>
            `,
        },
        {
            title: "Acompañamiento de Menores",
            content: `
                <ul>
                    <li>Restricciones: Se desaconseja la visita de menores de edad salvo en casos excepcionales y con autorización previa.</li>
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
                                    alt="Recomendaciones para Visitantes"
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
                                        {recommendations.map(({ title, content }, index) => (
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

'use client';

import Layout from "@/components/layout/Layout";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import SidebarMenu from "@/components/elements/SidebarMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";
import ServicesMenu from "@/components/elements/ServicesMenu";

export default function Service() {
    const [isActive, setIsActive] = useState({
        status: false,
        key: 1,
    });

    const [sedes, setSedes] = useState([]); // Estado para almacenar las sedes
    const [sections] = useState([
        {
            title: 'Servicios Ofrecidos',
            content: 'Ofrecemos cuidados especializados para pacientes crónicos que requieren soporte ventilatorio, incluyendo monitoreo constante, terapia respiratoria, manejo de traqueostomía, nutrición especializada y programas de rehabilitación.',
        },
        {
            title: 'Equipo Multidisciplinario',
            content: 'Nuestro equipo está conformado por médicos intensivistas, enfermeras especializadas, terapeutas respiratorios, nutricionistas y personal de apoyo, todos comprometidos con el bienestar del paciente.',
        },
        {
            title: 'Tecnología y Equipamiento',
            content: 'Contamos con ventiladores mecánicos de última generación, sistemas de monitoreo avanzados y equipos de soporte vital para asegurar una atención de alta calidad.',
        },
        {
            title: 'Apoyo a Familiares',
            content: 'Entendemos la importancia del apoyo familiar, por lo que brindamos orientación y recursos para ayudar a los familiares a comprender y participar en el cuidado del paciente.',
        },
        {
            title: 'Protocolos de Seguridad',
            content: 'Implementamos estrictos protocolos de higiene y seguridad para prevenir infecciones y garantizar un ambiente seguro tanto para pacientes como para el personal.',
        },
    ]);
    const [titulo] = useState('Hospitalización Paciente Crónico Con Ventilador');

    const handleToggle = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            });
        } else {
            setIsActive({
                status: true,
                key,
            });
        }
    };

    useEffect(() => {
        const fetchSedes = async () => {
            try {
                const sedesRef = collection(db, "sedes");
                const sedesSnapshot = await getDocs(sedesRef);
                const sedesList = sedesSnapshot.docs.map((doc) => {
                    const nombreCompleto = doc.data().nombre;
                    return nombreCompleto.replace("Clínica de la Costa - ", ""); // Remover prefijo innecesario
                });
                setSedes(sedesList);
            } catch (error) {
                console.error("Error al obtener las sedes:", error);
            }
        };

        fetchSedes();
    }, []);

    return (
        <>
            <Layout footerStyle={1}>
                {/* Banner principal (se mantiene igual) */}
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
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2FDSC01594.JPG?alt=media&token=d932da45-0f06-4b19-85dc-58b718ff3a30"
                                    alt="Hospitalización Paciente Crónico Con Ventilador"
                                    style={{
                                        borderRadius: '8px',
                                        width: '100%',
                                        height: '100%',
                                        maxHeight: '450px',
                                        objectFit: 'cover',
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
                                <ServicesMenu />
                            </div>

                            {/* Contenido principal */}
                            <div className="col-12 col-md-9">
                                <div className="pt-4">
                                    {/* Descripción mejorada */}
                                    <div className="mb-4">
    <h3
        className="text-uppercase mb-2"
        style={{
            fontWeight: 'bold',
        }}
    >
        Nuestro Equipo Multidisciplinario
    </h3>
    <div
        style={{
            fontSize: '16px',
            color: '#3B3B3B',
            textAlign: 'justify',
            lineHeight: '1.8',
        }}
    >
        <p>
            Contamos con un equipo altamente capacitado y comprometido con brindar una atención integral y personalizada a pacientes crónicos que requieren soporte ventilatorio. Entre los servicios que ofrecemos se incluyen:
        </p>

        {/* Lista de servicios con viñetas */}
        <ul style={{ marginLeft: '20px', listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>
                <strong>Monitoreo continuo:</strong> Supervisión constante de signos vitales y parámetros respiratorios para garantizar la estabilidad del paciente en todo momento.
            </li>
            <li>
                <strong>Terapia respiratoria avanzada:</strong> Tratamientos especializados para optimizar la función pulmonar y mejorar la calidad de vida.
            </li>
            <li>
                <strong>Rehabilitación personalizada:</strong> Programas diseñados específicamente para fortalecer la movilidad, promover la independencia y mejorar el bienestar general.
            </li>
            <li>
                <strong>Apoyo y orientación a las familias:</strong> Acompañamiento continuo para garantizar que los familiares comprendan y participen activamente en el cuidado del paciente.
            </li>
        </ul>

        <p style={{ marginTop: '20px' }}>
            Entendemos las complejidades y las necesidades únicas de cada paciente crónico dependiente de ventilador. Por ello:
        </p>

        {/* Lista adicional */}
        <ul style={{ marginLeft: '20px', listStyleType: 'circle', paddingLeft: '20px' }}>
            <li>
                Contamos con <strong>tecnología de última generación</strong> y equipos médicos de vanguardia que garantizan una atención óptima.
            </li>
            <li>
                Implementamos <strong>protocolos estrictos de seguridad</strong> para prevenir infecciones y mantener un entorno seguro y confortable.
            </li>
            <li>
                Nuestro enfoque está en ofrecer un cuidado integral que preserve la salud del paciente y promueva su calidad de vida.
            </li>
        </ul>
    </div>
</div>


                                    {/* Sedes mejoradas */}
                                    <div className="mb-4">
                                        <p
                                            className="text-muted text-uppercase mb-2"
                                            style={{
                                                color: '#F0E7D8',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Disponible en las sedes:
                                        </p>
                                        <div className="row" style={{ gap: '20px' }}>
                                            {sedes.map((sede, index) => (
                                                <div
                                                    key={index}
                                                    className="col-6 col-md-4"
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        marginBottom: '20px',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            padding: '15px',
                                                            borderRadius: '8px',
                                                            backgroundColor: '#3B3B3B',
                                                            color: '#F0E7D8',
                                                            textAlign: 'center',
                                                            width: '100%',
                                                        }}
                                                    >
                                                        {/* Ícono opcional */}
                                                        <i
                                                            className="fas fa-hospital"
                                                            style={{
                                                                fontSize: '24px',
                                                                marginBottom: '10px',
                                                            }}
                                                        ></i>
                                                        <div>{sede}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Acordeón (se mantiene igual) */}
                                    <div
                                        className="accordion mt-4"
                                        id="accordionExample"
                                        style={{ width: '100%' }}
                                    >
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
                                                    id={`heading${index}`}
                                                    style={{
                                                        backgroundColor: '#2C2C5B',
                                                        padding: '0',
                                                        borderRadius: '8px',
                                                    }}
                                                >
                                                    <h5 className="mb-0">
                                                        <button
                                                            className="btn btn-link"
                                                            onClick={() => handleToggle(index)}
                                                            style={{
                                                                color:
                                                                    isActive.key === index
                                                                        ? '#F0E7D8'
                                                                        : '#F0E7D8CC',
                                                                backgroundColor: 'transparent',
                                                                textDecoration: 'none',
                                                                padding: '15px 20px',
                                                                display: 'block',
                                                                width: '100%',
                                                                textAlign: 'left',
                                                                fontWeight: 'bold',
                                                                fontSize: '16px',
                                                                borderRadius: '8px',
                                                                transition:
                                                                    'background-color 0.3s ease, color 0.3s ease',
                                                            }}
                                                        >
                                                            {title}
                                                            <i
                                                                className={`fas fa-chevron-${
                                                                    isActive.key === index
                                                                        ? 'up'
                                                                        : 'down'
                                                                }`}
                                                                style={{ float: 'right' }}
                                                            ></i>
                                                        </button>
                                                    </h5>
                                                </div>
                                                <div
                                                    id={`collapse${index}`}
                                                    className={`collapse ${
                                                        isActive.key === index ? 'show' : ''
                                                    }`}
                                                    aria-labelledby={`heading${index}`}
                                                    data-parent="#accordionExample"
                                                >
                                                    <div
                                                        className="card-body"
                                                        style={{
                                                            padding: '20px',
                                                            color: '#3B3B3B',
                                                            backgroundColor: '#FFFFFF',
                                                            borderBottomLeftRadius: '8px',
                                                            borderBottomRightRadius: '8px',
                                                        }}
                                                    >
                                                        <p>{content}</p>
                                                    </div>
                                                </div>
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

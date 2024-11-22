'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function Infectologia() {
    const [titulo] = useState("Especialidad en Infectología - Clínica de la Costa SAS");
    const [isActive, setIsActive] = useState(null);

    const [imageLoaded, setImageLoaded] = useState(false);
    const [contentImageLoaded, setContentImageLoaded] = useState(false);

    const toggleAccordion = (key) => {
        setIsActive(isActive === key ? null : key);
    };

    return (
        <>
            <Layout footerStyle={1}>
                <div
                    className={`d-flex flex-column ${imageLoaded ? 'flex-md-row' : ''} align-items-center p-4`}
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
                            className={`d-flex flex-column ${imageLoaded ? 'flex-md-row' : ''} align-items-center`}
                            style={{
                                gap: '20px',
                            }}
                        >
                            {imageLoaded && (
                                <div style={{ flex: '1.5' }}>
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Finfectologia.jpg?alt=media&token=12345678-abcd-efgh-ijkl-mnopqrstuvwxyz"
                                        alt="Servicios de Infectología"
                                        onLoad={() => setImageLoaded(true)}
                                        onError={() => setImageLoaded(false)}
                                        style={{
                                            borderRadius: '8px',
                                            width: '100%',
                                            height: 'auto',
                                            maxHeight: '450px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                            )}
                            <ServiceHeader titulo={titulo} />
                        </div>
                    </div>
                </div>

                <div className="service-details pb_110">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-3">
                                <ServicesMenu />
                            </div>
                            <div className="col-12 col-md-9">
                                <div className="pt-4">
                                    <div className="description-section mb-5">
                                        <h1 className="description-title">Infectología: Diagnóstico y Tratamiento de Enfermedades Infecciosas</h1>
                                        <p>
                                            En la Clínica de la Costa SAS, nuestra especialidad en Infectología está dedicada a la prevención, diagnóstico y tratamiento de enfermedades infecciosas. Nuestro equipo de especialistas utiliza las herramientas más avanzadas para garantizar la recuperación y el bienestar de nuestros pacientes.
                                        </p>
                                    </div>

                                    {contentImageLoaded && (
                                        <div className="mb-4">
                                            <img
                                                src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Ftratamiento-infectologia.jpg?alt=media&token=12345678-abcd-efgh-ijkl-mnopqrstuvwxyz"
                                                alt="Diagnóstico en Infectología"
                                                onLoad={() => setContentImageLoaded(true)}
                                                onError={() => setContentImageLoaded(false)}
                                                style={{
                                                    width: '100%',
                                                    borderRadius: '8px',
                                                    marginBottom: '10px',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                            <p
                                                style={{
                                                    color: '#000',
                                                    fontSize: '18px',
                                                    textAlign: 'center',
                                                    marginTop: '5px',
                                                }}
                                            >
                                                Cuidado especializado para el manejo de infecciones complejas
                                            </p>
                                        </div>
                                    )}

                                    <div id="accordion" className="accordion">
                                        <div className="accordion-item">
                                            <h2
                                                className="accordion-header"
                                                onClick={() => toggleAccordion(1)}
                                                style={{
                                                    cursor: 'pointer',
                                                    backgroundColor: isActive === 1 ? '#1A1A3B' : '#f9f9f9',
                                                    color: isActive === 1 ? '#fff' : '#1A1A3B',
                                                    padding: '10px 15px',
                                                    borderRadius: '5px',
                                                    marginBottom: '5px',
                                                    fontSize: '18px',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Servicios de Infectología
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Diagnóstico y tratamiento de infecciones bacterianas, virales, fúngicas y parasitarias.</li>
                                                        <li>Manejo de enfermedades infecciosas crónicas como VIH/SIDA y hepatitis.</li>
                                                        <li>Control de infecciones en pacientes inmunocomprometidos.</li>
                                                        <li>Prevención y manejo de infecciones nosocomiales.</li>
                                                        <li>Asesoramiento en enfermedades infecciosas de viaje.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        <div className="accordion-item">
                                            <h2
                                                className="accordion-header"
                                                onClick={() => toggleAccordion(2)}
                                                style={{
                                                    cursor: 'pointer',
                                                    backgroundColor: isActive === 2 ? '#1A1A3B' : '#f9f9f9',
                                                    color: isActive === 2 ? '#fff' : '#1A1A3B',
                                                    padding: '10px 15px',
                                                    borderRadius: '5px',
                                                    marginBottom: '5px',
                                                    fontSize: '18px',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Beneficios de Nuestra Atención en Infectología
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Diagnósticos rápidos y precisos utilizando tecnología avanzada.</li>
                                                        <li>Tratamientos efectivos basados en guías internacionales.</li>
                                                        <li>Prevención de complicaciones y control de infecciones recurrentes.</li>
                                                        <li>Atención personalizada para casos complejos.</li>
                                                        <li>Educación y orientación para prevenir infecciones futuras.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        <div className="accordion-item">
                                            <h2
                                                className="accordion-header"
                                                onClick={() => toggleAccordion(3)}
                                                style={{
                                                    cursor: 'pointer',
                                                    backgroundColor: isActive === 3 ? '#1A1A3B' : '#f9f9f9',
                                                    color: isActive === 3 ? '#fff' : '#1A1A3B',
                                                    padding: '10px 15px',
                                                    borderRadius: '5px',
                                                    marginBottom: '5px',
                                                    fontSize: '18px',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Tecnología y Métodos Avanzados
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>
                                                            <strong>Diagnóstico Molecular:</strong> Identificación rápida y precisa de agentes infecciosos.
                                                        </li>
                                                        <li>
                                                            <strong>Antibióticos Personalizados:</strong> Selección de tratamientos según el perfil del paciente.</li>
                                                        <li>
                                                            <strong>Laboratorios Especializados:</strong> Cultivos microbiológicos y pruebas serológicas avanzadas.</li>
                                                        <li>
                                                            <strong>Control de Infecciones:</strong> Protocolos estrictos para reducir infecciones hospitalarias.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <p>
                                        En la Clínica de la Costa SAS, nuestro equipo de Infectología está comprometido con la prevención, diagnóstico y tratamiento de enfermedades infecciosas complejas. Confía en nuestros especialistas para proteger tu salud y bienestar. ¡Estamos aquí para ayudarte!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <style jsx>{`
                        .description-title {
                            font-size: 28px;
                            font-weight: bold;
                            color: #1A1A3B;
                            margin-bottom: 15px;
                            text-transform: uppercase;
                        }
                        .accordion-header:hover {
                            background-color: #007bff !important;
                            color: #fff !important;
                        }
                        .service-list {
                            list-style: none;
                            padding-left: 20px;
                            position: relative;
                        }
                        .service-list li {
                            position: relative;
                            margin-bottom: 10px;
                            padding-left: 25px;
                        }
                        .service-list li:before {
                            content: "✓";
                            position: absolute;
                            left: 0;
                            color: #007bff;
                        }
                    `}</style>
                </div>
            </Layout>
        </>
    );
}

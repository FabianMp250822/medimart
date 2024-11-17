'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function GeneralSurgeryService() {
    const [titulo] = useState("Servicio de Cirugía General en la Clínica de la Costa SAS");
    const [isActive, setIsActive] = useState(null);

    const toggleAccordion = (key) => {
        setIsActive(isActive === key ? null : key);
    };

    return (
        <>
            <Layout footerStyle={1}>
                {/* Banner Principal */}
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
                                    alt="Servicio de Cirugía General"
                                    style={{
                                        borderRadius: '8px',
                                        width: '100%',
                                        height: 'auto',
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

                {/* Contenido Principal */}
                <div className="service-details pb_110">
                    <div className="container">
                        <div className="row">
                            {/* Menú Lateral */}
                            <div className="col-12 col-md-3">
                                <ServicesMenu />
                            </div>

                            {/* Contenido */}
                            <div className="col-12 col-md-9">
                                <div className="pt-4">
                                    {/* Descripción Principal */}
                                    <div className="description-section mb-5">
                                        <h2 className="description-title">Atención integral para emergencias y cirugías electivas</h2>
                                        <p>
                                            El Servicio de Cirugía General de la Clínica de la Costa SAS está diseñado para ofrecer una atención completa y especializada en situaciones traumáticas y médico-quirúrgicas, enfocándose principalmente en pacientes mayores de 18 años. Nuestro compromiso es brindar soluciones rápidas, efectivas y seguras, adaptadas a las necesidades individuales de cada paciente.
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <img
                                            src="https://picsum.photos/1200/400?random=4"
                                            alt="Cirugía General"
                                            style={{
                                                width: '100%',
                                                borderRadius: '8px',
                                                marginBottom: '15px',
                                            }}
                                        />
                                    </div>
                                    {/* Acordeón */}
                                    <div id="accordion" className="accordion">
                                        {/* Objetivos del Servicio */}
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
                                                Objetivos del servicio
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        El principal objetivo del servicio de cirugía general es garantizar la atención oportuna en urgencias y emergencias traumáticas y médico-quirúrgicas, cubriendo una amplia gama de condiciones críticas.
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Consulta externa: Atención especializada para procedimientos de cirugía electiva.</li>
                                                        <li>Patología abdominal: Diagnóstico y tratamiento de condiciones relacionadas con el sistema digestivo y abdominal.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Trabajo en Equipo y Recursos Avanzados */}
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
                                                Trabajo en equipo y recursos avanzados
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Nuestro servicio se caracteriza por el trabajo multidisciplinario, colaborando con otras subespecialidades médicas para asegurar un enfoque integral en cada caso. Contamos con:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Tecnología de punta: Equipos modernos que permiten abordar casos complejos y críticos con precisión y eficacia.</li>
                                                        <li>Recursos científicos: Basamos nuestras prácticas en evidencia médica actualizada y protocolos de atención avanzados.</li>
                                                    </ul>
                                                    <p>
                                                        Además, nuestra infraestructura está preparada para recibir pacientes remitidos de otras instituciones, garantizando atención de calidad incluso en los casos más complicados.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* ¿Qué hace único a nuestro servicio? */}
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
                                                ¿Qué hace único a nuestro servicio?
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Atención especializada en emergencias: Disponibilidad para abordar situaciones críticas con rapidez y eficacia.</li>
                                                        <li>Cirugías electivas personalizadas: Enfocadas en patologías abdominales y condiciones específicas del paciente.</li>
                                                        <li>Enfoque multidisciplinario: Coordinación con otras áreas médicas para una atención integral.</li>
                                                        <li>Recursos de última generación: Tecnología avanzada para diagnósticos y procedimientos quirúrgicos.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Compromiso con nuestros pacientes */}
                                        <div className="accordion-item">
                                            <h2
                                                className="accordion-header"
                                                onClick={() => toggleAccordion(4)}
                                                style={{
                                                    cursor: 'pointer',
                                                    backgroundColor: isActive === 4 ? '#1A1A3B' : '#f9f9f9',
                                                    color: isActive === 4 ? '#fff' : '#1A1A3B',
                                                    padding: '10px 15px',
                                                    borderRadius: '5px',
                                                    marginBottom: '5px',
                                                    fontSize: '18px',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Compromiso con nuestros pacientes
                                            </h2>
                                            {isActive === 4 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        En la Clínica de la Costa SAS, el Servicio de Cirugía General se distingue por:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Atención centrada en el paciente: Nos enfocamos en brindar un servicio humano, seguro y confiable.</li>
                                                        <li>Resolución de casos críticos: Contamos con un equipo preparado para enfrentar los desafíos más complejos.</li>
                                                        <li>Cuidado integral: Desde la consulta inicial hasta el seguimiento postoperatorio.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
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
            </Layout>
        </>
    );
}

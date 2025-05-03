'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function LaboratorioPatologia() {
    const [titulo] = useState("Laboratorio de Patología en la Clínica de la Costa SAS");
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
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-20%20at%2011.11.25%20AM.jpeg?alt=media&token=24ac4be7-062b-4021-9c78-42888530cd04"
                                    alt="Laboratorio de Patología"
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
                                        <h2 className="description-title">Diagnósticos precisos para un manejo efectivo de la salud</h2>
                                        <p>
                                            El Laboratorio de Patología de la Clínica de la Costa SAS es un centro de referencia que ofrece servicios de alta calidad para garantizar diagnósticos confiables y oportunos. Nuestro propósito es brindar un diagnóstico seguro que permita determinar el plan de manejo más adecuado para cada paciente, ya sea para prevenir enfermedades o proporcionar un tratamiento efectivo.
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <img
                                            src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-20%20at%2011.11.26%20AM.jpeg?alt=media&token=4e6890dd-c42a-4f65-b6ef-76760af54a04"
                                            alt="Laboratorio de patologia"
                                            style={{
                                                width: '100%',
                                                height: '400px', // Ajusta la altura a 400px
                                                borderRadius: '8px',
                                                marginBottom: '10px',
                                                objectFit: 'cover', // Recorta la imagen para que se ajuste al contenedor
                                            }}
                                        />
                                        {/* Texto debajo de la imagen */}
                                        <p style={{ 
                                            color: '#000', 
                                            fontSize: '18px', 
                                            textAlign: 'center', 
                                            marginTop: '5px',
                                        }}>
                                            {titulo}
                                        </p>
                                    </div>
                                    {/* Acordeón */}
                                    <div id="accordion" className="accordion">
                                        {/* Servicios Especializados */}
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
                                                Servicios especializados
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Inmunohistoquímica: Diagnóstico mediante detección de antígenos en tejidos.</li>
                                                        <li>Inmunofluorescencia: Análisis avanzado con técnicas de fluorescencia.</li>
                                                        <li>Microscopía electrónica: Examen detallado de estructuras celulares.</li>
                                                        <li>Citopatología: Diagnóstico basado en análisis de células individuales.</li>
                                                        <li>Biopsias por congelación: Diagnósticos intraoperatorios rápidos.</li>
                                                        <li>Citometría de flujo: Análisis avanzado para diagnóstico clínico e investigación.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Citometría de Flujo */}
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
                                                Citometría de flujo: Innovación en diagnóstico
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        La citometría de flujo es una técnica multiparamétrica que utiliza un láser para analizar características estructurales y funcionales de células individuales. Contamos con un citómetro modelo NAVIOS de BECKMAN COULTER, capaz de realizar:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Diagnósticos de leucemias agudas (linfoides y mieloides).</li>
                                                        <li>Identificación de enfermedades linfoproliferativas crónicas.</li>
                                                        <li>Evaluación de enfermedad mínima residual en leucemias y mieloma múltiple.</li>
                                                        <li>Análisis de subpoblaciones leucocitarias.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Beneficios */}
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
                                                Beneficios de elegirnos
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Tecnología de punta: Equipos automatizados que garantizan precisión en los resultados.</li>
                                                        <li>Rapidez en los diagnósticos: Procesos eficientes que minimizan los tiempos de espera.</li>
                                                        <li>Amplias aplicaciones clínicas y de investigación.</li>
                                                        <li>Equipo especializado: Profesionales capacitados en cada área del laboratorio.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <p>
                                        El Laboratorio de Patología de la Clínica de la Costa SAS está comprometido con ofrecer diagnósticos confiables y resultados rápidos, asegurando la atención oportuna y efectiva de nuestros pacientes.
                                    </p>
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

'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function DiagnosticoVascular() {
    const [titulo] = useState("Diagnóstico Vascular en la Clínica de la Costa: Precisión y Tecnología Avanzada");
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
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Funnamed%20(1).png?alt=media&token=eb087a7c-4318-42fd-ae8d-3194774bc622"
                                    alt="Diagnóstico Vascular en la Clínica de la Costa"
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
                                    {/* Introducción */}
                                    <div className="description-section mb-5">
                                        <h2 className="description-title">¿Qué es el Diagnóstico Vascular?</h2>
                                        <p>
                                            El diagnóstico vascular es un conjunto de pruebas médicas que evalúan el estado de las arterias y venas del cuerpo. 
                                            Estas pruebas permiten identificar problemas como obstrucciones, aneurismas o insuficiencia venosa. En la Clínica de 
                                            la Costa, utilizamos tecnología avanzada para garantizar diagnósticos precisos y rápidos.
                                        </p>
                                    </div>

                                    {/* Imagen Secundaria */}
                                    {/* <div className="mb-4">
                                        <img
                                            src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fdiagnostico-vascular2.jpg?alt=media"
                                            alt="Procedimientos de Diagnóstico Vascular"
                                            style={{
                                                width: '100%',
                                                height: '400px', // Ajusta la altura a 400px
                                                borderRadius: '8px',
                                                marginBottom: '10px',
                                                objectFit: 'cover', // Recorta la imagen para que se ajuste al contenedor
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
                                            {titulo}
                                        </p>
                                    </div> */}

                                    {/* Acordeón */}
                                    <div id="accordion" className="accordion">
                                        {/* Métodos de Diagnóstico */}
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
                                                Métodos de Diagnóstico Vascular
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <h3>Principales pruebas:</h3>
                                                    <ul className="service-list">
                                                        <li><strong>Ecografía Doppler Vascular:</strong> Evalúa el flujo sanguíneo en arterias y venas.</li>
                                                        <li><strong>Angiografía por Tomografía:</strong> Visualiza en detalle las arterias con medio de contraste.</li>
                                                        <li><strong>Índice Tobillo-Brazo:</strong> Detecta problemas en la circulación periférica.</li>
                                                    </ul>
                                                    <p>
                                                        Estas pruebas no invasivas ofrecen resultados rápidos y confiables, permitiendo a nuestros especialistas 
                                                        detectar problemas de manera temprana.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Enfermedades Diagnosticadas */}
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
                                                Enfermedades Diagnosticadas
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Insuficiencia venosa crónica y varices.</li>
                                                        <li>Trombosis venosa profunda.</li>
                                                        <li>Enfermedades arteriales periféricas.</li>
                                                        <li>Aneurismas y obstrucciones arteriales.</li>
                                                    </ul>
                                                    <p>
                                                        Gracias a nuestro enfoque multidisciplinario, garantizamos una atención integral, desde el diagnóstico 
                                                        hasta el tratamiento.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Beneficios del Diagnóstico Vascular */}
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
                                                Beneficios del Diagnóstico Vascular en la Clínica de la Costa
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li><strong>Precisión:</strong> Resultados detallados y confiables.</li>
                                                        <li><strong>Rapidez:</strong> Diagnósticos en tiempo récord.</li>
                                                        <li><strong>Equipo especializado:</strong> Profesionales altamente capacitados en angiología y diagnóstico vascular.</li>
                                                        <li><strong>Atención personalizada:</strong> Soluciones adaptadas a las necesidades de cada paciente.</li>
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

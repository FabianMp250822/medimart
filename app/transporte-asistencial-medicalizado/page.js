'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function UnitsAndPrograms() {
    const [titulo] = useState("Unidades y Programas de Atención en la Clínica de la Costa SAS");
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
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2Funidades.jpg?alt=media"
                                    alt="Unidades y Programas de Atención"
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
                                        <h2 className="description-title">Transporte Asistencial Medicalizado</h2>
                                        <p>
                                            Contamos con un servicio de transporte asistencial medicalizado compuesto por tres ambulancias completamente dotadas, cumpliendo con los estándares establecidos en la resolución 3100 de 2019, para garantizar atención rápida y segura en situaciones de emergencia.
                                        </p>
                                    </div>

                                    <div className="mb-4">
                                        <img
                                            src="https://picsum.photos/1200/400?random=12"
                                            alt="Transporte Asistencial"
                                            style={{
                                                width: '100%',
                                                borderRadius: '8px',
                                                marginBottom: '15px',
                                            }}
                                        />
                                    </div>

                                    {/* Acordeón */}
                                    <div id="accordion" className="accordion">
                                        {/* Equipo Especializado en Enfermedades Cardíacas */}
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
                                                Equipo Especializado en Enfermedades Cardíacas y Vasculares
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <h3>Procedimientos destacados:</h3>
                                                    <ul className="service-list">
                                                        <li>Diagnóstico y tratamiento de aneurisma aórtico, estenosis aórtica, fibrilación auricular, entre otros.</li>
                                                        <li>Tratamiento de enfermedades valvulares cardíacas e insuficiencia cardíaca.</li>
                                                    </ul>
                                                    <h3>Servicios especializados:</h3>
                                                    <ul className="service-list">
                                                        <li>Laboratorio de imagen cardiovascular avanzada.</li>
                                                        <li>Métodos no invasivos como ecocardiogramas y monitoreo Holter.</li>
                                                        <li>Electrofisiología y cirugía cardiovascular avanzada.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Centro Especializado en Hemato-Oncología */}
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
                                                Centro Especializado en Hemato-Oncología Adulto y Pediátrico
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <h3>Área clínica:</h3>
                                                    <ul className="service-list">
                                                        <li>Oncología clínica para adultos y pediátricos.</li>
                                                        <li>Cirugía oncológica y radioterapia.</li>
                                                        <li>Apoyo psicosocial con nutricionistas, psicólogos y trabajadores sociales.</li>
                                                    </ul>
                                                    <h3>Área diagnóstica:</h3>
                                                    <ul className="service-list">
                                                        <li>Patología oncológica y radiología intervencionista.</li>
                                                        <li>Inmunohistoquímica, genética y medicina nuclear.</li>
                                                    </ul>
                                                    <h3>Talento humano:</h3>
                                                    <ul className="service-list">
                                                        <li>Oncólogos clínicos y hematólogos.</li>
                                                        <li>Radioterapeutas, enfermeras especializadas y psicólogos.</li>
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

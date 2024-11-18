'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function ManejoIntegralHematoncologico() {
    const [titulo] = useState("Manejo Integral del Paciente Hematoncológico en la Clínica de la Costa SAS");
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
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2Fmanejo-hematoncologico.jpg?alt=media"
                                    alt="Manejo Integral Hematoncológico"
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
                                        <h2 className="description-title">Cuidado integral para pacientes hematoncológicos</h2>
                                        <p>
                                            En la Clínica de la Costa SAS, contamos con un programa especializado en el manejo integral del paciente hematoncológico, diseñado para garantizar una atención oportuna, accesible y de alta calidad. Este programa está respaldado por un equipo multidisciplinario y los más altos niveles de excelencia académica e investigación, abarcando tanto población adulta como pediátrica.
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <img
                                            src="https://picsum.photos/1200/400?random=27"
                                            alt="Cirugía Urológica"
                                            style={{
                                                width: '100%',
                                                borderRadius: '8px',
                                                marginBottom: '15px',
                                            }}
                                        />
                                    </div>
                                    {/* Acordeón */}
                                    <div id="accordion" className="accordion">
                                        {/* Equipo Multidisciplinario */}
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
                                                Equipo Multidisciplinario
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Hematología – Oncológica (Adulto y Pediátrica).</li>
                                                        <li>Cirugía Oncológica.</li>
                                                        <li>Oncología Clínica.</li>
                                                        <li>Ginecología Oncológica.</li>
                                                        <li>Urología Oncológica.</li>
                                                        <li>Ortopedia Oncológica.</li>
                                                        <li>Enfermería especializada.</li>
                                                        <li>Psicología y Trabajo Social.</li>
                                                        <li>Nutrición.</li>
                                                        <li>Químico farmacéutico.</li>
                                                        <li>Radioterapia y Medicina Nuclear.</li>
                                                        <li>Patología Oncológica.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Beneficios del Programa */}
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
                                                Beneficios del Programa
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Atención integral especializada.</li>
                                                        <li>Tratamiento oportuno y personalizado.</li>
                                                        <li>Soporte informativo y educativo para el paciente y su familia.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Servicios Especializados */}
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
                                                Servicios Especializados
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>
                                                            <strong>Hospitalización Oncológica:</strong> Dos pabellones con 16 camas cada uno para atención especializada pediátrica y adulta.
                                                        </li>
                                                        <li>
                                                            <strong>Sala de Quimioterapia:</strong> Ubicada en el tercer piso del bloque oncológico, diseñada bajo las normas del Ministerio de Salud para atender pacientes ambulatorios y hospitalizados.
                                                        </li>
                                                        <li>
                                                            Personal multidisciplinario con entrenamiento y dedicación exclusiva para la atención de pacientes con patologías hematológicas y oncológicas.
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <p>
                                        En la Clínica de la Costa SAS, nuestro compromiso es ofrecer un cuidado integral, seguro y humanizado para pacientes con enfermedades hematoncológicas, asegurando resultados positivos y mejorando su calidad de vida.
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

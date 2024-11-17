'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function DiagnosticImagingDepartment() {
    const [titulo] = useState("Departamento de Imágenes Diagnósticas en la Clínica de la Costa SAS");
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
                                    alt="Departamento de Imágenes Diagnósticas"
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
                                        <h2 className="description-title">Diagnóstico preciso con tecnología avanzada</h2>
                                        <p>
                                            En la Clínica de la Costa SAS, nuestro Departamento de Imágenes Diagnósticas está equipado con tecnología de última generación para realizar estudios no invasivos, indoloros y de alta precisión. Nuestros servicios están diseñados para apoyar diagnósticos oportunos y tratamientos efectivos en diversas áreas médicas, con la atención y el profesionalismo que caracteriza a nuestro equipo especializado.
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <img
                                            src="https://picsum.photos/1200/400?random=30"
                                            alt="Departamento de Imágenes Diagnósticas"
                                            style={{
                                                width: '100%',
                                                borderRadius: '8px',
                                                marginBottom: '15px',
                                            }}
                                        />
                                    </div>
                                    {/* Acordeón */}
                                    <div id="accordion" className="accordion">
                                        {/* Radiología Convencional */}
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
                                                Radiología Convencional
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Tórax, Extremidades, Pelvis, Columna, Test de escoliosis, Cráneo y Rostro.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Ecografía */}
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
                                                Ecografía
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Abdominal total, Pélvica, Mamas, Transvaginal, Partes blandas, Osteoarticular, Cuello, Testicular, Doppler hepático y renal, Biopsias guiadas (próstata, mama, hígado, riñón), drenajes de colecciones y nefrostomías percutáneas.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Tomografía */}
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
                                                Tomografía
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Multicorte, reconstrucción 3D, estudios de cráneo, columna, tórax, abdomen, y más.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Resonancia Magnética */}
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
                                                Resonancia Magnética
                                            </h2>
                                            {isActive === 4 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Estudios cardíacos, de cerebro, columna, abdomen, mama, pelvis, músculo esquelético, colangioresonancia, y angioresonancia cerebral.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Radiología Intervencionista */}
                                        <div className="accordion-item">
                                            <h2
                                                className="accordion-header"
                                                onClick={() => toggleAccordion(5)}
                                                style={{
                                                    cursor: 'pointer',
                                                    backgroundColor: isActive === 5 ? '#1A1A3B' : '#f9f9f9',
                                                    color: isActive === 5 ? '#fff' : '#1A1A3B',
                                                    padding: '10px 15px',
                                                    borderRadius: '5px',
                                                    marginBottom: '5px',
                                                    fontSize: '18px',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Radiología Intervencionista
                                            </h2>
                                            {isActive === 5 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Biopsias (tiroides, mamaria, ganglionar, tejidos blandos, pulmón, prostática), drenajes, y procedimientos avanzados como embolización y colocación de stents.
                                                    </p>
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
                `}</style>
            </Layout>
        </>
    );
}

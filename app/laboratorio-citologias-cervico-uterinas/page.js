'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function CytologyLaboratory() {
    const [titulo] = useState("Laboratorio de Citologías Cérvico-Uterinas en la Clínica de la Costa");
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
                                    src="https://example.com/laboratorio-citologias.jpg"
                                    // alt="Laboratorio de Citologías Cérvico-Uterinas"
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
                                        <h2 className="description-title">¿Qué es el Laboratorio de Citologías Cérvico-Uterinas?</h2>
                                        <p>
                                            El laboratorio de citologías cérvico-uterinas es una unidad especializada en la detección temprana y prevención del cáncer de cuello uterino. A través de técnicas avanzadas como el Papanicolaou y la citología en base líquida, permite identificar alteraciones en las células cervicales que podrían evolucionar a lesiones precancerosas o cáncer.
                                        </p>
                                    </div>
                                    {/* <div className="mb-4">
                                        <img
                                            src="https://example.com/citologia-proceso.jpg"
                                            alt="Procesos en el Laboratorio"
                                            style={{
                                                width: '100%',
                                                height: '400px',
                                                borderRadius: '8px',
                                                marginBottom: '10px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <p style={{
                                            color: '#000',
                                            fontSize: '18px',
                                            textAlign: 'center',
                                            marginTop: '5px',
                                        }}>
                                            Diagnóstico temprano para el cuidado de la salud femenina.
                                        </p>
                                    </div> */}

                                    {/* Acordeón */}
                                    <div id="accordion" className="accordion">
                                        {/* Importancia del Laboratorio */}
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
                                                Importancia del Laboratorio
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        La detección temprana es clave para reducir la mortalidad asociada al cáncer de cuello uterino. Este laboratorio permite identificar alteraciones celulares antes de que se conviertan en un problema mayor, ofreciendo una oportunidad única para la prevención y el tratamiento temprano.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Servicios y Procedimientos */}
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
                                                Servicios y Procedimientos
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Pruebas de Papanicolaou.</li>
                                                        <li>Citología en base líquida para mayor precisión.</li>
                                                        <li>Detección de infecciones cervicales y vaginales.</li>
                                                        <li>Diagnóstico de lesiones precancerosas y cancerosas.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Beneficios del Diagnóstico Temprano */}
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
                                                Beneficios del Diagnóstico Temprano
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Detectar alteraciones celulares a tiempo permite aplicar tratamientos menos invasivos, reducir costos y mejorar significativamente la calidad de vida de las pacientes. Además, es fundamental para disminuir la mortalidad asociada al cáncer de cuello uterino.
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

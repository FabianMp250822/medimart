'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function PathologyLab() {
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
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2FDSC01594.JPG?alt=media&token=d932da45-0f06-4b19-85dc-58b718ff3a30"
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
                                        <h2 className="description-title">Diagnóstico seguro y preciso para una atención integral</h2>
                                        <p>
                                            El Laboratorio de Patología de la Clínica de la Costa SAS ofrece servicios especializados para garantizar diagnósticos precisos y seguros. Nuestro propósito es determinar el plan de manejo más adecuado para cada paciente, ya sea para prevenir enfermedades o brindar tratamientos efectivos. Estamos comprometidos con la comunidad médica y científica de la región Caribe, ofreciendo herramientas avanzadas como la citometría de flujo para el diagnóstico de neoplasias hematológicas.
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <img
                                            src="https://picsum.photos/1200/400?random=31"
                                            alt="Laboratorio de Patología"
                                            style={{
                                                width: '100%',
                                                borderRadius: '8px',
                                                marginBottom: '15px',
                                            }}
                                        />
                                    </div>
                                    {/* Acordeón */}
                                    <div id="accordion" className="accordion">
                                        {/* Servicios del Laboratorio */}
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
                                                Servicios del Laboratorio
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Inmunohistoquímica.</li>
                                                        <li>Inmunofluorescencia (criotasto).</li>
                                                        <li>Microscopía electrónica.</li>
                                                        <li>Citopatología.</li>
                                                        <li>Biopsias por congelación.</li>
                                                        <li>Citometría de flujo.</li>
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
                                                Citometría de Flujo: Innovación en el diagnóstico
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        La citometría de flujo es una técnica multiparamétrica que permite analizar características estructurales o particulares de células en suspensión al atravesar una fuente de luz láser. Es una herramienta invaluable en el diagnóstico clínico y la investigación biomédica.
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Diagnóstico preciso de leucemias agudas, linfomas y mieloides.</li>
                                                        <li>Identificación de enfermedades linfoproliferativas crónicas.</li>
                                                        <li>Determinación de enfermedad mínima residual en leucemias y mielomas múltiples.</li>
                                                        <li>Estudios de subpoblaciones leucocitarias.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Servicios Específicos */}
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
                                                Servicios Específicos
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Detección temprana de subpoblaciones celulares mediante inmunofenotipo.</li>
                                                        <li>Conteo de linfocitos CD4/CD8 en pacientes VIH positivos.</li>
                                                        <li>Análisis de linfocitos B, T y células NK en inmunodeficiencias.</li>
                                                        <li>Estudio de líquido cefalorraquídeo para la detección de blastos en leucemia aguda.</li>
                                                        <li>Diagnóstico de hemoglobinuria paroxística nocturna (HPN).</li>
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

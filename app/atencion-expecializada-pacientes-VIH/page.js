'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function HIVCareProgram() {
    const [titulo] = useState("Atención Integral y Especializada para Pacientes con VIH/SIDA en la Clínica de la Costa SAS");
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
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2Fvih.jpg?alt=media"
                                    alt="Atención VIH/SIDA"
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
                                        <h2 className="description-title">Programa de Atención Integral para Pacientes con VIH/SIDA</h2>
                                        <p>
                                            La Clínica de la Costa SAS ofrece un servicio integral con altos estándares de calidad, enfocado en la atención, prevención y control del VIH/SIDA. Con un equipo multidisciplinario altamente capacitado, este programa busca mejorar la calidad de vida de los pacientes y sus familias, a través de un enfoque humano y profesional.
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
                                    {/* Servicios y Beneficios */}
                                    <div id="accordion" className="accordion">
                                        {/* Servicios Disponibles */}
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
                                                Servicios Especializados
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Psicología clínica especializada.</li>
                                                        <li>Psiquiatría.</li>
                                                        <li>Medicina Interna.</li>
                                                        <li>Infectología (Adultos y Pediátrica).</li>
                                                        <li>Medicina General.</li>
                                                        <li>Nutrición.</li>
                                                        <li>Enfermería.</li>
                                                        <li>Trabajo Social.</li>
                                                        <li>Vacunación.</li>
                                                        <li>Servicio Farmacéutico con central de mezclas certificada.</li>
                                                        <li>Transporte Asistencial Medicalizado.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Áreas y Promoción */}
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
                                                Áreas y Promoción de la Salud
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Consulta especializada con equipo interdisciplinario.</li>
                                                        <li>Apoyo diagnóstico y terapéutico.</li>
                                                        <li>Servicio farmacéutico especializado.</li>
                                                        <li>Promoción y prevención a través de educación continua y vacunación.</li>
                                                        <li>Grupos de apoyo para pacientes y familias.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Atención Integral */}
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
                                                Atención Integral y Acompañamiento
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Nuestro equipo multidisciplinario acompaña al paciente en todas las etapas del tratamiento, ofreciendo:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Asesoría previa y posterior a pruebas diagnósticas.</li>
                                                        <li>Consultas especializadas en infectología y medicina interna.</li>
                                                        <li>Remisiones para hospitalización y urgencias en casos especiales.</li>
                                                        <li>Coordinación de servicios y orientación sobre derechos y deberes de los usuarios.</li>
                                                        <li>Ofrecimiento de servicios complementarios como terapia asistida y seguimiento farmacoterapéutico.</li>
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

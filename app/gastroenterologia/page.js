'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function Gastroenterology() {
    const [titulo] = useState("Gastroenterología, Coloproctología y Endoscopia Digestiva en la Clínica de la Costa SAS");
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
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2Fgastroenterologia.jpg?alt=media"
                                    alt="Gastroenterología y Endoscopia Digestiva"
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
                                        <h2 className="description-title">Gastroenterología y Endoscopia Digestiva</h2>
                                        <p>
                                            El Servicio de Gastroenterología Clínica y Endoscopia Digestiva de la Clínica de la Costa SAS cuenta con un equipo de gastroenterólogos, coloproctólogos y personal especializado en endoscopia. Este equipo atiende tanto a pacientes de urgencias como a aquellos en consulta externa o chequeos médicos preventivos, ofreciendo diagnósticos y tratamientos de alta calidad.
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <img
                                            src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-18%20at%202.35.13%20PM.jpeg?alt=media&token=6aae6289-d76f-4b36-b1be-59ad722a2551"
                                            alt="Atención Hospitalaria"
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
                                    {/* Servicios Especializados */}
                                    <div id="accordion" className="accordion">
                                        {/* Procedimientos Realizados */}
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
                                                Procedimientos Realizados
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Endoscopia bajo sedación.</li>
                                                        <li>Colonoscopia.</li>
                                                        <li>CEPRE (Colangiopancreatografía retrógrada endoscópica).</li>
                                                        <li>Gastrostomía.</li>
                                                        <li>Rectosigmoidoscopia.</li>
                                                        <li>Proctosigmoidoscopia.</li>
                                                        <li>Polipectomía endoscópica y ligadura de varices esofágicas.</li>
                                                        <li>Esofagogastroduodenoscopia.</li>
                                                        <li>Obturación de varices gástricas.</li>
                                                        <li>Dilatación digestiva.</li>
                                                        <li>Cápsula endoscópica.</li>
                                                        <li>Spyglass (Litotricia Intraductal por coledoscopia).</li>
                                                        <li>POEM (Miotomía endoscópica para tratamiento de acalasia).</li>
                                                        <li>Terapia de Argón Plasma.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Instalaciones Especializadas */}
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
                                                Instalaciones Especializadas
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Nuestra unidad de gastroenterología está ubicada en el segundo piso de la sede principal, con acceso mediante ascensor y escaleras. Contamos con infraestructura diseñada bajo las normas vigentes para instituciones de salud, incluyendo:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Sala de espera.</li>
                                                        <li>Admisión del paciente.</li>
                                                        <li>Preparación del paciente.</li>
                                                        <li>Sala de procedimientos.</li>
                                                        <li>Recuperación de pacientes.</li>
                                                        <li>Unidades sanitarias.</li>
                                                        <li>Área para transcripción de resultados.</li>
                                                        <li>Área de almacenamiento de insumos y equipos biomédicos.</li>
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

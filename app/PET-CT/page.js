'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function PETCTService() {
    const [titulo] = useState("PET-CT: Diagnóstico Avanzado y Preciso en la Clínica de la Costa SAS");
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
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-20%20at%2011.08.31%20AM.jpeg?alt=media&token=7eec6b5f-7446-4fb8-8dfd-e9e9485f8efc"
                                    alt="Servicio PET-CT"
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
                                        <h2 className="description-title">Innovación en imágenes diagnósticas</h2>
                                        <p>
                                            La tomografía por emisión de positrones (PET) combinada con la tomografía computarizada (CT) es una tecnología avanzada y no invasiva que utiliza radiofármacos para ofrecer un diagnóstico clínico altamente preciso. Este método es fundamental para la estadificación y seguimiento de pacientes con patologías malignas, mejorando los resultados de los tratamientos y la calidad de vida de los pacientes.
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <img
                                             src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-20%20at%2011.08.00%20AM.jpeg?alt=media&token=96fee803-e634-4a08-a5a7-ca948304986e"
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
                                    {/* Tecnología y Servicios */}
                                    <div id="accordion" className="accordion">
                                        {/* Tecnología Avanzada */}
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
                                                Tecnología de vanguardia
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Tecnología EXPLORERPET: Imágenes PET de alta definición.</li>
                                                        <li>Resolución NEMA de 2,9 mm para una visualización detallada.</li>
                                                        <li>Cristales de LYSO con precisión de 2,76 mm.</li>
                                                        <li>Alta precisión cuantitativa del SUV (Standardized Uptake Value).</li>
                                                        <li>Escaneo de alta velocidad para mejorar la experiencia del paciente.</li>
                                                        <li>Red neuronal de inteligencia artificial para imágenes superiores.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Beneficios del PET-CT */}
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
                                                Beneficios del PET-CT Digital
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Diagnósticos más confiables: Detección de lesiones en estadios tempranos.</li>
                                                        <li>Alta resolución espacial para identificar lesiones malignas con precisión.</li>
                                                        <li>Resultados rápidos que favorecen decisiones clínicas oportunas.</li>
                                                        <li>Menor exposición a radiación, asegurando la seguridad del paciente.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Servicios Ofrecidos */}
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
                                                Servicios ofrecidos
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li><strong>Diagnóstico por imágenes PET-CT:</strong> Localización inicial y estadificación de enfermedades malignas.</li>
                                                        <li><strong>Consulta médica especializada:</strong> Evaluación previa y seguimiento postdiagnóstico.</li>
                                                        <li><strong>Nutrición oncológica:</strong> Asesoramiento para mantener un estado nutricional óptimo.</li>
                                                        <li><strong>Psicología y trabajo social:</strong> Apoyo emocional y social para pacientes y familias.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <p>
                                        Contáctanos hoy mismo para agendar tu estudio PET-CT o solicitar más información. En la Clínica de la Costa SAS, garantizamos diagnósticos confiables y un cuidado centrado en el bienestar del paciente.
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

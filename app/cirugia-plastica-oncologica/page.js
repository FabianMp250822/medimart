'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function OncologicPlasticSurgeryService() {
    const [titulo] = useState("Cirugía Plástica Oncológica en la Clínica de la Costa SAS");
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
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%204.42.37%20PM(1).jpeg?alt=media&token=a0535648-1f07-4a43-87c1-8901f530dd94"
                                    alt="Cirugía de Mama y Tumores de Tejidos Blandos"
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
                                        <h2 className="description-title">Restaurando forma y función para una mejor calidad de vida</h2>
                                        <p>
                                            La Cirugía Plástica Oncológica es una rama especializada de la cirugía plástica, enfocada en la reconstrucción de los pacientes tras procedimientos oncológicos. En la Clínica de la Costa SAS, entendemos la importancia de no solo tratar la enfermedad, sino también de restaurar la confianza y calidad de vida de quienes han enfrentado una cirugía oncológica.
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <img
                                            src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-20%20at%209.10.01%20AM.jpeg?alt=media&token=89506541-c55f-44f6-8d77-b64301cf8550"
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
                                    {/* Acordeón */}
                                    <div id="accordion" className="accordion">
                                        {/* ¿Qué es la Cirugía Plástica Oncológica? */}
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
                                                ¿Qué es la cirugía plástica oncológica?
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Esta especialidad combina técnicas avanzadas de reconstrucción con un enfoque personalizado, trabajando principalmente en la recuperación de las áreas afectadas por el cáncer. Su objetivo es restaurar tanto la forma como la función de las partes del cuerpo comprometidas, logrando un equilibrio entre salud física, estética y emocional.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Áreas de Reconstrucción Más Frecuentes */}
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
                                                Áreas de reconstrucción más frecuentes
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <h3>Cáncer de piel:</h3>
                                                    <ul className="service-list">
                                                        <li>Reconstrucción tras la extirpación de tumores cutáneos.</li>
                                                        <li>Reparación estética y funcional para minimizar cicatrices visibles.</li>
                                                    </ul>
                                                    <h3>Cáncer de mama:</h3>
                                                    <ul className="service-list">
                                                        <li>Reconstrucción mamaria tras una mastectomía, utilizando implantes o tejido del propio paciente.</li>
                                                        <li>Técnicas avanzadas que buscan resultados naturales y armoniosos.</li>
                                                    </ul>
                                                    <h3>Cáncer de cabeza y cuello:</h3>
                                                    <ul className="service-list">
                                                        <li>Restauración de áreas críticas como el rostro, mandíbula o garganta.</li>
                                                        <li>Recuperación de funciones esenciales como la masticación o el habla.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Beneficios para los Pacientes */}
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
                                                Beneficios para los pacientes
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>
                                                            <strong>Mejor calidad de vida:</strong> Recuperación de la forma y función de las áreas afectadas, permitiendo una reintegración más rápida a la vida cotidiana.
                                                        </li>
                                                        <li>
                                                            <strong>Resultados estéticos óptimos:</strong> Técnicas avanzadas que buscan restaurar la apariencia natural del paciente.
                                                        </li>
                                                        <li>
                                                            <strong>Apoyo emocional:</strong> Ayuda a reconstruir la confianza y autoestima, esenciales durante el proceso de recuperación del cáncer.
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Nuestro enfoque en la Clínica de la Costa SAS */}
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
                                                Nuestro enfoque en la Clínica de la Costa SAS
                                            </h2>
                                            {isActive === 4 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>
                                                            <strong>Tecnología de última generación:</strong> Garantizamos precisión en cada procedimiento.
                                                        </li>
                                                        <li>
                                                            <strong>Atención integral y personalizada:</strong> Adaptada a las necesidades únicas de cada paciente.
                                                        </li>
                                                        <li>
                                                            <strong>Colaboración interdisciplinaria:</strong> Trabajamos con oncólogos y otros especialistas para asegurar un tratamiento completo y efectivo.
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Compromiso con nuestros pacientes */}
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
                                                Compromiso con nuestros pacientes
                                            </h2>
                                            {isActive === 5 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Nuestro objetivo es acompañar al paciente en cada etapa del proceso, desde el diagnóstico hasta la recuperación completa. Nos enfocamos en:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Restaurar la apariencia y funcionalidad.</li>
                                                        <li>Brindar apoyo emocional a pacientes y familias.</li>
                                                        <li>Garantizar un entorno de seguridad y confianza durante el tratamiento.</li>
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

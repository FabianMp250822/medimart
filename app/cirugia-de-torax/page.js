'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function ThoracicSurgeryService() {
    const [titulo] = useState("Cirugía de Tórax en la Clínica de la Costa SAS");
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
                                    alt="Cirugía Gastrointestinal"
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
                                        <h2 className="description-title">Atención especializada para enfermedades del tórax</h2>
                                        <p>
                                            La cirugía de tórax es una especialidad dedicada al diagnóstico y tratamiento quirúrgico de enfermedades que afectan los órganos y estructuras dentro del tórax, incluyendo pulmones, esófago, tráquea, mediastino y pared torácica. En la Clínica de la Costa SAS, contamos con cirujanos expertos y tecnología avanzada para brindar atención integral y personalizada a nuestros pacientes.
                                        </p>
                                    </div>
                                    {/* Imagen Recortada con Título Debajo */}
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
                                        {/* Procedimientos Especializados */}
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
                                                Procedimientos especializados
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <h3>1. Cirugía pulmonar:</h3>
                                                    <ul className="service-list">
                                                        <li>Resección de tumores malignos y benignos.</li>
                                                        <li>Tratamiento de quistes pulmonares y lesiones infecciosas.</li>
                                                        <li>Lobectomías y segmentectomías para extirpar partes específicas del pulmón afectadas por enfermedad.</li>
                                                    </ul>
                                                    <h3>2. Cirugía de la tráquea y bronquios:</h3>
                                                    <ul className="service-list">
                                                        <li>Reparación de estenosis (estrecheces) en tráquea y bronquios.</li>
                                                        <li>Tratamiento quirúrgico de lesiones traumáticas o congénitas.</li>
                                                    </ul>
                                                    <h3>3. Cirugía del esófago:</h3>
                                                    <ul className="service-list">
                                                        <li>Resección de tumores esofágicos.</li>
                                                        <li>Reparación de hernias de hiato y tratamiento de reflujo gastroesofágico severo.</li>
                                                        <li>Manejo quirúrgico de perforaciones esofágicas.</li>
                                                    </ul>
                                                    <h3>4. Cirugía del mediastino:</h3>
                                                    <ul className="service-list">
                                                        <li>Extirpación de tumores y quistes del mediastino.</li>
                                                        <li>Diagnóstico y tratamiento de enfermedades como timomas o linfomas.</li>
                                                    </ul>
                                                    <h3>5. Cirugía de la pared torácica:</h3>
                                                    <ul className="service-list">
                                                        <li>Reparación de fracturas costales y deformidades congénitas (como el pectus excavatum).</li>
                                                        <li>Reconstrucción de la pared torácica tras traumas o extirpaciones oncológicas.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Técnicas Quirúrgicas Avanzadas */}
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
                                                Técnicas quirúrgicas avanzadas
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <h3>Toracoscopía asistida por video (VATS):</h3>
                                                    <ul className="service-list">
                                                        <li>Técnica mínimamente invasiva que permite visualizar y tratar patologías del tórax a través de pequeñas incisiones.</li>
                                                        <li>
                                                            <strong>Beneficios:</strong> menor dolor postoperatorio, recuperación más rápida y cicatrices mínimas.
                                                        </li>
                                                    </ul>
                                                    <h3>Cirugía robótica:</h3>
                                                    <p>
                                                        Ofrece mayor precisión en procedimientos complejos, especialmente en cirugía oncológica del tórax.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Enfoque Integral */}
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
                                                Enfoque integral
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        El éxito de nuestro servicio de cirugía torácica se basa en un enfoque multidisciplinario, trabajando de la mano con:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Neumólogos: Para el diagnóstico y manejo preoperatorio de enfermedades respiratorias.</li>
                                                        <li>Oncólogos: En casos de tumores malignos en el tórax.</li>
                                                        <li>Especialistas en cuidados intensivos: Para el seguimiento postoperatorio de casos críticos.</li>
                                                        <li>Rehabilitadores respiratorios: Para una recuperación efectiva tras la cirugía.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Compromiso con nuestros pacientes */}
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
                                                Compromiso con nuestros pacientes
                                            </h2>
                                            {isActive === 4 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>
                                                            <strong>Atención personalizada:</strong> Planes quirúrgicos adaptados a las necesidades de cada paciente.
                                                        </li>
                                                        <li>
                                                            <strong>Tecnología de punta:</strong> Equipos modernos que garantizan procedimientos seguros y efectivos.
                                                        </li>
                                                        <li>
                                                            <strong>Equipo especializado:</strong> Cirujanos torácicos con amplia experiencia en casos complejos.
                                                        </li>
                                                        <li>
                                                            <strong>Cuidado integral:</strong> Desde el diagnóstico hasta la recuperación, acompañamos a nuestros pacientes en cada etapa.
                                                        </li>
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

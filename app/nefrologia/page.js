'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function NephrologyProgram() {
    const [titulo] = useState("Programa de Nefrología en la Clínica de la Costa SAS");
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
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2Fnefrologia.jpg?alt=media"
                                    alt="Programa de Nefrología"
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
                                        <h2 className="description-title">Especialistas en Nefrología</h2>
                                        <p>
                                            En la Clínica de la Costa SAS, nuestro programa de nefrología se enfoca en atender patologías como el lupus, con un enfoque integral que incluye orientación y educación tanto para los pacientes como para sus familias. Además, somos especialistas en el diagnóstico y tratamiento de pacientes renales, ofreciendo soluciones personalizadas para cada necesidad.
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
                                    {/* Áreas y Servicios */}
                                    <div id="accordion" className="accordion">
                                        {/* Áreas Especializadas */}
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
                                                Áreas de Atención
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Respuesta de interconsultas.</li>
                                                        <li>Hospitalización en nefrología clínica general.</li>
                                                        <li>Unidad de hemodiálisis aguda.</li>
                                                        <li>Diálisis intrahospitalaria – Nefrointensivismo.</li>
                                                        <li>Atención de pacientes en UCI.</li>
                                                        <li>Toma de biopsia.</li>
                                                        <li>Valoración por consulta externa.</li>
                                                        <li>Hemodiálisis aguda.</li>
                                                        <li>Diálisis peritoneal aguda.</li>
                                                        <li>Terapias de reemplazo renal continuo.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Unidad Renal */}
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
                                                Unidad Renal
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Contamos con personal altamente calificado y tecnología de punta para realizar terapias de soporte renal a pacientes críticamente enfermos, así como a aquellos con enfermedad renal crónica. Entre las terapias disponibles se incluyen:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Hemodiálisis intermitente.</li>
                                                        <li>Terapias de reemplazo renal continuo (hemodiafiltración, hemofiltración).</li>
                                                        <li>Diálisis peritoneal.</li>
                                                        <li>Plasmaféresis.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Factores Diferenciales */}
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
                                                Factores Diferenciales
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Equipo humano con amplia experiencia en el manejo de pacientes renales.</li>
                                                        <li>Atención especializada para pacientes pediátricos.</li>
                                                        <li>Productos de alta calidad y biocompatibles.</li>
                                                        <li>Circuito cerrado de suministro de solución ácida y bicarbonato.</li>
                                                        <li>Acceso a servicios complementarios como imágenes diagnósticas, laboratorio clínico y farmacéutico de alta complejidad.</li>
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

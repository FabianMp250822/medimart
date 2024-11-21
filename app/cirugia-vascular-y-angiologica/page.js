'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function VascularSurgeryService() {
    const [titulo] = useState("Cirugía Vascular y Angiológica en la Clínica de la Costa SAS");
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
                            {/* Imagen */ }
                            <div style={{ flex: '1.5' }}>
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%204.42.37%20PM(1).jpeg?alt=media&token=a0535648-1f07-4a43-87c1-8901f530dd94"
                                    alt="Cirugía Vascular y Angiológica"
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
                                        <h2 className="description-title">Atención especializada para enfermedades del sistema vascular</h2>
                                        <p>
                                            La cirugía vascular y angiológica es una especialidad médica enfocada en el diagnóstico y tratamiento de enfermedades que afectan las arterias, venas y vasos linfáticos. En la Clínica de la Costa SAS, contamos con cirujanos altamente capacitados y tecnología de última generación para ofrecer soluciones quirúrgicas avanzadas que mejoran la salud vascular y la calidad de vida de nuestros pacientes.
                                        </p>
                                    </div>
                                  
                                    {/* Acordeón */}
                                    <div id="accordion" className="accordion">
                                        {/* ¿Qué tratamos en cirugía vascular y angiológica? */}
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
                                                ¿Qué tratamos en cirugía vascular y angiológica?
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <h3>1. Enfermedades arteriales:</h3>
                                                    <ul className="service-list">
                                                        <li>Aneurismas: Reparación de dilataciones anormales en arterias mediante técnicas abiertas o endovasculares.</li>
                                                        <li>Enfermedad arterial periférica: Tratamiento de obstrucciones en arterias de las extremidades que dificultan el flujo sanguíneo.</li>
                                                        <li>Estenosis carotídea: Colocación de stents o procedimientos quirúrgicos para prevenir accidentes cerebrovasculares.</li>
                                                    </ul>
                                                    <h3>2. Enfermedades venosas:</h3>
                                                    <ul className="service-list">
                                                        <li>Varices: Tratamiento mediante técnicas mínimamente invasivas como escleroterapia o ablación láser.</li>
                                                        <li>Trombosis venosa profunda (TVP): Manejo quirúrgico y endovascular para disolver o eliminar coágulos.</li>
                                                        <li>Insuficiencia venosa crónica: Corrección de problemas en el retorno de la sangre al corazón.</li>
                                                    </ul>
                                                    <h3>3. Enfermedades linfáticas:</h3>
                                                    <p>Linfedema: Manejo quirúrgico para reducir la acumulación de líquido linfático en las extremidades.</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Técnicas quirúrgicas avanzadas */}
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
                                                    <h3>Cirugía endovascular:</h3>
                                                    <p>
                                                        Procedimientos mínimamente invasivos realizados a través de pequeñas incisiones para reparar arterias o venas afectadas.
                                                    </p>
                                                    <p><strong>Beneficios:</strong> Menor tiempo de recuperación, menos dolor postoperatorio y reducción de riesgos quirúrgicos.</p>
                                                    <h3>Revascularización arterial:</h3>
                                                    <p>Técnicas abiertas o endovasculares para restaurar el flujo sanguíneo en arterias obstruidas.</p>
                                                    <h3>Ablación láser o radiofrecuencia:</h3>
                                                    <p>Procedimientos modernos para tratar varices con precisión y mínimos efectos secundarios.</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Tecnología de última generación */}
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
                                                Tecnología de última generación
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li><strong>Angiografía digital:</strong> Para el diagnóstico y tratamiento en tiempo real de enfermedades vasculares.</li>
                                                        <li><strong>Sistemas de navegación endovascular:</strong> Para procedimientos complejos con máxima precisión.</li>
                                                        <li><strong>Equipos de ablación láser y radiofrecuencia:</strong> Diseñados para tratar enfermedades venosas de manera rápida y eficaz.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* ¿Por qué elegir la Clínica de la Costa SAS? */}
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
                                                ¿Por qué elegir la Clínica de la Costa SAS?
                                            </h2>
                                            {isActive === 4 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li><strong>Equipo altamente especializado:</strong> Cirujanos vasculares con experiencia en procedimientos avanzados.</li>
                                                        <li><strong>Tecnología de punta:</strong> Equipos modernos que garantizan precisión y seguridad en cada tratamiento.</li>
                                                        <li><strong>Atención personalizada:</strong> Planes de tratamiento adaptados a las necesidades específicas de cada paciente.</li>
                                                        <li><strong>Compromiso con la excelencia:</strong> Garantizamos resultados confiables y una experiencia positiva para cada paciente.</li>
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

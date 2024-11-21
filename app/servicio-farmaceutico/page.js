'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function Farmatologia() {
    const [titulo] = useState("Farmatología en la Clínica de la Costa: Un Servicio Integral para tu Salud");
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
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-21%20at%2012.26.21%20PM.jpeg?alt=media&token=ee93f024-d8cd-47ae-ba60-1385161fc709"
                                    alt="Farmatología en la Clínica de la Costa"
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
                                    {/* Introducción */}
                                    <div className="description-section mb-5">
                                        <h2 className="description-title">¿Qué es la Farmatología?</h2>
                                        <p>
                                            La farmatología es la rama de la farmacia clínica que se ocupa de gestionar los medicamentos utilizados en los hospitales y clínicas. 
                                            En la Clínica de la Costa, este servicio juega un papel clave al:
                                        </p>
                                        <ul className="service-list">
                                            <li>Asegurar la correcta administración de medicamentos durante los procedimientos médicos.</li>
                                            <li>Reducir riesgos asociados con errores de medicación.</li>
                                            <li>Ofrecer apoyo constante a médicos y enfermeras con los tratamientos farmacológicos.</li>
                                        </ul>
                                    </div>
                                    <div className="mb-4">
                                        <img
                                            src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-21%20at%2012.47.17%20PM.jpeg?alt=media&token=02a60e60-5419-4e97-989f-a1a8107f22e8"
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
                                        {/* Preparación Personalizada de Medicamentos */}
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
                                                Preparación Personalizada de Medicamentos
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Nuestro equipo de farmatología prepara los medicamentos de acuerdo con las necesidades específicas de cada paciente, asegurando:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Dosificación precisa según el tratamiento prescrito.</li>
                                                        <li>Cumplimiento de los más altos estándares de seguridad y calidad.</li>
                                                        <li>Supervisión estricta en el manejo de medicamentos sensibles o de alto riesgo.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Suministro de Medicamentos para Procedimientos Quirúrgicos */}
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
                                                Suministro de Medicamentos para Procedimientos Quirúrgicos
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Antes, durante y después de cualquier intervención quirúrgica, nuestro servicio de farmatología asegura que los medicamentos estén disponibles para:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Controlar el dolor postoperatorio.</li>
                                                        <li>Manejar infecciones con antibióticos específicos.</li>
                                                        <li>Facilitar la recuperación mediante terapia farmacológica adecuada.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Atención Farmacéutica en Urgencias */}
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
                                                Atención Farmacéutica en Urgencias
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        En situaciones de emergencia, la rapidez y precisión son esenciales. Nuestro equipo está preparado para:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Entregar medicamentos en tiempo récord para estabilizar pacientes críticos.</li>
                                                        <li>Asistir al personal médico con información sobre interacciones o reacciones adversas.</li>
                                                        <li>Garantizar la disponibilidad continua de medicamentos esenciales.</li>
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

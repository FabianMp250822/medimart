'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function CardiologiaPediatrica() {
    const [titulo] = useState("Cardiología Pediátrica en la Clínica de la Costa SAS");
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
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2Fcardiologia-pediatrica.jpg?alt=media"
                                    alt="Cardiología Pediátrica"
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
                                        <h2 className="description-title">Cuidado especializado para el corazón de los más pequeños</h2>
                                        <p>
                                            El programa de Cardiología Pediátrica de la Clínica de la Costa SAS está diseñado para la detección temprana, tratamiento y manejo integral de cardiopatías congénitas, enfermedades del corazón presentes desde el nacimiento. Nuestro objetivo es garantizar una atención oportuna y efectiva para mejorar la calidad de vida de los niños y sus familias.
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
                                    {/* Acordeón */}
                                    <div id="accordion" className="accordion">
                                        {/* Áreas de Atención */}
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
                                                Áreas de atención en Cardiología Pediátrica
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>
                                                            <strong>Ecocardiografía Doppler Color:</strong> Diagnóstico y evaluación del flujo sanguíneo del corazón.
                                                        </li>
                                                        <li>
                                                            <strong>Ecocardiografía Fetal:</strong> Detección de cardiopatías congénitas durante el embarazo.
                                                        </li>
                                                        <li>
                                                            <strong>Hemodinamia Pediátrica:</strong> Procedimientos para corregir defectos estructurales del corazón.
                                                        </li>
                                                        <li>
                                                            <strong>Cirugía Cardiovascular Pediátrica:</strong> Tratamiento quirúrgico para malformaciones complejas.
                                                        </li>
                                                        <li>
                                                            <strong>Monitoreo y rehabilitación cardíaca:</strong> Holter EKG, pruebas de esfuerzo y programas personalizados.
                                                        </li>
                                                        <li>
                                                            <strong>Consulta externa:</strong> Seguimiento periódico y educación para padres.
                                                        </li>
                                                        <li>
                                                            <strong>Unidad de Cuidados Intensivos Pediátrica:</strong> Monitoreo avanzado para pacientes críticos.
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Equipo Médico */}
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
                                                Nuestro equipo
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Cardiólogos pediátricos especializados.</li>
                                                        <li>Cirujanos cardiovasculares pediátricos.</li>
                                                        <li>Intensivistas pediátricos.</li>
                                                        <li>Enfermeras capacitadas en cuidados cardiovasculares.</li>
                                                        <li>Fisioterapeutas en rehabilitación cardíaca pediátrica.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Beneficios */}
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
                                                Beneficios de nuestro programa
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Detección temprana de cardiopatías para tratamientos efectivos.</li>
                                                        <li>Atención integral desde el diagnóstico prenatal hasta la rehabilitación.</li>
                                                        <li>Tecnología avanzada para estudios y procedimientos.</li>
                                                        <li>Equipo multidisciplinario con enfoque personalizado.</li>
                                                        <li>Soporte continuo a las familias durante todo el proceso.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <p>
                                        En la Clínica de la Costa SAS, nuestro compromiso es ofrecer el mejor cuidado para la salud cardiovascular de los niños, asegurando un enfoque integral y humanizado que apoye tanto a los pequeños pacientes como a sus familias.
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

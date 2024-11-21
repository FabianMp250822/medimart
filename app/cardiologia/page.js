'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function ProgramaCardiologia() {
    const [titulo] = useState("Programa de Cardiología en la Clínica de la Costa SAS");
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
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2Fprograma-cardiologia.jpg?alt=media"
                                    alt="Programa de Cardiología"
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
                                        <h2 className="description-title">Cuidado Integral para la Salud Cardiovascular</h2>
                                        <p>
                                            En la Clínica de la Costa SAS, nuestro Programa de Cardiología está diseñado para ofrecer atención especializada y de calidad a pacientes con enfermedades cardiovasculares. Desde la prevención hasta la cirugía avanzada, nuestra misión es garantizar que usted y sus seres queridos puedan disfrutar de una vida sana y activa.
                                        </p>
                                        <p>
                                            Nuestros especialistas están capacitados para tratar todo tipo de enfermedades cardíacas y vasculares, incluidas las más complejas, brindando un enfoque integral y personalizado que cubre diagnóstico, tratamiento y rehabilitación.
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
                                        {/* Enfermedades Tratadas */}
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
                                                Enfermedades tratadas
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Aneurisma aórtico.</li>
                                                        <li>Estenosis aórtica.</li>
                                                        <li>Fibrilación auricular.</li>
                                                        <li>Arritmias y anormalidades del ritmo cardíaco.</li>
                                                        <li>Cardiomiopatía.</li>
                                                        <li>Enfermedades de las arterias coronarias.</li>
                                                        <li>Trombosis venosa profunda.</li>
                                                        <li>Insuficiencia cardíaca.</li>
                                                        <li>Enfermedades de las válvulas cardíacas.</li>
                                                        <li>Ataque cardíaco y cardiopatía isquémica.</li>
                                                        <li>Venas varicosas y enfermedades vasculares periféricas.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Servicios Especializados */}
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
                                                Servicios especializados
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <h3>1. Diagnóstico avanzado</h3>
                                                    <ul>
                                                        <li>Resonancia magnética cardíaca.</li>
                                                        <li>Angio TC Coronario.</li>
                                                        <li>Calcium Score.</li>
                                                        <li>Ecocardiografía en sus variantes.</li>
                                                        <li>Pruebas de esfuerzo y Holter de EKG.</li>
                                                    </ul>
                                                    <h3>2. Electrofisiología</h3>
                                                    <ul>
                                                        <li>Mapeo tridimensional de arritmias.</li>
                                                        <li>Implantación de dispositivos como marcapasos y desfibriladores.</li>
                                                    </ul>
                                                    <h3>3. Hemodinamia</h3>
                                                    <ul>
                                                        <li>Angioplastias y cierre de defectos cardíacos.</li>
                                                    </ul>
                                                    <h3>4. Cirugía Cardiovascular</h3>
                                                    <ul>
                                                        <li>Revascularización coronaria.</li>
                                                        <li>Cirugía de válvulas cardíacas y aorta.</li>
                                                    </ul>
                                                    <h3>5. Rehabilitación Cardíaca</h3>
                                                    <p>Programas personalizados para recuperación postquirúrgica y manejo de cardiopatías crónicas.</p>
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
                                                Beneficios del programa
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <ul>
                                                        <li>Descubrir riesgos de salud de forma temprana.</li>
                                                        <li>Reducir factores de riesgo mediante educación y cambios en el estilo de vida.</li>
                                                        <li>Atención oportuna frente a síntomas cardíacos.</li>
                                                        <li>Adopción de hábitos saludables con apoyo especializado.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <p>
                                        En la Clínica de la Costa SAS, estamos comprometidos con la salud cardiovascular de nuestros pacientes, garantizando un cuidado integral y de excelencia en cada etapa de su tratamiento.
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

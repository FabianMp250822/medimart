'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function DermatologicSurgeryService() {
    const [titulo] = useState("Cirugía Dermatológica en la Clínica de la Costa SAS");
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
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-18%20at%202.35.13%20PM.jpeg?alt=media&token=6aae6289-d76f-4b36-b1be-59ad722a2551"
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
                                        <h2 className="description-title">Tratamientos especializados para la piel</h2>
                                        <p>
                                            La cirugía dermatológica es una rama especializada de la dermatología enfocada en el diagnóstico y tratamiento quirúrgico de enfermedades y condiciones de la piel, cabello y uñas. En la Clínica de la Costa SAS, contamos con dermatólogos quirúrgicos altamente capacitados y tecnología avanzada para ofrecer soluciones seguras, precisas y efectivas.
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <img
                                            src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%206.31.54%20PM.jpeg?alt=media&token=128385f5-0c3a-452c-9183-439023b2c3a0"
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
                                        {/* ¿Qué es la cirugía dermatológica? */}
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
                                                ¿Qué es la cirugía dermatológica?
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        La cirugía dermatológica combina la precisión quirúrgica con un enfoque estético para tratar una amplia gama de condiciones dermatológicas. Su objetivo no solo es la eliminación de lesiones cutáneas, sino también garantizar el mejor resultado estético y funcional posible.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Procedimientos comunes */}
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
                                                Procedimientos comunes
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <h3>1. Cirugía para el cáncer de piel:</h3>
                                                    <ul className="service-list">
                                                        <li>Extirpación de tumores malignos como carcinoma basocelular, carcinoma espinocelular y melanoma.</li>
                                                        <li>Reconstrucción estética para minimizar cicatrices tras la extirpación.</li>
                                                    </ul>
                                                    <h3>2. Cirugía de lesiones benignas:</h3>
                                                    <ul className="service-list">
                                                        <li>Eliminación de nevus (lunares), quistes sebáceos, lipomas y otros crecimientos cutáneos no cancerosos.</li>
                                                        <li>Tratamiento de verrugas resistentes.</li>
                                                    </ul>
                                                    <h3>3. Procedimientos estéticos:</h3>
                                                    <ul className="service-list">
                                                        <li>Eliminación de cicatrices y queloides.</li>
                                                        <li>Reparación de daños cutáneos causados por el sol o lesiones traumáticas.</li>
                                                        <li>Resurfacing cutáneo para mejorar la textura y apariencia de la piel.</li>
                                                    </ul>
                                                    <h3>4. Biopsias cutáneas:</h3>
                                                    <p>
                                                        Realización de biopsias para el diagnóstico preciso de enfermedades de la piel, como infecciones, enfermedades inflamatorias y lesiones sospechosas de cáncer.
                                                    </p>
                                                    <h3>5. Tratamiento de uñas y cuero cabelludo:</h3>
                                                    <ul className="service-list">
                                                        <li>Extracción de uñas encarnadas resistentes a tratamientos convencionales.</li>
                                                        <li>Manejo quirúrgico de tumores o quistes en el cuero cabelludo.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Innovación en técnicas quirúrgicas */}
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
                                                Innovación en técnicas quirúrgicas
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <h3>Cirugía de Mohs:</h3>
                                                    <p>
                                                        Procedimiento avanzado para el tratamiento del cáncer de piel, que permite preservar la mayor cantidad de tejido sano mientras se elimina el cáncer de forma precisa.
                                                    </p>
                                                    <h3>Técnicas de sutura estética:</h3>
                                                    <p>
                                                        Diseñadas para minimizar cicatrices y mejorar los resultados visuales tras la cirugía.
                                                    </p>
                                                    <h3>Láser quirúrgico:</h3>
                                                    <p>
                                                        Ideal para lesiones superficiales y tratamientos estéticos no invasivos.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Enfoque integral */}
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
                                                Enfoque integral
                                            </h2>
                                            {isActive === 4 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Nuestro servicio de cirugía dermatológica se complementa con un enfoque multidisciplinario que incluye:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Dermatología clínica: Para el diagnóstico y manejo previo a la cirugía.</li>
                                                        <li>Dermatología estética: Para optimizar los resultados finales y cuidar la apariencia del paciente.</li>
                                                        <li>Oncología: En casos de cáncer de piel avanzado.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* ¿Por qué elegirnos? */}
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
                                                ¿Por qué elegirnos?
                                            </h2>
                                            {isActive === 5 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>
                                                            <strong>Equipo especializado:</strong> Dermatólogos quirúrgicos con experiencia en procedimientos avanzados.
                                                        </li>
                                                        <li>
                                                            <strong>Tecnología de última generación:</strong> Equipos modernos que garantizan precisión y seguridad.
                                                        </li>
                                                        <li>
                                                            <strong>Atención personalizada:</strong> Planes de tratamiento diseñados para satisfacer las necesidades específicas de cada paciente.
                                                        </li>
                                                        <li>
                                                            <strong>Enfoque estético:</strong> Nos aseguramos de que cada procedimiento tenga un impacto positivo en la apariencia y confianza del paciente.
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

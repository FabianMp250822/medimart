'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function PlasticSurgeryService() {
    const [titulo] = useState("Cirugía Plástica en la Clínica de la Costa SAS");
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
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2FDSC01594.JPG?alt=media&token=d932da45-0f06-4b19-85dc-58b718ff3a30"
                                    alt="Cirugía Plástica"
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
                                        <h2 className="description-title">Innovación, excelencia y resultados que transforman vidas</h2>
                                        <p>
                                            En la Clínica de la Costa SAS, estamos a la vanguardia de la cirugía plástica, estética y reconstructiva, combinando la más avanzada tecnología con la habilidad y precisión de un equipo de cirujanos altamente capacitados. Nuestros especialistas son pioneros en nuevas técnicas, garantizando resultados que reflejan excelencia y profesionalismo.
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
                                        {/* Tecnología de Última Generación */}
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
                                                Tecnología de última generación
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Nuestra clínica cuenta con equipos de alta tecnología, diseñados para garantizar la máxima seguridad y precisión en cada procedimiento quirúrgico. Gracias a estas herramientas, podemos ofrecer tratamientos innovadores que cumplen con los más altos estándares de calidad.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Cirujanos Plásticos de Excelencia */}
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
                                                Cirujanos plásticos de excelencia
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Nuestros cirujanos no solo tienen una sólida experiencia en el campo de la cirugía plástica, sino que también están comprometidos con la innovación, liderando el desarrollo de nuevas técnicas quirúrgicas. Este enfoque nos permite ofrecer:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>
                                                            <strong>Cirugías estéticas personalizadas:</strong> Enfocadas en mejorar la apariencia del paciente, siempre respetando la naturalidad y armonía del cuerpo.
                                                        </li>
                                                        <li>
                                                            <strong>Cirugías reconstructivas avanzadas:</strong> Diseñadas para restaurar la funcionalidad y estética en pacientes que han enfrentado lesiones, enfermedades o procedimientos previos.
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Servicios Destacados */}
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
                                                Servicios destacados
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <h3>Cirugía estética:</h3>
                                                    <ul className="service-list">
                                                        <li>Rinoplastia (cirugía de nariz)</li>
                                                        <li>Lifting facial</li>
                                                        <li>Abdominoplastia</li>
                                                        <li>Aumento, reducción o levantamiento de senos</li>
                                                        <li>Liposucción y contorno corporal</li>
                                                    </ul>
                                                    <h3>Cirugía reconstructiva:</h3>
                                                    <ul className="service-list">
                                                        <li>Reconstrucción mamaria tras mastectomía</li>
                                                        <li>Reparación de cicatrices complejas</li>
                                                        <li>Corrección de deformidades congénitas</li>
                                                        <li>Tratamiento reconstructivo tras traumatismos o quemaduras</li>
                                                    </ul>
                                                    <h3>Tratamientos complementarios:</h3>
                                                    <ul className="service-list">
                                                        <li>Rejuvenecimiento facial con técnicas mínimamente invasivas</li>
                                                        <li>Aplicación de toxina botulínica y rellenos dérmicos</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Nuestro compromiso */}
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
                                                Nuestro compromiso
                                            </h2>
                                            {isActive === 4 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        En la Clínica de la Costa SAS, cada procedimiento está diseñado para:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Garantizar resultados personalizados, alineados con las expectativas del paciente.</li>
                                                        <li>Ofrecer un entorno seguro y cómodo durante cada etapa del tratamiento.</li>
                                                        <li>Brindar un seguimiento cercano para asegurar una recuperación óptima.</li>
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
                                                        <li>Experiencia y liderazgo: Cirujanos plásticos reconocidos por su innovación y excelencia en procedimientos quirúrgicos.</li>
                                                        <li>Tecnología de punta: Equipos modernos que garantizan precisión y seguridad.</li>
                                                        <li>Atención integral: Un enfoque centrado en las necesidades y bienestar del paciente.</li>
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

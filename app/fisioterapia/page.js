'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function Fisioterapia() {
    const [titulo] = useState("Fisioterapia en la Clínica de la Costa: Recupera Tu Movimiento, Mejora Tu Vida");
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
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Ffisioterapia.jpg?alt=media"
                                   // alt="Fisioterapia en la Clínica de la Costa"
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
                                        <h2 className="description-title">¿Qué es la Fisioterapia?</h2>
                                        <p>
                                            La fisioterapia es una disciplina médica que ayuda a prevenir, tratar y rehabilitar lesiones musculoesqueléticas, neurológicas y cardiovasculares. 
                                            En la Clínica de la Costa, utilizamos técnicas avanzadas y personalizadas para ayudar a nuestros pacientes a recuperar su movimiento, aliviar el dolor 
                                            y mejorar su calidad de vida.
                                        </p>
                                    </div>

                                    {/* Imagen Secundaria */}
                                    {/* <div className="mb-4">
                                        <img
                                            src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Ffisioterapia-paciente.jpg?alt=media"
                                            alt="Sesión de fisioterapia"
                                            style={{
                                                width: '100%',
                                                height: '400px',
                                                borderRadius: '8px',
                                                marginBottom: '10px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <p
                                            style={{
                                                color: '#000',
                                                fontSize: '18px',
                                                textAlign: 'center',
                                                marginTop: '5px',
                                            }}
                                        >
                                            {titulo}
                                        </p>
                                    </div> */}

                                    {/* Acordeón */}
                                    <div id="accordion" className="accordion">
                                        {/* Rehabilitación Musculoesquelética */}
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
                                                Rehabilitación Musculoesquelética
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Diseñada para tratar lesiones deportivas, fracturas, esguinces y problemas articulares como la artritis. 
                                                        Utilizamos ejercicios funcionales, electroterapia y terapias manuales para fortalecer músculos y restaurar el movimiento.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Fisioterapia Neurológica */}
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
                                                Fisioterapia Neurológica
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Tratamos secuelas de accidentes cerebrovasculares, lesiones medulares y enfermedades como Parkinson. 
                                                        Diseñamos ejercicios específicos para mejorar la fuerza, el equilibrio y la coordinación.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Terapia Física Postquirúrgica */}
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
                                                Terapia Física Postquirúrgica
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Apoyamos la recuperación tras cirugías ortopédicas o cardíacas. Nuestro objetivo es reducir el dolor, acelerar la 
                                                        recuperación y restaurar la movilidad mediante programas personalizados.
                                                    </p>
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

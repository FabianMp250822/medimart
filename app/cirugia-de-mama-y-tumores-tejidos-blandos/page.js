'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function BreastAndSoftTissueSurgeryService() {
    const [titulo] = useState("Cirugía de Mama y Tumores de Tejidos Blandos en la Clínica de la Costa SAS");
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
                                        <h2 className="description-title">Tratamiento especializado para la salud de las mamas y tejidos blandos</h2>
                                        <p>
                                            La Cirugía de Mama y Tumores de Tejidos Blandos es una especialidad quirúrgica que se enfoca en el tratamiento de tumores y enfermedades en las mamas, proporcionando soluciones médicas precisas y personalizadas. En la Clínica de la Costa SAS, contamos con un equipo altamente capacitado para garantizar resultados efectivos y seguros, apoyados en las técnicas más avanzadas.
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <img
                                            src="https://picsum.photos/1200/400?random=9"
                                            alt="Cirugía de Mama"
                                            style={{
                                                width: '100%',
                                                borderRadius: '8px',
                                                marginBottom: '15px',
                                            }}
                                        />
                                    </div>
                                    {/* Acordeón */}
                                    <div id="accordion" className="accordion">
                                        {/* Tipos de Cirugía Disponibles */}
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
                                                Tipos de cirugía disponibles
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <h3>1. Cuadrantectomía, mastectomía parcial o mastectomía segmentaria:</h3>
                                                    <p>
                                                        Este procedimiento consiste en extirpar únicamente la parte del seno afectada por el cáncer, junto con una pequeña porción de tejido normal circundante. Su objetivo principal es eliminar la enfermedad mientras se conserva la mayor cantidad posible de tejido mamario sano.
                                                    </p>
                                                    <h3>2. Mastectomía:</h3>
                                                    <p>
                                                        La mastectomía es una cirugía más extensa en la que se extirpa todo el seno, incluyendo:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Todo el tejido mamario.</li>
                                                        <li>Tejidos cercanos afectados (cuando es necesario).</li>
                                                    </ul>
                                                    <p>
                                                        Esta técnica se utiliza cuando la enfermedad afecta una mayor parte del seno o cuando es esencial para el tratamiento del paciente.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Nuestro enfoque en la Clínica de la Costa SAS */}
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
                                                Nuestro enfoque en la Clínica de la Costa SAS
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>
                                                            <strong>Equipo de especialistas:</strong> Contamos con los mejores profesionales en cirugía de mama, quienes te guiarán y acompañarán en cada etapa del tratamiento.
                                                        </li>
                                                        <li>
                                                            <strong>Tecnología avanzada:</strong> Utilizamos técnicas de última generación que garantizan procedimientos precisos y seguros.
                                                        </li>
                                                        <li>
                                                            <strong>Atención personalizada:</strong> Diseñamos planes quirúrgicos adaptados a las necesidades y características únicas de cada paciente.
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* ¿Por qué elegirnos? */}
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
                                                ¿Por qué elegirnos?
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>
                                                            <strong>Resultados efectivos:</strong> Nos enfocamos en eliminar la enfermedad mientras cuidamos la salud general del paciente.
                                                        </li>
                                                        <li>
                                                            <strong>Cuidado integral:</strong> Colaboramos con otros especialistas, como oncólogos y psicólogos, para ofrecer un enfoque multidisciplinario.
                                                        </li>
                                                        <li>
                                                            <strong>Acompañamiento cercano:</strong> Sabemos que el tratamiento quirúrgico puede ser un desafío emocional y físico, por lo que brindamos apoyo en cada paso del proceso.
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

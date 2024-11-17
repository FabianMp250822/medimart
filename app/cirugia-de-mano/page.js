'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function HandSurgeryService() {
    const [titulo] = useState("Cirugía de la Mano en la Clínica de la Costa SAS");
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
                                    alt="Cirugía de la Mano"
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
                                        <h2 className="description-title">Restaurando la funcionalidad y calidad de vida</h2>
                                        <p>
                                            La cirugía de la mano es una especialidad médica que se enfoca en el diagnóstico, tratamiento y rehabilitación de lesiones, deformidades y enfermedades que afectan la mano, muñeca y antebrazo. En la Clínica de la Costa SAS, contamos con un equipo de cirujanos expertos y tecnología avanzada para garantizar resultados efectivos y personalizados, ayudando a nuestros pacientes a recuperar su funcionalidad y calidad de vida.
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <img
                                            src="https://picsum.photos/1200/400?random=16"
                                            alt="Cirugía de la Mano"
                                            style={{
                                                width: '100%',
                                                borderRadius: '8px',
                                                marginBottom: '15px',
                                            }}
                                        />
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
                                                    <h3>1. Lesiones traumáticas:</h3>
                                                    <ul className="service-list">
                                                        <li>Reparación de fracturas de mano, muñeca y dedos.</li>
                                                        <li>Reconstrucción de tendones y nervios.</li>
                                                        <li>Tratamiento de lesiones por aplastamiento o amputaciones parciales.</li>
                                                    </ul>
                                                    <h3>2. Enfermedades degenerativas:</h3>
                                                    <ul className="service-list">
                                                        <li>Tratamiento quirúrgico de la artrosis de la mano y muñeca.</li>
                                                        <li>Artroplastia (reemplazo articular) para restaurar la movilidad.</li>
                                                    </ul>
                                                    <h3>3. Síndrome del túnel carpiano:</h3>
                                                    <p>
                                                        Liberación quirúrgica del nervio mediano para aliviar el dolor, entumecimiento y debilidad asociados con esta condición.
                                                    </p>
                                                    <h3>4. Deformidades congénitas:</h3>
                                                    <ul className="service-list">
                                                        <li>Corrección de anomalías presentes al nacer, como dedos fusionados (sindactilia) y dedos adicionales (polidactilia).</li>
                                                        <li>Ausencia parcial o completa de estructuras de la mano.</li>
                                                    </ul>
                                                    <h3>5. Reparación de lesiones crónicas:</h3>
                                                    <ul className="service-list">
                                                        <li>Tratamiento de dedo en gatillo y otras condiciones que afectan la movilidad.</li>
                                                        <li>Cirugía para corregir contracturas, como la contractura de Dupuytren.</li>
                                                    </ul>
                                                    <h3>6. Cirugía reconstructiva:</h3>
                                                    <ul className="service-list">
                                                        <li>Reimplante de dedos o manos amputados.</li>
                                                        <li>Reconstrucción de tejidos blandos y huesos tras traumatismos o cirugías previas.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Innovación en técnicas quirúrgicas */}
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
                                                Innovación en técnicas quirúrgicas
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <h3>Microcirugía:</h3>
                                                    <p>Para reparar estructuras diminutas como nervios y vasos sanguíneos.</p>
                                                    <h3>Técnicas mínimamente invasivas:</h3>
                                                    <p>
                                                        Procedimientos con pequeñas incisiones que reducen el dolor postoperatorio y el tiempo de recuperación.
                                                    </p>
                                                    <h3>Artroscopía de muñeca:</h3>
                                                    <p>Para diagnosticar y tratar lesiones intraarticulares con precisión.</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Enfoque integral */}
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
                                                        El éxito de nuestro servicio de cirugía de la mano se basa en un enfoque multidisciplinario, que incluye:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Fisioterapia especializada: Para recuperar fuerza, movilidad y funcionalidad tras la cirugía.</li>
                                                        <li>Rehabilitación integral: Programas personalizados para cada paciente, enfocados en optimizar los resultados.</li>
                                                        <li>Diagnóstico avanzado: Estudios como resonancias magnéticas y electromiografías para planificar tratamientos efectivos.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* ¿Por qué elegirnos? */}
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
                                                ¿Por qué elegirnos?
                                            </h2>
                                            {isActive === 4 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>
                                                            <strong>Equipo especializado:</strong> Cirujanos con amplia experiencia en procedimientos avanzados de la mano.
                                                        </li>
                                                        <li>
                                                            <strong>Tecnología de última generación:</strong> Equipos modernos que aseguran precisión y seguridad.
                                                        </li>
                                                        <li>
                                                            <strong>Atención personalizada:</strong> Planes de tratamiento diseñados a la medida de las necesidades y objetivos de cada paciente.
                                                        </li>
                                                        <li>
                                                            <strong>Cuidado integral:</strong> Desde el diagnóstico hasta la rehabilitación, acompañamos a nuestros pacientes en cada etapa.
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

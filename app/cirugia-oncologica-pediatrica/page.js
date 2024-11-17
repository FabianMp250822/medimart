'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function PediatricOncologicSurgeryService() {
    const [titulo] = useState("Cirugía Oncológica Pediátrica en la Clínica de la Costa SAS");
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
                                    alt="Cirugía Oncológica Pediátrica"
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
                                        <h2 className="description-title">Cuidado especializado para los más pequeños</h2>
                                        <p>
                                            La cirugía oncológica pediátrica es una rama de la medicina que combina la cirugía y la oncología para tratar a niños con tumores malignos y otras condiciones relacionadas con el cáncer. En la Clínica de la Costa SAS, contamos con cirujanos pediátricos especializados y tecnología avanzada para abordar estas complejas patologías, siempre con un enfoque humanizado y adaptado a las necesidades únicas de los pacientes pediátricos y sus familias.
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <img
                                            src="https://picsum.photos/1200/400?random=17"
                                            alt="Cirugía Oncológica Pediátrica"
                                            style={{
                                                width: '100%',
                                                borderRadius: '8px',
                                                marginBottom: '15px',
                                            }}
                                        />
                                    </div>
                                    {/* Acordeón */}
                                    <div id="accordion" className="accordion">
                                        {/* ¿Qué es la cirugía oncológica pediátrica? */}
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
                                                ¿Qué es la cirugía oncológica pediátrica?
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Esta especialidad se enfoca en el tratamiento quirúrgico de niños con cáncer, con el objetivo de:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Extirpar tumores malignos.</li>
                                                        <li>Restaurar la funcionalidad de los órganos afectados.</li>
                                                        <li>Mejorar la calidad de vida del paciente.</li>
                                                    </ul>
                                                    <p>
                                                        Nuestro enfoque combina precisión quirúrgica con un cuidado integral, que incluye el apoyo emocional y psicológico para los niños y sus familias.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Tipos de procedimientos que realizamos */}
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
                                                Tipos de procedimientos que realizamos
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <h3>1. Resección de tumores sólidos:</h3>
                                                    <ul className="service-list">
                                                        <li>Tratamiento de tumores en órganos como hígado, riñón (tumor de Wilms), pulmones y glándulas suprarrenales.</li>
                                                    </ul>
                                                    <h3>2. Cirugía para cáncer abdominal:</h3>
                                                    <ul className="service-list">
                                                        <li>Extirpación de tumores en el intestino, colon y otros órganos digestivos.</li>
                                                        <li>Manejo de masas abdominales complejas.</li>
                                                    </ul>
                                                    <h3>3. Cirugía para cáncer de huesos y tejidos blandos:</h3>
                                                    <ul className="service-list">
                                                        <li>Tratamiento quirúrgico de sarcomas, como el sarcoma de Ewing y el osteosarcoma.</li>
                                                        <li>Reconstrucción postquirúrgica en casos de tumores óseos.</li>
                                                    </ul>
                                                    <h3>4. Cirugía de tumores cerebrales:</h3>
                                                    <p>
                                                        En colaboración con especialistas en neurocirugía pediátrica, tratamos tumores intracraneales con técnicas avanzadas.
                                                    </p>
                                                    <h3>5. Cirugía mínimamente invasiva:</h3>
                                                    <p>
                                                        En casos seleccionados, utilizamos técnicas laparoscópicas para reducir el tiempo de recuperación y minimizar el impacto quirúrgico.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Nuestro enfoque integral */}
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
                                                Nuestro enfoque integral
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        En la Clínica de la Costa SAS, la cirugía oncológica pediátrica no solo aborda el aspecto quirúrgico, sino que también garantiza una atención completa gracias a un enfoque multidisciplinario que incluye:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Oncología pediátrica: Para coordinar tratamientos como quimioterapia y radioterapia.</li>
                                                        <li>Cuidados intensivos pediátricos: Para un seguimiento postquirúrgico en casos críticos.</li>
                                                        <li>Psicología pediátrica: Para apoyar emocionalmente al paciente y su familia durante el proceso.</li>
                                                        <li>Rehabilitación física: Para ayudar a los niños a recuperar fuerza y funcionalidad tras la cirugía.</li>
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
                                                            <strong>Experiencia en cirugía pediátrica oncológica:</strong> Cirujanos altamente capacitados en el manejo de casos complejos.
                                                        </li>
                                                        <li>
                                                            <strong>Atención personalizada:</strong> Cada caso es evaluado y tratado de manera individual, con un plan adaptado a las necesidades del paciente.
                                                        </li>
                                                        <li>
                                                            <strong>Enfoque humano y empático:</strong> Trabajamos para que los niños y sus familias se sientan seguros y acompañados durante todo el proceso.
                                                        </li>
                                                        <li>
                                                            <strong>Cuidado integral:</strong> Desde el diagnóstico hasta la recuperación, brindamos atención en cada etapa del tratamiento.
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

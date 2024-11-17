'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function GastrointestinalSurgeryService() {
    const [titulo] = useState("Cirugía Gastrointestinal en la Clínica de la Costa SAS");
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
                                        <h2 className="description-title">Soluciones quirúrgicas avanzadas para el sistema digestivo</h2>
                                        <p>
                                            La cirugía gastrointestinal se enfoca en el tratamiento quirúrgico de enfermedades y trastornos del sistema digestivo, incluyendo esófago, estómago, intestinos, colon, recto, hígado, páncreas y vesícula biliar. En la Clínica de la Costa SAS, contamos con un equipo de cirujanos altamente capacitados y tecnología de última generación para ofrecer procedimientos efectivos, seguros y personalizados.
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <img
                                            src="https://picsum.photos/1200/400?random=12"
                                            alt="Cirugía Gastrointestinal"
                                            style={{
                                                width: '100%',
                                                borderRadius: '8px',
                                                marginBottom: '15px',
                                            }}
                                        />
                                    </div>
                                    {/* Acordeón */}
                                    <div id="accordion" className="accordion">
                                        {/* Áreas de Especialización */}
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
                                                Áreas de especialización
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <h3>1. Cirugía de esófago y estómago:</h3>
                                                    <ul className="service-list">
                                                        <li>Tratamiento de hernia hiatal y reflujo gastroesofágico.</li>
                                                        <li>Extirpación de tumores esofágicos y gástricos.</li>
                                                        <li>Reconstrucciones postquirúrgicas tras cirugías oncológicas.</li>
                                                    </ul>
                                                    <h3>2. Cirugía de intestinos y colon:</h3>
                                                    <ul className="service-list">
                                                        <li>Resección de tumores malignos y pólipos intestinales.</li>
                                                        <li>Tratamiento quirúrgico de enfermedades inflamatorias como colitis ulcerativa y enfermedad de Crohn.</li>
                                                        <li>Cirugía para corregir obstrucciones intestinales.</li>
                                                    </ul>
                                                    <h3>3. Cirugía hepatobiliar y pancreática:</h3>
                                                    <ul className="service-list">
                                                        <li>Extirpación de tumores en hígado, vesícula biliar y páncreas.</li>
                                                        <li>Tratamiento de cálculos biliares y complicaciones asociadas.</li>
                                                        <li>Cirugía laparoscópica para condiciones como colecistitis aguda.</li>
                                                    </ul>
                                                    <h3>4. Cirugía colorrectal:</h3>
                                                    <ul className="service-list">
                                                        <li>Tratamiento de cáncer de colon y recto.</li>
                                                        <li>Reparación de fisuras y fístulas anales.</li>
                                                        <li>Cirugía para el manejo de enfermedades como diverticulitis y hemorroides.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Innovación en Cirugía Mínimamente Invasiva */}
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
                                                Innovación en cirugía mínimamente invasiva
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        En la Clínica de la Costa SAS, estamos a la vanguardia de los procedimientos laparoscópicos para cirugías gastrointestinales. Estas técnicas ofrecen múltiples beneficios para el paciente, incluyendo:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Menor tiempo de recuperación.</li>
                                                        <li>Menos dolor postoperatorio.</li>
                                                        <li>Reducción del sangrado quirúrgico.</li>
                                                        <li>Incisiones más pequeñas y menor riesgo de infecciones.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Enfoque Multidisciplinario */}
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
                                                Enfoque multidisciplinario
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Nuestro equipo trabaja en conjunto con otras especialidades para garantizar un tratamiento integral y efectivo. Contamos con el apoyo de:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Gastroenterólogos para un diagnóstico preciso y manejo preoperatorio.</li>
                                                        <li>Oncólogos para casos de cáncer gastrointestinal.</li>
                                                        <li>Nutricionistas clínicos para guiar la recuperación y el cuidado postoperatorio.</li>
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
                                                            <strong>Equipo especializado:</strong> Cirujanos con experiencia en técnicas avanzadas y casos complejos.
                                                        </li>
                                                        <li>
                                                            <strong>Tecnología de última generación:</strong> Equipos modernos que aseguran procedimientos seguros y efectivos.
                                                        </li>
                                                        <li>
                                                            <strong>Atención personalizada:</strong> Cada paciente recibe un plan de tratamiento adaptado a sus necesidades específicas.
                                                        </li>
                                                        <li>
                                                            <strong>Compromiso con la excelencia:</strong> Garantizamos una atención centrada en mejorar la calidad de vida de nuestros pacientes.
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

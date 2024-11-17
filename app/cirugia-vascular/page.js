'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function VascularSurgeryService() {
    const [titulo] = useState("Cirugía Vascular en la Clínica de la Costa SAS");
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
                                    alt="Cirugía Vascular"
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
                                        <h2 className="description-title">Tratamientos especializados para la salud de tu sistema circulatorio</h2>
                                        <p>
                                            La cirugía vascular es una especialidad médica dedicada al diagnóstico, tratamiento y prevención de enfermedades que afectan las arterias, venas y vasos linfáticos. En la Clínica de la Costa SAS, ofrecemos soluciones quirúrgicas avanzadas, con un enfoque en la mínima invasión y tecnología de última generación, para garantizar la salud vascular y mejorar la calidad de vida de nuestros pacientes.
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <img
                                            src="https://picsum.photos/1200/400?random=20"
                                            alt="Cirugía Vascular"
                                            style={{
                                                width: '100%',
                                                borderRadius: '8px',
                                                marginBottom: '15px',
                                            }}
                                        />
                                    </div>
                                    {/* Acordeón */}
                                    <div id="accordion" className="accordion">
                                        {/* ¿Qué tratamos en cirugía vascular? */}
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
                                                ¿Qué tratamos en cirugía vascular?
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <h3>1. Enfermedad arterial periférica:</h3>
                                                    <ul className="service-list">
                                                        <li>Tratamiento de arterias bloqueadas en las extremidades que dificultan el flujo sanguíneo.</li>
                                                        <li>Procedimientos como angioplastia y colocación de stents para restaurar el flujo sanguíneo.</li>
                                                    </ul>
                                                    <h3>2. Aneurismas:</h3>
                                                    <p>Reparación de aneurismas arteriales, tanto en el abdomen (aorta abdominal) como en otras localizaciones, utilizando técnicas abiertas o endovasculares.</p>
                                                    <h3>3. Varices y enfermedades venosas:</h3>
                                                    <ul className="service-list">
                                                        <li>Eliminación de varices mediante escleroterapia, ablación láser o cirugía de extracción de venas varicosas.</li>
                                                        <li>Tratamiento de insuficiencia venosa crónica.</li>
                                                    </ul>
                                                    <h3>4. Trombosis venosa profunda (TVP):</h3>
                                                    <p>Manejo quirúrgico y endovascular para disolver coágulos y prevenir complicaciones como embolias pulmonares.</p>
                                                    <h3>5. Estenosis carotídea:</h3>
                                                    <p>Tratamiento de obstrucciones en las arterias carótidas, reduciendo el riesgo de accidentes cerebrovasculares.</p>
                                                    <h3>6. Linfedema:</h3>
                                                    <p>Tratamiento quirúrgico y médico de acumulaciones de líquido linfático en extremidades.</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Procedimientos especializados */}
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
                                                Procedimientos especializados
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <h3>Cirugía endovascular:</h3>
                                                    <p>
                                                        Procedimientos mínimamente invasivos como angioplastia, colocación de stents y reparación de aneurismas mediante endoprótesis.
                                                    </p>
                                                    <h3>Ablación con láser o radiofrecuencia:</h3>
                                                    <p>
                                                        Técnicas modernas para tratar varices, con menor dolor postoperatorio y tiempos de recuperación más cortos.
                                                    </p>
                                                    <h3>Bypass arterial:</h3>
                                                    <p>Redirigir el flujo sanguíneo alrededor de arterias bloqueadas para mejorar la circulación.</p>
                                                    <h3>Flebectomía ambulatoria:</h3>
                                                    <p>Extracción de venas superficiales con técnicas mínimamente invasivas.</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Beneficios de la cirugía vascular avanzada */}
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
                                                Beneficios de la cirugía vascular avanzada
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>
                                                            <strong>Procedimientos mínimamente invasivos:</strong> Reducción del dolor, menor tiempo de recuperación y cicatrices mínimas.
                                                        </li>
                                                        <li>
                                                            <strong>Resultados efectivos y duraderos:</strong> Mejora significativa en el flujo sanguíneo y la calidad de vida.
                                                        </li>
                                                        <li>
                                                            <strong>Prevención de complicaciones:</strong> Tratamientos oportunos para evitar problemas como úlceras venosas, embolias o insuficiencia arterial.
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Tecnología de última generación */}
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
                                                Tecnología de última generación
                                            </h2>
                                            {isActive === 4 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li><strong>Angiografía digital:</strong> Para visualizar en detalle el sistema circulatorio.</li>
                                                        <li><strong>Sistemas de navegación endovascular:</strong> Para tratamientos complejos.</li>
                                                        <li><strong>Equipos de ablación láser y radiofrecuencia:</strong> Diseñados para tratar varices de manera rápida y eficaz.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* ¿Por qué elegir la Clínica de la Costa SAS? */}
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
                                                ¿Por qué elegir la Clínica de la Costa SAS?
                                            </h2>
                                            {isActive === 5 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li><strong>Equipo experto:</strong> Cirujanos vasculares con experiencia en casos complejos.</li>
                                                        <li><strong>Tecnología avanzada:</strong> Equipos de última generación que aseguran precisión y seguridad.</li>
                                                        <li><strong>Atención personalizada:</strong> Cada paciente recibe un plan de tratamiento adaptado a sus necesidades.</li>
                                                        <li><strong>Cuidado integral:</strong> Desde el diagnóstico hasta la recuperación, garantizamos acompañamiento en cada etapa.</li>
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

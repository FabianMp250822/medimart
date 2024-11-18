'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function Neuropediatria() {
    const [titulo] = useState("Neuropediatría en la Clínica de la Costa SAS");
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
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2Fneuropediatria.jpg?alt=media"
                                    alt="Neuropediatría"
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
                                        <h2 className="description-title">Cuidado especializado para la salud neurológica de los niños</h2>
                                        <p>
                                            La neuropediatría es una subespecialidad de la pediatría que se enfoca en el diagnóstico, tratamiento y manejo de trastornos neurológicos en recién nacidos, niños y adolescentes. Estos trastornos pueden afectar el desarrollo motor, cognitivo y conductual, así como las funciones del sistema nervioso central y periférico. En la Clínica de la Costa SAS, ofrecemos un servicio integral y especializado en neuropediatría, diseñado para atender las necesidades únicas de nuestros pacientes más jóvenes.
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <img
                                            src="https://picsum.photos/1200/400?random=27"
                                            alt="Cirugía Urológica"
                                            style={{
                                                width: '100%',
                                                borderRadius: '8px',
                                                marginBottom: '15px',
                                            }}
                                        />
                                    </div>
                                    {/* Acordeón */}
                                    <div id="accordion" className="accordion">
                                        {/* Condiciones Tratadas */}
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
                                                Condiciones Tratadas
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li><strong>Trastornos del neurodesarrollo:</strong> TDAH, TEA, retraso global del desarrollo.</li>
                                                        <li><strong>Epilepsias:</strong> Diagnóstico y manejo de crisis epilépticas con EEG y video EEG.</li>
                                                        <li><strong>Enfermedades neuromusculares:</strong> Distrofias musculares, miopatías congénitas, atrofia muscular espinal.</li>
                                                        <li><strong>Trastornos del movimiento:</strong> Parálisis cerebral infantil, distonías y coreas.</li>
                                                        <li><strong>Trastornos del sueño:</strong> Apnea del sueño, insomnio infantil, sonambulismo.</li>
                                                        <li><strong>Infecciones y enfermedades metabólicas:</strong> Meningitis, enfermedades metabólicas con manifestaciones neurológicas.</li>
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
                                                Servicios Especializados
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li><strong>Diagnóstico integral:</strong> Evaluaciones neurológicas completas, estudios de imagen y pruebas neurofisiológicas.</li>
                                                        <li><strong>Tratamientos personalizados:</strong> Terapias farmacológicas y planes multidisciplinarios con fisioterapia y terapia ocupacional.</li>
                                                        <li><strong>Rehabilitación neurológica:</strong> Programas diseñados para mejorar habilidades motoras, cognitivas y sociales.</li>
                                                        <li><strong>Apoyo emocional y educativo:</strong> Orientación a familias y coordinación con instituciones educativas.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Equipo Multidisciplinario */}
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
                                                Equipo Multidisciplinario
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Nuestro equipo está compuesto por neuropediatras, fisioterapeutas pediátricos, psicólogos infantiles, terapeutas ocupacionales y nutricionistas pediátricos. Este enfoque integral garantiza un cuidado de calidad para nuestros pacientes.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <p>
                                        En la Clínica de la Costa SAS, estamos comprometidos con la salud neurológica de los niños, ofreciendo un servicio especializado y humanizado que busca mejorar su calidad de vida y desarrollo integral.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

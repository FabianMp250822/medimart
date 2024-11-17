'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function OphthalmologySurgeryService() {
    const [titulo] = useState("Cirugía Oftalmológica en la Clínica de la Costa SAS");
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
                                    alt="Cirugía Oftalmológica"
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
                                        <h2 className="description-title">Innovación y precisión para la salud visual</h2>
                                        <p>
                                            La cirugía oftalmológica es una especialidad médica que se enfoca en el diagnóstico y tratamiento quirúrgico de enfermedades y condiciones que afectan los ojos. En la Clínica de la Costa SAS, contamos con oftalmólogos especializados y tecnología de última generación para ofrecer procedimientos quirúrgicos precisos y seguros que mejoran la salud visual y calidad de vida de nuestros pacientes.
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <img
                                            src="https://picsum.photos/1200/400?random=25"
                                            alt="Cirugía Oftalmológica"
                                            style={{
                                                width: '100%',
                                                borderRadius: '8px',
                                                marginBottom: '15px',
                                            }}
                                        />
                                    </div>
                                    {/* Acordeón */}
                                    <div id="accordion" className="accordion">
                                        {/* ¿Qué es la cirugía oftalmológica? */}
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
                                                ¿Qué es la cirugía oftalmológica?
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Es una disciplina médica que trata quirúrgicamente diversas patologías oculares, desde enfermedades comunes como cataratas hasta condiciones más complejas como desprendimientos de retina o glaucoma avanzado. Nuestro objetivo es garantizar resultados efectivos y restaurar la visión cuando sea posible.
                                                    </p>
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
                                                    <ul className="service-list">
                                                        <li><strong>Cirugía de cataratas:</strong> Facoemulsificación para eliminar el cristalino opaco y reemplazarlo con una lente intraocular personalizada.</li>
                                                        <li><strong>Cirugía refractiva:</strong> Corrección de errores refractivos como miopía, hipermetropía y astigmatismo mediante LASIK, PRK o lentes fáquicos.</li>
                                                        <li><strong>Cirugía de glaucoma:</strong> Tratamientos quirúrgicos para reducir la presión intraocular mediante trabeculectomía, implantes de drenaje o láser selectivo (SLT).</li>
                                                        <li><strong>Cirugía de retina y vítreo:</strong> Vitrectomía para tratar desprendimientos de retina, retinopatía diabética y agujero macular.</li>
                                                        <li><strong>Cirugía de párpados y vías lagrimales:</strong> Reparación de ptosis, corrección de entropión/ectropión y tratamiento de obstrucciones lagrimales.</li>
                                                        <li><strong>Cirugía de estrabismo:</strong> Corrección del desalineamiento ocular en niños y adultos.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Beneficios de nuestros procedimientos oftalmológicos */}
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
                                                Beneficios de nuestros procedimientos oftalmológicos
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>✔ Recuperación rápida: Procedimientos modernos que permiten una pronta reincorporación a las actividades diarias.</li>
                                                        <li>✔ Resultados precisos: Uso de tecnología avanzada para garantizar un tratamiento efectivo.</li>
                                                        <li>✔ Enfoque personalizado: Soluciones adaptadas a las necesidades específicas de cada paciente.</li>
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
                                                        <li>Láser de femtosegundo: Para cirugías de cataratas y refractivas.</li>
                                                        <li>Equipos de vitrectomía de alta resolución: Para cirugía de retina y vítreo.</li>
                                                        <li>Topógrafos corneales y OCT: Para diagnósticos precisos y planificación quirúrgica.</li>
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
                                                        <li><strong>Especialistas en oftalmología quirúrgica:</strong> Profesionales altamente capacitados en las últimas técnicas quirúrgicas.</li>
                                                        <li><strong>Tecnología avanzada:</strong> Equipos modernos que aseguran resultados óptimos y seguros.</li>
                                                        <li><strong>Atención personalizada:</strong> Cada paciente recibe un plan quirúrgico adaptado a sus necesidades.</li>
                                                        <li><strong>Compromiso con la excelencia:</strong> Ofrecemos un cuidado integral desde el diagnóstico hasta la recuperación.</li>
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

'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function UrologiaOncologica() {
    const [titulo] = useState("Urología Oncológica en la Clínica de la Costa SAS");
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
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2Furologia-oncologica.jpg?alt=media"
                                    alt="Urología Oncológica"
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
                                        <h2 className="description-title">Atención especializada para pacientes con cáncer urológico</h2>
                                        <p>
                                            La urología oncológica es una subespecialidad de la urología que se enfoca en el diagnóstico, tratamiento y seguimiento de los tumores malignos que afectan el sistema genitourinario. Esto incluye cánceres que afectan los riñones, vejiga, próstata, testículos y otros órganos relacionados. En la Clínica de la Costa SAS, contamos con un servicio integral de urología oncológica, diseñado para brindar un manejo multidisciplinario y personalizado a cada paciente.
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
                                                        <li>Cáncer de riñón: Tumores malignos que afectan el sistema renal.</li>
                                                        <li>Cáncer de vejiga: Tratamiento de tumores superficiales e invasivos.</li>
                                                        <li>Cáncer de próstata: Abordado con enfoques modernos y efectivos.</li>
                                                        <li>Cáncer testicular: Manejo quirúrgico y seguimiento especializado.</li>
                                                        <li>Cáncer de pene y glándulas suprarrenales.</li>
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
                                                        <li><strong>Diagnóstico avanzado:</strong> Resonancia magnética multiparamétrica, tomografía computarizada, ultrasonido transrectal, biopsias guiadas y análisis genéticos.</li>
                                                        <li><strong>Tratamientos quirúrgicos:</strong> Cirugía laparoscópica, prostatectomía radical, nefrectomía parcial, y más.</li>
                                                        <li><strong>Terapias complementarias:</strong> Inmunoterapia, quimioterapia, radioterapia y terapia hormonal.</li>
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
                                                        En nuestra unidad trabajamos con especialistas como urólogos oncológicos, oncólogos clínicos, radioterapeutas, nutricionistas y psicólogos, asegurando un tratamiento integral y humanizado.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <p>
                                        En la Clínica de la Costa SAS, nuestra prioridad es ofrecer un servicio de urología oncológica de excelencia, combinando innovación, experiencia y atención personalizada para garantizar la mejor calidad de vida a nuestros pacientes.
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

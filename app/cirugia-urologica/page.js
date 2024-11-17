'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function UrologicSurgeryService() {
    const [titulo] = useState("Cirugía Urológica en la Clínica de la Costa SAS");
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
                                    alt="Cirugía Urológica"
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
                                        <h2 className="description-title">Tratamiento integral del sistema genital y urinario</h2>
                                        <p>
                                            La cirugía urológica es una especialidad médica que abarca todas las técnicas quirúrgicas dirigidas al tratamiento de enfermedades del sistema genital y urinario del hombre, y del sistema urinario de la mujer. En la Clínica de la Costa SAS, ofrecemos procedimientos avanzados para abordar tanto patologías benignas como malignas, garantizando resultados efectivos y seguros para nuestros pacientes.
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <img
                                            src="https://picsum.photos/1200/400?random=11"
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
                                        {/* Procedimientos en Cirugía Urológica */}
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
                                                Procedimientos en cirugía urológica
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <h3>1. Cirugía de riñón:</h3>
                                                    <ul className="service-list">
                                                        <li>Extirpación parcial o total del riñón afectado por cáncer o enfermedades benignas.</li>
                                                        <li>Tratamiento de piedras renales grandes y complejas.</li>
                                                    </ul>
                                                    <h3>2. Cirugía reconstructiva:</h3>
                                                    <ul className="service-list">
                                                        <li>Reconstrucción de estrecheces del uréter o de la unión pieloureteral.</li>
                                                        <li>Cirugía reconstructiva de la vejiga.</li>
                                                    </ul>
                                                    <h3>3. Cirugía prostática:</h3>
                                                    <ul className="service-list">
                                                        <li>Tratamiento quirúrgico para enfermedades benignas de la próstata.</li>
                                                        <li>Extirpación de la próstata en casos de cáncer.</li>
                                                    </ul>
                                                    <h3>4. Cirugía oncológica:</h3>
                                                    <ul className="service-list">
                                                        <li>Extirpación de tumores malignos de testículo.</li>
                                                        <li>Tratamiento quirúrgico del cáncer de vejiga y otros órganos del sistema urinario.</li>
                                                    </ul>
                                                    <h3>5. Cirugía andrológica:</h3>
                                                    <ul className="service-list">
                                                        <li>Vasectomía.</li>
                                                        <li>Vasovasostomía (reconexión de conductos deferentes tras una vasectomía).</li>
                                                        <li>Biopsia testicular.</li>
                                                        <li>Implante de prótesis de pene.</li>
                                                    </ul>
                                                    <h3>6. Tratamientos especializados:</h3>
                                                    <ul className="service-list">
                                                        <li>Cirugía para tratar estrecheces de la uretra.</li>
                                                        <li>Manejo de malformaciones congénitas en los genitales o el sistema urinario.</li>
                                                        <li>Tratamiento quirúrgico de la incontinencia urinaria.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Cirugía Laparoscópica */}
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
                                                Cirugía laparoscópica: mínima invasión, máxima eficacia
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        En la Clínica de la Costa SAS, hemos incorporado una torre de cirugía laparoscópica de última generación, que permite realizar procedimientos con precisión y eficiencia. La laparoscopía se realiza mediante la introducción de una cámara y pinzas quirúrgicas a través de pequeños accesos en la cavidad abdominal, ofreciendo múltiples ventajas:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Evita grandes incisiones.</li>
                                                        <li>Menor dolor postoperatorio.</li>
                                                        <li>Menor sangrado durante el procedimiento.</li>
                                                        <li>Recuperación más rápida, con pronta reinserción a las actividades diarias.</li>
                                                        <li>Reducción del uso de analgésicos.</li>
                                                    </ul>
                                                    <h3>Procedimientos laparoscópicos habituales:</h3>
                                                    <ul className="service-list">
                                                        <li>Nefrectomía radical y parcial: Extirpación total o parcial del riñón.</li>
                                                        <li>Plástica de la unión pieloureteral: Reconstrucción del área entre el riñón y el uréter.</li>
                                                        <li>Cirugía del uréter: Incluyendo litotomías y reimplantes uretero-vesicales.</li>
                                                        <li>Prostatectomía radical: Extirpación completa de la próstata en casos de cáncer.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Nuestro Compromiso */}
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
                                                Nuestro compromiso
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>
                                                            <strong>Tecnología de punta:</strong> Equipos modernos que aseguran precisión y seguridad.
                                                        </li>
                                                        <li>
                                                            <strong>Equipo médico especializado:</strong> Cirujanos con amplia experiencia en técnicas urológicas avanzadas, incluyendo laparoscopía.
                                                        </li>
                                                        <li>
                                                            <strong>Atención integral:</strong> Desde el diagnóstico hasta el seguimiento postquirúrgico, cuidamos cada detalle para garantizar la salud y bienestar de nuestros pacientes.
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

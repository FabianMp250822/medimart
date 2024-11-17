'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function UrologySurgeryService() {
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
                                        <h2 className="description-title">Soluciones avanzadas para la salud urológica</h2>
                                        <p>
                                            La cirugía urológica agrupa todas aquellas técnicas quirúrgicas que tratan el sistema genital y urinario del varón y el sistema urinario de la mujer. Incluye procedimientos como la extirpación parcial o total del riñón por cáncer o enfermedades benignas, el tratamiento de piedras renales complejas, cirugías reconstructivas del uréter, cirugía prostática por enfermedades benignas o cáncer, y mucho más.
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
                                        {/* Cirugías y procedimientos */}
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
                                                Cirugías y procedimientos
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Extirpación parcial o total del riñón por cáncer o enfermedades benignas.</li>
                                                        <li>Tratamiento de piedras renales grandes y complejas.</li>
                                                        <li>Reconstrucción de estrecheces del uréter o de la unión pieloureteral.</li>
                                                        <li>Cirugía prostática por enfermedades benignas o cáncer.</li>
                                                        <li>Extirpación de tumores malignos de testículo.</li>
                                                        <li>Cirugías andrológicas: Vasectomía, vasovasostomía, biopsia testicular, prótesis de pene.</li>
                                                        <li>Tratamiento de estrecheces de la uretra y malformaciones congénitas del sistema urinario.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Laparoscopia */}
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
                                                Laparoscopia: Técnica avanzada y mínimamente invasiva
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        La laparoscopia es una técnica que utiliza una cámara y herramientas quirúrgicas especializadas introducidas a través de pequeños puertos en la cavidad abdominal. Ofrece múltiples ventajas frente a las técnicas tradicionales:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Evita grandes incisiones.</li>
                                                        <li>Menor dolor postoperatorio y menor consumo de analgésicos.</li>
                                                        <li>Menor sangrado.</li>
                                                        <li>Menor tiempo de recuperación y pronta reincorporación a las actividades cotidianas.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Procedimientos laparoscópicos */}
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
                                                Procedimientos laparoscópicos más frecuentes
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Nefrectomía radical y parcial.</li>
                                                        <li>Plástica de la unión pieloureteral.</li>
                                                        <li>Cirugía del uréter: Litotomías, reimplantes uretero-vesicales.</li>
                                                        <li>Prostatectomía radical.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Beneficios de la cirugía urológica */}
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
                                                Beneficios de nuestros procedimientos
                                            </h2>
                                            {isActive === 4 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>✔ Mínima invasión: Menor daño a los tejidos.</li>
                                                        <li>✔ Recuperación rápida: Reducción del tiempo de hospitalización.</li>
                                                        <li>✔ Menor dolor: Técnicas avanzadas que reducen molestias postoperatorias.</li>
                                                        <li>✔ Resultados efectivos: Tratamientos diseñados para necesidades específicas.</li>
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

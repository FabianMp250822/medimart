'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function Ortodoncia() {
    const [titulo] = useState("Especialidad en Ortodoncia - Clínica de la Costa SAS");
    const [isActive, setIsActive] = useState(null);

    const [imageLoaded, setImageLoaded] = useState(false);
    const [contentImageLoaded, setContentImageLoaded] = useState(false);

    const toggleAccordion = (key) => {
        setIsActive(isActive === key ? null : key);
    };

    return (
        <>
            <Layout footerStyle={1}>
                <div
                    className={`d-flex flex-column ${imageLoaded ? 'flex-md-row' : ''} align-items-center p-4`}
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
                            className={`d-flex flex-column ${imageLoaded ? 'flex-md-row' : ''} align-items-center`}
                            style={{
                                gap: '20px',
                            }}
                        >
                            {imageLoaded && (
                                <div style={{ flex: '1.5' }}>
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fortodoncia.jpg?alt=media&token=12345678-abcd-efgh-ijkl-mnopqrstuvwxyz"
                                        alt="Tratamientos de Ortodoncia"
                                        onLoad={() => setImageLoaded(true)}
                                        onError={() => setImageLoaded(false)}
                                        style={{
                                            borderRadius: '8px',
                                            width: '100%',
                                            height: 'auto',
                                            maxHeight: '450px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                            )}
                            <ServiceHeader titulo={titulo} />
                        </div>
                    </div>
                </div>

                <div className="service-details pb_110">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-3">
                                <ServicesMenu />
                            </div>
                            <div className="col-12 col-md-9">
                                <div className="pt-4">
                                    <div className="description-section mb-5">
                                        <h1 className="description-title">Ortodoncia: Sonrisa Perfecta y Salud Dental</h1>
                                        <p>
                                            En la Clínica de la Costa SAS, nuestro servicio de Ortodoncia está enfocado en alinear dientes, mejorar la mordida y corregir maloclusiones, utilizando técnicas modernas y personalizadas. Nuestro objetivo es lograr una sonrisa funcional, estética y saludable para cada paciente, sin importar su edad.
                                        </p>
                                    </div>

                                    {contentImageLoaded && (
                                        <div className="mb-4">
                                            <img
                                                src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Ftratamiento-ortodoncia.jpg?alt=media&token=12345678-abcd-efgh-ijkl-mnopqrstuvwxyz"
                                                alt="Tratamiento de Ortodoncia"
                                                onLoad={() => setContentImageLoaded(true)}
                                                onError={() => setContentImageLoaded(false)}
                                                style={{
                                                    width: '100%',
                                                    borderRadius: '8px',
                                                    marginBottom: '10px',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                            <p
                                                style={{
                                                    color: '#000',
                                                    fontSize: '18px',
                                                    textAlign: 'center',
                                                    marginTop: '5px',
                                                }}
                                            >
                                                Tratamientos de ortodoncia avanzados para mejorar tu sonrisa
                                            </p>
                                        </div>
                                    )}

                                    <div id="accordion" className="accordion">
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
                                                Servicios de Ortodoncia
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Aparatos fijos tradicionales (brackets metálicos).</li>
                                                        <li>Aparatos estéticos (brackets de cerámica o zafiro).</li>
                                                        <li>Ortodoncia invisible (alineadores transparentes).</li>
                                                        <li>Corrección de maloclusiones dentales.</li>
                                                        <li>Ortodoncia infantil y para adultos.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

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
                                                Beneficios de la Ortodoncia
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Mejora de la función masticatoria.</li>
                                                        <li>Prevención de enfermedades periodontales y caries.</li>
                                                        <li>Aumento de la autoestima a través de una sonrisa estética.</li>
                                                        <li>Reducción del desgaste dental anormal.</li>
                                                        <li>Corrección de problemas de pronunciación causados por maloclusiones.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

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
                                                Tecnología y Métodos Avanzados
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>
                                                            <strong>Escaneo Digital:</strong> Diagnóstico y planificación con imágenes tridimensionales.
                                                        </li>
                                                        <li>
                                                            <strong>Ortodoncia Invisible:</strong> Uso de alineadores como Invisalign para una experiencia discreta.
                                                        </li>
                                                        <li>
                                                            <strong>Control y Seguimiento:</strong> Revisiones periódicas para asegurar el progreso adecuado del tratamiento.
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <p>
                                        En la Clínica de la Costa SAS, nuestro compromiso es brindarte tratamientos de ortodoncia personalizados, diseñados para mejorar la funcionalidad y la estética de tu sonrisa. ¡Déjanos ayudarte a lograr la sonrisa que siempre has deseado!
                                    </p>
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
                </div>
            </Layout>
        </>
    );
}

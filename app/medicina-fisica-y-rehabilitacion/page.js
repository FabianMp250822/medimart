'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function MedicinaFisicaYRehabilitacion() {
    const [titulo] = useState("Especialidad en Medicina Física y Rehabilitación - Clínica de la Costa SAS");
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
                                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fmedicina-fisica-rehabilitacion.jpg?alt=media&token=12345678-abcd-efgh-ijkl-mnopqrstuvwxyz"
                                        alt="Servicios de Medicina Física y Rehabilitación"
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
                                        <h1 className="description-title">Medicina Física y Rehabilitación: Recupera tu Funcionalidad y Calidad de Vida</h1>
                                        <p>
                                            En la Clínica de la Costa SAS, nuestra especialidad en Medicina Física y Rehabilitación está enfocada en maximizar la funcionalidad y mejorar la calidad de vida de personas con discapacidades temporales o permanentes. Contamos con programas personalizados para cada paciente, adaptados a sus necesidades específicas.
                                        </p>
                                    </div>

                                    {contentImageLoaded && (
                                        <div className="mb-4">
                                            <img
                                                src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Ftratamiento-rehabilitacion-fisica.jpg?alt=media&token=12345678-abcd-efgh-ijkl-mnopqrstuvwxyz"
                                                alt="Terapias de Medicina Física y Rehabilitación"
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
                                                Terapias avanzadas para mejorar la movilidad y la independencia
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
                                                Servicios de Medicina Física y Rehabilitación
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Fisioterapia para recuperación de lesiones musculoesqueléticas.</li>
                                                        <li>Terapias de rehabilitación neurológica (post-ictus, lesiones medulares).</li>
                                                        <li>Programas de manejo del dolor crónico.</li>
                                                        <li>Rehabilitación cardiovascular para pacientes con enfermedades cardíacas.</li>
                                                        <li>Adaptación funcional para personas con prótesis y órtesis.</li>
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
                                                Beneficios de la Rehabilitación Física
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Mejora de la movilidad y la fuerza muscular.</li>
                                                        <li>Reducción del dolor y recuperación funcional.</li>
                                                        <li>Prevención de complicaciones relacionadas con inmovilidad.</li>
                                                        <li>Reintegración activa a la vida cotidiana y laboral.</li>
                                                        <li>Incremento de la independencia y la calidad de vida.</li>
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
                                                            <strong>Electroterapia y Ultrasonido:</strong> Herramientas avanzadas para tratamiento del dolor y la inflamación.
                                                        </li>
                                                        <li>
                                                            <strong>Entrenamiento Virtual:</strong> Rehabilitación asistida por realidad aumentada.</li>
                                                        <li>
                                                            <strong>Robótica en Rehabilitación:</strong> Exoesqueletos y dispositivos para movilidad avanzada.</li>
                                                        <li>
                                                            <strong>Terapias Acuáticas:</strong> Recuperación funcional en piscinas adaptadas.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <p>
                                        En la Clínica de la Costa SAS, nuestro compromiso es ayudarte a recuperar tu funcionalidad, independencia y bienestar. Con programas adaptados a tus necesidades y tecnología avanzada, trabajamos contigo para alcanzar tus objetivos de salud. ¡Confía en nosotros para tu rehabilitación!
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

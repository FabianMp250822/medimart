'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function Periodoncia() {
    const [titulo] = useState("Especialidad en Periodoncia - Clínica de la Costa SAS");
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
                                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fperiodoncia.jpg?alt=media&token=12345678-abcd-efgh-ijkl-mnopqrstuvwxyz"
                                        alt="Tratamiento de Periodoncia"
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
                                        <h1 className="description-title">Periodoncia: Salud de las Encías y el Soporte Dental</h1>
                                        <p>
                                            En la Clínica de la Costa SAS, nuestro servicio de Periodoncia está enfocado en la prevención, diagnóstico y tratamiento de enfermedades de las encías y del hueso que soporta los dientes. Con el uso de tecnología avanzada y un enfoque personalizado, ayudamos a nuestros pacientes a mantener una sonrisa saludable y funcional.
                                        </p>
                                    </div>

                                    {contentImageLoaded && (
                                        <div className="mb-4">
                                            <img
                                                src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Ftratamiento-periodoncia.jpg?alt=media&token=12345678-abcd-efgh-ijkl-mnopqrstuvwxyz"
                                                alt="Tratamiento de Periodoncia"
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
                                                Tratamientos de periodoncia para preservar tu salud dental
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
                                                Servicios de Periodoncia
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Tratamiento de gingivitis y periodontitis.</li>
                                                        <li>Cirugía periodontal para regeneración ósea.</li>
                                                        <li>Injertos de encía para corregir la recesión gingival.</li>
                                                        <li>Limpiezas profundas (raspado y alisado radicular).</li>
                                                        <li>Mantenimiento periodontal para prevenir recaídas.</li>
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
                                                Beneficios del Tratamiento Periodontal
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Prevención de la pérdida dental.</li>
                                                        <li>Mejora de la salud general al reducir la inflamación crónica.</li>
                                                        <li>Eliminación de infecciones en encías y huesos.</li>
                                                        <li>Restauración estética de las encías.</li>
                                                        <li>Mejora de la función masticatoria y estabilidad dental.</li>
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
                                                Tecnología Avanzada en Periodoncia
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>
                                                            <strong>Láser Dental:</strong> Tratamientos mínimamente invasivos para encías.
                                                        </li>
                                                        <li>
                                                            <strong>Regeneración Ósea Guiada:</strong> Técnicas avanzadas para preservar el soporte dental.
                                                        </li>
                                                        <li>
                                                            <strong>Diagnóstico 3D:</strong> Imágenes digitales para planificación precisa.
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <p>
                                        En la Clínica de la Costa SAS, estamos comprometidos con preservar la salud de tus encías y el soporte de tus dientes. Confía en nuestros especialistas en periodoncia para cuidar tu sonrisa y mantener una salud bucal óptima. ¡Tu bienestar es nuestra prioridad!
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

'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function OdontologiaGeneral() {
    const [titulo] = useState("Especialidad en Odontología General - Clínica de la Costa SAS");
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
                                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fodontologia-general.jpg?alt=media&token=12345678-abcd-efgh-ijkl-mnopqrstuvwxyz"
                                        alt="Atención en Odontología General"
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
                                        <h1 className="description-title">Odontología General: Salud y Cuidado Dental para Toda la Familia</h1>
                                        <p>
                                            La Clínica de la Costa SAS ofrece servicios de Odontología General diseñados para garantizar la salud bucal de nuestros pacientes. Nuestro equipo de odontólogos se dedica a la prevención, diagnóstico y tratamiento de enfermedades dentales y bucales, asegurando una atención integral y de calidad para todas las edades.
                                        </p>
                                    </div>

                                    {contentImageLoaded && (
                                        <div className="mb-4">
                                            <img
                                                src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Ftratamiento-odontologia.jpg?alt=media&token=12345678-abcd-efgh-ijkl-mnopqrstuvwxyz"
                                                alt="Tratamiento de Odontología General"
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
                                                Atención integral para una sonrisa saludable
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
                                                Servicios Destacados
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Control y prevención de caries.</li>
                                                        <li>Limpiezas dentales profesionales.</li>
                                                        <li>Tratamientos de restauración dental.</li>
                                                        <li>Atención de emergencias dentales.</li>
                                                        <li>Aplicación de sellantes dentales.</li>
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
                                                Beneficios de la Odontología General
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Prevención de problemas dentales a largo plazo.</li>
                                                        <li>Diagnóstico temprano de enfermedades bucales.</li>
                                                        <li>Atención personalizada para todas las edades.</li>
                                                        <li>Promoción de hábitos de higiene oral adecuados.</li>
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
                                                Enfoque Integral en el Cuidado Dental
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>
                                                            <strong>Consulta General:</strong> Evaluación completa de la salud bucal.
                                                        </li>
                                                        <li>
                                                            <strong>Tratamiento Preventivo:</strong> Protección contra caries y enfermedades periodontales.
                                                        </li>
                                                        <li>
                                                            <strong>Atención Restauradora:</strong> Soluciones avanzadas para restaurar dientes dañados.
                                                        </li>
                                                        <li>
                                                            <strong>Educación en Higiene Oral:</strong> Orientación para mantener una buena salud bucal.
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <p>
                                        En la Clínica de la Costa SAS, nuestra misión es proporcionar un cuidado dental de calidad y accesible, promoviendo sonrisas saludables y una mejor calidad de vida para nuestros pacientes. ¡Confía en nosotros para cuidar tu salud bucal y la de tu familia!
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

'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function CardiovascularSurgeryService() {
    const [titulo] = useState("Cirugía Cardiovascular en la Clínica de la Costa SAS");
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
                                    alt="Cirugía Cardiovascular"
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
                                        <h2 className="description-title">Soluciones avanzadas para la salud de tu corazón y sistema circulatorio</h2>
                                        <p>
                                            La cirugía cardiovascular es una especialidad médica dedicada al diagnóstico, tratamiento y corrección de enfermedades del corazón y los grandes vasos. En la Clínica de la Costa SAS, contamos con cirujanos cardiovasculares altamente capacitados y tecnología de última generación para brindar procedimientos efectivos, seguros y personalizados que mejoran la calidad de vida de nuestros pacientes.
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <img
                                            src="https://picsum.photos/1200/400?random=22"
                                            alt="Cirugía Cardiovascular"
                                            style={{
                                                width: '100%',
                                                borderRadius: '8px',
                                                marginBottom: '15px',
                                            }}
                                        />
                                    </div>
                                    {/* Acordeón */}
                                    <div id="accordion" className="accordion">
                                        {/* ¿Qué es la cirugía cardiovascular? */}
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
                                                ¿Qué es la cirugía cardiovascular?
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        La cirugía cardiovascular se enfoca en tratar problemas estructurales y funcionales del sistema circulatorio. Esto incluye enfermedades coronarias, valvulares y congénitas, así como afecciones en la aorta y otros vasos sanguíneos principales.
                                                    </p>
                                                    <p>
                                                        Nuestro enfoque es proporcionar tratamientos quirúrgicos avanzados que ayuden a restaurar la función cardíaca y a prevenir complicaciones a largo plazo.
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
                                                    <h3>1. Cirugía coronaria:</h3>
                                                    <ul className="service-list">
                                                        <li>Bypass coronario (CABG): Redirige el flujo sanguíneo alrededor de arterias bloqueadas o estrechadas.</li>
                                                        <li>Revascularización quirúrgica para tratar enfermedades coronarias avanzadas.</li>
                                                    </ul>
                                                    <h3>2. Cirugía valvular:</h3>
                                                    <ul className="service-list">
                                                        <li>Reparación y reemplazo de válvulas cardíacas dañadas.</li>
                                                        <li>Uso de válvulas biológicas o mecánicas, según las necesidades del paciente.</li>
                                                    </ul>
                                                    <h3>3. Cirugía de la aorta:</h3>
                                                    <ul className="service-list">
                                                        <li>Reparación de aneurismas aórticos mediante técnicas abiertas o endovasculares.</li>
                                                        <li>Tratamiento de disección aórtica para prevenir complicaciones graves.</li>
                                                    </ul>
                                                    <h3>4. Cirugía de arritmias:</h3>
                                                    <p>Implantación de dispositivos como marcapasos y desfibriladores automáticos implantables (DAI).</p>
                                                    <h3>5. Cirugía cardíaca pediátrica:</h3>
                                                    <p>Tratamiento de defectos cardíacos congénitos en recién nacidos, niños y adolescentes.</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Innovación en técnicas quirúrgicas */}
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
                                                Innovación en técnicas quirúrgicas
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>
                                                            <strong>Cirugía mínimamente invasiva:</strong> Procedimientos realizados a través de pequeñas incisiones que reducen el tiempo de recuperación.
                                                        </li>
                                                        <li>
                                                            <strong>Cirugía robótica asistida:</strong> Ofrece mayor precisión y mejores resultados estéticos.
                                                        </li>
                                                        <li>
                                                            <strong>Cirugía endovascular:</strong> Tratamientos menos invasivos para enfermedades de la aorta y arterias principales.
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Beneficios de nuestros procedimientos cardiovasculares */}
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
                                                Beneficios de nuestros procedimientos cardiovasculares
                                            </h2>
                                            {isActive === 4 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>✔ Menor tiempo de recuperación: Gracias a técnicas mínimamente invasivas.</li>
                                                        <li>✔ Reducción de complicaciones: Uso de tecnología avanzada y procedimientos precisos.</li>
                                                        <li>✔ Mejor calidad de vida: Restauración de la funcionalidad cardíaca y prevención de complicaciones futuras.</li>
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
                                                        <li><strong>Equipo altamente especializado:</strong> Cirujanos cardiovasculares con experiencia en casos complejos.</li>
                                                        <li><strong>Tecnología avanzada:</strong> Equipos de última generación para garantizar procedimientos seguros y efectivos.</li>
                                                        <li><strong>Atención personalizada:</strong> Tratamientos adaptados a las necesidades de cada paciente.</li>
                                                        <li><strong>Cuidado integral:</strong> Enfoque multidisciplinario para un manejo completo y coordinado.</li>
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

'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function NeuroEndovascularSurgeryService() {
    const [titulo] = useState("Cirugía Endovascular Neurológica en la Clínica de la Costa SAS");
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
                                    alt="Cirugía Endovascular Neurológica"
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
                                        <h2 className="description-title">Tratamientos mínimamente invasivos para enfermedades cerebrovasculares</h2>
                                        <p>
                                            La cirugía endovascular neurológica es una técnica avanzada y mínimamente invasiva que se utiliza para tratar enfermedades de los vasos sanguíneos del cerebro y la médula espinal. En la Clínica de la Costa SAS, contamos con un equipo de especialistas altamente capacitados y tecnología de última generación para ofrecer procedimientos seguros y efectivos, mejorando significativamente la calidad de vida de nuestros pacientes.
                                        </p>
                                    </div>
                                    {/* Imagen Recortada con Título Debajo */}
                                    <div className="mb-4">
                                        <img
                                            src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-20%20at%209.10.01%20AM.jpeg?alt=media&token=89506541-c55f-44f6-8d77-b64301cf8550"
                                            alt="Atención Hospitalaria"
                                            style={{
                                                width: '100%',
                                                height: '400px', // Ajusta la altura a 400px
                                                borderRadius: '8px',
                                                marginBottom: '10px',
                                                objectFit: 'cover', // Recorta la imagen para que se ajuste al contenedor
                                            }}
                                        />
                                        {/* Texto debajo de la imagen */}
                                        <p style={{ 
                                            color: '#000', 
                                            fontSize: '18px', 
                                            textAlign: 'center', 
                                            marginTop: '5px',
                                        }}>
                                            {titulo}
                                        </p>
                                    </div>
                                    {/* Acordeón */}
                                    <div id="accordion" className="accordion">
                                        {/* ¿Qué es la cirugía endovascular neurológica? */}
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
                                                ¿Qué es la cirugía endovascular neurológica?
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Es una técnica que permite tratar diversas patologías cerebrovasculares sin necesidad de realizar grandes incisiones. A través de pequeños accesos, generalmente en la arteria femoral o radial, se introducen catéteres y dispositivos especializados guiados por imágenes avanzadas para reparar o tratar los vasos sanguíneos afectados.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Condiciones tratadas */}
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
                                                Condiciones tratadas con cirugía endovascular neurológica
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <h3>1. Aneurismas cerebrales:</h3>
                                                    <p>Reparación mediante coils (espirales metálicas) o stents para prevenir el sangrado o la ruptura.</p>
                                                    <h3>2. Malformaciones arteriovenosas (MAV):</h3>
                                                    <p>Tratamiento para corregir conexiones anormales entre arterias y venas, reduciendo el riesgo de hemorragias cerebrales.</p>
                                                    <h3>3. Accidente cerebrovascular (ACV) isquémico:</h3>
                                                    <p>
                                                        <strong>Trombectomía mecánica:</strong> Técnica que elimina coágulos en arterias cerebrales, restaurando el flujo sanguíneo y minimizando el daño neurológico.
                                                    </p>
                                                    <h3>4. Estenosis arterial:</h3>
                                                    <p>Tratamiento de estrecheces en arterias que irrigan el cerebro mediante la colocación de stents para mejorar el flujo sanguíneo.</p>
                                                    <h3>5. Fístulas arteriovenosas:</h3>
                                                    <p>Reparación de conexiones anormales entre arterias y venas en el sistema nervioso central.</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Beneficios de la cirugía endovascular neurológica */}
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
                                                Beneficios de la cirugía endovascular neurológica
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>
                                                            <strong>Mínima invasión:</strong> No requiere grandes incisiones ni apertura del cráneo.
                                                        </li>
                                                        <li>
                                                            <strong>Recuperación rápida:</strong> Menor tiempo de hospitalización y reincorporación más rápida a las actividades cotidianas.
                                                        </li>
                                                        <li>
                                                            <strong>Menor riesgo de complicaciones:</strong> Reducción significativa del dolor, infecciones y sangrado postoperatorio.
                                                        </li>
                                                        <li>
                                                            <strong>Alta precisión:</strong> Uso de imágenes en tiempo real para guiar los procedimientos con exactitud.
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Tecnología avanzada */}
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
                                                Tecnología avanzada a tu servicio
                                            </h2>
                                            {isActive === 4 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>
                                                            <strong>Angiografía digital:</strong> Para obtener imágenes detalladas de los vasos sanguíneos.
                                                        </li>
                                                        <li>
                                                            <strong>Sistemas de navegación endovascular:</strong> Que permiten el control preciso de los dispositivos dentro de las arterias.
                                                        </li>
                                                        <li>
                                                            <strong>Catéteres y stents de última tecnología:</strong> Diseñados específicamente para procedimientos neurológicos.
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* ¿Por qué elegirnos? */}
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
                                                        <li>
                                                            <strong>Especialistas en técnicas avanzadas:</strong> Cirujanos y neurorradiólogos con amplia experiencia en procedimientos endovasculares.
                                                        </li>
                                                        <li>
                                                            <strong>Tecnología de última generación:</strong> Garantizamos precisión y seguridad en cada tratamiento.
                                                        </li>
                                                        <li>
                                                            <strong>Atención personalizada:</strong> Planes diseñados para las necesidades únicas de cada paciente.
                                                        </li>
                                                        <li>
                                                            <strong>Cuidado integral:</strong> Desde el diagnóstico hasta la recuperación, ofrecemos un servicio completo y humanizado.
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

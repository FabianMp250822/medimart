'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function NeurosurgeryService() {
    const [titulo] = useState("Neurocirugía en la Clínica de la Costa SAS");
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
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-18%20at%202.35.13%20PM.jpeg?alt=media&token=6aae6289-d76f-4b36-b1be-59ad722a2551"
                                    alt="Neurocirugía"
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
                                        <h2 className="description-title">Innovación y excelencia en el cuidado del sistema nervioso</h2>
                                        <p>
                                            En la Clínica de la Costa SAS, ofrecemos un servicio de neurocirugía de vanguardia, diseñado para atender tanto procedimientos diagnósticos como terapéuticos relacionados con el cerebro y el sistema nervioso central. Contamos con un equipo médico altamente especializado y tecnología de última generación, lo que nos permite brindar una atención oportuna, segura y eficaz en cada caso.
                                        </p>
                                    </div>
                                    

                                    <div className="mb-4">
                                        <img
                                            src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2FDSC01594.JPG?alt=media&token=d932da45-0f06-4b19-85dc-58b718ff3a30"
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
                                        {/* Servicios que ofrecemos */}
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
                                                Servicios que ofrecemos
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <h3>1. Manejo de emergencias neuroquirúrgicas:</h3>
                                                    <p>
                                                        Disponibilidad permanente para atender emergencias, como accidentes cerebrovasculares (ACV) y otros eventos críticos relacionados con el sistema nervioso central.
                                                    </p>
                                                    <h3>2. Cirugía de columna:</h3>
                                                    <ul className="service-list">
                                                        <li>Cirugía convencional.</li>
                                                        <li>Cirugía de alta complejidad.</li>
                                                        <li>Cirugía mínimamente invasiva, enfocada en reducir tiempos de recuperación y complicaciones.</li>
                                                    </ul>
                                                    <h3>3. Cirugía funcional:</h3>
                                                    <ul className="service-list">
                                                        <li>Parkinson.</li>
                                                        <li>Espasticidad.</li>
                                                        <li>Dolor crónico.</li>
                                                    </ul>
                                                    <h3>4. Manejo de defectos congénitos:</h3>
                                                    <p>
                                                        Atención especializada para defectos congénitos del sistema nervioso central, garantizando un enfoque integral y multidisciplinario.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Enfoque multidisciplinario */}
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
                                                Enfoque multidisciplinario
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        El éxito de nuestro servicio se basa en la colaboración con otras especialidades dentro de la institución, lo que nos permite abordar cada caso desde un enfoque integral. Contamos con apoyo en:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Neuroradiología diagnóstica e intervencionista.</li>
                                                        <li>Cuidados intensivos neurológicos.</li>
                                                        <li>Neuro-oncología y neuro-anestesia.</li>
                                                        <li>Neuropsicología y neurología clínica.</li>
                                                    </ul>
                                                    <p>
                                                        Este enfoque interdisciplinario asegura que cada paciente reciba un tratamiento completo, adaptado a sus necesidades específicas.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Tecnología de última generación */}
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
                                                Tecnología de última generación
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Cirugías mínimamente invasivas: Reducen el tiempo de recuperación y las complicaciones postoperatorias.</li>
                                                        <li>Radiocirugía de alta precisión: Un tratamiento no invasivo para tumores y lesiones cerebrales.</li>
                                                        <li>Neurointervencionismo: Técnicas especializadas para tratar condiciones vasculares y otras enfermedades del sistema nervioso.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* ¿Por qué elegirnos? */}
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
                                                ¿Por qué elegirnos?
                                            </h2>
                                            {isActive === 4 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>
                                                            <strong>Equipo altamente especializado:</strong> Médicos con amplia experiencia en neurocirugía y un compromiso inquebrantable con la excelencia.
                                                        </li>
                                                        <li>
                                                            <strong>Atención integral:</strong> Desde la consulta externa hasta el manejo postoperatorio, garantizamos un cuidado completo.
                                                        </li>
                                                        <li>
                                                            <strong>Resultados confiables:</strong> Enfocados en mejorar la calidad de vida de nuestros pacientes mediante técnicas avanzadas y seguras.
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

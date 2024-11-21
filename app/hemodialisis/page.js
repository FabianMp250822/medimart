'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function Hemodialisis() {
    const [titulo] = useState("Hemodiálisis en la Clínica de la Costa: Cuidado Integral para Pacientes Renales");
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
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-21%20at%2012.53.20%20PM.jpeg?alt=media&token=f55f93d9-efa3-46c2-b65c-b5ec5b848b40"
                                    alt="Hemodiálisis en la Clínica de la Costa"
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
                                    {/* Introducción */}
                                    <div className="description-section mb-5">
                                        <h2 className="description-title">¿Qué es la Hemodiálisis?</h2>
                                        <p>
                                            La hemodiálisis es un procedimiento médico que utiliza una máquina para filtrar la sangre y eliminar desechos, toxinas y exceso de líquidos. 
                                            Este tratamiento es esencial para personas con insuficiencia renal crónica o enfermedades renales terminales, y ayuda a mantener el equilibrio 
                                            químico y físico del cuerpo.
                                        </p>
                                    </div>

                                    {/* Imagen Secundaria */}
                                    <div className="mb-4">
                                        <img
                                            src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-20%20at%209.05.39%20AM.jpeg?alt=media&token=a5096045-8ae8-438c-ac4c-45877a0e8d84"
                                            alt="Paciente recibiendo Hemodiálisis"
                                            style={{
                                                width: '100%',
                                                height: '400px', // Ajusta la altura a 400px
                                                borderRadius: '8px',
                                                marginBottom: '10px',
                                                objectFit: 'cover', // Recorta la imagen para que se ajuste al contenedor
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
                                            {titulo}
                                        </p>
                                    </div>

                                    {/* Acordeón */}
                                    <div id="accordion" className="accordion">
                                        {/* ¿Cómo Funciona la Hemodiálisis? */}
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
                                                ¿Cómo Funciona la Hemodiálisis?
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>
                                                            <strong>Acceso al torrente sanguíneo:</strong> Se utiliza una fístula arteriovenosa, catéter o injerto 
                                                            para conectar el flujo sanguíneo a la máquina de hemodiálisis.
                                                        </li>
                                                        <li>
                                                            <strong>Filtración de la sangre:</strong> La sangre pasa por un dializador que elimina toxinas, líquidos en exceso y 
                                                            otros desechos.
                                                        </li>
                                                        <li>
                                                            <strong>Duración del tratamiento:</strong> Cada sesión dura entre 3 a 5 horas, con una frecuencia de varias veces a la semana.
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Beneficios de la Hemodiálisis */}
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
                                                Beneficios de la Hemodiálisis
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Elimina desechos tóxicos como la urea y la creatinina.</li>
                                                        <li>Mantiene el equilibrio de electrolitos como potasio y sodio.</li>
                                                        <li>Previene complicaciones graves como insuficiencia cardíaca o hipertensión.</li>
                                                        <li>Mejora la calidad de vida del paciente.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* ¿Por Qué Elegir la Clínica de la Costa? */}
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
                                                ¿Por Qué Elegir la Clínica de la Costa?
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>
                                                            <strong>Instalaciones de vanguardia:</strong> Máquinas modernas y áreas confortables para los pacientes.
                                                        </li>
                                                        <li>
                                                            <strong>Equipo especializado:</strong> Profesionales capacitados en nefrología y diálisis.
                                                        </li>
                                                        <li>
                                                            <strong>Protocolos de seguridad:</strong> Cumplimos con los más altos estándares de higiene y manejo de equipos.
                                                        </li>
                                                        <li>
                                                            <strong>Atención personalizada:</strong> Planes de tratamiento adaptados a cada paciente.
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

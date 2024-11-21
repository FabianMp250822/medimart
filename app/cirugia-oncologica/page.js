'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function OncologicSurgeryService() {
    const [titulo] = useState("Cirugía Oncológica en la Clínica de la Costa SAS");
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
                                    alt="Cirugía Oncológica"
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
                                        <h2 className="description-title">Especialistas en el tratamiento quirúrgico del cáncer</h2>
                                        <p>
                                            La cirugía oncológica, también conocida como oncocirugía o oncología quirúrgica, es una especialidad enfocada en el tratamiento del cáncer mediante procedimientos quirúrgicos. Su principal objetivo es extirpar tumores malignos, lo que puede mejorar significativamente la calidad de vida de los pacientes y, en muchos casos, prolongarla.
                                        </p>
                                        <p>
                                            En la Clínica de la Costa SAS, contamos con un equipo especializado y tecnología avanzada para ofrecer tratamientos quirúrgicos personalizados, adaptados a las necesidades y características de cada paciente.
                                        </p>
                                    </div>
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
                                        {/* Tipos de Cirugía Oncológica */}
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
                                                Tipos de cirugía oncológica que ofrecemos
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <h3>1. Cirugía curativa</h3>
                                                    <p>
                                                        Esta cirugía radical tiene como objetivo curar al paciente, extirpando de manera completa el tumor y el tejido circundante afectado. Se utiliza principalmente en etapas iniciales del cáncer, cuando es posible eliminar completamente la enfermedad.
                                                    </p>
                                                    <h3>2. Cirugía paliativa</h3>
                                                    <p>
                                                        Diseñada para aliviar síntomas en pacientes con cáncer avanzado que no puede ser curado. Este tipo de cirugía busca mejorar la calidad de vida eliminando tumores que provocan dolor, obstrucciones o sangrados.
                                                    </p>
                                                    <h3>3. Cirugía preventiva</h3>
                                                    <p>
                                                        También conocida como cirugía profiláctica, está dirigida a pacientes con un alto riesgo de desarrollar ciertos tipos de cáncer. Por ejemplo, la mastectomía profiláctica en mujeres con mutaciones genéticas BRCA1 o BRCA2, que reducen significativamente el riesgo de cáncer de mama.
                                                    </p>
                                                    <h3>4. Cirugía diagnóstica</h3>
                                                    <p>
                                                        Utilizada para obtener muestras de tejido y llegar a un diagnóstico definitivo de cáncer. Este procedimiento, conocido como biopsia, puede realizarse mediante punción, corte o endoscopia, dependiendo de la localización del tumor.
                                                    </p>
                                                    <h3>5. Cirugía citorreducción</h3>
                                                    <p>
                                                        Se enfoca en reducir el tamaño del tumor antes de iniciar tratamientos complementarios como radioterapia o quimioterapia, mejorando la efectividad de estos procedimientos posteriores.
                                                    </p>
                                                    <h3>6. Cirugía de reexisión</h3>
                                                    <p>
                                                        En algunos casos, es necesario realizar una segunda cirugía para eliminar tejido residual que pudo haber quedado tras una operación inicial. Es común en casos de cáncer de piel y de mama, para asegurar que no queden células cancerosas.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* ¿Por qué elegir la Clínica de la Costa SAS? */}
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
                                                ¿Por qué elegir la Clínica de la Costa SAS?
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>Enfoque multidisciplinario: Trabajamos en conjunto con oncólogos, radioterapeutas y otros especialistas para garantizar un tratamiento integral.</li>
                                                        <li>Tecnología avanzada: Contamos con equipos modernos que aseguran precisión en los procedimientos quirúrgicos.</li>
                                                        <li>Cuidado centrado en el paciente: Brindamos atención personalizada, priorizando la calidad de vida y el bienestar emocional de cada paciente.</li>
                                                        <li>Experiencia y compromiso: Nuestro equipo médico está altamente capacitado y cuenta con años de experiencia en el tratamiento quirúrgico del cáncer.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Nuestro compromiso */}
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
                                                    <p>
                                                        Entendemos lo desafiante que puede ser el diagnóstico y tratamiento del cáncer. Por ello, en la Clínica de la Costa SAS, nos esforzamos por:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Ofrecer soluciones quirúrgicas seguras y efectivas.</li>
                                                        <li>Acompañar a los pacientes y sus familias durante todo el proceso.</li>
                                                        <li>Garantizar resultados que mejoren la calidad de vida, siempre con el mayor nivel de humanidad y profesionalismo.</li>
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

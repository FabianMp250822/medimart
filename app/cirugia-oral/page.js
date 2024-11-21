'use client';

import Layout from "@/components/layout/Layout";
import { useState } from "react";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function Service() {
    const [titulo] = useState('Cirugía Oral: Servicios Especializados en la Clínica de la Costa');
    const [isActive, setIsActive] = useState(null);

    // URL de la imagen destacada
    const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fcirugia-oral.jpg?alt=media';

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
                                    src={imageUrl}
                                    alt="Cirugía Oral"
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
                                        <h2 className="description-title">¿Qué es la Cirugía Oral?</h2>
                                        <p>
                                            La cirugía oral es una especialidad enfocada en el diagnóstico y tratamiento quirúrgico
                                            de problemas complejos en los dientes, encías, maxilares y tejidos relacionados. En la 
                                            Clínica de la Costa, ofrecemos servicios de cirugía oral avanzados para mejorar tu salud
                                            bucal y calidad de vida.
                                        </p>
                                    </div>

                                    {/* Acordeón */}
                                    <div id="accordion" className="accordion">
                                        {/* Extracción de Muelas del Juicio */}
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
                                                Extracción de Muelas del Juicio
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Realizamos la extracción quirúrgica de muelas del juicio, ya sea por molestias,
                                                        infecciones recurrentes o problemas de espacio. Utilizamos técnicas avanzadas 
                                                        para garantizar un procedimiento seguro y una recuperación rápida.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Implantes Dentales */}
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
                                                Implantes Dentales
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Ofrecemos la colocación de implantes dentales para restaurar dientes perdidos,
                                                        devolviendo la funcionalidad y estética de tu sonrisa. Nuestros implantes son 
                                                        soluciones duraderas y estables.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Cirugía Ortognática */}
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
                                                Cirugía Ortognática
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Corrige deformidades en los maxilares para mejorar la mordida, funcionalidad 
                                                        y estética facial. Trabajamos en conjunto con ortodoncistas para resultados óptimos.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <style jsx>{`
                        .description-title {
                            font-size: 24px;
                            font-weight: bold;
                            color: #1A1A3B;
                            margin-bottom: 15px;
                            border-bottom: 2px solid #ddd;
                            padding-bottom: 5px;
                        }
                    `}</style>
                </div>
            </Layout>
        </>
    );
}

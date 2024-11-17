'use client';

import Layout from "@/components/layout/Layout";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function Service() {
    const [sedes, setSedes] = useState([]);
    const [titulo] = useState('Unidades de Cuidado Intensivo: Atención Especializada para Cada Necesidad');
    const [isActive, setIsActive] = useState(null);

    useEffect(() => {
        const fetchSedes = async () => {
            try {
                const sedesRef = collection(db, "sedes");
                const sedesSnapshot = await getDocs(sedesRef);
                const sedesList = sedesSnapshot.docs.map((doc) => {
                    const nombreCompleto = doc.data().nombre;
                    return nombreCompleto.replace("Clínica de la Costa - ", ""); // Remover prefijo innecesario
                });
                setSedes(sedesList);
            } catch (error) {
                console.error("Error al obtener las sedes:", error);
            }
        };
        fetchSedes();
    }, []);

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
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2FDSC01577.JPG?alt=media&token=9cff801d-313e-4048-b4a1-8e799b50425a"
                                    alt="Unidades de Cuidado Intensivo"
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
                                        <h2 className="description-title">¿Qué son las Unidades de Cuidado Intensivo?</h2>
                                        <p>
                                            Las Unidades de Cuidado Intensivo (UCI) son áreas especializadas para el manejo de pacientes 
                                            en estado crítico o que requieren monitoreo continuo. En nuestra institución, estas unidades 
                                            están diseñadas para atender a pacientes de todas las edades, desde neonatos hasta adultos, 
                                            ofreciendo una atención personalizada y enfocada en sus necesidades específicas.
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <img
                                            src="https://picsum.photos/1200/400?random=2"
                                            alt="Atención Hospitalaria"
                                            style={{
                                                width: '100%',
                                                borderRadius: '8px',
                                                marginBottom: '15px',
                                            }}
                                        />
                                    </div>
                                    {/* Acordeón */}
                                    <div id="accordion" className="accordion">
                                        {/* Tipos de Cuidado en las UCI */}
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
                                                Tipos de Cuidado en las UCI
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    {/* Cuidado Intermedio Neonatal */}
                                                    <h3 className="service-subtitle">Cuidado Intermedio Neonatal</h3>
                                                    <p>
                                                        Esta unidad se especializa en atender recién nacidos que requieren cuidados especializados, 
                                                        pero no están en estado crítico.
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Atención a neonatos prematuros o con necesidades médicas leves.</li>
                                                        <li>Equipos de soporte respiratorio y monitoreo constante.</li>
                                                        <li>Ambientes adaptados para la seguridad y comodidad de los recién nacidos.</li>
                                                    </ul>

                                                    {/* Cuidado Intensivo Neonatal */}
                                                    <h3 className="service-subtitle">Cuidado Intensivo Neonatal</h3>
                                                    <p>
                                                        Nuestra UCI Neonatal está equipada con tecnología de punta para atender a recién nacidos en 
                                                        estado crítico, como bebés prematuros extremos o con afecciones graves al nacer.
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Incubadoras de alta tecnología.</li>
                                                        <li>Ventilación asistida para bebés con problemas respiratorios.</li>
                                                        <li>Atención las 24 horas por neonatólogos e intensivistas.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Compromiso con la Calidad */}
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
                                                Compromiso con la Calidad y Seguridad
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Nuestras Unidades de Cuidado Intensivo están diseñadas para ofrecer:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>
                                                            <strong>Tecnología de punta:</strong> Monitoreo avanzado para cada paciente.
                                                        </li>
                                                        <li>
                                                            <strong>Atención continua:</strong> Supervisión las 24 horas del día por un equipo interdisciplinario.
                                                        </li>
                                                        <li>
                                                            <strong>Personal capacitado:</strong> Profesionales especializados en el manejo de pacientes críticos.
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Unidades de Soporte */}
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
                                                Unidades Especializadas de Soporte
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Estas unidades están diseñadas para ofrecer soporte especializado en áreas críticas, como:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>
                                                            <strong>Unidad de Medicina Crítica:</strong> Equipo interdisciplinario que atiende pacientes con enfermedades complejas.
                                                        </li>
                                                        <li>
                                                            <strong>Unidad Coronaria:</strong> Enfocada en el manejo integral de pacientes con enfermedades coronarias.
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
                        font-size: 24px;
                        font-weight: bold;
                        color: #1A1A3B;
                        margin-bottom: 15px;
                        text-transform: uppercase;
                        border-bottom: 2px solid #ddd;
                        padding-bottom: 5px;
                    }
                    .service-subtitle {
                        font-size: 20px;
                        font-weight: bold;
                        color: #1A1A3B;
                        margin-top: 20px;
                        margin-bottom: 10px;
                    }
                    .service-list {
                        list-style-type: none;
                        padding-left: 0;
                        margin: 15px 0;
                    }
                    .service-list li {
                        padding: 5px 0;
                        position: relative;
                        padding-left: 25px;
                    }
                    .service-list li:before {
                        content: "✓";
                        position: absolute;
                        left: 0;
                        color: #007bff;
                        font-size: 18px;
                        font-weight: bold;
                    }
                `}</style>
            </Layout>
        </>
    );
}

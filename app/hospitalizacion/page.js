'use client';

import Layout from "@/components/layout/Layout";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function Service() {
    const [sedes, setSedes] = useState([]);
    const [titulo] = useState('Hospitalización: Servicios de Calidad y Humanización');
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
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%206.31.54%20PM.jpeg?alt=media&token=128385f5-0c3a-452c-9183-439023b2c3a0"
                                    alt="Hospitalización"
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
                                        <h2 className="description-title">Nuestra Filosofía y Objetivos</h2>
                                        <p>
                                            Contamos con un equipo humano dedicado y comprometido a servir a los usuarios con una 
                                            atención personalizada y especializada con calidad y amor, alto nivel de conocimientos 
                                            y experiencia; apoyados tecnológicamente para el diagnóstico y tratamiento de las 
                                            enfermedades.
                                        </p>
                                        <p>
                                            Uno de nuestros principales objetivos es la seguridad y comodidad en las instalaciones; 
                                            por esto contamos con la más amplia capacidad en habitaciones. La Unidad de Hospitalización 
                                            apoya los servicios de Urgencias, Cirugía y Consulta Externa, con personal idóneo y calificado 
                                            dentro del marco de la directriz médico–asistencial que nos orienta a la 
                                            <strong> "Atención integral en salud con oportunidad, eficiencia y calidad”.</strong>
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <img
                                             src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FIMG_20241114_151647997_HDR.jpg?alt=media&token=52209c69-5785-4cbd-9561-f9dfabe804f9"
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
                                        {/* Hospitalización Paciente Crónico Con Ventilador */}
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
                                                Hospitalización Paciente Crónico Con Ventilador
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Este servicio está enfocado en pacientes que requieren soporte ventilatorio constante debido 
                                                        a condiciones respiratorias críticas. Ofrecemos:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Monitoreo continuo de parámetros respiratorios y vitales.</li>
                                                        <li>Terapias respiratorias personalizadas.</li>
                                                        <li>Cuidados intensivos las 24 horas, garantizados por un equipo multidisciplinario.</li>
                                                        <li>Asesoramiento a familiares sobre el manejo y cuidado del paciente.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Hospitalización Paciente Crónico Sin Ventilador */}
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
                                                Hospitalización Paciente Crónico Sin Ventilador
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Diseñada para pacientes crónicos que necesitan supervisión médica constante pero no 
                                                        requieren asistencia ventilatoria. Nuestros servicios incluyen:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Control de medicación y terapias continuas.</li>
                                                        <li>Planes de rehabilitación específicos para cada paciente.</li>
                                                        <li>Habitaciones diseñadas para el confort del paciente y sus acompañantes.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Hospitalización Adultos */}
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
                                                Hospitalización Adultos
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Ideal para adultos que requieren atención médica especializada. Proveemos servicios 
                                                        adaptados a condiciones específicas, incluyendo:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Recuperación posquirúrgica en un entorno seguro y controlado.</li>
                                                        <li>Atención para enfermedades agudas y crónicas.</li>
                                                        <li>Tratamientos oncológicos con apoyo integral.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Hospitalización Pediátrica */}
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
                                                Hospitalización Pediátrica
                                            </h2>
                                            {isActive === 4 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Nuestros espacios pediátricos están diseñados para garantizar la seguridad y comodidad 
                                                        de los niños. Contamos con:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Habitaciones con diseño amigable y colores relajantes.</li>
                                                        <li>Especialistas pediátricos y tecnología avanzada para diagnósticos rápidos.</li>
                                                        <li>Apoyo emocional y orientación para padres.</li>
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

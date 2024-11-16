'use client';

import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import SidebarMenu from "@/components/elements/SidebarMenu";
import PacienteMenu from "@/components/elements/Pacientemenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function PreparationForMedicalTests() {
    const [isActive, setIsActive] = useState({
        status: false,
        key: 1,
    });

    const [sedes, setSedes] = useState([]);

    const handleToggle = (key) => {
        setIsActive((prevState) => ({
            status: prevState.key !== key || !prevState.status,
            key,
        }));
    };

    useEffect(() => {
        const fetchSedes = async () => {
            try {
                const sedesRef = collection(db, "sedes");
                const sedesSnapshot = await getDocs(sedesRef);
                const sedesList = sedesSnapshot.docs.map((doc) => {
                    const nombreCompleto = doc.data().nombre;
                    const nombreProcesado = nombreCompleto.replace("Clínica de la Costa - ", "");
                    return nombreProcesado;
                });
                setSedes(sedesList);
            } catch (error) {
                console.error("Error al obtener las sedes:", error);
            }
        };

        fetchSedes();
    }, []);

    const titulo = "Preparación para Exámenes Médicos";
    const descripcion = `
        La preparación adecuada para los exámenes médicos es crucial para obtener resultados precisos y confiables. Aquí encontrarás instrucciones detalladas para los exámenes más comunes. Por favor, sigue estas indicaciones cuidadosamente.
    `;

    const testsPreparation = [
        {
            title: "Exámenes de Sangre",
            content: `
                <ul>
                    <li><strong>Ayuno:</strong> Para la mayoría de los análisis de sangre, es necesario un ayuno de 8 a 12 horas. Evita alimentos, bebidas (excepto agua) y masticar chicle.</li>
                    <li><strong>Hidratación:</strong> Puedes beber agua para mantenerte hidratado, lo cual facilita la extracción de sangre.</li>
                    <li><strong>Medicamentos:</strong> Consulta con tu médico si debes suspender algún medicamento antes del examen.</li>
                </ul>
            `,
        },
        {
            title: "Pruebas de Orina",
            content: `
                <ul>
                    <li><strong>Recolecta la Primera Orina de la Mañana:</strong> Para la mayoría de las pruebas, se recomienda recolectar la primera orina del día.</li>
                    <li><strong>Higiene:</strong> Lava y seca tus manos y genitales antes de recolectar la muestra.</li>
                    <li><strong>Envase Estéril:</strong> Usa el recipiente proporcionado por el laboratorio para evitar contaminaciones.</li>
                </ul>
            `,
        },
        {
            title: "Pruebas de Imagen (Rayos X, Resonancia Magnética, Tomografía)",
            content: `
                <ul>
                    <li><strong>Ropa:</strong> Lleva ropa cómoda y sin elementos metálicos.</li>
                    <li><strong>Objetos Metálicos:</strong> Retira joyas, relojes, cinturones y otros objetos metálicos antes del examen.</li>
                    <li><strong>Consentimiento:</strong> Si estás embarazada o sospechas estarlo, informa al personal antes del procedimiento.</li>
                    <li><strong>Contraste:</strong> Algunas pruebas requieren el uso de medios de contraste. Sigue las indicaciones específicas proporcionadas por el laboratorio.</li>
                </ul>
            `,
        },
        {
            title: "Colonoscopia",
            content: `
                <ul>
                    <li><strong>Dieta Líquida:</strong> Sigue una dieta líquida clara el día anterior al examen.</li>
                    <li><strong>Laxantes:</strong> Usa los laxantes recetados para limpiar completamente el colon.</li>
                    <li><strong>Hidratación:</strong> Mantente bien hidratado durante la preparación.</li>
                </ul>
            `,
        },
        // Puedes agregar más secciones si lo necesitas
    ];

    return (
        <>
            <Layout footerStyle={1}>
                {/* Encabezado */}
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
                            <div style={{ flex: '1.5' }}>
                                <img
                                    src="https://picsum.photos/800/400"
                                    alt="Preparación para Exámenes Médicos"
                                    style={{
                                        borderRadius: '8px',
                                        width: '100%',
                                        height: '100%',
                                        maxHeight: '450px',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>
                            <ServiceHeader titulo={titulo} />
                        </div>
                    </div>
                </div>

                {/* Contenedor Principal */}
                <div className="service-details pb_110">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-3">
                                <PacienteMenu/>
                            </div>
                            <div className="col-12 col-md-9">
                                <div className="pt-4">
                                    <div className="mb-4">
                                        <p style={{ fontSize: '16px', color: '#3B3B3B', textAlign: 'justify', lineHeight: '1.8' }}>
                                            {descripcion}
                                        </p>
                                    </div>

                                    {/* Sedes */}
                                    <div className="mb-4">
                                        <p className="text-muted text-uppercase mb-2">
                                            Disponible en las sedes:
                                        </p>
                                        <div
                                            className="d-flex flex-wrap"
                                            style={{ gap: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr' }}
                                        >
                                            {sedes.map((sede, index) => (
                                                <span
                                                    key={index}
                                                    style={{
                                                        padding: '5px 15px',
                                                        borderRadius: '20px',
                                                        backgroundColor: '#3B3B3B',
                                                        color: '#F0E7D8',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {sede}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Acordeón */}
                                    <div className="accordion mt-4" id="accordionExample">
                                        {testsPreparation.map(({ title, content }, index) => (
                                            <div
                                                className="card"
                                                style={{
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    marginBottom: '15px',
                                                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                                }}
                                                key={index}
                                            >
                                                <div
                                                    className="card-header"
                                                    style={{
                                                        backgroundColor: '#2C2C5B',
                                                        borderRadius: '8px',
                                                    }}
                                                >
                                                    <button
                                                        className="btn btn-link"
                                                        onClick={() => handleToggle(index)}
                                                        style={{
                                                            color: isActive.key === index ? '#F0E7D8' : '#F0E7D8CC',
                                                            width: '100%',
                                                            textAlign: 'left',
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        {title}
                                                    </button>
                                                </div>
                                                {isActive.key === index && (
                                                    <div
                                                        className="card-body"
                                                        style={{
                                                            padding: '20px',
                                                            color: '#3B3B3B',
                                                        }}
                                                        dangerouslySetInnerHTML={{ __html: content }}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

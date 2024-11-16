'use client';

import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import SidebarMenu from "@/components/elements/SidebarMenu";
import PacienteMenu from "@/components/elements/Pacientemenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function Service() {
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
                const sedesList = sedesSnapshot.docs.map((doc) => doc.data().nombre.replace("Clínica de la Costa - ", ""));
                setSedes(sedesList);
            } catch (error) {
                console.error("Error al obtener las sedes:", error);
            }
        };

        fetchSedes();
    }, []);

    const titulo = "Servicios de Laboratorio Clínico en la Clínica de la Costa";
    const descripcion = `
        En la Clínica de la Costa, contamos con un equipo multidisciplinario de expertos en bacteriología, microbiología, bioanálisis, 
        patología clínica, inmunología, genética y cito/histotecnología, comprometidos a satisfacer las necesidades de nuestros usuarios. 
        Ofrecemos un servicio continuo, enfocado en la seguridad del paciente y respaldado por procesos de aseguramiento de calidad con 
        estándares internacionales.
    `;

    const sections = [
        {
            title: "Equipo de Profesionales al Servicio de la Salud",
            content: `
                Nuestro enfoque está alineado con los más altos estándares internacionales y nuestra misión es cumplir con la cuádruple meta en salud:
                <ul>
                    <li>Excelencia en desenlaces clínicos.</li>
                    <li>Experiencias memorables para pacientes y sus familias.</li>
                    <li>Optimización de costos en la atención.</li>
                    <li>Satisfacción de todos los grupos de interés.</li>
                </ul>
                El 70% de las decisiones médicas hospitalarias se basan en los análisis realizados en laboratorios clínicos, lo que subraya la importancia de garantizar resultados confiables, oportunos y clínicamente útiles.
            `,
            images: [
                "https://picsum.photos/400/300?random=1",
                "https://picsum.photos/400/300?random=2",
            ],
        },
        {
            title: "Automatización para la Seguridad del Paciente",
            content: `
                Para garantizar la trazabilidad y el manejo eficiente de las muestras, hemos implementado un sistema automatizado que incluye:
                <ul>
                    <li>Transporte interno mediante correo neumático, excepto para muestras con contraindicación.</li>
                    <li>Procesos robotizados para centrifugado, alicuotado y distribución de muestras, alcanzando un 95% de automatización en las operaciones.</li>
                </ul>
            `,
            images: [
                "https://picsum.photos/400/300?random=3",
                "https://picsum.photos/400/300?random=4",
            ],
        },
        {
            title: "Por Qué Escoger los Laboratorios de la Clínica de la Costa",
            content: `
                <ul>
                    <li><strong>Alto Desempeño en Control de Calidad:</strong> Participamos en programas internacionales como CAP, RIQAS y EMQN.</li>
                    <li><strong>Adherencia a Estándares Internacionales:</strong> Normas del CLSI y Acreditación del SUA reconocido por ISQua.</li>
                    <li><strong>Soporte Clínico Permanente:</strong> Contamos con patólogos clínicos, inmunólogos y genetistas disponibles para interpretaciones clínicas detalladas.</li>
                    <li><strong>Tecnología de Vanguardia:</strong> Utilizamos equipos de última generación para garantizar resultados precisos y confiables.</li>
                </ul>
            `,
            images: [
                "https://picsum.photos/400/300?random=5",
                "https://picsum.photos/400/300?random=6",
            ],
        },
        {
            title: "Servicios Especializados de Laboratorio",
            content: `
                <p>Nuestros servicios especializados incluyen:</p>
                <ul>
                    <li><strong>Laboratorio de Citogenética:</strong> Diagnóstico de enfermedades genéticas mediante análisis cromosómico y FISH.</li>
                    <li><strong>Laboratorio de Genética Molecular:</strong> Diagnósticos de enfermedades hereditarias y oncológicas mediante paneles genéticos y PCR.</li>
                    <li><strong>Laboratorio de Hematología Especial y Hemostasia:</strong> Pruebas avanzadas para trastornos hematológicos y de coagulación.</li>
                    <li><strong>Laboratorio de Microbiología e Inmunología:</strong> Diagnóstico de infecciones mediante MALDI-TOF y cultivos avanzados.</li>
                    <li><strong>Secuenciación Genómica:</strong> Análisis genéticos avanzados para diagnóstico de enfermedades hereditarias y oncológicas.</li>
                </ul>
            `,
            images: [
                "https://picsum.photos/400/300?random=7",
                "https://picsum.photos/400/300?random=8",
            ],
        },
        {
            title: "Horarios y Sedes",
            content: `
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Sede</th>
                            <th>Horario Toma de Muestras</th>
                            <th>Horario Entrega de Resultados</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Barranquilla</td>
                            <td>Lunes a viernes: 6:00 am - 5:00 pm</td>
                            <td>Lunes a viernes: 6:30 am - 6:00 pm</td>
                        </tr>
                        <tr>
                            <td>Santa Marta</td>
                            <td>Lunes a sábado: 6:00 am - 12:00 m</td>
                            <td>Lunes a sábado: 6:30 am - 12:30 pm</td>
                        </tr>
                        <tr>
                            <td>Valledupar</td>
                            <td>Lunes a sábado: 6:00 am - 12:00 m</td>
                            <td>Lunes a sábado: 6:30 am - 12:30 pm</td>
                        </tr>
                        <tr>
                            <td>Cartagena</td>
                            <td>Lunes a sábado: 6:00 am - 12:00 m</td>
                            <td>Lunes a sábado: 6:30 am - 12:30 pm</td>
                        </tr>
                    </tbody>
                </table>
            `,
            images: [],
        },
    ];

    return (
        <>
            <Layout footerStyle={1}>
                {/* Banner principal */}
                <div className="d-flex flex-column flex-md-row align-items-center p-4" style={{ backgroundColor: '#1A1A3B', borderRadius: '8px', marginBottom: '10px', marginTop: '20px', padding: '20px' }}>
                    <div className="container">
                        <div className="d-flex flex-column flex-md-row align-items-center" style={{ gap: '20px' }}>
                            <div style={{ flex: '1.5' }}>
                                <img
                                    src="https://picsum.photos/800/400"
                                    alt="Imagen de Servicio"
                                    style={{ borderRadius: '8px', width: '100%', height: '100%', maxHeight: '450px', objectFit: 'cover' }}
                                />
                            </div>
                            <ServiceHeader titulo={titulo} />
                            
                        </div>
                    </div>
                </div>

                {/* Contenido principal */}
                <div className="service-details pb_110">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-3">
                                <PacienteMenu />
                            </div>
                            <div className="col-12 col-md-9">
                                <div className="pt-4">
                                    <div className="mb-4">
                                        <p style={{ fontSize: '16px', color: '#3B3B3B', textAlign: 'justify', lineHeight: '1.8' }}>{descripcion}</p>
                                    </div>
                                    <div className="mb-4">
    <p className="text-muted text-uppercase mb-2" style={{ color: '#F0E7D8' }}>
        Disponible en las sedes:
    </p>
    <div className="d-flex flex-wrap" style={{ gap: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
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

                                    <div className="accordion mt-4" id="accordionExample">
                                        {sections.map(({ title, content, images }, index) => (
                                            <div className="card" key={index} style={{ border: 'none', borderRadius: '8px', marginBottom: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                                                <div className="card-header" style={{ backgroundColor: '#2C2C5B', borderRadius: '8px' }}>
                                                    <button className="btn btn-link" onClick={() => handleToggle(index)} style={{ color: isActive.key === index ? '#F0E7D8' : '#F0E7D8CC', width: '100%', textAlign: 'left', fontWeight: 'bold' }}>
                                                        {title}
                                                    </button>
                                                </div>
                                                
                                                {isActive.key === index && (
                                                    <div className="card-body" style={{ padding: '20px', color: '#3B3B3B' }}>
                                                        <div dangerouslySetInnerHTML={{ __html: content }} />
                                                        {images.length > 0 && (
                                                            <div className="mt-4 d-flex justify-content-between">
                                                                {images.map((img, imgIndex) => (
                                                                    <img
                                                                        key={imgIndex}
                                                                        src={img}
                                                                        alt={`Imagen ${imgIndex + 1}`}
                                                                        style={{ width: '48%', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                                                                    />
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
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

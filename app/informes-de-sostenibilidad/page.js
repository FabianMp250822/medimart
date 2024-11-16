'use client';

import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import SidebarMenu from "@/components/elements/SidebarMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function Service() {
    const currentYear = new Date().getFullYear();
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

    const titulo = `Informe de Sostenibilidad Clínica de la Costa - ${currentYear}`;
    const descripcion = `
        En la Clínica de la Costa, nuestro compromiso va más allá de ofrecer servicios médicos de calidad. Trabajamos para impactar positivamente en la vida de nuestros pacientes, colaboradores y la comunidad en general, promoviendo un modelo de desarrollo sostenible. Este informe refleja nuestras acciones, logros y desafíos en el ámbito económico, social y ambiental.
    `;

    const sections = [
        {
            title: "Mensaje de la Dirección General",
            content: `
                En la Clínica de la Costa, nuestro compromiso va más allá de ofrecer servicios médicos de calidad. Este informe refleja nuestras acciones, logros y desafíos en el ámbito económico, social y ambiental.
            `,
        },
        {
            title: "Perfil de la Clínica",
            content: `
                <ul>
                    <li><strong>Misión:</strong> Proveer atención médica integral que combine tecnología avanzada, talento humano capacitado y un enfoque centrado en el paciente.</li>
                    <li><strong>Visión:</strong> Ser el principal referente en salud sostenible en el Caribe colombiano.</li>
                    <li><strong>Ubicación:</strong> Barranquilla, con influencia en toda la región Caribe.</li>
                    <li><strong>Servicios:</strong> Hospitalización, consulta externa, cirugía, telemedicina y programas de salud comunitaria.</li>
                </ul>
            `,
        },
        {
            title: "Gobernanza y Ética",
            content: `
                <ul>
                    <li><strong>Políticas de Transparencia:</strong> Implementamos controles internos para garantizar prácticas éticas y responsables.</li>
                    <li><strong>Comités Especializados:</strong>
                        <ul>
                            <li>Comité de Ética Médica.</li>
                            <li>Comité de Sostenibilidad y Responsabilidad Social.</li>
                        </ul>
                    </li>
                    <li><strong>Gestión de Riesgos:</strong> Evaluamos continuamente los riesgos económicos, sociales y ambientales.</li>
                </ul>
            `,
        },
        {
            title: "Compromiso con los Objetivos de Desarrollo Sostenible (ODS)",
            content: `
                <ul>
                    <li><strong>ODS 3 (Salud y Bienestar):</strong> Realizamos 15 jornadas médicas gratuitas, beneficiando a más de 5,000 personas.</li>
                    <li><strong>ODS 13 (Acción por el Clima):</strong> Reducimos nuestra huella de carbono en un 30% gracias a la implementación de energías renovables.</li>
                    <li><strong>ODS 5 (Igualdad de Género):</strong> 60% de nuestro equipo de liderazgo está compuesto por mujeres.</li>
                </ul>
            `,
        },
        {
            title: "Dimensión Económica",
            content: `
                <ul>
                    <li><strong>Resultados Financieros:</strong>
                        <ul>
                            <li>Ingresos anuales: $XX.XXX millones COP.</li>
                            <li>Inversiones en infraestructura sostenible: $X.XXX millones COP.</li>
                        </ul>
                    </li>
                    <li><strong>Impacto Económico Local:</strong>
                        <ul>
                            <li>Generamos 1,500 empleos directos y 500 indirectos.</li>
                            <li>El 70% de nuestros proveedores son locales.</li>
                        </ul>
                    </li>
                    <li><strong>Eficiencia Financiera:</strong> Optimizamos el uso de recursos operativos, ahorrando un 15% en costos.</li>
                </ul>
            `,
        },
        {
            title: "Dimensión Social",
            content: `
                <ul>
                    <li><strong>Impacto en la Comunidad:</strong>
                        <ul>
                            <li>10 campañas de prevención de enfermedades crónicas como hipertensión y diabetes.</li>
                            <li>Programas de vacunación: 12,000 dosis administradas.</li>
                        </ul>
                    </li>
                    <li><strong>Colaboradores y Talento Humano:</strong>
                        <ul>
                            <li>Capacitamos a 800 colaboradores en sostenibilidad y salud integral.</li>
                            <li>Implementamos programas de bienestar laboral, logrando un índice de satisfacción del 92%.</li>
                        </ul>
                    </li>
                    <li><strong>Inclusión y Diversidad:</strong> Contratamos a 20 personas con discapacidad, integrándolas a diferentes áreas.</li>
                </ul>
            `,
        },
        {
            title: "Dimensión Ambiental",
            content: `
                <ul>
                    <li><strong>Gestión de Residuos:</strong>
                        <ul>
                            <li>Tratamos el 100% de los residuos hospitalarios generados.</li>
                            <li>Reciclamos más de 10 toneladas de papel y plástico durante el año.</li>
                        </ul>
                    </li>
                    <li><strong>Consumo Responsable:</strong>
                        <ul>
                            <li>Reducimos el uso de agua en un 25% gracias a sistemas de reutilización.</li>
                            <li>Implementamos paneles solares que abastecen el 40% de nuestras necesidades energéticas.</li>
                        </ul>
                    </li>
                    <li><strong>Proyectos Ambientales:</strong> Lideramos campañas de reforestación, plantando 5,000 árboles en la región.</li>
                </ul>
            `,
        },
        {
            title: "Conclusión",
            content: `
                Este informe reafirma nuestro compromiso con la sostenibilidad y el desarrollo de nuestra región. Cada acción que realizamos tiene como objetivo mejorar la vida de las personas, cuidar el medio ambiente y contribuir al crecimiento económico local.
            `,
        },
    ];

    return (
        <>
            <Layout footerStyle={1}>
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
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/banner%2Fmisionvision_(1)-transformed.jpeg?alt=media&token=fc787cf2-c0e8-4f7a-a5a4-da0291536d42"
                                    alt="Imagen de Servicio"
                                    style={{
                                        borderRadius: '8px',
                                        width: '100%',
                                        height: '100%',
                                        maxHeight: '450px',
                                        objectFit: 'cover',
                                        marginTop: "50px",
                                    }}
                                />
                            </div>
                            <ServiceHeader titulo={titulo} />
                        </div>
                    </div>
                </div>
                <div className="service-details pb_110">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-3">
                                <SidebarMenu />
                            </div>
                            <div className="col-12 col-md-9">
                                <div className="pt-4">
                                    <div className="mb-4">
                                        <p style={{ fontSize: '16px', color: '#3B3B3B', textAlign: 'justify', lineHeight: '1.8' }}>
                                            {descripcion}
                                        </p>
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
                                        {sections.map(({ title, content }, index) => (
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

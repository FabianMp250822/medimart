'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState, useEffect } from 'react'
import { collection, doc, getDocs, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import SidebarMenu from "@/components/elements/SidebarMenu"
import ServiceHeader from "@/components/elements/ServiceHeader"

export default function Service() {
    const [isActive, setIsActive] = useState({
        status: false,
        key: 1,
    });

    const [sedes, setSedes] = useState([]); // Estado para almacenar las sedes
    const [sections, setSections] = useState([]); // Estado para almacenar las secciones del acordeón
    const [titulo, setTitulo] = useState(''); // Estado para almacenar el título

    const handleToggle = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            });
        } else {
            setIsActive({
                status: true,
                key,
            });
        }
    };

    useEffect(() => {
        // Obtener sedes
        const fetchSedes = async () => {
            try {
                const sedesRef = collection(db, 'sedes');
                const sedesSnapshot = await getDocs(sedesRef);
                const sedesList = sedesSnapshot.docs.map(doc => {
                    const nombreCompleto = doc.data().nombre;
                    const nombreProcesado = nombreCompleto.replace('Clínica de la Costa - ', ''); // Eliminamos "Clínica de la Costa -"
                    return nombreProcesado; // Devolvemos solo la parte final
                });
                setSedes(sedesList); // Actualizamos el estado con las sedes
            } catch (error) {
                console.error("Error al obtener las sedes:", error);
            }
        };

        // Obtener título y secciones del documento "nosotros"
        const fetchNosotrosData = async () => {
            try {
                const nosotrosDocRef = doc(db, 'nosotros', '6Y3wpGVeGAmBXC8ubA46');
                const nosotrosDoc = await getDoc(nosotrosDocRef);

                if (nosotrosDoc.exists()) {
                    const data = nosotrosDoc.data();
                    setTitulo(data.title || ''); // Establecemos el título en el estado
                    setSections(data.sections || []); // Actualizamos el estado con las secciones
                } else {
                    console.log("No se encontró el documento de nosotros");
                }
            } catch (error) {
                console.error("Error al obtener los datos de nosotros:", error);
            }
        };

        fetchSedes();
        fetchNosotrosData();
    }, []);

    return (
        <>
            <Layout footerStyle={1}>
                {/* Banner principal */}
                <div
                    className="d-flex flex-column flex-md-row align-items-center p-4"
                    style={{
                        backgroundColor: '#1A1A3B', // Fondo oscuro
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
                            <div style={{ flex: '1.5' }}> {/* Incrementamos el valor de flex para hacer la imagen más grande */}
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/banner%2Fmisionvision_(1)-transformed.jpeg?alt=media&token=fc787cf2-c0e8-4f7a-a5a4-da0291536d42"
                                    alt="Imagen de Servicio"
                                    style={{
                                        borderRadius: '8px',
                                        width: '100%',
                                        height: '100%',
                                        maxHeight: '450px', // Aumentamos el tamaño máximo
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>

                            {/* Contenido */}
                            <ServiceHeader titulo={titulo} />
                        </div>
                    </div>
                </div>

                {/* Contenedor principal */}
                <div className="service-details pb_110">
                    <div className="container">
                        <div className="row">
                            {/* Menú lateral */}
                            <div className="col-12 col-md-3">
                            <SidebarMenu /> {/* Usamos el componente SidebarMenu */}
                        </div>

                            {/* Contenido principal */}
                            <div className="col-12 col-md-9">
                                <div className="pt-4">
                                    <div
                                        className="d-flex justify-content-between border-bottom pb-4"
                                        style={{ gap: '20px' }}
                                    >
                                        {/* Descripción */}
                                        <div className="col-12 col-md-6 px-3">
                                            <p
                                                className="text-muted text-uppercase mb-2"
                                                style={{
                                                    color: '#F0E7D8',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Descripción:
                                            </p>
                                            <div
                                                style={{
                                                    fontSize: '16px',
                                                    color: '#3B3B3B',
                                                    textAlign: 'justify', // Justificar texto
                                                    lineHeight: '1.8',
                                                }}
                                            >
                                                La Clínica de la Costa es un centro de salud líder en la región, dedicado a brindar atención médica integral y de alta calidad. Creemos en la importancia de contar con un equipo profesional y motivado que comparta nuestro compromiso con el bienestar de nuestros pacientes.
                                            </div>
                                        </div>
                                        {/* Sedes */}
                                        <div className="col-12 col-md-6 px-3">
                                            <p
                                                className="text-muted text-uppercase mb-2"
                                                style={{
                                                    color: '#F0E7D8',
                                                }}
                                            >
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
                                    </div>

                                    {/* Acordeón */}
                                    <div
                                        className="accordion mt-4"
                                        id="accordionExample"
                                        style={{ width: '100%' }}
                                    >
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
                                                    id={`heading${index}`}
                                                    style={{
                                                        backgroundColor: '#2C2C5B',
                                                        padding: '0',
                                                        borderRadius: '8px',
                                                    }}
                                                >
                                                    <h5 className="mb-0">
                                                        <button
                                                            className="btn btn-link"
                                                            onClick={() => handleToggle(index)}
                                                            style={{
                                                                color: isActive.key === index ? '#F0E7D8' : '#F0E7D8CC',
                                                                backgroundColor: 'transparent',
                                                                textDecoration: 'none',
                                                                padding: '15px 20px',
                                                                display: 'block',
                                                                width: '100%',
                                                                textAlign: 'left',
                                                                fontWeight: 'bold',
                                                                fontSize: '16px',
                                                                borderRadius: '8px',
                                                                transition: 'background-color 0.3s ease, color 0.3s ease',
                                                            }}
                                                        >
                                                            {title}
                                                            <i
                                                                className={`fas fa-chevron-${isActive.key === index ? 'up' : 'down'}`}
                                                                style={{ float: 'right' }}
                                                            ></i>
                                                        </button>
                                                    </h5>
                                                </div>
                                                <div
                                                    id={`collapse${index}`}
                                                    className={`collapse ${isActive.key === index ? 'show' : ''}`}
                                                    aria-labelledby={`heading${index}`}
                                                    data-parent="#accordionExample"
                                                >
                                                    <div
                                                        className="card-body"
                                                        style={{
                                                            padding: '20px',
                                                            color: '#3B3B3B',
                                                            backgroundColor: '#FFFFFF',
                                                            borderBottomLeftRadius: '8px',
                                                            borderBottomRightRadius: '8px',
                                                        }}
                                                    >
                                                        <p>{content}</p>
                                                    </div>
                                                </div>
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
    )
}

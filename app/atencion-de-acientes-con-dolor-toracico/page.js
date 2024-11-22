'use client';

import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function ChestPainProgram() {
    const [data, setData] = useState(null); // Estado para almacenar los datos de Firebase
    const [isActive, setIsActive] = useState(null); // Control del acordeón
    const [loading, setLoading] = useState(true); // Estado de carga
    const [imageLoaded, setImageLoaded] = useState(true); // Controla la carga de la imagen en el header
    const [contentImageLoaded, setContentImageLoaded] = useState(true); // Controla la carga de la imagen en el contenido

    // Función para cargar datos desde Firebase
    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, "especialidades", "KK3Ijy9Wa43TzDVwLuxj");
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setData(docSnap.data());
                } else {
                    console.error("El documento no existe");
                }
            } catch (error) {
                console.error("Error obteniendo el documento:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleAccordion = (key) => {
        setIsActive(isActive === key ? null : key);
    };

    if (loading) {
        return <p>Cargando...</p>; // Muestra un mensaje mientras los datos se cargan
    }

    if (!data) {
        return <p>Error al cargar los datos.</p>; // Muestra un mensaje si no hay datos
    }

    return (
        <>
            <Layout footerStyle={1}>
                {/* Banner Principal */}
                <div
                    className={`d-flex flex-column ${imageLoaded ? 'flex-md-row' : ''} align-items-center p-4`}
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
                            className={`d-flex flex-column ${imageLoaded ? 'flex-md-row' : ''} align-items-center`}
                            style={{
                                gap: '20px',
                            }}
                        >
                            {/* Imagen */}
                            {imageLoaded && data.banner && (
                                <div style={{ flex: '1.5' }}>
                                    <img
                                        src={data.banner.image}
                                        alt={data.banner.alt || "Banner"}
                                        onError={() => setImageLoaded(false)} // Maneja el error de carga
                                        style={{
                                            borderRadius: '8px',
                                            width: '100%',
                                            height: 'auto',
                                            maxHeight: '450px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                            )}

                            {/* Contenido */}
                            <ServiceHeader titulo={data.title} />
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
                                        <h2 className="description-title">{data.description.title}</h2>
                                        <p>{data.description.content}</p>
                                    </div>

                                    {/* Imagen dentro del contenido */}
                                    {contentImageLoaded && data.content_image && (
                                        <div className="mb-4">
                                            <img
                                                src={data.content_image.image}
                                                alt={data.content_image.alt || "Contenido"}
                                                onError={() => setContentImageLoaded(false)} // Maneja el error de carga
                                                style={{
                                                    width: '100%',
                                                    height: '400px',
                                                    borderRadius: '8px',
                                                    marginBottom: '10px',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                            {/* Texto debajo de la imagen */}
                                            <p
                                                style={{
                                                    color: '#000',
                                                    fontSize: '18px',
                                                    textAlign: 'center',
                                                    marginTop: '5px',
                                                }}
                                            >
                                                {data.title}
                                            </p>
                                        </div>
                                    )}

                                    {/* Acordeón */}
                                    <div id="accordion" className="accordion">
                                        {data.accordion &&
                                            data.accordion.map((item, index) => (
                                                <div className="accordion-item" key={index}>
                                                    <h2
                                                        className="accordion-header"
                                                        onClick={() => toggleAccordion(index)}
                                                        style={{
                                                            cursor: 'pointer',
                                                            backgroundColor: isActive === index ? '#1A1A3B' : '#f9f9f9',
                                                            color: isActive === index ? '#fff' : '#1A1A3B',
                                                            padding: '10px 15px',
                                                            borderRadius: '5px',
                                                            marginBottom: '5px',
                                                            fontSize: '18px',
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        {item.title}
                                                    </h2>
                                                    {isActive === index && (
                                                        <div className="accordion-body">
                                                            <ul className="service-list">
                                                                {item.content.map((subItem, subIndex) => (
                                                                    <li key={subIndex}>
                                                                        <strong>{subItem.title}</strong>: {subItem.description}
                                                                    </li>
                                                                ))}
                                                            </ul>
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

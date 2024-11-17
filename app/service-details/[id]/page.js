'use client';
import { useParams, useRouter } from 'next/navigation';
import Layout from "@/components/layout/Layout";
import { useState, useEffect } from 'react';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ServiceList from '@/components/services/ServiceList';
import ServicesMenu from '@/components/elements/ServicesMenu';
import ServiceHeader from '@/components/elements/ServiceHeader';

export default function ServiceDetails() {
    const { id } = useParams();
    const [serviceData, setServiceData] = useState(null);
    const [servicesList, setServicesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(null);
    const [contactInfo, setContactInfo] = useState({ tel: '', cel: '' });
    const router = useRouter();

    useEffect(() => {
        
        const fetchServiceData = async () => {
            try {
                const servicesRef = collection(db, 'serviciosclinica');
                const servicesSnapshot = await getDocs(servicesRef);
                const services = servicesSnapshot.docs
                    .map(doc => {
                        const rawTitle = doc.data().publicTarget?.title || doc.id;
                        return { id: doc.id, title: rawTitle }; // Sin transformación
                    })
                    .filter(service => !/¿|\?|Objetivo|El Servicio|Acerca|La Sección|Servicios que ofrece|Qué es/i.test(service.title));
                setServicesList(services);
        
                const docRef = doc(db, 'serviciosclinica', id);
                const docSnap = await getDoc(docRef);
        
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.accordionContent) {
                        data.accordionContent = data.accordionContent
                            .filter(content => !/Nuestro equipo|Equipo médico|Grupo de trabajo/i.test(content.sectionTitle))
                            .map(content => ({
                                ...content,
                                sectionContent: content.sectionContent.replace(/fundación valle del lili/gi, "Clínica de la Costa"),
                                sectionTitle: content.sectionTitle.replace(/fundación valle del lili/gi, "Clínica de la Costa")
                            }));
                    }
                    setServiceData(data);
                    setContactInfo({
                        tel: data.tel || "3369999",
                        cel: data.cel || "3235676236"
                    });
                } else {
                    console.log('No existe el documento');
                }
            } catch (error) {
                console.error('Error al obtener el documento:', error);
            } finally {
                setLoading(false);
            }
        };
        

        fetchServiceData();
    }, [id]);

    const { accordionContent, link, publicTarget, imageUrl, banner, banner2, cifras, servicios } = serviceData || {};
    const { description, title } = publicTarget || {};

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleServiceClick = (serviceId) => {
        router.push(`/service-details/${serviceId}`);
    };

    return (
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
                            {/* Imagen */}
                            <div style={{ flex: '1.5' }}>
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2FDSC01594.JPG?alt=media&token=d932da45-0f06-4b19-85dc-58b718ff3a30"
                                    alt="Cirugía Vascular y Angiológica"
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
                            <ServiceHeader titulo={title} />
                        </div>
                    </div>
                </div>
                <div className="auto-container">
                    <div className="row clearfix">
                    <div className="col-12 col-md-3">
                                <ServicesMenu />
                            </div>

                        <div className="col-lg-9 col-md-8 col-sm-12 content-side">
                            <div className="service-details-content">
                            <h2>{title || id}</h2>

                                <p>{description || "Descripción no disponible"}</p>

                                {/* Botones de contacto */}
                                <div className="contact-buttons">
                                    <a
                                        href={`tel:+57605${contactInfo.tel}`}
                                        className="contact-button"
                                    >
                                        📞 Llamar {contactInfo.tel}
                                    </a>
                                    <a
                                        href={`https://wa.me/57${contactInfo.cel}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="contact-button"
                                    >
                                        📱 WhatsApp {contactInfo.cel}
                                    </a>
                                </div>

                                {/* Sección de Nuestros Servicios */}
                                {servicios && servicios.length > 0 && (
                                    <div className="our-services">
                                        <h3>Nuestros Servicios</h3>
                                        <div className="services-grid">
                                            {servicios.map((service, index) => (
                                                <div key={index} className="service-item">
                                                    {service}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Nueva imagen de banner en lugar de las dos imágenes */}
                                {banner2 && (
                                    <div className="full-width-banner">
                                        <img src={banner2} alt="Imagen adicional del servicio" />
                                    </div>
                                )}

                                {/* Sección de Cifras */}
                                {cifras && cifras.length > 0 && (
                                    <div className="statistics-section">
                                        <h3>Cifras de {title || "Detalles del Servicio"}</h3>
                                        <div className="statistics-grid">
                                            {cifras.map((item, index) => (
                                                <div key={index} className="statistic-card">
                                                    <span className="statistic-number">{item.cantidad}</span>
                                                    <span className="statistic-title">{item.nombre}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Sección de acordeón */}
                                {loading ? (
                                    <p>Cargando contenido, por favor espera...</p>
                                ) : (
                                    accordionContent && accordionContent.length > 0 && (
                                        <div className="accordion-section-custom">
                                            <h3>Detalles</h3>
                                            {accordionContent.map((content, index) => (
                                                <div key={index} className="accordion-item-custom">
                                                    <div
                                                        className="accordion-title-custom"
                                                        onClick={() => toggleAccordion(index)}
                                                    >
                                                        <span>{content.sectionTitle}</span>
                                                        <span
                                                            className={`accordion-icon ${
                                                                activeIndex === index ? 'accordion-icon-active' : ''
                                                            }`}
                                                        >
                                                            ▼
                                                        </span>
                                                    </div>
                                                    {activeIndex === index && (
                                                        <div className="accordion-content-custom">
                                                            <p>{content.sectionContent}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )
                                )}

                                {/* Estilos */}
                                <style jsx>{`
                                    .banner-image img {
                                        width: 100%;
                                        height: auto;
                                        margin-bottom: 20px;
                                        border-radius: 8px;
                                    }
                                    .service-details-content h2 {
                                        font-size: 28px;
                                        font-weight: bold;
                                        margin-bottom: 20px;
                                    }
                                    .contact-buttons {
                                        display: flex;
                                        gap: 15px;
                                        margin-top: 20px;
                                    }
                                    .contact-button {
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        padding: 10px 20px;
                                        border: none;
                                        border-radius: 50px;
                                        background-color: #1a1a50;
                                        color: #ffffff;
                                        font-size: 16px;
                                        font-weight: bold;
                                        cursor: pointer;
                                        transition: background 0.3s ease;
                                        text-decoration: none;
                                    }
                                    .contact-button:hover {
                                        background-color: #2c2c7a;
                                    }
                                    .our-services {
                                        margin: 30px 0;
                                    }
                                    .our-services h3 {
                                        font-size: 24px;
                                        font-weight: bold;
                                        margin-bottom: 20px;
                                    }
                                    .services-grid {
                                        display: grid;
                                        grid-template-columns: repeat(2, 1fr);
                                        gap: 15px;
                                    }
                                    .service-item {
                                        background-color: #f5f5f5;
                                        padding: 15px;
                                        border-radius: 8px;
                                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                        font-size: 16px;
                                        font-weight: bold;
                                        text-align: center;
                                        transition: transform 0.3s ease, background-color 0.3s ease;
                                        cursor: pointer;
                                    }
                                    .service-item:hover {
                                        transform: scale(1.05);
                                        background-color: #e0e0e0;
                                    }
                                    .full-width-banner img {
                                        width: 100%;
                                        height: auto;
                                        margin: 20px 0;
                                        border-radius: 8px;
                                    }
                                    .statistics-section {
                                        margin-top: 30px;
                                        text-align: center;
                                    }
                                    .statistics-section h3 {
                                        font-size: 24px;
                                        font-weight: bold;
                                        margin-bottom: 20px;
                                    }
                                    .statistics-grid {
                                        display: grid;
                                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                                        gap: 20px;
                                    }
                                    .statistic-card {
                                        background-color: #f5f5f5;
                                        padding: 20px;
                                        border-radius: 8px;
                                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                        text-align: center;
                                        transition: transform 0.3s ease, background-color 0.3s ease;
                                        cursor: pointer;
                                    }
                                    .statistic-card:hover {
                                        transform: translateY(-5px);
                                        background-color: #e0e0e0;
                                    }
                                    .statistic-number {
                                        font-size: 32px;
                                        font-weight: bold;
                                        color: #00695c;
                                        display: block;
                                    }
                                    .statistic-title {
                                        font-size: 16px;
                                        font-weight: 600;
                                        color: #333;
                                    }
                                    .accordion-section-custom {
                                        border-top: 2px solid #1a1a50;
                                        margin-top: 20px;
                                    }
                                    .accordion-title-custom {
                                        background-color: #1a1a50;
                                        color: #fff;
                                        padding: 15px;
                                        font-weight: bold;
                                        cursor: pointer;
                                        display: flex;
                                        justify-content: space-between;
                                        align-items: center;
                                        transition: background 0.3s ease;
                                    }
                                    .accordion-title-custom:hover {
                                        background-color: #2c2c7a;
                                    }
                                    .accordion-content-custom {
                                        padding: 15px;
                                        border: 1px solid #1a1a50;
                                        border-top: none;
                                        background-color: #f0f0f5;
                                    }
                                `}</style>
                            </div>
                        </div>
                    </div>
                </div>
          
        </Layout>
    );
}

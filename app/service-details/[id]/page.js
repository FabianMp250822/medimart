'use client';

import { useParams, useRouter } from 'next/navigation';
import Layout from "@/components/layout/Layout";
import { useState, useEffect } from 'react';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ServiceList from '@/components/services/ServiceList';

export default function ServiceDetails() {
    const { id } = useParams();
    const [serviceData, setServiceData] = useState(null);
    const [servicesList, setServicesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const servicesRef = collection(db, 'serviciosclinica');
                const servicesSnapshot = await getDocs(servicesRef);
                const services = servicesSnapshot.docs
                    .map(doc => {
                        const rawTitle = doc.data().publicTarget?.title || doc.id;
                        const formattedTitle = rawTitle
                            .replace(/-/g, ' ') // Reemplaza los guiones por espacios
                            .replace(/\b\w/g, char => char.toUpperCase()); // Capitaliza cada palabra
                        return { id: doc.id, title: formattedTitle };
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

    const { accordionContent, link, publicTarget, imageUrl } = serviceData || {};
    const { description, title } = publicTarget || {};

    const modifiedLink = link && link.startsWith('https://valledellili.org/')
        ? link.replace('https://valledellili.org/', 'https://clinicadelacosta.com/')
        : link;

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleServiceClick = (serviceId) => {
        router.push(`/service-details/${serviceId}`);
    };

    return (
        <Layout headerStyle={2} footerStyle={1} breadcrumbTitle={title || "Detalles del Servicio"}>
            <section className="service-details pt_120 pb_110">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="col-lg-3 col-md-4 col-sm-12 sidebar-side">
                            <ServiceList 
                                servicesList={servicesList} 
                                activeServiceId={id} 
                                onServiceClick={handleServiceClick} 
                            />
                        </div>

                        <div className="col-lg-9 col-md-8 col-sm-12 content-side">
                            <div className="service-details-content">
                                <h2>{(title || id).replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</h2>
                                <p>{description || "Descripción no disponible"}</p>

                                <div className="image-section">
                                    <img src={imageUrl || 'https://picsum.photos/600/400'} alt="Imagen del servicio" />
                                    <img src="https://picsum.photos/600/400?random=1" alt="Imagen adicional" />
                                </div>

                                <style jsx>{`
                                    .service-details-content h2 {
                                        font-size: 28px;
                                        font-weight: bold;
                                        margin-bottom: 20px;
                                    }
                                    .image-section {
                                        display: flex;
                                        flex-wrap: wrap;
                                        gap: 10px;
                                        margin: 20px 0;
                                    }
                                    .image-section img {
                                        width: 100%;
                                        max-width: 48%;
                                        border-radius: 8px;
                                        transition: transform 0.3s ease;
                                    }
                                    .image-section img:hover {
                                        transform: scale(1.05);
                                    }
                                    .accordion-section-custom {
                                        border-top: 2px solid #007bff;
                                        margin-top: 20px;
                                    }
                                    .accordion-title-custom {
                                        background-color: #007bff;
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
                                        background-color: #0056b3;
                                    }
                                    .accordion-content-custom {
                                        padding: 15px;
                                        border: 1px solid #007bff;
                                        border-top: none;
                                        background-color: #f9f9f9;
                                    }
                                    .accordion-item-custom {
                                        margin-bottom: 10px;
                                    }
                                    .accordion-icon {
                                        font-size: 18px;
                                        transition: transform 0.3s ease;
                                    }
                                    .accordion-icon-active {
                                        transform: rotate(180deg);
                                    }
                                    .link-custom {
                                        color: #007bff;
                                        font-weight: bold;
                                        text-decoration: none;
                                        transition: color 0.3s ease;
                                    }
                                    .link-custom:hover {
                                        color: #0056b3;
                                    }
                                `}</style>

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
{/* 
                                {modifiedLink && (
                                    <p>
                                        <a href={modifiedLink} target="_blank" rel="noopener noreferrer" className="link-custom">
                                            Más información
                                        </a>
                                    </p>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

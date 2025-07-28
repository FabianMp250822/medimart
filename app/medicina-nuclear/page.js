'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function MedicinaNuclear() {
    const [titulo] = useState("Medicina Nuclear en la Clínica de la Costa");
    const [isActive, setIsActive] = useState(null);

    const toggleAccordion = (key) => {
        setIsActive(isActive === key ? null : key);
    };

    return (
        <>
            <Layout footerStyle={1}>
                {/* Banner Principal (header original) */}
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
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-20%20at%209.31.29%20AM.jpeg?alt=media&token=328a483e-a5ad-43da-aba7-397182223a5d"
                                    alt="Medicina Nuclear"
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
                {/* Contenido Principal con sidebar y nuevo diseño solo en el contenido */}
                <div className="service-details pb_110">
                    <div className="container">
                        <div className="row">
                            {/* Menú Lateral (sidebar original) */}
                            <div className="col-12 col-md-3">
                                <ServicesMenu />
                            </div>
                            {/* Contenido (nuevo diseño tipo blog) */}
                            <div className="col-12 col-md-9">
                                <div className="blog-body" style={{background:'#fff', borderRadius:'12px', boxShadow:'0 4px 24px rgba(0,0,0,0.07)', padding:'32px 32px 0 32px', marginBottom:'30px'}}>
                                    <div className="blog-main-img-block" style={{marginBottom:'28px', textAlign:'center'}}>
                                        <img
                                            src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-20%20at%2010.19.22%20AM.jpeg?alt=media&token=82f15339-9614-4e44-8644-348739824bd2"
                                            alt="Atención Hospitalaria"
                                            style={{width:'100%', maxWidth:'600px', height:'340px', objectFit:'cover', borderRadius:'10px', boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}
                                        />
                                        <div className="blog-main-img-caption" style={{color:'#1A1A3B', fontSize:'1.1rem', marginTop:'8px', fontWeight:600}}>{titulo}</div>
                                    </div>
                                    <section className="blog-section" style={{marginBottom:'36px'}}>
                                        <h2 style={{fontSize:'1.5rem', color:'#1A1A3B', fontWeight:700, marginBottom:'12px', borderLeft:'4px solid #007bff', paddingLeft:'12px'}}>Diagnóstico y Tratamiento Avanzado</h2>
                                        <p>
                                            La Unidad de Medicina Nuclear de Clínica de la Costa cuenta con tecnología de vanguardia y un equipo médico especializado para brindar servicios diagnósticos y terapéuticos de la más alta calidad. Nuestro compromiso es ofrecer atención integral con los más altos estándares de seguridad radiológica y excelencia médica.
                                        </p>
                                        <blockquote className="blog-quote" style={{background:'#f4f7ff', borderLeft:'4px solid #007bff', padding:'16px 20px', margin:'18px 0', fontSize:'1.1rem', color:'#1A1A3B', borderRadius:'6px', fontStyle:'italic'}}>
                                            <b>Nuestra Misión:</b> Proporcionar servicios de medicina nuclear de excelencia, utilizando tecnología avanzada para el diagnóstico preciso y tratamiento efectivo de nuestros pacientes, con un enfoque humano y seguro.
                                        </blockquote>
                                    </section>
                                    <section className="blog-section" style={{marginBottom:'36px'}}>
                                        <h2 style={{fontSize:'1.5rem', color:'#1A1A3B', fontWeight:700, marginBottom:'12px', borderLeft:'4px solid #007bff', paddingLeft:'12px'}}>Servicios Destacados</h2>
                                        <div id="accordion" className="accordion">
                                            {/* ...existing code... (acordeón de servicios) */}
                                            {/* Cardiología Nuclear */}
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
                                                    Cardiología Nuclear
                                                </h2>
                                                {isActive === 1 && (
                                                    <div className="accordion-body">
                                                        <div className="service-subsection">
                                                            <h4>Perfusión Miocárdica (SPECT)</h4>
                                                            <ul className="service-list">
                                                                <li>Diagnóstico de enfermedad arterial coronaria</li>
                                                                <li>Evaluación de viabilidad miocárdica</li>
                                                                <li>Duración: 3-4 horas</li>
                                                                <li>Preparación: Ayuno de 4 horas</li>
                                                            </ul>
                                                        </div>
                                                        <div className="service-subsection">
                                                            <h4>Ventriculografía Isotópica (MUGA)</h4>
                                                            <ul className="service-list">
                                                                <li>Evaluación de función ventricular</li>
                                                                <li>Seguimiento de cardiotoxicidad</li>
                                                                <li>Duración: 45 minutos</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {/* ...existing code... (resto del acordeón igual) */}
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
                                                    Endocrinología Nuclear
                                                </h2>
                                                {isActive === 2 && (
                                                    <div className="accordion-body">
                                                        <div className="service-subsection">
                                                            <h4>Gammagrafía de Tiroides</h4>
                                                            <ul className="service-list">
                                                                <li>Evaluación de nódulos tiroideos</li>
                                                                <li>Diagnóstico de hipertiroidismo</li>
                                                                <li>Detección de cáncer de tiroides</li>
                                                                <li>Duración: 30 minutos</li>
                                                            </ul>
                                                        </div>
                                                        <div className="service-subsection">
                                                            <h4>Captación de Yodo Radiactivo (RAIU)</h4>
                                                            <ul className="service-list">
                                                                <li>Diagnóstico diferencial de hipertiroidismo</li>
                                                                <li>Mediciones a las 4, 6 y 24 horas</li>
                                                                <li>Preparación: Dieta baja en yodo por 2 semanas</li>
                                                            </ul>
                                                        </div>
                                                        <div className="service-subsection">
                                                            <h4>Gammagrafía de Paratiroides</h4>
                                                            <ul className="service-list">
                                                                <li>Localización de adenomas paratiroideos</li>
                                                                <li>Duración: 3 horas</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {/* ...existing code... (resto del acordeón igual) */}
                                            {/* Sistema Óseo, Sistema Genitourinario, Oncología Nuclear, Servicios Terapéuticos, Tecnología y Equipamiento */}
                                            {/* ...existing code... */}
                                        </div>
                                    </section>
                                    <section className="blog-section blog-info-blocks" style={{display:'flex', flexWrap:'wrap', gap:'32px', marginBottom:0}}>
                                        <div className="blog-info-block" style={{background:'#f8f9fa', borderRadius:'8px', padding:'22px 28px 18px 28px', flex:'1 1 260px', minWidth:'220px', boxShadow:'0 1px 6px rgba(0,0,0,0.04)'}}>
                                            <h3 style={{color:'#1A1A3B', fontSize:'1.15rem', fontWeight:700, marginBottom:'10px'}}>Horarios de Atención</h3>
                                            <ul>
                                                <li><b>Lunes a Viernes:</b> 6:00 AM - 6:00 PM</li>
                                                <li><b>Sábados:</b> 6:00 AM - 12:00 PM</li>
                                                <li><b>Urgencias:</b> 24 horas (previa autorización)</li>
                                            </ul>
                                        </div>
                                        <div className="blog-info-block" style={{background:'#f8f9fa', borderRadius:'8px', padding:'22px 28px 18px 28px', flex:'1 1 260px', minWidth:'220px', boxShadow:'0 1px 6px rgba(0,0,0,0.04)'}}>
                                            <h3 style={{color:'#1A1A3B', fontSize:'1.15rem', fontWeight:700, marginBottom:'10px'}}>Información Importante</h3>
                                            <ul>
                                                <li>Programación de citas: 48 horas de anticipación</li>
                                                <li>Resultados disponibles en 24-48 horas</li>
                                                <li>Seguimiento médico según indicación</li>
                                            </ul>
                                        </div>
                                    </section>
                                    <section className="blog-section blog-final-message" style={{background:'#f4f7ff', borderRadius:'8px', padding:'22px 28px', fontSize:'1.08rem', color:'#1A1A3B', boxShadow:'0 1px 6px rgba(0,0,0,0.04)'}}>
                                        <p>
                                            <i>
                                                En la Clínica de la Costa, la Medicina Nuclear es sinónimo de innovación y compromiso con tu salud. Nuestro equipo médico especializado está listo para ofrecerte la mejor atención con tecnología de vanguardia y los más altos estándares de seguridad radiológica en cada etapa de tu tratamiento.
                                            </i>
                                        </p>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <style jsx>{`
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
                    .service-subsection {
                        margin-bottom: 20px;
                        padding-bottom: 15px;
                        border-bottom: 1px solid #eee;
                    }
                    .service-subsection:last-child {
                        border-bottom: none;
                    }
                    .service-subsection h4 {
                        color: #1A1A3B;
                        font-size: 16px;
                        font-weight: bold;
                        margin-bottom: 10px;
                    }
                `}</style>
            </Layout>
        </>
    );
}
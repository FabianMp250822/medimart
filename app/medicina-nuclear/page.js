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
                <div className="blog-content-wrapper">
                    <div className="blog-header">
                        <img
                            className="blog-header-img"
                            src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-20%20at%209.31.29%20AM.jpeg?alt=media&token=328a483e-a5ad-43da-aba7-397182223a5d"
                            alt="Medicina Nuclear"
                        />
                        <div className="blog-header-content">
                            <h1 className="blog-title">Medicina Nuclear en la Clínica de la Costa</h1>
                            <div className="blog-meta">
                                <span>Por <b>Dr. Juan Pérez</b></span>
                                <span>·</span>
                                <span>Actualizado: Julio 2025</span>
                            </div>
                        </div>
                    </div>
                    <div className="blog-body">
                        <div className="blog-main-img-block">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-20%20at%2010.19.22%20AM.jpeg?alt=media&token=82f15339-9614-4e44-8644-348739824bd2"
                                alt="Atención Hospitalaria"
                            />
                            <div className="blog-main-img-caption">{titulo}</div>
                        </div>
                        <section className="blog-section">
                            <h2>Diagnóstico y Tratamiento Avanzado</h2>
                            <p>
                                La Unidad de Medicina Nuclear de Clínica de la Costa cuenta con tecnología de vanguardia y un equipo médico especializado para brindar servicios diagnósticos y terapéuticos de la más alta calidad. Nuestro compromiso es ofrecer atención integral con los más altos estándares de seguridad radiológica y excelencia médica.
                            </p>
                            <blockquote className="blog-quote">
                                <b>Nuestra Misión:</b> Proporcionar servicios de medicina nuclear de excelencia, utilizando tecnología avanzada para el diagnóstico preciso y tratamiento efectivo de nuestros pacientes, con un enfoque humano y seguro.
                            </blockquote>
                        </section>
                        <section className="blog-section">
                            <h2>Servicios Destacados</h2>
                            <div id="accordion" className="accordion">
                                {/* ...existing code... (acordeón de servicios) */}
                                {/** El acordeón de servicios se mantiene igual, solo cambia el envoltorio visual **/}
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
                                {/* Endocrinología Nuclear, Sistema Óseo, etc. */}
                                {/* ...existing code... */}
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
                        <section className="blog-section blog-info-blocks">
                            <div className="blog-info-block">
                                <h3>Horarios de Atención</h3>
                                <ul>
                                    <li><b>Lunes a Viernes:</b> 6:00 AM - 6:00 PM</li>
                                    <li><b>Sábados:</b> 6:00 AM - 12:00 PM</li>
                                    <li><b>Urgencias:</b> 24 horas (previa autorización)</li>
                                </ul>
                            </div>
                            <div className="blog-info-block">
                                <h3>Información Importante</h3>
                                <ul>
                                    <li>Programación de citas: 48 horas de anticipación</li>
                                    <li>Resultados disponibles en 24-48 horas</li>
                                    <li>Seguimiento médico según indicación</li>
                                </ul>
                            </div>
                        </section>
                        <section className="blog-section blog-final-message">
                            <p>
                                <i>
                                    En la Clínica de la Costa, la Medicina Nuclear es sinónimo de innovación y compromiso con tu salud. Nuestro equipo médico especializado está listo para ofrecerte la mejor atención con tecnología de vanguardia y los más altos estándares de seguridad radiológica en cada etapa de tu tratamiento.
                                </i>
                            </p>
                        </section>
                    </div>
                </div>
                <style jsx>{`
                    .blog-content-wrapper {
                        background: #fff;
                        border-radius: 12px;
                        box-shadow: 0 4px 24px rgba(0,0,0,0.07);
                        margin: 30px auto 30px auto;
                        max-width: 900px;
                        padding: 0 0 40px 0;
                        font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
                    }
                    .blog-header {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        gap: 30px;
                        background: linear-gradient(90deg, #1A1A3B 60%, #007bff 100%);
                        border-radius: 12px 12px 0 0;
                        padding: 32px 32px 24px 32px;
                        color: #fff;
                    }
                    .blog-header-img {
                        width: 180px;
                        height: 180px;
                        object-fit: cover;
                        border-radius: 10px;
                        box-shadow: 0 2px 12px rgba(0,0,0,0.10);
                        border: 4px solid #fff;
                    }
                    .blog-header-content {
                        flex: 1;
                    }
                    .blog-title {
                        font-size: 2.3rem;
                        font-weight: 800;
                        margin-bottom: 10px;
                        letter-spacing: -1px;
                    }
                    .blog-meta {
                        font-size: 1rem;
                        color: #e0e0e0;
                        display: flex;
                        gap: 10px;
                        align-items: center;
                    }
                    .blog-body {
                        padding: 32px 32px 0 32px;
                    }
                    .blog-main-img-block {
                        margin-bottom: 28px;
                        text-align: center;
                    }
                    .blog-main-img-block img {
                        width: 100%;
                        max-width: 600px;
                        height: 340px;
                        object-fit: cover;
                        border-radius: 10px;
                        box-shadow: 0 2px 12px rgba(0,0,0,0.08);
                    }
                    .blog-main-img-caption {
                        color: #1A1A3B;
                        font-size: 1.1rem;
                        margin-top: 8px;
                        font-weight: 600;
                    }
                    .blog-section {
                        margin-bottom: 36px;
                    }
                    .blog-section h2 {
                        font-size: 1.5rem;
                        color: #1A1A3B;
                        font-weight: 700;
                        margin-bottom: 12px;
                        border-left: 4px solid #007bff;
                        padding-left: 12px;
                    }
                    .blog-section ul {
                        padding-left: 22px;
                        margin-bottom: 0;
                    }
                    .blog-section li {
                        margin-bottom: 8px;
                        font-size: 1.05rem;
                    }
                    .blog-quote {
                        background: #f4f7ff;
                        border-left: 4px solid #007bff;
                        padding: 16px 20px;
                        margin: 18px 0;
                        font-size: 1.1rem;
                        color: #1A1A3B;
                        border-radius: 6px;
                        font-style: italic;
                    }
                    .blog-info-blocks {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 32px;
                        margin-bottom: 0;
                    }
                    .blog-info-block {
                        background: #f8f9fa;
                        border-radius: 8px;
                        padding: 22px 28px 18px 28px;
                        flex: 1 1 260px;
                        min-width: 220px;
                        box-shadow: 0 1px 6px rgba(0,0,0,0.04);
                    }
                    .blog-info-block h3 {
                        color: #1A1A3B;
                        font-size: 1.15rem;
                        font-weight: 700;
                        margin-bottom: 10px;
                    }
                    .blog-final-message {
                        background: #f4f7ff;
                        border-radius: 8px;
                        padding: 22px 28px;
                        font-size: 1.08rem;
                        color: #1A1A3B;
                        box-shadow: 0 1px 6px rgba(0,0,0,0.04);
                    }
                    /* Acordeón y listas */
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
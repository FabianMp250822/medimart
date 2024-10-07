'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"

export default function Service() {
    const services = [
        {
            title: 'Diagnóstico y Terapia Personalizados',
            link: 'service-details-1',
            description: 'Obtén un diagnóstico preciso y un plan de tratamiento adaptado a tus necesidades únicas.',
        },
        {
            title: 'Asistencia Médica 24/7',
            link: 'service-details-2',
            description: 'Estamos aquí para ti en cualquier momento, brindando atención médica de calidad cuando más lo necesitas.',
        },
        {
            title: 'Especialistas en Cardiología Pediátrica',
            link: 'service-details-3',
            description: 'Cuidamos el corazón de tus pequeños con los mejores especialistas en cardiología infantil.',
        },
        {
            title: 'Chequeos Médicos Preventivos',
            link: 'service-details-4',
            description: 'Mantente saludable con nuestros completos chequeos preventivos y detección temprana de enfermedades.',
        },
        {
            title: 'Cirugía de Vanguardia',
            link: 'service-details-5',
            description: 'Contamos con cirujanos expertos y tecnología avanzada para garantizar tu recuperación.',
        },
        {
            title: 'Cirugía Ambulatoria Rápida',
            link: 'service-details-6',
            description: 'Procedimientos quirúrgicos eficaces que te permiten regresar a casa el mismo día.',
        },
        {
            title: 'Cirugía Plástica y Reconstructiva',
            link: 'service-details-7',
            description: 'Recupera tu confianza y bienestar con nuestros tratamientos estéticos y reconstructivos.',
        },
        {
            title: 'Atención Médica General',
            link: 'service-details-8',
            description: 'Consulta a nuestros médicos para cualquier necesidad de salud que tengas.',
        },
        {
            title: 'Cuidados Intensivos Especializados',
            link: 'service-details-9',
            description: 'Brindamos atención crítica con personal altamente capacitado y tecnología de punta.',
        },
        {
            title: 'Esterilización y Transporte Seguro',
            link: 'service-details-10',
            description: 'Garantizamos tu seguridad con protocolos estrictos de esterilización y transporte médico.',
        },
        {
            title: 'Equipos Cardiovasculares de Última Generación',
            link: 'service-details-11',
            description: 'Tecnología avanzada para el diagnóstico y tratamiento de enfermedades cardíacas.',
        },
        {
            title: 'Gastroenterología Clínica Integral',
            link: 'service-details-12',
            description: 'Cuidamos tu sistema digestivo con especialistas comprometidos con tu bienestar.',
        },
        {
            title: 'Hospitalización Confortable',
            link: 'service-details-13',
            description: 'Habitaciones acogedoras y atención personalizada para una estancia agradable.',
        },
        {
            title: 'Cuidado Oncológico Integral',
            link: 'service-details-14',
            description: 'Acompañamos tu lucha contra el cáncer con tratamientos avanzados y apoyo continuo.',
        },
        {
            title: 'Neurología y Neurofisiología Especializadas',
            link: 'service-details-15',
            description: 'Abordamos trastornos neurológicos con precisión y cuidado excepcional.',
        },
        {
            title: 'Salud Pulmonar Óptima',
            link: 'service-details-16',
            description: 'Nuestros neumólogos te ayudan a respirar mejor y vivir plenamente.',
        },
        {
            title: 'Programa Integral contra la Tuberculosis',
            link: 'service-details-17',
            description: 'Tratamiento y seguimiento personalizado para combatir la tuberculosis.',
        },
        {
            title: 'Especialistas en Nefrología',
            link: 'service-details-18',
            description: 'Cuidamos de tus riñones con tratamientos especializados y prevención.',
        },
        {
            title: 'Vacunas y Protección Específica',
            link: 'service-details-19',
            description: 'Mantente protegido con nuestro amplio programa de inmunizaciones.',
        },
        {
            title: 'Urología Avanzada',
            link: 'service-details-20',
            description: 'Soluciones efectivas para tus necesidades urológicas con un enfoque sensible.',
        },
        {
            title: 'Atención al Dolor Torácico',
            link: 'service-details-21',
            description: 'Diagnóstico rápido y tratamiento eficaz para aliviar tu dolor y preocupación.',
        },
        {
            title: 'Servicio de PET-CT Avanzado',
            link: 'service-details-22',
            description: 'Tecnología de imagen avanzada para diagnósticos precisos y tratamientos efectivos.',
        },
        {
            title: 'Radioterapia de Precisión',
            link: 'service-details-23',
            description: 'Tratamientos radioterapéuticos exactos para combatir el cáncer de manera efectiva.',
        },
        {
            title: 'Urgencias Médicas Inmediatas',
            link: 'service-details-24',
            description: 'Atención de emergencia disponible las 24 horas para situaciones críticas.',
        },
        {
            title: 'Trasplante Renal y Pancreático',
            link: 'service-details-25',
            description: 'Programas de trasplante con altos estándares para mejorar tu calidad de vida.',
        },
        {
            title: 'Tratamiento para Insuficiencia Cardíaca',
            link: 'service-details-26',
            description: 'Opciones avanzadas para el manejo y recuperación de la función cardíaca.',
        },
        {
            title: 'Trasplante Intestinal Innovador',
            link: 'service-details-27',
            description: 'Procedimientos pioneros para restaurar tu salud intestinal.',
        },
        {
            title: 'Trasplante de Riñón e Hígado',
            link: 'service-details-28',
            description: 'Expertos en trasplantes multiorgánicos para una nueva oportunidad de vida.',
        },
    ];

    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Nuestros Servicios">
                <section className="service-section sec-pad">
                    <div className="auto-container">
                        <div className="sec-title mb_50 centred">
                            <span className="sub-title">Nuestros Servicios</span>
                            <h2>Atención Integral <br />Cuidando de Ti Siempre</h2>
                        </div>
                        <div className="row clearfix">
                            {services.map((service, index) => (
                                <div key={index} className="col-lg-4 col-md-6 col-sm-12 service-block">
                                    <div className="service-block-one wow fadeInUp animated" data-wow-delay={`${(index % 6) * 100}ms`} data-wow-duration="1500ms">
                                        <div className="inner-box">
                                            <div className="image-box">
                                                <figure className="image">
                                                    <Link href={service.link}>
                                                        <img src={`https://picsum.photos/300/200?random=${index + 1}`} alt={service.title} />
                                                    </Link>
                                                </figure>
                                                <div className="icon-box"><i className={`icon-${index + 1}`}></i></div>
                                            </div>
                                            <div className="lower-content">
                                                <h3><Link href={service.link}>{service.title}</Link></h3>
                                                <p>{service.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

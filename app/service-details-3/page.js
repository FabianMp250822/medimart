'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from 'react'

export default function Service() {
    const [isActive, setIsActive] = useState({
        status: false,
        key: 1,
    })

    const handleToggle = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            })
        } else {
            setIsActive({
                status: true,
                key,
            })
        }
    }

    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Nuestra Clínica">
                <div className="service-details pt_120 pb_110">
                    <div className="container">
                        {/* Header section */}
                        <div
                            className="d-flex flex-column flex-md-row align-items-center p-4"
                            style={{
                                backgroundColor: '#1A1A3B', // color oscuro para el fondo del encabezado
                                padding: '20px',
                                borderRadius: '8px',
                                marginBottom: '20px',
                            }}
                        >
                            <img src="https://picsum.photos/400/300" alt="Imagen de Servicio" style={{ borderRadius: '8px', marginRight: '20px' }} />
                            <div className="flex-grow-1">
                                <Link href="/servicios" legacyBehavior>
                                    <a className="text-decoration-none mb-3 d-inline-flex align-items-center" style={{ fontSize: '16px', color: '#F0E7D8' }}>
                                        <i className="fas fa-arrow-left mr-2"></i> Todos los Servicios
                                    </a>
                                </Link>
                                <h1 style={{ color: '#F0E7D8', fontSize: '32px', margin: '20px 0' }}>Medicina Física y Rehabilitación - Fisiatría</h1>
                                <div className="d-flex mb-4" style={{ gap: '10px' }}>
                                    <a
                                        href="https://valledellili.org/atencion-al-paciente/pide-una-cita/"
                                        className="d-flex align-items-center"
                                        style={{
                                            backgroundColor: '#2C2C5B', // tono oscuro para los botones
                                            padding: '10px 20px',
                                            borderRadius: '8px',
                                            color: '#F0E7D8',
                                            fontWeight: 'bold',
                                            textDecoration: 'none',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            border: 'none',
                                        }}
                                    >
                                        <i className="fas fa-calendar-alt"></i> SOLICITAR CITA
                                    </a>
                                    <div
                                        className="d-flex align-items-center"
                                        style={{
                                            backgroundColor: '#2C2C5B', // tono oscuro para el botón de contacto
                                            padding: '10px 20px',
                                            borderRadius: '8px',
                                            color: '#F0E7D8',
                                            fontWeight: 'bold',
                                            display: 'inline-flex',
                                            gap: '10px',
                                        }}
                                    >
                                        <i className="fas fa-phone"></i> (602) 331 9090 EXT: 3234, 7033
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="pt-5">
                            <div className="d-flex justify-content-between border-bottom pb-4" style={{ gap: '20px' }}>
                                <div className="col-12 col-md-6 px-3">
                                    <p className="text-muted text-uppercase mb-2" style={{ color: '#F0E7D8' }}>Dirigido a:</p>
                                    <span style={{ fontSize: '16px', color: '#3B3B3B' }}> {/* Ajustado a color negro */}
                                        Toda población, desde niños, hasta adultos mayores o personas con alguna discapacidad (temporal o permanente).
                                    </span>
                                </div>
                                <div className="col-12 col-md-6 px-3">
                                    <p className="text-muted text-uppercase mb-2" style={{ color: '#F0E7D8' }}>Disponible en las sedes:</p>
                                    <div className="d-flex" style={{ gap: '10px' }}>
                                        <span style={{ padding: '5px 15px', borderRadius: '20px', backgroundColor: '#3B3B3B', color: '#F0E7D8' }}>Principal</span>
                                        <span style={{ padding: '5px 15px', borderRadius: '20px', backgroundColor: '#3B3B3B', color: '#F0E7D8' }}>Av-Estación</span>
                                        <span style={{ padding: '5px 15px', borderRadius: '20px', backgroundColor: '#3B3B3B', color: '#F0E7D8' }}>Tequendama</span>
                                    </div>
                                </div>
                            </div>

                            {/* Accordion section */}
                            <div className="accordion mt-4" id="accordionExample" style={{ width: '100%' }}>
                                {[{
                                    key: 1,
                                    title: "Nuestro Equipo",
                                    content: "La Unidad de Rehabilitación Física cuenta con un equipo excepcional de 42 profesionales asistenciales..."
                                }, {
                                    key: 2,
                                    title: "Factores Diferenciales",
                                    content: "El Servicio de Rehabilitación de la Fundación Valle del Lili se destaca como pionero en la región..."
                                }, {
                                    key: 3,
                                    title: "Sección Educativa",
                                    content: "Explore una abundancia de información sobre ejercicios y planes de rehabilitación en nuestra sección educativa..."
                                }].map(({ key, title, content }) => (
                                    <div className="card" style={{ border: 'none', borderRadius: '8px', marginBottom: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} key={key}>
                                        <div className="card-header" id={`heading${key}`} style={{ backgroundColor: '#2C2C5B', padding: '0', borderRadius: '8px' }}>
                                            <h5 className="mb-0">
                                                <button
                                                    className="btn btn-link"
                                                    onClick={() => handleToggle(key)}
                                                    style={{
                                                        color: isActive.key === key ? '#F0E7D8' : '#F0E7D8CC',
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
                                                    <i className={`fas fa-chevron-${isActive.key === key ? 'up' : 'down'}`} style={{ float: 'right' }}></i>
                                                </button>
                                            </h5>
                                        </div>
                                        <div id={`collapse${key}`} className={`collapse ${isActive.key === key ? 'show' : ''}`} aria-labelledby={`heading${key}`} data-parent="#accordionExample">
                                            <div className="card-body" style={{ padding: '20px', color: '#3B3B3B', backgroundColor: '#FFFFFF', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}>
                                                <p>{content}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

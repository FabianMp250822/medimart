'use client'
import { useEffect, useState } from 'react'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import TeamSection from "./TeamSection"
import ValoresCorporativos from "./ValoresCorporativos"
import Process from "@/components/sections/home1/Process"

import './ValoresCorporativos.css'; // Archivo CSS separado

export default function Home() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
          import('wowjs').then((module) => {
            const WOW = module.default
            const wow = new WOW({ live: false })
            wow.init()
          })
        }
      }, [])
      

    const [isOpen, setOpen] = useState(false)
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
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Sobre Nosotros">
                {/* Bienvenida */}
                <section className="welcome-section pt_120 pb_120">
                    <div className="pattern-layer">
                        <div className="pattern-1 rotate-me" style={{ backgroundImage: "url(/assets/images/shape/shape-8.png)" }}></div>
                        <div className="pattern-2 rotate-me" style={{ backgroundImage: "url(/assets/images/shape/shape-9.png)" }}></div>
                        <div className="pattern-3" style={{ backgroundImage: "url(/assets/images/shape/shape-11.png)" }}></div>
                        <div className="pattern-4" style={{ backgroundImage: "url(/assets/images/shape/shape-35.png)" }}></div>
                    </div>
                    <div className="auto-container">
                        <div className="sec-title text-center mb_50 wow fadeInUp" data-wow-delay="0ms" data-wow-duration="1500ms">
                            <h2>Bienvenidos a <span className="highlight">Clínica de la Costa</span></h2>
                        </div>
                        <div className="row clearfix">
                            {/* Columna de Imagen */}
                            <div className="col-lg-6 col-md-12 col-sm-12 image-column">
                                <div className="image_block_one wow fadeInLeft" data-wow-delay="0ms" data-wow-duration="1500ms">
                                    <div className="image-box">
                                        <div className="shape float-bob-x" style={{ backgroundImage: "url(/assets/images/shape/shape-7.png)" }}></div>
                                        <div className="image-shape" style={{ backgroundImage: "url(/assets/images/shape/shape-26.png)" }}></div>
                                        <figure className="image-2 hover-zoom">
                                            <img src="/assets/images/resource/servicios.jpg" alt="Clínica de la Costa" />
                                        </figure>
                                        <div className="icon-one"><i className="icon-13"></i></div>
                                        <div className="icon-two"><i className="icon-14"></i></div>
                                        <div className="text-box">
                                            <h3>Clínica de la Costa</h3>
                                            <span>Profesionales a tu servicio</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Columna de Contenido */}
                            <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                                <div className="content_block_one wow fadeInRight" data-wow-delay="0ms" data-wow-duration="1500ms">
                                    <div className="content-box ml_30">
                                        {/* ¿Quiénes somos? */}
                                        <div className="sec-title mb_30">
                                            <span className="sub-title">Sobre Nosotros</span>
                                            <h2>¿Quiénes somos?</h2>
                                        </div>
                                        <div className="text-box mb_30">
                                            <p>
                                                La Clínica de la Costa Ltda. se encuentra ubicada en el tradicional barrio Alto Prado, el sector de salud más conocido de la Región Caribe Colombiana. Contamos con amplios parqueaderos y estamos rodeados de importantes vías de acceso equidistantes a los mejores hoteles y centros comerciales de la ciudad.
                                            </p>
                                        </div>
                                        {/* Misión */}
                                        <div className="sec-title mb_30">
                                            <h2>Misión</h2>
                                        </div>
                                        <div className="text-box mb_30">
                                            <p>
                                                En la Clínica de la Costa trabajamos con el corazón para garantizar la excelencia y seguridad en todo lo que hacemos, promoviendo el desarrollo docente e investigativo.
                                            </p>
                                        </div>
                                        {/* Visión */}
                                        <div className="sec-title mb_30">
                                            <h2>Visión</h2>
                                        </div>
                                        <div className="text-box">
                                            <p>
                                                Ser una institución líder en la prestación de salud en la región Caribe, reconocida por sus altos estándares de calidad, enfocada en la atención integral de sus usuarios, basados en la capacidad de innovación y la generación de conocimiento.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* about-section end */}

                {/* Valores Corporativos */}
                <ValoresCorporativos />

                {/* Política de Calidad */}
               {/* Políticas en Tarjetas */}
               <section className="policy-section pt_120 pb_120">
                    <div className="auto-container">
                        <div className="row">
                            {/* Tarjeta de Política de Calidad */}
                            <div className="col-lg-6 col-md-12 wow fadeInUp" data-wow-delay="0ms" data-wow-duration="1500ms">
                                <div className="policy-card">
                                    <div className="sec-title mb_30">
                                        <h2>Política de Calidad</h2>
                                    </div>
                                    <div className="text-box">
                                        <p>
                                            Brindamos servicios de salud oportunos y confiables en un ambiente confortable, contamos con un personal competente y tecnología de punta. Incentivamos el desarrollo docente e investigativo y mejoramos continuamente nuestros procesos.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* Tarjeta de Política de Seguridad del Paciente */}
                            <div className="col-lg-6 col-md-12 wow fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
                                <div className="policy-card">
                                    <div className="sec-title mb_30">
                                        <h2>Política de Seguridad del Paciente</h2>
                                    </div>
                                    <div className="text-box">
                                        <p>
                                            Brindar seguridad a pacientes, visitantes y colaboradores entendiendo la seguridad como un componente esencial en la calidad. Queremos ser reconocidos como una institución segura y altamente confiable donde se garantiza un adecuado ambiente físico, personal idóneo y excelencia en los procesos de atención tendientes a la prevención y detección oportuna de riesgos que puedan ocasionar daños o lesiones a nuestros usuarios.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Process Section */}
                <Process />

                {/* Team Section */}
                <TeamSection />

                {/* Subscribe Section */}
                {/* <section className="subscribe-section bg-color-1">
                    <div className="auto-container">
                        <div className="inner-container">
                            <div className="row align-items-center">
                                <div className="col-lg-6 col-md-12 col-sm-12 text-column">
                                    <div className="text-box wow fadeInLeft" data-wow-delay="0ms" data-wow-duration="1500ms">
                                        <h2><span>Suscríbete</span> para recibir actualizaciones exclusivas!</h2>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12 form-column">
                                    <div className="form-inner wow fadeInRight" data-wow-delay="0ms" data-wow-duration="1500ms">
                                        <form method="post" action="contact">
                                            <div className="form-group">
                                                <input type="email" name="email" placeholder="Ingresa tu dirección de correo" required />
                                                <button type="submit" className="theme-btn btn-one hover-slide"><span>Suscribirse Ahora</span></button>
                                            </div>
                                            <div className="form-group">
                                                <div className="check-box">
                                                    <input className="check" type="checkbox" id="checkbox1" />
                                                    <label htmlFor="checkbox1">Estoy de acuerdo con la <Link href="/">Política de Privacidad.</Link></label>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
                {/* subscribe-section end */}
            </Layout>
        </>
    )
}

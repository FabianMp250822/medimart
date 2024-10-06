'use client'
import Layout from "@/components/layout/Layout"
import TestimonialSlider3 from '@/components/slider/TestmonialSlider3'
import Link from "next/link"
import { useState } from 'react'
import TeamSection from "./TeamSection"
import ValoresCorporativos from "./ValoresCorporativos" 
export default function Home() {
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
                {/* about-section */}
                <section className="about-style-two pt_120 pb_120">
                    <div className="pattern-layer">
                        <div className="pattern-1 rotate-me" style={{ backgroundImage: "url(assets/images/shape/shape-8.png)" }}></div>
                        <div className="pattern-2 rotate-me" style={{ backgroundImage: "url(assets/images/shape/shape-9.png)" }}></div>
                        <div className="pattern-3" style={{ backgroundImage: "url(assets/images/shape/shape-11.png)" }}></div>
                        <div className="pattern-4" style={{ backgroundImage: "url(assets/images/shape/shape-35.png)" }}></div>
                    </div>
                    <div className="auto-container">
                        <div className="row clearfix">
                            {/* Columna de Imagen */}
                            <div className="col-lg-6 col-md-12 col-sm-12 image-column">
                                <div className="image_block_one">
                                    <div className="image-box">
                                        <div className="shape float-bob-x" style={{ backgroundImage: "url(assets/images/shape/shape-7.png)" }}></div>
                                        <div className="image-shape" style={{ backgroundImage: "url(assets/images/shape/shape-26.png)" }}></div>
                                        <figure className="image-2">
                                            <img src="assets/images/resource/servicios.jpg" alt="" />
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
                                <div className="content_block_one">
                                    <div className="content-box ml_30">
                                        <div className="sec-title mb_15">
                                            <span className="sub-title">Sobre Nosotros</span>
                                            <h2>Servicios Médicos y Diagnósticos</h2>
                                        </div>
                                        <div className="text-box mb_40">
                                            <p>En la Clínica de la Costa, nos esforzamos por brindar atención médica de alta calidad, combinando experiencia y tecnología avanzada para cuidar de tu salud.</p>
                                            {/* Servicios en dos columnas */}
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <ul className="list-style-one">
                                                        <li>Atención de Urgencias 24/7</li>
                                                        <li>Consultas Médicas Especializadas</li>
                                                        <li>Cirugías y Procedimientos Quirúrgicos</li>
                                                        <li>Unidad de Cuidados Intensivos</li>
                                                        <li>Servicio de Maternidad y Pediatría</li>
                                                        <li>Oncología y Radioterapia</li>
                                                        <li>Imagenología y Diagnóstico por Imágenes</li>
                                                        
                                                    </ul>
                                                </div>
                                                <div className="col-md-6">
                                                    <ul className="list-style-one">
                                                        <li>Rehabilitación y Terapia Física</li>
                                                        <li>Farmacia Hospitalaria</li>
                                                        <li>Cardiología</li>
                                                        <li>Neurología</li>
                                                        <li>Ginecología y Obstetricia</li>
                                                        <li>Endocrinología</li>
                                                        <li>Dermatología</li>
                                                        <li>Laboratorio Clínico</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="lower-box">
                                            <div className="experience-box">
                                                <div className="icon-box"><i className="icon-29"></i></div>
                                                <h3>Más de 35 Años</h3>
                                                <span className="designation">De experiencia médica</span>
                                            </div>
                                            <figure className="author-thumb">
                                                <img src="assets/images/resource/contacto.jpg" alt="" />
                                            </figure>
                                            <div className="signature">
                                                <img src="assets/images/icons/signature-1.png" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            
                        </div>
                    </div>
                </section>
                {/* about-section end */}
                <ValoresCorporativos />
                {/* process-section */}
                <section className="process-section sec-pad bg-color-1">
                    <div className="shape">
                        <div className="shape-1 float-bob-x" style={{ backgroundImage: "url(assets/images/shape/shape-20.png)" }}></div>
                        <div className="shape-2 float-bob-y" style={{ backgroundImage: "url(assets/images/shape/shape-15.png)" }}></div>
                        <div className="shape-3"></div>
                    </div>
                    <div className="auto-container">
                        <div className="sec-title mb_50 centred">
                            <span className="sub-title">Proceso</span>
                            <h2>Cómo te ayudamos a mantenerte saludable</h2>
                        </div>
                        <div className="inner-container">
                            <div className="arrow-shape" style={{ backgroundImage: "url(assets/images/shape/shape-18.png)" }}></div>
                            <div className="processing-block-one wow fadeInLeft animated" data-wow-delay="00ms" data-wow-duration="1500ms">
                                <div className="inner-box">
                                    <span className="count-text">01</span>
                                    <figure className="image-box"><img src="assets/images/resource/process-1.jpg" alt="" /></figure>
                                    <div className="lower-content">
                                        <h3>Agenda tu Cita</h3>
                                        <p>Comunícate con nosotros para programar una cita con nuestros especialistas.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="processing-block-one wow fadeInLeft animated" data-wow-delay="300ms" data-wow-duration="1500ms">
                                <div className="inner-box">
                                    <span className="count-text">02</span>
                                    <figure className="image-box"><img src="assets/images/resource/process-2.jpg" alt="" /></figure>
                                    <div className="lower-content">
                                        <h3>Recibe Atención Médica</h3>
                                        <p>Nuestro equipo te brindará una atención personalizada y de calidad.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="processing-block-one wow fadeInLeft animated" data-wow-delay="600ms" data-wow-duration="1500ms">
                                <div className="inner-box">
                                    <span className="count-text">03</span>
                                    <figure className="image-box"><img src="assets/images/resource/process-3.jpg" alt="" /></figure>
                                    <div className="lower-content">
                                        <h3>Mejora tu Salud</h3>
                                        <p>Con nuestro seguimiento, alcanzarás una mejor calidad de vida.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* process-section end */}

                {/* testimonial-section */}
                <section className="testimonial-style-two p_relative">
                    <div className="pattern-layer" style={{ backgroundImage: 'url(assets/images/shape/shape-19.png)' }}></div>
                    <div className="auto-container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-12 col-sm-12 thumb-column">
                                <div className="thumb-box">
                                    <div className="thumb thumb-1"><img src="assets/images/resource/thumb-1.png" alt="" /></div>
                                    <div className="thumb thumb-2"><img src="assets/images/resource/thumb-2.png" alt="" /></div>
                                    <div className="thumb thumb-3"><img src="assets/images/resource/thumb-3.png" alt="" /></div>
                                    <div className="thumb thumb-4"><img src="assets/images/resource/thumb-4.png" alt="" /></div>
                                    <div className="thumb thumb-5"><img src="assets/images/resource/thumb-5.png" alt="" /></div>
                                    <div className="thumb thumb-6"><img src="assets/images/resource/thumb-6.png" alt="" /></div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                                <div className="content-box">
                                    <div className="sec-title mb_50">
                                        <span className="sub-title">Testimonios</span>
                                        <h2>Lo que nuestros pacientes dicen sobre nosotros</h2>
                                    </div>
                                    <div className="content-box">
                                        {/*Theme Carousel*/}
                                        <TestimonialSlider3 />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* testimonial-section end */}

                {/* team-section-style-two */}
                 {/* Importación del nuevo componente TeamSection */}
                 <TeamSection />
                {/* team-section-style-two end */}

                {/* subscribe-section */}
                <section className="subscribe-section bg-color-1">
                    <div className="auto-container">
                        <div className="inner-container">
                            <div className="row align-items-center">
                                <div className="col-lg-6 col-md-12 col-sm-12 text-column">
                                    <div className="text-box">
                                        <h2><span>Suscríbete</span> para recibir actualizaciones exclusivas!</h2>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12 form-column">
                                    <div className="form-inner">
                                        <form method="post" action="contact">
                                            <div className="form-group">
                                                <input type="email" name="email" placeholder="Ingresa tu dirección de correo" required />
                                                <button type="submit" className="theme-btn btn-one"><span>Suscribirse Ahora</span></button>
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
                </section>
                {/* subscribe-section end */}
            </Layout>
        </>
    )
}



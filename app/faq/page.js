'use client'
import Layout from "@/components/layout/Layout"
import { useState } from 'react'
import Link from "next/link"

export default function WhyChooseUs() {
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
        <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Preguntas Frecuentes">        

            {/* faq */}
            <section className="faq-page-section sec-pad">
                    <div className="auto-container">
                        <div className="row clearfix">
                            <div className="col-lg-6 col-md-12 col-sm-12 accordion-column">
                                <div className="content-box">
                                <ul className="accordion-box">
                                        {/*Accordion Block*/}
                                        <li className="accordion block">
                                            <div className={isActive.key == 1 ? "acc-btn active" : "acc-btn"} onClick={() => handleToggle(1)}>
                                            <div className="icon-box"><i className="icon-34"></i></div>
                                                <h4>¿Puedo recibir mis resultados por correo o teléfono?</h4>
                                            </div>
                                            <div className={isActive.key == 1 ? "acc-content current" : "acc-content"}>
                                                <div className="content">
                                                    <div className="text"><p>Sí, ofrecemos la opción de enviar los resultados por correo electrónico. Sin embargo, no proporcionamos resultados médicos por teléfono por motivos de seguridad.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        {/*Accordion Block*/}
                                        <li className="accordion block">
                                            <div className={isActive.key == 2 ? "acc-btn active" : "acc-btn"} onClick={() => handleToggle(2)}>
                                                <div className="icon-box"><i className="icon-34"></i></div>
                                                <h4>¿Puedo agendar una cita directamente por teléfono?</h4></div>
                                            <div className={isActive.key == 2 ? "acc-content current" : "acc-content"}>
                                                <div className="content">
                                                    <div className="text"><p>Sí, puedes agendar citas llamando a nuestras líneas de atención al paciente, disponibles las 24 horas del día, los 7 días de la semana.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        {/*Accordion Block*/}
                                        <li className="accordion block">
                                            <div className={isActive.key == 3 ? "acc-btn active" : "acc-btn"} onClick={() => handleToggle(3)}>
                                                <div className="icon-box"><i className="icon-34"></i></div>
                                                <h4>¿Dan asesoría médica por teléfono?</h4></div>
                                            <div className={isActive.key == 3 ? "acc-content current" : "acc-content"}>
                                                <div className="content">
                                                    <div className="text"><p>Por seguridad y calidad en la atención, no ofrecemos asesoría médica por teléfono, pero puedes recibir orientación sobre los servicios.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        {/*Accordion Block*/}
                                        <li className="accordion block">
                                            <div className={isActive.key == 4 ? "acc-btn active" : "acc-btn"} onClick={() => handleToggle(4)}>
                                            <div className="icon-box"><i className="icon-34"></i></div>
                                                <h4>¿Cómo solicito mi historia clínica?</h4>
                                            </div>
                                            <div className={isActive.key == 4 ? "acc-content current" : "acc-content"}>
                                                <div className="content">
                                                    <div className="text"><p>Puedes solicitar tu historia clínica a través de nuestra plataforma en línea o presentarte en las oficinas con tu documento de identidad.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                                <div className="content-box">
                                <ul className="accordion-box">
                                        {/*Accordion Block*/}
                                        <li className="accordion block">
                                            <div className={isActive.key == 5 ? "acc-btn active" : "acc-btn"} onClick={() => handleToggle(5)}>
                                                <div className="icon-box"><i className="icon-34"></i></div>
                                                <h4>¿Puedo consultar mis resultados en línea?</h4></div>
                                            <div className={isActive.key == 5 ? "acc-content current" : "acc-content"}>
                                                <div className="content">
                                                    <div className="text"><p>Sí, puedes consultar los resultados de tus exámenes de laboratorio en nuestra plataforma en línea.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        {/*Accordion Block*/}
                                        <li className="accordion block">
                                            <div className={isActive.key == 6 ? "acc-btn active" : "acc-btn"} onClick={() => handleToggle(6)}>
                                                <div className="icon-box"><i className="icon-34"></i></div>
                                                <h4>¿Qué documentos necesito para solicitar una cita?</h4></div>
                                            <div className={isActive.key == 6 ? "acc-content current" : "acc-content"}>
                                                <div className="content">
                                                    <div className="text"><p>Debes presentar tu documento de identidad y la orden médica en caso de consultas especializadas.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        {/*Accordion Block*/}
                                        <li className="accordion block">
                                            <div className={isActive.key == 7 ? "acc-btn active" : "acc-btn"} onClick={() => handleToggle(7)}>
                                            <div className="icon-box"><i className="icon-34"></i></div>
                                                <h4>¿Cómo cancelo o modifico una cita?</h4>
                                            </div>
                                            <div className={isActive.key == 7 ? "acc-content current" : "acc-content"}>
                                                <div className="content">
                                                    <div className="text"><p>Puedes cancelar o modificar tu cita comunicándote a nuestras líneas de atención o ingresando a nuestra plataforma en línea.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        {/*Accordion Block*/}
                                        <li className="accordion block">
                                            <div className={isActive.key == 8 ? "acc-btn active" : "acc-btn"} onClick={() => handleToggle(8)}>
                                            <div className="icon-box"><i className="icon-34"></i></div>
                                                <h4>¿Tienen convenios con otras aseguradoras?</h4>
                                            </div>
                                            <div className={isActive.key == 8 ? "acc-content current" : "acc-content"}>
                                                <div className="content">
                                                    <div className="text"><p>Sí, trabajamos con varias aseguradoras y entidades de salud en Colombia. Puedes verificar los detalles con nuestro equipo de atención al cliente.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            {/* faq end */} 

                 {/* subscibe */}
                 <section className="subscribe-section">
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
                  {/* subscibe end */}
                </Layout>   
        </>
    )
}
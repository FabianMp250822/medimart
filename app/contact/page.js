import Layout from "@/components/layout/Layout"
import Link from "next/link"

export default function Home() {

    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Contacto">
                <div>
                    {/* Sección de Información de Contacto */}
                    <section className="contact-info-section pt_120">
                        <div className="auto-container">
                            <div className="row clearfix">
                                {/* Atención al Usuario */}
                                <div className="col-lg-4 col-md-6 col-sm-12 info-column">
                                    <div className="info-block-one">
                                        <h3>Atención al Usuario</h3>
                                        <div className="inner-box">
                                            <div className="icon-box"><i className="icon-2"></i></div>
                                            <p>
                                                Teléfono: <br />
                                                <Link href="tel:+576053369973">+57 (605) 3369973</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Call Center */}
                                <div className="col-lg-4 col-md-6 col-sm-12 info-column">
                                    <div className="info-block-one">
                                        <h3>Call Center</h3>
                                        <div className="inner-box">
                                            <div className="icon-box"><i className="icon-26"></i></div>
                                            <p>
                                                Teléfono: <br />
                                                <Link href="tel:+576053369999">+57 (605) 3369999 Ext. 0</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Admisiones y Contrataciones */}
                                <div className="col-lg-4 col-md-6 col-sm-12 info-column">
                                    <div className="info-block-one">
                                        <h3>Admisiones y Contrataciones</h3>
                                        <div className="inner-box">
                                            <div className="icon-box"><img src="assets/images/icons/icon-2.png" alt="" /></div>
                                            <p>
                                                Admisiones: <Link href="tel:+576053369901">+57 (605) 3369901</Link><br />
                                                Contrataciones: <Link href="tel:+576053369922">+57 (605) 3369922</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Información de Sede 3 */}
                            <div className="row clearfix">
                                <div className="col-lg-6 col-md-6 col-sm-12 info-column">
                                    <div className="info-block-one">
                                        <h3>Consulta Externa Sede 3</h3>
                                        <div className="inner-box">
                                            <div className="icon-box"><img src="assets/images/icons/icon-2.png" alt="" /></div>
                                            <p>
                                                Dirección: Cra. 50 #80-149<br />
                                                Teléfonos Directos: <Link href="tel:+576053369907">+57 (605) 3369907</Link> - <Link href="tel:+576053369908">+57 (605) 3369908</Link><br />
                                                Líneas de WhatsApp: <Link href="https://wa.me/573054704510">+57 3054704510</Link> – <Link href="https://wa.me/57321150179">+57 321150179</Link><br />
                                                Correo electrónico: <Link href="mailto:consultaexterna@clinicadelacosta.co">consultaexterna@clinicadelacosta.co</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Información de Sede 4 */}
                                <div className="col-lg-6 col-md-6 col-sm-12 info-column">
                                    <div className="info-block-one">
                                        <h3>Consulta Externa Sede 4</h3>
                                        <div className="inner-box">
                                            <div className="icon-box"><img src="assets/images/icons/icon-2.png" alt="" /></div>
                                            <p>
                                                Dirección: Cra. 50 #80-144<br />
                                                Teléfonos Directos: <Link href="tel:+576053369966">+57 (605) 3369966</Link> - <Link href="tel:+576053369965">+57 (605) 3369965</Link><br />
                                                Líneas de WhatsApp: <Link href="https://wa.me/573017996077">+57 3017996077</Link> – <Link href="https://wa.me/573108293570">+57 3108293570</Link><br />
                                                Correo electrónico: <Link href="mailto:resonancia@clinicadelacosta.co">resonancia@clinicadelacosta.co</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Información de Radioterapia */}
                            <div className="row clearfix">
                                <div className="col-lg-12 col-md-12 col-sm-12 info-column">
                                    <div className="info-block-one">
                                        <h3>Radioterapia</h3>
                                        <div className="inner-box">
                                            <div className="icon-box"><i className="icon-2"></i></div>
                                            <p>
                                                Teléfono: <Link href="tel:+576053369999">+57 (605) 3369999 Ext:141</Link><br />
                                                Línea de WhatsApp: <Link href="https://wa.me/573124867987">+57 3124867987</Link><br />
                                                Correo electrónico: <Link href="mailto:radioterapia@clinicadelacosta.co">radioterapia@clinicadelacosta.co</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>
                    {/* Fin de la Sección de Información de Contacto */}

                    {/* Sección de Formulario de Contacto */}
                    <section className="contact-style-three pt_90 pb_120">
                        <div className="auto-container">
                            <div className="row clearfix">
                                <div className="col-lg-8 col-md-12 col-sm-12 form-column">
                                    <div className="form-inner mr_40">
                                        <div className="sec-title mb_50">
                                            <h2>Enviar un Mensaje</h2>
                                        </div>
                                        <form method="post" action="sendemail.php" id="contact-form" className="default-form">
                                            <div className="row clearfix">
                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                    <input type="text" name="username" placeholder="Nombre" required />
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                    <input type="text" name="lname" placeholder="Apellido" required />
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                    <input type="email" name="email" placeholder="Correo Electrónico" required />
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                    <input type="text" name="phone" required placeholder="Teléfono" />
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                    <input type="text" name="subject" required placeholder="Asunto" />
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                    <textarea name="message" placeholder="Mensaje"></textarea>
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
                                                    <button className="theme-btn btn-one" type="submit" name="submit-form"><span>Enviar Mensaje</span></button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-12 col-sm-12 image-column">
                                    <figure className="image-box"><img src="assets/images/resource/contact-1.jpg" alt="" /></figure>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Fin de la Sección de Formulario de Contacto */}

                    {/* Sección de Google Maps */}
                    <section className="google-map-section">
                        {/* Contenedor del Mapa */}
                        <div className="map-inner">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.483487879024!2d-74.81575092407982!3d11.00230518916052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef42da7bed68429%3A0xd68e8bc92d4d391f!2sCl%C3%ADnica%20de%20la%20Costa!5e0!3m2!1ses-419!2sco!4v1727304204801!5m2!1ses-419!2sco"
                                style={{ border: 0, width: "100%", height: 570 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </section>
                    {/* Fin de la Sección de Google Maps */}

                    {/* Sección de Suscripción */}
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
                    {/* Fin de la Sección de Suscripción */}
                </div>
            </Layout>
        </>
    )
}

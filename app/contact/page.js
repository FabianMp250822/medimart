'use client';
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useSede } from "../context/SedeContext"; 

export default function Home() {
  // Utiliza el hook useSede para obtener los datos del contexto
  const { contactos, selectedSede, sedeData } = useSede();

  // Acceder al primer valor de `contactos`
  const contactosData = contactos ? Object.values(contactos)[0] : {};

  return (
    <>
      <Layout headerStyle={2} footerStyle={1} breadcrumbTitle={`Contacto - ${sedeData?.nombre || "Sede"}`}>
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
                        {contactosData?.["atencion-usuario"] ? (
                          <Link href={`tel:${contactosData["atencion-usuario"]}`}>
                            {contactosData["atencion-usuario"]}
                          </Link>
                        ) : (
                          "No disponible"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Contrataciones */}
                <div className="col-lg-4 col-md-6 col-sm-12 info-column">
                  <div className="info-block-one">
                    <h3>Contrataciones</h3>
                    <div className="inner-box">
                      <div className="icon-box"><i className="icon-2"></i></div>
                      <p>
                        Teléfono: <br />
                        {contactosData?.["contrataciones"] ? (
                          <Link href={`tel:${contactosData["contrataciones"]}`}>
                            {contactosData["contrataciones"]}
                          </Link>
                        ) : (
                          "No disponible"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Coordinación */}
                <div className="col-lg-4 col-md-6 col-sm-12 info-column">
                  <div className="info-block-one">
                    <h3>Coordinación</h3>
                    <div className="inner-box">
                      <div className="icon-box">
                        <img src="assets/images/icons/icon-2.png" alt="" />
                      </div>
                      <p>
                        Teléfono:{" "}
                        {contactosData?.["coordinacion"] ? (
                          <Link href={`tel:${contactosData["coordinacion"]}`}>
                            {contactosData["coordinacion"]}
                          </Link>
                        ) : (
                          "No disponible"
                        )}
                        <br />
                        Correo electrónico:{" "}
                        {contactosData?.["correo-contratacion"] ? (
                          <Link href={`mailto:${contactosData["correo-contratacion"]}`}>
                            {contactosData["correo-contratacion"]}
                          </Link>
                        ) : (
                          "No disponible"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información de Auditoría */}
              <div className="row clearfix">
                <div className="col-lg-4 col-md-6 col-sm-12 info-column">
                  <div className="info-block-one">
                    <h3>Auditoría</h3>
                    <div className="inner-box">
                      <div className="icon-box"><i className="icon-2"></i></div>
                      <p>
                        Teléfono:{" "}
                        {contactosData?.["auditoria"] ? (
                          <Link href={`tel:${contactosData["auditoria"]}`}>
                            {contactosData["auditoria"]}
                          </Link>
                        ) : (
                          "No disponible"
                        )}
                        <br />
                        Correo electrónico:{" "}
                        {contactosData?.["correo-auditoria"] ? (
                          <Link href={`mailto:${contactosData["correo-auditoria"]}`}>
                            {contactosData["correo-auditoria"]}
                          </Link>
                        ) : (
                          "No disponible"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Enfermería */}
                <div className="col-lg-4 col-md-6 col-sm-12 info-column">
                  <div className="info-block-one">
                    <h3>Enfermería</h3>
                    <div className="inner-box">
                      <div className="icon-box"><i className="icon-2"></i></div>
                      <p>
                        Teléfono:{" "}
                        {contactosData?.["enfermera-coordinadora"] ? (
                          <Link href={`tel:${contactosData["enfermera-coordinadora"]}`}>
                            {contactosData["enfermera-coordinadora"]}
                          </Link>
                        ) : (
                          "No disponible"
                        )}
                        <br />
                        Correo electrónico:{" "}
                        {contactosData?.["correo-enfermeria"] ? (
                          <Link href={`mailto:${contactosData["correo-enfermeria"]}`}>
                            {contactosData["correo-enfermeria"]}
                          </Link>
                        ) : (
                          "No disponible"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Atención */}
                <div className="col-lg-4 col-md-6 col-sm-12 info-column">
                  <div className="info-block-one">
                    <h3>Correo de Atención</h3>
                    <div className="inner-box">
                      <div className="icon-box"><i className="icon-2"></i></div>
                      <p>
                        Correo electrónico:{" "}
                        {contactosData?.["correo-atencion"] ? (
                          <Link href={`mailto:${contactosData["correo-atencion"]}`}>
                            {contactosData["correo-atencion"]}
                          </Link>
                        ) : (
                          "No disponible"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            
            </div>
          </section>
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
                                    <figure className="image-box"><img src="assets/images/banner/contacto.webp" alt="" /></figure>
                                </div>
                            </div>
                        </div>
                    </section>
        </div>
      </Layout>
    </>
  );
}

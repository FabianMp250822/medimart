"use client";

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
      <Layout
        headerStyle={2}
        footerStyle={1}
        breadcrumbTitle={`Contacto - ${sedeData?.nombre || "Sede"}`}
      >
        <div>
          {/* Sección de Información de Contacto */}
          <section className="contact-info-section pt_120">
  <div className="auto-container">
    {/* Fila 1 */}
    <div className="row clearfix">
      {/* Admisiones */}
      <div className="col-lg-4 col-md-6 col-sm-12 info-column">
        <div className="info-block-one">
          <h3>Admisiones</h3>
          <div className="inner-box">
            <div className="icon-box">
              <i className="icon-2"></i>
            </div>
            <p>
              <strong>Teléfono:</strong> <br />
              <Link href="tel:3369999">3369999 ext: 101</Link>
            </p>
            <p>
              <strong>Correo electrónico:</strong> <br />
              <Link href="mailto:admisiones@clinicadelacosta.co">
                admisiones@clinicadelacosta.co
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Trabajo Social */}
      <div className="col-lg-4 col-md-6 col-sm-12 info-column">
        <div className="info-block-one">
          <h3>Trabajo Social</h3>
          <div className="inner-box">
            <div className="icon-box">
              <i className="icon-2"></i>
            </div>
            <p>
              <strong>Teléfono:</strong> <br />
              <Link href="tel:3369999">3369999 ext: 112</Link>
            </p>
            <p>
              <strong>Correo electrónico:</strong> <br />
              <Link href="mailto:trabajosocial@clinicadelacosta.co">
                trabajosocial@clinicadelacosta.co
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Call Center */}
      <div className="col-lg-4 col-md-6 col-sm-12 info-column">
        <div className="info-block-one">
          <h3>Call Center</h3>
          <div className="inner-box">
            <div className="icon-box">
              <i className="icon-2"></i>
            </div>
            <p>
              <strong>Teléfono:</strong> <br />
              <Link href="tel:3369999">3369999 ext: 1</Link>
            </p>
            <p>
              <strong>Correo electrónico:</strong> <br />
              <Link href="mailto:citasmedicas@clinicadelacosta.co">
                citasmedicas@clinicadelacosta.co
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    {/* Fin Fila 1 */}

    {/* Fila 2 */}
    <div className="row clearfix">
      {/* Resonancia */}
      <div className="col-lg-4 col-md-6 col-sm-12 info-column">
        <div className="info-block-one">
          <h3>Resonancia</h3>
          <div className="inner-box">
            <div className="icon-box">
              <i className="icon-2"></i>
            </div>
            <p>
              <strong>Teléfono:</strong> <br />
              <Link href="tel:3369999">3369999 ext: 137</Link>
            </p>
            <p>
              <strong>Correo electrónico:</strong> <br />
              <Link href="mailto:resonancia@clinicadelacosta.co">
                resonancia@clinicadelacosta.co
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Neurofisiologia */}
      <div className="col-lg-4 col-md-6 col-sm-12 info-column">
        <div className="info-block-one">
          <h3>Neurofisiologia</h3>
          <div className="inner-box">
            <div className="icon-box">
              <i className="icon-2"></i>
            </div>
            <p>
              <strong>Teléfono:</strong> <br />
              <Link href="tel:3369999">3369999 ext: 110</Link>
            </p>
            <p>
              <strong>Correo electrónico:</strong> <br />
              <Link href="mailto:neurofisiologia@clinicadelacosta.co">
                neurofisiologia@clinicadelacosta.co
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Patologia */}
      <div className="col-lg-4 col-md-6 col-sm-12 info-column">
        <div className="info-block-one">
          <h3>Patologia</h3>
          <div className="inner-box">
            <div className="icon-box">
              <i className="icon-2"></i>
            </div>
            <p>
              <strong>Teléfono:</strong> <br />
              <Link href="tel:3369999">3369999 ext: 203</Link>
            </p>
            <p>
              <strong>Correo electrónico:</strong> <br />
              <Link href="mailto:patologia@clinicadelacosta.co">
                patologia@clinicadelacosta.co
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    {/* Fin Fila 2 */}

    {/* Fila 3 */}
    <div className="row clearfix">
      {/* Cirugia */}
      <div className="col-lg-4 col-md-6 col-sm-12 info-column">
        <div className="info-block-one">
          <h3>Cirugia</h3>
          <div className="inner-box">
            <div className="icon-box">
              <i className="icon-2"></i>
            </div>
            <p>
              <strong>Teléfono:</strong> <br />
              <Link href="tel:3369999">3369999 ext: 106</Link>
            </p>
            <p>
              <strong>Correo electrónico:</strong> <br />
              <Link href="mailto:enfermeriacirugia@clinicadelacosta.co">
                enfermeriacirugia@clinicadelacosta.co
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Contrataciones */}
      <div className="col-lg-4 col-md-6 col-sm-12 info-column">
        <div className="info-block-one">
          <h3>Contrataciones</h3>
          <div className="inner-box">
            <div className="icon-box">
              <i className="icon-2"></i>
            </div>
            <p>
              <strong>Teléfono:</strong> <br />
              <Link href="tel:3369999">3369999 ext: 573</Link>
            </p>
            <p>
              <strong>Correo electrónico:</strong> <br />
              <Link href="mailto:contratacion@clinicadelacosta.co">
                contratacion@clinicadelacosta.co
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Correo de Atención */}
      <div className="col-lg-4 col-md-6 col-sm-12 info-column">
        <div className="info-block-one">
          <h3>Correo de Atención</h3>
          <div className="inner-box">
            <div className="icon-box">
              <i className="icon-2"></i>
            </div>
            <p>
              <strong>Correo electrónico:</strong> <br />
              <Link href="mailto:citasmedicas@clinicadelacosta.co">
                citasmedicas@clinicadelacosta.co
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    {/* Fin Fila 3 */}

    {/* Fila 4 */}
    <div className="row clearfix">
      {/* Notificaciones Judiciales */}
      <div className="col-lg-4 col-md-6 col-sm-12 info-column">
        <div className="info-block-one">
          <h3>Notificaciones Judiciales</h3>
          <div className="inner-box">
            <div className="icon-box">
              <i className="icon-2"></i>
            </div>
            <p>
              <strong>Correo electrónico 1:</strong> <br />
              <Link href="mailto:info@clinicadelacosta.co">
                info@clinicadelacosta.co
              </Link>
            </p>
            <p>
              <strong>Correo electrónico 2:</strong> <br />
              <Link href="mailto:juridica@clinicadelacosta.co">
                juridica@clinicadelacosta.co
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    {/* Fin Fila 4 */}
  </div>
</section>


          {/* Formulario de Contacto */}
          <section className="contact-style-three pt_90 pb_120">
            <div className="auto-container">
              <div className="row clearfix">
                <div className="col-lg-8 col-md-12 col-sm-12 form-column">
                  <div className="form-inner mr_40">
                    <div className="sec-title mb_50">
                      <h2>Enviar un Mensaje</h2>
                    </div>
                    <form
                      method="post"
                      action="sendemail.php"
                      id="contact-form"
                      className="default-form"
                    >
                      <div className="row clearfix">
                        <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                          <input
                            type="text"
                            name="username"
                            placeholder="Nombre"
                            required
                          />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                          <input
                            type="text"
                            name="lname"
                            placeholder="Apellido"
                            required
                          />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                          <input
                            type="email"
                            name="email"
                            placeholder="Correo Electrónico"
                            required
                          />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                          <input
                            type="text"
                            name="phone"
                            required
                            placeholder="Teléfono"
                          />
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                          <input
                            type="text"
                            name="subject"
                            required
                            placeholder="Asunto"
                          />
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                          <textarea
                            name="message"
                            placeholder="Mensaje"
                          ></textarea>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
                          <button
                            className="theme-btn btn-one"
                            type="submit"
                            name="submit-form"
                          >
                            <span>Enviar Mensaje</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12 image-column">
                  <figure className="image-box">
                    <img
                      src="assets/images/banner/contacto.webp"
                      alt="Contacto"
                    />
                  </figure>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}

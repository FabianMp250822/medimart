import Layout from "@/components/layout/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Laboratorio Clínico">
        <div>
          {/* Laboratorio Clínico */}
          <section className="diagnostico-section sec-pad bg-color-1">
            <div className="auto-container">
              <div className="sec-title mb_50 centred">
                <span className="sub-title">Apoyo Diagnóstico y Terapéutico</span>
                <h2>Laboratorio Clínico</h2>
                <p>
                  Conociendo la importancia del diagnóstico, el Laboratorio Clínico ofrece un servicio respaldado por la más completa tecnología, garantizando resultados certeros que agilizan la detección y tratamiento de cualquier anomalía encontrada. Nuestro equipo humano está conformado por profesionales altamente capacitados, incluyendo bacteriólogos, técnicos y tecnólogos en laboratorio clínico, quienes proporcionan soporte y acompañamiento integral en diversas subespecialidades.
                </p>
                <p>
                  Cada uno de nuestros análisis se realiza utilizando equipos e instrumentos avanzados que pasan por estrictos controles de calidad. Esto nos permite obtener resultados fiables, garantizando diagnósticos precisos y confiables. Nuestro laboratorio cumple con los más altos estándares de calidad, asegurando una atención oportuna y eficaz para cada uno de nuestros pacientes.
                </p>
              </div>
              <div className="row clearfix">
                {/* Servicio 1 - Hematología */}
                <div className="col-lg-4 col-md-6 col-sm-12 diagnostico-block">
                  <div className="diagnostico-block-one wow fadeInUp animated" data-wow-delay="00ms" data-wow-duration="1500ms">
                    <div className="inner-box">
                      <figure className="image-box">
                        <Link href="laboratorio-details"><img src="assets/images/laboratorio/laboratorio-1.jpg" alt="Hematología" /></Link>
                      </figure>
                      <div className="lower-content">
                        <h3><Link href="laboratorio-details">Hematología</Link></h3>
                        <p>
                          El análisis hematológico es esencial para evaluar la salud general de un paciente y detectar trastornos como anemias, leucemias y otros problemas sanguíneos. Nuestro laboratorio ofrece exámenes detallados que permiten a los médicos hacer diagnósticos rápidos y precisos.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Servicio 2 - Bioquímica Clínica */}
                <div className="col-lg-4 col-md-6 col-sm-12 diagnostico-block">
                  <div className="diagnostico-block-one wow fadeInUp animated" data-wow-delay="300ms" data-wow-duration="1500ms">
                    <div className="inner-box">
                      <figure className="image-box">
                        <Link href="laboratorio-details"><img src="assets/images/laboratorio/laboratorio-2.jpg" alt="Bioquímica Clínica" /></Link>
                      </figure>
                      <div className="lower-content">
                        <h3><Link href="laboratorio-details">Bioquímica Clínica</Link></h3>
                        <p>
                          En el área de **bioquímica clínica**, se realizan pruebas para analizar el funcionamiento de órganos vitales como el hígado, los riñones y el corazón. Este servicio ayuda a detectar condiciones como diabetes, enfermedades renales y hepáticas, asegurando un diagnóstico temprano y un tratamiento eficaz.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Servicio 3 - Microbiología */}
                <div className="col-lg-4 col-md-6 col-sm-12 diagnostico-block">
                  <div className="diagnostico-block-one wow fadeInUp animated" data-wow-delay="600ms" data-wow-duration="1500ms">
                    <div className="inner-box">
                      <figure className="image-box">
                        <Link href="laboratorio-details"><img src="assets/images/laboratorio/laboratorio-3.jpg" alt="Microbiología" /></Link>
                      </figure>
                      <div className="lower-content">
                        <h3><Link href="laboratorio-details">Microbiología</Link></h3>
                        <p>
                          La **microbiología** es una rama clave en el diagnóstico de infecciones bacterianas, virales, fúngicas y parasitarias. Nuestro laboratorio utiliza tecnología avanzada para identificar rápidamente patógenos, lo que permite a los médicos seleccionar el tratamiento más adecuado para el paciente.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Servicio 4 - Inmunología */}
                <div className="col-lg-4 col-md-6 col-sm-12 diagnostico-block">
                  <div className="diagnostico-block-one wow fadeInUp animated" data-wow-delay="900ms" data-wow-duration="1500ms">
                    <div className="inner-box">
                      <figure className="image-box">
                        <Link href="laboratorio-details"><img src="assets/images/laboratorio/laboratorio-4.jpg" alt="Inmunología" /></Link>
                      </figure>
                      <div className="lower-content">
                        <h3><Link href="laboratorio-details">Inmunología</Link></h3>
                        <p>
                          En nuestra área de **inmunología**, se realizan pruebas para evaluar el estado del sistema inmunológico. Esto incluye el diagnóstico de enfermedades autoinmunes, alergias e inmunodeficiencias, ayudando a los médicos a desarrollar planes de tratamiento personalizados.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Servicio 5 - Endocrinología */}
                <div className="col-lg-4 col-md-6 col-sm-12 diagnostico-block">
                  <div className="diagnostico-block-one wow fadeInUp animated" data-wow-delay="1200ms" data-wow-duration="1500ms">
                    <div className="inner-box">
                      <figure className="image-box">
                        <Link href="laboratorio-details"><img src="assets/images/laboratorio/laboratorio-5.jpg" alt="Endocrinología" /></Link>
                      </figure>
                      <div className="lower-content">
                        <h3><Link href="laboratorio-details">Endocrinología</Link></h3>
                        <p>
                          En esta área, realizamos pruebas que evalúan los niveles hormonales y la función de las glándulas endocrinas. Estos análisis son fundamentales para el diagnóstico de enfermedades como el hipotiroidismo, el síndrome de Cushing y la diabetes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Servicio 6 - Pruebas de coagulación */}
                <div className="col-lg-4 col-md-6 col-sm-12 diagnostico-block">
                  <div className="diagnostico-block-one wow fadeInUp animated" data-wow-delay="1500ms" data-wow-duration="1500ms">
                    <div className="inner-box">
                      <figure className="image-box">
                        <Link href="laboratorio-details"><img src="assets/images/laboratorio/laboratorio-6.jpg" alt="Pruebas de coagulación" /></Link>
                      </figure>
                      <div className="lower-content">
                        <h3><Link href="laboratorio-details">Pruebas de coagulación</Link></h3>
                        <p>
                          Las pruebas de **coagulación** son esenciales para evaluar el riesgo de sangrado o formación de coágulos en los pacientes. Estas pruebas ayudan a diagnosticar trastornos de la coagulación y a monitorear tratamientos anticoagulantes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Laboratorio Clínico end */}

          {/* subscribe-two */}
          <section className="subscribe-section">
            <div className="auto-container">
              <div className="inner-container">
                <div className="row align-items-center">
                  <div className="col-lg-6 col-md-12 col-sm-12 text-column">
                    <div className="text-box">
                      <h2><span>Subscribe</span> for the exclusive updates!</h2>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 form-column">
                    <div className="form-inner">
                      <form method="post" action="contact">
                        <div className="form-group">
                          <input type="email" name="email" placeholder="Enter Your Email Address" required />
                          <button type="submit" className="theme-btn btn-one">
                            <span>Subscribe Now</span>
                          </button>
                        </div>
                        <div className="form-group">
                          <div className="check-box">
                            <input className="check" type="checkbox" id="checkbox1" />
                            <label htmlFor="checkbox1">
                              I agree to the <Link href="/">Privacy Policy.</Link>
                            </label>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* subscribe end */}
        </div>
      </Layout>
    </>
  );
}

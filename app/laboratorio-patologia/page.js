import Layout from "@/components/layout/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Laboratorio de Patología">
        <div>
          {/* Laboratorio de Patología */}
          <section className="diagnostico-section sec-pad bg-color-1">
            <div className="auto-container">
              <div className="sec-title mb_50 centred">
                <span className="sub-title">Apoyo Diagnóstico y Terapéutico</span>
                <h2>Laboratorio de Patología</h2>
                <p>
                  El laboratorio de patología ofrece un diagnóstico seguro y preciso para determinar el plan de manejo que se aplicará al paciente. Con un enfoque centrado en el bienestar del paciente, buscamos prevenir o brindar un tratamiento efectivo para diversas enfermedades. 
                </p>
                <p>
                  Nuestro equipo de profesionales está altamente capacitado para ofrecer resultados confiables y rápidos, utilizando tecnología de última generación que asegura que cada diagnóstico sea lo más preciso posible.
                </p>
              </div>
              <div className="row clearfix">
                {/* Servicio 1 - Citometría de flujo */}
                <div className="col-lg-4 col-md-6 col-sm-12 diagnostico-block">
                  <div className="diagnostico-block-one wow fadeInUp animated" data-wow-delay="00ms" data-wow-duration="1500ms">
                    <div className="inner-box">
                      <figure className="image-box">
                        <Link href="patologia-details"><img src="assets/images/patologia/patologia-1.jpg" alt="Citometría de flujo" /></Link>
                      </figure>
                      <div className="lower-content">
                        <h3><Link href="patologia-details">Citometría de flujo</Link></h3>
                        <p>
                          Ofrecemos el servicio de **citometría de flujo** para el diagnóstico de neoplasias hematológicas (cánceres de sangre y del sistema linfático). Esta tecnología avanzada permite un análisis rápido y preciso de las células, esencial para la detección y tratamiento personalizado de los pacientes.
                        </p>
                        <p>
                          Este examen permite detectar alteraciones en el sistema inmunológico, identificar células anormales y monitorear el progreso del tratamiento de manera no invasiva.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Servicio 2 - Diagnóstico de enfermedades hematológicas */}
                <div className="col-lg-4 col-md-6 col-sm-12 diagnostico-block">
                  <div className="diagnostico-block-one wow fadeInUp animated" data-wow-delay="300ms" data-wow-duration="1500ms">
                    <div className="inner-box">
                      <figure className="image-box">
                        <Link href="patologia-details"><img src="assets/images/patologia/patologia-2.jpg" alt="Diagnóstico de enfermedades hematológicas" /></Link>
                      </figure>
                      <div className="lower-content">
                        <h3><Link href="patologia-details">Diagnóstico de enfermedades hematológicas</Link></h3>
                        <p>
                          En nuestro laboratorio, proporcionamos un diagnóstico preciso para diversas enfermedades hematológicas, incluyendo leucemias, linfomas y otras neoplasias. Utilizamos tecnologías avanzadas para estudiar las células sanguíneas, lo que nos permite detectar alteraciones y enfermedades en etapas tempranas, lo que es clave para un tratamiento efectivo.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Servicio 3 - Patología general */}
                <div className="col-lg-4 col-md-6 col-sm-12 diagnostico-block">
                  <div className="diagnostico-block-one wow fadeInUp animated" data-wow-delay="600ms" data-wow-duration="1500ms">
                    <div className="inner-box">
                      <figure className="image-box">
                        <Link href="patologia-details"><img src="assets/images/patologia/patologia-3.jpg" alt="Patología general" /></Link>
                      </figure>
                      <div className="lower-content">
                        <h3><Link href="patologia-details">Patología general</Link></h3>
                        <p>
                          Nuestro laboratorio abarca una amplia gama de servicios de patología, que incluyen estudios de tejidos y células. Estos análisis son fundamentales para la detección temprana de diversas enfermedades, permitiendo un diagnóstico oportuno y un tratamiento personalizado para cada paciente.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Servicio 4 - Patología molecular */}
                <div className="col-lg-4 col-md-6 col-sm-12 diagnostico-block">
                  <div className="diagnostico-block-one wow fadeInUp animated" data-wow-delay="900ms" data-wow-duration="1500ms">
                    <div className="inner-box">
                      <figure className="image-box">
                        <Link href="patologia-details"><img src="assets/images/patologia/patologia-4.jpg" alt="Patología molecular" /></Link>
                      </figure>
                      <div className="lower-content">
                        <h3><Link href="patologia-details">Patología molecular</Link></h3>
                        <p>
                          La patología molecular es una herramienta clave en la medicina moderna, ayudando a identificar cambios genéticos y moleculares en células y tejidos. Este tipo de análisis es esencial para la detección y tratamiento de cánceres y otras enfermedades complejas, permitiendo tratamientos más precisos y efectivos.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Servicio 5 - Citología */}
                <div className="col-lg-4 col-md-6 col-sm-12 diagnostico-block">
                  <div className="diagnostico-block-one wow fadeInUp animated" data-wow-delay="1200ms" data-wow-duration="1500ms">
                    <div className="inner-box">
                      <figure className="image-box">
                        <Link href="patologia-details"><img src="assets/images/patologia/patologia-5.jpg" alt="Citología" /></Link>
                      </figure>
                      <div className="lower-content">
                        <h3><Link href="patologia-details">Citología</Link></h3>
                        <p>
                          La **citología** es un examen clave para la detección temprana de varios tipos de cáncer, especialmente el cáncer de cuello uterino. Este examen no invasivo analiza las células extraídas del cuerpo para detectar cambios que podrían ser indicativos de enfermedades o afecciones premalignas.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Servicio 6 - Biopsias y análisis de tejidos */}
                <div className="col-lg-4 col-md-6 col-sm-12 diagnostico-block">
                  <div className="diagnostico-block-one wow fadeInUp animated" data-wow-delay="1500ms" data-wow-duration="1500ms">
                    <div className="inner-box">
                      <figure className="image-box">
                        <Link href="patologia-details"><img src="assets/images/patologia/patologia-6.jpg" alt="Biopsias y análisis de tejidos" /></Link>
                      </figure>
                      <div className="lower-content">
                        <h3><Link href="patologia-details">Biopsias y análisis de tejidos</Link></h3>
                        <p>
                          Las **biopsias** son fundamentales para el diagnóstico de muchas enfermedades, incluyendo el cáncer. Nuestro laboratorio ofrece análisis detallados de tejidos obtenidos a través de biopsias, proporcionando resultados precisos que guían a los médicos en la planificación del tratamiento.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Laboratorio de Patología end */}

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

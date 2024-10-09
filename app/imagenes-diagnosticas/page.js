import Layout from "@/components/layout/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Apoyo Diagnóstico y Terapéutico">
        <div>
          {/* Apoyo Diagnóstico y Terapéutico */}
          <section className="diagnostico-section sec-pad bg-color-1">
            <div className="auto-container">
              <div className="sec-title mb_50 centred">
                <span className="sub-title">Apoyo Diagnóstico y Terapéutico</span>
                <h2>Departamento de Imágenes Diagnósticas</h2>
                <p>
                  La mayoría de los exámenes radiológicos son no invasivos e indoloros, y se pueden realizar de forma ambulatoria. Nuestro equipo especializado está comprometido con diagnosticar y prestar tratamiento en tiempos oportunos. 
                  Coordinamos servicios de imágenes con su atención médica y/o quirúrgica en áreas especializadas para ofrecer un diagnóstico rápido y preciso.
                </p>
              </div>
              <div className="row clearfix">
                {/* Servicio 1 - Imágenes de maternidad y mujeres */}
                <div className="col-lg-4 col-md-6 col-sm-12 diagnostico-block">
                  <div className="diagnostico-block-one wow fadeInUp animated" data-wow-delay="00ms" data-wow-duration="1500ms">
                    <div className="inner-box">
                      <figure className="image-box">
                        <Link href="diagnostico-details"><img src="assets/images/diagnostico/diagnostico-1.jpg" alt="Imágenes de maternidad y mujeres" /></Link>
                      </figure>
                      <div className="lower-content">
                        <h3><Link href="diagnostico-details">Imágenes de maternidad y mujeres</Link></h3>
                        <p>
                          Proporcionamos imágenes especializadas en maternidad, permitiendo monitorear el estado del bebé durante el embarazo. Además, contamos con exámenes para la detección temprana de enfermedades específicas en la mujer, como mamografías para la detección del cáncer de mama.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Servicio 2 - Radiología cardíaca */}
                <div className="col-lg-4 col-md-6 col-sm-12 diagnostico-block">
                  <div className="diagnostico-block-one wow fadeInUp animated" data-wow-delay="300ms" data-wow-duration="1500ms">
                    <div className="inner-box">
                      <figure className="image-box">
                        <Link href="diagnostico-details"><img src="assets/images/diagnostico/diagnostico-2.jpg" alt="Radiología cardíaca" /></Link>
                      </figure>
                      <div className="lower-content">
                        <h3><Link href="diagnostico-details">Radiología cardíaca</Link></h3>
                        <p>
                          Nuestras imágenes cardíacas ofrecen un análisis detallado del corazón y los vasos sanguíneos. Este servicio permite a los cardiólogos detectar enfermedades como bloqueos, insuficiencias y otras anomalías, asegurando que cada paciente reciba el tratamiento adecuado a tiempo.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Servicio 3 - Imágenes de diagnóstico para el cáncer */}
                <div className="col-lg-4 col-md-6 col-sm-12 diagnostico-block">
                  <div className="diagnostico-block-one wow fadeInUp animated" data-wow-delay="600ms" data-wow-duration="1500ms">
                    <div className="inner-box">
                      <figure className="image-box">
                        <Link href="diagnostico-details"><img src="assets/images/diagnostico/diagnostico-3.jpg" alt="Imágenes de diagnóstico para el cáncer" /></Link>
                      </figure>
                      <div className="lower-content">
                        <h3><Link href="diagnostico-details">Imágenes de diagnóstico para el cáncer</Link></h3>
                        <p>
                          Utilizamos imágenes avanzadas, como tomografías computarizadas (TC) y resonancias magnéticas (RM), para detectar y monitorear el cáncer en diferentes etapas. Estas herramientas ayudan a planificar tratamientos personalizados y a seguir el progreso de la enfermedad.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Servicio 4 - Imagen torácica */}
                <div className="col-lg-4 col-md-6 col-sm-12 diagnostico-block">
                  <div className="diagnostico-block-one wow fadeInUp animated" data-wow-delay="900ms" data-wow-duration="1500ms">
                    <div className="inner-box">
                      <figure className="image-box">
                        <Link href="diagnostico-details"><img src="assets/images/diagnostico/diagnostico-4.jpg" alt="Imagen torácica" /></Link>
                      </figure>
                      <div className="lower-content">
                        <h3><Link href="diagnostico-details">Imagen torácica</Link></h3>
                        <p>
                          La radiología torácica se utiliza para evaluar los pulmones, el corazón y otros órganos dentro del tórax. Estos exámenes son esenciales para diagnosticar afecciones respiratorias, cardíacas y problemas en las vías aéreas, lo que facilita el diagnóstico temprano y el tratamiento rápido.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Servicio 5 - Ultrasonido vascular */}
                <div className="col-lg-4 col-md-6 col-sm-12 diagnostico-block">
                  <div className="diagnostico-block-one wow fadeInUp animated" data-wow-delay="1200ms" data-wow-duration="1500ms">
                    <div className="inner-box">
                      <figure className="image-box">
                        <Link href="diagnostico-details"><img src="assets/images/diagnostico/diagnostico-5.jpg" alt="Ultrasonido vascular" /></Link>
                      </figure>
                      <div className="lower-content">
                        <h3><Link href="diagnostico-details">Ultrasonido vascular</Link></h3>
                        <p>
                          Este examen no invasivo se usa para evaluar el flujo sanguíneo en las arterias y venas del cuerpo. El ultrasonido vascular es fundamental para detectar enfermedades como la trombosis venosa profunda o aneurismas, asegurando un diagnóstico temprano y un tratamiento adecuado.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Servicio 6 - Servicios ortopédicos */}
                <div className="col-lg-4 col-md-6 col-sm-12 diagnostico-block">
                  <div className="diagnostico-block-one wow fadeInUp animated" data-wow-delay="1500ms" data-wow-duration="1500ms">
                    <div className="inner-box">
                      <figure className="image-box">
                        <Link href="diagnostico-details"><img src="assets/images/diagnostico/diagnostico-6.jpg" alt="Servicios ortopédicos" /></Link>
                      </figure>
                      <div className="lower-content">
                        <h3><Link href="diagnostico-details">Servicios ortopédicos</Link></h3>
                        <p>
                          Ofrecemos imágenes detalladas para ayudar a los especialistas en ortopedia a diagnosticar y tratar lesiones y afecciones del sistema musculoesquelético, incluyendo huesos, articulaciones y tejidos blandos. Este servicio es clave para planificar cirugías y rehabilitaciones.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Diagnóstico y Terapéutico end */}

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

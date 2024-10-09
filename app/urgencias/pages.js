'use client'; 
import { useState } from 'react';
import Layout from "@/components/layout/Layout";
import Link from "next/link";

export default function Home() {
  const [selectedService, setSelectedService] = useState('Equipo Médico Especializado');

  const menuItems = [
    'Equipo Médico Especializado',
    'Atención Integral en Emergencias',
    'Tecnología Avanzada y Diagnóstico',
    'Apoyo Terapéutico y Quirúrgico',
    'Servicio Continuo 24/7',
    'Facilidades de Pago y Atención Rápida',
  ];

  const serviceContent = {
    'Equipo Médico Especializado': (
      <>
        <p>
          Nuestro **Servicio de Urgencias** cuenta con un equipo de especialistas en **Medicina Interna**, **Ginecología**, **Pediatría**, y **Medicina General**, junto a enfermeras certificadas en soporte vital básico y avanzado. También disponemos de **terapeutas respiratorios** y acceso a médicos de todas las especialidades clínicas y quirúrgicas, todos dedicados exclusivamente a la atención en nuestra clínica.
        </p>
        <p>
          Este equipo interdisciplinario trabaja de manera coordinada para atender cualquier tipo de emergencia, desde situaciones críticas hasta urgencias menos complejas, asegurando siempre la mejor atención y el tratamiento adecuado para cada paciente.
        </p>
      </>
    ),
    'Atención Integral en Emergencias': (
      <>
        <p>
          En cada emergencia o urgencia, nuestro personal médico está capacitado para **valorar**, **diagnosticar** y **tratar** de manera rápida y efectiva. La atención integral está orientada a garantizar que cada paciente reciba la intervención adecuada, desde el primer contacto hasta la finalización del tratamiento.
        </p>
        <p>
          Nos enfocamos en el trabajo en equipo, asegurando que cada caso sea evaluado con precisión y que los tratamientos se lleven a cabo de manera coordinada entre los distintos especialistas.
        </p>
      </>
    ),
    'Tecnología Avanzada y Diagnóstico': (
      <>
        <p>
          Nuestro servicio de urgencias está respaldado por **tecnología de última generación** en **imágenes diagnósticas**, **laboratorio clínico**, y otros medios de diagnóstico avanzados. Esto nos permite obtener resultados rápidos y precisos, lo que es esencial para determinar el tratamiento más adecuado en cada caso.
        </p>
        <p>
          Contamos con equipos de imagenología de alta resolución, pruebas de laboratorio confiables y tecnología que facilita diagnósticos rápidos, garantizando una atención eficiente y precisa.
        </p>
      </>
    ),
    'Apoyo Terapéutico y Quirúrgico': (
      <>
        <p>
          Disponemos de **apoyo terapéutico** y **quirúrgico** las 24 horas del día, lo que nos permite atender cualquier situación de emergencia que requiera intervención inmediata. Nuestro equipo está preparado para realizar desde procedimientos menores hasta cirugías complejas, asegurando que el paciente reciba la mejor atención en el menor tiempo posible.
        </p>
        <p>
          Además, la **unidad transfusional** está disponible para emergencias que requieran transfusiones de sangre, brindando una respuesta rápida y efectiva en situaciones críticas.
        </p>
      </>
    ),
    'Servicio Continuo 24/7': (
      <>
        <p>
          En el servicio de urgencias de la **Clínica de la Costa**, estamos disponibles las **24 horas del día**, los **7 días de la semana**. Nuestro personal siempre está preparado para atender cualquier emergencia que se presente, asegurando que cada paciente reciba la atención que necesita sin importar el momento.
        </p>
        <p>
          La continuidad de nuestro servicio garantiza que las emergencias sean atendidas con la misma calidad y rapidez en cualquier momento, ofreciendo seguridad y tranquilidad a nuestros pacientes y sus familias.
        </p>
      </>
    ),
    'Facilidades de Pago y Atención Rápida': (
      <>
        <p>
          Entendemos que las emergencias pueden generar estrés, tanto emocional como económico. Por ello, ofrecemos **facilidades de pago** para que nuestros pacientes puedan enfocarse en su salud mientras nosotros nos encargamos de los trámites. Contamos con un equipo que te guiará en todo momento, asegurando que el proceso sea rápido y sin complicaciones.
        </p>
        <p>
          Nuestro objetivo es que puedas recibir la atención médica que necesitas de manera rápida y efectiva, sin preocuparte por los trámites administrativos.
        </p>
        <p>
          En caso de emergencia, no dudes en dirigirte a nuestro **Servicio de Urgencias** en la **Clínica de la Costa**. Nuestro equipo está listo para recibirte y brindarte el cuidado que necesitas. Estamos aquí para ti, siempre que lo necesites.
        </p>
      </>
    ),
  };

  return (
    <>
      <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Servicio de Urgencias">
        {/* sidebar-page-container */}
        <section className="sidebar-page-container sec-pad-2">
          <div className="auto-container">
            <div className="row clearfix">
              {/* Menú lateral con scroll */}
              <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
                <div className="blog-sidebar default-sidebar mr_10">
                  <div className="sidebar-widget category-widget">
                    <div className="widget-title">
                      <h3>Servicios de Urgencias</h3>
                    </div>
                    <div className="widget-content" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                      <ul className="category-list clearfix">
                        {menuItems.map((item) => (
                          <li key={item}>
                            <a
                              href="#"
                              className={selectedService === item ? 'active' : ''}
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedService(item);
                              }}
                            >
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Área de contenido */}
              <div className="col-lg-8 col-md-12 col-sm-12 content-side">
                <div className="blog-details-content">
                  <div className="news-block-one">
                    <div className="inner-box">
                      <div className="lower-content">
                        <h2>{selectedService}</h2>
                        {serviceContent[selectedService]}
                      </div>
                    </div>
                  </div>
                  <div className="call-to-action">
                    <h3>¿Necesitas atención urgente?</h3>
                    <p>No dudes en acudir a nuestro **Servicio de Urgencias** en la **Clínica de la Costa**. Estamos disponibles las 24 horas del día para atender cualquier emergencia. ¡Tu salud es nuestra prioridad!</p>
                    <Link href="/contact" className="theme-btn btn-one">
                      Ir a Urgencias
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* sidebar-page-container end */}

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
                        <button type="submit" className="theme-btn btn-one"><span>Subscribe Now</span></button>
                      </div>
                      <div className="form-group">
                        <div className="check-box">
                          <input className="check" type="checkbox" id="checkbox1" />
                          <label htmlFor="checkbox1">I agree to the <Link href="/">Privacy Policy.</Link></label>
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
      </Layout>
    </>
  );
}

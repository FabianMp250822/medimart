'use client'; 
import { useState } from 'react';
import Layout from "@/components/layout/Layout";
import Link from "next/link";

export default function Home() {
  const [selectedService, setSelectedService] = useState('Hospitalización General');

  const menuItems = [
    'Hospitalización General',
    'Atención Personalizada',
    'Unidad de Cuidados Especiales',
    'Apoyo a Urgencias y Cirugías',
    'Comodidad y Seguridad',
    'Tecnología Avanzada para el Diagnóstico',
  ];

  const serviceContent = {
    'Hospitalización General': (
      <>
        <p>
          Nuestra unidad de **Hospitalización** está diseñada para ofrecer una atención integral a cada uno de nuestros pacientes. Contamos con un equipo humano dedicado y comprometido a brindar una atención personalizada y de calidad. Nuestro enfoque es que cada paciente reciba el tratamiento adecuado, de la mano de profesionales con un alto nivel de conocimientos y experiencia.
        </p>
        <p>
          El bienestar del paciente es nuestra principal prioridad, y por eso proporcionamos un ambiente seguro, cómodo y apoyado por tecnología avanzada que garantiza un diagnóstico y tratamiento óptimos. Nuestro personal de enfermería y médicos está siempre disponible para atender las necesidades del paciente de manera oportuna y eficiente.
        </p>
      </>
    ),
    'Atención Personalizada': (
      <>
        <p>
          En nuestra unidad de hospitalización, creemos en la **atención personalizada** como un pilar fundamental. Cada paciente recibe un trato único, adaptado a sus necesidades específicas. Nuestro equipo de médicos, enfermeras y auxiliares trabaja estrechamente con el paciente y su familia, asegurando que todas sus preocupaciones sean atendidas.
        </p>
        <p>
          Nos enfocamos en brindar un trato humano, cercano y respetuoso, manteniendo una comunicación abierta y constante con el paciente para garantizar que se sienta seguro y bien atendido en todo momento.
        </p>
      </>
    ),
    'Unidad de Cuidados Especiales': (
      <>
        <p>
          Nuestra **Unidad de Cuidados Especiales** está destinada a aquellos pacientes que requieren una vigilancia más intensiva. Contamos con tecnología de monitoreo avanzada y un equipo de profesionales especializados en el manejo de situaciones críticas, brindando atención inmediata y continua para asegurar la mejor evolución de cada paciente.
        </p>
        <p>
          Los pacientes en cuidados especiales reciben un seguimiento cercano de su estado de salud, con personal capacitado disponible las 24 horas del día, listo para actuar de manera rápida y eficaz ante cualquier cambio en su condición.
        </p>
      </>
    ),
    'Apoyo a Urgencias y Cirugías': (
      <>
        <p>
          La **Unidad de Hospitalización** trabaja de la mano con los servicios de **Urgencias** y **Cirugías** para asegurar una continuidad en la atención del paciente. Tras recibir atención urgente o ser sometido a una cirugía, los pacientes son trasladados a nuestras unidades de hospitalización, donde un equipo multidisciplinario se encarga de su recuperación.
        </p>
        <p>
          Este enfoque coordinado entre las distintas áreas del hospital garantiza que cada paciente reciba el tratamiento adecuado en cada etapa de su proceso, desde la intervención quirúrgica hasta la fase de recuperación.
        </p>
      </>
    ),
    'Comodidad y Seguridad': (
      <>
        <p>
          Uno de nuestros principales objetivos es asegurar la **comodidad** y **seguridad** de nuestros pacientes durante su estancia. Contamos con habitaciones amplias, cómodas y perfectamente equipadas, diseñadas para ofrecer un ambiente relajante que favorezca la recuperación del paciente.
        </p>
        <p>
          Cada habitación está equipada con camas ergonómicas, controles de temperatura y sistemas de comunicación directa con el personal médico. La seguridad es un factor clave, por lo que hemos implementado estrictos protocolos de higiene y medidas para prevenir cualquier riesgo durante la hospitalización.
        </p>
      </>
    ),
    'Tecnología Avanzada para el Diagnóstico': (
      <>
        <p>
          Nuestra unidad de hospitalización está respaldada por **tecnología avanzada** que nos permite realizar diagnósticos precisos y ofrecer el tratamiento adecuado de forma eficiente. Contamos con equipos de monitoreo en tiempo real, laboratorios especializados y sistemas de imagenología que brindan una visión clara de la salud del paciente.
        </p>
        <p>
          Esta infraestructura tecnológica asegura que nuestros médicos cuenten con toda la información necesaria para tomar decisiones informadas y brindar el mejor tratamiento posible.
        </p>
      </>
    ),
  };

  return (
    <>
      <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Hospitalización">
        {/* sidebar-page-container */}
        <section className="sidebar-page-container sec-pad-2">
          <div className="auto-container">
            <div className="row clearfix">
              {/* Menú lateral con scroll */}
              <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
                <div className="blog-sidebar default-sidebar mr_10">
                  <div className="sidebar-widget category-widget">
                    <div className="widget-title">
                      <h3>Servicios</h3>
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

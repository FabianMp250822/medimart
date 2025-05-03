'use client'; 
import { useState } from 'react';
import Layout from "@/components/layout/Layout";
import Link from "next/link";

export default function Home() {
  const [selectedService, setSelectedService] = useState('Cirugía Plástica');

  const menuItems = [
    'Cirugía Plástica',
    'Cirugía Ambulatoria',
    'Cardiología Pediátrica',
    'Chequeo Médico Preventivo',
    'Enfermedades Cardíacas y Vasculares',
    'Gastroenterología y Coloproctología',
    'Manejo Integral del Paciente Hemato-Oncológico',
    'Programa de Manejo Integral del Paciente con Tuberculosis',
    'Pacientes con Dolor Torácico',
    'Programa de Nefrología',
    'Neurología y Neurofisiología',
    'Neumología Clínica y Cirugía de Tórax',
    'Trasplante Riñón e Hígado',
    'Unidad de Nutrición y Dietética',
    'Enfermedades Urológicas',
    'Ortopedia y Traumatología',
    'Trasplante Falla Intestinal',
    'Trasplante Renal',
    'Trasplante Falla Cardíaca y Asistencia Ventricular',
    'Unidad de Nutrición',
  ];

  const serviceContent = {
    'Cirugía Plástica': (
      <>
        <p>
          Nuestro servicio de **Cirugía Plástica** está orientado a mejorar la apariencia y confianza de nuestros pacientes. Ya sea que busques una cirugía reconstructiva o estética, contamos con un equipo de cirujanos altamente calificados que utilizan técnicas avanzadas para asegurar resultados naturales y seguros.
        </p>
        <p>
          Ofrecemos tratamientos personalizados que incluyen cirugía facial, corporal y procedimientos reconstructivos para pacientes que han sufrido lesiones o requieren intervenciones post-operatorias.
        </p>
      </>
    ),
    // ... (resto del contenido)
  };

  return (
    <>
      <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Servicios Especializados">
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

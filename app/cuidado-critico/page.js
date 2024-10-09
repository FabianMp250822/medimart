'use client'; 
import { useState } from 'react';
import Layout from "@/components/layout/Layout";
import Link from "next/link";

export default function Home() {
  const [selectedService, setSelectedService] = useState('Medicina Crítica y Unidades de Cuidado Especializado');

  const menuItems = [
    'Medicina Crítica y Unidades de Cuidado Especializado',
    'Departamento de Medicina Crítica',
    'Unidad Coronaria',
    'Unidad de Cuidados Intensivos Adultos',
    'UCI Neonatal y Pediátrica',
  ];

  const serviceContent = {
    'Medicina Crítica y Unidades de Cuidado Especializado': (
      <>
        <p>
          Contamos con una unidad de cuidados intensivos con 48 camas, soporte vital a cuidados coronarios y cuidados especiales en el paciente adulto, con enfermedad coronaria, paciente neonatal y pediátrico.
        </p>
        <p>
          Las unidades están dotadas con tecnología de punta para monitoreo de pacientes y es atendida las 24 horas del día por un equipo interdisciplinario entrenado para manejar pacientes en estado crítico.
        </p>
      </>
    ),
    'Departamento de Medicina Crítica': (
      <p>
        Esta unidad especializada brinda cuidados críticos de un grupo interdisciplinario de internistas, cardiólogo, neumólogo y nefrólogo intensivista.
      </p>
    ),
    'Unidad Coronaria': (
      <p>
        Es una unidad enfocada hacia una de las patologías más comunes en la actualidad a nivel mundial como lo es la enfermedad coronaria.
      </p>
    ),
    'Unidad de Cuidados Intensivos Adultos': (
      <p>
        Nuestra unidad de cuidados intensivos cuenta con catorce camas, soporte vital a cuidados coronarios y cuidados especiales. La unidad está dotada con tecnología de punta para monitoreo de pacientes y es atendida las 24 horas del día por un equipo interdisciplinario entrenado para manejar pacientes en estado crítico.
      </p>
    ),
    'UCI Neonatal y Pediátrica': (
      <p>
        La unidad de cuidados intensivos neonatal y pediátrica es atendida las 24 horas del día por un equipo altamente calificado de intensivistas neonatales, médicos generales y enfermeras entrenados en el manejo de este tipo de pacientes.
      </p>
    ),
  };

  return (
    <>
      <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Cuidado Crítico">
        {/* sidebar-page-container */}
        <section className="sidebar-page-container sec-pad-2">
          <div className="auto-container">
            <div className="row clearfix">
              {/* Menú lateral */}
              <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
                <div className="blog-sidebar default-sidebar mr_10">
                  <div className="sidebar-widget category-widget">
                    <div className="widget-title">
                      <h3>Servicios</h3>
                    </div>
                    <div className="widget-content">
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
                  {/* Puedes agregar más widgets aquí si lo deseas */}
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
                  {/* Puedes agregar más bloques de contenido aquí si lo deseas */}
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

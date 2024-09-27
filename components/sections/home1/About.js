import Link from 'next/link';
import React from 'react';

export default function about() {
  return (
    <section className="about-section pt_120 pb_120 bg-color-1">
      <div className="pattern-layer">
        <div className="pattern-1 rotate-me" style={{ backgroundImage: 'url(assets/images/shape/shape-8.png)' }}></div>
        <div className="pattern-2 rotate-me" style={{ backgroundImage: 'url(assets/images/shape/shape-8.png)' }}></div>
        <div className="pattern-3 rotate-me" style={{ backgroundImage: 'url(assets/images/shape/shape-9.png)' }}></div>
        <div className="pattern-4" style={{ backgroundImage: 'url(assets/images/shape/shape-10.png)' }}></div>
        <div className="pattern-5" style={{ backgroundImage: 'url(assets/images/shape/shape-11.png)' }}></div>
      </div>
      <div className="auto-container">
        <div className="row clearfix">
          <div className="col-lg-6 col-md-12 col-sm-12 image-column">
            <div className="image_block_one">
              <div className="image-box">
                <div className="shape float-bob-x" style={{ backgroundImage: 'url(assets/images/shape/shape-7.png)' }}></div>
                <figure className="image"><img src="assets/images/resource/medicos.jpg" alt="" /></figure>
                <div className="icon-one"><i className="icon-13"></i></div>
                <div className="icon-two"><i className="icon-14"></i></div>
                <div className="text-box">
                  <h3>Clínica de la Costa</h3>
                  <span>Especialistas en Salud</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 content-column">
            <div className="content_block_one">
              <div className="content-box ml_30">
                <div className="sec-title mb_15">
                  <span className="sub-title">Sobre Nosotros</span>
                  <h2>Servicios Médicos y Diagnósticos</h2>
                </div>
                <div className="text-box mb_40">
                  <h6>Comprometidos con brindar servicios médicos y diagnósticos de alta calidad.</h6>
                  <p>En la Clínica de la Costa, ofrecemos una gama completa de servicios médicos especializados, con atención personalizada y tecnología avanzada.</p>
                  <ul className="list-style-one clearfix">
                    <li>Servicios de Ambulancia</li>
                    <li>Oxígeno a Domicilio</li>
                    <li>Farmacia en Clínica</li>
                    <li>Médicos de Guardia</li>
                    <li>Emergencias Médicas 24/7</li>
                  </ul>
                </div>
                <div className="btn-box">
                  <Link href="/services" className="theme-btn btn-one"><span>Descubre Más</span></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

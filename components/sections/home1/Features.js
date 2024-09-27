import Link from 'next/link';
import React from 'react';

export default function feature() {
  return (
    <section className="feature-section pt_120 pb_90">
      <div className="shape" style={{ backgroundImage: 'url(assets/images/shape/shape-6.png)' }}></div>
      <div className="auto-container">
        <div className="row clearfix">
          <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
            <div className="feature-block-one">
              <div className="inner-box" style={{ minHeight: '250px' }}>
                <div className="icon-box"><i className="icon-9"></i></div>
                <h3><Link href="/">Médicos Especialistas</Link></h3>
                <p>Contamos con un equipo de médicos altamente capacitados en diversas especialidades.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
            <div className="feature-block-one">
              <div className="inner-box" style={{ minHeight: '250px' }}>
                <div className="icon-box"><i className="icon-10"></i></div>
                <h3><Link href="/">Atención de Urgencias</Link></h3>
                <p>Servicio de urgencias disponible las 24 horas del día, los 7 días de la semana.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
            <div className="feature-block-one">
              <div className="inner-box" style={{ minHeight: '250px' }}>
                <div className="icon-box"><i className="icon-11"></i></div>
                <h3><Link href="/">Equipos Modernos</Link></h3>
                <p>Utilizamos la tecnología más avanzada en nuestros diagnósticos y tratamientos.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
            <div className="feature-block-one">
              <div className="inner-box" style={{ minHeight: '250px' }}>
                <div className="icon-box"><i className="icon-12"></i></div>
                <h3><Link href="/">Medicina Familiar</Link></h3>
                <p>Ofrecemos atención integral para toda la familia, enfocada en la prevención y cuidado de la salud.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

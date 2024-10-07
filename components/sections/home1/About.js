import Link from 'next/link';
import React from 'react';

export default function About() {
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
                <figure className="image"><img src="assets/images/resource/pacientesatendidos.webp" alt="Equipo médico de la Clínica de la Costa" /></figure>
                <div className="icon-one"><i className="icon-13"></i></div>
                <div className="icon-two"><i className="icon-14"></i></div>
                <div className="text-box">
                  <h3>Clínica de la Costa</h3>
                  <span>Comprometidos con Tu Bienestar</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 content-column">
            <div className="content_block_one">
              <div className="content-box ml_30">
                <div className="sec-title mb_15">
                  <span className="sub-title">Sobre Nosotros</span>
                  <h2>Comprometidos con tu Salud y Bienestar</h2>
                </div>
                <div className="text-box mb_40">
                  <h6>En la Clínica de la Costa, cuidamos de ti como si fueras parte de nuestra familia.</h6>
                  <p>Nos enfocamos en brindarte una atención humana y cercana, respaldada por tecnología avanzada y un equipo de profesionales comprometidos con tu salud. Desde servicios médicos especializados hasta atención de emergencias, estamos aquí para acompañarte en cada paso del camino.</p>
                  <ul className="list-style-one clearfix">
                    <li>Servicios de Ambulancia disponibles para emergencias</li>
                    <li>Oxígeno a Domicilio para tu comodidad</li>
                    <li>Farmacia en Clínica para mayor conveniencia</li>
                    <li>Médicos de Guardia siempre listos para atenderte</li>
                    <li>Emergencias Médicas 24/7 porque tu bienestar es nuestra prioridad</li>
                  </ul>
                </div>
                <div className="btn-box">
                  <Link href="/appointment"  className="theme-btn btn-one"><span>Descubre Más Sobre Nosotros</span></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
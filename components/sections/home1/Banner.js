import React from 'react';
import Link from "next/link";

export default function Banner() {
  return (
    <section className="banner-section p_relative" style={{ padding: '160px 0', marginTop: '80px' }}>
      <div className="pattern-layer wow slideInDown animated" data-wow-delay="00ms" data-wow-duration="1500ms" style={{ backgroundImage: 'url(assets/images/shape/shape-1.png)' }}></div>
      <div className="shape">
        <div className="shape-1" style={{ backgroundImage: 'url(assets/images/shape/shape-2.png)' }}></div>
        <div className="shape-2 float-bob-x" style={{ backgroundImage: 'url(assets/images/shape/shape-3.png)' }}></div>
        <div className="shape-3" style={{ backgroundImage: 'url(assets/images/shape/shape-4.png)' }}></div>
        <div className="shape-4" style={{ backgroundImage: 'url(assets/images/shape/shape-5.png)' }}></div>
      </div>
      <div className="auto-container">
        <div className="row align-items-center">
          {/* Contenido del Banner */}
          <div className="col-lg-5 col-md-12 col-sm-12 content-column">
            <div className="content-box">
              <span className="upper-text" style={{ fontSize: '18px' }}>Cuidando de Ti y de los Tuyos</span>
              <h2 style={{ fontSize: '36px', lineHeight: '1.3em' }}>Tu Salud, Nuestra <span>Prioridad</span> por 35 Años</h2>
              <p style={{ fontSize: '16px', lineHeight: '1.5em', maxWidth: '400px' }}>En la Clínica de la Costa, sabemos lo importante que es sentirte acompañado en los momentos que más lo necesitas. Nuestro equipo está comprometido con brindarte una atención cálida, humana y personalizada, asegurándonos de que te sientas en un entorno seguro y lleno de confianza.</p>
              <div className="btn-box">
                <Link href="/appointment" className="theme-btn btn-two"><span>Agenda tu cita</span></Link>
              </div>
            </div>
          </div>

          {/* Imagen del Banner */}
          <div className="col-lg-7 col-md-12 col-sm-12 image-column">
            <div className="image-box">
              <figure className="image float-bob-y" style={{ maxWidth: '100%', height: 'auto' }}><img src="assets/images/banner/banner.webp" alt="Paciente recibiendo atención y cuidado" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} /></figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
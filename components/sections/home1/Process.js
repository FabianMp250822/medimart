import React from 'react';

export default function Process() {
  return (
    <section className="process-section sec-pad" style={{ padding: '100px 0', textAlign: 'center' }}>
      <div className="pattern-layer" style={{ backgroundImage: 'url(assets/images/shape/shape-19.png)' }}></div>
      <div className="shape">
        <div className="shape-1 float-bob-x" style={{ backgroundImage: 'url(assets/images/shape/shape-20.png)' }}></div>
        <div className="shape-2 float-bob-y" style={{ backgroundImage: 'url(assets/images/shape/shape-15.png)' }}></div>
        <div className="shape-3"></div>
      </div>
      <div className="auto-container">
        <div className="sec-title mb_50 centred">
          <span className="sub-title">Nuestro Proceso</span>
          <h2>Fácil y Rápido: Cómo Te Atendemos</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '18px' }}>En la Clínica de la Costa hacemos que tu atención sea sencilla y eficiente. Conoce nuestro proceso diseñado para brindarte el mejor apoyo de manera fácil y rápida.</p>
        </div>
        <div className="inner-container">
          <div className="arrow-shape" style={{ backgroundImage: 'url(assets/images/shape/shape-18.png)' }}></div>
          
          {/* Paso 1: Agendar una Cita */}
          <div className="processing-block-one wow fadeInLeft animated" data-wow-delay="00ms" data-wow-duration="1500ms">
            <div className="inner-box">
              <span className="count-text">01</span>
              <figure className="image-box"><img src="assets/images/banner/paceinte22.webp" alt="Agendar Cita" style={{ borderRadius: '10px' }} /></figure>
              <div className="lower-content">
                <h3>Agendar una Cita</h3>
                <p>Programar tu cita es rápido y sencillo. Contáctanos a través de nuestro sitio web, llamada telefónica o visítanos presencialmente.</p>
              </div>
            </div>
          </div>
          
          {/* Paso 2: Consulta y Examen Médico */}
          <div className="processing-block-one wow fadeInLeft animated" data-wow-delay="150ms" data-wow-duration="1500ms">
            <div className="inner-box">
              <span className="count-text">02</span>
              <figure className="image-box"><img src="assets/images/resource/consulta22.webp" alt="Consulta Médica" style={{ borderRadius: '10px' }} /></figure>
              <div className="lower-content">
                <h3>Asiste a tu cita</h3>
                <p>Recibe atención de nuestros especialistas en un ambiente cómodo y seguro, donde todas tus dudas serán resueltas con empatía y profesionalismo.</p>
              </div>
            </div>
          </div>
          
          {/* Paso 3: Seguimiento Continuo */}
          <div className="processing-block-one wow fadeInLeft animated" data-wow-delay="300ms" data-wow-duration="1500ms">
            <div className="inner-box">
              <span className="count-text">03</span>
              <figure className="image-box"><img src="assets/images/banner/medico22.webp" alt="Seguimiento y Bienestar" style={{ borderRadius: '10px' }} /></figure>
              <div className="lower-content">
                <h3>Seguimiento Continuo</h3>
                <p>Nos aseguramos de que recibas un seguimiento constante para mantener y mejorar tu salud, acompañándote en cada paso del camino.</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
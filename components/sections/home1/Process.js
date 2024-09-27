import React from 'react';

export default function Process() {
  return (
    <section className="process-section sec-pad">
      <div className="pattern-layer" style={{ backgroundImage: 'url(assets/images/shape/shape-19.png)' }}></div>
      <div className="shape">
        <div className="shape-1 float-bob-x" style={{ backgroundImage: 'url(assets/images/shape/shape-20.png)' }}></div>
        <div className="shape-2 float-bob-y" style={{ backgroundImage: 'url(assets/images/shape/shape-15.png)' }}></div>
        <div className="shape-3"></div>
      </div>
      <div className="auto-container">
        <div className="sec-title mb_50 centred">
          <span className="sub-title">Proceso</span>
          <h2>Cómo te ayudamos a <br />mantener tu salud</h2>
        </div>
        <div className="inner-container">
          <div className="arrow-shape" style={{ backgroundImage: 'url(assets/images/shape/shape-18.png)' }}></div>
          
          {/* Step 1: Request an Appointment */}
          <div className="processing-block-one wow fadeInLeft animated" data-wow-delay="00ms" data-wow-duration="1500ms">
            <div className="inner-box">
              <span className="count-text">01</span>
              <figure className="image-box"><img src="assets/images/resource/process-1.jpg" alt="Agendar Cita" /></figure>
              <div className="lower-content">
                <h3>Agendar Cita</h3>
                <p>Contacta con nosotros para programar una cita a través de nuestro sitio web, por teléfono o visita presencial.</p>
              </div>
            </div>
          </div>
          
          {/* Step 2: Consultation and Check-Up */}
          <div className="processing-block-one wow fadeInLeft animated" data-wow-delay="300ms" data-wow-duration="1500ms">
            <div className="inner-box">
              <span className="count-text">02</span>
              <figure className="image-box"><img src="assets/images/resource/process-2.jpg" alt="Consulta Médica" /></figure>
              <div className="lower-content">
                <h3>Consulta y Examen</h3>
                <p>Visita a nuestros especialistas en Clínica de la Costa para recibir una atención médica integral y personalizada.</p>
              </div>
            </div>
          </div>
          
          {/* Step 3: Health Follow-Up */}
          <div className="processing-block-one wow fadeInLeft animated" data-wow-delay="600ms" data-wow-duration="1500ms">
            <div className="inner-box">
              <span className="count-text">03</span>
              <figure className="image-box"><img src="assets/images/resource/process-3.jpg" alt="Disfruta de una vida saludable" /></figure>
              <div className="lower-content">
                <h3>Seguimiento y Bienestar</h3>
                <p>Recibe un seguimiento continuo de tu salud para mantener un bienestar óptimo a largo plazo.</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

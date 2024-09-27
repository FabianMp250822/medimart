import React from 'react';
import Link from "next/link";

export default function Banner() {
  return (
    <section className="banner-section p_relative">
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
          <div className="col-lg-6 col-md-12 col-sm-12 content-column">
            <div className="content-box">
              <span className="upper-text">Cuidado médico de calidad</span>
              <h2>35 Años <span>Cuidando</span> de tu Salud</h2>
              <p>La Clínica de la Costa, la más avanzada de la región, brinda atención médica especializada con tecnología de punta, enfocada en el bienestar integral de nuestros pacientes.</p>
              <div className="btn-box">
                <Link href="/servicios" className="theme-btn btn-two"><span>Explora Nuestros Servicios</span></Link>
              </div>
            </div>
          </div>

          {/* Imagen del Banner */}
          <div className="col-lg-6 col-md-12 col-sm-12 image-column">
            <div className="image-box">
              <figure className="image float-bob-y"><img src="assets/images/banner/inical2.jpg" alt="" /></figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';
import React from 'react';

export default function ChooseUs() {
  return (
    <section className="chooseus-section">
      <div className="bg-layer" style={{ backgroundImage: 'url(assets/images/background/whois.jpg)' }}></div>
      <div className="pattern-layer" style={{ backgroundImage: 'url(assets/images/shape/shape-12.png)' }}></div>
      <div className="auto-container">
        <div className="row clearfix">
          <div className="col-lg-8 col-md-12 col-sm-12 content-column">
            <div className="content-box">
              <div className="sec-title light mb_50">
                <span className="sub-title">¿Por qué Elegirnos?</span>
                <h2>Tu Salud es Nuestra <br /> Mayor Prioridad</h2>
              </div>
              <div className="row clearfix">
                {/* Personal Médico Profesional */}
                <div className="col-lg-6 col-md-6 col-sm-12 chooseus-block">
                  <div className="chooseus-block-one">
                    <div className="inner-box">
                      <div className="icon-box"><i className="icon-18"></i></div>
                      <h3>Personal Médico Comprometido</h3>
                      <p>Nuestro equipo está formado por médicos y especialistas apasionados por cuidarte, ofreciendo un trato cercano y humano para que te sientas en confianza.</p>
                    </div>
                  </div>
                </div>
                {/* Atención de Emergencias */}
                <div className="col-lg-6 col-md-6 col-sm-12 chooseus-block">
                  <div className="chooseus-block-one">
                    <div className="inner-box">
                      <div className="icon-box"><i className="icon-21"></i></div>
                      <h3>Atención de Emergencias 24/7</h3>
                      <p>Sabemos que los momentos de emergencia no esperan. Estamos disponibles las 24 horas, siempre listos para ayudarte cuando más lo necesitas.</p>
                    </div>
                  </div>
                </div>
                {/* Citas en Línea */}
                <div className="col-lg-6 col-md-6 col-sm-12 chooseus-block">
                  <div className="chooseus-block-one">
                    <div className="inner-box">
                      <div className="icon-box"><i className="icon-19"></i></div>
                      <h3>Citas Médicas en Línea</h3>
                      <p>Queremos que acceder a nuestra atención sea lo más cómodo para ti. Agenda tus citas fácilmente desde la comodidad de tu hogar.</p>
                    </div>
                  </div>
                </div>
                {/* Servicios 24/7 */}
                <div className="col-lg-6 col-md-6 col-sm-12 chooseus-block">
                  <div className="chooseus-block-one">
                    <div className="inner-box">
                      <div className="icon-box"><i className="icon-20"></i></div>
                      <h3>Atención Continuada</h3>
                      <p>Estamos aquí para ti siempre que nos necesites. Nuestros servicios están disponibles 24/7, porque tu bienestar es nuestra prioridad.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
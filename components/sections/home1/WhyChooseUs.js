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
                <h2>Elige lo Mejor Para Tu <br /> Salud</h2>
              </div>
              <div className="row clearfix">
                {/* Professional Staff */}
                <div className="col-lg-6 col-md-6 col-sm-12 chooseus-block">
                  <div className="chooseus-block-one">
                    <div className="inner-box">
                      <div className="icon-box"><i className="icon-18"></i></div>
                      <h3>Personal Médico Profesional</h3>
                      <p>Contamos con un equipo de médicos y especialistas altamente calificados para brindarte una atención de calidad.</p>
                    </div>
                  </div>
                </div>
                {/* Emergency Case */}
                <div className="col-lg-6 col-md-6 col-sm-12 chooseus-block">
                  <div className="chooseus-block-one">
                    <div className="inner-box">
                      <div className="icon-box"><i className="icon-21"></i></div>
                      <h3>Atención de Emergencias</h3>
                      <p>Ofrecemos atención de emergencias las 24 horas, los 7 días de la semana, con un equipo preparado para cualquier situación.</p>
                    </div>
                  </div>
                </div>
                {/* Online Appointment */}
                <div className="col-lg-6 col-md-6 col-sm-12 chooseus-block">
                  <div className="chooseus-block-one">
                    <div className="inner-box">
                      <div className="icon-box"><i className="icon-19"></i></div>
                      <h3>Citas en Línea</h3>
                      <p>Puedes agendar tus citas médicas de manera fácil y rápida a través de nuestra plataforma en línea.</p>
                    </div>
                  </div>
                </div>
                {/* 24/7 Services */}
                <div className="col-lg-6 col-md-6 col-sm-12 chooseus-block">
                  <div className="chooseus-block-one">
                    <div className="inner-box">
                      <div className="icon-box"><i className="icon-20"></i></div>
                      <h3>Servicios 24/7</h3>
                      <p>Nuestros servicios médicos están disponibles las 24 horas del día para ofrecerte la mejor atención en todo momento.</p>
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

import Link from 'next/link';
import React from 'react';

export default function Service() {
  return (
    <section className="service-section sec-pad">
      <div className="auto-container">
        <div className="sec-title mb_50 centred">
          <span className="sub-title">Nuestros Servicios</span>
          <h2>Atención Integral <br />Cuidando de Ti Siempre</h2>
        </div>
        <div className="row clearfix">
          {/* Servicio 1: Neurocirugía */}
          <div className="col-lg-4 col-md-6 col-sm-12 service-block">
            <div className="service-block-one wow fadeInUp animated" data-wow-delay="00ms" data-wow-duration="1500ms">
              <div className="inner-box">
                <div className="image-box">
                  <figure className="image">
                    <Link href="service-details-3">
                      <img src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%204.42.37%20PM(1).jpeg?alt=media&token=a0535648-1f07-4a43-87c1-8901f530dd94" alt="Neurocirugía" />
                    </Link>
                  </figure>
                  <div className="icon-box"><i className="icon-15"></i></div>
                </div>
                <div className="lower-content">
                  <h3><Link href="service-details-3">Neurocirugía</Link></h3>
                  <p>Nos preocupamos por tu salud cerebral con un equipo de neurocirujanos altamente calificados, siempre listos para brindarte el mejor cuidado posible.</p>
                </div>
              </div>
            </div>
          </div>
          {/* Servicio 2: Laboratorio Moderno */}
          <div className="col-lg-4 col-md-6 col-sm-12 service-block">
            <div className="service-block-one wow fadeInUp animated" data-wow-delay="300ms" data-wow-duration="1500ms">
              <div className="inner-box">
                <div className="image-box">
                  <figure className="image">
                    <Link href="service-details-6">
                      <img src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%204.42.37%20PM.jpeg?alt=media&token=0073f503-653b-4326-907b-665688257340" alt="Laboratorio Moderno" />
                    </Link>
                  </figure>
                  <div className="icon-box"><i className="icon-16"></i></div>
                </div>
                <div className="lower-content">
                  <h3><Link href="service-details-6">Laboratorio Moderno</Link></h3>
                  <p>Entendemos lo importante que es un diagnóstico preciso. Nuestro laboratorio está equipado con la última tecnología para brindarte resultados rápidos y confiables.</p>
                </div>
              </div>
            </div>
          </div>
          {/* Servicio 3: Médicos Experimentados */}
          <div className="col-lg-4 col-md-6 col-sm-12 service-block">
            <div className="service-block-one wow fadeInUp animated" data-wow-delay="600ms" data-wow-duration="1500ms">
              <div className="inner-box">
                <div className="image-box">
                  <figure className="image">
                    <Link href="service-details">
                      <img src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%205.16.32%20PM.jpeg?alt=media&token=e4b6c4cb-586f-49e9-b5f9-9d73d30a01f8" alt="Médicos Experimentados" />
                    </Link>
                  </figure>
                  <div className="icon-box"><i className="icon-17"></i></div>
                </div>
                <div className="lower-content">
                  <h3><Link href="service-details">Médicos Experimentados</Link></h3>
                  <p>Nuestros médicos están aquí para escucharte, cuidarte y acompañarte, ofreciendo un enfoque cálido y humano para garantizar tu bienestar.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
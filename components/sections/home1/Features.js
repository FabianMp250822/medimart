import Link from 'next/link';
import React from 'react';

export default function Feature() {
  return (
    <section className="feature-section pt_120 pb_90">
      <div className="shape" style={{ backgroundImage: 'url(assets/images/shape/shape-6.png)' }}></div>
      <div className="auto-container">
        <div className="row clearfix">
          <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
            <div className="feature-block-one" style={{ height: '100%' }}>
              <div className="inner-box" style={{ height: '100%' }}>
                <div className="icon-box"><i className="icon-9"></i></div>
                <h3><Link href="/">Atención Personalizada</Link></h3>
                <p>Nos importa tu bienestar. Nuestros especialistas están aquí para escucharte, entenderte y brindarte el cuidado que realmente necesitas, siempre con calidez y empatía.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
            <div className="feature-block-one" style={{ height: '100%' }}>
              <div className="inner-box" style={{ height: '100%' }}>
                <div className="icon-box"><i className="icon-10"></i></div>
                <h3><Link href="/">Urgencias Disponibles 24/7</Link></h3>
                <p>Sabemos que las emergencias no esperan. Estamos aquí para ti, día y noche, para asegurarnos de que recibas la atención que necesitas cuando más la necesitas.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
            <div className="feature-block-one" style={{ height: '100%' }}>
              <div className="inner-box" style={{ height: '100%' }}>
                <div className="icon-box"><i className="icon-11"></i></div>
                <h3><Link href="/">Cuidado con Tecnología Avanzada</Link></h3>
                <p>Tu salud merece lo mejor. Utilizamos tecnología de última generación para ofrecerte diagnósticos y tratamientos precisos, siempre enfocados en tu bienestar.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
            <div className="feature-block-one" style={{ height: '100%' }}>
              <div className="inner-box" style={{ height: '100%' }}>
                <div className="icon-box"><i className="icon-12"></i></div>
                <h3><Link href="/">Atención para Toda la Familia</Link></h3>
                <p>Nos preocupamos por cada miembro de tu familia. Ofrecemos un cuidado integral que promueve la salud y el bienestar de todos, desde los más pequeños hasta los mayores.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
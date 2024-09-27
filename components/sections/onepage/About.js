import Link from 'next/link';
import React from 'react';

export default function About() {
  return (
    <section className="about-section pt_120 pb_120 bg-color-1" id="about">
      <div className="pattern-layer">
        <div className="pattern-1 rotate-me" style={{ backgroundImage: 'url(assets/images/shape/shape-8.png)' }}></div>
        <div className="pattern-2 rotate-me" style={{ backgroundImage: 'url(assets/images/shape/shape-8.png)' }}></div>
        <div className="pattern-3 rotate-me" style={{ backgroundImage: 'url(assets/images/shape/shape-9.png)' }}></div>
        <div className="pattern-4" style={{ backgroundImage: 'url(assets/images/shape/shape-10.png)' }}></div>
        <div className="pattern-5" style={{ backgroundImage: 'url(assets/images/shape/shape-11.png)' }}></div>
      </div>
      <div className="auto-container">
        <div className="row clearfix">
          {/* Imagen */}
          <div className="col-lg-6 col-md-12 col-sm-12 image-column">
            <div className="image_block_one">
              <div className="image-box">
                <div className="shape float-bob-x" style={{ backgroundImage: 'url(assets/images/shape/shape-7.png)' }}></div>
                <figure className="image">
                  <img src="assets/images/resource/about-clinica.jpg" alt="Clínica de la Costa" />
                </figure>
                <div className="icon-one"><i className="icon-13"></i></div>
                <div className="icon-two"><i className="icon-14"></i></div>
                <div className="text-box">
                  <h3>Clínica de la Costa</h3>
                  <span>Profesionales a tu servicio</span>
                </div>
              </div>
            </div>
          </div>
          {/* Contenido */}
          <div className="col-lg-6 col-md-12 col-sm-12 content-column">
            <div className="content_block_one">
              <div className="content-box ml_30">
                <div className="sec-title mb_15">
                  <span className="sub-title">Sobre Nosotros</span>
                  <h2>Bienvenidos a la Clínica de la Costa</h2>
                </div>
                <div className="text-box mb_40">
                  <h6>Seguimos trabajando con el corazón para garantizar la excelencia en todo lo que hacemos.</h6>
                  <p>
                    <strong>¿Quiénes somos?</strong><br />
                    La Clínica de la Costa Ltda. está ubicada en el tradicional barrio Alto Prado, uno de los sectores de salud más reconocidos de la Región Caribe Colombiana. Ofrecemos amplios parqueaderos y estamos rodeados de importantes vías de acceso, cercanos a los mejores hoteles y centros comerciales de la ciudad.
                  </p>
                  <p>
                    <strong>Misión</strong><br />
                    En la Clínica de la Costa nos dedicamos a brindar servicios de salud con excelencia y seguridad, promoviendo el desarrollo académico y la investigación.
                  </p>
                  <p>
                    <strong>Visión</strong><br />
                    Aspiramos a ser líderes en la prestación de servicios de salud en la región Caribe, reconocidos por nuestros altos estándares de calidad y enfoque en la atención integral de nuestros usuarios, basados en la innovación y generación de conocimiento.
                  </p>
                </div>
                <div className="btn-box">
                  <Link href="/contacto" className="theme-btn btn-one"><span>Contáctanos</span></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

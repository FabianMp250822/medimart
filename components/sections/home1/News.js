import React from 'react';
import Link from "next/link";

export default function News() {
  return (
    <section className="news-section sec-pad bg-color-1">
      <div className="auto-container">
        <div className="sec-title mb_50 centred">
          <span className="sub-title">Nuestro Blog</span>
          <h2>Consulta nuestros artículos más <br />recientes</h2>
        </div>
        <div className="row clearfix">
          {/* Post 1 */}
          <div className="col-lg-4 col-md-6 col-sm-12 news-block">
            <div className="news-block-one wow fadeInUp animated" data-wow-delay="00ms" data-wow-duration="1500ms">
              <div className="inner-box">
                <figure className="image-box">
                  <Link href="blog-details">
                    <img src="https://picsum.photos/300/200" alt="Post 1" />
                  </Link>
                </figure>
                <div className="lower-content">
                  <ul className="post-info mb_15 clearfix">
                    <li><Link href="blog-details">Admin</Link></li>
                    <li>05 Oct 2024</li>
                    <li>05 Comentarios</li>
                  </ul>
                  <h3><Link href="blog-details">Importancia de la Prevención en Cardiología</Link></h3>
                  <p>Descubre cómo los chequeos preventivos pueden salvar tu vida y mejorar tu salud cardiovascular.</p>
                  <div className="link">
                    <Link href="blog-details"><span>Leer más</span></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Post 2 */}
          <div className="col-lg-4 col-md-6 col-sm-12 news-block">
            <div className="news-block-one wow fadeInUp animated" data-wow-delay="300ms" data-wow-duration="1500ms">
              <div className="inner-box">
                <figure className="image-box">
                  <Link href="blog-details">
                    <img src="https://picsum.photos/300/201" alt="Post 2" />
                  </Link>
                </figure>
                <div className="lower-content">
                  <ul className="post-info mb_15 clearfix">
                    <li><Link href="blog-details">Admin</Link></li>
                    <li>01 Sep 2024</li>
                    <li>10 Comentarios</li>
                  </ul>
                  <h3><Link href="blog-details">Cómo el Ejercicio Mejora la Salud Mental</Link></h3>
                  <p>Explora los beneficios del ejercicio físico regular en la reducción de la ansiedad y el estrés.</p>
                  <div className="link">
                    <Link href="blog-details"><span>Leer más</span></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Post 3 */}
          <div className="col-lg-4 col-md-6 col-sm-12 news-block">
            <div className="news-block-one wow fadeInUp animated" data-wow-delay="600ms" data-wow-duration="1500ms">
              <div className="inner-box">
                <figure className="image-box">
                  <Link href="blog-details">
                    <img src="https://picsum.photos/300/202" alt="Post 3" />
                  </Link>
                </figure>
                <div className="lower-content">
                  <ul className="post-info mb_15 clearfix">
                    <li><Link href="blog-details">Admin</Link></li>
                    <li>15 Ago 2024</li>
                    <li>02 Comentarios</li>
                  </ul>
                  <h3><Link href="blog-details">Avances en el Tratamiento del Cáncer</Link></h3>
                  <p>Una mirada a las innovaciones más recientes en la oncología y sus implicaciones para los pacientes.</p>
                  <div className="link">
                    <Link href="blog-details"><span>Leer más</span></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

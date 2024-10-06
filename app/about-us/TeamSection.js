import Link from "next/link";
import React from "react";

export default function TeamSection() {
  return (
    <section className="team-section sec-pad centred bg-color-1">
      <div className="shape">
        <div
          className="shape-1 float-bob-y"
          style={{ backgroundImage: "url(assets/images/shape/shape-15.png)" }}
        ></div>
        <div className="shape-2"></div>
        <div
          className="shape-3 float-bob-x"
          style={{ backgroundImage: "url(assets/images/shape/shape-16.png)" }}
        ></div>
      </div>
      <div className="auto-container">
        <div className="sec-title mb_50">
          <span className="sub-title">Nuestro Equipo</span>
          <h2>Conoce a nuestros especialistas para el mejor tratamiento</h2>
        </div>
        <div className="row clearfix">
          {/* Miembro del Equipo 1: Dr. Gustavo Aroca Martínez */}
          <div className="col-lg-3 col-md-6 col-sm-12 team-block">
            <div
              className="team-block-one wow fadeInUp animated"
              data-wow-delay="00ms"
              data-wow-duration="1500ms"
            >
              <div className="inner-box">
                <div className="image-box">
                  <figure className="image">
                    <img
                      src="assets/images/team/aroca.jpg"
                      alt="Dr. Gustavo Aroca Martínez"
                      style={{
                        width: '100%',
                        height: '300px', // Puedes ajustar la altura según tus necesidades
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                    />
                  </figure>
                </div>
                <div className="lower-content">
                  <h3>
                    <Link href="team-details/">Dr. Gustavo Aroca Martínez</Link>
                  </h3>
                  <span className="designation">Especialista en Reumatología</span>
                </div>
              </div>
            </div>
          </div>

          {/* Miembro del Equipo 2: Dr. Alberto José Cadena Bonfanti */}
          <div className="col-lg-3 col-md-6 col-sm-12 team-block">
            <div
              className="team-block-one wow fadeInUp animated"
              data-wow-delay="200ms"
              data-wow-duration="1500ms"
            >
              <div className="inner-box">
                <div className="image-box">
                  <figure className="image">
                    <img
                      src="assets/images/team/alberto.jpg"
                      alt="Dr. Alberto José Cadena Bonfanti"
                      style={{
                        width: '100%',
                        height: '300px',
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                    />
                  </figure>
                </div>
                <div className="lower-content">
                  <h3>
                    <Link href="team-details/">Dr. Alberto José Cadena Bonfanti</Link>
                  </h3>
                  <span className="designation">Especialista en Cardiología</span>
                </div>
              </div>
            </div>
          </div>

          {/* Miembro del Equipo 3: Dr. Andrés Angelo Cadena Bonfanti */}
          <div className="col-lg-3 col-md-6 col-sm-12 team-block">
            <div
              className="team-block-one wow fadeInUp animated"
              data-wow-delay="400ms"
              data-wow-duration="1500ms"
            >
              <div className="inner-box">
                <div className="image-box">
                  <figure className="image">
                    <img
                      src="assets/images/team/andres.jpeg"
                      alt="Dr. Andrés Angelo Cadena Bonfanti"
                      style={{
                        width: '100%',
                        height: '300px',
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                    />
                  </figure>
                </div>
                <div className="lower-content">
                  <h3>
                    <Link href="team-details/">Dr. Andrés Angelo Cadena Bonfanti</Link>
                  </h3>
                  <span className="designation">Especialista en Dermatología</span>
                </div>
              </div>
            </div>
          </div>

          {/* Miembro del Equipo 4: Dra. Carmen Alcalá Castro */}
          <div className="col-lg-3 col-md-6 col-sm-12 team-block">
            <div
              className="team-block-one wow fadeInUp animated"
              data-wow-delay="600ms"
              data-wow-duration="1500ms"
            >
              <div className="inner-box">
                <div className="image-box">
                  <figure className="image">
                    <img
                      src="assets/images/team/carmen.png"
                      alt="Dra. Carmen Alcalá Castro"
                      style={{
                        width: '100%',
                        height: '300px',
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                    />
                  </figure>
                </div>
                <div className="lower-content">
                  <h3>
                    <Link href="team-details/">Dra. Carmen Alcalá Castro</Link>
                  </h3>
                  <span className="designation">Especialista en Medicina Interna</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

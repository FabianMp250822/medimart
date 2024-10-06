import React from 'react';
import Link from "next/link";

export default function Team() {
  const teamMembers = [
    { name: 'Dr. Gustavo Aroca Martínez', role: 'Internista, Nefrólogo', image: 'assets/images/team/aroca.jpg' },
    { name: 'Dr. Andrés Angelo Cadena Bonfant', role: 'Nefrólogo', image: 'assets/images/team/andres.jpeg' },
    { name: 'Dr. Alberto José Cadena Bonfanti', role: 'Cardiólogo', image: 'assets/images/team/alberto.jpg' },
    { name: 'Dra. Carmen Alcalá Castro', role: 'Oncóloga, Cuidados Paliativos', image: 'assets/images/team/carmen.png' },
  ];

  return (
    <section className="team-section sec-pad centred">
      <div className="pattern-layer">
        <div className="pattern-1" style={{ backgroundImage: 'url(assets/images/shape/shape-13.png)' }}></div>
        <div className="pattern-2" style={{ backgroundImage: 'url(assets/images/shape/shape-14.png)' }}></div>
      </div>
      <div className="shape">
        <div className="shape-1 float-bob-y" style={{ backgroundImage: 'url(assets/images/shape/shape-15.png)' }}></div>
        <div className="shape-2"></div>
        <div className="shape-3 float-bob-x" style={{ backgroundImage: 'url(assets/images/shape/shape-16.png)' }}></div>
      </div>
      <div className="auto-container">
        <div className="sec-title mb_50">
          <span className="sub-title">Nuestro Equipo</span>
          <h2>Conoce a Nuestro Equipo de Profesionales <br /> que Están Aquí para Ti</h2>
        </div>
        <div className="row clearfix">
          {teamMembers.map((member, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-sm-12 team-block">
              <div
                className="team-block-one wow fadeInUp animated"
                data-wow-delay={`${index * 200}ms`}
                data-wow-duration="1500ms"
              >
                <div className="inner-box">
                  <div className="image-box">
                    <figure className="image">
                      <img
                        src={member.image}
                        alt={`Foto de ${member.name}`}
                        style={{
                          width: '100%',
                          height: '300px',
                          objectFit: 'cover',
                          objectPosition: 'center',
                        }}
                      />
                    </figure>
                    <ul className="social-links clearfix">
                      <li>
                        <Link href="/#">
                          <i className="icon-4"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="/#">
                          <i className="icon-5"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="/#">
                          <i className="icon-6"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="/#">
                          <i className="icon-7"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="lower-content">
                    <h3>
                      <Link href="team-details">{member.name}</Link>
                    </h3>
                    <span className="designation">{member.role}</span>
                    <p>Estamos aquí para apoyarte y guiarte en tu proceso de salud, siempre brindándote una atención cercana y profesional.</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
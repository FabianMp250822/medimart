// app/team-details/[id]/page.js
'use client';
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation'; // Importar useParams desde next/navigation
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Layout from "@/components/layout/Layout";
import Link from "next/link";

// Componente de barra de progreso
const ProgressBar = ({ label, percent }) => (
    <div className="progress-box">
      <p>{label}</p>
      <div className="bar">
        <div className="bar-inner count-bar" style={{ width: `${percent}%` }}></div>
        <div className="count-text">{`${percent}%`}</div>
      </div>
    </div>
);

export default function TeamDetails() {
  const params = useParams();
  const { id } = params; // Obtener el ID desde los parámetros de la ruta
  const [researcher, setResearcher] = useState(null); // Estado para el investigador
  const [loading, setLoading] = useState(true); // Estado de carga

  // Obtener datos del investigador desde Firebase
  useEffect(() => {
    const fetchResearcher = async () => {
      try {
        if (!id) return; // Espera a que el ID esté disponible
        const docRef = doc(db, "researchers", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setResearcher(data.informacion_personal); // Establecer los datos del investigador
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error al obtener el investigador:", error);
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };

    fetchResearcher();
  }, [id]);


  // Si no se encuentra el investigador
  if (!researcher) {
    return <p>No se encontró el investigador.</p>;
  }

  return (
    <>
      <Layout headerStyle={2} footerStyle={1} breadcrumbTitle={researcher.nombre_completo}>
        <section className="team-details sec-pad-2">
          <div className="auto-container">
            <div className="team-details-content mb_50">
              <div className="row clearfix">
                <div className="col-lg-5 col-md-12 col-sm-12 image-column">
                  <figure className="image-box mr_15">
                    <img src={researcher.foto} alt={researcher.nombre_completo} />
                  </figure>
                </div>
                <div className="col-lg-7 col-md-12 col-sm-12 content-column">
                  <div className="content-box">
                    <h2>{researcher.nombre_completo}</h2>
                    <span className="designation">{researcher.nacionalidad}</span>
                    <p>Este es un profesional con experiencia en {researcher.lugar_nacimiento}.</p>
                    <ul className="info-list mb_30 clearfix">
                      <li><strong>Fecha de Nacimiento: </strong>{researcher.fecha_nacimiento}</li>
                      <li><strong>Email: </strong><Link href={`mailto:${researcher.email}`}>{researcher.email}</Link></li>
                      <li><strong>Teléfono: </strong><Link href={`tel:${researcher.telefono}`}>{researcher.telefono}</Link></li>
                    </ul>
                    <ul className="social-links clearfix">
                      <li><Link href="/"><i className="icon-4"></i></Link></li>
                      <li><Link href="/"><i className="icon-5"></i></Link></li>
                      <li><Link href="/"><i className="icon-6"></i></Link></li>
                      <li><Link href="/"><i className="icon-7"></i></Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Experiencia personal */}
            <div className="experience-details mb_50">
              <h2>Experiencia Personal</h2>
              <p>{researcher.experiencia || "Información no disponible."}</p>
            </div>

            {/* Sección de habilidades */}
            <div className="two-column">
              <div className="row clearfix">
                <div className="col-lg-6 col-md-6 col-sm-12 skills-column">
                  <div className="skills-box">
                    <div className="text-box mb_30">
                      <h2>Expertise & Skills</h2>
                      <p>Consectetur adipiscing elit. Semper sagittis dolor aliquet quam feugiat ultrices feugiat.</p>
                    </div>
                    <div className="progress-inner">
                      <ProgressBar label="Waste management" percent={85} />
                      <ProgressBar label="Recycling" percent={90} />
                      <ProgressBar label="Customer support" percent={80} />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 appointment-column">
                  <div className="appointment-inner">
                    <h2>Reserva una Cita</h2>
                    <form method="post" action="team-details" className="default-form">
                      <div className="row clearfix">
                        <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                          <input type="text" name="fname" placeholder="Nombre" required />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                          <input type="text" name="phone" placeholder="Número de Teléfono" required />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                          <input type="email" name="email" placeholder="Email" required />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                          <input type="text" name="subject" placeholder="Asunto" required />
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                          <textarea name="message" placeholder="Mensaje"></textarea>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
                          <button type="submit" className="theme-btn btn-one"><span>Enviar Mensaje</span></button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de suscripción */}
        <section className="subscribe-section">
          <div className="auto-container">
            <div className="inner-container">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-12 col-sm-12 text-column">
                  <div className="text-box">
                    <h2><span>Suscríbete</span> para recibir actualizaciones exclusivas!</h2>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 form-column">
                  <div className="form-inner">
                    <form method="post" action="contact">
                      <div className="form-group">
                        <input type="email" name="email" placeholder="Ingresa tu dirección de email" required />
                        <button type="submit" className="theme-btn btn-one"><span>Suscribirse Ahora</span></button>
                      </div>
                      <div className="form-group">
                        <div className="check-box">
                          <input className="check" type="checkbox" id="checkbox1" />
                          <label htmlFor="checkbox1">
                            Estoy de acuerdo con la <Link href="/">Política de Privacidad.</Link>
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

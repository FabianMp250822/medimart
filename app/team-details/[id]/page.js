'use client';

import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Layout from "@/components/layout/Layout";
import Link from "next/link";

// Componentes adicionales
const Loading = () => (
  <div className="loading">
    <p>Cargando...</p>
  </div>
);

const NotFound = () => (
  <div className="not-found">
    <p>No se encontró información del profesional.</p>
  </div>
);

const ProgressBar = ({ label, percent }) => (
  <div className="progress-box">
    <p>{label}</p>
    <div className="bar">
      <div className="bar-inner count-bar" style={{ width: `${percent}%` }}></div>
      <div className="count-text">{`${percent}%`}</div>
    </div>
  </div>
);

const MedicoInfo = ({ medico }) => {
  const imageUrl = medico.fotoPerfil || medico.profileImage || "https://via.placeholder.com/150";

  return (
    <div className="team-details-content mb_50">
      <div className="row clearfix">
        {/* Imagen del médico */}
        <div className="col-lg-5 col-md-12 col-sm-12 image-column">
          <figure className="image-box mr_15">
            <img src={imageUrl} alt={medico.nombreCompleto} />
          </figure>
        </div>

        {/* Información personal del médico */}
        <div className="col-lg-7 col-md-12 col-sm-12 content-column">
          <div className="content-box">
            <h2>{medico.nombreCompleto}</h2>
            <span className="designation">{medico.nacionalidad}</span>
            <p>
              {medico.descripcion || `Profesional con experiencia en ${medico.lugarNacimiento || "información no disponible"}.`}
            </p>

            {/* Sección de formación académica */}
            {medico.academicInfo && medico.academicInfo.length > 0 && (
              <Section
                title="Formación Académica"
                items={medico.academicInfo}
                renderItem={(academico, index) => (
                  <div key={index}>
                    <p><strong>{academico.gradoAcademico}</strong> - {academico.institucion} ({academico.anoGraduacion})</p>
                  </div>
                )}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, items, renderItem }) => (
  <div className="section mb_50">
    <h2>{title}</h2>
    {items.map(renderItem)}
  </div>
);

const SubscribeSection = () => (
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
                    <input className="check" type="checkbox" id="checkbox1" required />
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
);

export default function TeamDetails() {
  const { id } = useParams();
  const [medico, setMedico] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtener datos del médico desde Firebase
  useEffect(() => {
    const fetchMedico = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, "medicos", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setMedico(docSnap.data());
        } else {
          console.log("¡No se encontró el documento!");
          setMedico(null);
        }
      } catch (error) {
        console.error("Error al obtener los datos del médico:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedico();
  }, [id]);

  // Definimos el contenido principal basado en el estado de carga y si el médico existe
  let content;

  if (loading) {
    content = <Loading />;
  } else if (!medico) {
    content = <NotFound />;
  } else {
    content = (
      <>
        <section className="team-details sec-pad-2">
          <div className="auto-container">
            <MedicoInfo medico={medico} />

            {/* Sección de experiencia profesional */}
            {medico.professionalExperience && medico.professionalExperience.length > 0 && (
              <Section
                title="Experiencia Profesional"
                items={medico.professionalExperience}
                renderItem={(experiencia, index) => (
                  <div key={index}>
                    <p><strong>{experiencia.posicion}</strong> - {experiencia.institucionTrabajo} ({experiencia.fechaInicio} - {experiencia.fechaFin || "Actualidad"})</p>
                  </div>
                )}
              />
            )}

            {/* Sección de certificaciones */}
            {medico.certifications && medico.certifications.length > 0 && (
              <Section
                title="Certificaciones"
                items={medico.certifications}
                renderItem={(certificacion, index) => (
                  <div key={index}>
                    <p><strong>{certificacion.curso}</strong> - {certificacion.ubicacion} ({certificacion.ano})</p>
                  </div>
                )}
              />
            )}

            {/* Sección de publicaciones */}
            {medico.publications && medico.publications.length > 0 && (
              <Section
                title="Publicaciones"
                items={medico.publications}
                renderItem={(publicacion, index) => (
                  <div key={index}>
                    <p><strong>{publicacion.titulo}</strong> - {publicacion.fecha}</p>
                  </div>
                )}
              />
            )}

            {/* Sección de premios */}
            {medico.awards && medico.awards.length > 0 && (
              <Section
                title="Premios"
                items={medico.awards}
                renderItem={(premio, index) => (
                  <div key={index}>
                    <p><strong>{premio.titulo}</strong> - {premio.fecha}</p>
                  </div>
                )}
              />
            )}

            {/* Sección de habilidades */}
            {medico.habilidades && medico.habilidades.length > 0 && (
              <Section
                title="Habilidades"
                items={medico.habilidades}
                renderItem={(habilidad, index) => (
                  <ProgressBar label={habilidad.nombre} percent={habilidad.nivel || 80} key={index} />
                )}
              />
            )}
          </div>
        </section>

        {/* Sección de suscripción */}
        <SubscribeSection />
      </>
    );
  }

  // Retornamos el componente Layout con el contenido adecuado
  return (
    <Layout headerStyle={1} footerStyle={1} breadcrumbTitle={medico ? medico.nombreCompleto : "Cargando..."}>
      {content}
    </Layout>
  );
}

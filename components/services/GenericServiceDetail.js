import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import './GenericServiceDetail.css';

const GenericServiceDetail = ({ title }) => {
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const docRef = doc(db, 'services', title);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setServiceData(docSnap.data());
        } else {
          console.log("El servicio no existe en la base de datos");
        }
      } catch (error) {
        console.error("Error al obtener los datos del servicio:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [title]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!serviceData) {
    return <p>Servicio no encontrado.</p>;
  }

  return (
    <article className="service-detail">
      {/* Encabezado principal */}
      <header className="service-header">
        <h1 className="service-title">{serviceData.clinica?.nombre}</h1>
        <p className="service-description">{serviceData.clinica?.objetivo}</p>
      </header>

     

      {/* Galería de imágenes */}
      <section className="image-gallery">
        <img src="https://picsum.photos/500/300" alt="Imagen 1" className="gallery-image" />
        <img src="https://picsum.photos/500/300?2" alt="Imagen 2" className="gallery-image" />
        <img src="https://picsum.photos/500/300?3" alt="Imagen 3" className="gallery-image" />
      </section>

      {/* Sección de técnicas de tratamiento */}
      <section className="service-section">
        <h2>Técnicas de Tratamiento</h2>
        {serviceData.tecnicas_de_tratamiento.map((tecnica, index) => (
          <div key={index} className="treatment-technique">
            <h3>{tecnica.nombre}</h3>
            <p>{tecnica.descripcion}</p>
          </div>
        ))}
      </section>

      {/* Sección de especificaciones del acelerador lineal */}
      <section className="service-section">
        <h2>Especificaciones del Acelerador Lineal</h2>
        <p><strong>Modelo:</strong> {serviceData.especificaciones_acelerador_lineal.modelo}</p>
        <ul>
          {serviceData.especificaciones_acelerador_lineal.caracteristicas.map((caracteristica, index) => (
            <li key={index}>{caracteristica}</li>
          ))}
        </ul>
      </section>

      {/* Sección de servicios ofrecidos */}
      <section className="service-section">
        <h2>Servicios Ofrecidos</h2>
        <h3>Consultas</h3>
        <ul>
          {serviceData.servicios.consultas.map((consulta, index) => (
            <li key={index}>{consulta}</li>
          ))}
        </ul>
        <h3>Técnicas de Radioterapia</h3>
        <ul>
          {serviceData.servicios.radio_terapia_tecnicas.map((tecnica, index) => (
            <li key={index}>{tecnica}</li>
          ))}
        </ul>
      </section>

      {/* Sección de principales lesiones a tratar */}
      <section className="service-section">
        <h2>Principales Lesiones a Tratar</h2>
        <ul>
          {serviceData.principales_lesiones.map((lesion, index) => (
            <li key={index}>{lesion}</li>
          ))}
        </ul>
      </section>

      {/* Sección de infraestructura y dotación */}
      <section className="service-section">
        <h2>Infraestructura y Dotación</h2>
        <ul>
          {serviceData.infraestructura_y_dotacion.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Sección de talento humano */}
      <section className="service-section">
        <h2>Talento Humano</h2>
        <ul>
          {serviceData.talento_humano.map((profesional, index) => (
            <li key={index}>{profesional}</li>
          ))}
        </ul>
      </section>

       {/* Sección de contacto */}
       <section className="contact-section">
        <h2>Contacto</h2>
        <ul>
        
          <li><strong>Email:</strong> {serviceData.clinica.contacto?.email}</li>
                </ul>
      </section>
    </article>
  );
};

export default GenericServiceDetail;

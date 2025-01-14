'use client';

import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import { doc, getDoc, Timestamp, collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Layout from "@/components/layout/Layout";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton } from "react-share";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'; // Importa los iconos de React Icons
import PostularmeModal from "@/components/PostularmeModal";


export default function OfertaEmpleoDetails() {
  const { id } = useParams();
  const [oferta, setOferta] = useState(null);
  const [ofertasRelacionadas, setOfertasRelacionadas] = useState([]);
  const [showPostularmeModal, setShowPostularmeModal] = useState(false);
  const [postulacionesCount, setPostulacionesCount] = useState(0);

  useEffect(() => {
    const fetchOferta = async () => {
      if (id) {
        try {
          const docRef = doc(db, "ofertasEmpleos", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setOferta({ id: docSnap.id, ...docSnap.data() });
          } else {
            console.log("No se encontró la oferta de empleo.");
          }
        } catch (error) {
          console.error("Error al obtener la oferta de empleo:", error);
        }
      }
    };

    const fetchOfertasRelacionadas = async () => {
      if (oferta && oferta.titulo) {
        const tituloPalabras = oferta.titulo.toLowerCase().split(" ");
        const consultas = tituloPalabras.map(palabra =>
          query(collection(db, "ofertasEmpleos"), where("titulo", ">=", palabra), where("titulo", "<=", palabra + '\uf8ff'))
        );
    
        const resultados = await Promise.all(consultas.map(consulta => getDocs(consulta)));
        const ofertas = resultados.flatMap(resultado => resultado.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    
        // Filtrar la oferta actual y posibles duplicados
        const ofertasFiltradas = ofertas.reduce((unique, o) => {
          if (!unique.some(obj => obj.id === o.id) && o.id !== id) {
            unique.push(o);
          }
          return unique;
        }, []);
    
        setOfertasRelacionadas(ofertasFiltradas);
      }
    };

    // Obtener el recuento de postulaciones en tiempo real
    const subscribeToPostulacionesCount = () => {
      if (id) {
        const q = query(collection(db, "postulaciones"), where("ofertaId", "==", id));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          setPostulacionesCount(snapshot.docs.length);
        });
        return unsubscribe;
      }
    };

    fetchOferta();
    const unsubscribe = subscribeToPostulacionesCount();

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [id]);

  useEffect(() => {
    const fetchOfertasRelacionadas = async () => {
      if (oferta && oferta.titulo) {
        const tituloPalabras = oferta.titulo.toLowerCase().split(" ");
        const consultas = tituloPalabras.map(palabra =>
          query(collection(db, "ofertasEmpleos"), where("titulo", ">=", palabra), where("titulo", "<=", palabra + '\uf8ff'))
        );
    
        const resultados = await Promise.all(consultas.map(consulta => getDocs(consulta)));
        const ofertas = resultados.flatMap(resultado => resultado.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    
        // Filtrar la oferta actual y posibles duplicados
        const ofertasFiltradas = ofertas.reduce((unique, o) => {
          if (!unique.some(obj => obj.id === o.id) && o.id !== id) {
            unique.push(o);
          }
          return unique;
        }, []);
    
        setOfertasRelacionadas(ofertasFiltradas);
      }
    };

    if (oferta) {
      fetchOfertasRelacionadas();
    }
  }, [oferta]);

  if (!oferta) {
    return (
      <Layout headerStyle={2} footerStyle={1}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const fechaPublicacion = oferta.fechaPublicacion;
  let fechaFormateada = "";
  if (fechaPublicacion instanceof Timestamp) {
    fechaFormateada = format(fechaPublicacion.toDate(), "dd 'de' MMMM 'de' সাফল", { locale: es });
  } else if (typeof fechaPublicacion === 'string') {
    const fecha = new Date(fechaPublicacion);
    fechaFormateada = format(fecha, "dd 'de' MMMM 'de' সাফল", { locale: es });
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <Layout headerStyle={2} footerStyle={1} breadcrumbTitle={oferta.titulo}>
      <section className="results-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="oferta-details card shadow-sm p-4">
                <h2 className="mb-4">{oferta.titulo}</h2>
                {oferta.imagen && (
                  <img src={oferta.imagen} alt={oferta.titulo} className="oferta-imagen img-fluid mb-4 rounded" />
                )}
                <div className="oferta-info">
                  <h3 className="mb-3">Descripción</h3>
                  <p className="mb-4">{oferta.descripcion}</p>

                  <h3 className="mb-3">Requisitos</h3>
                  <p className="mb-4">{oferta.requisitos}</p>

                  <h3 className="mb-3">Habilidades</h3>
                  <p className="mb-4">{oferta.habilidades}</p>

                  <h3 className="mb-3">Idiomas</h3>
                  <p className="mb-4">{oferta.idiomas}</p>

                  <h3 className="mb-3">Otros</h3>
                  <p className="mb-4">{oferta.otros}</p>

                  <div className="row mb-4">
                    <div className="col-md-6">
                      <p>
                        <strong><i className="fas fa-dollar-sign"></i> Sueldo:</strong> {oferta.sueldo}
                      </p>
                      <p>
                        <strong><i className="fas fa-map-marker-alt"></i> Ubicación:</strong> {oferta.ubicacion}
                      </p>
                      <p>
                        <strong><i className="fas fa-calendar-alt"></i> Fecha de Publicación:</strong>{" "}
                        {fechaFormateada}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <strong><i className="fas fa-file-contract"></i> Tipo de Contrato:</strong> {oferta.tipoContrato}
                      </p>
                      <p>
                        <strong><i className="fas fa-clock"></i> Jornada:</strong> {oferta.jornada}
                      </p>
                      <p>
                        <strong><i className="fas fa-briefcase"></i> Experiencia:</strong> {oferta.experiencia}
                      </p>
                      <p>
                        <strong><i className="fas fa-graduation-cap"></i> Estudios:</strong> {oferta.estudios}
                      </p>
                    </div>
                    <p className="mt-3">
                        <strong><i className="fas fa-users"></i> Postulaciones:</strong> {postulacionesCount}
                    </p>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <button className="btn btn-primary btn-lg" onClick={() => setShowPostularmeModal(true)}>
                    <i className="fas fa-paper-plane"></i> Postularme
                  </button>
                </div>

              </div>
            </div>
            <div className="col-md-4">
              <div className="sidebar p-4">
                <h3>Compartir</h3>
                <div className="social-buttons">
                  <FacebookShareButton url={shareUrl} quote={oferta.titulo}>
                    <FaFacebookF size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl} title={oferta.titulo}>
                    <FaTwitter size={32} round />
                  </TwitterShareButton>
                  <LinkedinShareButton url={shareUrl} title={oferta.titulo}>
                    <FaLinkedinIn size={32} round />
                  </LinkedinShareButton>
                  <WhatsappShareButton url={shareUrl} title={oferta.titulo}>
                    <FaWhatsapp size={32} round />
                  </WhatsappShareButton>
                </div>

                <h3 className="mt-4">Ofertas Relacionadas</h3>
                <ul>
                  {ofertasRelacionadas.map(ofertaRel => (
                    <li key={ofertaRel.id}>
                      <a href={`/empleos-details/${ofertaRel.id}`}>{ofertaRel.titulo}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style jsx>{`
        .oferta-details {
          max-width: 800px;
          margin: 0 auto;
        }

        .oferta-imagen {
          max-height: 300px;
          object-fit: cover;
        }
        .oferta-info h3 {
            color: #3498db;
        }

        .oferta-info p strong {
            color: #2980b9;
        }
        .sidebar {
          background-color: #f8f9fa;
          border-radius: 5px;
        }
        .social-buttons {
          display: flex;
          justify-content: space-around;
        }
        .social-buttons > * { /* Agrega margen entre los botones */
          margin: 0 5px;
        }
      `}</style>

      {/* Modal de Postulación */}
      <PostularmeModal
        show={showPostularmeModal}
        onClose={() => setShowPostularmeModal(false)}
        oferta={oferta}
      />
    </Layout>
  );
}
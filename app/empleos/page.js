"use client";

import Layout from "@/components/layout/Layout";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import PostularmeModal from "@/components/PostularmeModal";

// 1) Importamos SweetAlert2
import Swal from "sweetalert2";

export default function OfertasEmpleo() {
  const [ofertas, setOfertas] = useState([]);
  const [filtros, setFiltros] = useState({
    sueldo: "",
    ubicacion: "",
    fechaPublicacion: "",
    tipoContrato: "",
    jornada: "",
    experiencia: "",
    estudios: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ofertasPerPage = 6;

  // Modal de “Deja tu currículum” (ya existente en tu código)
  const [showModal, setShowModal] = useState(false);

  // 2) SweetAlert2 al cargar la página
  useEffect(() => {
    Swal.fire({
      title: "Comunicado Importante",
      html: `
        <div style="text-align: justify; line-height: 1.6;">
          <h4 style="margin-bottom: 10px; text-align: center;">
            Barranquilla, 03 de Febrero de 2025
          </h4>
          <p style="margin-top: 0;">
            La Clínica de la Costa S.A.S. informa a todos los aspirantes a nuestras convocatorias laborales que 
            dentro de nuestros procesos de selección 
            <strong>NO solicitamos ningún tipo de pago</strong> 
            por concepto de inscripción, realización de pruebas, cursos, laboratorios o cualquier otro trámite 
            relacionado con la vinculación a nuestra institución.
          </p>
          <p>
            Cualquier solicitud de dinero en nombre de la Clínica de la Costa S.A.S. es fraudulenta. 
            En caso de detectar este tipo de prácticas, le pedimos abstenerse de realizar pagos y 
            reportarlo de inmediato a nuestros canales oficiales de atención.
          </p>
          <p>
            Para información verídica sobre nuestros procesos de selección, le invitamos a consultar
            nuestra página web oficial y redes sociales verificadas.
          </p>
          <p style="font-weight: 600; margin-top: 1rem; text-align: right;">
            Atentamente,<br/>
            Clínica de la Costa S.A.S
          </p>
        </div>
      `,
      icon: "info",
      confirmButtonText: "Entendido",
    });
  }, []);
  

  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        let q = collection(db, "ofertasEmpleos");

        if (filtros.sueldo) {
          q = query(q, where("sueldo", "==", filtros.sueldo));
        }
        if (filtros.ubicacion) {
          q = query(q, where("ubicacion", "==", filtros.ubicacion));
        }
        if (filtros.fechaPublicacion) {
          q = query(q, where("fechaPublicacion", "==", filtros.fechaPublicacion));
        }
        if (filtros.tipoContrato) {
          q = query(q, where("tipoContrato", "==", filtros.tipoContrato));
        }
        if (filtros.jornada) {
          q = query(q, where("jornada", "==", filtros.jornada));
        }
        if (filtros.experiencia) {
          q = query(q, where("experiencia", "==", filtros.experiencia));
        }
        if (filtros.estudios) {
          q = query(q, where("estudios", "==", filtros.estudios));
        }

        const ofertasSnapshot = await getDocs(q);
        const ofertasData = ofertasSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOfertas(ofertasData);
      } catch (error) {
        console.error("Error al obtener las ofertas de empleo:", error);
      }
    };

    fetchOfertas();
  }, [filtros]);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros({
      ...filtros,
      [name]: value,
    });
  };

  const opcionesSueldo = [...new Set(ofertas.map((oferta) => oferta.sueldo))];
  const opcionesUbicacion = [...new Set(ofertas.map((oferta) => oferta.ubicacion))];
  const opcionesFechaPublicacion = [...new Set(ofertas.map((oferta) => oferta.fechaPublicacion))];
  const opcionesTipoContrato = [...new Set(ofertas.map((oferta) => oferta.tipoContrato))];
  const opcionesJornada = [...new Set(ofertas.map((oferta) => oferta.jornada))];
  const opcionesExperiencia = [...new Set(ofertas.map((oferta) => oferta.experiencia))];
  const opcionesEstudios = [...new Set(ofertas.map((oferta) => oferta.estudios))];

  const filteredOfertas = ofertas.filter((oferta) => {
    const normalizedTitulo = oferta.titulo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const normalizedSearchTerm = searchTerm
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return normalizedTitulo.includes(normalizedSearchTerm);
  });

  const indexOfLastOferta = currentPage * ofertasPerPage;
  const indexOfFirstOferta = indexOfLastOferta - ofertasPerPage;
  const currentOfertas = filteredOfertas.slice(indexOfFirstOferta, indexOfLastOferta);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Trabaja con Nosotros - Ofertas de Empleo en la Clínica">
        <section className="results-section py-5">
          <div className="container">
            <div className="ofertas-container">
              <div className="sidebar">
                <h3>Filtros</h3>

                <div className="filtro">
                  <label htmlFor="sueldo">Sueldo:</label>
                  <select
                    name="sueldo"
                    id="sueldo"
                    value={filtros.sueldo}
                    onChange={handleFiltroChange}
                  >
                    <option value="">Todos</option>
                    {opcionesSueldo.map((sueldo) => (
                      <option key={sueldo} value={sueldo}>
                        {sueldo}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filtro">
                  <label htmlFor="ubicacion">Ubicación:</label>
                  <select
                    name="ubicacion"
                    id="ubicacion"
                    value={filtros.ubicacion}
                    onChange={handleFiltroChange}
                  >
                    <option value="">Todos</option>
                    {opcionesUbicacion.map((ubicacion) => (
                      <option key={ubicacion} value={ubicacion}>
                        {ubicacion}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filtro">
                  <label htmlFor="tipoContrato">Tipo de Contrato:</label>
                  <select
                    name="tipoContrato"
                    id="tipoContrato"
                    value={filtros.tipoContrato}
                    onChange={handleFiltroChange}
                  >
                    <option value="">Todos</option>
                    {opcionesTipoContrato.map((tipoContrato) => (
                      <option key={tipoContrato} value={tipoContrato}>
                        {tipoContrato}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filtro">
                  <label htmlFor="jornada">Jornada:</label>
                  <select
                    name="jornada"
                    id="jornada"
                    value={filtros.jornada}
                    onChange={handleFiltroChange}
                  >
                    <option value="">Todos</option>
                    {opcionesJornada.map((jornada) => (
                      <option key={jornada} value={jornada}>
                        {jornada}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filtro">
                  <label htmlFor="estudios">Estudios:</label>
                  <select
                    name="estudios"
                    id="estudios"
                    value={filtros.estudios}
                    onChange={handleFiltroChange}
                  >
                    <option value="">Todos</option>
                    {opcionesEstudios.map((estudios) => (
                      <option key={estudios} value={estudios}>
                        {estudios}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="main-content">
                <h2>Trabaja con Nosotros</h2>

                <div className="tarjeta-curriculum">
                  <p>
                    Si no encuentras una oferta que se ajuste a tu perfil, ¡no te preocupes! 
                    Puedes dejarnos tu currículum para futuras oportunidades.
                  </p>
                  <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    Deja tu currículum
                  </button>
                </div>

                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Buscar por título"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="ofertas-grid">
                  {currentOfertas.length > 0 ? (
                    currentOfertas.map((oferta) => (
                      <div key={oferta.id} className="oferta-card">
                        <div className="oferta-card-inner">
                          {oferta.imagen && (
                            <img
                              src={oferta.imagen}
                              alt={oferta.titulo}
                              className="oferta-imagen"
                            />
                          )}
                          <div className="oferta-contenido">
                            <h3>{oferta.titulo}</h3>
                            <p>{oferta.descripcion}</p>
                            <Link
                              href={`/empleos-details/${oferta.id}`}
                              className="oferta-enlace"
                            >
                              Ver más
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-ofertas">
                      <p>
                        No se encontraron ofertas de empleo que coincidan con los filtros y la búsqueda.
                      </p>
                    </div>
                  )}
                </div>

                <div className="pagination">
                  <ul>
                    {Array.from({ length: Math.ceil(filteredOfertas.length / ofertasPerPage) }, (_, i) => (
                      <li key={i}>
                        <a
                          onClick={() => paginate(i + 1)}
                          className={currentPage === i + 1 ? "active" : ""}
                        >
                          {i + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>

      {/* Modal para dejar el currículum (ya existente en tu código) */}
      {showModal && (
        <PostularmeModal
          show={showModal}
          onClose={() => setShowModal(false)}
          oferta={{ id: "", titulo: "Sin Oferta" }}
        />
      )}

      <style jsx>{`
        .ofertas-container {
          display: flex;
          gap: 20px;
        }

        .sidebar {
          width: 250px;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
        }

        .filtro {
          margin-bottom: 15px;
        }

        .filtro label {
          display: block;
          margin-bottom: 5px;
        }

        .filtro select {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }

        .main-content {
          flex: 1;
        }

        .search-bar {
          margin-bottom: 20px;
        }

        .search-bar input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }

        .ofertas-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .oferta-card {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease-in-out;
        }

        .oferta-card:hover {
          transform: translateY(-5px);
        }

        .oferta-card-inner {
          background-color: #fff;
        }

        .oferta-imagen {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .oferta-contenido {
          padding: 20px;
        }

        .oferta-enlace {
          display: inline-block;
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 10px;
          transition: background-color 0.2s ease-in-out;
        }

        .oferta-enlace:hover {
          background-color: #0056b3;
        }

        .no-ofertas {
          text-align: center;
          font-size: 1.2rem;
          color: #555;
          margin-top: 20px;
        }

        .pagination {
          margin-top: 20px;
          text-align: center;
        }

        .pagination ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: inline-flex;
        }

        .pagination li {
          margin: 0 5px;
        }

        .pagination a {
          display: inline-block;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 5px;
          color: #007bff;
          text-decoration: none;
          cursor: pointer;
        }

        .pagination a:hover,
        .pagination a.active {
          background-color: #007bff;
          color: #fff;
          border-color: #007bff;
        }

        .tarjeta-curriculum {
          background-color: #f9f9f9;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
          text-align: center;
        }
      `}</style>
    </>
  );
}

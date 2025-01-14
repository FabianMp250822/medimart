'use client';

import Layout from "@/components/layout/Layout";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

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
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const ofertasPerPage = 6; // Número de ofertas por página

  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        let q = collection(db, "ofertasEmpleos");

        // Aplicar filtros a la consulta
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
  }, [filtros]); // Ejecutar cada vez que cambien los filtros

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros({
      ...filtros,
      [name]: value,
    });
  };

  // Obtener opciones únicas para los filtros dinámicos
  const opcionesSueldo = [...new Set(ofertas.map((oferta) => oferta.sueldo))];
  const opcionesUbicacion = [...new Set(ofertas.map((oferta) => oferta.ubicacion))];
  const opcionesFechaPublicacion = [...new Set(ofertas.map((oferta) => oferta.fechaPublicacion))];
  const opcionesTipoContrato = [...new Set(ofertas.map((oferta) => oferta.tipoContrato))];
  const opcionesJornada = [...new Set(ofertas.map((oferta) => oferta.jornada))];
  const opcionesExperiencia = [...new Set(ofertas.map((oferta) => oferta.experiencia))];
  const opcionesEstudios = [...new Set(ofertas.map((oferta) => oferta.estudios))];

  // Filtrar ofertas por término de búsqueda
  const filteredOfertas = ofertas.filter((oferta) => {
    const normalizedTitulo = oferta.titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const normalizedSearchTerm = searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return normalizedTitulo.includes(normalizedSearchTerm);
  });

  // Paginación
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
              {/* Sidebar */}
             {/* Sidebar */}
             <div className="sidebar">
                <h3>Filtros</h3>
                <div className="filtro">
                  <label htmlFor="sueldo">Sueldo:</label>
                  <select name="sueldo" id="sueldo" value={filtros.sueldo} onChange={handleFiltroChange}>
                    <option value="">Todos</option>
                    {opcionesSueldo.map((sueldo) => (
                      <option key={sueldo} value={sueldo}>
                        {sueldo}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filtro Ubicación */}
                <div className="filtro">
                  <label htmlFor="ubicacion">Ubicación:</label>
                  <select name="ubicacion" id="ubicacion" value={filtros.ubicacion} onChange={handleFiltroChange}>
                    <option value="">Todos</option>
                    {opcionesUbicacion.map((ubicacion) => (
                      <option key={ubicacion} value={ubicacion}>
                        {ubicacion}
                      </option>
                    ))}
                  </select>
                </div>

                               {/* Filtro Tipo de Contrato */}
                 <div className="filtro">
                  <label htmlFor="tipoContrato">Tipo de Contrato:</label>
                  <select name="tipoContrato" id="tipoContrato" value={filtros.tipoContrato} onChange={handleFiltroChange}>
                    <option value="">Todos</option>
                    {opcionesTipoContrato.map((tipoContrato) => (
                      <option key={tipoContrato} value={tipoContrato}>
                        {tipoContrato}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filtro Jornada */}
                <div className="filtro">
                  <label htmlFor="jornada">Jornada:</label>
                  <select name="jornada" id="jornada" value={filtros.jornada} onChange={handleFiltroChange}>
                    <option value="">Todos</option>
                    {opcionesJornada.map((jornada) => (
                      <option key={jornada} value={jornada}>
                        {jornada}
                      </option>
                    ))}
                  </select>
                </div>

              

                {/* Filtro Estudios */}
                <div className="filtro">
                  <label htmlFor="estudios">Estudios:</label>
                  <select name="estudios" id="estudios" value={filtros.estudios} onChange={handleFiltroChange}>
                    <option value="">Todos</option>
                    {opcionesEstudios.map((estudios) => (
                      <option key={estudios} value={estudios}>
                        {estudios}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Contenido principal */}
              <div className="main-content">
                <h2>Trabaja con Nosotros</h2> {/* Título mejorado con SEO */}
                {/* Barra de búsqueda */}
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
                            <img src={oferta.imagen} alt={oferta.titulo} className="oferta-imagen" />
                          )}
                          <div className="oferta-contenido">
                            <h3>{oferta.titulo}</h3>
                            <p>{oferta.descripcion}</p>
                            <Link href={`/empleos-details/${oferta.id}`} className="oferta-enlace"> 
                              Ver más
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-ofertas">
                      No se encontraron ofertas de empleo que coincidan con los filtros y la búsqueda.
                    </p>
                  )}
                </div>
                {/* Paginación */}
                <div className="pagination">
                  <ul>
                    {Array.from({ length: Math.ceil(filteredOfertas.length / ofertasPerPage) }, (_, i) => (
                      <li key={i}>
                        <a onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? "active" : ""}>
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
      `}</style>
    </>
  );
}
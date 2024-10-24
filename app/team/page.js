'use client';
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useSede } from "../context/SedeContext";

export default function Home() {
  const [medicos, setMedicos] = useState([]);
  const { sedeData } = useSede(); // Obtén los datos de la sede seleccionada desde el contexto

  // Estados para búsqueda, paginación y filtro
  const [searchTerm, setSearchTerm] = useState("");  // Estado para la búsqueda
  const [especialidad, setEspecialidad] = useState("");  // Estado para el filtro de especialidad
  const [currentPage, setCurrentPage] = useState(1);  // Estado para la página actual
  const medicosPerPage = 6;  // Cantidad de médicos por página

  const fetchMedicos = async () => {
    try {
      if (!sedeData?.nombre) return; // Asegúrate de que la sede esté seleccionada

      // Consultar médicos que pertenecen a la sede seleccionada
      const q = query(collection(db, "medicos"), where("sede", "==", sedeData.nombre));
      const querySnapshot = await getDocs(q);

      const medicosData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data && data.nombreCompleto !== "Luis Aurelio Castillo Parodi") {
          medicosData.push({ ...data, id: doc.id });
        }
      });

      setMedicos(medicosData);
    } catch (error) {
      console.error("Error al obtener médicos:", error);
    }
  };

  useEffect(() => {
    fetchMedicos();
  }, [sedeData]);

  // Restablecer currentPage a 1 cuando searchTerm o especialidad cambien
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, especialidad]);

  // Filtrar médicos por nombre completo a partir del tercer carácter y por especialidad
  const filteredMedicos = medicos.filter((medico) => {
    const matchesSearchTerm = searchTerm.length >= 3 
      ? medico.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesEspecialidad = especialidad
      ? medico.especialidad === especialidad
      : true;

    return matchesSearchTerm && matchesEspecialidad;
  });

  // Paginación
  const indexOfLastMedico = currentPage * medicosPerPage;
  const indexOfFirstMedico = indexOfLastMedico - medicosPerPage;
  const currentMedicos = filteredMedicos.slice(indexOfFirstMedico, indexOfLastMedico);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Layout headerStyle={2} footerStyle={1} breadcrumbTitle={`Equipo Médico - ${sedeData?.nombre || "Sede"}`}>
        <div className="medicos-container">
          {/* Filtros y búsqueda en una fila */}
          <section className="search-filter-section">
            <div className="search-filter-wrapper">
              <input
                type="text"
                placeholder="Buscar por nombre"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />

              <select
                value={especialidad}
                onChange={(e) => setEspecialidad(e.target.value)}
                className="filter-select"
              >
                <option value="">Todas las especialidades</option>
                <option value="Cirugía">Cirugía</option>
                <option value="Transplante">Transplante</option>
                <option value="Radioterapia y Oncología">Radioterapia y Oncología</option>
                {/* Agrega más opciones de especialidades */}
              </select>
            </div>
          </section>

          {/* Mensaje informativo */}
          {searchTerm.length > 0 && searchTerm.length < 3 && (
            <p>Por favor, ingresa al menos 3 caracteres para buscar.</p>
          )}

          {/* Sección de equipo */}
          <section className="team-section sec-pad-2">
            <div className="auto-container">
              <div className="row clearfix">
                {currentMedicos.length > 0 ? (
                  currentMedicos.map((medico, index) => {
                    const imageUrl = medico.fotoPerfil || medico.profileImage || "https://via.placeholder.com/150";
                    return (
                      <div className="col-lg-4 col-md-6 col-sm-12 team-block" key={index}>
                        <div className="team-block-one" style={{ animationDelay: `${index * 200}ms` }}>
                          <div className="inner-box">
                            <div className="image-box">
                              <figure className="image">
                                <img src={imageUrl} alt={medico.nombreCompleto} />
                              </figure>
                              <ul className="social-links clearfix">
                                <li><Link href={`/team-details/${medico.id}`}><i className="icon-4"></i></Link></li>
                                <li><Link href={`/team-details/${medico.id}`}><i className="icon-5"></i></Link></li>
                              </ul>
                            </div>
                            <div className="lower-content">
                              <h3><Link href={`/team-details/${medico.id}`}>{medico.nombreCompleto}</Link></h3>
                              <span className="designation">{medico.especialidad}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  (searchTerm.length >= 3 || especialidad) ? (
                    <p>No se encontraron médicos con los criterios de búsqueda aplicados.</p>
                  ) : null
                )}
              </div>

              {/* Paginación */}
              <nav className="pagination centred">
                <ul className="pagination-list">
                  {Array.from({ length: Math.ceil(filteredMedicos.length / medicosPerPage) }, (_, i) => (
                    <li key={i} className="page-item">
                      <a onClick={() => paginate(i + 1)} className="page-link">
                        {i + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
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
                          <input type="email" name="email" placeholder="Ingresa tu dirección de email" required className="input-email"/>
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
        </div>
      </Layout>

      {/* Estilos adicionales */}
      <style jsx>{`
        .medicos-container {
          padding: 20px;
          background-color: #f9f9f9;
        }
        .search-filter-section {
          margin-bottom: 20px;
        }
        .search-filter-wrapper {
          display: flex;
          gap: 20px;
          justify-content: space-between;
        }
        .search-input, .filter-select {
          padding: 10px;
          flex: 1;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 16px;
        }
        .team-block-one {
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
          background-color: #fff;
          border-radius: 8px;
          overflow: hidden;
        }
        .team-block-one:hover {
          transform: translateY(-5px);
        }
        .image-box {
          position: relative;
          overflow: hidden;
        }
        .image-box img {
          width: 100%;
          height: 250px;
          object-fit: cover;
        }
        .social-links {
          position: absolute;
          bottom: 10px;
          right: 10px;
        }
        .lower-content {
          padding: 20px;
          text-align: center;
        }
        .lower-content h3 {
          font-size: 20px;
          font-weight: bold;
        }
        .lower-content .designation {
          font-size: 14px;
          color: #888;
        }
        .pagination {
          margin-top: 20px;
          text-align: center;
        }
        .pagination-list {
          list-style: none;
          padding: 0;
        }
        .page-item {
          display: inline-block;
          margin: 0 5px;
        }
        .page-link {
          color: #007bff;
          text-decoration: none;
          padding: 10px 15px;
          border: 1px solid #ddd;
          border-radius: 5px;
          cursor: pointer;
        }
        .page-link:hover {
          background-color: #007bff;
          color: #fff;
        }
      `}</style>
    </>
  );
}

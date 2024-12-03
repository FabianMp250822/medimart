"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useSede } from "../context/SedeContext";
import './team.css';

export default function Home() {
  const [medicos, setMedicos] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const { sedeData } = useSede();
  const [expandedCategory, setExpandedCategory] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const medicosPerPage = 6;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Función para normalizar cadenas (eliminar acentos y pasar a minúsculas)
  const normalizeString = (str) => {
    if (typeof str !== "string") return "";
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  };
  const toggleCategory = (category) => {
    setExpandedCategory((prev) => (prev === category ? null : category));
  };
  
  const groupEspecialidades = () => {
    return [
      {
        keyword: "Medicina Crítica y Cuidados Intensivos",
        especialidades: [
          "Medicina Crítica",
          "Pediatra y Coordinador UCI Pediátrica",
          "Infectólogo Pediatra",
          "Perfusión Cardiovascular",
          "Coordinadora de Cirugía",
        ],
      },
      {
        keyword: "Nefrología y Enfermedades Crónicas",
        especialidades: [
          "Nefrología",
          "Diálisis y Trasplante Renal",
          "Medicina Interna"
        ],
      },
      
      {
        keyword: "Cirugía General y Subespecialidades",
        especialidades: [
          "Cirugía General",
          "Cirugía Cardiovascular",
          "Neurocirugía",
          "Cirugía - Clínica",
          "Cirujano Cardiovascular",
          "Transplante",
          "Coloproctología",
          "Instrumentadora",
        ],
      },
      {
        keyword: "Ginecología y Medicina de la Mujer",
        especialidades: [
          "Ginecología - Obstetricia",
          "Endocrinología y Medicina Interna",
          "Endocrinóloga Pediatra",
          "Alergología Clínica",
          "Nutrición Clínica",
        ],
      },
      {
        keyword: "Oncología y Tratamientos Relacionados",
        especialidades: [
          "Radioterapia y Oncología",
          "Oncología Clínica",
          "Hemodinámica",
          "Cardiología",
          "Genética",
        ],
      },
      {
        keyword: "Ortopedia y Traumatología",
        especialidades: [
          "Médico Ortopedista y Traumatólogo",
          "Ortopedista y Traumatólogo",
          "MD. Internista - Hepatólogo",
          "Coloproctología",
        ],
      },
      {
        keyword: "Dermatología y Estética",
        especialidades: [
          "Dermatología Clínica, Quirúrgica y Estética",
          "Dermatóloga",
          "Odontóloga General con Enfoque en Estética Dental",
          "Ortodoncista",
        ],
      },
      {
        keyword: "Diagnóstico y Radiología",
        especialidades: [
          "Especialista en Radiología e Imágenes Diagnósticas",
          "Radiología",
          "Tecnólogo en Rx",
        ],
      },
      {
        keyword: "Psiquiatría y Salud Mental",
        especialidades: [
          "Psiquiatría",
          "Psiquiatra Especialista en Niños y Adolescentes",
          "Trabajadora Social",
        ],
      },
      {
        keyword: "Gastroenterología y Nutrición",
        especialidades: [
          "Gastroenterología",
          "Nutricionista",
          "Oftalmología",
        ],
      },
      {
        keyword: "Enfermería y Apoyo Clínico",
        especialidades: [
          "Enfermera Jefe",
          "Electrofisiología",
          "Coordinadora de Cirugía",
          "Instrumentadora",
        ],
      },
    ];
  };
  
  // Función para agrupar especialidades dinámicamente


  const fetchMedicos = async () => {
    try {
      if (!sedeData?.nombre) return;

      const q = query(
        collection(db, "medicos"),
        where("sede", "==", sedeData.nombre)
      );
      const querySnapshot = await getDocs(q);

      const medicosData = [];
      const especialidadesSet = new Set();

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data && data.nombreCompleto !== "Luis Aurelio Castillo Parodi") {
          medicosData.push({
            ...data,
            id: doc.id,
          });
          if (data.especialidad) especialidadesSet.add(data.especialidad);
        }
      });

      // Ordenar médicos por nombre completo
      medicosData.sort((a, b) =>
        a.nombreCompleto.localeCompare(b.nombreCompleto)
      );

      // Agrupar especialidades de forma dinámica
      const groupedEspecialidades = groupEspecialidades([...especialidadesSet]);

      // Actualizar estados
      setMedicos(medicosData);
      setEspecialidades(groupedEspecialidades);
    } catch (error) {
      console.error("Error al obtener médicos:", error);
    }
  };

  useEffect(() => {
    fetchMedicos();
  }, [sedeData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, especialidad]);

  const filteredMedicos = medicos.filter((medico) => {
    const normalizedSearchTerm = normalizeString(searchTerm);
    const nombreCompleto = medico.nombreCompleto || "";
    const normalizedNombreCompleto = normalizeString(nombreCompleto);

    const matchesSearchTerm =
      normalizedSearchTerm.length >= 3
        ? normalizedNombreCompleto.includes(normalizedSearchTerm)
        : true;

    // Verificar si la especialidad del médico está en la categoría seleccionada
    const matchesEspecialidad = especialidad
      ? normalizeString(medico.especialidad).startsWith(especialidad)
      : true;

    return matchesSearchTerm && matchesEspecialidad;
  });

  const indexOfLastMedico = currentPage * medicosPerPage;
  const indexOfFirstMedico = indexOfLastMedico - medicosPerPage;
  const currentMedicos = filteredMedicos.slice(
    indexOfFirstMedico,
    indexOfLastMedico
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Layout
        headerStyle={2}
        footerStyle={1}
        breadcrumbTitle={`Equipo Médico - ${sedeData?.nombre || "Sede"}`}
      >
        <div className="medicos-container">
          {/* Barra de búsqueda */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar por nombre"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Botón para abrir/cerrar la barra lateral en móvil */}
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            Especialidades
          </button>

          {/* Contenido principal y barra lateral */}
          <div className="content-wrapper">
            {/* Barra lateral */}
            <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
  <h3>Especialidades</h3>
  <ul className="specialty-list">
    <li
      className={!especialidad ? "active" : ""}
      onClick={() => {
        setEspecialidad("");
        setSidebarOpen(false);
      }}
    >
      Todas las especialidades
    </li>
    {especialidades.map((category, index) => (
      <li key={index} className="category">
        <div
          className={`category-header ${
            expandedCategory === category.keyword ? "active" : ""
          }`}
          onClick={() => toggleCategory(category.keyword)}
        >
          {category.keyword}
          <span className="toggle-icon">
            {expandedCategory === category.keyword ? "-" : "+"}
          </span>
        </div>
        {expandedCategory === category.keyword && (
          <ul className="subspecialty-list">
            {category.especialidades.map((subEspecialidad, subIndex) => (
              <li
                key={subIndex}
                className={
                  especialidad === normalizeString(subEspecialidad)
                    ? "active"
                    : ""
                }
                onClick={() => {
                  setEspecialidad(normalizeString(subEspecialidad));
                  setSidebarOpen(false);
                }}
              >
                {subEspecialidad}
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
</div>

            {/* Overlay para cerrar la barra lateral en móvil */}
            {sidebarOpen && (
              <div
                className="overlay"
                onClick={() => setSidebarOpen(false)}
              ></div>
            )}

            {/* Contenido principal */}
            <div className="main-content">
              {searchTerm.length > 0 && searchTerm.length < 3 && (
                <p>Por favor, ingresa al menos 3 caracteres para buscar.</p>
              )}

              {/* Sección de equipo */}
              <section className="team-section sec-pad-2">
                <div className="auto-container">
                  <div className="row clearfix">
                    {currentMedicos.length > 0 ? (
                      currentMedicos.map((medico, index) => {
                        const imageUrl =
                          medico.fotoPerfil ||
                          medico.profileImage ||
                          "https://via.placeholder.com/150";
                        return (
                          <div
                            className="col-lg-4 col-md-6 col-sm-12 team-block"
                            key={index}
                          >
                            <div
                              className="team-block-one"
                              style={{ animationDelay: `${index * 200}ms` }}
                            >
                              <div className="inner-box">
                                <div className="image-box">
                                  <figure className="image">
                                    <img
                                      src={imageUrl}
                                      alt={medico.nombreCompleto}
                                    />
                                  </figure>
                                  <ul className="social-links clearfix">
                                    <li>
                                      <Link
                                        href={`/team-details/${medico.id}`}
                                      >
                                        <i className="icon-4"></i>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        href={`/team-details/${medico.id}`}
                                      >
                                        <i className="icon-5"></i>
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                                <div className="lower-content">
                                  <h3>
                                    <Link
                                      href={`/team-details/${medico.id}`}
                                    >
                                      {medico.nombreCompleto}
                                    </Link>
                                  </h3>
                                  <span className="designation">
                                    {medico.especialidad}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : searchTerm.length >= 3 || especialidad ? (
                      <p>
                        No se encontraron médicos con los criterios de búsqueda
                        aplicados.
                      </p>
                    ) : null}
                  </div>

                  {/* Paginación */}
                  <nav className="pagination centred">
                    <ul className="pagination-list">
                      {Array.from(
                        {
                          length: Math.ceil(
                            filteredMedicos.length / medicosPerPage
                          ),
                        },
                        (_, i) => (
                          <li key={i} className="page-item">
                            <a
                              onClick={() => paginate(i + 1)}
                              className="page-link"
                            >
                              {i + 1}
                            </a>
                          </li>
                        )
                      )}
                    </ul>
                  </nav>
                </div>
              </section>
            </div>
          </div>
        </div>
      </Layout>

      {/* Estilos adicionales */}
      <style jsx>{`
        .medicos-container {
          padding: 20px;
          background-color: #f9f9f9;
          position: relative;
        }
        .search-bar {
          position: absolute;
          top: 20px;
          right: 20px;
        }
        .search-input {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 16px;
          width: 300px;
        }
        .sidebar-toggle {
          display: none;
          position: absolute;
          top: 20px;
          left: 20px;
          background-color: #007bff;
          color: #fff;
          border: none;
          padding: 10px 15px;
          border-radius: 5px;
          cursor: pointer;
          z-index: 1000;
        }
        .content-wrapper {
          display: flex;
          margin-top: 60px;
        }
        .sidebar {
          width: 400px;
          background-color: #fff;
          padding: 20px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          max-height: 720px;
          overflow-y: auto;
          transition: transform 0.3s ease;
        }
        .sidebar h3 {
          margin-bottom: 15px;
          font-size: 18px;
          font-weight: bold;
          color: #333;
        }
        .specialty-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .specialty-list li {
          padding: 10px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          border-radius: 5px;
          color: #555;
        }
        .specialty-list li:hover {
          background-color: #f0f0f0;
        }
        .specialty-list li.active {
          background-color: #007bff;
          color: #fff;
        }
        .main-content {
          flex: 1;
          margin-left: 20px;
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

        /* Estilos para móvil */
        @media (max-width: 768px) {
          .search-bar {
            position: static;
            margin-bottom: 20px;
          }
          .search-input {
            width: 100%;
          }
          .sidebar-toggle {
            display: block;
          }
          .content-wrapper {
            flex-direction: column;
          }
          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            transform: translateX(-100%);
            z-index: 999;
          }
          .sidebar.open {
            transform: translateX(0);
          }
          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 998;
          }
          .main-content {
            margin-left: 0;
            margin-top: 20px;
          }
          .team-block-one {
            margin-bottom: 20px;
          }
        }
      `}</style>
    </>
  );
}

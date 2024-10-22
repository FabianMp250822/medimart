"use client"; // Asegura que este componente sea un Client Component

import Link from "next/link";
import Menu from "../Menu";
import MobileMenu from "../MobileMenu";
import { useSede } from "@/app/context/SedeContext";
import { sedesData } from "@/app/data/sedesData";

export default function Header3({
  scroll,
  isMobileMenu,
  handleMobileMenu,
  isSidebar,
  handlePopup,
  handleSidebar,
}) {
  const { sedeData, selectSede } = useSede(); // Obtener los datos de la sede seleccionada y la función para seleccionar sede

  const whatsappNumber = sedeData?.whatsappNumber || "+573003456789";
  const whatsappMessage =
    sedeData?.whatsappMessage ||
    "Hola, me gustaría saber más sobre las consultas disponibles en la Clínica de la Costa.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  // Encontrar la clave de la sede seleccionada
  const selectedSedeKey =
    Object.keys(sedesData).find(
      (key) => sedesData[key].nombre === sedeData?.nombre
    ) || "";

  // Manejar la selección de una nueva sede desde el selector
  const handleSedeChange = (event) => {
    const nuevaSede = event.target.value;

    // Asegurarnos de que la nueva sede exista en los datos
    const sedeSeleccionada = sedesData[nuevaSede];

    if (sedeSeleccionada) {
      selectSede(sedeSeleccionada); // Actualizar la sede en el contexto con los datos completos
      localStorage.setItem("selectedSede", nuevaSede); // Guardar la clave de la sede seleccionada en localStorage
    }
  };

  return (
    <>
      <header className={`main-header ${scroll ? "fixed-header" : ""}`}>
        {/* Header Top */}
        <div className="header-top">
          <div className="auto-container">
            <div className="top-inner">
              <ul className="info-list clearfix">
                <li>
                  <i className="icon-1"></i>Atención al Usuario:
                  <Link href={`tel:${sedeData?.telefono}`}>
                    {sedeData?.telefono || "+57 (605) 3369973"}
                  </Link>
                </li>
                <li>
                  <img src="assets/images/icons/icon-1.png" alt="" />{" "}
                  {sedeData?.direccion || "Cra. 50 #80-149, Sede 3"}
                </li>
                {/* Enlace de WhatsApp */}
                <li>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-whatsapp"></i> WhatsApp
                  </a>
                </li>
              </ul>

              {/* Selector de sede */}
              <div className="sede-selector">
                <label htmlFor="sede-select">Seleccionar Sede:</label>
                <select
                  id="sede-select"
                  value={selectedSedeKey}
                  onChange={handleSedeChange}
                  className="custom-select"
                >
                  {Object.keys(sedesData).map((sedeKey) => (
                    <option key={sedeKey} value={sedeKey}>
                      {sedesData[sedeKey].nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Header Upper */}
        <div className="header-lower">
          <div className="outer-container">
            <div className="auto-container">
              <div className="outer-box">
                <div className="logo-box">
                  <figure className="logo">
                    <Link href="/">
                      <img
                        src="assets/images/logo.png"
                        alt="Clínica de la Costa"
                      />
                    </Link>
                  </figure>
                </div>
                <div className="menu-area">
                  <div
                    className="mobile-nav-toggler"
                    onClick={handleMobileMenu}
                  >
                    <i className="icon-bar"></i>
                    <i className="icon-bar"></i>
                    <i className="icon-bar"></i>
                  </div>
                  <nav className="main-menu navbar-expand-md navbar-light clearfix">
                    <div
                      className="collapse navbar-collapse show clearfix"
                      id="navbarSupportedContent"
                    >
                      <Menu />
                    </div>
                  </nav>
                </div>

                <div className="btn-box">
                  <Link href="/reclamar-resultados" className="theme-btn btn-one">
                    <span>Reclamar Resultados</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Header */}
        <div className="sticky-header">
          <div className="auto-container">
            <div className="outer-box">
              <div className="logo-box">
                <figure className="logo">
                  <Link href="/">
                    <img
                      src="assets/images/logo.png"
                      alt="Clínica de la Costa"
                    />
                  </Link>
                </figure>
              </div>

              <nav className="main-menu navbar-expand-md navbar-light clearfix">
                <div
                  className="collapse navbar-collapse show clearfix"
                  id="navbarSupportedContent"
                >
                  <Menu />
                </div>
              </nav>
              <ul className="menu-right-content">
                <div className="btn-box">
                  <Link href="/appointment" className="theme-btn btn-one">
                    <span>Asignar citas</span>
                  </Link>
                </div>
              </ul>
            </div>
          </div>
        </div>
        {/* Fin del Sticky Menu */}

        {/* Menú Móvil */}
        <MobileMenu handleMobileMenu={handleMobileMenu} />
      </header>
      <style jsx>{`
        /* Estilos generales para escritorio y móvil */
        .info-list {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 20px;
          padding: 15px 0;
          list-style: none;
          margin: 0;
        }

        .info-list li {
          color: white;
          font-size: 1rem;
          display: flex;
          align-items: center;
        }

        .info-list li a {
          color: white;
          text-decoration: none;
          margin-left: 5px;
        }

        .sede-selector {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sede-selector label {
          font-weight: bold;
          color: white;
        }

        .custom-select {
          appearance: none;
          background-color: white;
          color: #333;
          padding: 8px 12px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .custom-select:focus {
          border-color: #2563eb;
          box-shadow: 0 0 5px rgba(37, 99, 235, 0.5);
        }

        .theme-btn.btn-one {
          background-color: #2563eb;
          padding: 12px 24px;
          font-size: 1rem;
          border-radius: 6px;
          color: white;
          text-align: center;
          text-decoration: none;
          transition: background-color 0.3s ease;
          display: inline-block;
        }

        .theme-btn.btn-one:hover {
          background-color: #1e3a8a;
        }

        /* Estilos para íconos */
        .info-list li i,
        .info-list li img {
          margin-right: 5px;
        }

        /* Estilo responsivo: cambios para pantallas pequeñas */
        @media (max-width: 768px) {
          .info-list {
            flex-direction: column;
            gap: 10px;
            padding: 10px 0;
          }

          .info-list li {
            font-size: 0.9rem;
          }

          .sede-selector {
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
            margin-top: 10px;
          }

          .custom-select {
            width: 100%;
            padding: 8px 12px;
            font-size: 0.9rem;
          }

          .theme-btn.btn-one {
            padding: 10px 20px;
            font-size: 0.9rem;
          }

          /* Ajustes para el logo y menú en móvil */
          .header-lower .outer-box {
            flex-direction: column;
            align-items: center;
          }

          .menu-area {
            margin-top: 15px;
          }

          .btn-box {
            margin-top: 15px;
          }
        }
      `}</style>
    </>
  );
}

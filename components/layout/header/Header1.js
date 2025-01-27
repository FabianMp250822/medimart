"use client";

import Link from "next/link";
import Menu from "../Menu";
import MobileMenu from "../MobileMenu";
import { useSede } from "@/app/context/SedeContext";

// 1. Importa 'Script' desde 'next/script'
import Script from "next/script";

export default function Header1({
  scroll,
  isMobileMenu,
  handleMobileMenu,
  isSidebar,
  handlePopup,
  handleSidebar,
}) {
  const { sedesData, selectedSede, selectSede } = useSede();

  const sedeData = sedesData[selectedSede];
  const whatsappNumber = sedeData?.whatsappNumber || "+573003456789";
  const whatsappMessage =
    sedeData?.whatsappMessage ||
    "Hola, me gustaría saber más sobre las consultas disponibles en la Clínica de la Costa.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const handleSedeChange = (event) => {
    const nuevaSede = event.target.value;
    if (sedesData[nuevaSede]) {
      selectSede(nuevaSede);
      localStorage.setItem("selectedSede", nuevaSede);
    }
  };

  return (
    <>
      {/*
        2. Agrega el script principal de Google Tag Manager (GTM).
           Esto insertará <script> con la estrategia de carga "afterInteractive".
      */}
      <Script id="gtm-init" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){
              w[l] = w[l] || [];
              w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
              var f = d.getElementsByTagName(s)[0],
                  j = d.createElement(s),
                  dl = l != 'dataLayer' ? '&l=' + l : '';
              j.async = true;
              j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
              f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5MZSVT7Q');
        `}
      </Script>

      {/*
        3. Agrega el bloque <noscript> con el iframe de GTM.
           Para evitar problemas de JSX con <noscript>, puedes hacerlo de 2 maneras:
             - Usar 'dangerouslySetInnerHTML'
             - Insertarlo directamente como JSX (Next.js lo respeta).
      */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-5MZSVT7Q"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>

      <header className={`main-header ${scroll ? "fixed-header" : ""}`}>
        <div className="header-top">
          <div className="auto-container">
            <div className="top-inner">
              <ul className="info-list clearfix">
                <li>
                  <i className="icon-1"></i>
                  Atención:
                  <Link href={`tel:${sedeData?.telefono}`}>
                    {sedeData?.telefono || "+57 (605) 3369973"}
                  </Link>
                </li>
                {/* Ocultar este elemento en móvil */}
                <li className="direccion">
                  <img src="/assets/images/icons/icon-1.png" alt="Icono" />
                  {sedeData?.direccion || "Cra. 50 #80-149, Sede 3"}
                </li>
                <li>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-whatsapp" /> WhatsApp
                  </a>
                </li>
              </ul>

              <div className="sede-selector">
                <label htmlFor="sede-select">Seleccionar Sede:</label>
                <select
                  id="sede-select"
                  value={selectedSede || ""}
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

        <div className="header-lower">
          <div className="outer-container">
            <div className="auto-container">
              <div className="outer-box">
                <div className="logo-box">
                  <figure className="logo">
                    <Link href="/">
                      <img
                        src="/assets/images/logo.png"
                        alt="Clínica de la Costa"
                        className="logo-image"
                      />
                    </Link>
                  </figure>
                </div>
                <div className="menu-area">
                  <div
                    className="mobile-nav-toggler"
                    onClick={handleMobileMenu}
                  >
                    <i className="icon-bar" />
                    <i className="icon-bar" />
                    <i className="icon-bar" />
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
                  <Link href="/empleos" className="theme-btn btn-one">
                    <span>Trabaje con nosotros</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <MobileMenu handleMobileMenu={handleMobileMenu} />
      </header>

      <style jsx>{`
        /* Estilos generales para escritorio y móvil */
        .top-inner {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
        }

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

        .logo-image {
          max-width: 150px;
          height: auto;
        }

        .header-lower {
          padding: 20px 0;
        }

        .outer-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        /* Ajustes responsivos */
        @media (max-width: 768px) {
          .top-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
          }

          .info-list {
            width: 100%;
            flex-direction: column;
            gap: 5px;
            padding: 10px 0;
          }

          .info-list .direccion {
            display: none;
          }

          .info-list li {
            font-size: 0.9rem;
          }

          .sede-selector {
            width: 100%;
            flex-direction: column;
            align-items: flex-start;
            margin-top: 5px;
          }

          .custom-select {
            width: 100%;
            padding: 8px 12px;
            font-size: 0.9rem;
          }

          .logo-image {
            max-width: 80px;
          }

          .outer-box {
            flex-direction: row;
            justify-content: space-between;
            gap: 10px;
          }

          .menu-area {
            display: flex;
            justify-content: center;
          }

          .theme-btn.btn-one {
            padding: 8px 16px;
            font-size: 0.8rem;
            border-radius: 4px; /* Cambiar a una forma más cuadrada */
            max-width: 120px; /* Reducir el tamaño del botón */
          }

          .mobile-nav-toggler {
            font-size: 1.2rem;
            margin-top: 5px;
          }
        }
      `}</style>
    </>
  );
}

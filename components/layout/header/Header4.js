"use client";

import Link from "next/link";
import Menu from "../Menu";
import MobileMenu from "../MobileMenu";
import { useSede } from "@/app/context/SedeContext";
import Script from "next/script";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";

export default function Header4({
  scroll,
  isMobileMenu,
  handleMobileMenu,
  isSidebar,
  handlePopup,
  handleSidebar,
}) {
  const { sedesData, selectedSede, selectSede } = useSede();
  const { t, i18n } = useTranslation();

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

  // Funciones para cambiar el idioma manualmente
  const changeLanguageToES = () => {
    i18n.changeLanguage("es");
  };

  const changeLanguageToEN = () => {
    i18n.changeLanguage("en");
  };

  return (
    <>
      {/* Script de Google Tag Manager */}
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

      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-5MZSVT7Q"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>

      <header className={`main-header ${scroll ? "fixed-header" : ""}`}>
        {/* Sección superior */}
        <div className="header-top">
          <div className="auto-container">
            {/* top-inner con 5 columnas usando CSS Grid */}
            <div className="top-inner grid-five-columns">
              {/* 1. Columna: Atención (atencion) */}
              <div className="column">
                <i className="icon-1" />
                {t("atencion")}:
                <Link href={`tel:${sedeData?.telefono}`}>
                  {sedeData?.telefono || "+57 (605) 3369973"}
                </Link>
              </div>

              {/* 2. Columna: Dirección (oculta en móvil con CSS) */}
              <div className="column direccion">
                <img src="/assets/images/icons/icon-1.png" alt="Icono" />
                {sedeData?.direccion || "Cra. 50 #80-149, Sede 3"}
              </div>

              {/* 3. Columna: WhatsApp */}
              <div className="column">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-whatsapp" /> WhatsApp
                </a>
              </div>

              {/* 4. Columna: Banderas para cambiar idioma */}
              <div className="column language-switcher">
                <ReactCountryFlag
                  countryCode="ES"
                  svg
                  style={{
                    width: "2em",
                    height: "2em",
                    cursor: "pointer",
                    marginRight: "0.5em",
                  }}
                  title="Español"
                  onClick={changeLanguageToES}
                />
                <ReactCountryFlag
                  countryCode="US"
                  svg
                  style={{
                    width: "2em",
                    height: "2em",
                    cursor: "pointer",
                  }}
                  title="English"
                  onClick={changeLanguageToEN}
                />
              </div>

              {/* 5. Columna: Selector de sede (seleccionarSede) */}
              <div className="column sede-selector">
                <label htmlFor="sede-select">{t("seleccionarSede")}:</label>
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

        {/* Sección inferior (logo, menú, botón, etc.) */}
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
                  {/* Botón: Trabaje con nosotros (trabajeConNosotros) */}
                  <Link href="/empleos" className="theme-btn btn-one">
                    <span>{t("trabajeConNosotros")}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <MobileMenu handleMobileMenu={handleMobileMenu} />
      </header>

      {/* Estilos */}
      <style jsx>{`
        /* Ajustes base para el header */
        .main-header {
          background-color: #005687; /* Ejemplo de color */
        }

        /* Estilos para la parte top en Grid */
        .top-inner.grid-five-columns {
          display: grid;
          grid-template-columns: repeat(5, auto);
          gap: 20px;
          align-items: center;
          padding: 15px 0;
        }

        .column {
          display: flex;
          align-items: center;
          gap: 5px;
          color: white;
        }

        @media (max-width: 768px) {
          .direccion {
            display: none;
          }
        }

        .language-switcher {
          display: flex;
          align-items: center;
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

        .column a {
          color: white;
          text-decoration: none;
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
        .logo-image {
          max-width: 150px;
          height: auto;
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

        @media (max-width: 768px) {
          .top-inner.grid-five-columns {
            grid-template-columns: 1fr;
          }
          .column {
            margin-bottom: 5px;
          }
          .outer-box {
            flex-direction: row;
            justify-content: space-between;
            gap: 10px;
          }
          .mobile-nav-toggler {
            font-size: 1.2rem;
            margin-top: 5px;
          }
          .logo-image {
            max-width: 80px;
          }
          .theme-btn.btn-one {
            padding: 8px 16px;
            font-size: 0.8rem;
            border-radius: 4px;
            max-width: 120px;
          }
        }
      `}</style>
    </>
  );
}

'use client';
import Link from "next/link";
import { useState } from "react";

export default function MobileMenu({ isSidebar, handleMobileMenu, handleSidebar }) {
  const [isActive, setIsActive] = useState({
    status: false,
    key: "",
    subMenuKey: "",
  });

  const handleToggle = (key, subMenuKey = "") => {
    if (isActive.key === key && isActive.subMenuKey === subMenuKey) {
      setIsActive({
        status: false,
        key: "",
        subMenuKey: "",
      });
    } else {
      setIsActive({
        status: true,
        key,
        subMenuKey,
      });
    }
  };

  return (
    <>
      <div className="mobile-menu">
        <div className="menu-backdrop" onClick={handleMobileMenu} />
        <div className="close-btn" onClick={handleMobileMenu}>
          <span className="far fa-times" />
        </div>
        <nav className="menu-box">
          <div className="nav-logo">
            <Link href="/">
              <img src="/assets/images/logo-2.png" alt="Clínica de la Costa" />
            </Link>
          </div>
          <div className="menu-outer">
            <ul className="navigation clearfix">
              {/* Inicio */}
              <li>
                <Link href="/">Inicio</Link>
              </li>

              {/* Nosotros */}
              <li className={isActive.key === 1 ? "dropdown current" : "dropdown"}>
                <Link href="/about-us">Nosotros</Link>
                <ul style={{ display: `${isActive.key === 1 ? "block" : "none"}` }}>
                  <li><Link href="/service-details-2" onClick={handleMobileMenu}>Gestión Documental</Link></li>
                </ul>
                <div
                  className={isActive.key === 1 ? "dropdown-btn open" : "dropdown-btn"}
                  onClick={() => handleToggle(1)}
                >
                  <span className="fa fa-angle-right" />
                </div>
              </li>

              {/* Servicios */}
              <li className={isActive.key === 2 ? "dropdown current" : "dropdown"}>
                <Link href="/service-details-6">Servicios</Link>
                <ul style={{ display: `${isActive.key === 2 ? "block" : "none"}` }}>
                  <li><Link href="/works" onClick={handleMobileMenu}>Servicio de Urgencias</Link></li>
                  <li><Link href="/hospitalizacion" onClick={handleMobileMenu}>Hospitalización</Link></li>
                  <li><Link href="/cuidado-critico" onClick={handleMobileMenu}>Cuidado Crítico</Link></li>
                  <li><Link href="/imagenes-diagnosticas" onClick={handleMobileMenu}>Departamento de Imágenes Diagnósticas</Link></li>
                  <li><Link href="/laboratorio-patologia" onClick={handleMobileMenu}>Laboratorio de Patología</Link></li>
                  <li><Link href="/laboratorio-clinico" onClick={handleMobileMenu}>Laboratorio Clínico</Link></li>
                  <li><Link href="/programas-especiales" onClick={handleMobileMenu}>Programas Especiales</Link></li>
                </ul>
                <div
                  className={isActive.key === 2 ? "dropdown-btn open" : "dropdown-btn"}
                  onClick={() => handleToggle(2)}
                >
                  <span className="fa fa-angle-right" />
                </div>
              </li>

              {/* Pacientes */}
              <li>
                <Link href="/pacientes" onClick={handleMobileMenu}>Pacientes</Link>
              </li>

              {/* Equipo */}
              <li className={isActive.key === 3 ? "dropdown current" : "dropdown"}>
                <Link href="/">Equipo</Link>
                <ul style={{ display: `${isActive.key === 3 ? "block" : "none"}` }}>
                  <li><Link href="/team" onClick={handleMobileMenu}>Nuestro Equipo</Link></li>
                </ul>
                <div
                  className={isActive.key === 3 ? "dropdown-btn open" : "dropdown-btn"}
                  onClick={() => handleToggle(3)}
                >
                  <span className="fa fa-angle-right" />
                </div>
              </li>

              {/* Preguntas Frecuentes */}
              <li>
                <Link href="/faq" onClick={handleMobileMenu}>Faq's</Link>
              </li>

              {/* Contacto */}
              <li>
                <Link href="/contact" onClick={handleMobileMenu}>Contacto</Link>
              </li>
            </ul>
          </div>

          {/* Información de Contacto */}
          <div className="contact-info">
            <h4>Contáctanos</h4>
            <ul>
              <li>Cra. 50 #80-144, Barranquilla, Colombia</li>
              <li><Link href="tel:+576053369999">+57 (605) 3369999 Ext 0</Link></li>
              <li><Link href="mailto:consultaexterna@clinicadelacosta.co">consultaexterna@clinicadelacosta.co</Link></li>
              <li><Link href="mailto:info@clinicadelacosta.co">info@clinicadelacosta.co</Link></li>
              <li><Link href="mailto:juridica@clinicadelacosta.co">juridica@clinicadelacosta.co</Link></li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div className="social-links">
            <ul className="clearfix">
              <li><Link href="/"><span className="fab fa-twitter" /></Link></li>
              <li><Link href="/"><span className="fab fa-facebook-square" /></Link></li>
              <li><Link href="/"><span className="fab fa-pinterest-p" /></Link></li>
              <li><Link href="/"><span className="fab fa-instagram" /></Link></li>
              <li><Link href="/"><span className="fab fa-youtube" /></Link></li>
            </ul>
          </div>
        </nav>
      </div>
      <div
        className="nav-overlay"
        style={{ display: `${isSidebar ? "block" : "none"}` }}
        onClick={handleSidebar}
      />
    </>
  );
}

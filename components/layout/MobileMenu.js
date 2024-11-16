'use client';

import Link from "next/link";
import { useState } from "react";

export default function MobileMenu({ isSidebar, handleMobileMenu, handleSidebar }) {
  const [isActive, setIsActive] = useState({
    status: false,
    key: "",
  });

  const nosotrosMenuItems = [
    { title: "Acerca de Nosotros: Misión, Visión, Valores, Historia", link: "/service-details-3" },
    { title: "Trabaja con nosotros", link: "/trabaja-con-nosotros" },
    { title: "Gestión Documental", link: "/service-details-2" },
    { title: "Certificaciones", link: "/certificaciones" },
    { title: "Responsabilidad social y empresarial", link: "/responsabilidad-social" },
    { title: "Direccionamiento Estratégico", link: "/direccionamiento-estrategico" },
    { title: "Marco Legal", link: "/marco-legal" },
    { title: "Informes de Sostenibilidad", link: "/informes-de-sostenibilidad" },
    { title: "Sistema Integrado de Gestión", link: "/sistema-integrado-de-gestion" },
    { title: "Política de tratamiento de datos", link: "/politica-de-datos" },
  ];

  const pacientesMenuItems = [
    { title: "Tus Resultados Médicos", link: "/reclamar-resultados" },
    { title: "Solicitar Cita Médica", link: "/appointment" },
    { title: "Directorio de Especialidades y Servicios", link: "/service-details-6" },
  ];

  const handleToggle = (key) => {
    setIsActive((prevState) => ({
      status: prevState.key !== key || !prevState.status,
      key,
    }));
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
                <Link href="#">Nosotros</Link>
                <ul style={{ display: `${isActive.key === 1 ? "block" : "none"}` }}>
                  {nosotrosMenuItems.map((item, index) => (
                    <li key={index}>
                      <Link href={item.link} onClick={handleMobileMenu}>
                        {item.title}
                      </Link>
                    </li>
                  ))}
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
                <div
                  className={isActive.key === 2 ? "dropdown-btn open" : "dropdown-btn"}
                  onClick={() => handleToggle(2)}
                >
                  <span className="fa fa-angle-right" />
                </div>
              </li>

              {/* Pacientes */}
              <li className={isActive.key === 3 ? "dropdown current" : "dropdown"}>
                <Link href="#">Pacientes</Link>
                <ul style={{ display: `${isActive.key === 3 ? "block" : "none"}` }}>
                  {pacientesMenuItems.map((item, index) => (
                    <li key={index}>
                      <Link href={item.link} onClick={handleMobileMenu}>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div
                  className={isActive.key === 3 ? "dropdown-btn open" : "dropdown-btn"}
                  onClick={() => handleToggle(3)}
                >
                  <span className="fa fa-angle-right" />
                </div>
              </li>

              {/* Equipo */}
              <li className={isActive.key === 4 ? "dropdown current" : "dropdown"}>
                <Link href="/team">Especialistas</Link>
                <div
                  className={isActive.key === 4 ? "dropdown-btn open" : "dropdown-btn"}
                  onClick={() => handleToggle(4)}
                >
                  <span className="fa fa-angle-right" />
                </div>
              </li>

              {/* Preguntas Frecuentes */}
              <li>
                <Link href="/faq" onClick={handleMobileMenu}>
                  Faq's
                </Link>
              </li>

              {/* Contacto */}
              <li>
                <Link href="/contact" onClick={handleMobileMenu}>
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Información de Contacto */}
          <div className="contact-info">
            <h4>Contáctanos</h4>
            <ul>
              <li>Cra. 50 #80-144, Barranquilla, Colombia</li>
              <li>
                <Link href="tel:+576053369999">+57 (605) 3369999 Ext 0</Link>
              </li>
              <li>
                <Link href="mailto:consultaexterna@clinicadelacosta.co">consultaexterna@clinicadelacosta.co</Link>
              </li>
              <li>
                <Link href="mailto:info@clinicadelacosta.co">info@clinicadelacosta.co</Link>
              </li>
              <li>
                <Link href="mailto:juridica@clinicadelacosta.co">juridica@clinicadelacosta.co</Link>
              </li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div className="social-links">
            <ul className="clearfix">
              <li>
                <Link href="/">
                  <span className="fab fa-twitter" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="fab fa-facebook-square" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="fab fa-pinterest-p" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="fab fa-instagram" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="fab fa-youtube" />
                </Link>
              </li>
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

'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function MobileMenu({ isSidebar, handleMobileMenu, handleSidebar }) {
  const [isActive, setIsActive] = useState({
    status: false,
    key: "",
  });

  const [nosotrosSubmenu, setNosotrosSubmenu] = useState([]);
  const [pacientesSubmenu, setPacientesSubmenu] = useState([]);

  useEffect(() => {
    const fetchNosotrosSubmenu = async () => {
      try {
        const nosotrosRef = collection(db, 'nosotros');
        const nosotrosSnapshot = await getDocs(nosotrosRef);
        const submenus = nosotrosSnapshot.docs
          .map(doc => ({
            id: doc.id,
            title: doc.data().nombre
          }))
          .filter(submenu => submenu.title.toLowerCase() !== 'gestión documental'); // Excluir "Gestión Documental"
          
        setNosotrosSubmenu(submenus);
      } catch (error) {
        console.error("Error fetching nosotros submenu:", error);
      }
    };

    const fetchPacientesSubmenu = async () => {
      try {
        const pacientesRef = collection(db, 'pacientes');
        const pacientesSnapshot = await getDocs(pacientesRef);
        const submenus = pacientesSnapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().nombre
        }));
        setPacientesSubmenu(submenus);
      } catch (error) {
        console.error("Error fetching pacientes submenu:", error);
      }
    };

    fetchNosotrosSubmenu();
    fetchPacientesSubmenu();
  }, []);

  const handleToggle = (key) => {
    setIsActive(prevState => ({
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
                  {/* Excluir Gestión Documental */}
                  <li><Link href="/service-details-2" onClick={handleMobileMenu}>Gestión Documental</Link></li>

                  {/* Renderizar submenús dinámicamente */}
                  {nosotrosSubmenu.map((submenu) => {
                    const title = submenu.title.toLowerCase();

                    // Verificar si el título es "Directorio de Especialidades y Servicios"
                    if (title === "directorio de especialidades y servicios") {
                      return (
                        <li key={submenu.id}>
                          <Link href="/service-details-6" onClick={handleMobileMenu}>Directorio de Especialidades y Servicios</Link>
                        </li>
                      );
                    }

                    return (
                      <li key={submenu.id}>
                        <Link href={`/nosotros/${submenu.id}`} onClick={handleMobileMenu}>{submenu.title}</Link>
                      </li>
                    );
                  })}
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
                  {pacientesSubmenu.map((submenu) => {
                    const title = submenu.title.toLowerCase();

                    // Verificar si el título es "Tus Resultados Médicos" o "Solicitar Cita"
                    if (title === "tus resultados médicos") {
                      return (
                          <li key={submenu.id}>
                              <Link href="/reclamar-resultados">Tus Resultados Médicos</Link>
                          </li>
                      );
                  } else if (title === "solicitar cita" || title === "solicitar cita médica") {
                      return (
                          <li key={submenu.id}>
                              <Link href="/appointment">Solicitar Cita Médica</Link>
                          </li>
                      );
                  } else if (title === "directorio de especialidades y servicios") {
                      return (
                          <li key={submenu.id}>
                              <Link href="/service-details-6">Directorio de Especialidades y Servicios</Link>
                          </li>
                      );
                  }

                    // Para el resto de los elementos, usar la ruta dinámica
                    return (
                      <li key={submenu.id}>
                        <Link href={`/pacientes/${submenu.id}`} onClick={handleMobileMenu}>{submenu.title}</Link>
                      </li>
                    );
                  })}
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

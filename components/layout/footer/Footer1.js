"use client"; // Asegura que este componente sea un Client Component

import Link from "next/link";
import { useSede } from "@/app/context/SedeContext";

export default function Footer1() {
  const { sedeData } = useSede(); // Obtener los datos de la sede seleccionada

  return (
    <>
      <footer className="main-footer" id="footer">
        <div className="pattern-layer">
          <div
            className="pattern-1"
            style={{
              backgroundImage: "url(assets/images/shape/shape-23.png)",
            }}
          ></div>
          <div
            className="pattern-2"
            style={{
              backgroundImage: "url(assets/images/shape/shape-24.png)",
            }}
          ></div>
          <div
            className="pattern-3"
            style={{
              backgroundImage: "url(assets/images/shape/shape-25.png)",
            }}
          ></div>
          <div className="pattern-4"></div>
        </div>
        <div className="widget-section pt_120 pb_100">
          <div className="auto-container">
            <div className="row clearfix">
              {/* Logo y descripción */}
              <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                <div className="footer-widget logo-widget">
                  <figure className="footer-logo">
                    <Link href="/">
                      <img
                        src="assets/images/footer-logo.png"
                        alt="Clínica de la Costa"
                      />
                    </Link>
                  </figure>
                  <p>
                    Clínica de la Costa: brindando servicios médicos de calidad
                    durante más de 30 años, combinando experiencia y tecnología
                    avanzada para cuidar tu salud.
                  </p>
                  <ul className="social-links clearfix">
                    <li>
                      <Link href="https://www.facebook.com/clinicadelacosta">
                        <i className="icon-4"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://www.instagram.com/clinicadelacosta">
                        <i className="icon-5"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Enlaces rápidos */}
              <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                <div className="footer-widget links-widget ml_110">
                  <div className="widget-title">
                    <h3>Enlaces Rápidos</h3>
                  </div>
                  <div className="widget-content">
                    <ul className="links-list clearfix">
                      <li>
                        <Link href="/">Inicio</Link>
                      </li>
                      <li>
                        <Link href="/about">Sobre Nosotros</Link>
                      </li>
                      <li>
                        <Link href="/services">Servicios</Link>
                      </li>
                      <li>
                        <Link href="/contact">Contáctenos</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Información legal */}
              <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                <div className="footer-widget links-widget ml_55">
                  <div className="widget-title">
                    <h3>Información Legal</h3>
                  </div>
                  <div className="widget-content">
                    <ul className="links-list clearfix">
                      <li>
                        <Link href="/privacy-policy">
                          Política de Privacidad
                        </Link>
                      </li>
                      <li>
                        <Link href="/terms-conditions">
                          Términos y Condiciones
                        </Link>
                      </li>
                      <li>
                        <Link href="/faq">Preguntas Frecuentes</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Información de contacto */}
              <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                <div className="footer-widget contact-widget">
                  <div className="widget-title">
                    <h3>Contáctanos</h3>
                  </div>
                  <div className="widget-content">
                    <ul className="info-list">
                      <li>
                        <img
                          src="assets/images/icons/icon-1.png"
                          alt=""
                        />{" "}
                        {sedeData?.direccion ||
                          "Cra. 50 #80-144, Barranquilla, Colombia"}
                      </li>
                      <li>
                        <i className="icon-2"></i>
                        <Link href={`tel:${sedeData?.telefono}`}>
                          {sedeData?.telefono || "+57 (605) 3369999 Ext 0"}
                        </Link>
                      </li>
                      <li>
                        <i className="icon-26"></i>
                        <Link
                          href={`mailto:${
                            sedeData?.email ||
                            "consultaexterna@clinicadelacosta.co"
                          }`}
                        >
                          {sedeData?.email ||
                            "consultaexterna@clinicadelacosta.co"}
                        </Link>
                      </li>
                      {/* Puedes agregar más correos si están disponibles en sedeData */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer inferior */}
        <div className="footer-bottom">
          <div className="auto-container">
            <div className="bottom-inner">
              <ul className="footer-nav clearfix">
                <li>
                  <Link href="/privacy-policy">Política de Privacidad</Link>
                </li>
                <li>
                  <Link href="/terms-conditions">Términos de Uso</Link>
                </li>
                <li>
                  <Link href="/faq">Preguntas Frecuentes</Link>
                </li>
              </ul>
              <div className="copyright">
                <p>
                  &copy; 2024 Clínica de la Costa. Todos los derechos reservados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* Puedes agregar estilos aquí si es necesario */}
    </>
  );
}

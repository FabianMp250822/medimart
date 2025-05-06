"use client";

import Link from "next/link";
import { useSede } from "@/app/context/SedeContext";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { SiTiktok } from "react-icons/si";
import Image from "next/image";

export default function Footer2() {
  const { sedeData } = useSede();

  return (
    <>
      <footer className="main-footer" id="footer">
        <div className="pattern-layer">
          <div
            className="pattern-1"
            style={{ backgroundImage: "url(assets/images/shape/shape-23.png)" }}
          ></div>
          <div
            className="pattern-2"
            style={{ backgroundImage: "url(assets/images/shape/shape-24.png)" }}
          ></div>
          <div
            className="pattern-3"
            style={{ backgroundImage: "url(assets/images/shape/shape-25.png)" }}
          ></div>
          <div className="pattern-4"></div>
        </div>

        <div className="widget-section pt_120 pb_100">
          <div className="auto-container">
            <div className="row clearfix">
              {/* 1. Logo + Redes */}
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
                  <p style={{ fontFamily: "Nunito Sans", fontSize: "16px" }}>
                    Clínica de la Costa: brindando servicios médicos de calidad
                    durante más de 30 años, combinando experiencia y tecnología
                    avanzada para cuidar tu salud.
                  </p>
                  <ul className="social-links clearfix flex gap-4">
                    <li>
                      <Link
                        href="https://web.facebook.com/profile.php?id=61572428767172"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <AiFillFacebook size={24} />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.instagram.com/clinica_de_la_costa/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <AiFillInstagram size={24} />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.youtube.com/@Cl%C3%ADnicadelacosta-b9q"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <AiFillYoutube size={24} />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://x.com/CliCosta01"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <AiOutlineTwitter size={24} />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.tiktok.com/@clicosta1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SiTiktok size={24} />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 2. Enlaces Rápidos */}
              <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                <div className="footer-widget links-widget ml_110">
                  <div className="widget-title">
                    <h3 style={{ fontFamily: "Nunito Sans", fontSize: "18px" }}>
                      Enlaces Rápidos
                    </h3>
                  </div>
                  <div className="widget-content">
                    <ul
                      className="links-list clearfix"
                      style={{ fontFamily: "Nunito Sans", fontSize: "16px" }}
                    >
                      <li>
                        <Link href="www.invclicosta.com" target="_blank" rel="noopener noreferrer">
                          Centro de Investigacion
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.cideacc.com" target="_blank" rel="noopener noreferrer"
                        >
                          CIDEACC
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://citas-beta.vercel.app/en" target="_blank" rel="noopener noreferrer"
                        >
                          Admin Citas
                        </Link>
                      </li>
                     
                    </ul>
                  </div>
                </div>
              </div>

              {/* 3. Información Legal */}
              <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                <div className="footer-widget links-widget ml_55">
                  
                  <div
                  className="footer-widget contact-widget"
                  style={{ marginTop: "30px" }}
                >
                  <div className="widget-title">
                    <h3 style={{ fontFamily: "Nunito Sans", fontSize: "18px" }}>
                      Notificaciones Judiciales
                    </h3>
                  </div>
                  <div
                    className="widget-content"
                    style={{ fontFamily: "Nunito Sans", fontSize: "16px" }}
                  >
                    <ul className="info-list">
                      <li>
                        <i className="icon-26"></i>
                        <Link href="mailto:info@clinicadelacosta.co">
                          info@clinicadelacosta.co
                        </Link>
                      </li>
                      <li>
                        <i className="icon-26"></i>
                        <Link href="mailto:juridica@clinicadelacosta.co">
                          juridica@clinicadelacosta.co
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                </div>
              </div>

              {/* 4. Contáctanos + Notificaciones Judiciales */}
              <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                <div className="footer-widget contact-widget">
                  <div className="widget-title">
                    <h3 style={{ fontFamily: "Nunito Sans", fontSize: "18px" }}>
                      Contáctanos
                    </h3>
                  </div>
                  <div
                    className="widget-content"
                    style={{ fontFamily: "Nunito Sans", fontSize: "16px" }}
                  >
                    <ul className="info-list">
                      <li>
                        <img
                          src="assets/images/icons/icon-1.png"
                          alt="Dirección"
                        />
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
                    </ul>
                  </div>
                </div>

              
                {/* Fin Notificaciones Judiciales */}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="auto-container">
            <div className="bottom-inner">
              <div className="vigilado-supersalud">
                <Link
                  href="https://www.supersalud.gov.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/assets/images/banner/supersalud.svg"
                    alt="Vigilado Supersalud"
                    width={200}
                    height={50}
                  />
                </Link>
              </div>

              <div
                className="copyright"
                style={{ fontFamily: "Nunito Sans", fontSize: "16px" }}
              >
                <p>
                  &copy; 2024 Clínica de la Costa. Diseño y Desarrollo: Fabian
                  Muñoz Puello &amp; Leidy Vega Anaya. Todos los derechos
                  reservados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

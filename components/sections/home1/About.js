"use client";

import Link from 'next/link';
import React from 'react';
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  return (
    <section className="about-section pt_120 pb_120 bg-color-1">
      <div className="pattern-layer">
        <div className="pattern-1 rotate-me" style={{ backgroundImage: 'url(assets/images/shape/shape-8.png)' }}></div>
        <div className="pattern-2 rotate-me" style={{ backgroundImage: 'url(assets/images/shape/shape-8.png)' }}></div>
        <div className="pattern-3 rotate-me" style={{ backgroundImage: 'url(assets/images/shape/shape-9.png)' }}></div>
        <div className="pattern-4" style={{ backgroundImage: 'url(assets/images/shape/shape-10.png)' }}></div>
        <div className="pattern-5" style={{ backgroundImage: 'url(assets/images/shape/shape-11.png)' }}></div>
      </div>
      <div className="auto-container">
        <div className="row clearfix">
          <div className="col-lg-6 col-md-12 col-sm-12 image-column">
            <div className="image_block_one">
              <div className="image-box">
                <div className="shape float-bob-x" style={{ backgroundImage: 'url(assets/images/shape/shape-7.png)' }}></div>
                <figure className="image">
                  <img 
                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%2011.40.55%20AM.jpeg?alt=media&token=128aa14c-6aa0-4a6f-a301-68276956f641" 
                    alt={t("equipoMedico")} 
                  />
                </figure>
                <div className="icon-one"><i className="icon-13"></i></div>
                <div className="icon-two"><i className="icon-14"></i></div>
                <div className="text-box">
                  <h3>{t("clinicaDeLaCosta")}</h3>
                  <span>{t("comprometidosConTuBienestar")}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 content-column">
            <div className="content_block_one">
              <div className="content-box ml_30">
                <div className="sec-title mb_15">
                  <span className="sub-title">{t("sobreNosotros")}</span>
                  <h2>{t("comprometidosConTuSalud")}</h2>
                </div>
                <div className="text-box mb_40">
                  <h6>{t("clinicaFamilia")}</h6>
                  <p>{t("descripcionSobreNosotros")}</p>
                  <ul className="list-style-one clearfix">
                    <li>{t("serviciosAmbulancia")}</li>
                    <li>{t("oxigenoADomicilio")}</li>
                    <li>{t("farmaciaEnClinica")}</li>
                    <li>{t("medicosDeGuardia")}</li>
                    <li>{t("emergenciasMedicas")}</li>
                  </ul>
                </div>
                <div className="btn-box">
                  <Link href="/appointment" className="theme-btn btn-one">
                    <span>{t("descubreMasSobreNosotros")}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

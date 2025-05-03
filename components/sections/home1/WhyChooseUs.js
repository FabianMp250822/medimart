"use client";

import Link from 'next/link';
import React from 'react';
import { useTranslation } from "react-i18next";

export default function ChooseUs() {
  const { t } = useTranslation();

  return (
    <section className="chooseus-section">
      <div
        className="bg-layer"
        style={{
          backgroundImage:
            'url(https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%205.39.18%20PM.jpeg?alt=media&token=f5430294-929e-4089-be48-1ee6674b1d1f)'
        }}
      ></div>
      <div
        className="pattern-layer"
        style={{ backgroundImage: 'url(assets/images/shape/shape-12.png)' }}
      ></div>
      <div className="auto-container">
        <div className="row clearfix">
          <div className="col-lg-8 col-md-12 col-sm-12 content-column">
            <div className="content-box">
              <div className="sec-title light mb_50">
                <span className="sub-title">{t("porQueElegirnos")}</span>
                <h2
                  dangerouslySetInnerHTML={{
                    __html: t("tuSaludEsNuestraMayorPrioridad")
                  }}
                ></h2>
              </div>
              <div className="row clearfix">
                {/* Bloque 1: Personal Médico Comprometido */}
                <div className="col-lg-6 col-md-6 col-sm-12 chooseus-block">
                  <div className="chooseus-block-one">
                    <div className="inner-box">
                      <div className="icon-box">
                        <i className="icon-18"></i>
                      </div>
                      <h3>{t("personalMedicoComprometido")}</h3>
                      <p>{t("descripcionPersonalMedicoComprometido")}</p>
                    </div>
                  </div>
                </div>
                {/* Bloque 2: Atención de Emergencias 24/7 */}
                <div className="col-lg-6 col-md-6 col-sm-12 chooseus-block">
                  <div className="chooseus-block-one">
                    <div className="inner-box">
                      <div className="icon-box">
                        <i className="icon-21"></i>
                      </div>
                      <h3>{t("atencionEmergencias24")}</h3>
                      <p>{t("descripcionAtencionEmergencias24")}</p>
                    </div>
                  </div>
                </div>
                {/* Bloque 3: Citas Médicas en Línea */}
                <div className="col-lg-6 col-md-6 col-sm-12 chooseus-block">
                  <div className="chooseus-block-one">
                    <div className="inner-box">
                      <div className="icon-box">
                        <i className="icon-19"></i>
                      </div>
                      <h3>{t("citasMedicasEnLinea")}</h3>
                      <p>{t("descripcionCitasMedicasEnLinea")}</p>
                    </div>
                  </div>
                </div>
                {/* Bloque 4: Atención Continuada */}
                <div className="col-lg-6 col-md-6 col-sm-12 chooseus-block">
                  <div className="chooseus-block-one">
                    <div className="inner-box">
                      <div className="icon-box">
                        <i className="icon-20"></i>
                      </div>
                      <h3>{t("atencionContinuada")}</h3>
                      <p>{t("descripcionAtencionContinuada")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Puedes agregar más columnas o contenido adicional si lo deseas */}
        </div>
      </div>
    </section>
  );
}

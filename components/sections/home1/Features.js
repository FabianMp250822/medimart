"use client";

import Link from 'next/link';
import React from 'react';
import { useTranslation } from "react-i18next";

export default function Feature() {
  const { t } = useTranslation();

  return (
    <section className="feature-section pt_120 pb_90">
      <div className="shape" style={{ backgroundImage: 'url(assets/images/shape/shape-6.png)' }}></div>
      <div className="auto-container">
        <div className="row clearfix">
          <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
            <div className="feature-block-one" style={{ height: '100%' }}>
              <div className="inner-box" style={{ height: '100%' }}>
                <div className="icon-box"><i className="icon-9"></i></div>
                <h3>
                  <Link href="/">{t("atencionPersonalizada")}</Link>
                </h3>
                <p>{t("descripcionAtencionPersonalizada")}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
            <div className="feature-block-one" style={{ height: '100%' }}>
              <div className="inner-box" style={{ height: '100%' }}>
                <div className="icon-box"><i className="icon-10"></i></div>
                <h3>
                  <Link href="/">{t("urgenciasDisponibles")}</Link>
                </h3>
                <p>{t("descripcionUrgenciasDisponibles")}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
            <div className="feature-block-one" style={{ height: '100%' }}>
              <div className="inner-box" style={{ height: '100%' }}>
                <div className="icon-box"><i className="icon-11"></i></div>
                <h3>
                  <Link href="/">{t("cuidadoConTecnologia")}</Link>
                </h3>
                <p>{t("descripcionCuidadoConTecnologia")}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
            <div className="feature-block-one" style={{ height: '100%' }}>
              <div className="inner-box" style={{ height: '100%' }}>
                <div className="icon-box"><i className="icon-12"></i></div>
                <h3>
                  <Link href="/">{t("atencionParaTodaLaFamilia")}</Link>
                </h3>
                <p>{t("descripcionAtencionFamilia")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

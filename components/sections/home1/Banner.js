"use client";

import React from 'react';
import Link from "next/link";
import { useSede } from '@/app/context/SedeContext';
import { useTranslation } from "react-i18next";

export default function Banner() {
  const { sedeData } = useSede(); // Obtener datos de la sede seleccionada
  const { t } = useTranslation();

  return (
    <section className="banner-section p_relative" style={{ padding: '160px 0', marginTop: '80px' }}>
      <div className="pattern-layer wow slideInDown animated" data-wow-delay="00ms" data-wow-duration="1500ms" style={{ backgroundImage: 'url(assets/images/shape/shape-1.png)' }}></div>
      <div className="shape">
        <div className="shape-1" style={{ backgroundImage: 'url(assets/images/shape/shape-2.png)' }}></div>
        <div className="shape-3" style={{ backgroundImage: 'url(assets/images/shape/shape-4.png)' }}></div>
        <div className="shape-4" style={{ backgroundImage: 'url(assets/images/shape/shape-5.png)' }}></div>
      </div>
      <div className="auto-container">
        <div className="row align-items-center">
          {/* Contenido del Banner */}
          <div className="col-lg-5 col-md-12 col-sm-12 content-column">
            <div className="content-box">
              <span className="upper-text" style={{ fontSize: '18px' }}>
                {t("cuidandoDeTi")}
              </span>
              <h2 style={{ fontSize: '36px', lineHeight: '1.3em' }}>
                {t("tuSaludPrioridad")} <span>{t("prioridadSpan")}</span>
              </h2>
              <p style={{ fontSize: '16px', lineHeight: '1.5em', maxWidth: '400px' }}>
                {sedeData?.mensaje || t("mensajeDefaultBanner")}
              </p>
              <div className="btn-box">
                <Link href="/appointment" className="theme-btn btn-two">
                  <span>{t("agendaTuCita")}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Imagen del Banner, según la sede */}
          <div className="col-lg-7 col-md-12 col-sm-12 image-column">
            <div className="image-box">
              <figure className="image float-bob-y" style={{ maxWidth: '100%', height: 'auto' }}>
                <img
                  src={sedeData?.image || "assets/images/banner/banner.webp"}
                  alt={sedeData?.nombre || t("altBanner")}
                  style={{
                    width: '100%',
                    height: '500px',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

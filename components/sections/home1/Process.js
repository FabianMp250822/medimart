"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Process() {
  const { t } = useTranslation();

  return (
    <section className="process-section sec-pad" style={{ padding: '100px 0', textAlign: 'center' }}>
      <div className="pattern-layer" style={{ backgroundImage: 'url(assets/images/shape/shape-19.png)' }}></div>
      <div className="shape">
        <div className="shape-1 float-bob-x" style={{ backgroundImage: 'url(assets/images/shape/shape-20.png)' }}></div>
        <div className="shape-2 float-bob-y" style={{ backgroundImage: 'url(assets/images/shape/shape-15.png)' }}></div>
        <div className="shape-3"></div>
      </div>
      <div className="auto-container">
        <div className="sec-title mb_50 centred">
          <span className="sub-title">{t("nuestroProceso")}</span>
          <h2>{t("facilYRapidoComoTeAtendemos")}</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '18px' }}>
            {t("descripcionProceso")}
          </p>
        </div>
        <div className="inner-container">
          <div className="arrow-shape" style={{ backgroundImage: 'url(assets/images/shape/shape-18.png)' }}></div>
          
          {/* Paso 1: Agendar una Cita */}
          <div className="processing-block-one wow fadeInLeft animated" data-wow-delay="00ms" data-wow-duration="1500ms">
            <div className="inner-box">
              <span className="count-text">01</span>
              <figure className="image-box">
                <img 
                  src="assets/images/banner/paceinte22.webp" 
                  alt={t("agendarUnaCita")} 
                  style={{ borderRadius: '10px' }} 
                />
              </figure>
              <div className="lower-content">
                <h3>{t("agendarUnaCita")}</h3>
                <p>{t("descripcionAgendarUnaCita")}</p>
              </div>
            </div>
          </div>
          
          {/* Paso 2: Asiste a tu Cita */}
          <div className="processing-block-one wow fadeInLeft animated" data-wow-delay="150ms" data-wow-duration="1500ms">
            <div className="inner-box">
              <span className="count-text">02</span>
              <figure className="image-box">
                <img 
                  src="assets/images/resource/consulta22.webp" 
                  alt={t("asisteATuCita")} 
                  style={{ borderRadius: '10px' }} 
                />
              </figure>
              <div className="lower-content">
                <h3>{t("asisteATuCita")}</h3>
                <p>{t("descripcionAsisteATuCita")}</p>
              </div>
            </div>
          </div>
          
          {/* Paso 3: Seguimiento Continuo */}
          <div className="processing-block-one wow fadeInLeft animated" data-wow-delay="300ms" data-wow-duration="1500ms">
            <div className="inner-box">
              <span className="count-text">03</span>
              <figure className="image-box">
                <img 
                  src="assets/images/banner/medico22.webp" 
                  alt={t("seguimientoContinuo")} 
                  style={{ borderRadius: '10px' }} 
                />
              </figure>
              <div className="lower-content">
                <h3>{t("seguimientoContinuo")}</h3>
                <p>{t("descripcionSeguimientoContinuo")}</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

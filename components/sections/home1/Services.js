"use client";

import Link from 'next/link';
import React from 'react';
import { useTranslation } from "react-i18next";

export default function Service() {
  const { t } = useTranslation();

  return (
    <section className="service-section sec-pad">
      <div className="auto-container">
        <div className="sec-title mb_50 centred">
          <span className="sub-title">{t("nuestrosServicios")}</span>
          <h2 dangerouslySetInnerHTML={{ __html: t("atencionIntegralCuidandoDeTiSiempre") }}></h2>
        </div>
        <div className="row clearfix">
          {/* Servicio 1: Neurocirugía */}
          <div className="col-lg-4 col-md-6 col-sm-12 service-block">
            <div className="service-block-one wow fadeInUp animated" data-wow-delay="00ms" data-wow-duration="1500ms">
              <div className="inner-box">
                <div className="image-box">
                  <figure className="image">
                    <Link href="service-details-3">
                      <img 
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%204.42.37%20PM(1).jpeg?alt=media&token=a0535648-1f07-4a43-87c1-8901f530dd94" 
                        alt={t("neurocirugia")} 
                      />
                    </Link>
                  </figure>
                  <div className="icon-box"><i className="icon-15"></i></div>
                </div>
                <div className="lower-content">
                  <h3><Link href="service-details-3">{t("neurocirugia")}</Link></h3>
                  <p>{t("descripcionNeurocirugia")}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Servicio 2: Laboratorio Moderno */}
          <div className="col-lg-4 col-md-6 col-sm-12 service-block">
            <div className="service-block-one wow fadeInUp animated" data-wow-delay="300ms" data-wow-duration="1500ms">
              <div className="inner-box">
                <div className="image-box">
                  <figure className="image">
                    <Link href="service-details-6">
                      <img 
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%204.42.37%20PM.jpeg?alt=media&token=0073f503-653b-4326-907b-665688257340" 
                        alt={t("laboratorioModerno")} 
                      />
                    </Link>
                  </figure>
                  <div className="icon-box"><i className="icon-16"></i></div>
                </div>
                <div className="lower-content">
                  <h3><Link href="service-details-6">{t("laboratorioModerno")}</Link></h3>
                  <p>{t("descripcionLaboratorioModerno")}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Servicio 3: Médicos Experimentados */}
          <div className="col-lg-4 col-md-6 col-sm-12 service-block">
            <div className="service-block-one wow fadeInUp animated" data-wow-delay="600ms" data-wow-duration="1500ms">
              <div className="inner-box">
                <div className="image-box">
                  <figure className="image">
                    <Link href="service-details">
                      <img 
                        src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%205.16.32%20PM.jpeg?alt=media&token=e4b6c4cb-586f-49e9-b5f9-9d73d30a01f8" 
                        alt={t("medicosExperimentados")} 
                      />
                    </Link>
                  </figure>
                  <div className="icon-box"><i className="icon-17"></i></div>
                </div>
                <div className="lower-content">
                  <h3><Link href="service-details">{t("medicosExperimentados")}</Link></h3>
                  <p>{t("descripcionMedicosExperimentados")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

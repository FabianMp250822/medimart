"use client";

import TestimonialSlider1 from '@/components/slider/TestimonialSlider1';
import { useTranslation } from 'react-i18next';

export default function Testimonial() {
  const { t } = useTranslation();

  return (
    <>
      <section className="testimonial-section sec-pad bg-color-1">
        <div 
          className="bg-layer" 
          style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%206.02.22%20PM.jpeg?alt=media&token=d493e491-0d1b-484a-a35a-8d6a8a6d7e13)' }}>
        </div>
        <div 
          className="pattern-layer" 
          style={{ backgroundImage: 'url(assets/images/shape/shape-21.png)' }}>
        </div>
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-xl-6 col-lg-12 col-md-12 offset-xl-6 content-column">
              <div className="content-box p_relative ml_45">
                <div className="sec-title mb_50">
                  <span className="sub-title">{t("testimonios")}</span>
                  <h2>{t("loQueDicenNuestrosPacientes")}</h2>
                  <p style={{ fontSize: '18px', maxWidth: '500px' }}>
                    {t("descripcionTestimonios")}
                  </p>
                </div>
                <div className="content-box">
                  <TestimonialSlider1 />                        
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import React from "react";
import './ValoresCorporativos.css'; // Archivo CSS separado

export default function ValoresCorporativos() {
  return (
    <section className="values-section sec-pad centred bg-color-1">
      <div className="auto-container">
        <div className="sec-title mb_50">
          <span className="sub-title">Valores Corporativos</span>
          <h2>Nuestros Principios</h2>
        </div>
        <div className="row clearfix">
          {/* Columna de Valores Corporativos */}
          <div className="col-lg-6 col-md-12 col-sm-12 info-column">
            <div className="info-block-one">
              <h3>Valores Corporativos</h3>
              <div className="inner-box">
                <ul className="valores-list">
                  <li><i className="fas fa-check-circle"></i> Servicio Humanizado</li>
                  <li><i className="fas fa-check-circle"></i> Trabajo en Equipo</li>
                  <li><i className="fas fa-check-circle"></i> Responsabilidad Social</li>
                  <li><i className="fas fa-check-circle"></i> Respeto</li>
                  <li><i className="fas fa-check-circle"></i> Honestidad</li>
                  <li><i className="fas fa-check-circle"></i> Compromiso con la Excelencia</li>
                  <li><i className="fas fa-check-circle"></i> Innovación</li>
                </ul>
              </div>
            </div>
          </div>
          {/* Columna de Políticas */}
          <div className="col-lg-6 col-md-12 col-sm-12 info-column">
            <div className="info-block-one">
              <h3>Política de Calidad</h3>
              <div className="inner-box">
                <p>
                  Brindamos servicios de salud oportunos y confiables en un
                  ambiente confortable, con personal competente y tecnología de
                  punta. Incentivamos el desarrollo docente e investigativo y
                  mejoramos continuamente nuestros procesos.
                </p>
              </div>
            </div>
            <div className="info-block-one mt-4">
              <h3>Política de Seguridad del Paciente</h3>
              <div className="inner-box">
                <p>
                  Brindar seguridad a pacientes, visitantes y colaboradores
                  entendiendo la seguridad como un componente esencial en la
                  calidad. Queremos ser reconocidos como una institución segura
                  y confiable, garantizando un ambiente adecuado, personal
                  idóneo y excelencia en los procesos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

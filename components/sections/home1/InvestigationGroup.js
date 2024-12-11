import Link from 'next/link';
import React from 'react';

export default function InvestigationGroup() {
  return (
    <section className="service-section sec-pad">
      <div className="auto-container">
        <div className="sec-title mb_50 centred">
          <span className="sub-title">Investigación y Desarrollo</span>
          <h2>Grupo de Investigación en Nefrología</h2>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #5b9bd5', paddingBottom: '10px', marginBottom: '20px' }}>
          <div>
            <p style={{ margin: '0', fontWeight: 'bold' }}>Año de creación: <span style={{ fontWeight: 'normal' }}>1980 - 12</span></p>
            <p style={{ margin: '0', fontWeight: 'bold' }}>Integrantes activos: <span style={{ fontWeight: 'normal' }}>38</span></p>
          </div>
          <div style={{ borderLeft: '2px solid #5b9bd5', paddingLeft: '10px' }}>
            <p style={{ margin: '0', fontWeight: 'bold' }}>Categoría: <span style={{ fontWeight: 'normal' }}>A1</span></p>
            <p style={{ margin: '0', fontWeight: 'bold' }}>Proyectos activos: <span style={{ fontWeight: 'normal' }}>50</span></p>
          </div>
        </div>

        <div className="row">
          {/* Primera columna */}
          <div className="col-md-6">
            <h3>Líneas de Investigación</h3>
            <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px' }}>
              <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                <li style={{ marginBottom: '10px' }}><span style={{ color: '#5b9bd5', fontWeight: 'bold' }}>•</span> Circulación, Transferencia y Apropiación Social del Conocimiento de enfermedades no transmisibles.</li>
                <li style={{ marginBottom: '10px' }}><span style={{ color: '#ed7d31', fontWeight: 'bold' }}>•</span> Envejecimiento Renal-Neurogeriatría.</li>
                <li style={{ marginBottom: '10px' }}><span style={{ color: '#70ad47', fontWeight: 'bold' }}>•</span> Epidemiología de las enfermedades crónicas no transmisibles.</li>
                <li style={{ marginBottom: '10px' }}><span style={{ color: '#4472c4', fontWeight: 'bold' }}>•</span> Fisiología Renal.</li>
                <li style={{ marginBottom: '10px' }}><span style={{ color: '#ffc000', fontWeight: 'bold' }}>•</span> Gestión de la Calidad en Nefrología.</li>
                <li style={{ marginBottom: '10px' }}><span style={{ color: '#7030a0', fontWeight: 'bold' }}>•</span> Innovación y Desarrollo Biotecnológico para el Manejo de la Salud Renal.</li>
                <li style={{ marginBottom: '10px' }}><span style={{ color: '#c55a11', fontWeight: 'bold' }}>•</span> Investigación a nivel molecular de enfermedades relacionadas a Lupus eritematoso sistémico.</li>
                <li style={{ marginBottom: '10px' }}><span style={{ color: '#5b9bd5', fontWeight: 'bold' }}>•</span> Investigación y Desarrollo en Enfermedad Crónicas no transmisibles.</li>
                <li style={{ marginBottom: '10px' }}><span style={{ color: '#ed7d31', fontWeight: 'bold' }}>•</span> Metabolismo Óseo.</li>
                <li style={{ marginBottom: '10px' }}><span style={{ color: '#70ad47', fontWeight: 'bold' }}>•</span> Nefrología Crítica.</li>
                <li style={{ marginBottom: '10px' }}><span style={{ color: '#4472c4', fontWeight: 'bold' }}>•</span> Nefropatía Diabética e Hipertensión Arterial.</li>
                <li style={{ marginBottom: '10px' }}><span style={{ color: '#ffc000', fontWeight: 'bold' }}>•</span> Nefropediatría.</li>
                <li style={{ marginBottom: '10px' }}><span style={{ color: '#7030a0', fontWeight: 'bold' }}>•</span> Trasplante Renal.</li>
                <li><span style={{ color: '#c55a11', fontWeight: 'bold' }}>•</span> Vigilancia y Control de Enfermedades Cardiovasculares, Cerebrales, Renales y Endocrino-Metabólicas.</li>
              </ul>
            </div>
          </div>

          {/* Segunda columna */}
          <div className="col-md-6">
          <h3>Oferta de Productos y Servicios</h3>
            <div style={{ backgroundColor: '#fffbea', padding: '15px', borderRadius: '8px', border: '1px solid #f3d9a4' }}>
              <p style={{ marginBottom: '10px', fontWeight: 'bold', color: '#5b9bd5' }}>• Nefrored:</p>
              <p style={{ marginBottom: '10px', textAlign: 'justify' }}>Red para detección temprana y atención de pacientes con nefritis y Glomerulonefritis con un enfoque renovado de prevención secundaria y terciaria para el SGSSS Colombia. Esta propuesta responde a la necesidad Nacional de contar con un sistema de acopio y administración de información clínica y patológica de los pacientes diagnosticados con IRC, que facilite la continuidad de manejo y seguimiento. <a href="http://www.nefrored.org/">http://www.nefrored.org/</a></p>
              <p style={{ marginBottom: '10px', fontWeight: 'bold', color: '#ed7d31' }}>• Nefrotest:</p>
              <p style={{ textAlign: 'justify' }}>Test de uso en casa, de bajo costo, útil para el seguimiento de función renal en pacientes con enfermedades crónicas como diabetes, hipertensión, lupus, entre otras.</p>
            </div>
<br/>
            <h3>Producción Científica (Últimos 5 Años)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <strong style={{ color: '#5b9bd5', fontSize: '24px', marginRight: '10px' }}>277</strong>
                <span>Nuevo Conocimiento</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <strong style={{ color: '#ed7d31', fontSize: '24px', marginRight: '10px' }}>260</strong>
                <span>Artículos (Q1, Q2, Q3, Q4 o D)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <strong style={{ color: '#a5a5a5', fontSize: '24px', marginRight: '10px' }}>13</strong>
                <span>Desarrollo Tecnológico</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <strong style={{ color: '#ffc000', fontSize: '24px', marginRight: '10px' }}>60</strong>
                <span>Apropiación Social</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <strong style={{ color: '#4472c4', fontSize: '24px', marginRight: '10px' }}>38</strong>
                <span>Formación del Recurso Humano</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <strong style={{ color: '#70ad47', fontSize: '24px', marginRight: '10px' }}>3</strong>
                <span>Libros resultados de investigación</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <strong style={{ color: '#7030a0', fontSize: '24px', marginRight: '10px' }}>1</strong>
                <span>Capítulos de libros</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <strong style={{ color: '#c55a11', fontSize: '24px', marginRight: '10px' }}>2</strong>
                <span>Proceso de ASC para políticas públicas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
  <div className="col-md-12">
    <h3
      style={{
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: '20px',
      }}
    >
      Redes Activas y Colaboraciones (Últimos 5 Años)
    </h3>
    <div
      className="container p-4"
      style={{
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        {/* Redes Activas */}
        <div>
          <h4 style={{ color: '#5b9bd5', fontWeight: 'bold' }}>Redes Activas</h4>
          <p><strong>Nacionales:</strong></p>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Red RECARDI - UDES</li>
          </ul>
          <p><strong>Internacionales:</strong></p>
          <ul style={{ paddingLeft: '20px' }}>
            <li>RISRECP - Red Iberoamericana de Investigadores en Salud Renal y Enfermedades Crónicas Prevalentes</li>
            <li>GLADEL - Grupo Latinoamericano de Estudio del Lupus</li>
          </ul>
        </div>

        {/* Alianzas y Cooperación */}
        <div>
          <h4 style={{ color: '#ed7d31', fontWeight: 'bold' }}>Alianzas y Cooperación</h4>
          <p><strong>Nacionales:</strong></p>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Clínica de la Costa</li>
            <li>Asociación Colombiana de Nefrología</li>
          </ul>
          <p><strong>Internacionales:</strong></p>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Laboratorio J Craig Venter Institute</li>
            <li>Universidad de Cádiz</li>
            <li>Universidad George Washington</li>
          </ul>
        </div>

        {/* Movilidad de Investigadores */}
        <div>
          <h4 style={{ color: '#70ad47', fontWeight: 'bold' }}>Movilidad de Investigadores</h4>
          <p><strong>Nacionales:</strong></p>
          <ul style={{ paddingLeft: '20px' }}>
            <li>8 Movilidades Nacionales</li>
          </ul>
          <p><strong>Internacionales:</strong></p>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Colombia - España, Elkin Navarro Quiroz</li>
            <li>Colombia - Australia, Henry González</li>
            <li>Colombia - Brasil, Lisandro Pacheco</li>
            <li>Colombia - Lima, Gustavo Aroca, Elkin Navarro, Henry González</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

    </section>
  );
}
import React from 'react';
import './NephrologyProgram.css';

const NephrologyProgram = () => (
    <div className="nephrology-program-details">
        {/* Título Principal */}
        <div className="service-header">
            <h2>Programa de Nefrología</h2>
        </div>

        {/* Información del Servicio */}
        <div className="service-content">
            <p>Se ha detectado de manera minuciosa la alta incidencia de patologías como el LUPUS; en la Región Caribe existe por falta de adherencia a los tratamientos y/o falta de información en el manejo de la misma; de allí radica la importancia de que el grupo de profesionales de la Clínica de la Costa intervenga para llevar ayuda, orientación y capacitación a este segmento de la población afectado.</p>
            <p>Desde el programa se realizan investigaciones y se ofrece ayuda, orientación, educación y capacitación, no solo a los pacientes, sino también a su familia, con la finalidad de que puedan coexistir con la misma, sin que les afecte su rol en la sociedad.</p>
            <p>Además, somos especialistas en el manejo de pacientes renales. Contamos con tres especialistas en nefrología adulto y 2 nefrólogos pediatras. El servicio de nefrología está dedicado al diagnóstico y tratamiento de patologías que afectan el funcionamiento renal.</p>
        </div>

        {/* Sección de Áreas */}
        <div className="service-highlight">
            <h3>Áreas</h3>
            <ul>
                <li>Respuesta de interconsultas.</li>
                <li>Hospitalización en nefrología clínica general.</li>
                <li>Unidad de hemodiálisis aguda.</li>
                <li>Diálisis Intrahospitalaria – Nefrointensivismo.</li>
                <li>Atención de pacientes en UCI.</li>
                <li>Hemodiálisis aguda.</li>
                <li>Diálisis peritoneal aguda.</li>
                <li>Terapias de reemplazo renal continuo.</li>
                <li>Toma de biopsia.</li>
                <li>Valoración por consulta externa.</li>
            </ul>
        </div>

        {/* Imagen del Servicio */}
        <div className="service-image">
            <img src="/path/to/kidney-image.png" alt="Programa de Nefrología" />
        </div>
    </div>
);

export default NephrologyProgram;
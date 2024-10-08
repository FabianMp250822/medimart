import React from 'react';
import './PlasticSurgeryDetails.css';

const PlasticSurgeryDetails = () => (
    <div className="plastic-surgery-details">
        {/* Encabezado del servicio */}
        <div className="surgery-header">
            <h3>Portafolio de Servicios</h3>
            <h2>Cirugía Plástica Reconstructiva y de Estética</h2>
        </div>

        {/* Descripción de la cirugía */}
        <div className="surgery-description">
            <p>
                En la <strong>Clínica de la Costa</strong> combinamos tecnología de última generación con la precisión y excelencia de nuestros cirujanos plásticos, pioneros en nuevas técnicas de cirugía estética y reconstructiva.
            </p>
        </div>

        {/* Sección: Cirugía Ambulatoria */}
        <div className="ambulatory-surgery">
            <h3>Cirugía Ambulatoria</h3>
            <p>
                Este servicio inicia desde la evaluación del paciente por parte de las especialidades involucradas, manejo quirúrgico, egreso, control por consulta externa y finaliza con el seguimiento telefónico.
            </p>

            {/* Beneficios de la cirugía ambulatoria */}
            <div className="surgery-benefits">
                <h4>Beneficios de la cirugía ambulatoria:</h4>
                <ul>
                    <li>Reincorporación rápida a su vida habitual</li>
                    <li>Procedimientos quirúrgicos seguros que no necesitan hospitalización</li>
                    <li>Menor riesgo de infección</li>
                    <li>Disminución de la ansiedad</li>
                    <li>Atención personalizada</li>
                </ul>
            </div>
        </div>

        {/* Áreas */}
        <div className="surgery-areas">
            <h4>Áreas</h4>
            <ul>
                <li>Cirugía plástica</li>
                <li>Neurocirugía</li>
                <li>Otorrinolaringología</li>
                <li>Electrofisiología</li>
                <li>Cirugía de ortopedia y traumatología</li>
                <li>Cirugía de urología</li>
                <li>Cirugía de tórax</li>
                <li>Cirugía vascular periférica</li>
                <li>Cirugía general</li>
            </ul>
        </div>

        {/* Otros servicios relacionados */}
        <div className="related-services">
            <div className="related-info">
                <p>
                    Otros servicios que presta el servicio se encuentran relacionados con el cuidado anestésico monitorizado en procedimientos de gastroenterología, radiología, resonancia nuclear magnética, ecocardiografía transesofágica y neuroradiología.
                </p>
            </div>
        </div>
    </div>
);

export default PlasticSurgeryDetails;

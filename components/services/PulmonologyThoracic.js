import React from 'react';
import './PulmonologyThoracic.css';

const PulmonologyThoracic = () => (
    <div className="pulmonology-thoracic-details">
        {/* Título Principal */}
        <div className="service-header">
            <h2>Neumología Clínica y Cirugía de Tórax</h2>
        </div>

        {/* Información del Servicio */}
        <div className="service-content">
            <p>Contamos con excelentes profesionales, con amplia experiencia en el campo de la neumología y cirugía del tórax para brindar atención integral del paciente adulto y pediátrico que sufre de enfermedades respiratorias, agudas y crónicas, en los procesos de prevención, diagnóstico, tratamiento y rehabilitación de las mismas.</p>
        </div>

        {/* Sección de Áreas */}
        <div className="service-highlight">
            <h3>Áreas</h3>
            <ul>
                <li>Neumología – Fibrobroncoscopia</li>
                <li>Neumología laboratorio función pulmonar</li>
                <li>Atención por consulta externa de neumología adulto, pediátrica y cirugía de tórax.</li>
                <li>Cirugía de tórax</li>
            </ul>
        </div>

        {/* Imagen del Servicio */}
        <div className="service-image">
            <img src="/path/to/lung-image.png" alt="Neumología Clínica y Cirugía de Tórax" />
        </div>
    </div>
);

export default PulmonologyThoracic;

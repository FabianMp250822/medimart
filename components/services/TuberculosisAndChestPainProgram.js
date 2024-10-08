import React from 'react';
import './TuberculosisAndChestPainProgram.css';

const TuberculosisAndChestPainProgram = () => (
    <div className="tuberculosis-chest-pain-details">
        {/* Programa de Manejo Integral del Paciente con Tuberculosis */}
        <div className="program-header">
            <h2>Programa de Manejo Integral del Paciente con Tuberculosis</h2>
        </div>

        <div className="program-content">
            <p>Contamos con personal especializado en la detección, diagnóstico y tratamiento de pacientes con tuberculosis.</p>
            <div className="program-highlight">
                <h3>Factor diferencial del programa</h3>
                <p>Se cuenta con el Genexpert, una herramienta para el diagnóstico oportuno de la tuberculosis.</p>
            </div>
        </div>

        {/* Programa de Atención de Pacientes con Dolor Torácico */}
        <div className="program-header">
            <h2>Programa de la Atención de Pacientes con Dolor Torácico</h2>
        </div>

        <div className="program-content">
            <p>El personal que labora en el servicio de urgencia de la Clínica de la Costa cuenta con entrenamiento especializado para la aplicación del protocolo de atención de pacientes con dolor torácico; ofreciendo atención oportuna, ayudas diagnósticas pertinentes para el manejo y mejora del estado del paciente.</p>
            <div className="program-areas">
                <h3>Áreas</h3>
                <ul>
                    <li>Valoración por medicina interna 24 horas</li>
                    <li>Atención por cardiología</li>
                    <li>Servicio de hemodinamia 24 horas</li>
                </ul>
            </div>
        </div>
    </div>
);

export default TuberculosisAndChestPainProgram;

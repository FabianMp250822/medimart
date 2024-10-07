import React from 'react';
import './ClinicalLabDetails.css';

const ClinicalLabDetails = () => (
    <div className="clinical-details">
        {/* Encabezado del servicio */}
        <div className="clinical-header">
            <h2>Laboratorio Clínico</h2>
        </div>

        {/* Descripción del laboratorio */}
        <div className="clinical-description">
            <p>
                Conociendo la importancia del diagnóstico, el Laboratorio Clínico ofrece un servicio respaldado por la más completa tecnología, garantizando resultados certeros, que agilizan la detección y tratamiento de cualquier anomalía encontrada.
            </p>
            <p>
                Cuenta con un equipo humano conformado por personas altamente calificadas para su manejo integral: bacteriólogas, técnicos y tecnólogos en laboratorio clínico que dan permanente apoyo en diferentes subespecialidades.
            </p>
            <p>
                Contamos con equipos e instrumentos con estrictos controles de calidad que garantizan la obtención de resultados confiables para la obtención de diagnósticos certeros, cumpliendo con altos estándares de calidad.
            </p>
            <div className="clinical-image">
                <img src="path_to_image.jpg" alt="Imagen del Laboratorio Clínico" />
            </div>
        </div>

        {/* Sección de estudios */}
        <div className="clinical-studies">
            <div className="studies-header">Se ofrecen estudios</div>
            <ul>
                <li>Hematología</li>
                <li>Química</li>
                <li>Inmunohistoquímica</li>
                <li>Coagulación</li>
                <li>Microbiología</li>
                <li>Química especializada</li>
                <li>Genexpert, una herramienta para el diagnóstico de tuberculosis</li>
            </ul>
        </div>

        {/* Sección: Transporte Asistencial Medicalizado */}
        <div className="medical-transport">
            <h3>Transporte Asistencial Medicalizado</h3>
            <p>
                Contamos con servicios de transporte asistencial medicalizado; 2 ambulancias completamente dotadas de acuerdo a lo establecido en la resolución 2003 de 2014.
            </p>
        </div>
    </div>
);

export default ClinicalLabDetails;

import React from 'react';
import './PediatricCardiologyDetails.css';

const PediatricCardiologyDetails = () => (
    <div className="pediatric-cardiology-details">
        {/* Encabezado del servicio */}
        <div className="cardiology-header">
            <h2>Cardiología Pediátrica</h2>
        </div>

        {/* Descripción de la cardiología pediátrica */}
        <div className="cardiology-description">
            <p>
                Este programa está enfocado hacia el tratamiento y detección de cardiopatías congénitas, es decir, enfermedades del corazón que se manifiestan en el nacimiento de los niños.
            </p>
        </div>

        {/* Áreas de servicio */}
        <div className="cardiology-areas">
            <h4>Áreas:</h4>
            <ul>
                <li>Ecocardiografía Doppler color</li>
                <li>Ecocardiografía fetal</li>
                <li>Hemodinamia pediátrica</li>
                <li>Cirugía cardiovascular pediátrica</li>
                <li>Estudio de monitoreo Holter EKG, pruebas de esfuerzo, test de mesa basculante, rehabilitación cardíaca</li>
                <li>Consulta externa de cardiología pediátrica</li>
                <li>Unidad de cuidados intensivos pediátrica</li>
            </ul>
        </div>

        {/* Imagen representativa */}
        <div className="cardiology-image">
            <img src="path_to_image.jpg" alt="Cardiología Pediátrica" />
        </div>
    </div>
);

export default PediatricCardiologyDetails;

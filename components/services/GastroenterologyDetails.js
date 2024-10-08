import React from 'react';
import './GastroenterologyDetails.css';

const GastroenterologyDetails = () => (
    <div className="gastroenterology-details">
        {/* Encabezado del servicio */}
        <div className="gastro-header">
            <h2>Gastroenterología Clínica, Endoscopia Digestiva y Coloproctología</h2>
        </div>

        {/* Descripción general */}
        <div className="gastro-description">
            <p>
                El Servicio de Gastroenterología Clínica y Endoscopia Digestiva está constituido con personal especializado en endoscopia, gastroenterólogos y dos coloproctólogos; quienes están apoyados por un equipo asistencial con formación en endoscopia digestiva.
            </p>
            <p>
                Este personal médico y paramédico atiende a los pacientes de urgencias por gastroenterología y procedimientos endoscópicos diagnósticos o terapéuticos. Además, de los pacientes de consulta externa y de chequeo médico preventivo.
            </p>
        </div>

        {/* Estudios ofrecidos */}
        <div className="gastro-studies">
            <h3>Estudios</h3>
            <ul>
                <li>Endoscopia bajo sedación</li>
                <li>Colonoscopia</li>
                <li>CEPRE</li>
                <li>Gastrostomía</li>
                <li>Rectosigmoidoscopia</li>
                <li>Polipectomía endoscópica</li>
                <li>Ligadura de varices esofágicas</li>
                <li>Esófagogastroduodenoscopia</li>
            </ul>
        </div>

        {/* Imagen representativa y cápsula endoscópica */}
        <div className="gastro-images">
            <div className="capsule-info">
                <div className="capsule-icon">✓</div>
                <p>Contamos con cápsula endoscópica</p>
            </div>
            <div className="gastro-main-image">
                <img src="path_to_main_image.jpg" alt="Gastroenterología Clínica" />
            </div>
        </div>
    </div>
);

export default GastroenterologyDetails;

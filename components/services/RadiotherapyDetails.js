import React from 'react';
import './RadiotherapyDetails.css';

const RadiotherapyDetails = () => (
    <div className="radiotherapy-details">
        {/* Encabezado del servicio */}
        <div className="radiotherapy-header">
            <h2>Radioterapia</h2>
        </div>

        {/* Servicios */}
        <div className="radiotherapy-services">
            <h3>Servicios</h3>
            <ul>
                <li>Evaluación inicial por médico radioterapeuta</li>
                <li>Plan de tratamiento</li>
                <li>Seguimiento especializado durante la terapia con técnicas</li>
                <li>Radioterapia con electrones</li>
                <li>Radioterapia conformacional 3D-CRT</li>
                <li>Radioterapia de intensidad modulada IMRT</li>
                <li>Arco terapia volumétrica modulada V-MAT</li>
                <li>Radioterapia guiada por imágenes IGRT</li>
                <li>Radiocirugía intracraneal estereotáctica (SRS)</li>
                <li>Radiocirugía extracraneal estereotáctica (SBRT)</li>
            </ul>
        </div>

        {/* Infraestructura y Dotación */}
        <div className="radiotherapy-infrastructure">
            <h3>Infraestructura y Dotación</h3>
            <p>Cumple con los requerimientos del plan de habilitación y seguridad requeridos por el ente territorial y el Ministerio de Minas y Energía.</p>
            <p>El servicio de radioterapia cuenta con:</p>
            <ul>
                <li>Salas de espera</li>
                <li>Consultorios</li>
                <li>Tomografías computarizadas</li>
                <li>Sistemas de control de calidad para paciente específico (IMRT, SRS, SBRT)</li>
                <li>Sistemas de movilización de alta precisión (FRACTION BODYFIX)</li>
            </ul>
        </div>

        {/* Equipo Electa Infinity */}
        <div className="radiotherapy-equipment">
            <h3>Equipo Electa Infinity</h3>
            <div className="equipment-details">
                <div className="equipment-text">
                    <ul>
                        <li>Colimador tipo MLC Agility</li>
                        <li>Sistema de imágenes portales (IVIEW GT)</li>
                        <li>Tomógrafo de Haz Cónico (CBCT-XVI)</li>
                        <li>Energía libre de filtro aplanador de alta tasa de dosis, ideal para tratamientos de SRS y SBRT</li>
                        <li>Diversas energías en electrones: Para el tratamiento de lesiones superficiales y refuerzos de dosis (6 MeV, 9 MeV, 12 MeV, 15 MeV)</li>
                    </ul>
                </div>
                <div className="equipment-image">
                    <img src="path_to_electa_image.jpg" alt="Equipo Electa Infinity" />
                </div>
            </div>
        </div>
    </div>
);

export default RadiotherapyDetails;

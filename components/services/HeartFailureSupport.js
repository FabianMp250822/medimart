import React from 'react';
import './HeartFailureSupport.css';

const HeartFailureSupport = () => (
    <div className="heart-failure-support-details">
        {/* Título Principal */}
        <div className="service-header">
            <h2>Trasplante: Falla Cardíaca y Asistencia Ventricular</h2>
        </div>

        {/* Información del Servicio */}
        <div className="service-content">
            <p>La Clínica de la Costa ofrece a sus usuarios el programa Hospital Día de Falla Cardíaca; con el cual busca contribuir en la mejora de la calidad de vida de los pacientes con falla cardíaca en estadios avanzados, ayudando a disminuir el número de hospitalizaciones al año a través de un manejo ambulatorio.</p>
            <p>En esta unidad asistencial se administran tratamientos endovenosos que requieren monitoria, observación y supervisión de un médico especialista en cardiología y un equipo de enfermería.</p>
        </div>

        {/* Sección de Beneficios */}
        <div className="service-highlight">
            <h3>Beneficios</h3>
            <ul>
                <li>El paciente que ingresa al programa es valorado de forma permanente por el cardiólogo.</li>
                <li>Las citaciones pueden programarse de forma que permitan a los pacientes y a sus cuidadores adaptar el tratamiento con sus actividades laborales o domésticas.</li>
                <li>Seguimiento del comportamiento de la enfermedad y ajustes en el tratamiento, aplicando escalas de calidad de vida que permiten evidenciar el comportamiento de la enfermedad vs. la adherencia al tratamiento.</li>
                <li>Educación individualizada al paciente y a sus cuidadores en el manejo de su enfermedad.</li>
            </ul>
        </div>

        {/* Imagen del Servicio */}
        <div className="service-image">
            <img src="/path/to/heart-image.png" alt="Programa de Falla Cardíaca y Asistencia Ventricular" />
        </div>
    </div>
);

export default HeartFailureSupport;

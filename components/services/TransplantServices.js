import React from 'react';
import './TransplantServices.css';

const TransplantServices = () => (
    <div className="transplant-services-details">
        {/* Título Principal */}
        <div className="service-header">
            <h2>Trasplante: Falla Intestinal</h2>
        </div>

        {/* Información del Servicio */}
        <div className="service-content">
            <p>Por primera vez, la región Caribe Colombiana cuenta con un Centro de Trasplantes de Órganos, la Clínica de la Costa consolida el desarrollo científico, médico y asistencial de nuestra región.</p>
            <div className="service-highlight">
                <h3>Servicios</h3>
                <ul>
                    <li>Consulta pre trasplante (hígado, riñón, páncreas)</li>
                    <li>Consulta post trasplante (hígado, riñón, páncreas)</li>
                    <li>Evaluación donante vivo renal</li>
                    <li>Trasplante renal con donante cadavérico</li>
                    <li>Trasplante renal con donante vivo</li>
                    <li>Nefrectomía laparoscópica de donante vivo</li>
                    <li>Trasplante de hígado</li>
                    <li>Trasplante de riñón-páncreas o páncreas aislado</li>
                    <li>Cirugía hepatobiliar y pancreática avanzada</li>
                    <li>Clínica de falla y rehabilitación intestinal</li>
                </ul>
            </div>
        </div>

        {/* Segunda Parte del Servicio */}
        <div className="service-header">
            <h2>Trasplante Renal y combinado Riñón y Páncreas</h2>
        </div>
        <div className="service-content">
            <p>En la Clínica de la Costa, nuestro grupo de profesionales, inicia con una evaluación exhaustiva hasta un tratamiento de primera categoría, proporcionando un enfoque de atención centrado en el paciente a lo largo de todo el proceso de trasplante. Un equipo dedicado de trasplantes lo guiará y apoyará en cada paso del camino.</p>
        </div>
    </div>
);

export default TransplantServices;

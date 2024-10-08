import React from 'react';
import './OrthopedicsTraumatology.css';

const OrthopedicsTraumatology = () => (
    <div className="orthopedics-traumatology-details">
        {/* Título Principal */}
        <div className="service-header">
            <h2>Ortopedia y Traumatología</h2>
        </div>

        {/* Información del Servicio */}
        <div className="service-content">
            <p>Nuestro servicio cuenta con especialistas en reemplazos articulares de cadera y rodilla. Además prestamos atención de urgencias las 24 horas y brindamos oportunidad de tratamiento quirúrgico derivado de urgencias antes de las 48 horas siguientes a la atención primaria y atención por consulta externa con disponibilidad de agenda.</p>
        </div>

        {/* Sección de Áreas */}
        <div className="service-highlight">
            <h3>Áreas</h3>
            <ul>
                <li>Cirugía de mano</li>
                <li>Cirugía de hombro</li>
                <li>Artroscopia de rodilla</li>
                <li>Reemplazo de cadera y rodilla</li>
                <li>Hospitalización</li>
            </ul>
        </div>

        {/* Sección de Tecnología las 24 horas */}
        <div className="service-highlight">
            <h3>Tecnología las 24 horas</h3>
            <ul>
                <li>Contamos con un resonador magnético</li>
                <li>Tomógrafo de última generación</li>
                <li>Equipos para radiografía</li>
            </ul>
        </div>

        {/* Imagen del Servicio */}
        <div className="service-image">
            <img src="/path/to/orthopedics-image.png" alt="Ortopedia y Traumatología" />
        </div>
    </div>
);

export default OrthopedicsTraumatology;

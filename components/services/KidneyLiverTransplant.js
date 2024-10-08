import React from 'react';
import './KidneyLiverTransplant.css';

const KidneyLiverTransplant = () => (
    <div className="kidney-liver-transplant-details">
        {/* Título Principal */}
        <div className="service-header">
            <h2>Trasplante de Riñón e Hígado</h2>
        </div>

        {/* Información del Servicio */}
        <div className="service-content">
            <p>La Clínica de la Costa cuenta con tres programas de trasplante: Trasplante de Riñón, Hígado y Páncreas.</p>
            <p>El programa de trasplantes se encuentra conformado por cuatro nefrólogos, dos cirujanos de trasplante, un urólogo, un hepatólogo y una enfermera profesional con entrenamiento en esta área, tres coordinadores operativos de trasplantes (médico general con entrenamiento en donación de órganos sólidos y tejidos), un médico internista y una auxiliar de apoyo administrativo. Además, se cuenta con el apoyo constante de los subespecialistas de las diferentes áreas de la institución que intervienen en el proceso de trasplantes.</p>
        </div>

        {/* Sección de Subespecialidades */}
        <div className="service-highlight">
            <h3>Subespecialidades</h3>
            <ul>
                <li>Anestesiología</li>
                <li>Medicina Interna</li>
                <li>Psicología</li>
                <li>Psiquiatría</li>
                <li>Odontología</li>
                <li>Nutrición</li>
                <li>Trabajo Social</li>
                <li>Cardiología – Hemodinamia</li>
                <li>Endocrinología</li>
                <li>Dermatología</li>
            </ul>
        </div>

        {/* Información Adicional */}
        <div className="service-content">
            <p>El programa capta tanto pacientes que se encuentran en situación de pre-diálisis, como aquellos en terapia sustitutiva renal (Diálisis peritoneal/hemodiálisis), a nivel hospitalario y remitidos a consulta pre trasplante (Extrahospitalarios), desde las diferentes unidades renales, o pacientes ya trasplantados que requieran la consulta de seguimiento por nefrología especializada de trasplantes.</p>
            <p>El grupo de trasplantes se encarga del seguimiento, captación, programación de estudio pre-trasplante e inclusión del paciente a la lista de espera, ante el Instituto Nacional de Salud - INS. La coordinación operativa de trasplante se encarga de la captación de los donantes ante la regional número cinco que se encuentra conformada por los departamentos: Atlántico, Magdalena, Guajira y Bolívar. Además de esto, el coordinador operativo realiza actividades de sensibilización en cada una de las IPS generadoras, universidades, colegios y comunidad en general.</p>
        </div>

        {/* Imagen del Servicio */}
        <div className="service-image">
            <img src="/path/to/kidney-liver-image.png" alt="Trasplante de Riñón e Hígado" />
        </div>
    </div>
);

export default KidneyLiverTransplant;

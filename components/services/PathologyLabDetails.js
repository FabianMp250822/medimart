import React from 'react';
import './PathologyLabDetails.css';

const PathologyLabDetails = () => (
    <div className="pathology-details">
        {/* Encabezado del servicio */}
        <div className="pathology-header">
            <h3>Portafolio de Servicios</h3>
            <h2>Laboratorio de Patología</h2>
        </div>

        {/* Descripción del laboratorio */}
        <div className="pathology-description">
            <p>
                El laboratorio de patología ofrece un diagnóstico seguro para determinar el plan de manejo que se aplicará al paciente, con el propósito de prevenir o brindar un tratamiento a la enfermedad.
            </p>
            <p>
                Prestamos a la Comunidad médico-científica de la Región Caribe, el servicio de citometría de flujo para el diagnóstico de neoplasias hematológicas.
            </p>
            <p>
                Se cuenta con equipos automatizados de alta calidad que nos garantizan resultados confiables y con la rapidez necesaria para brindar una atención oportuna a nuestros pacientes en el servicio de <strong>Citometría de Flujo</strong>.
            </p>
            <div className="pathology-image">
                {/* <img src="path_to_image.jpg" alt="Imagen del Laboratorio de Patología" /> */}
            </div>
        </div>

        {/* Sección de estudios */}
        <div className="pathology-studies">
            <div className="studies-header">Estudios</div>
            <ul>
                <li>Inmunohistoquímica</li>
                <li>Inmuno fluorescencia (criotasto)</li>
                <li>Microscopía electrónica</li>
                <li>Citopatología</li>
                <li>Biopsias por congelación</li>
                <li>Citometría de Flujo</li>
            </ul>
        </div>

        {/* Sección: Citometría de flujo */}
        <div className="pathology-cytometry">
            <h3>Citometría de flujo</h3>
            <p>
                Es una técnica multiparamétrica por medio de la cual es posible analizar características estructurales o partículas en suspensión que atraviesan una fuente de luz (láser). Esta metodología tiene múltiples aplicaciones tanto en el área clínica como en el campo de investigación biomédica.
            </p>
            <p>
                Se cuenta con citómetro modelo NAVIOS marca BECKMAN COULTER y con un amplio panel de anticuerpos que nos permiten diagnosticar con precisión los casos de leucemias agudas; linfoides y mieloides, enfermedades linfoproliferativas crónicas, enfermedad mínima residual en los casos de leucemias y mieloma múltiple y determinaciones de subpoblaciones leucocitarias.
            </p>
            <div className="cytometry-image">
                {/* <img src="path_to_image_2.jpg" alt="Imagen de Citometría de Flujo" /> */}
            </div>
        </div>

        {/* Sección de servicios */}
        <div className="pathology-services">
            <div className="services-header">Servicios</div>
            <ul>
                <li>Detección temprana de subpoblaciones celulares (inmunofenotipo)</li>
                <li>Conteo de linfocitos cd4/cd8 en pacientes VIH positivo</li>
                <li>Conteo de poblaciones celulares de linfocitos b, t y células nk en pacientes con inmunodeficiencias</li>
                <li>Estudio de líquido cefalorraquídeo para la búsqueda de blastos en pacientes con leucemia aguda</li>
                <li>Estudio para diagnóstico de hemoglobina paroxística nocturna (hpn)</li>
            </ul>
        </div>
    </div>
);

export default PathologyLabDetails;

import React from 'react';
import './HematologyOncologyDetails.css';

const HematologyOncologyDetails = () => (
    <div className="hematology-oncology-details">
        {/* Encabezado del servicio */}
        <div className="hematology-header">
            <h2>Manejo Integral del Paciente Hematoncológico</h2>
        </div>

        {/* Descripción general */}
        <div className="hematology-description">
            <p>
                Contamos con el Programa manejo integral del paciente hematoncológico, garantizando la atención de nuestros pacientes, el acceso y la oportunidad de la atención.
            </p>
            <p>
                Con los más altos niveles de excelencia académica e investigación para la atención de patología oncológica en población adulta y pediátrica.
            </p>
        </div>

        {/* Equipo */}
        <div className="hematology-team">
            <h3>Equipo</h3>
            <ul>
                <li>Hematología – Oncológica Adulto</li>
                <li>Hematología – Oncológica Pediátrica</li>
                <li>Cirugía Oncológica</li>
                <li>Oncología Clínica</li>
                <li>Ginecología Oncológica</li>
                <li>Urología Oncológica</li>
                <li>Ortopedia Oncológica</li>
                <li>Enfermería</li>
                <li>Psicología</li>
                <li>Trabajo social</li>
                <li>Nutrición</li>
                <li>Químico farmacéutico</li>
                <li>Radioterapia</li>
                <li>Patólogo Oncólogo</li>
                <li>Medicina Nuclear</li>
            </ul>
        </div>

        {/* Beneficios del programa */}
        <div className="hematology-benefits">
            <h3>Beneficios del programa</h3>
            <ul>
                <li>Atención integral especializada</li>
                <li>Tratamiento oportuno</li>
                <li>Soporte informativo y educativo paciente y familia</li>
            </ul>
        </div>

        {/* Servicios especializados */}
        <div className="hematology-specialized-services">
            <h3>Servicios Especializados</h3>
            <div className="services-container">
                <div className="service">
                    <h4>Hospitalización Oncológica</h4>
                    <p>
                        El servicio de hospitalización cuenta con dos pabellones de 16 camas cada uno, para atención especializada pediátrica y adulta.
                    </p>
                    <img src="path_to_hospitalization_image.jpg" alt="Hospitalización Oncológica" />
                </div>
                <div className="service">
                    <h4>Sala de Quimioterapia</h4>
                    <p>
                        La unidad de quimioterapia atiende pacientes ambulatorios y hospitalizados. Ubicada en el tercer piso del bloque oncológico y diseñada bajo los requerimientos de habilitación del Ministerio de Salud.
                    </p>
                    <p>
                        La atención en la unidad es prestada por un personal multidisciplinario con entrenamiento y dedicación exclusiva para la atención del paciente con patologías hematológicas y oncológicas.
                    </p>
                    <img src="path_to_chemotherapy_image.jpg" alt="Sala de Quimioterapia" />
                </div>
            </div>
        </div>
    </div>
);

export default HematologyOncologyDetails;

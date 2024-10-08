import React from 'react';
import './PetCTDetails.css';

const PetCTDetails = () => (
    <div className="petct-details">
        {/* Encabezado del servicio */}
        <div className="petct-header">
            <h2>PET - CT</h2>
        </div>

        {/* Descripción Inicial */}
        <div className="petct-description">
            <p>Primer PET-CT Digital en la Costa Caribe:</p>
            <ul>
                <li>Diagnósticos certeros y más confiables.</li>
                <li>Alta resolución espacial detectando eficientemente lesiones de bajo volumen.</li>
                <li>Diagnósticos más oportunos, mejorando la efectividad de los tratamientos.</li>
                <li>La menos dosis de radiación al paciente por imagen.</li>
            </ul>
            <p>
                La Tomografía por Emisión de Positrones (PET) con Tomografía Computarizada (CT) es una herramienta de diagnóstico clínico por imágenes no invasivo empleando radiofármacos para estadificar pacientes con patologías malignas.
            </p>
        </div>

        {/* Servicios */}
        <div className="petct-services">
            <h3>Servicios</h3>
            <ul>
                <li>Consulta médica especializada por Medicina Nuclear</li>
                <li>Apoyo nutricional y patológico</li>
                <li>Diagnóstico por imágenes PET-CT para: Diagnosticar enfermedades primarias y enfermedad metastásica</li>
            </ul>
        </div>

        {/* Tecnología */}
        <div className="petct-technology">
            <h3>Tecnología</h3>
            <ul>
                <li>Tecnología uEXPLORER PET para imágenes PET de alta definición.</li>
                <li>Resolución NEMA de 2,9 mm</li>
                <li>Cristales de lutetium-yttrium oxyorthosilicate (LYSO) de 2,76 mm</li>
                <li>Alta precisión cuantitativa del SUV</li>
                <li>Escaneo de alta velocidad aumenta el confort de los pacientes</li>
                <li>Utiliza una red neuronal preentrenada para predecir imágenes PET de bajo nivel</li>
            </ul>
            <div className="petct-image">
                <img src="path_to_petct_image.jpg" alt="PET-CT Machine" />
            </div>
        </div>
    </div>
);

export default PetCTDetails;

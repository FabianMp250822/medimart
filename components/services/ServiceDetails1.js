import React from 'react';
import './ServiceDetails.css';

const ServiceDetails1 = () => (
    <div className="service-details">
        {/* Encabezado del servicio */}
        <div className="service-header">
          
            <h2>Apoyo Diagnóstico y Terapéutico</h2>
        </div>

        <p>
            En la <strong>Clínica de la Costa</strong>, ofrecemos una amplia gama de estudios de diagnóstico y tratamiento realizados por un equipo especializado. Nos comprometemos a brindar atención oportuna con tecnología avanzada.
        </p>

        {/* Sección: Departamento de Imágenes Diagnósticas */}
        <div className="service-section">
            <h3>Departamento de Imágenes Diagnósticas</h3>
            <p>
                La mayoría de los exámenes radiológicos son no invasivos e indoloros y se pueden realizar de forma ambulatoria. Contamos con un equipo especializado comprometido con diagnosticar y prestar tratamiento en tiempos oportunos. Coordinamos servicios de imágenes en áreas especializadas, que incluyen:
            </p>
            <ul>
                <li>Imágenes de maternidad y mujeres</li>
                <li>Radiología cardíaca</li>
                <li>Imágenes de diagnóstico para el cáncer</li>
                <li>Imágenes torácicas</li>
                <li>Ultrasonido vascular</li>
                <li>Servicios ortopédicos</li>
            </ul>
        </div>

        {/* Sección: Tipos de Estudios */}
        <div className="service-section">
            <h3>Tipos de Estudios</h3>
            <table className="service-table">
                <thead>
                    <tr>
                        <th>TIPOS DE ESTUDIOS</th>
                        <th>ESTUDIOS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Radiología Convencional</td>
                        <td>Tórax, Extremidades, Pelvis, Columna, Test de escoliosis, Cráneo, Rostro</td>
                    </tr>
                    <tr>
                        <td>Ecografía</td>
                        <td>Abdominal total, Pélvica, Mamas, Transvaginal, Partes blandas, Osteoarticular, Cuello, Testicular, Doppler hepático y renal, Biopsias guiadas por ecografía (próstata, mama, hígado, riñón), drenajes y colocación de nefrostomías percutáneas</td>
                    </tr>
                    <tr>
                        <td>Radiología Contrastada</td>
                        <td>Urografía intravenosa excretora, Estudios digestivos superiores, Colon por enema, Cistografías, Histerosalpingografía, Fistulografías, etc.</td>
                    </tr>
                    <tr>
                        <td>Ecografía Periférica Vascular</td>
                        <td>Doppler venoso y arterial, Estudio de carótidas</td>
                    </tr>
                    <tr>
                        <td>Tomografía</td>
                        <td>Tomografía helicoidal de 16 cortes, reconstrucción 3D, tomografías multicorte (Cráneo, Columna, Cuello, Tórax, etc.), DentaScan, Abdomen, Músculo esquelético, entre otros</td>
                    </tr>
                    <tr>
                        <td>Resonancia Magnética</td>
                        <td>Cardiaca, Cerebro, Columna, Abdomen, Mama, Musculo esquelético, Colangioresonancia, Angioresonancia cerebral, etc.</td>
                    </tr>
                    <tr>
                        <td>Radiología Intervencionista</td>
                        <td>Panangiografía cerebral, Aortograma, Arteriografías renales, Embolización, Colocación de prótesis biliar, etc.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

export default ServiceDetails1;

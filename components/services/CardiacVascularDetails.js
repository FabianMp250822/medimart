import React from 'react';
import './CardiacVascularDetailsComplete.css';

const CardiacVascularDetailsComplete = () => (
    <div className="cardiac-vascular-details">
        {/* Encabezado del servicio */}
        <div className="cardiac-header">
            <h2>Equipo Especializado en Enfermedades Cardíacas y Vasculares</h2>
        </div>

        {/* Descripción general */}
        <div className="cardiac-description">
            <div className="cardiac-main-image">
                <img src="path_to_main_image.jpg" alt="Enfermedades Cardíacas y Vasculares" />
            </div>
            <p>
                Nuestros especialistas tratan todos los tipos de enfermedades cardíacas y vasculares, incluidas las más complejas. Desde la atención preventiva hasta la cirugía cardíaca, la misión de nuestro equipo de cuidados cardíacos es mantenerlo a usted y a sus seres queridos sanos y activos.
            </p>
            <p>
                Ofrecemos procedimientos no invasivos y cirugía avanzada. Podemos diagnosticar y tratar a todos los tipos de afecciones cardíacas y vasculares como: aneurisma aórtico, estenosis aórtica, fibrilación auricular, arritmia, cardiomiopatía, enfermedades de la arteria carótida, enfermedades de las arterias coronarias, trombosis venosa profunda, ataque cardíaco, insuficiencia cardíaca, enfermedades de las válvulas cardíacas, regurgitación mitral, venas varicosas, enfermedades vasculares.
            </p>
        </div>

        {/* Unidad de rehabilitación cardíaca */}
        <div className="rehab-unit">
            <h3>Unidad de rehabilitación cardíaca</h3>
            <p>
                Contamos con equipos altamente calificados constituidos por cardiólogos, fisioterapeutas con especialización en rehabilitación cardíaca y personal de enfermería. La Unidad está diseñada para brindar rehabilitación cardíaca a pacientes post operados de corazón, cardiopatía o isquemia no revascularizable.
            </p>
            <div className="rehab-image">
                <img src="path_to_rehab_image.jpg" alt="Unidad de Rehabilitación Cardíaca" />
            </div>
        </div>

        {/* Cirugía Cardiovascular */}
        <div className="cardiac-surgery">
            <h3>Cirugía cardiovascular</h3>
            <p>
                La Clínica de la Costa ha logrado integrar un equipo calificado de especialistas en cirugía Cardíaca y Vascular Periférica, así como una infraestructura diseñada y dotada para brindar la mayor seguridad y comodidad en la atención de usuarios con estos delicados procedimientos.
            </p>
            <ul>
                <li>Revascularización (Bypass) Coronaria.</li>
                <li>Reemplazo y Reparación de Válvulas Cardíacas.</li>
                <li>Cirugía de Carótidas y Vascular Periférico.</li>
                <li>Cirugía de Arritmias.</li>
                <li>Cirugía de Cardiopatías Congénitas.</li>
                <li>Cirugía de patología Aórtica.</li>
            </ul>
        </div>

        {/* Métodos No Invasivos */}
        <div className="non-invasive-methods">
            <h3>Métodos no invasivos</h3>
            <p>
                Incluyendo el ecocardiograma (de stress, transtorácico, transesofágico, transtorácico y transesofágico en 3D), la prueba de esfuerzo, el monitor Holter de ritmo cardíaco, el monitoreo de presión arterial de 24 horas y la prueba de mesa basculante.
            </p>
            <div className="non-invasive-image">
                <img src="path_to_non_invasive_image.jpg" alt="Métodos No Invasivos" />
            </div>
        </div>

        {/* Electrofisiología */}
        <div className="electrophysiology">
            <h3>Electrofisiología</h3>
            <p>
                Incluyendo el diagnóstico y tratamiento de pacientes con arritmias, el mapeo tridimensional (3D) de arritmias y la implantación de dispositivos (Marcapasos, Cardio desfibrilador, Cardioresincronizador).
            </p>
            <div className="electrophysiology-image">
                <img src="path_to_electrophysiology_image.jpg" alt="Electrofisiología" />
            </div>
        </div>

        {/* Hemodinamia */}
        <div className="hemodynamics">
            <h3>Hemodinamia</h3>
            <p>
                Incluyendo la cardiología intervencionista de adultos y niños de las enfermedades estructurales del corazón.
            </p>
            <div className="hemodynamics-image">
                <img src="path_to_hemodynamics_image.jpg" alt="Hemodinamia" />
            </div>
        </div>

        {/* Diagnóstico y enfoque multidisciplinario */}
        <div className="cardiac-diagnosis">
            <h3>Diagnóstico tratamiento y enfoque multidisciplinario de la falla cardiaca</h3>
            <p>
                La cardiopatía isquémica, la prevención de infarto de miocardio y las anormalidades del ritmo cardíaco (arritmias).
            </p>
            <div className="diagnosis-image">
                <img src="path_to_diagnosis_image.jpg" alt="Diagnóstico y Enfoque Multidisciplinario" />
            </div>
        </div>

        {/* Beneficios */}
        <div className="benefits">
            <h3>Beneficios</h3>
            <ul>
                <li>Descubrir potenciales riesgos de salud.</li>
                <li>Identificar y reducir factores de riesgo actuales.</li>
                <li>Actuar oportunamente frente a la aparición de una enfermedad.</li>
                <li>Conocer hábitos saludables que incluyan nutrición, ejercicio y manejo de estrés.</li>
            </ul>
        </div>
    </div>
);

export default CardiacVascularDetailsComplete;

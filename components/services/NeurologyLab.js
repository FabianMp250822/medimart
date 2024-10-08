import React from 'react';
import './NeurologyLab.css';

const NeurologyLab = () => (
    <div className="neurology-lab-details">
        {/* Título Principal */}
        <div className="service-header">
            <h2>Neurología y Laboratorio Neurofisiología</h2>
        </div>

        {/* Información del Servicio */}
        <div className="service-content">
            <p>El servicio de neurología y el laboratorio de neurofisiología pertenecen a la Unidad de Neurociencias de la Clínica, y su objetivo es el diagnóstico y tratamiento de enfermedades neurológicas y de trastornos del sueño.</p>
        </div>

        {/* Sección de Áreas */}
        <div className="service-highlight">
            <h3>Áreas</h3>
            <ul>
                <li>Consulta especializada en neurología.</li>
                <li>Urgencias, disponibilidad 24 horas.</li>
                <li>Tratamiento de las enfermedades degenerativas: desmielinizantes, infecciosas, epilepsia.</li>
                <li>Polisomnografía.</li>
                <li>Polisomnografía con oximetría y con titulación de CPAP.</li>
                <li>Electroencefalograma.</li>
                <li>Video telemetrías.</li>
                <li>Potenciales evocados visuales.</li>
                <li>Potenciales evocados somatosensoriales.</li>
                <li>Test de sueño.</li>
            </ul>
        </div>

        {/* Imagen del Servicio */}
        <div className="service-image">
            <img src="/path/to/neurology-lab-image.png" alt="Neurología y Laboratorio Neurofisiología" />
        </div>
    </div>
);

export default NeurologyLab;

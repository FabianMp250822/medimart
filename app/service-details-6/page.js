'use client';

import React, { useState } from 'react';
import Layout from "@/components/layout/Layout";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import GenericServiceDetail from '@/components/services/GenericServiceDetail';

// JSON de servicios y subservicios
const initialServices = [
    {
        title: "Medicina Interna",
        subservices: [
            "Cardiología",
            "Cuidados Paliativos Adultos",
            "Dermatología",
            "Endocrinología",
            "Gastroenterología",
            "Geriatría",
            "Hemato-oncología",
            "Hematología",
            "Hepatología",
            "Infectología",
            "Medicina del Deporte",
            "Medicina Familiar",
            "Medicina Física y Rehabilitación - Fisiatría",
            "Medicina Interna",
            "Nefrología",
            "Neumología",
            "Neurología",
            "Oncología",
            "Psiquiatría",
            "Radioterapia",
            "Reumatología"
        ]
    },
    {
        title: "Medicina Crítica",
        subservices: [
            "Cuidados Intensivos e Intermedios Adultos",
            "Cuidados Intensivos e Intermedios Neonatales",
            "Cuidados Intensivos e Intermedios Pediátricos",
            "Teleurgencias",
            "Unidad de Alto Riesgo Obstétrico",
            "Urgencias Adultos",
            "Urgencias Pediátricas"
        ]
    },
    {
        title: "Imágenes Diagnósticas",
        subservices: [
            "Radiología",
            "Ultrasonido",
            "Tomografía Computarizada",
            "Resonancia Magnética"
        ]
    },
    {
        title: "Patología y Medicina de Laboratorio",
        subservices: [
            "Banco de Sangre",
            "Cariotipos en Sangre Periférica y Médula Ósea",
            "Citogenética",
            "Citometría de Flujo",
            "Genética Molecular",
            "Gestión Pretransfusional",
            "Hemostasia y Hematología Especial",
            "Inmunología de Trasplantes e Inmunogenética",
            "Inmunología e Inmunodeficiencias",
            "Laboratorio Clínico",
            "Laboratorio de Hemostasia y Hematología Especial",
            "Microbiología",
            "Programa de Point of Care Testing (POCT)",
            "Secuenciación",
            "Servicio de Patología"
        ]
    },
    {
        title: "Materno Infantil",
        subservices: [
            "Cardiología Pediátrica",
            "Cirugía Pediátrica",
            "Cirugía Plástica",
            "Cuidados Intensivos e Intermedios Neonatales",
            "Cuidados Intensivos e Intermedios Pediátricos",
            "Cuidados Paliativos Pediátricos",
            "Endocrinología Pediátrica",
            "Gastroenterología Pediátrica",
            "Ginecología y Obstetricia",
            "Hemato-Oncología Pediátrica",
            "Hospitalización",
            "Infectología Pediátrica",
            "Inmunología Clínica Pediátrica",
            "Nefrología Pediátrica",
            "Neumología Pediátrica",
            "Neurología Pediátrica o Neuropediatría",
            "Oftalmología Pediátrica",
            "Pediatría",
            "Psiquiatría Infantil",
            "Reumatología Pediátrica",
            "Unidad de Alto Riesgo Obstétrico",
            "Unidad de Cuidado Intensivo Cardiovascular Pediátrico",
            "Unidad de Recién Nacidos",
            "Urgencias Pediátricas",
            "Vacunación"
        ]
    },
    {
        title: "Cirugía",
        subservices: [
            "Anestesiología",
            "Cirugía Bariátrica y Laparoscópica Avanzada",
            "Cirugía Cardiovascular Pediátrica",
            "Cirugía de Cabeza y Cuello",
            "Cirugía de Colon y Recto",
            "Cirugía de Tórax",
            "Cirugía de Trauma y Emergencias",
            "Cirugía Gastrointestinal",
            "Cirugía General",
            "Cirugía Hepatobiliar y Trasplantes",
            "Cirugía Oncológica",
            "Cirugía Oral y Maxilofacial",
            "Cirugía Pediátrica",
            "Cirugía Plástica, Reconstructiva, Estética y Oncológica",
            "Cirugía Vascular Periférica",
            "Electrofisiología",
            "Mastología",
            "Neurocirugía",
            "Neurointervencionismo",
            "Oftalmología",
            "Ortopedia y Traumatología",
            "Otorrinolaringología",
            "Trasplantes",
            "Unidad de Intervencionismo Vascular",
            "Urología"
        ]
    },
    {
        title: "Servicios",
        subservices: [
            "Hospitalización",
            "Consulta Externa",
            "Endoscopia",
            "Clínicas y Programas Especiales",
            "Medicina Nuclear",
            "Medicina Física y Rehabilitación",
            "Vacunación"
        ]
    }
];


export default function Service() {
    const MySwal = withReactContent(Swal);
    const [services, setServices] = useState(initialServices);
    const [activeService, setActiveService] = useState(null);

    const handleServiceClick = (service) => {
        setActiveService(activeService === service ? null : service);
    };

    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Nuestros Servicios">
                <section className="service-section sec-pad">
                    <div className="auto-container">
                        {/* Estilos CSS en línea */}
                        <style jsx>{`
                            .service-container {
                                display: flex;
                                gap: 20px;
                            }
                            .service-list, .subservice-list {
                                width: 50%;
                            }
                            .service-item, .subservice-item {
                                padding: 10px;
                                border-bottom: 1px solid #e0e0e0;
                                cursor: pointer;
                                transition: background 0.3s ease;
                            }
                            .service-item:hover, .subservice-item:hover {
                                background-color: #f0f0f0;
                            }
                            .service-item.active {
                                font-weight: bold;
                                background-color: #d8e8f8;
                            }
                            .subservice-item {
                                padding-left: 20px;
                            }
                        `}</style>

                        <div className="service-container">
                            {/* Lista de servicios principales */}
                            <div className="service-list">
                                <h2>Servicios Principales</h2>
                                {services.map((service, index) => (
                                    <div
                                        key={index}
                                        className={`service-item ${activeService === service ? 'active' : ''}`}
                                        onClick={() => handleServiceClick(service)}
                                    >
                                        {service.title}
                                    </div>
                                ))}
                            </div>

                            {/* Lista de subservicios */}
                            <div className="subservice-list">
                                <h2>Subservicios</h2>
                                {activeService && activeService.subservices.length > 0 ? (
                                    activeService.subservices.map((subservice, subIndex) => (
                                        <div key={subIndex} className="subservice-item">
                                            {subservice}
                                        </div>
                                    ))
                                ) : (
                                    <p>Selecciona un servicio para ver los subservicios.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

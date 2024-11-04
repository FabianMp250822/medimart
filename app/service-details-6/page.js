'use client';

import React, { useState } from 'react';
import Layout from "@/components/layout/Layout";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

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
        title: "Clínicas y Programas Especiales",
        subservices: [
            "Clínica de Acretismo Placentario",
            "Clínica de Anticoagulación",
            "Clínica de Falla Cardiaca",
            "Clínica de Género para Niños y Adolescentes",
            "Clínica de Gliomas de Alto Grado",
            "Clínica de Heridas y Terapia Enterostomal",
            "Clínica de Infusiones",
            "Clínica de Menopausia y Climaterio",
            "Clínica de Tumores del Sistema Nervioso Central",
            "Clínica del Dolor",
            "Programa Soporte Oncológico",
            "Telemedicina-LiliConnect"
        ]
    },
    {
        title: "Consulta Externa",
        subservices: [
            "Alergología",
            "Cardiología",
            "Cardiología Pediátrica",
            "Clínica de Heridas y Terapia Enterostomal",
            "Cuidados Paliativos Adultos",
            "Cuidados Paliativos Pediátricos",
            "Dermatología",
            "Diagnóstico Vascular",
            "Electrofisiología",
            "Endocrinología",
            "Endocrinología Pediátrica",
            "Fonoaudiología",
            "Gastroenterología",
            "Geriatría",
            "Ginecología y Obstetricia",
            "Hemato-oncología",
            "Hemato-Oncología Pediátrica",
            "Hematología",
            "Hepatología",
            "Infectología",
            "Infectología Pediátrica",
            "Inmunología clínica pediátrica",
            "Medicina Familiar",
            "Nefrología",
            "Nefrología Pediátrica",
            "Neumología",
            "Neumología Pediátrica",
            "Neurointervencionismo",
            "Neurología",
            "Neurología Pediátrica o Neuropediatría",
            "Neuropsicología",
            "Nutrición y Dietética",
            "Oftalmología Pediátrica",
            "Ortopedia y Traumatología",
            "Pediatría",
            "Psicología",
            "Psiquiatría",
            "Psiquiatría Infantil",
            "Reumatología",
            "Reumatología Pediátrica",
            "Urología"
        ]
    },
    {
        title: "Hospitalización",
        subservices: [
            "Hospitalización",
         
        ]
    },
    {
        title: "Endoscopia",
        subservices: [
            "Endoscopia",
            "Neumología (Broncoscopia Básica y Avanzada)"
         
        ]
    },
    {
        title: "Medicina Nuclear",
        subservices: [
            "Medicina Nuclear Molecular",
          
         
        ]
    },
    {
        title: "Medicina Física y Rehabilitación",
        subservices: [
            "Medicina Física y Rehabilitación - Fisiatría",
        
        ]
    },
    {
        title: "Vacunación",
        subservices: [
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
    
        // Función para agrupar subservicios por la letra inicial y distribuir en dos columnas
        const groupAndSplitSubservices = (subservices) => {
            const grouped = subservices.reduce((acc, subservice) => {
                const initial = subservice[0].toUpperCase();
                if (!acc[initial]) acc[initial] = [];
                acc[initial].push(subservice);
                return acc;
            }, {});
    
            // Convertir el objeto en una lista de listas de subservicios para organizar en dos columnas
            const sortedGrouped = Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
            const midIndex = Math.ceil(sortedGrouped.length / 2);
            return [sortedGrouped.slice(0, midIndex), sortedGrouped.slice(midIndex)];
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
                                .subservice-list h3 {
                                    font-size: 18px;
                                    color: #007bff;
                                    margin-top: 20px;
                                    margin-bottom: 5px;
                                }
                                .subservice-columns {
                                    display: flex;
                                    gap: 20px;
                                }
                                .subservice-column {
                                    flex: 1;
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
    
                                {/* Lista de subservicios organizados en dos columnas */}
                                <div className="subservice-list">
                                    <h2>Subservicios</h2>
                                    {activeService && activeService.subservices.length > 0 ? (
                                        <div className="subservice-columns">
                                            {groupAndSplitSubservices(activeService.subservices).map((column, columnIndex) => (
                                                <div className="subservice-column" key={columnIndex}>
                                                    {column.map(([letter, items], index) => (
                                                        <div key={index}>
                                                            <h3>{letter}</h3>
                                                            {items.map((subservice, subIndex) => (
                                                                <div key={subIndex} className="subservice-item">
                                                                    {subservice}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
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
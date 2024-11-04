'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Layout from "@/components/layout/Layout";
import servicesData from './servicesData';
import { formatServiceNameForFirebase } from './utils';

export default function Service() {
    const [activeService, setActiveService] = useState(null);

    const handleServiceClick = (service) => {
        setActiveService(activeService === service ? null : service);
    };

    const groupAndSplitSubservices = (subservices) => {
        const grouped = subservices.reduce((acc, subservice) => {
            const initial = subservice[0].toUpperCase();
            if (!acc[initial]) acc[initial] = [];
            acc[initial].push(subservice);
            return acc;
        }, {});

        const sortedGrouped = Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
        const midIndex = Math.ceil(sortedGrouped.length / 2);
        return [sortedGrouped.slice(0, midIndex), sortedGrouped.slice(midIndex)];
    };

    const handleSubserviceClick = (subservice) => {
        const firebaseId = formatServiceNameForFirebase(subservice);
        
        // Mostrar en consola la relación entre la selección y el documento en Firebase
        console.log(`Subservicio seleccionado: "${subservice}"`);
        console.log(`ID de documento en Firebase: "${firebaseId}"`);

        // Aquí es donde redirigirías a la página de detalles del subservicio
        // o buscarías el documento en Firebase en una lógica adicional
    };

    return (
        <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Nuestros Servicios">
            <section className="service-section sec-pad">
                <div className="auto-container">
                    <style jsx>{`
                        .service-container { display: flex; gap: 20px; }
                        .service-list, .subservice-list { width: 50%; }
                        .service-item, .subservice-item { padding: 10px; border-bottom: 1px solid #e0e0e0; cursor: pointer; transition: background 0.3s ease; }
                        .service-item:hover, .subservice-item:hover { background-color: #f0f0f0; }
                        .service-item.active { font-weight: bold; background-color: #d8e8f8; }
                        .subservice-list h3 { font-size: 18px; color: #007bff; margin-top: 20px; margin-bottom: 5px; }
                        .subservice-columns { display: flex; gap: 20px; }
                        .subservice-column { flex: 1; display: flex; flex-direction: column; }
                    `}</style>

                    <div className="service-container">
                        <div className="service-list">
                            <h2>Servicios Principales</h2>
                            {servicesData.map((service, index) => (
                                <div
                                    key={index}
                                    className={`service-item ${activeService === service ? 'active' : ''}`}
                                    onClick={() => handleServiceClick(service)}
                                >
                                    {service.title}
                                </div>
                            ))}
                        </div>

                        <div className="subservice-list">
                            <h2>Subservicios</h2>
                            {activeService && activeService.subservices.length > 0 ? (
                                <div className="subservice-columns">
                                    {groupAndSplitSubservices(activeService.subservices).map((column, columnIndex) => (
                                        <div className="subservice-column" key={columnIndex}>
                                            {column.map(([letter, items], index) => (
                                                <div key={index}>
                                                    <h3>{letter}</h3>
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                                        {items.map((subservice, subIndex) => (
                                                            <div 
                                                                key={subIndex} 
                                                                className="subservice-item" 
                                                                style={{ width: '45%' }}
                                                                onClick={() => handleSubserviceClick(subservice)}
                                                            >
                                                                <Link href={`/service-details/${formatServiceNameForFirebase(subservice)}`}>
                                                                    {subservice}
                                                                </Link>
                                                            </div>
                                                        ))}
                                                    </div>
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
    );
}

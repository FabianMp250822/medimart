'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Layout from "@/components/layout/Layout";
import servicesData from './servicesData';
import { formatServiceNameForFirebase } from './utils';

export default function Service() {
    const [activeService, setActiveService] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const handleServiceClick = (service) => {
        setActiveService(activeService === service ? null : service);
        setSearchTerm(""); // Limpiar el campo de búsqueda al cambiar de servicio
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const getSubservicesToDisplay = () => {
        if (searchTerm) {
            // Búsqueda en todos los servicios y subservicios
            return servicesData.flatMap(service => 
                service.subservices
                    .filter(subservice => subservice.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(subservice => ({ serviceTitle: service.title, subservice }))
            );
        }
        
        // Si no hay término de búsqueda, mostrar los subservicios del servicio seleccionado
        return activeService?.subservices.map(subservice => ({ serviceTitle: activeService.title, subservice })) || [];
    };

    const groupAndSplitSubservices = (subservices) => {
        const grouped = subservices.reduce((acc, { subservice }) => {
            if (typeof subservice === 'string' && subservice.length > 0) {
                const initial = subservice[0].toUpperCase();
                if (!acc[initial]) acc[initial] = [];
                acc[initial].push(subservice);
            }
            return acc;
        }, {});

        const sortedGrouped = Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
        const midIndex = Math.ceil(sortedGrouped.length / 2);
        return [sortedGrouped.slice(0, midIndex), sortedGrouped.slice(midIndex)];
    };

    const handleSubserviceClick = (subservice) => {
        const firebaseId = formatServiceNameForFirebase(subservice);
        
        console.log(`Subservicio seleccionado: "${subservice}"`);
        console.log(`ID de documento en Firebase: "${firebaseId}`);
    };

    const subservicesToDisplay = getSubservicesToDisplay();

    return (
        <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Nuestros Servicios">
            <section className="service-section sec-pad">
                <div className="auto-container">
                    <style jsx>{`
                        .service-container { display: flex; gap: 20px; }
                        .service-list { width: 30%; }
                        .subservice-list { width: 70%; }
                        .service-item, .subservice-item { padding: 10px; border-bottom: 1px solid #e0e0e0; cursor: pointer; transition: background 0.3s ease; }
                        .service-item:hover, .subservice-item:hover { background-color: #f0f0f0; }
                        .service-item.active { font-weight: bold; background-color: #d8e8f8; }
                        .subservice-list h3 { font-size: 18px; color: #007bff; margin-top: 20px; margin-bottom: 5px; }
                        .subservice-columns { display: flex; gap: 20px; }
                        .subservice-column { flex: 1; display: flex; flex-direction: column; }
                        .subservice-letter { font-weight: bold; color: #007bff; margin-top: 10px; }
                        .subservice-link { color: #333; text-decoration: none; transition: box-shadow 0.3s ease; }
                        .subservice-link:hover { box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); color: #007bff; }
                        .search-bar { padding: 8px; width: 100%; margin-bottom: 20px; border: 1px solid #ddd; border-radius: 4px; }
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
                            <input
                                type="text"
                                className="search-bar"
                                placeholder="Buscar subservicio..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            {subservicesToDisplay.length > 0 ? (
                                <div className="subservice-columns">
                                    {groupAndSplitSubservices(subservicesToDisplay).map((column, columnIndex) => (
                                        <div className="subservice-column" key={columnIndex}>
                                            {column.map(([letter, items], index) => (
                                                <div key={index}>
                                                    <div className="subservice-letter">{letter}</div>
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                                        {items.map((subservice, subIndex) => (
                                                            <div 
                                                                key={subIndex} 
                                                                className="subservice-item" 
                                                                style={{ width: '45%' }}
                                                                onClick={() => handleSubserviceClick(subservice)}
                                                            >
                                                                <Link href={`/service-details/${formatServiceNameForFirebase(subservice)}`} className="subservice-link">
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
                                <p>No se encontraron subservicios que coincidan con la búsqueda.</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

'use client';

import React, { useState } from 'react';

export default function ServiceList({ servicesList, activeServiceId, onServiceClick }) {
    const [searchTerm, setSearchTerm] = useState("");

    // Filtrar la lista de servicios en función del término de búsqueda
    const filteredServices = servicesList.filter((service) =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="service-sidebar">
            <h3>Servicios</h3>
            <input
                type="text"
                className="search-input"
                placeholder="Buscar servicio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="service-list">
                {filteredServices.map((service) => (
                    <li key={service.id}>
                        <a
                            onClick={() => onServiceClick(service.id)}
                            className={`service-link ${service.id === activeServiceId ? 'active' : ''}`}
                        >
                            {service.title}
                        </a>
                    </li>
                ))}
            </ul>

            <style jsx>{`
                .service-sidebar h3 {
                    font-size: 22px;
                    color: #007bff;
                    margin-bottom: 15px;
                    text-transform: uppercase;
                }
                .service-sidebar {
                    background-color: #f5f5f5;
                    padding: 15px;
                    border-radius: 8px;
                }
                .search-input {
                    width: 100%;
                    padding: 8px;
                    margin: 3px 0;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }
                .service-list {
                    list-style: none;
                    padding: 0;
                    max-height: 500px;
                    overflow-y: auto;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    margin: 0;
                }
                .service-list::-webkit-scrollbar {
                    width: 6px;
                }
                .service-list::-webkit-scrollbar-thumb {
                    background-color: #ccc;
                    border-radius: 3px;
                }
                .service-list li {
                    margin: 0;
                }
                .service-link {
                    color: #333;
                    text-decoration: none;
                    font-weight: 500;
                    display: block;
                    padding: 12px 15px;
                    transition: background 0.3s ease, color 0.3s ease;
                    background-color: #ffffff;
                    cursor: pointer;
                }
                .service-link:hover {
                    background-color: #e6e6e6;
                }
                .service-link.active {
                    background-color: #007bff;
                    color: #004080;
                }
                .service-link.active:hover {
                    color: #004080;
                }
                .service-list li:nth-child(odd) .service-link {
                    background-color: #ffffff;
                }
                .service-list li:nth-child(even) .service-link {
                    background-color: #f9f9f9;
                }
            `}</style>
        </div>
    );
}

'use client';

import React from 'react';

export default function ServiceList({ servicesList, activeServiceId, onServiceClick }) {
    return (
        <div className="service-sidebar">
            <h3>Servicios</h3>
            <ul className="service-list">
                {servicesList.map((service) => (
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
                    cursor: pointer; /* Cambia el cursor a mano */
                }
                .service-link:hover {
                    background-color: #e6e6e6;
                }
                .service-link.active {
                    background-color: #007bff;
                    color: #004080; /* Cambia el texto a un azul oscuro cuando es activo */
                }
                .service-link.active:hover {
                    color: #004080; /* Asegura que el texto sea azul al pasar el cursor sobre el enlace activo */
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

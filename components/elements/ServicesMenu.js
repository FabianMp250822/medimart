import servicesData from "@/app/service-details-6/servicesData";
import Link from "next/link";
import React, { useState } from "react";

export default function ServicesMenu() {
    const [activeSection, setActiveSection] = useState(null); // Estado para secciones activas
    const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

    const toggleSection = (title) => {
        setActiveSection(activeSection === title ? null : title);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filterServices = () => {
        if (!searchTerm) return servicesData; // Si no hay búsqueda, devolver todos los servicios
        return servicesData
            .map((service) => {
                // Filtrar subservicios basados en el término de búsqueda
                const filteredSubservices = service.subservices.filter((subservice) =>
                    subservice.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
                // Incluir el servicio solo si tiene subservicios coincidentes
                return filteredSubservices.length > 0
                    ? { ...service, subservices: filteredSubservices }
                    : null;
            })
            .filter((service) => service !== null); // Eliminar servicios vacíos
    };

    const filteredServices = filterServices();

    return (
        <div className="sidebar-menu">
            <style jsx>{`
                .sidebar-menu {
                    background-color: #f9f9f9;
                    padding: 15px;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }
                .search-bar {
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 15px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    font-size: 14px;
                }
                .menu-title {
                    font-weight: bold;
                    color: #333;
                    margin-bottom: 10px;
                    cursor: pointer;
                    padding: 10px;
                    border-radius: 5px;
                    transition: background-color 0.3s ease;
                }
                .menu-title:hover {
                    background-color: #e6e6e6;
                }
                .subservices-list {
                    margin-left: 10px;
                    padding-left: 10px;
                    border-left: 2px solid #ddd;
                }
                .subservice-item {
                    margin-bottom: 5px;
                }
                .subservice-item a {
                    color: #007bff;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
                .subservice-item a:hover {
                    color: #0056b3;
                }
                .menu-title.active {
                    background-color: #ddd;
                }
                .no-results {
                    color: #888;
                    font-size: 14px;
                    text-align: center;
                    margin-top: 10px;
                }
            `}</style>

            {/* Barra de búsqueda */}
            <input
                type="text"
                className="search-bar"
                placeholder="Buscar servicios..."
                value={searchTerm}
                onChange={handleSearchChange}
            />

            {/* Mostrar servicios filtrados */}
            {filteredServices.length > 0 ? (
                filteredServices.map((service, index) => (
                    <div key={index} className="menu-section">
                        {/* Título de la sección */}
                        <div
                            className={`menu-title ${
                                activeSection === service.title || searchTerm ? "active" : ""
                            }`}
                            onClick={() => !searchTerm && toggleSection(service.title)}
                        >
                            {service.title}
                        </div>
                        {/* Lista de subservicios */}
                        {(activeSection === service.title || searchTerm) && (
                            <div className="subservices-list">
                                {service.subservices.map((subservice, subIndex) => (
                                    <div key={subIndex} className="subservice-item">
                                        <Link href={subservice.url}>{subservice.name}</Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div className="no-results">No se encontraron servicios.</div>
            )}
        </div>
    );
}

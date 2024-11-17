'use client';

import Layout from "@/components/layout/Layout";
import { useState } from "react";
import PacienteMenu from "@/components/elements/Pacientemenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function AreasClinica() {
    const [searchQuery, setSearchQuery] = useState(""); // Estado para el buscador

    const titulo = "Áreas de la Clínica de la Costa";
    const descripcion = `
        Descubre las diferentes áreas de la Clínica de la Costa, organizadas alfabéticamente. Utiliza el buscador para encontrar rápidamente la información que necesitas.
    `;

    const areas = [
        { name: "Alergología", phone: "605-123-4567", email: "alergologia@clinicadelacosta.com" },
        { name: "Broncopulmonar", phone: "605-123-4568", email: "broncopulmonar@clinicadelacosta.com" },
        { name: "Cardiología", phone: "605-123-4569", email: "cardiologia@clinicadelacosta.com" },
        { name: "Dermatología", phone: "605-123-4570", email: "dermatologia@clinicadelacosta.com" },
        { name: "Endocrinología", phone: "605-123-4571", email: "endocrinologia@clinicadelacosta.com" },
        { name: "Fisiatría", phone: "605-123-4572", email: "fisiatria@clinicadelacosta.com" },
        { name: "Gastroenterología", phone: "605-123-4573", email: "gastroenterologia@clinicadelacosta.com" },
        { name: "Hematología", phone: "605-123-4574", email: "hematologia@clinicadelacosta.com" },
        { name: "Infectología", phone: "605-123-4575", email: "infectologia@clinicadelacosta.com" },
        { name: "Neurología", phone: "605-123-4576", email: "neurologia@clinicadelacosta.com" },
        { name: "Oftalmología", phone: "605-123-4577", email: "oftalmologia@clinicadelacosta.com" },
        { name: "Pediatría", phone: "605-123-4578", email: "pediatria@clinicadelacosta.com" },
        { name: "Reumatología", phone: "605-123-4579", email: "reumatologia@clinicadelacosta.com" },
        { name: "Urología", phone: "605-123-4580", email: "urologia@clinicadelacosta.com" },
    ];

    // Filtrar las áreas por el texto del buscador
    const filteredAreas = areas.filter((area) =>
        area.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Layout footerStyle={1}>
                {/* Encabezado */}
                <div
                    className="d-flex flex-column flex-md-row align-items-center p-4"
                    style={{
                        backgroundColor: '#1A1A3B',
                        borderRadius: '8px',
                        marginBottom: '10px',
                        marginTop: '20px',
                        padding: '20px',
                    }}
                >
                    <div className="container">
                        <div
                            className="d-flex flex-column flex-md-row align-items-center"
                            style={{
                                gap: '20px',
                            }}
                        >
                            <div style={{ flex: '1.5' }}>
                                <img
                                    src="https://picsum.photos/800/400"
                                    alt="Recomendaciones para Visitantes"
                                    style={{
                                        borderRadius: '8px',
                                        width: '100%',
                                        height: '100%',
                                        maxHeight: '450px',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>
                            <ServiceHeader titulo={titulo} />
                        </div>
                    </div>
                </div>

                {/* Contenido Principal */}
                <div className="service-details pb_110">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-3">
                                <PacienteMenu />
                            </div>
                            <div className="col-12 col-md-9">
                                <div className="pt-4">
                                    <div className="mb-4">
                                        <p style={{ fontSize: '16px', color: '#3B3B3B', textAlign: 'justify', lineHeight: '1.8' }}>
                                            {descripcion}
                                        </p>
                                    </div>

                                    {/* Buscador */}
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            placeholder="Buscar áreas..."
                                            className="form-control"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            style={{
                                                borderRadius: '8px',
                                                padding: '10px',
                                                fontSize: '16px',
                                            }}
                                        />
                                    </div>

                                    {/* Tarjetas de Áreas */}
                                    <div className="row">
                                        {filteredAreas.map((area, index) => (
                                            <div
                                                className="col-12 col-md-6 col-lg-4 mb-4"
                                                key={index}
                                            >
                                                <div
                                                    className="card"
                                                    style={{
                                                        height: '100%',
                                                        borderRadius: '8px',
                                                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <div
                                                        className="card-body"
                                                        style={{
                                                            textAlign: 'center',
                                                            padding: '20px',
                                                        }}
                                                    >
                                                        <h5
                                                            style={{
                                                                fontSize: '18px',
                                                                color: '#1A1A3B',
                                                                fontWeight: 'bold',
                                                            }}
                                                        >
                                                            {area.name}
                                                        </h5>
                                                        <p style={{ fontSize: '14px', color: '#6c757d' }}>
                                                            Teléfono: {area.phone}
                                                        </p>
                                                        <p style={{ fontSize: '14px', color: '#6c757d' }}>
                                                            Correo: <a href={`mailto:${area.email}`} style={{ textDecoration: 'none', color: '#2C2C5B' }}>{area.email}</a>
                                                        </p>
                                                    </div>
                                                    <div
                                                        className="card-footer"
                                                        style={{
                                                            backgroundColor: '#F8F9FA',
                                                            textAlign: 'center',
                                                            padding: '10px 0',
                                                        }}
                                                    >
                                                        <a
                                                            href={`tel:${area.phone.replace(/[^\d+]/g, "")}`}
                                                            style={{
                                                                color: '#1A1A3B',
                                                                fontSize: '20px',
                                                            }}
                                                        >
                                                            <i className="fas fa-phone"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Mensaje de "No se encontraron resultados" */}
                                    {filteredAreas.length === 0 && (
                                        <p
                                            style={{
                                                textAlign: 'center',
                                                color: '#6c757d',
                                                marginTop: '20px',
                                                fontSize: '16px',
                                            }}
                                        >
                                            No se encontraron áreas para tu búsqueda.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

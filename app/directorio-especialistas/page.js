'use client';

import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useState } from "react";
import SidebarMenu from "@/components/elements/SidebarMenu";
import PacienteMenu from "@/components/elements/Pacientemenu";

export default function AreasClinica() {
    const [searchQuery, setSearchQuery] = useState(""); // Estado para el buscador

    const titulo = "Áreas de la Clínica de la Costa";
    const descripcion = `
        Descubre las diferentes áreas de la Clínica de la Costa, organizadas alfabéticamente. Utiliza el buscador para encontrar rápidamente la información que necesitas.
    `;

    const areas = [
        { name: "Alergología", phone: "605-123-4567" },
        { name: "Broncopulmonar", phone: "605-123-4568" },
        { name: "Cardiología", phone: "605-123-4569" },
        { name: "Dermatología", phone: "605-123-4570" },
        { name: "Endocrinología", phone: "605-123-4571" },
        { name: "Fisiatría", phone: "605-123-4572" },
        { name: "Gastroenterología", phone: "605-123-4573" },
        { name: "Hematología", phone: "605-123-4574" },
        { name: "Infectología", phone: "605-123-4575" },
        { name: "Neurología", phone: "605-123-4576" },
        { name: "Oftalmología", phone: "605-123-4577" },
        { name: "Pediatría", phone: "605-123-4578" },
        { name: "Reumatología", phone: "605-123-4579" },
        { name: "Urología", phone: "605-123-4580" },
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
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/banner%2Fmisionvision_(1)-transformed.jpeg?alt=media&token=fc787cf2-c0e8-4f7a-a5a4-da0291536d42"
                                    alt="Áreas de la Clínica"
                                    style={{
                                        borderRadius: '8px',
                                        width: '100%',
                                        height: '100%',
                                        maxHeight: '450px',
                                        objectFit: 'cover',
                                        marginTop: "50px",
                                    }}
                                />
                            </div>
                            <div style={{ flex: '1' }}>
                                <Link href="/servicios" legacyBehavior>
                                    <a
                                        className="text-decoration-none mb-3 d-inline-flex align-items-center"
                                        style={{
                                            fontSize: '16px',
                                            color: '#F0E7D8',
                                            marginBottom: '10px',
                                            marginTop: '50px',
                                        }}
                                    >
                                        <i className="fas fa-arrow-left mr-2"></i> Todos los Servicios
                                    </a>
                                </Link>
                                <h1
                                    style={{
                                        color: '#F0E7D8',
                                        fontSize: '32px',
                                        margin: '20px 0',
                                    }}
                                >
                                    {titulo}
                                </h1>
                            </div>
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
                                                        borderRadius: '8px',
                                                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
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
                                                        <button
                                                            className="btn btn-primary"
                                                            style={{
                                                                backgroundColor: '#2C2C5B',
                                                                borderColor: '#2C2C5B',
                                                                borderRadius: '8px',
                                                                fontSize: '14px',
                                                                padding: '10px 20px',
                                                            }}
                                                            onClick={() =>
                                                                alert(
                                                                    `Llamando a ${area.name} (${area.phone})`
                                                                )
                                                            }
                                                        >
                                                            Llamar
                                                        </button>
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

'use client';

import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import SidebarMenu from "@/components/elements/SidebarMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ReglamentoInternoTrabajo() {
    const [sedes, setSedes] = useState([]);

    useEffect(() => {
        // Obtener las sedes desde Firebase
        const fetchSedes = async () => {
            try {
                const sedesRef = collection(db, 'sedes');
                const sedesSnapshot = await getDocs(sedesRef);
                const sedesList = sedesSnapshot.docs.map(doc => {
                    const nombreCompleto = doc.data().nombre;
                    const nombreProcesado = nombreCompleto.replace('Clínica de la Costa - ', '');
                    return nombreProcesado;
                });
                setSedes(sedesList);
            } catch (error) {
                console.error("Error al obtener las sedes:", error);
            }
        };

        fetchSedes();
    }, []);

    const titulo = "Reglamento Interno de Trabajo - Clínica de la Costa";
    const descripcion = `
        El Reglamento Interno de Trabajo de la Clínica de la Costa establece las normas, procedimientos y políticas que rigen las relaciones laborales entre la institución y sus colaboradores. Este documento, actualizado en julio de 2025, garantiza un ambiente laboral seguro, equitativo y profesional, promoviendo el cumplimiento de las disposiciones legales vigentes en Colombia.
    `;

    const pdfUrl = "https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/fondosweb%2FREGLAMENTO%20INTERNO%20DE%20TRABAJO%20CL%C3%8DNICA%20DE%20LA%20COSTA%20ACT%20JULIO%20-2025%20.pdf?alt=media&token=d1271ffd-7b2d-4541-8223-8e39a3a80583";

    return (
        <>
            <Layout footerStyle={1}>
                {/* Banner Principal */}
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
                            {/* Imagen representativa */}
                            <div style={{ flex: '1.5' }}>
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/banner%2Fmisionvision_(1)-transformed.jpeg?alt=media&token=fc787cf2-c0e8-4f7a-a5a4-da0291536d42"
                                    alt="Reglamento Interno de Trabajo"
                                    style={{
                                        borderRadius: '8px',
                                        width: '100%',
                                        height: '100%',
                                        maxHeight: '450px',
                                        objectFit: 'cover',
                                        marginTop: '50px',
                                    }}
                                />
                            </div>
                            <ServiceHeader titulo={titulo} />
                        </div>
                    </div>
                </div>

                {/* Contenedor principal */}
                <div className="service-details pb_110">
                    <div className="container">
                        <div className="row">
                            {/* Menú lateral */}
                            <div className="col-12 col-md-3">
                                <SidebarMenu />
                            </div>

                            {/* Contenido principal */}
                            <div className="col-12 col-md-9">
                                <div className="pt-4">
                                    {/* Descripción */}
                                    <div className="mb-4">
                                        <p style={{ fontSize: '16px', color: '#3B3B3B', textAlign: 'justify', lineHeight: '1.8' }}>
                                            {descripcion}
                                        </p>
                                    </div>

                                    {/* Sedes */}
                                    <div className="mb-4">
                                        <p
                                            className="text-muted text-uppercase mb-2"
                                            style={{
                                                color: '#F0E7D8',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Aplicable en todas las sedes:
                                        </p>
                                        <div className="d-flex flex-wrap" style={{ gap: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                                            {sedes.map((sede, index) => (
                                                <span
                                                    key={index}
                                                    style={{
                                                        padding: '5px 15px',
                                                        borderRadius: '20px',
                                                        backgroundColor: '#3B3B3B',
                                                        color: '#F0E7D8',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {sede}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Información del documento */}
                                    <div className="mb-4 p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #dee2e6' }}>
                                        <h5 style={{ color: '#1A1A3B', marginBottom: '15px' }}>
                                            <i className="fas fa-file-pdf" style={{ color: '#dc3545', marginRight: '10px' }}></i>
                                            Documento Oficial
                                        </h5>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <p><strong>Versión:</strong> Actualizada Julio 2025</p>
                                                <p><strong>Tipo:</strong> Reglamento Interno</p>
                                            </div>
                                            <div className="col-md-6">
                                                <p><strong>Estado:</strong> Vigente</p>
                                                <p><strong>Aplicabilidad:</strong> Todos los colaboradores</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Botones de acción */}
                                    <div className="mb-4 text-center">
                                        <div className="btn-group" role="group">
                                            <a
                                                href={pdfUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-primary btn-lg me-3"
                                                style={{
                                                    backgroundColor: '#1A1A3B',
                                                    border: 'none',
                                                    padding: '12px 25px',
                                                    borderRadius: '8px',
                                                }}
                                            >
                                                <i className="fas fa-external-link-alt me-2"></i>
                                                Ver en Nueva Pestaña
                                            </a>
                                            <a
                                                href={pdfUrl}
                                                download="Reglamento_Interno_Trabajo_Clinica_Costa_2025.pdf"
                                                className="btn btn-outline-primary btn-lg"
                                                style={{
                                                    borderColor: '#1A1A3B',
                                                    color: '#1A1A3B',
                                                    padding: '12px 25px',
                                                    borderRadius: '8px',
                                                }}
                                            >
                                                <i className="fas fa-download me-2"></i>
                                                Descargar PDF
                                            </a>
                                        </div>
                                    </div>

                                    {/* Visor PDF integrado */}
                                    <div className="pdf-viewer-container mb-4">
                                        <h5 style={{ color: '#1A1A3B', marginBottom: '15px' }}>
                                            Visualización del Documento
                                        </h5>
                                        <div 
                                            style={{
                                                position: 'relative',
                                                width: '100%',
                                                height: '800px',
                                                border: '2px solid #dee2e6',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                            }}
                                        >
                                            <iframe
                                                src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                                                width="100%"
                                                height="100%"
                                                style={{
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                }}
                                                title="Reglamento Interno de Trabajo - Clínica de la Costa"
                                            />
                                        </div>
                                        <p className="text-muted text-center mt-2" style={{ fontSize: '14px' }}>
                                            Si no puede visualizar el documento, 
                                            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#1A1A3B', textDecoration: 'none' }}>
                                                {' '}haga clic aquí para abrirlo en una nueva pestaña
                                            </a>
                                        </p>
                                    </div>

                                    {/* Información adicional */}
                                    <div className="alert alert-info" style={{ backgroundColor: '#e7f3ff', border: '1px solid #b3d9ff', borderRadius: '8px' }}>
                                        <h6 style={{ color: '#1A1A3B', marginBottom: '10px' }}>
                                            <i className="fas fa-info-circle me-2"></i>
                                            Información Importante
                                        </h6>
                                        <ul style={{ marginBottom: '0', paddingLeft: '20px' }}>
                                            <li>Este reglamento es de obligatorio cumplimiento para todos los colaboradores de la Clínica de la Costa.</li>
                                            <li>Las actualizaciones y modificaciones serán comunicadas oportunamente a través de los canales oficiales.</li>
                                            <li>Para consultas específicas, contacte al Departamento de Recursos Humanos.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    .btn:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                        transition: all 0.3s ease;
                    }
                    
                    .pdf-viewer-container iframe {
                        transition: all 0.3s ease;
                    }
                    
                    .pdf-viewer-container:hover iframe {
                        box-shadow: 0 6px 20px rgba(0,0,0,0.15);
                    }
                    
                    @media (max-width: 768px) {
                        .btn-group {
                            display: flex;
                            flex-direction: column;
                            gap: 10px;
                        }
                        
                        .btn-lg {
                            width: 100%;
                        }
                        
                        .pdf-viewer-container div {
                            height: 600px !important;
                        }
                    }
                `}</style>
            </Layout>
        </>
    );
}

'use client';

import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";

export default function Reumatologia() {
    const [hasRedirected, setHasRedirected] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            window.open('https://clinica-reumatologia.vercel.app/', '_blank');
            setHasRedirected(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Layout footerStyle={1}>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 text-center">
                        <div className="redirect-container">
                            {!hasRedirected && (
                                <div className="spinner-border text-primary mb-4" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </div>
                            )}
                            {hasRedirected && (
                                <div className="text-success mb-4" style={{ fontSize: '3rem' }}>
                                    <i className="fas fa-check-circle"></i>
                                </div>
                            )}
                            <h2 className="mb-3">
                                {hasRedirected ? 'Portal de Reumatología Abierto' : 'Redirigiendo al Servicio de Reumatología'}
                            </h2>
                            <p className="mb-4">
                                {hasRedirected 
                                    ? 'El portal especializado de Reumatología se ha abierto en una nueva pestaña.'
                                    : 'Te estamos redirigiendo a nuestro portal especializado de Reumatología...'
                                }
                            </p>
                            <div className="d-flex gap-3 justify-content-center">
                                <button 
                                    className="btn btn-primary btn-lg"
                                    onClick={() => window.open('https://clinica-reumatologia.vercel.app/', '_blank')}
                                >
                                    Ir al Portal de Reumatología
                                </button>
                                <button 
                                    className="btn btn-outline-secondary btn-lg"
                                    onClick={() => window.location.href = '/'}
                                >
                                    Volver al Inicio
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                .redirect-container {
                    background: #f8f9fa;
                    border-radius: 15px;
                    padding: 3rem 2rem;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                }
                .btn-lg {
                    padding: 12px 30px;
                    font-size: 16px;
                    border-radius: 8px;
                }
                @media (max-width: 768px) {
                    .d-flex {
                        flex-direction: column;
                    }
                    .btn-lg {
                        width: 100%;
                        margin-bottom: 10px;
                    }
                }
            `}</style>
        </Layout>
    );
}

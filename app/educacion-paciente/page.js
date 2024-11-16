'use client';

import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";
import SidebarMenu from "@/components/elements/SidebarMenu";
import Modal from "react-modal";
import PacienteMenu from "@/components/elements/Pacientemenu";

export default function PatientVideos() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState("");

    const titulo = "Videos Informativos para Pacientes";
    const descripcion = `
        Explora nuestros videos educativos sobre diversas condiciones de salud. Haz clic en cualquiera de ellos para ver más detalles.
    `;

    const videos = [
        {
            title: "Insulina: educación al paciente",
            url: "https://www.youtube.com/watch?v=HM3XPLlX-Os",
        },
        {
            title: "Educación al paciente Diabetes",
            url: "https://www.youtube.com/watch?v=DZTcWqi36gE",
        },
     
        {
            title: "Educación al paciente - Clínica San Francisco",
            url: "https://www.youtube.com/watch?v=UDfk4793p-o",
        },
      
        {
            title: "#43 Educación al Paciente - Jefe Yazmín Torres",
            url: "https://www.youtube.com/watch?v=n0w35YhAnhE",
        },
        {
            title: "Educación al Paciente y su Familia",
            url: "https://www.youtube.com/watch?v=kbf7VYYkyxc",
        },
        {
            title: "Programa de información y educación al paciente y su familia",
            url: "https://www.youtube.com/watch?v=6B5u2MHiuHM",
        },
      
        {
            title: "Conversatorio: ¿Por qué es importante educar al paciente?",
            url: "https://www.youtube.com/watch?v=GiYkHO0-gMs",
        },
      
        {
            title: "Insuficiencia Cardíaca - Educación para el paciente",
            url: "https://www.youtube.com/watch?v=waglFOqXMuI",
        },
       
       
      
    ];

    const openModal = (videoUrl) => {
        setCurrentVideoUrl(videoUrl);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setCurrentVideoUrl("");
    };

    useEffect(() => {
        Modal.setAppElement('body');
    }, []);

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
                                    alt="Videos para Pacientes"
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

                                    {/* Galería de Videos */}
                                    <div className="row">
                                        {videos.map((video, index) => {
                                            const urlParams = new URLSearchParams(new URL(video.url).search);
                                            const videoId = urlParams.get('v');
                                            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;

                                            return (
                                                <div className="col-12 col-md-6 mb-4" key={index}>
                                                    <div
                                                        className="card"
                                                        style={{
                                                            borderRadius: '8px',
                                                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={() => openModal(video.url)}
                                                    >
                                                        <img
                                                            src={thumbnailUrl}
                                                            alt={video.title}
                                                            style={{
                                                                borderTopLeftRadius: '8px',
                                                                borderTopRightRadius: '8px',
                                                                width: '100%',
                                                                height: '200px',
                                                                objectFit: 'cover',
                                                            }}
                                                        />
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
                                                                {video.title}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Modal para reproducir el video */}
                                    {modalIsOpen && (
                                        <Modal
                                            isOpen={modalIsOpen}
                                            onRequestClose={closeModal}
                                            contentLabel="Video Modal"
                                            style={{
                                                content: {
                                                    top: '50%',
                                                    left: '50%',
                                                    right: 'auto',
                                                    bottom: 'auto',
                                                    marginRight: '-50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    width: '80%',
                                                    height: '80%',
                                                    padding: '0',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    overflow: 'hidden',
                                                },
                                                overlay: {
                                                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                                                },
                                            }}
                                        >
                                            <button
                                                onClick={closeModal}
                                                style={{
                                                    position: 'absolute',
                                                    top: '10px',
                                                    right: '20px',
                                                    fontSize: '30px',
                                                    color: '#fff',
                                                    background: 'transparent',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    zIndex: '1',
                                                }}
                                            >
                                                &times;
                                            </button>
                                            <div style={{ width: '100%', height: '100%' }}>
                                                <iframe
                                                    width="100%"
                                                    height="100%"
                                                    src={`https://www.youtube.com/embed/${new URLSearchParams(new URL(currentVideoUrl).search).get('v')}`}
                                                    title={currentVideoUrl}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        </Modal>
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

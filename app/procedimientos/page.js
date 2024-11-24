'use client';

import { useState, useEffect } from 'react';
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function PreparationDetails() {
    const [titulo] = useState("Preparación para Exámenes Diagnósticos");
    const [data, setData] = useState([]);
    const [isActive, setIsActive] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch data from Firebase
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const querySnapshot = await getDocs(collection(db, "instructions"));
                const firebaseData = querySnapshot.docs.map(doc => doc.data());
                if (firebaseData.length > 0 && firebaseData[0].instructions) {
                    setData(firebaseData[0].instructions);
                }
            } catch (error) {
                console.error("Error al obtener los datos de Firebase: ", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleAccordion = (key) => {
        setIsActive(isActive === key ? null : key);
    };

    return (
        <Layout footerStyle={1}>
            {/* Banner Principal */}
            <div className="banner">
                <ServiceHeader titulo={titulo} />
            </div>

            {/* Contenido Principal */}
            <div className="container mt-4">
                <div className="row">
                    {/* Menú Lateral */}
                    <div className="col-12 col-md-3">
                        <ServicesMenu />
                    </div>

                    {/* Contenido */}
                    <div className="col-12 col-md-9">
                        <div className="instructions-container">
                            {isLoading ? (
                                <p>Cargando datos...</p>
                            ) : (
                                data.map((section, index) => (
                                    <div key={index} className="instruction-card">
                                        <div
                                            className={`instruction-header ${
                                                isActive === index ? "active" : ""
                                            }`}
                                            onClick={() => toggleAccordion(index)}
                                        >
                                            <h3>{section.section}</h3>
                                            <span className="toggle-icon">
                                                {isActive === index ? "−" : "+"}
                                            </span>
                                        </div>
                                        {isActive === index && (
                                            <div className="instruction-body">
                                                {section.details?.map((detail, i) => (
                                                    <p key={i}>{detail}</p>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .banner {
                    background-color: #1A1A3B;
                    padding: 20px;
                    border-radius: 8px;
                    color: #fff;
                    text-align: center;
                    margin-bottom: 20px;
                }

                .instructions-container {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .instruction-card {
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }

                .instruction-header {
                    background-color: #f9f9f9;
                    padding: 15px 20px;
                    cursor: pointer;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 18px;
                    font-weight: bold;
                    border-bottom: 1px solid #ddd;
                    transition: background-color 0.3s, color 0.3s;
                }

                .instruction-header:hover {
                    background-color: #007bff;
                    color: #fff;
                }

                .instruction-header.active {
                    background-color: #1A1A3B;
                    color: #fff;
                }

                .instruction-body {
                    padding: 20px;
                    background-color: #fff;
                }

                .instruction-body p {
                    margin-bottom: 10px;
                    font-size: 16px;
                    line-height: 1.5;
                }

                .toggle-icon {
                    font-size: 20px;
                    font-weight: bold;
                }
            `}</style>
        </Layout>
    );
}

'use client';

import Layout from "@/components/layout/Layout";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ReclamacionResultados() {
    const MySwal = withReactContent(Swal);

    const [idNumber, setIdNumber] = useState("");
    const [resultados, setResultados] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!idNumber) {
            MySwal.fire({
                icon: "error",
                title: "Error",
                text: "Por favor ingrese su número de consulta.",
            });
            return;
        }

        try {
            MySwal.fire({
                title: "Consultando resultados...",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            const docRef = doc(db, "resultados", idNumber);
            const docSnap = await getDoc(docRef);

            Swal.close();

            if (docSnap.exists()) {
                const data = docSnap.data().Resultados;

                // Ordenar los resultados por fecha (descendente)
                const resultadosOrdenados = Object.entries(data)
                .map(([tipo, detalle]) => {
                    let nombreExamen;
                    switch (tipo) {
                        case "Sangre":
                            nombreExamen = "Examen de Hemoglobina";
                            break;
                        case "Radiografia":
                            nombreExamen = "Radiografía General";
                            break;
                        case "Orina":
                            nombreExamen = "Análisis de Orina";
                            break;
                        case "Ecografia":
                            nombreExamen = "Ecografía Abdominal";
                            break;
                        case "Electrocardiograma":
                            nombreExamen = "Electrocardiograma (ECG)";
                            break;
                        case "TAC":
                            nombreExamen = "Tomografía Axial Computarizada (TAC)";
                            break;
                        case "RMN":
                            nombreExamen = "Resonancia Magnética Nuclear (RMN)";
                            break;
                        case "Glucosa":
                            nombreExamen = "Prueba de Glucosa en Sangre";
                            break;
                        case "Colesterol":
                            nombreExamen = "Perfil Lipídico (Colesterol y Triglicéridos)";
                            break;
                        case "Heces":
                            nombreExamen = "Análisis de Heces";
                            break;
                        case "Cultivo":
                            nombreExamen = "Cultivo Microbiológico";
                            break;
                        case "PruebaEsfuerzo":
                            nombreExamen = "Prueba de Esfuerzo Cardíaca";
                            break;
                        case "Mamografia":
                            nombreExamen = "Mamografía";
                            break;
                        case "Densitometria":
                            nombreExamen = "Densitometría Ósea";
                            break;
                        case "Papanicolau":
                            nombreExamen = "Papanicolaou (Citología Cervical)";
                            break;
                        case "PCR":
                            nombreExamen = "Prueba de PCR (Reacción en Cadena de la Polimerasa)";
                            break;
                        case "Biopsia":
                            nombreExamen = "Biopsia";
                            break;
                        case "Espermatograma":
                            nombreExamen = "Espermatograma";
                            break;
                        case "FuncionalHepatico":
                            nombreExamen = "Pruebas de Función Hepática";
                            break;
                        case "FuncionalRenal":
                            nombreExamen = "Pruebas de Función Renal";
                            break;
                        default:
                            nombreExamen = tipo; // Si no se encuentra en la lista, usar el tipo original
                            break;
                    }
            
                    return {
                        tipo: nombreExamen,
                        documento: detalle.documento,
                        fecha: detalle.fecha.toDate(),
                    };
                })
                .sort((a, b) => b.fecha - a.fecha); // Ordenar por fecha descendente
            
            setResultados(resultadosOrdenados);
            

                MySwal.fire({
                    icon: "success",
                    title: "Resultados encontrados",
                    text: "Sus resultados están disponibles a continuación.",
                });
            } else {
                setResultados([]);
                MySwal.fire({
                    icon: "warning",
                    title: "No encontrado",
                    text: "No se encontraron resultados para el número de consulta ingresado.",
                });
            }
        } catch (error) {
            console.error("Error al consultar resultados:", error);
            MySwal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un problema al consultar sus resultados. Por favor intente nuevamente.",
            });
        }
    };

    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Reclamar Resultados">
                {/* Sección para reclamar resultados */}
                <section className="results-section py-5">
                    <div className="container">
                        <div className="row">
                            {/* Sección de Ingreso de Datos */}
                            <div className="col-lg-6 mb-4">
                                <div className="card shadow-lg">
                                    <div className="card-body">
                                        <h3 className="card-title text-center mb-4">Consulta de Resultados Médicos</h3>
                                        <p className="text-muted text-center">Ingrese su número de consulta para acceder a sus resultados médicos.</p>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="idNumber" className="form-label">Número de consulta</label>
                                                <input
                                                    type="text"
                                                    id="idNumber"
                                                    className="form-control"
                                                    placeholder="Ingrese su número de consulta"
                                                    required
                                                    value={idNumber}
                                                    onChange={(e) => setIdNumber(e.target.value)}
                                                />
                                            </div>
                                            <div className="d-grid">
                                                <button type="submit" className="btn btn-primary">
                                                    Consultar Resultados
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            {/* Sección de Resultados */}
                            <div className="col-lg-6">
                                <div className="card shadow-lg">
                                    <div className="card-body">
                                        <h3 className="card-title text-center mb-4">Resultados</h3>
                                        {resultados.length > 0 ? (
                                            <ul className="list-group">
                                                {resultados.map((resultado, index) => (
                                                    <li className="list-group-item" key={index}>
                                                        <h5 className="mb-1">{resultado.tipo}</h5>
                                                        <p className="mb-1"><strong>Fecha:</strong> {resultado.fecha.toLocaleString()}</p>
                                                        <a
                                                            href={resultado.documento}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="btn btn-link p-0"
                                                        >
                                                            Ver documento
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-center text-muted">Ingrese su número de consulta para ver los resultados.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

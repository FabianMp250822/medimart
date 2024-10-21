'use client'
import Layout from "@/components/layout/Layout"
import { useState } from 'react'
import Link from 'next/link';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { FaCheckCircle } from 'react-icons/fa'

export default function ReclamacionResultados() {
    const MySwal = withReactContent(Swal)

    const [idNumber, setIdNumber] = useState('')
    const [resultsStatus, setResultsStatus] = useState(null)
    const [lastUpdate, setLastUpdate] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!idNumber) {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor ingrese su número de identificación.',
            })
            return
        }

        // Simulación de llamada API para obtener resultados
        try {
            MySwal.fire({
                title: 'Consultando resultados...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                }
            })

            setTimeout(() => {
                Swal.close()
                // Simulación de resultados obtenidos
                const fetchedStatus = 'Resultados Disponibles'
                const fetchedLastUpdate = '21/10/2024'

                setResultsStatus(fetchedStatus)
                setLastUpdate(fetchedLastUpdate)

                MySwal.fire({
                    icon: 'success',
                    title: 'Resultados encontrados',
                    text: `Su estado es: ${fetchedStatus}`,
                })

            }, 2000)
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al consultar sus resultados. Por favor intente nuevamente.',
            })
        }
    }

    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Reclamar Resultados">
                {/* Sección para reclamar resultados */}
                <section className="results-section sec-pad">
                    <div className="auto-container">
                        <div className="row clearfix">
                            {/* Sección de Ingreso de Datos */}
                            <div className="col-lg-6 col-md-12 col-sm-12 results-block">
                                <div className="results-block-one wow fadeInUp animated" data-wow-delay="00ms" data-wow-duration="1500ms">
                                    <div className="results-form">
                                        <h3>Consulta de Resultados Médicos</h3>
                                        <p>Ingrese su número de identificación o código de paciente para acceder a sus resultados de consultas médicas.</p>
                                        <form className="results-input-form" onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    name="id"
                                                    placeholder="Número de identificación"
                                                    required
                                                    value={idNumber}
                                                    onChange={(e) => setIdNumber(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <button type="submit" className="theme-btn btn-three">Consultar Resultados</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            {/* Sección de Estado */}
                            <div className="col-lg-6 col-md-12 col-sm-12 results-block">
                                <div className="results-block-one wow fadeInUp animated" data-wow-delay="300ms" data-wow-duration="1500ms">
                                    <div className="results-status">
                                        <h3>Estado de sus Resultados</h3>
                                        <p>Después de ingresar su información, los resultados estarán disponibles en línea y podrá descargarlos o consultarlos en esta sección.</p>
                                        <div className="status-display">
                                            {resultsStatus ? (
                                                <>
                                                    <h2><FaCheckCircle /> {resultsStatus}</h2>
                                                    <span>Última actualización: {lastUpdate}</span>
                                                    <div className="status-footer">
                                                        <Link href="/resultados" className="theme-btn btn-three">Ver Resultados</Link>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <h2>Sin consultas recientes</h2>
                                                    <span>Ingrese su identificación para consultar los resultados.</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Fin de la sección de reclamar resultados */}
            </Layout>
        </>
    )
}

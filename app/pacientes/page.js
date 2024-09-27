'use client';

import Layout from "@/components/layout/Layout";
import { useState } from 'react';
import Hospitalizacion from "../hospitalizacion/page";
import ExamenesLaboratorio from "../examenes-laboratorio/page";
import HorarioTomaMuestras from "../horarios-toma-muestras/page";
import RecomendacionExamenes from "../recomendaciones-examenes/page";
import SolicitudHistoriasClinicas from "../solicitud-historias-clinicas/page"; // Importamos el nuevo componente
import Subscribe from "@/components/layout/Subscribe";
import DerechosPacientes from "../derechos-pacientes/DerechosPacientes";

export default function Service() {
    const [selectedMenu, setSelectedMenu] = useState('hospitalizacion'); // Estado para manejar la sección seleccionada

    // Función para renderizar el contenido basado en el menú seleccionado
    const renderContent = () => {
        switch (selectedMenu) {
            case 'hospitalizacion':
                return <Hospitalizacion />; // Aquí llamamos al componente Hospitalizacion
            case 'examenes-laboratorio':
                return <ExamenesLaboratorio />; // Aquí llamamos al componente ExamenesLaboratorio
            case 'horarios-toma-muestras':
                return <HorarioTomaMuestras />; // Aquí llamamos al componente HorarioTomaMuestras
            case 'recomendaciones-examenes-medicos':
                return <RecomendacionExamenes />; // Aquí llamamos al componente RecomendacionExamenes
            case 'solicitud-historias-clinicas':
                return <SolicitudHistoriasClinicas />;
            case 'deberes-derechos':
                return <DerechosPacientes />;// Aquí llamamos al nuevo componente
            // Puedes agregar más casos para los otros menús
            default:
                return (
                    <div className="service-details-content">
                        <h2>Bienvenido</h2>
                        <p>Selecciona una opción del menú para ver más detalles.</p>
                    </div>
                );
        }
    };

    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Nuestra Clínica">
                <div>
                    {/* Ajuste del padding superior para que el contenido no esté tan abajo */}
                    <section className="service-details pt_60 pb_110">
                        <div className="auto-container">
                            <div className="row clearfix">
                                <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
                                    <div className="default-sidebar service-sidebar mr_15">
                                        <div className="sidebar-widget category-widget">
                                            <div className="widget-title">
                                                <h3>Categoría</h3>
                                            </div>
                                            <div className="widget-content">
                                                <ul className="category-list clearfix">
                                                    <li>
                                                        <a onClick={() => setSelectedMenu('hospitalizacion')} className={selectedMenu === 'hospitalizacion' ? 'current' : ''}>
                                                            Hospitalización
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a onClick={() => setSelectedMenu('examenes-laboratorio')} className={selectedMenu === 'examenes-laboratorio' ? 'current' : ''}>
                                                            Exámenes y Laboratorio
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a onClick={() => setSelectedMenu('horarios-toma-muestras')} className={selectedMenu === 'horarios-toma-muestras' ? 'current' : ''}>
                                                            Horarios para Toma de Muestras
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a onClick={() => setSelectedMenu('recomendaciones-examenes-medicos')} className={selectedMenu === 'recomendaciones-examenes-medicos' ? 'current' : ''}>
                                                            Recomendaciones para Exámenes Médicos
                                                        </a>
                                                    </li>

                                                    <li>
                                                        <a onClick={() => setSelectedMenu('solicitud-historias-clinicas')} className={selectedMenu === 'solicitud-historias-clinicas' ? 'current' : ''}>
                                                            Solicitud de Historias Clínicas
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a onClick={() => setSelectedMenu('deberes-derechos')} className={selectedMenu === 'deberes-derechos' ? 'current' : ''}>
                                                            Deberes y Derechos
                                                        </a>
                                                    </li>



                                                    <li>
                                                        <a onClick={() => setSelectedMenu('convenio-otras-entidades')} className={selectedMenu === 'convenio-otras-entidades' ? 'current' : ''}>
                                                            Convenio con Otras Entidades
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8 col-md-12 col-sm-12 content-side">
                                    {renderContent()} {/* Aquí se renderiza el contenido dinámicamente */}
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* service-section end */}

                    {/* subscribe section */}
                    <Subscribe /> {/* Aquí llamamos al componente de suscripción */}

                </div>
            </Layout>
        </>
    );
}

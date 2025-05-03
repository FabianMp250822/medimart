 'use client';

import Layout from "@/components/layout/Layout";
import { useState } from 'react';
import Subscribe from "@/components/layout/Subscribe";
import ServiceMenu from "@/components/ServiceMenu";
import Hospitalizacion from "@/components/sections/Hospitalizacion";
import ExamenesLaboratorio from "@/components/sections/ExamenesLaboratorio";
import HorarioTomaMuestras from "@/components/sections/HorarioTomaMuestras";
import RecomendacionExamenes from "@/components/sections/RecomendacionExamenes";
import SolicitudHistoriasClinicas from "@/components/sections/SolicitudHistoriasClinicas";
import DerechosPacientes from "@/components/sections/DerechosPacientes";

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
                return <SolicitudHistoriasClinicas />; // Aquí llamamos al componente SolicitudHistoriasClinicas
            case 'deberes-derechos':
                return <DerechosPacientes />; // Aquí llamamos al componente DerechosPacientes
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
        <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Nuestra Clínica">
            <div>
                {/* Ajuste del padding superior para que el contenido no esté tan abajo */}
                <section className="service-details pt_60 pb_110">
                    <div className="auto-container">
                        <div className="row clearfix">
                            <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
                                <ServiceMenu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
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
    );
}

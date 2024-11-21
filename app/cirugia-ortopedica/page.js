'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function OrthopedicSurgeryService() {
    const [titulo] = useState("Cirugía Ortopédica en la Clínica de la Costa SAS");
    const [isActive, setIsActive] = useState(null);

    const toggleAccordion = (key) => {
        setIsActive(isActive === key ? null : key);
    };

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
                            {/* Imagen */}
                            <div style={{ flex: '1.5' }}>
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/servicios%2FDSC01594.JPG?alt=media&token=d932da45-0f06-4b19-85dc-58b718ff3a30"
                                    alt="Cirugía Ortopédica"
                                    style={{
                                        borderRadius: '8px',
                                        width: '100%',
                                        height: 'auto',
                                        maxHeight: '450px',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>

                            {/* Contenido */}
                            <ServiceHeader titulo={titulo} />
                        </div>
                    </div>
                </div>

                {/* Contenido Principal */}
                <div className="service-details pb_110">
                    <div className="container">
                        <div className="row">
                            {/* Menú Lateral */}
                            <div className="col-12 col-md-3">
                                <ServicesMenu />
                            </div>

                            {/* Contenido */}
                            <div className="col-12 col-md-9">
                                <div className="pt-4">
                                    {/* Descripción Principal */}
                                    <div className="description-section mb-5">
                                        <h2 className="description-title">Restaurando movimiento y calidad de vida</h2>
                                        <p>
                                            La cirugía ortopédica es una especialidad dedicada al diagnóstico, tratamiento y rehabilitación de lesiones y enfermedades del sistema musculoesquelético, que incluyen huesos, articulaciones, ligamentos, tendones y músculos. En la Clínica de la Costa SAS, nuestro objetivo es ayudar a nuestros pacientes a recuperar la funcionalidad, aliviar el dolor y mejorar su calidad de vida.
                                        </p>
                                    </div>
                                   {/* Imagen Recortada con Título Debajo */}
                                   <div className="mb-4">
                                        <img
                                            src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-20%20at%209.10.01%20AM.jpeg?alt=media&token=89506541-c55f-44f6-8d77-b64301cf8550"
                                            alt="Atención Hospitalaria"
                                            style={{
                                                width: '100%',
                                                height: '400px', // Ajusta la altura a 400px
                                                borderRadius: '8px',
                                                marginBottom: '10px',
                                                objectFit: 'cover', // Recorta la imagen para que se ajuste al contenedor
                                            }}
                                        />
                                        {/* Texto debajo de la imagen */}
                                        <p style={{ 
                                            color: '#000', 
                                            fontSize: '18px', 
                                            textAlign: 'center', 
                                            marginTop: '5px',
                                        }}>
                                            {titulo}
                                        </p>
                                    </div>
                                    {/* Acordeón */}
                                    <div id="accordion" className="accordion">
                                        {/* Áreas de Especialización */}
                                        <div className="accordion-item">
                                            <h2
                                                className="accordion-header"
                                                onClick={() => toggleAccordion(1)}
                                                style={{
                                                    cursor: 'pointer',
                                                    backgroundColor: isActive === 1 ? '#1A1A3B' : '#f9f9f9',
                                                    color: isActive === 1 ? '#fff' : '#1A1A3B',
                                                    padding: '10px 15px',
                                                    borderRadius: '5px',
                                                    marginBottom: '5px',
                                                    fontSize: '18px',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Áreas de especialización
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <h3>1. Cirugía de reemplazo articular:</h3>
                                                    <ul className="service-list">
                                                        <li>Artroplastia de cadera y rodilla: Sustitución total o parcial de articulaciones dañadas.</li>
                                                        <li>Reemplazo de hombro y codo: Para restaurar la movilidad en casos de desgaste o fracturas graves.</li>
                                                    </ul>
                                                    <h3>2. Cirugía de columna vertebral:</h3>
                                                    <ul className="service-list">
                                                        <li>Tratamiento de hernias discales, escoliosis y otros problemas de la columna.</li>
                                                        <li>Fusión vertebral para corregir deformidades o estabilizar segmentos vertebrales.</li>
                                                    </ul>
                                                    <h3>3. Reparación de fracturas:</h3>
                                                    <ul className="service-list">
                                                        <li>Manejo quirúrgico de fracturas complejas en extremidades, pelvis o columna.</li>
                                                        <li>Uso de placas, tornillos, clavos intramedulares y fijadores externos.</li>
                                                    </ul>
                                                    <h3>4. Cirugía deportiva:</h3>
                                                    <ul className="service-list">
                                                        <li>Reparación de ligamentos cruzados y lesiones meniscales.</li>
                                                        <li>Reconstrucción de tendones y tratamiento de lesiones relacionadas con la práctica deportiva.</li>
                                                    </ul>
                                                    <h3>5. Cirugía de mano y extremidades superiores:</h3>
                                                    <ul className="service-list">
                                                        <li>Tratamiento de síndrome del túnel carpiano, dedo en gatillo y otras condiciones de la mano.</li>
                                                        <li>Reparación de lesiones traumáticas y deformidades congénitas.</li>
                                                    </ul>
                                                    <h3>6. Cirugía pediátrica ortopédica:</h3>
                                                    <ul className="service-list">
                                                        <li>Corrección de deformidades congénitas como pie equinovaro y displasia de cadera.</li>
                                                        <li>Tratamiento de fracturas y problemas de crecimiento óseo en niños.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Innovación en Técnicas Quirúrgicas */}
                                        <div className="accordion-item">
                                            <h2
                                                className="accordion-header"
                                                onClick={() => toggleAccordion(2)}
                                                style={{
                                                    cursor: 'pointer',
                                                    backgroundColor: isActive === 2 ? '#1A1A3B' : '#f9f9f9',
                                                    color: isActive === 2 ? '#fff' : '#1A1A3B',
                                                    padding: '10px 15px',
                                                    borderRadius: '5px',
                                                    marginBottom: '5px',
                                                    fontSize: '18px',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Innovación en técnicas quirúrgicas
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        En la Clínica de la Costa SAS, utilizamos técnicas avanzadas para garantizar los mejores resultados para nuestros pacientes:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Cirugías mínimamente invasivas: Menor daño a los tejidos, menos dolor postoperatorio y recuperación más rápida.</li>
                                                        <li>Artroscopía: Procedimientos realizados con pequeñas cámaras y herramientas para tratar lesiones articulares.</li>
                                                        <li>Implantes de última generación: Materiales duraderos y biocompatibles que ofrecen funcionalidad y seguridad.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Enfoque Integral */}
                                        <div className="accordion-item">
                                            <h2
                                                className="accordion-header"
                                                onClick={() => toggleAccordion(3)}
                                                style={{
                                                    cursor: 'pointer',
                                                    backgroundColor: isActive === 3 ? '#1A1A3B' : '#f9f9f9',
                                                    color: isActive === 3 ? '#fff' : '#1A1A3B',
                                                    padding: '10px 15px',
                                                    borderRadius: '5px',
                                                    marginBottom: '5px',
                                                    fontSize: '18px',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Enfoque integral
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Nuestro servicio de cirugía ortopédica cuenta con el respaldo de un equipo multidisciplinario que incluye:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Fisioterapeutas para la recuperación postquirúrgica.</li>
                                                        <li>Especialistas en rehabilitación física para diseñar planes de recuperación personalizados.</li>
                                                        <li>Diagnóstico por imágenes avanzadas como resonancia magnética y tomografía para precisión en los procedimientos.</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* ¿Por qué elegirnos? */}
                                        <div className="accordion-item">
                                            <h2
                                                className="accordion-header"
                                                onClick={() => toggleAccordion(4)}
                                                style={{
                                                    cursor: 'pointer',
                                                    backgroundColor: isActive === 4 ? '#1A1A3B' : '#f9f9f9',
                                                    color: isActive === 4 ? '#fff' : '#1A1A3B',
                                                    padding: '10px 15px',
                                                    borderRadius: '5px',
                                                    marginBottom: '5px',
                                                    fontSize: '18px',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                ¿Por qué elegir la Clínica de la Costa SAS?
                                            </h2>
                                            {isActive === 4 && (
                                                <div className="accordion-body">
                                                    <ul className="service-list">
                                                        <li>
                                                            <strong>Experiencia comprobada:</strong> Cirujanos ortopédicos altamente calificados con una sólida trayectoria.
                                                        </li>
                                                        <li>
                                                            <strong>Tecnología de punta:</strong> Equipos modernos que aseguran precisión y seguridad en cada procedimiento.
                                                        </li>
                                                        <li>
                                                            <strong>Atención centrada en el paciente:</strong> Diseñamos planes de tratamiento personalizados según las necesidades específicas.
                                                        </li>
                                                        <li>
                                                            <strong>Enfoque en resultados:</strong> Nos esforzamos por restaurar el movimiento y mejorar la calidad de vida de nuestros pacientes.
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    .description-title {
                        font-size: 28px;
                        font-weight: bold;
                        color: #1A1A3B;
                        margin-bottom: 15px;
                        text-transform: uppercase;
                    }
                    .accordion-header:hover {
                        background-color: #007bff !important;
                        color: #fff !important;
                    }
                    .service-list {
                        list-style: none;
                        padding-left: 20px;
                        position: relative;
                    }
                    .service-list li {
                        position: relative;
                        margin-bottom: 10px;
                        padding-left: 25px;
                    }
                    .service-list li:before {
                        content: "✓";
                        position: absolute;
                        left: 0;
                        color: #007bff;
                    }
                `}</style>
            </Layout>
        </>
    );
}

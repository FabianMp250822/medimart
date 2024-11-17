'use client';

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";

export default function PediatricSurgeryService() {
    const [titulo] = useState("Cirugía Pediátrica en la Clínica de la Costa SAS");
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
                                    alt="Cirugía Pediátrica"
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
                                        <h2 className="description-title">Comprometidos con el cuidado integral de los niños y niñas</h2>
                                        <p>
                                            La Cirugía Pediátrica es una especialidad médica dedicada al tratamiento quirúrgico de enfermedades que afectan a niños y niñas, desde la etapa prenatal hasta los 18 años. En la Clínica de la Costa SAS, este servicio está diseñado para garantizar un cuidado integral, respaldado por más de 20 años de experiencia y un equipo altamente especializado.
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <img
                                            src="https://picsum.photos/1200/400?random=5"
                                            alt="Cirugía Pediátrica"
                                            style={{
                                                width: '100%',
                                                borderRadius: '8px',
                                                marginBottom: '15px',
                                            }}
                                        />
                                    </div>
                                    {/* Acordeón */}
                                    <div id="accordion" className="accordion">
                                        {/* Una Especialidad Integral y Multidisciplinaria */}
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
                                                Una especialidad integral y multidisciplinaria
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        La cirugía pediátrica abarca el tratamiento de lesiones y condiciones quirúrgicas en:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Cuello</li>
                                                        <li>Tórax</li>
                                                        <li>Abdomen</li>
                                                        <li>Pelvis</li>
                                                        <li>Genitales</li>
                                                        <li>Extremidades</li>
                                                    </ul>
                                                    <p>
                                                        Esta especialidad no trabaja de forma aislada; colabora estrechamente con otras especialidades pediátricas, ofreciendo un enfoque interdisciplinario que garantiza la mejor atención posible.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Equipo Experto y Tecnología Avanzada */}
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
                                                Equipo experto y tecnología avanzada
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Nuestro servicio de Cirugía Pediátrica cuenta con:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>
                                                            2 cirujanos pediátricos con disponibilidad permanente, quienes se dedican a velar por la seguridad y el bienestar de los pacientes.
                                                        </li>
                                                        <li>
                                                            Tecnología de última generación que permite realizar procedimientos de alta complejidad con precisión.
                                                        </li>
                                                        <li>
                                                            Apoyo de subespecialidades pediátricas, proporcionando un manejo integral para patologías complejas.
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Cirugías Más Comunes */}
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
                                                Cirugías más comunes
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <h3>Cirugías ambulatorias</h3>
                                                    <ul className="service-list">
                                                        <li>Herniorrafia inguinal</li>
                                                        <li>Herniorrafia umbilical</li>
                                                        <li>Resección de quistes tiroglosos</li>
                                                        <li>Dilataciones esofágicas</li>
                                                    </ul>
                                                    <h3>Cirugías complejas</h3>
                                                    <ul className="service-list">
                                                        <li>Resección de quistes del colédoco</li>
                                                        <li>Corrección de atresias de vías biliares</li>
                                                        <li>Corrección de atresias de esófago</li>
                                                        <li>Corrección de defectos de la pared abdominal (gastrosquisis, onfalocele)</li>
                                                        <li>Corrección de malformaciones anorrectales</li>
                                                        <li>Gastrostomía</li>
                                                        <li>Apendicectomía por laparoscopia</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Nuestro Compromiso con las Familias */}
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
                                                Nuestro compromiso con las familias
                                            </h2>
                                            {isActive === 4 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Sabemos que cada intervención quirúrgica puede ser un momento desafiante para las familias. Por ello, nuestro equipo se esfuerza en:
                                                    </p>
                                                    <ul className="service-list">
                                                        <li>Brindar información clara y detallada a los padres y cuidadores.</li>
                                                        <li>Ofrecer un entorno cálido y seguro para los pacientes más jóvenes.</li>
                                                        <li>Garantizar un seguimiento cercano en el proceso postoperatorio.</li>
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

'use client';

import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import ServicesMenu from "@/components/elements/ServicesMenu";
import ServiceHeader from "@/components/elements/ServiceHeader";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

export default function Service() {
    const [sedes, setSedes] = useState([]);
    const [titulo] = useState('Clínica de la Costa: Servicios Quirúrgicos y Cirugía Ambulatoria');
    const [isActive, setIsActive] = useState(null);

    useEffect(() => {
        const fetchSedes = async () => {
            try {
                const sedesRef = collection(db, "sedes");
                const sedesSnapshot = await getDocs(sedesRef);
                const sedesList = sedesSnapshot.docs.map((doc) => {
                    const nombreCompleto = doc.data().nombre;
                    return nombreCompleto.replace("Clínica de la Costa - ", "");
                });
                setSedes(sedesList);
            } catch (error) {
                console.error("Error al obtener las sedes:", error);
            }
        };
        fetchSedes();
    }, []);

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
                                    alt="Servicios Quirúrgicos"
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
                                        <h2 className="description-title">Descripción</h2>
                                        <p>
                                            La Clínica de la Costa cuenta con 6 salas de cirugía integradas y equipadas con tecnología de última generación que garantiza una versatilidad del 100% en toda la gama de complejidad. Estas salas están diseñadas para procedimientos avanzados y especializados:
                                        </p>
                                        <ul className="service-list">
                                            <li>1 quirófano destinado a cirugías gineco-obstétricas.</li>
                                            <li>1 quirófano para cirugía cardiovascular.</li>
                                            <li>4 quirófanos para diversas especialidades, incluyendo técnicas mínimamente invasivas y endoscópicas.</li>
                                        </ul>
                                        <p>
                                            Las salas están dotadas con:
                                        </p>
                                        <ul className="service-list">
                                            <li>Sistema automatizado de control de humedad y temperatura.</li>
                                            <li>Flujo de aire laminar para disminuir el riesgo de infecciones.</li>
                                            <li>Máquinas de anestesia de última generación.</li>
                                            <li>Sistemas de monitoreo del paciente (invasivos y no invasivos).</li>
                                        </ul>
                                        <p>
                                            La clínica brinda atención tanto ambulatoria como hospitalaria, garantizando la más alta calidad en los servicios quirúrgicos.
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <img
                                            src="https://picsum.photos/1200/400?random=2"
                                            alt="Servicios Quirúrgicos"
                                            style={{
                                                width: '100%',
                                                borderRadius: '8px',
                                                marginBottom: '15px',
                                            }}
                                        />
                                    </div>
                                    {/* Acordeón */}
                                    <div id="accordion" className="accordion">
                                        {/* Cirugía Ambulatoria */}
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
                                                Cirugía Ambulatoria
                                            </h2>
                                            {isActive === 1 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Este servicio está diseñado para garantizar una atención integral que inicia desde la evaluación del paciente por las especialidades involucradas hasta el seguimiento telefónico posterior al egreso.
                                                    </p>
                                                    <h3>Beneficios de la cirugía ambulatoria:</h3>
                                                    <ul className="service-list">
                                                        <li>Reincorporación rápida a la vida habitual.</li>
                                                        <li>Procedimientos quirúrgicos seguros y sin necesidad de hospitalización.</li>
                                                        <li>Menor riesgo de infección.</li>
                                                        <li>Disminución de la ansiedad.</li>
                                                        <li>Atención personalizada.</li>
                                                    </ul>
                                                    <h3>Especialidades disponibles:</h3>
                                                    <ul className="service-list">
                                                        <li>
                                                            <Link href="/cirugia-plastica">Cirugía plástica</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/neurocirugia">Neurocirugía</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/otorrinolaringologia">Otorrinolaringología</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/electrofisiologia">Electrofisiología</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/ortopedia-y-traumatologia">Cirugía de ortopedia y traumatología</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/urologia">Cirugía de urología</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/cirugia-de-torax">Cirugía de tórax</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/cirugia-vascular-periferica">Cirugía vascular periférica</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/cirugia-general">Cirugía general</Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Servicios Quirúrgicos */}
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
                                                Servicios Quirúrgicos
                                            </h2>
                                            {isActive === 2 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        La clínica ofrece una amplia gama de procedimientos quirúrgicos, que abarcan las siguientes especialidades:
                                                    </p>
                                                    <h3>Quirúrgicos Generales:</h3>
                                                    <ul className="service-list">
                                                        <li>
                                                            <Link href="/cirugia-de-cabeza-y-cuello">Cirugía de cabeza y cuello</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/cirugia-cardiovascular">Cirugía cardiovascular</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/cirugia-general">Cirugía general</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/cirugia-ginecologica">Cirugía ginecológica</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/cirugia-maxilofacial">Cirugía maxilofacial</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/cirugia-oftalmologica">Cirugía oftalmológica</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/cirugia-otorrinolaringologica">Cirugía otorrinolaringológica</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/cirugia-oncologica">Cirugía oncológica</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/cirugia-oral">Cirugía oral</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/cirugia-pediatrica">Cirugía pediátrica</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/cirugia-plastica-y-estetica">Cirugía plástica y estética</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/cirugia-plastica-oncologica">Cirugía plástica oncológica</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/cirugia-de-mama-y-tumores">Cirugía de mama y tumores de tejidos blandos</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/cirugia-vascular-y-angiologica">Cirugía vascular y angiológica</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/cirugia-urologica">Cirugía urológica</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/otras-cirugias">Otras cirugías especializadas</Link>
                                                        </li>
                                                    </ul>
                                                    <h3>Quirúrgicos Especializados:</h3>
                                                    <ul className="service-list">
                                                        <li>
                                                            <Link href="/cirugia-endovascular-neurologica">Cirugía endovascular neurológica</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/cirugia-oncologica-pediatrica">Cirugía oncológica pediátrica</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/cirugia-de-la-mano">Cirugía de la mano</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/cirugia-dermatologica">Cirugía dermatológica</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/cirugia-de-torax">Cirugía de tórax</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/cirugia-ortopedica">Cirugía ortopédica</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/cirugia-gastrointestinal">Cirugía gastrointestinal</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/neurocirugia">Neurocirugía</Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* ¿Por qué elegir la Clínica de la Costa? */}
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
                                                ¿Por qué elegir la Clínica de la Costa?
                                            </h2>
                                            {isActive === 3 && (
                                                <div className="accordion-body">
                                                    <p>
                                                        Con una infraestructura moderna y un equipo altamente calificado, la Clínica de la Costa se posiciona como líder en atención quirúrgica de calidad. La seguridad, comodidad y satisfacción del paciente son nuestras prioridades, brindando un servicio confiable para cada especialidad.
                                                    </p>
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

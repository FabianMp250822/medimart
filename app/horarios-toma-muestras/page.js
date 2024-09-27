'use client';

import { FaRegClock, FaRegFileAlt, FaRegCheckCircle } from 'react-icons/fa';
import './horarioTomaMuestras.css'; // Asegúrate de crear este archivo CSS

export default function HorarioTomaMuestras() {
    return (
        <div className="horario-toma-muestras">
            <section className="service-details pt_120 pb_110">
                <div className="auto-container">
                    <div className="service-details-content">

                        {/* Documentos necesarios */}
                        <div className="content-section mb_60">
                            <div className="icon-title">
                                <FaRegFileAlt className="icon" />
                                <h2>Documentos necesarios</h2>
                            </div>
                            <ul className="custom-list">
                                <li>Orden emitida por el médico.</li>
                                <li>Autorización emitida por la EPS, ARS o entidad a la que se encuentre afiliado.</li>
                                <li>Documento de identificación y fotocopia del carné vigente.</li>
                            </ul>
                        </div>

                        {/* Horario de toma de muestras */}
                        <div className="content-section mb_60">
                            <div className="icon-title">
                                <FaRegClock className="icon" />
                                <h2>Horario de toma de muestras</h2>
                            </div>
                            <ul className="custom-list">
                                <li>Lunes a viernes de 7:00 a.m. a 9:00 a.m.</li>
                                <li><strong>Urgencias:</strong> 24 horas.</li>
                            </ul>
                        </div>

                        {/* Horario de entrega de resultados */}
                        <div className="content-section mb_60">
                            <div className="icon-title">
                                <FaRegCheckCircle className="icon" />
                                <h2>Horario de entrega de resultados</h2>
                            </div>
                            <ul className="custom-list">
                                <li>Lunes a viernes de 3:00 p.m. a 5:00 p.m.</li>
                                <li>*Presentar recibo de entrega de resultados.</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}

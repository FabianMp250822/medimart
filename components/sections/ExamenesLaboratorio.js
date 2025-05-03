'use client';

import React, { useEffect } from 'react';
import './examenesLaboratorio.css'; 

export default function ExamenesLaboratorio() {

    useEffect(() => {
        const sections = document.querySelectorAll('.fade-in');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }, []);

    return (
        <div>
            {/* service-section */}
            <section className="service-details pt_60 pb_110">
                <div className="auto-container">
                    <div className="service-details-content">
                        <div className="content-one mb_60 fade-in">
                            <figure className="image-box mb_40">
                                <img src="assets/images/service/examenes.jpg" alt="Exámenes y Laboratorios" className="hover-zoom"/>
                            </figure>
                            <div className="text-box">
                                <h2 className="section-title">Exámenes y Laboratorios</h2>
                                <p className="section-description">A continuación, se presentan las recomendaciones e instrucciones para la toma de diversas muestras de laboratorio.</p>
                            </div>
                        </div>

                        {/* Muestras de sangre */}
                        <div className="card-section mb_40 hover-section fade-in">
                            <h3>Muestras de sangre</h3>
                            <ul>
                                <li>Ayuno estricto entre 12 y 14 horas. Aplica para la glicemia, colesterol, ácido úrico, calcio, fósforo, PCR, RA test, triglicéridos, serología.</li>
                                <li>No ingerir bebidas alcohólicas.</li>
                                <li>No hacer ejercicios si se va a realizar: CPK, PSA, prolactina o glicemia.</li>
                                <li><strong>Nota:</strong> Algunas pruebas requieren su permanencia por un periodo prolongado en el laboratorio, siga instrucciones al momento de la toma de muestras.</li>
                            </ul>
                        </div>

                        {/* Parcial de Orina/Urocultivo */}
                        <div className="card-section mb_40 hover-section fade-in">
                            <h3>Parcial de Orina/Urocultivo</h3>
                            <ul>
                                <li>Usar recipiente estéril.</li>
                                <li>Tomar muestra de la primera orina de la mañana con previo aseo de los genitales.</li>
                                <li>No tener relaciones sexuales previamente o el día anterior.</li>
                                <li>No estar tomando antibióticos.</li>
                                <li>Descartar el inicio y final de la orina, solo tomar la muestra de la orina media.</li>
                                <li>No se debe realizar la toma cuando se presente el periodo menstrual.</li>
                                <li>Tapar la muestra y marcarla con el nombre completo.</li>
                                <li>Enviarla antes de pasar dos horas después de la toma de la muestra. No congelar.</li>
                            </ul>
                        </div>

                        {/* Toma de muestra a un bebé */}
                        <div className="card-section mb_40 hover-section fade-in">
                            <h3>Toma de muestra a un bebé</h3>
                            <ul>
                                <li>Utilizar una bolsita recolectora para la muestra.</li>
                                <li>Asear los genitales del bebé.</li>
                                <li>En caso el bebé no haya realizado la misión después de una hora, cambiar la bolsita y asea nuevamente los genitales.</li>
                            </ul>
                        </div>

                        {/* Coprológicos */}
                        <div className="card-section mb_40 hover-section fade-in">
                            <h3>Coprológicos</h3>
                            <ul>
                                <li>Recoja la muestra en un recipiente de plástico, estéril, de boca ancha.</li>
                                <li>Las muestras deben ser entregadas al laboratorio lo más pronto posible.</li>
                                <li>Para coprológicos seriados se debe recoger la muestra por tres días.</li>
                            </ul>
                        </div>

                        {/* Recolección de sangre oculta en materia fecal */}
                        <div className="card-section mb_40 hover-section fade-in">
                            <h3>Recolección de sangre oculta en materia fecal</h3>
                            <ul>
                                <li>No ingerir suplementos de vitamina C, brócoli, coliflor, carnes rojas, banano, manzana, uvas, remolacha, alcohol, ni medicamentos como la aspirina en las 72 horas previas a la recolección.</li>
                            </ul>
                        </div>

                        {/* Recolección de espermogramas */}
                        <div className="card-section mb_40 hover-section fade-in">
                            <h3>Recolección de espermogramas</h3>
                            <ul>
                                <li>Asear los genitales.</li>
                                <li>Recoger la muestra con masturbación en recipiente estéril.</li>
                                <li>Abstinencia de 3 días mínimo.</li>
                                <li>Recoger todo el semen.</li>
                                <li>No utilizar preservativo.</li>
                                <li>Marcar la muestra con su nombre completo.</li>
                            </ul>
                        </div>

                        {/* Cultivo Faríngeo */}
                        <div className="card-section mb_40 hover-section fade-in">
                            <h3>Cultivo Faríngeo</h3>
                            <ul>
                                <li>No usar enjuague bucal el día de la toma de la muestra.</li>
                                <li>Estar en ayunas o no haber ingerido alimentos dos horas previas a la toma de la muestra.</li>
                            </ul>
                        </div>

                        {/* Cultivo para gérmenes comunes de heridas o lesiones en la piel */}
                        <div className="card-section mb_40 hover-section fade-in">
                            <h3>Cultivo para gérmenes comunes de heridas o lesiones en la piel</h3>
                            <ul>
                                <li>Remover el esmalte de las uñas tres (3) días previos a la toma de la muestra.</li>
                                <li>No aplicar tratamiento antimicótico local cinco (5) días antes.</li>
                            </ul>
                        </div>

                        {/* Cultivo para hongos en la piel */}
                        <div className="card-section mb_40 hover-section fade-in">
                            <h3>Cultivo para hongos en la piel</h3>
                            <ul>
                                <li>Abstenerse de tomar o usar medicamentos antimicóticos en la piel 10 días antes.</li>
                                <li>No aplicar talcos o cremas desde el día anterior previo a la toma de la muestra.</li>
                            </ul>
                        </div>

                        {/* Recolección de esputo */}
                        <div className="card-section mb_40 hover-section fade-in">
                            <h3>Recolección de esputo</h3>
                            <ul>
                                <li>Realizar la toma después de bañarse.</li>
                                <li>Lavar la boca solo con agua.</li>
                                <li>Tome la muestra en ayunas.</li>
                                <li>Evitar contaminar la muestra con saliva o secreción nasofaríngea.</li>
                            </ul>
                        </div>

                        {/* Secreción vaginal */}
                        <div className="card-section mb_40 hover-section fade-in">
                            <h3>Secreción vaginal</h3>
                            <ul>
                                <li>No aplicar óvulos ni medicamentos intravaginales tres (3) días previos a la toma de la muestra.</li>
                                <li>No realizar baño con ducha vaginal el día antes de la toma de la muestra.</li>
                                <li>No tener relaciones sexuales tres (3) días antes de la toma de la muestra.</li>
                                <li>No realizar la toma cuando se presente el periodo menstrual.</li>
                            </ul>
                        </div>

                        {/* Secreción uretral/balano prepucial */}
                        <div className="card-section mb_40 hover-section fade-in">
                            <h3>Secreción uretral/balano prepucial</h3>
                            <ul>
                                <li>No tener relaciones sexuales un día antes de la toma de la muestra.</li>
                                <li>Retener la orina mínimo por cuatro (4) horas antes de la muestra.</li>
                                <li>No realizar aseo a los genitales el día antes de la muestra.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

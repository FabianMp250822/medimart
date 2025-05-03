// components/ServiceMenu.jsx
'use client';

import React from 'react';
import styles from './ServiceMenu.module.css'; // Importamos el archivo CSS

export default function ServiceMenu({ selectedMenu, setSelectedMenu }) {
    return (
        <div className="default-sidebar service-sidebar mr_15">
            <div className="sidebar-widget category-widget">
                <div className="widget-title">
                    <h3>Categoría</h3>
                </div>
                <div className="widget-content">
                    <ul className="category-list clearfix">
                        <li>
                            <a
                                onClick={() => setSelectedMenu('hospitalizacion')}
                                className={`${styles.menuLink} ${
                                    selectedMenu === 'hospitalizacion' ? styles.current : ''
                                }`}
                            >
                                Hospitalización
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => setSelectedMenu('examenes-laboratorio')}
                                className={`${styles.menuLink} ${
                                    selectedMenu === 'examenes-laboratorio' ? styles.current : ''
                                }`}
                            >
                                Exámenes y Laboratorio
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => setSelectedMenu('horarios-toma-muestras')}
                                className={`${styles.menuLink} ${
                                    selectedMenu === 'horarios-toma-muestras' ? styles.current : ''
                                }`}
                            >
                                Horarios para Toma de Muestras
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => setSelectedMenu('recomendaciones-examenes-medicos')}
                                className={`${styles.menuLink} ${
                                    selectedMenu === 'recomendaciones-examenes-medicos' ? styles.current : ''
                                }`}
                            >
                                Recomendaciones para Exámenes Médicos
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => setSelectedMenu('solicitud-historias-clinicas')}
                                className={`${styles.menuLink} ${
                                    selectedMenu === 'solicitud-historias-clinicas' ? styles.current : ''
                                }`}
                            >
                                Solicitud de Historias Clínicas
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => setSelectedMenu('deberes-derechos')}
                                className={`${styles.menuLink} ${
                                    selectedMenu === 'deberes-derechos' ? styles.current : ''
                                }`}
                            >
                                Deberes y Derechos
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => setSelectedMenu('convenio-otras-entidades')}
                                className={`${styles.menuLink} ${
                                    selectedMenu === 'convenio-otras-entidades' ? styles.current : ''
                                }`}
                            >
                                Convenio con Otras Entidades
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

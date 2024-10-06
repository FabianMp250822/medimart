'use client';

import React from 'react';
import './solicitudHistoriasClinicas.css'; // Archivo CSS para estilos específicos
import { FaClipboardList } from 'react-icons/fa';

export default function SolicitudHistoriasClinicas() {
    const pasos = [
        {
            numero: 'Paso 1',
            descripcion: 'La solicitud de historias clínicas se realiza directamente en el departamento de archivo ubicado en el piso cinco (5) bloque A.',
        },
        {
            numero: 'Paso 2',
            descripcion: 'Esta solicitud puede ser realizada por el familiar o el paciente una vez haya egresado de su hospitalización, urgencias o consulta externa.',
        },
        {
            numero: 'Paso 3',
            descripcion: 'El solicitante deberá presentar copia de su documento de identidad del paciente (estos documentos solo para solicitud). Si es solicitada por un tercero, deberá además aportar copia del documento de identificación del autorizado y su respectiva autorización.',
        },
        {
            numero: 'Paso 4',
            descripcion: 'El auxiliar de archivo recepciona la solicitud diligenciando el FORMATO DE SOLICITUD DE HISTORIA CLÍNICA, la cual tendrá un tiempo de respuesta de 10 días hábiles.',
        },
        {
            numero: 'Paso 5',
            descripcion: 'Se le informa al solicitante los documentos requeridos para el retiro de las copias de historia clínica en un recordatorio.',
        },
        {
            numero: 'Paso 6',
            descripcion: 'El solicitante recibirá notificación previa por llamada telefónica y/o correo electrónico sobre el valor a cancelar por la expedición de fotocopias. Cada folio tiene un valor de 200 pesos.',
        },
        {
            numero: 'Paso 7',
            descripcion: 'Es de carácter obligatorio presentar la documentación requerida (tercera persona deberá presentar carta de autorización firmada por el paciente y copia de la cédula, registro civil y/o documentos que acrediten el parentesco).',
        },
        {
            numero: 'Paso 8',
            descripcion: 'El solicitante o autorizado deberá firmar el REGISTRO DE ENTREGA DE HISTORIAS CLÍNICAS.',
        },
        {
            numero: 'Paso 9',
            descripcion: 'La solicitud tiene vigencia de 30 días calendario después de la fecha de entrega; si excede este plazo, deberá presentar una nueva solicitud.',
        },
    ];

    return (
        <div className="solicitud-historias-clinicas">
            <section className="service-details pt_60 pb_110">
                <div className="auto-container">
                    <div className="service-details-content">
                        {/* Título principal */}
                        <div className="content-header mb_60">
                            <div className="icon-title">
                                <FaClipboardList className="icon" />
                                <h1>Solicitud de Historias Clínicas</h1>
                            </div>
                            <p>Sigue estos pasos para solicitar tu historia clínica de manera adecuada.</p>
                        </div>

                        {/* Lista de pasos */}
                        <div className="steps-container">
                            {pasos.map((paso, index) => (
                                <div className="step-item" key={index}>
                                    <div className="step-number">
                                        <span>{paso.numero}</span>
                                    </div>
                                    <div className="step-description">
                                        <p>{paso.descripcion}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Nota */}
                        <div className="note-section">
                            <p><strong>Nota:</strong> No se entrega original de imágenes de ecografías ya que esta queda en la historia clínica física.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

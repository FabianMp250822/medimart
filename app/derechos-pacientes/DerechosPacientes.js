'use client';

import React from 'react';
import './derechosPacientes.css';
import { FaBalanceScale, FaDownload } from 'react-icons/fa';

export default function DerechosPacientes() {
    // Lista de anexos con nombres y enlaces
    const anexos = [
        { nombre: 'E1La ACTA DE CONFORMACIÓN EQUIPO DE GESTIÓN POLÍTICA DE PARTICIPACIÓN SOCIAL EN SALUD', enlace: 'http://45.183.247.227:8080/Pagweb/documentos/E1LA-ACTA-DE-CONFORMACION-EQUIPO-DE-GESTION-POLITICA-DE-PARTICIPACION-SOCIAL-EN-SALUD.pdf' },
        { nombre: 'E1Lb. ALCANCE Y RESPONSABILIDADES DEL PLAN DE ACCIÓN EN PARTICIPACIÓN SOCIAL EN SALUD', enlace: 'http://45.183.247.227:8080/Pagweb/documentos/E1LB-ALCANCE-Y-RESPONSABILIDADES-DEL-PLAN-DE-ACCION-EN-PARTICIPACION-SOCIAL-EN-SALUD.pdf' },
        { nombre: 'E2La. SOCIALIZACIÓN A USUARIOS EN PARTICIPACIÓN SOCIAL EN SALUD', enlace: 'http://45.183.247.227:8080/Pagweb/documentos/E2LA-SOCIALIZACION-A-USUARIOS-EN-PARTICIPACION-SOCIAL-EN-SALUD.pdf' },
        { nombre: 'E2La. SOCIALIZACIÓN DERECHOS Y DEBERES DE LOS USUARIOS', enlace: 'http://45.183.247.227:8080/Pagweb/documentos/E2LA-SOCIALIZACION-DERECHOS-Y-DEBERES-DE-LOS-USUARIOS.pdf ' },
        { nombre: 'E2La. SOCIALIZACIÓN HUMANIZACIÓN EN LA PRESTACIÓN DE SERVICIOS DE SALUD', enlace: 'http://45.183.247.227:8080/Pagweb/documentos/E2LA-SOCIALIZACION-HUMANIZACION-EN-LA-PRESTACION-DE-SERVICIOS-DE-SALUD.pdf' },
        { nombre: 'E2Lb. RECONOCIMIENTO A USUARIOS', enlace: 'http://45.183.247.227:8080/Pagweb/documentos/E2LB-RECONOCIMIENTO-A-USUARIOS.pdf' },
        { nombre: 'E2Lc. MANEJO DE HERRAMIENTAS TECNOLÓGICAS', enlace: 'http://45.183.247.227:8080/Pagweb/documentos/E2LC-MANEJO-DE-HERRAMIENTAS-TECNOLOGICAS.pdf' },
        { nombre: 'E2Ld. PUBLICACIÓN EN CARTELERA', enlace: 'http://45.183.247.227:8080/Pagweb/documentos/E2LD-PUBLICACION-EN-CARTELERA.pdf' },
        { nombre: 'E2Le. PROMOCIÓN PARTICIPACIÓN SOCIAL EN SALUD', enlace: 'http://45.183.247.227:8080/Pagweb/documentos/E2LE-PROMOCION-PARTICIPACION-SOCIAL-EN-SALUD.pdf' },
        { nombre: 'E3Lb. EDUCACIÓN A LA COMUNIDAD EN GENERAL', enlace: 'http://45.183.247.227:8080/Pagweb/documentos/E3LB-EDUCACION-A-LA-COMUNIDAD-EN-GENERAL.pdf' },
        { nombre: 'E4Lb. CANALES DE ATENCIÓN AL USUARIO', enlace: 'http://45.183.247.227:8080/Pagweb/documentos/E4LB-CANALES-DE-ATENCION-AL-USUARIO.pdf' },
    ];

    return (
        <div className="derechos-pacientes">
            <section className="service-details pt_60 pb_110">
                <div className="auto-container">
                    <div className="service-details-content">
                        {/* Título principal */}
                        <div className="content-header mb_60">
                            <div className="icon-title">
                                <FaBalanceScale className="icon" />
                                <h1>Derechos y Deberes de los Pacientes</h1>
                            </div>
                            <p>
                                Los usuarios de la CLÍNICA DE LA COSTA LTDA., tienen el derecho primordial a una atención que respete su dignidad personal, valores personales, sociales y espirituales; sin tener en cuenta la edad, género, raza, idioma, religión, opinión política, origen, orientación sexual, condición social o modalidad de afiliación al sistema de salud.
                            </p>
                            <p>
                                Por lo anterior, en nuestra institución nos comprometemos a respetar y hacer respetar los siguientes derechos y deberes de los usuarios:
                            </p>
                        </div>

                        {/* Contenedor con scroll */}
                        <div className="scroll-container">
                            {/* Sección: Derechos de los Pacientes */}
                            <div className="content-section mb_60">
                                <h2>Derechos de los Pacientes</h2>
                                <ul className="custom-list">
                                    <li>Derecho a recibir una atención integral de sus problemas de salud con los mínimos riesgos posibles.</li>
                                    <li>Derecho a elegir libremente a los profesionales de la salud que lo atenderán, dentro de los recursos disponibles en la institución.</li>
                                    <li>Derecho a recibir una atención oportuna y puntual que responda a las necesidades de los usuarios.</li>
                                    <li>Derecho a ser atendidos en sitios tranquilos, limpios e higiénicos.</li>
                                    <li>Derecho a recibir información con respecto a:
                                        <ul>
                                            <li>Sus derechos y deberes como usuario de los servicios de salud.</li>
                                            <li>Los exámenes diagnósticos y tratamientos que se le realicen.</li>
                                            <li>Los aspectos administrativos para su atención y todo lo relacionado con su condición clínica o problema de salud.</li>
                                        </ul>
                                    </li>
                                    <li>Derecho a que se le garantice la confidencialidad de su historia clínica, y que solo con su autorización pueda ser conocida por terceras personas.</li>
                                    <li>Derecho a recibir o rechazar apoyo moral o espiritual sin importar cuál sea el culto religioso que profesa.</li>
                                    <li>Derecho a recibir un trato personalizado, digno, amable, cordial y ético que respete su cultura y costumbres.</li>
                                    <li>Derecho a decidir:
                                        <ul>
                                            <li>Si acepta o no los procedimientos propuestos por el equipo de salud, luego de haber sido debidamente informado sobre sus riesgos, beneficios y alternativas.</li>
                                            <li>Su participación o no en investigaciones científicas, sin que esto influya en la atención a prestar por la clínica.</li>
                                            <li>Que el proceso de la muerte siga su curso natural en la fase terminal de su enfermedad.</li>
                                        </ul>
                                    </li>
                                    <li>Derecho a opinar sobre la calidad del servicio ante la Oficina de Atención al Usuario, a recibir respuestas a sus reclamos y a hacer parte de los espacios establecidos por las normas para la participación de los usuarios (Liga de Usuarios y Comité de Ética Hospitalaria).</li>
                                </ul>
                            </div>

                            {/* Sección: Deberes de los Pacientes */}
                            <div className="content-section mb_60">
                                <h2>Deberes de los Pacientes</h2>
                                <ul className="custom-list">
                                    <li>Cuidar su salud y la de su familia cumpliendo con las recomendaciones del personal de salud de la institución.</li>
                                    <li>Cumplir los horarios asignados para las citas médicas, horario de informes y visitas, entrega de resultados e informar con al menos 24 horas de anterioridad en caso de no poder cumplir.</li>
                                    <li>Proporcionar al personal de la institución información clara y veraz sobre su estado de salud, datos personales, identificación y tipo de afiliación al sistema de seguridad social.</li>
                                    <li>Ser solidario con otros usuarios, entendiendo que puede haber personas con condiciones de salud especiales y requieren una atención prioritaria.</li>
                                    <li>Tratar a funcionarios y demás usuarios de la institución con respeto y amabilidad.</li>
                                    <li>Cuidar y respetar los bienes personales, ajenos y de la institución, evitando alterar la convivencia.</li>
                                    <li>Realizar el pago de los costos derivados de la prestación del servicio, de acuerdo con su régimen y nivel de afiliación.</li>
                                    <li>Informar a la Oficina de Atención al Usuario las anomalías o inconformidades que perciba durante su atención para que estas sean resueltas.</li>
                                    <li>Debe tratar con respeto y cortesía al personal que brinde la atención.</li>
                                </ul>
                            </div>

                            {/* Sección: Participación Social */}
                            <div className="content-section mb_60">
                                <h2>Participación Social</h2>
                                <h3>¿Qué es la participación social en salud?</h3>
                                <p>
                                    Es un proceso de intervención activa, responsable, coherente y propositivo que realiza el individuo de manera particular o colectiva en la toma de decisiones que afecten su vida y/o la de la comunidad.
                                </p>
                                <h3>¿Qué busca la Política de Participación Social en Salud?</h3>
                                <p>
                                    Dar respuesta a las problemáticas, necesidades, dificultades, oportunidades, limitaciones y debilidades que afectan la participación social en salud, en la perspectiva de dar cumplimiento al marco legal vigente y por ende a la realización del derecho humano de la participación vinculado al derecho a la salud (Art 12 Ley 1751 de 2015).
                                </p>
                                <p>
                                    Su objetivo es: Definir y desarrollar las directrices que le permitan al Estado garantizar el derecho a la Participación Social en Salud y su fortalecimiento, y a la ciudadanía la apropiación de mecanismos y condiciones para ejercer la Participación Social en Salud.
                                </p>
                                <h3>Mecanismos y espacios de participación</h3>
                                <p>
                                    Con el propósito de promover el derecho de la participación en el sector salud, el Ministerio, entidades territoriales, EAPB e IPS implementarán escenarios para estimular el cumplimiento de los objetivos de la Participación Social en Salud, así:
                                </p>
                                <ul className="custom-list">
                                    <li>Identificar y disponer los canales de comunicación y los medios electrónicos y presenciales para disponer información a la ciudadanía.</li>
                                    <li>Identificar y desarrollar los mecanismos o espacios institucionales para adelantar procesos de discusión, negociación y concertación.</li>
                                    <li>Establecer mecanismos para facilitar las veedurías ciudadanas y participación de grupos sociales y de ciudadanos en el control social a la gestión institucional.</li>
                                    <li>Identificar, por área misional, las iniciativas temáticas sobre las cuales se pueden hacer ejercicios de participación.</li>
                                    <li>Establecer diálogos participativos en las instancias del sector salud.</li>
                                    <li>Garantizar el reconocimiento de los representantes elegidos de forma democrática.</li>
                                    <li>Implementar la aplicación de las tecnologías de la información y comunicación para facilitar el acceso a la información y brindar espacios a los ciudadanos para expresar sus opiniones sobre los temas de interés en salud.</li>
                                    <li>Implementar los diálogos participativos como espacios de encuentro entre las autoridades y la comunidad con la finalidad de recoger comentarios en forma directa y presencial.</li>
                                </ul>
                                <h3>¿Cómo puedes participar en Clínica de la Costa Ltda?</h3>
                                <p>
                                    En la Clínica de la Costa puedes participar enviando tu solicitud a través del correo electrónico <a href="mailto:trabajosocial@clinicadelacosta.co">trabajosocial@clinicadelacosta.co</a>
                                </p>
                                <p>
                                    <a href="#">Ver más información</a>
                                </p>
                            </div>

                            {/* Sección: Anexos */}
                            <div className="content-section mb_60">
                                <h2>Anexos</h2>
                                <ul className="anexos-list">
                                    {anexos.map((anexo, index) => (
                                        <li key={index}>
                                            <a href={anexo.enlace} target="_blank" rel="noopener noreferrer">
                                                <FaDownload className="download-icon" />
                                                {anexo.nombre}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div> {/* Fin del scroll-container */}

                    </div>
                </div>
            </section>
        </div>
    );
}

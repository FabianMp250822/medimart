'use client';

import { FaProcedures, FaNotesMedical, FaClipboardCheck } from 'react-icons/fa';
import './recomendacionExamenes.css'; // Asegúrate de crear este archivo CSS

export default function RecomendacionExamenes() {
    return (
        <div className="recomendacion-examenes">
            <section className="service-details pt_60 pb_110">
                <div className="auto-container">
                    <div className="service-details-content">

                        {/* Título principal */}
                        <div className="content-header mb_60">
                            <h1>Recomendaciones para Exámenes Médicos</h1>
                            <p>Prepárate adecuadamente para tus exámenes médicos siguiendo estas recomendaciones.</p>
                        </div>

                        {/* Contenedor con scroll */}
                        <div className="scroll-container">
                            {/* Sección: C.P.R.E */}
                            <div className="content-section mb_60">
                                <div className="icon-title">
                                    <FaProcedures className="icon" />
                                    <h2>Colangio Pancreatografía Endoscópica (C.P.R.E)</h2>
                                </div>
                                <p>
                                    Es un procedimiento para examinar los conductos biliares y se realiza a través de un endoscopio. Los conductos biliares son las vías que llevan la bilis desde el hígado hasta la vesícula y el intestino delgado.
                                </p>
                                <h3>Prepárate para el examen</h3>
                                <ul className="custom-list">
                                    <li>Debes venir en ayunas. No ingerir alimentos y/o bebidas seis horas previo al examen.</li>
                                    <li>Los medicamentos anticoagulantes y derivados de la ASPIRINA se deben suspender.</li>
                                    <li>Solo debes ingerir los medicamentos estrictamente necesarios con un pequeño sorbo de agua.</li>
                                    <li>Debes asistir acompañado al examen.</li>
                                    <li>No podrás conducir después del examen.</li>
                                </ul>
                                <h3>Antes de iniciar el examen debes:</h3>
                                <ul className="custom-list">
                                    <li>Informar si estás tomando medicamentos para la coagulación (ASA, cardioaspirina, clopidogrel, warfarina).</li>
                                    <li>Informar si eres alérgico a algún medicamento.</li>
                                    <li>Retirar las prótesis dentales.</li>
                                </ul>
                                <h3>¿En qué consiste el examen?</h3>
                                <ul className="custom-list">
                                    <li>Se colocará una vía intravenosa (IV) en el brazo. Te acostarás boca abajo o sobre el lado izquierdo para el examen.</li>
                                    <li>Se te administrarán medicamentos para relajarte o sedarte a través de la vía intravenosa.</li>
                                    <li>El endoscopio se pasará a través del esófago y el estómago hasta llegar al duodeno.</li>
                                    <li>Puedes tener náuseas mientras la sonda baja por el esófago.</li>
                                    <li>Se pasará una sonda delgada (catéter) a través del endoscopio y se introducirá en los conductos que van al páncreas y a la vesícula biliar.</li>
                                    <li>Se inyectará un tinte especial en estos conductos y se tomarán radiografías para ayudar al médico a detectar cálculos, tumores o áreas estrechadas.</li>
                                </ul>
                            </div>

                            {/* Sección: Colonoscopia */}
                            <div className="content-section mb_60">
                                <div className="icon-title">
                                    <FaNotesMedical className="icon" />
                                    <h2>Colonoscopia</h2>
                                </div>
                                <p>
                                    La colonoscopia es un procedimiento que permite examinar el recubrimiento de la parte baja de tu tracto digestivo (colon o intestino grueso) usando un tubo delgado y flexible con una cámara y luz en el extremo. También permite tomar muestras para biopsias y extraer pequeños tumores llamados pólipos.
                                </p>
                                <h3>¿Qué preparación se requiere?</h3>
                                <p>
                                    Para un examen adecuado y seguro, es crucial que el colon esté completamente vacío. Se te indicará una dieta líquida especial y un purgante para lograrlo.
                                </p>
                                <h3>Preparación 48 horas antes del estudio:</h3>
                                <ul className="custom-list">
                                    <li><strong>Día 1:</strong> Desayuno y almuerzo normales. Cena solo líquidos claros (jugos sin leche ni colorantes, caldos claros, agua natural).</li>
                                    <li><strong>Día 2:</strong> Dieta líquida hasta el almuerzo. A las 4:00 pm, inicia la preparación con KLEAN PREP o NULITELLY (4 sobres, cada uno diluido en un litro de agua fría). Beber cada litro en una hora (un vaso de 250 ml cada 15 minutos) siguiendo los horarios indicados (4:00 pm, 5:00 pm, 6:00 pm y 4:00 am).</li>
                                    <li>Finaliza la preparación a las 8:00 pm habiendo consumido los 4 litros. Si no consumes todos los sobres o no sigues la dieta, el estudio puede no ser efectivo.</li>
                                </ul>
                                <h3>Consideraciones adicionales:</h3>
                                <ul className="custom-list">
                                    <li>Consultar con tu médico si tomas medicamentos para la coagulación.</li>
                                    <li>Informar si eres alérgico a algún medicamento.</li>
                                    <li>Asistir acompañado de un familiar o persona adulta.</li>
                                    <li>No usar esmalte en las uñas el día del examen.</li>
                                    <li>Firmar el consentimiento informado antes del estudio.</li>
                                </ul>
                                <p>Se verificarán historia clínica y resultados de laboratorio (TP, TPTT, hemograma, VIH, electrocardiograma).</p>
                            </div>

                            {/* Sección: Endoscopia */}
                            <div className="content-section mb_60">
                                <div className="icon-title">
                                    <FaClipboardCheck className="icon" />
                                    <h2>Endoscopia</h2>
                                </div>
                                <p>
                                    La endoscopia es una técnica diagnóstica que consiste en introducir un endoscopio con una cámara a través de la boca para examinar el esófago, estómago y duodeno.
                                </p>
                                <h3>Prepárate para el examen</h3>
                                <ul className="custom-list">
                                    <li>Debes venir en ayunas. No ingerir alimentos y/o bebidas seis horas antes del examen.</li>
                                    <li>Los medicamentos anticoagulantes y derivados de la aspirina deben suspenderse.</li>
                                    <li>Solo ingerir medicamentos estrictamente necesarios con un pequeño sorbo de agua.</li>
                                    <li>Asistir acompañado al examen.</li>
                                    <li>No podrás conducir después del examen.</li>
                                </ul>
                                <h3>Antes de iniciar el examen debes:</h3>
                                <ul className="custom-list">
                                    <li>Informar si estás tomando medicamentos para la coagulación.</li>
                                    <li>Informar si eres alérgico a algún medicamento.</li>
                                    <li>Retirar las prótesis dentales y joyería.</li>
                                    <li>Firmar el consentimiento informado.</li>
                                </ul>
                                <p>Se verificarán historia clínica y resultados de laboratorio (TP, TPTT, hemograma, VIH, electrocardiograma).</p>
                            </div>
                        </div> {/* Fin del scroll-container */}

                    </div>
                </div>
            </section>
        </div>
    );
}

'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ServiceHeader({ titulo }) {
    const pathname = usePathname();

    // Mapeo de URLs a números de teléfono
    const phoneNumbers = {
        "/appointment": "(605) 3369999 Ext. 1", // Agenda tu cita
        "/directorio-especialistas": "(605) 3378888 Ext. 2", // Directorio de Especialistas
        "/reclamar-resultados": "(605) 3387777 Ext. 3", // Resultados Médicos
        "/laboratorio-clinico": "(605) 3396666 Ext. 4", // Laboratorio Clínico
        "/preparacion-examenes": "(605) 3405555 Ext. 5", // Preparación para Exámenes Médicos
        "/entidades-convenio": "(605) 3414444 Ext. 6", // Entidades en Convenio
        "/solicitud-historia-clinica": "(605) 3423333 Ext. 7", // Solicitud de Historia Clínica
        "/derechos-y-deberes": "(605) 3432222 Ext. 8", // Derechos y Deberes del Paciente
        "/durante-visita": "(605) 3441111 Ext. 9", // Durante su Visita
        "/educacion-paciente": "(605) 3450000 Ext. 10", // Educación al Paciente
        "/service-details-3": "(605) 3461234 Ext. 11", // Acerca de Nosotros
        "/trabaja-con-nosotros": "(605) 3475678 Ext. 12", // Trabaja con Nosotros
        "/service-details-2": "(605) 3489101 Ext. 13", // Gestión Documental
        "/certificaciones": "(605) 3492345 Ext. 14", // Certificaciones
        "/responsabilidad-social": "(605) 3506789 Ext. 15", // Responsabilidad Social
        "/direccionamiento-estrategico": "(605) 3511122 Ext. 16", // Direccionamiento Estratégico
        "/marco-legal": "(605) 3523344 Ext. 17", // Marco Legal
        "/informes-de-sostenibilidad": "(605) 3535566 Ext. 18", // Informes de Sostenibilidad
        "/sistema-integrado-de-gestion": "(605) 3547788 Ext. 19", // Sistema Integrado de Gestión
        "/politica-de-datos": "(605) 3559900 Ext. 20", // Política de Datos
    };

    // Verificar que pathname esté disponible antes de usarlo
    const telefono = pathname ? phoneNumbers[pathname] || "(605) 3369999 Ext. 1" : "(605) 3369999 Ext. 1";

    return (
        <div style={{ flex: "1" }}>
            <Link href="/servicios" legacyBehavior>
                <a
                    className="text-decoration-none mb-3 d-inline-flex align-items-center"
                    style={{
                        fontSize: "16px",
                        color: "#F0E7D8",
                        marginBottom: "10px",
                        marginTop: "70px",
                    }}
                >
                    <i className="fas fa-arrow-left mr-2"></i> Todos los Servicios
                </a>
            </Link>
            <h1
                style={{
                    color: "#F0E7D8",
                    fontSize: "32px",
                    margin: "20px 0",
                }}
            >
                {titulo || "Cargando..."}
            </h1>
            <div className="d-flex mb-4" style={{ gap: "10px" }}>
                <a
                    href="/appointment"
                    className="d-flex align-items-center"
                    style={{
                        backgroundColor: "#2C2C5B",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        color: "#F0E7D8",
                        fontWeight: "bold",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        border: "none",
                    }}
                >
                    <i className="fas fa-calendar-alt"></i> AGENDA TU CITA
                </a>
                <div
                    className="d-flex align-items-center"
                    style={{
                        backgroundColor: "#2C2C5B",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        color: "#F0E7D8",
                        fontWeight: "bold",
                        display: "inline-flex",
                        gap: "10px",
                    }}
                >
                    <i className="fas fa-phone"></i> {telefono}
                </div>
            </div>
        </div>
    );
}

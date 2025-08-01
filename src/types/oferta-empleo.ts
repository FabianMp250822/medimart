export interface OfertaEmpleo {
    id: string;
    titulo: string;
    descripcion: string;
    requisitos: string;
    ubicacion: string;
    fechaPublicacion: string; // "YYYY-MM-DD"
    tipoContrato: string;
    jornada: string;
    sueldo: string;
    experiencia: string;
    estudios: string;
    habilidades?: string;
    idiomas?: string;
    otros?: string;
}

export interface AcademicInfo {
    anoGraduacion: string;
    gradoAcademico: string;
    institucion: string;
}

export interface ProfessionalExperience {
    descripcionExperiencia: string;
    fechaFin: string;
    fechaInicio: string;
    institucionTrabajo: string;
    posicion: string;
}

export interface Medico {
    id: string;
    nombreCompleto: string;
    especialidad: string;
    profileImage: string;
    sede?: string;
    email?: string;
    telefono?: string;
    fechaNacimiento?: string;
    nacionalidad?: string;
    direccion?: string;
    aplicaEnTodasLasSedes?: boolean;
    academicInfo?: AcademicInfo[];
    professionalExperience?: ProfessionalExperience[];
    awards?: any[]; 
    certifications?: any[]; 
    publications?: any[]; 
    researcherData?: ResearcherData;
}

export interface ClinicalStudy {
    initial_description: string;
    title: string;
    url: string;
}

export interface EventoInstitucion {
    nombre_institucion: string;
    tipo_producto: string;
}

export interface EventoParticipante {
    nombre: string;
    rol_evento: string;
}

export interface EventoCientifico {
    ambito: string;
    fecha_fin: string;
    fecha_inicio: string;
    instituciones_asociadas: EventoInstitucion[];
    lugar: string;
    nombre_evento: string;
    participantes: EventoParticipante[];
    tipo_evento: string;
}

export interface ExperienciaProfesionalResearcher {
    dedicacion: string;
    fecha_fin: string;
    fecha_inicio: string;
    institucion: string;
}

export interface LineaInvestigacion {
    activa: string;
    linea_investigacion: string;
}

export interface ProduccionBibliografica {
    doi: string;
    editorial: string;
    fecha: string;
    issn: string;
    numero: string;
    paginas: string;
    revista: string;
    tipo_produccion: string;
    titulo_articulo: string;
    url_articulo: string;
    url_drive: string;
    volumen: string;
}

export interface Reconocimiento {
    fecha: string;
    nombre_reconocimiento: string;
}

export interface ResearcherData {
    clinical_studies: ClinicalStudy[];
    eventos_cientificos: EventoCientifico[];
    experiencia_profesional: ExperienciaProfesionalResearcher[];
    lineas_investigacion: LineaInvestigacion[];
    produccion_bibliografica: ProduccionBibliografica[];
    reconocimientos: Reconocimiento[];
    // Add other fields from the researcher document as needed
}

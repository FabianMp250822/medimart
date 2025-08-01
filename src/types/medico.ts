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
    awards?: any[]; // Puedes definir una interfaz más específica si es necesario
    certifications?: any[]; // Puedes definir una interfaz más específica si es necesario
    publications?: any[]; // Puedes definir una interfaz más específica si es necesario
}

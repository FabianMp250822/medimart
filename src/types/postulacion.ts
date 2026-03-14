export interface ExperienciaLaboral {
  entidad: string;
  cargo: string;
  fechaInicio: string;
  fechaFin: string;
  funciones: string;
}

export interface CertificacionCandidato {
  nombre: string;
  entidad: string;
  fechaExpedicion: string;
}

export interface ReferenciaPersonal {
  nombre: string;
  telefono: string;
  relacion: string;
}

export type ApplicationStatus = 'Pendiente' | 'En Proceso' | 'Espera' | 'Rechazado' | 'Contratado';

export interface Postulacion {
  id: string;
  // Información Personal
  nombresApellidos: string;
  tipoDocumento: string;
  numeroDocumento: string;
  fechaNacimiento: string;
  lugarNacimiento: string;
  genero: string;
  estadoCivil: string;
  direccionResidencia: string;
  telefonoFijo: string;
  telefonoCelular: string;
  correoElectronico: string;
  
  // Información Académica
  tituloObtenido: string;
  universidad: string;
  fechaGrado: string;
  paisTitulo: string;
  tituloConvalidado: string;
  numeroResolucion: string;
  especializacion: string;
  universidadEspecializacion: string;
  fechaInicioEspecializacion: string;
  fechaFinEspecializacion: string;
  otraInfoAcademica: string;
  
  // Arrays
  experiencias: ExperienciaLaboral[];
  certificaciones: CertificacionCandidato[];
  referencias: ReferenciaPersonal[];
  
  // Habilidades
  tieneTarjetaProfesional: string;
  numeroTarjetaProfesional: string;
  tieneRethus: string;
  cursosAdicionales: string;
  idiomas: string;
  habilidadesInformaticas: string;
  
  // Información Adicional
  tieneDiscapacidad: string;
  perteneceMinoria: string;
  aspiracionSalarial: string;
  disponibilidadViajar: string;
  
  // Archivos
  cvURL: string;
  certificadosURLs: string[];
  
  // Metadata
  ofertaId: string | null;
  ofertaTitulo: string;
  fechaPostulacion: any; // Firestore Timestamp
  estado: ApplicationStatus;

  // Seguimiento / Follow-up
  entrevistaLink?: string;
  entrevistaRealizada?: boolean;
  entrevistaReporte?: string;
  entrevistaAprobado?: boolean;
  documentacionRecibida?: boolean;
  documentacionVerificada?: boolean;
  documentacionObservaciones?: string;
}

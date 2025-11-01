/**
 * Configuración de metadatos y datos estructurados para cada servicio médico
 * Esto permite que cada servicio tenga SEO único y se posicione independientemente
 */

export interface ServiceMetadata {
  slug: string;
  name: string;
  title: string;
  description: string;
  keywords: string[];
  searchTerms?: string[]; // Términos alternativos/coloquiales que usuarios buscan (ej: "operación de corazón", "cirugía del corazón")
  specialty: string; // Para buscar especialistas
  category: 'internacion' | 'quirurgico' | 'consulta-externa' | 'apoyo-diagnostico' | 'otros';
  image?: string;
  icon?: string;
}

export const servicesMetadata: Record<string, ServiceMetadata> = {
  // SERVICIOS DE INTERNACIÓN
  'hospitalizacion': {
    slug: 'servicios/internacion/hospitalizacion',
    name: 'Hospitalización',
    title: 'Hospitalización Adultos y Pediátrica - Cuidado Integral 24/7',
    description: 'Servicio de hospitalización con habitaciones privadas y semi-privadas. Atención médica continua para adultos y pediatría. Tecnología de punta, enfermería especializada y comodidad para pacientes.',
    keywords: ['hospitalización', 'internación', 'habitaciones privadas', 'hospital Barranquilla', 'cuidado hospitalario', 'pediatría hospitalaria', 'medicina interna'],
    searchTerms: ['internar en hospital', 'habitaciones de hospital', 'cuartos privados hospital', 'hospitalización adultos', 'hospitalización niños', 'ingreso hospitalario', 'camas de hospital'],
    specialty: 'Medicina Interna',
    category: 'internacion',
    image: 'https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fhospitalizacion.jpg?alt=media'
  },
  'cuidado-critico': {
    slug: 'servicios/internacion/cuidado-critico',
    name: 'Cuidado Crítico (UCI)',
    title: 'Unidad de Cuidados Intensivos UCI - Atención Crítica 24/7',
    description: 'UCI adultos y pediátrica con tecnología avanzada. Monitoreo continuo, ventilación mecánica, equipo médico especializado. Atención para pacientes en estado crítico con protocolos internacionales.',
    keywords: ['UCI', 'cuidados intensivos', 'unidad crítica', 'ventilación mecánica', 'terapia intensiva', 'cuidado crítico Barranquilla'],
    searchTerms: ['unidad de cuidados intensivos', 'UCI adultos', 'UCI pediátrica', 'terapia intensiva', 'paciente crítico', 'cuidado intensivo', 'UTI'],
    specialty: 'Medicina Crítica',
    category: 'internacion',
    image: 'https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fuci.jpg?alt=media'
  },
  'atencion-vih': {
    slug: 'servicios/internacion/atencion-vih',
    name: 'Atención VIH/SIDA',
    title: 'Programa de Atención Integral VIH/SIDA - Tratamiento Especializado',
    description: 'Atención integral para pacientes con VIH/SIDA. Terapia antirretroviral, seguimiento inmunológico, apoyo psicosocial. Equipo multidisciplinario con confidencialidad y respeto.',
    keywords: ['VIH', 'SIDA', 'antirretroviral', 'infectología', 'tratamiento VIH', 'atención VIH Barranquilla'],
    searchTerms: ['tratamiento VIH', 'SIDA tratamiento', 'terapia antirretroviral', 'control de VIH', 'medicación para VIH', 'atención de SIDA', 'infectólogo VIH'],
    specialty: 'Infectología',
    category: 'internacion'
  },

  // SERVICIOS QUIRÚRGICOS
  'cirugia-general': {
    slug: 'servicios/quirurgicos/cirugia-general',
    name: 'Cirugía General',
    title: 'Cirugía General - Procedimientos Quirúrgicos Avanzados',
    description: 'Cirugía general ambulatoria y hospitalaria. 6 salas equipadas con tecnología de punta. Colecistectomía, hernias, apendicectomía, cirugía laparoscópica. Cirujanos certificados.',
    keywords: ['cirugía general', 'laparoscopia', 'colecistectomía', 'hernias', 'apendicectomía', 'cirugía ambulatoria Barranquilla'],
    searchTerms: ['operación de vesícula', 'cirugía de la vesícula', 'operación de hernia', 'cirugía de apéndice', 'apendicectomía', 'sacar la vesícula', 'operación de hernias inguinales', 'laparoscopia abdominal'],
    specialty: 'Cirugía General',
    category: 'quirurgico',
    image: 'https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fcirugia.jpg?alt=media'
  },
  'neurocirugia': {
    slug: 'servicios/quirurgicos/neurocirugia',
    name: 'Neurocirugía',
    title: 'Neurocirugía - Cirugía Cerebral y Columna Vertebral',
    description: 'Neurocirugía especializada para patologías cerebrales, medulares y de columna. Cirugía de tumores, hernias discales, traumatismos craneales. Neurocirujanos certificados con tecnología avanzada.',
    keywords: ['neurocirugía', 'cirugía cerebral', 'columna vertebral', 'hernias discales', 'tumores cerebrales', 'neurocirujano Barranquilla'],
    searchTerms: ['cirugía de cerebro', 'operación de columna vertebral', 'cirugía de tumor cerebral', 'operación de hernia discal', 'neurocirugía', 'cirugía de nervios', 'operación de espalda'],
    specialty: 'Neurocirugía',
    category: 'quirurgico'
  },
  'cirugia-plastica': {
    slug: 'servicios/quirurgicos/cirugia-plastica-y-estetica',
    name: 'Cirugía Plástica y Estética',
    title: 'Cirugía Plástica Estética y Reconstructiva - Resultados Naturales',
    description: 'Cirugía plástica estética y reconstructiva. Rinoplastia, aumento mamario, liposucción, abdominoplastia, blefaroplastia. Cirujanos plásticos certificados, resultados naturales y seguros.',
    keywords: ['cirugía plástica', 'rinoplastia', 'liposucción', 'aumento mamario', 'abdominoplastia', 'cirugía estética Barranquilla'],
    searchTerms: ['cirugía estética', 'aumento de senos', 'operación de nariz', 'levantamiento facial', 'cirugía reconstructiva', 'lipo', 'abdominoplastia'],
    specialty: 'Cirugía Plástica',
    category: 'quirurgico'
  },
  'cirugia-ortopedica': {
    slug: 'servicios/quirurgicos/cirugia-ortopedica',
    name: 'Cirugía Ortopédica',
    title: 'Cirugía Ortopédica - Traumatología y Reemplazo Articular',
    description: 'Cirugía ortopédica y traumatología. Prótesis de cadera y rodilla, artroscopia, fracturas, lesiones deportivas. Ortopedistas certificados con técnicas mínimamente invasivas.',
    keywords: ['cirugía ortopédica', 'traumatología', 'prótesis cadera', 'artroscopia', 'lesiones deportivas', 'ortopedista Barranquilla'],
    searchTerms: ['operación de cadera', 'cirugía de rodilla', 'reemplazo de cadera', 'prótesis de rodilla', 'operación de meniscos', 'cirugía de huesos', 'artroscopia'],
    specialty: 'Ortopedia',
    category: 'quirurgico'
  },
  'cirugia-cardiovascular': {
    slug: 'servicios/quirurgicos/cirugia-vascular-y-angiologica',
    name: 'Cirugía Vascular y Angiología',
    title: 'Cirugía Vascular - Tratamiento de Várices y Aneurismas',
    description: 'Cirugía vascular y angiología. Várices, aneurismas, bypass vascular, accesos vasculares. Cirujanos vasculares con láser endovascular y técnicas mínimamente invasivas.',
    keywords: ['cirugía vascular', 'várices', 'aneurisma', 'bypass vascular', 'láser endovascular', 'angiología Barranquilla'],
    searchTerms: ['cirugía de corazón', 'operación del corazón', 'cirugía cardiovascular', 'bypass coronario', 'operación de várices', 'tratamiento de venas varicosas', 'cirugía de aneurisma'],
    specialty: 'Angiología',
    category: 'quirurgico'
  },

  // CONSULTA EXTERNA
  'nutricion-dietetica': {
    slug: 'servicios/consulta-externa/nutricion-y-dietetica',
    name: 'Nutrición y Dietética',
    title: 'Nutrición y Dietética - Planes Alimenticios Personalizados',
    description: 'Consulta de nutrición con planes alimenticios personalizados. Tratamiento de obesidad, diabetes, hipertensión, trastornos alimentarios. Nutricionistas certificados, seguimiento continuo.',
    keywords: ['nutrición', 'dietética', 'nutricionista', 'planes alimenticios', 'obesidad', 'diabetes', 'dietas personalizadas Barranquilla'],
    specialty: 'Nutrición y Dietética',
    category: 'consulta-externa',
    image: 'https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Fnutricion.jpg?alt=media'
  },
  'cardiologia': {
    slug: 'servicios/consulta-externa/cardiologia',
    name: 'Cardiología',
    title: 'Cardiología - Diagnóstico y Tratamiento Cardiovascular',
    description: 'Consulta cardiológica especializada. Ecocardiograma, prueba de esfuerzo, Holter, electrocardiograma. Diagnóstico y tratamiento de hipertensión, arritmias, insuficiencia cardíaca.',
    keywords: ['cardiología', 'cardiólogo', 'ecocardiograma', 'hipertensión', 'arritmias', 'corazón Barranquilla'],
    searchTerms: ['médico del corazón', 'doctor para el corazón', 'chequeo del corazón', 'presión alta', 'arritmia cardíaca', 'cardiólogo cerca', 'ecocardiograma precio'],
    specialty: 'Cardiología',
    category: 'consulta-externa'
  },
  'dermatologia': {
    slug: 'servicios/consulta-externa/dermatologia',
    name: 'Dermatología',
    title: 'Dermatología - Cuidado de la Piel y Tratamientos Estéticos',
    description: 'Consulta dermatológica para enfermedades de la piel, cabello y uñas. Acné, manchas, lunares, cáncer de piel, tratamientos estéticos. Dermatólogos certificados con tecnología láser.',
    keywords: ['dermatología', 'dermatólogo', 'acné', 'manchas', 'cáncer de piel', 'tratamientos láser Barranquilla'],
    searchTerms: ['doctor para la piel', 'médico para acné', 'quitar manchas de la piel', 'tratamiento para acné', 'lunares sospechosos', 'dermatólogo cerca', 'caída del cabello'],
    specialty: 'Dermatología',
    category: 'consulta-externa'
  },
  'ginecologia-obstetricia': {
    slug: 'servicios/consulta-externa/ginecologia-y-obstetricia',
    name: 'Ginecología y Obstetricia',
    title: 'Ginecología y Obstetricia - Salud Integral de la Mujer',
    description: 'Consulta ginecológica y obstétrica. Control prenatal, planificación familiar, menopausia, patología cervical, ecografías obstétricas 3D/4D. Atención personalizada en todas las etapas.',
    keywords: ['ginecología', 'obstetricia', 'control prenatal', 'ecografía 4D', 'menopausia', 'ginecólogo Barranquilla'],
    searchTerms: ['doctor de mujeres', 'ginecólogo cerca', 'control de embarazo', 'ecografía de embarazo', 'citología', 'planificación familiar', 'menopausia tratamiento'],
    specialty: 'Ginecología y Obstetricia',
    category: 'consulta-externa'
  },
  'pediatria': {
    slug: 'servicios/consulta-externa/pediatria',
    name: 'Pediatría',
    title: 'Pediatría - Cuidado Integral del Niño y Adolescente',
    description: 'Consulta pediátrica especializada desde recién nacidos hasta adolescentes. Control de crecimiento y desarrollo, vacunación, pediatría preventiva, enfermedades infantiles.',
    keywords: ['pediatría', 'pediatra', 'vacunación', 'control de crecimiento', 'salud infantil', 'pediatra Barranquilla'],
    searchTerms: ['doctor de niños', 'pediatra cerca', 'vacunas para niños', 'control del bebé', 'médico infantil', 'pediatra urgencias', 'pediatra recién nacidos'],
    specialty: 'Pediatría',
    category: 'consulta-externa'
  },
  'medicina-interna': {
    slug: 'servicios/consulta-externa/medicina-interna',
    name: 'Medicina Interna',
    title: 'Medicina Interna - Diagnóstico y Manejo de Enfermedades Complejas',
    description: 'Consulta de medicina interna para adultos. Diagnóstico integral, manejo de enfermedades crónicas, hipertensión, diabetes, riesgo cardiovascular. Enfoque multidisciplinario.',
    keywords: ['medicina interna', 'internista', 'enfermedades crónicas', 'diabetes', 'hipertensión', 'medicina interna Barranquilla'],
    searchTerms: ['médico general', 'doctor para adultos', 'chequeo médico completo', 'control de diabetes', 'control de presión', 'internista cerca', 'medicina general'],
    specialty: 'Medicina Interna',
    category: 'consulta-externa'
  },
  'oftalmologia': {
    slug: 'servicios/consulta-externa/oftalmologia',
    name: 'Oftalmología',
    title: 'Oftalmología - Salud Visual y Cirugía Ocular',
    description: 'Consulta oftalmológica completa. Examen de refracción, tonometría, fondo de ojo, diagnóstico de cataratas, glaucoma, retinopatía. Tecnología de última generación.',
    keywords: ['oftalmología', 'oftalmólogo', 'cataratas', 'glaucoma', 'retinopatía', 'examen visual Barranquilla'],
    searchTerms: ['doctor de los ojos', 'examen de la vista', 'oculista cerca', 'problemas de visión', 'oftalmólogo cerca', 'chequeo de ojos', 'lentes formulados'],
    specialty: 'Oftalmología',
    category: 'consulta-externa'
  },
  'urologia': {
    slug: 'servicios/consulta-externa/urologia',
    name: 'Urología',
    title: 'Urología - Salud del Sistema Urinario y Reproductivo',
    description: 'Consulta urológica para hombres y mujeres. Próstata, cálculos renales, incontinencia, infecciones urinarias, disfunción eréctil. Urólogos certificados con tecnología mínimamente invasiva.',
    keywords: ['urología', 'urólogo', 'próstata', 'cálculos renales', 'incontinencia', 'urología Barranquilla'],
    searchTerms: ['doctor de próstata', 'urólogo cerca', 'problemas para orinar', 'piedras en el riñón', 'infección urinaria', 'chequeo de próstata', 'dolor al orinar'],
    specialty: 'Urología',
    category: 'consulta-externa'
  },
  'ortopedia-traumatologia': {
    slug: 'servicios/consulta-externa/ortopedia-y-traumatologia',
    name: 'Ortopedia y Traumatología',
    title: 'Ortopedia y Traumatología - Salud Musculoesquelética',
    description: 'Consulta ortopédica especializada. Lesiones deportivas, artritis, osteoporosis, dolor de espalda, fracturas. Infiltraciones, terapia regenerativa, medicina deportiva.',
    keywords: ['ortopedia', 'traumatología', 'lesiones deportivas', 'artritis', 'dolor de espalda', 'ortopedista Barranquilla'],
    searchTerms: ['doctor de huesos', 'ortopedista cerca', 'dolor de rodilla', 'dolor de espalda', 'fractura', 'lesión deportiva', 'traumatólogo cerca'],
    specialty: 'Ortopedia y Traumatología',
    category: 'consulta-externa'
  },
  'neurologia': {
    slug: 'servicios/consulta-externa/neurologia',
    name: 'Neurología',
    title: 'Neurología - Diagnóstico de Enfermedades Neurológicas',
    description: 'Consulta neurológica especializada. Epilepsia, migraña, enfermedad de Parkinson, esclerosis múltiple, ACV. Electroencefalograma, electromiografía, estudios de conducción nerviosa.',
    keywords: ['neurología', 'neurólogo', 'epilepsia', 'migraña', 'Parkinson', 'neurólogo Barranquilla'],
    searchTerms: ['doctor del cerebro', 'neurólogo cerca', 'dolor de cabeza fuerte', 'migraña tratamiento', 'temblor en las manos', 'convulsiones', 'derrame cerebral'],
    specialty: 'Neurología',
    category: 'consulta-externa'
  },
  'psiquiatria': {
    slug: 'servicios/consulta-externa/psiquiatria',
    name: 'Psiquiatría',
    title: 'Psiquiatría - Salud Mental y Bienestar Emocional',
    description: 'Consulta psiquiátrica para diagnóstico y tratamiento de trastornos mentales. Depresión, ansiedad, trastorno bipolar, esquizofrenia. Manejo farmacológico y seguimiento personalizado.',
    keywords: ['psiquiatría', 'psiquiatra', 'salud mental', 'depresión', 'ansiedad', 'psiquiatra Barranquilla'],
    searchTerms: ['doctor para la depresión', 'psiquiatra cerca', 'tratamiento para ansiedad', 'ayuda psicológica', 'salud mental', 'trastorno bipolar', 'medicamento para depresión'],
    specialty: 'Psiquiatría',
    category: 'consulta-externa'
  },
  'gastroenterologia': {
    slug: 'servicios/consulta-externa/gastroenterologia',
    name: 'Gastroenterología',
    title: 'Gastroenterología - Salud Digestiva Especializada',
    description: 'Consulta gastroenterológica. Reflujo, gastritis, úlcera, colon irritable, enfermedad inflamatoria intestinal, hepatitis. Endoscopia, colonoscopia, manometría.',
    keywords: ['gastroenterología', 'gastroenterólogo', 'endoscopia', 'colon irritable', 'gastritis', 'gastroenterólogo Barranquilla'],
    searchTerms: ['doctor del estómago', 'gastroenterólogo cerca', 'dolor de estómago', 'reflujo tratamiento', 'acidez estomacal', 'colonoscopia precio', 'gastritis crónica'],
    specialty: 'Gastroenterología',
    category: 'consulta-externa'
  },
  'endocrinologia': {
    slug: 'servicios/consulta-externa/endocrinologia',
    name: 'Endocrinología',
    title: 'Endocrinología - Manejo de Trastornos Hormonales y Diabetes',
    description: 'Consulta endocrinológica especializada. Diabetes tipo 1 y 2, tiroides (hiper e hipotiroidismo), obesidad, osteoporosis, trastornos hormonales. Educación diabetológica.',
    keywords: ['endocrinología', 'endocrinólogo', 'diabetes', 'tiroides', 'obesidad', 'endocrinólogo Barranquilla'],
    searchTerms: ['doctor para diabetes', 'endocrinólogo cerca', 'problemas de tiroides', 'azúcar alta', 'hipotiroidismo', 'hormona tiroidea', 'control de diabetes'],
    specialty: 'Endocrinología',
    category: 'consulta-externa'
  },
  'neumologia': {
    slug: 'servicios/consulta-externa/neumologia',
    name: 'Neumología',
    title: 'Neumología - Enfermedades Respiratorias y Sueño',
    description: 'Consulta neumológica. Asma, EPOC, neumonía, fibrosis pulmonar, apnea del sueño. Espirometría, polisomnografía, oximetría. Rehabilitación pulmonar.',
    keywords: ['neumología', 'neumólogo', 'asma', 'EPOC', 'apnea del sueño', 'neumólogo Barranquilla'],
    specialty: 'Neumología',
    category: 'consulta-externa'
  },
  'otorrinolaringologia': {
    slug: 'servicios/consulta-externa/otorrinolaringologia',
    name: 'Otorrinolaringología',
    title: 'Otorrinolaringología - Oído, Nariz y Garganta',
    description: 'Consulta ORL especializada. Sinusitis, faringitis, otitis, vértigo, pérdida auditiva, ronquidos, apnea obstructiva. Audiometría, nasofibrolaringoscopia, impedanciometría.',
    keywords: ['otorrinolaringología', 'ORL', 'sinusitis', 'otitis', 'pérdida auditiva', 'otorrinolaringólogo Barranquilla'],
    specialty: 'Otorrinolaringología',
    category: 'consulta-externa'
  },
  'oncologia': {
    slug: 'servicios/consulta-externa/oncologia',
    name: 'Oncología',
    title: 'Oncología - Diagnóstico y Tratamiento del Cáncer',
    description: 'Consulta oncológica integral. Diagnóstico, estadificación, quimioterapia, inmunoterapia, terapia dirigida. Equipo multidisciplinario, hospital día oncológico, cuidado paliativo.',
    keywords: ['oncología', 'oncólogo', 'cáncer', 'quimioterapia', 'inmunoterapia', 'oncólogo Barranquilla'],
    specialty: 'Oncología',
    category: 'consulta-externa'
  },
  'infectologia': {
    slug: 'servicios/consulta-externa/infectologia',
    name: 'Infectología',
    title: 'Infectología - Enfermedades Infecciosas y VIH',
    description: 'Consulta infectológica especializada. VIH/SIDA, hepatitis, infecciones tropicales, tuberculosis, infecciones resistentes. Manejo antirretroviral, seguimiento de carga viral.',
    keywords: ['infectología', 'VIH', 'SIDA', 'hepatitis', 'tuberculosis', 'infectólogo Barranquilla'],
    specialty: 'Infectología',
    category: 'consulta-externa'
  },

  // QUIRÚRGICOS ADICIONALES
  'cirugia-urologica': {
    slug: 'servicios/quirurgicos/cirugia-urologica',
    name: 'Cirugía Urológica',
    title: 'Cirugía Urológica - Procedimientos Mínimamente Invasivos',
    description: 'Cirugía urológica avanzada. Próstata (RTU, láser verde), cálculos renales (litotripsia, ureteroscopia), tumores renales, vejiga neurogénica. Laparoscopia urológica.',
    keywords: ['cirugía urológica', 'RTU próstata', 'litotripsia', 'cirugía de riñón', 'laparoscopia urológica', 'cirugía urológica Barranquilla'],
    searchTerms: ['operación de próstata', 'cirugía de próstata', 'cálculos renales', 'piedras en el riñón', 'operación de vejiga', 'cirugía de riñón', 'litotripsia láser'],
    specialty: 'Urología',
    category: 'quirurgico'
  },
  'cirugia-ginecologica': {
    slug: 'servicios/quirurgicos/cirugia-ginecologica',
    name: 'Cirugía Ginecológica',
    title: 'Cirugía Ginecológica - Procedimientos Laparoscópicos',
    description: 'Cirugía ginecológica mínimamente invasiva. Histerectomía, miomectomía, quistes de ovario, endometriosis. Laparoscopia, histeroscopia, cirugía robótica.',
    keywords: ['cirugía ginecológica', 'histerectomía', 'miomectomía', 'laparoscopia', 'endometriosis', 'cirugía ginecológica Barranquilla'],
    searchTerms: ['operación de útero', 'sacar el útero', 'operación de quistes de ovario', 'quitar miomas', 'cirugía de matriz', 'operación ginecológica', 'laparoscopia ginecológica'],
    specialty: 'Ginecología y Obstetricia',
    category: 'quirurgico'
  },
  'cirugia-oftalmologica': {
    slug: 'servicios/quirurgicos/cirugia-oftalmologica',
    name: 'Cirugía Oftalmológica',
    title: 'Cirugía Oftalmológica - Cataratas y Cirugía Refractiva',
    description: 'Cirugía oftalmológica de alta tecnología. Facoemulsificación de cataratas con lente intraocular premium, LASIK, PRK, cirugía de retina, vitrectomía, pterigión.',
    keywords: ['cirugía de cataratas', 'LASIK', 'cirugía refractiva', 'vitrectomía', 'pterigión', 'cirugía oftalmológica Barranquilla'],
    searchTerms: ['operación de cataratas', 'cirugía de ojos', 'cirugía láser de ojos', 'operación de vista', 'cirugía para no usar gafas', 'operación de retina', 'quitar cataratas'],
    specialty: 'Oftalmología',
    category: 'quirurgico'
  },
  'cirugia-otorrinolaringologica': {
    slug: 'servicios/quirurgicos/cirugia-otorrinolaringologica',
    name: 'Cirugía Otorrinolaringológica',
    title: 'Cirugía ORL - Oído, Nariz, Garganta y Cuello',
    description: 'Cirugía ORL especializada. Amigdalectomía, adenoidectomía, septoplastia, rinoplastia funcional, cirugía de senos paranasales, timpanoplastia, cirugía de tiroides.',
    keywords: ['cirugía ORL', 'amigdalectomía', 'septoplastia', 'cirugía de senos', 'timpanoplastia', 'cirugía ORL Barranquilla'],
    searchTerms: ['operación de amígdalas', 'sacar las amígdalas', 'operación de tabique nasal', 'cirugía de nariz', 'operación de sinusitis', 'cirugía de oído', 'operación de tiroides'],
    specialty: 'Otorrinolaringología',
    category: 'quirurgico'
  },
  'cirugia-maxilofacial': {
    slug: 'servicios/quirurgicos/cirugia-maxilofacial',
    name: 'Cirugía Maxilofacial',
    title: 'Cirugía Maxilofacial - Reconstrucción Facial y Mandibular',
    description: 'Cirugía maxilofacial avanzada. Trauma facial, cirugía ortognática, patología de ATM, tumores faciales, implantes dentales, reconstrucción mandibular.',
    keywords: ['cirugía maxilofacial', 'cirugía ortognática', 'trauma facial', 'ATM', 'implantes dentales', 'cirugía maxilofacial Barranquilla'],
    searchTerms: ['cirugía de mandíbula', 'operación de quijada', 'cirugía facial reconstructiva', 'operación de ATM', 'implantes de cara', 'reconstrucción facial', 'cirugía de mentón'],
    specialty: 'Cirugía Maxilofacial',
    category: 'quirurgico'
  },
  'cirugia-pediatrica': {
    slug: 'servicios/quirurgicos/cirugia-pediatrica',
    name: 'Cirugía Pediátrica',
    title: 'Cirugía Pediátrica - Cirugía Infantil Especializada',
    description: 'Cirugía pediátrica para recién nacidos, niños y adolescentes. Hernias, apendicitis, malformaciones congénitas, fimosis, hidrocele. Cirugía laparoscópica pediátrica.',
    keywords: ['cirugía pediátrica', 'cirugía infantil', 'hernias pediátricas', 'apendicitis infantil', 'laparoscopia pediátrica', 'cirugía pediátrica Barranquilla'],
    searchTerms: ['operación de niños', 'cirugía en bebés', 'operación de hernia en niños', 'apendicitis en niños', 'operación de fimosis', 'circuncisión', 'cirugía infantil'],
    specialty: 'Cirugía Pediátrica',
    category: 'quirurgico'
  },
  'cirugia-oncologica': {
    slug: 'servicios/quirurgicos/cirugia-oncologica',
    name: 'Cirugía Oncológica',
    title: 'Cirugía Oncológica - Tratamiento Quirúrgico del Cáncer',
    description: 'Cirugía oncológica especializada. Resección de tumores, linfadenectomía, mastectomía, colectomía oncológica, cirugía reconstructiva. Enfoque multidisciplinario.',
    keywords: ['cirugía oncológica', 'cirugía de cáncer', 'mastectomía', 'resección tumoral', 'oncología quirúrgica', 'cirugía oncológica Barranquilla'],
    searchTerms: ['operación de cáncer', 'cirugía de tumores', 'operación de seno por cáncer', 'quitar tumor', 'cirugía para cáncer', 'operación oncológica', 'resección de tumor'],
    specialty: 'Oncología',
    category: 'quirurgico'
  },
  'cirugia-gastrointestinal': {
    slug: 'servicios/quirurgicos/cirugia-gastrointestinal',
    name: 'Cirugía Gastrointestinal',
    title: 'Cirugía Gastrointestinal - Cirugía del Aparato Digestivo',
    description: 'Cirugía del tracto gastrointestinal. Hernia hiatal, reflujo, bypass gástrico, manga gástrica, colectomía, resección intestinal. Cirugía bariátrica, laparoscopia avanzada.',
    keywords: ['cirugía gastrointestinal', 'bypass gástrico', 'manga gástrica', 'hernia hiatal', 'cirugía bariátrica', 'cirugía gastrointestinal Barranquilla'],
    searchTerms: ['operación para bajar de peso', 'cirugía de obesidad', 'operación de estómago', 'manga gástrica precio', 'bypass gástrico precio', 'reducción de estómago', 'cirugía bariátrica'],
    specialty: 'Cirugía General',
    category: 'quirurgico'
  },
  'cirugia-de-columna': {
    slug: 'servicios/quirurgicos/cirugia-de-columna',
    name: 'Cirugía de Columna',
    title: 'Cirugía de Columna - Neurocirugía y Ortopedia Espinal',
    description: 'Cirugía de columna vertebral. Hernia discal, estenosis de canal, escoliosis, espondilolistesis, tumores espinales. Microcirugía, artrodesis, prótesis discal.',
    searchTerms: ['operación de columna', 'cirugía de hernia discal', 'operación de disco herniado', 'cirugía de espalda', 'operación de escoliosis', 'cirugía lumbar', 'operación de columna vertebral'],
    keywords: ['cirugía de columna', 'hernia discal', 'escoliosis', 'estenosis de canal', 'neurocirugía espinal', 'cirugía de columna Barranquilla'],
    specialty: 'Neurocirugía',
    category: 'quirurgico'
  },

  // APOYO DIAGNÓSTICO
  'laboratorio-clinico': {
    slug: 'servicios/apoyo-diagnostico/laboratorio-clinico',
    name: 'Laboratorio Clínico',
    title: 'Laboratorio Clínico - Análisis Clínicos Certificados',
    description: 'Laboratorio clínico certificado ISO 15189. Hematología, química clínica, inmunología, microbiología, marcadores tumorales, pruebas especiales. Resultados en línea.',
    keywords: ['laboratorio clínico', 'exámenes de laboratorio', 'análisis clínicos', 'hematología', 'química clínica', 'laboratorio Barranquilla'],
    searchTerms: ['exámenes de sangre', 'laboratorio cerca', 'análisis clínicos precio', 'hemograma completo', 'glicemia en ayunas', 'pruebas de laboratorio', 'exámenes médicos'],
    specialty: 'Laboratorio Clínico',
    category: 'apoyo-diagnostico'
  },
  'imagenes-diagnosticas': {
    slug: 'servicios/apoyo-diagnostico/imagenes-diagnosticas',
    name: 'Imágenes Diagnósticas',
    title: 'Imágenes Diagnósticas - Radiología de Alta Tecnología',
    description: 'Servicio de radiología e imágenes diagnósticas. Rayos X digital, ecografía 4D, TAC multicorte, resonancia magnética 1.5T, mamografía digital, densitometría ósea.',
    keywords: ['imágenes diagnósticas', 'radiología', 'TAC', 'resonancia magnética', 'ecografía', 'radiología Barranquilla'],
    searchTerms: ['rayos x cerca', 'radiografías', 'TAC precio', 'tomografía computarizada', 'resonancia magnética precio', 'ecografía abdominal', 'imágenes médicas'],
    specialty: 'Radiología',
    category: 'apoyo-diagnostico'
  },
  'ecocardiografia': {
    slug: 'servicios/apoyo-diagnostico/ecocardiografia',
    name: 'Ecocardiografía',
    title: 'Ecocardiografía - Ultrasonido Cardíaco Avanzado',
    description: 'Ecocardiografía transtorácica, transesofágica y de estrés. Tecnología 3D/4D, strain miocárdico, evaluación de función valvular y cardíaca. Doppler color.',
    keywords: ['ecocardiografía', 'ecocardiograma', 'ultrasonido cardíaco', 'ecocardiografía 3D', 'doppler cardíaco', 'ecocardiografía Barranquilla'],
    searchTerms: ['eco del corazón', 'ecocardiograma precio', 'ultrasonido del corazón', 'examen del corazón', 'doppler cardíaco precio', 'ecocardiograma cerca', 'chequeo del corazón'],
    specialty: 'Cardiología',
    category: 'apoyo-diagnostico'
  },
  'endoscopia': {
    slug: 'servicios/apoyo-diagnostico/endoscopia',
    name: 'Endoscopia Digestiva',
    title: 'Endoscopia Digestiva - Diagnóstico y Tratamiento',
    description: 'Unidad de endoscopia con equipos HD. Gastroscopia, colonoscopia, CPRE, enteroscopia, videocápsula endoscópica. Procedimientos diagnósticos y terapéuticos.',
    keywords: ['endoscopia', 'colonoscopia', 'gastroscopia', 'CPRE', 'videocápsula', 'endoscopia Barranquilla'],
    searchTerms: ['endoscopia digestiva precio', 'colonoscopia precio', 'gastroscopia cerca', 'examen de estómago', 'examen de colon', 'endoscopia alta', 'colonoscopia sedada'],
    specialty: 'Gastroenterología',
    category: 'apoyo-diagnostico'
  },
  'fisioterapia': {
    slug: 'servicios/apoyo-diagnostico/fisioterapia',
    name: 'Fisioterapia y Rehabilitación',
    title: 'Fisioterapia - Rehabilitación Física Integral',
    description: 'Servicio de fisioterapia con programas personalizados. Rehabilitación post-quirúrgica, lesiones deportivas, neurológica, respiratoria, geriátrica. Gimnasio terapéutico.',
    keywords: ['fisioterapia', 'rehabilitación', 'terapia física', 'fisioterapia deportiva', 'rehabilitación post-quirúrgica', 'fisioterapia Barranquilla'],
    searchTerms: ['rehabilitación física', 'terapia física cerca', 'fisioterapeuta', 'rehabilitación post operatoria', 'terapia de rehabilitación', 'fisioterapia deportiva', 'recuperación física'],
    specialty: 'Fisioterapia',
    category: 'apoyo-diagnostico'
  },
  'terapia-respiratoria': {
    slug: 'servicios/apoyo-diagnostico/terapia-respiratoria',
    name: 'Terapia Respiratoria',
    title: 'Terapia Respiratoria - Cuidado Pulmonar Especializado',
    description: 'Terapia respiratoria para pacientes con enfermedades pulmonares. Nebulizaciones, oxigenoterapia, espirometría, rehabilitación pulmonar, ventilación mecánica no invasiva.',
    keywords: ['terapia respiratoria', 'rehabilitación pulmonar', 'espirometría', 'oxigenoterapia', 'EPOC', 'terapia respiratoria Barranquilla'],
    searchTerms: ['terapia pulmonar', 'nebulizaciones', 'rehabilitación respiratoria', 'oxígeno terapia', 'espirometría precio', 'terapia para pulmones', 'rehabilitación pulmonar'],
    specialty: 'Neumología',
    category: 'apoyo-diagnostico'
  },

  // ATENCIÓN INMEDIATA
  'urgencias': {
    slug: 'servicios/atencion-inmediata/urgencias',
    name: 'Urgencias 24/7',
    title: 'Urgencias 24/7 - Atención Médica de Emergencia',
    description: 'Servicio de urgencias disponible 24 horas. Sala de reanimación, trauma, observación, UCI. Equipo médico especializado, ambulancia medicalizada, helipuerto.',
    keywords: ['urgencias', 'emergencias', 'urgencias 24 horas', 'sala de emergencias', 'UCI', 'urgencias Barranquilla'],
    searchTerms: ['emergencias 24 horas', 'urgencias cerca', 'sala de emergencias', 'atención de urgencia', 'urgencias médicas', 'emergencia médica', 'urgencias disponibles'],
    specialty: 'Medicina de Urgencias',
    category: 'otros'
  }
};

/**
 * Obtiene los metadatos de un servicio por su key o slug
 */
export function getServiceMetadata(keyOrSlug: string): ServiceMetadata | undefined {
  // Primero intenta buscar directamente por key
  if (servicesMetadata[keyOrSlug]) {
    return servicesMetadata[keyOrSlug];
  }
  
  // Si no encuentra, busca por slug
  const key = Object.keys(servicesMetadata).find(k => 
    servicesMetadata[k].slug.includes(keyOrSlug)
  );
  return key ? servicesMetadata[key] : undefined;
}
